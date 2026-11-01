---
title: Evolution
icon: dna
article: false
category:
  - code
tag:
  - format
---

<blockquote style="font-style: italic; font-size: 1.2rem; margin-top: 10px; color: #555;">
    "How can I move thee?<br>
    Will no entreaties cause thee to turn a favourable eye upon thy creature,<br>
    who implores thy goodness and compassion?"
    <br>
    <span style="font-size: 0.9rem; color: #777;">— Mary Wollstonecraft Shelley, <em>Frankenstein; or, The Modern Prometheus</em>, Chapter 10</span>
</blockquote>




## HARE



```bash
mamba create -y -n HARE -c conda-forge -c bioconda -c defaults python=3.11 samtools bcftools bedtools=2.30.0 ensembl-vep=105 perl=5.32 perl-bioperl=1.7.8 perl-set-intervaltree perl-compress-raw-zlib htslib samtools git wget unzip numpy pandas scipy matplotlib 
git clone https://github.com/ossmith/HARE.git
cd HARE
mamba activate HARE
python -m pip install .
python -m ipykernel install --user --name HARE --display-name "Py311 HARE"
```

### Patch

脚本地址`/cpfs01/projects-HDD/cfff-afe2df89e32e_HDD/public/czh_data/Tanzimat/ref/HARE_GRCh38/patch_hare.py`



## S-LDSC

###  Install

```bash
git clone -b ldsc39 https://github.com/CBIIT/ldsc.git
mamba create --name ldsc python=3.9
mamba activate ldsc
mamba install -c conda-forge -c bioconda bitarray=2 nose=1.3 pybedtools=0.10.0 pip flask requests numpy=1.21.5 pandas=1.3.3 scipy=1.7.3 -y
python -m ipykernel install --user --name ldsc --display-name "Py39 ldsc"
```



### Patch

```
from pathlib import Path
import re, shutil, datetime

LDSC_DIR = Path("/home1/chenzhh/package/python/ldsc")
p = LDSC_DIR / "ldscore/parse.py"

assert p.exists(), f"not found: {p}"

bak = p.with_name("parse.py.bak." + datetime.datetime.now().strftime("%F_%H%M%S"))
shutil.copy2(p, bak)

s = p.read_text()

LD_FUNCTION = r'''def ldscore(fh, num=None):
    ''' + "'''" + r'''Parse .l2.ldscore files, split across num chromosomes.
    See docs/file_formats_ld.txt.
    ''' + "'''" + r'''
    suffix = '.l2.ldscore.gz'

    if num is not None:
        chrs = get_present_chrs(fh, num+1)
        if len(chrs) == 0:
            raise IOError('Could not find chromosome-split LD score files for prefix: {F}'.format(F=fh))

        first_fh = sub_chr(fh, chrs[0]) + suffix
        s, compression = which_compression(first_fh)

        chr_ld = [
            l2_parser(sub_chr(fh, i) + suffix + s, compression)
            for i in chrs
        ]
        x = pd.concat(chr_ld)
    else:
        s, compression = which_compression(fh + suffix)
        x = l2_parser(fh + suffix + s, compression)

    x = x.sort_values(by=['CHR', 'BP'])
    x = x.drop(['CHR', 'BP'], axis=1).drop_duplicates(subset='SNP')
    return x

'''

ANNOT_FUNCTION = r'''def annot(fh_list, num=None, frqfile=None):
    ''' + "'''" + r'''Parses .annot files and returns an overlap matrix.
    See docs/file_formats_ld.txt.
    ''' + "'''" + r'''
    annot_suffix = ['.annot' for fh in fh_list]
    annot_compression = []

    frq_suffix = None
    frq_compression = None

    if num is not None:
        chrs = get_present_chrs(fh_list[0], num+1)
        if len(chrs) == 0:
            raise IOError('Could not find chromosome-split annot files for prefix: {F}'.format(F=fh_list[0]))

        for i, fh in enumerate(fh_list):
            first_fh = sub_chr(fh, chrs[0]) + annot_suffix[i]
            annot_s, annot_comp_single = which_compression(first_fh)
            annot_suffix[i] += annot_s
            annot_compression.append(annot_comp_single)

        if frqfile is not None:
            frq_suffix = '.frq'
            first_frqfile = sub_chr(frqfile, chrs[0]) + frq_suffix
            frq_s, frq_compression = which_compression(first_frqfile)
            frq_suffix += frq_s

        y = []
        M_tot = 0

        for chrom in chrs:
            if frqfile is not None:
                df_annot_chr_list = [
                    annot_parser(
                        sub_chr(fh, chrom) + annot_suffix[i],
                        annot_compression[i],
                        sub_chr(frqfile, chrom) + frq_suffix,
                        frq_compression
                    )
                    for i, fh in enumerate(fh_list)
                ]
            else:
                df_annot_chr_list = [
                    annot_parser(
                        sub_chr(fh, chrom) + annot_suffix[i],
                        annot_compression[i]
                    )
                    for i, fh in enumerate(fh_list)
                ]

            annot_matrix_chr_list = [
                np.matrix(df_annot_chr)
                for df_annot_chr in df_annot_chr_list
            ]
            annot_matrix_chr = np.hstack(annot_matrix_chr_list)

            y.append(np.dot(annot_matrix_chr.T, annot_matrix_chr))
            M_tot += len(df_annot_chr_list[0])

        x = sum(y)

    else:
        for i, fh in enumerate(fh_list):
            annot_s, annot_comp_single = which_compression(fh + annot_suffix[i])
            annot_suffix[i] += annot_s
            annot_compression.append(annot_comp_single)

        if frqfile is not None:
            frq_suffix = '.frq'
            frq_s, frq_compression = which_compression(frqfile + frq_suffix)
            frq_suffix += frq_s

        if frqfile is not None:
            df_annot_list = [
                annot_parser(
                    fh + annot_suffix[i],
                    annot_compression[i],
                    frqfile + frq_suffix,
                    frq_compression
                )
                for i, fh in enumerate(fh_list)
            ]
        else:
            df_annot_list = [
                annot_parser(
                    fh + annot_suffix[i],
                    annot_compression[i]
                )
                for i, fh in enumerate(fh_list)
            ]

        annot_matrix_list = [
            np.matrix(y)
            for y in df_annot_list
        ]
        annot_matrix = np.hstack(annot_matrix_list)

        x = np.dot(annot_matrix.T, annot_matrix)
        M_tot = len(df_annot_list[0])

    return x, M_tot

'''

s, n1 = re.subn(
    r"def ldscore\(fh, num=None\):.*?(?=\ndef M\(fh, num=None, N=2, common=False\):)",
    LD_FUNCTION,
    s,
    count=1,
    flags=re.S
)

s, n2 = re.subn(
    r"def annot\(fh_list, num=None, frqfile=None\):.*?(?=\ndef __ID_List_Factory__)",
    ANNOT_FUNCTION,
    s,
    count=1,
    flags=re.S
)

assert n1 == 1, "ldscore() replacement failed"
assert n2 == 1, "annot() replacement failed"

p.write_text(s)

for x in (LDSC_DIR / "ldscore").rglob("*.pyc"):
    x.unlink()
for x in [LDSC_DIR / "ldscore/__pycache__", LDSC_DIR / "__pycache__"]:
    if x.exists():
        shutil.rmtree(x)

print("patched:", p)
print("backup :", bak)
print("\n".join(line for line in p.read_text().splitlines() if "chrs = get_present_chrs" in line))

```

### 参考文件下载

```bash
数据地址：
https://zenodo.org/records/10515792
服务器储存地址：
/cpfs01/projects-HDD/cfff-afe2df89e32e_HDD/public/czh_data/Tanzimat/ref/LDSC
GRCh38_bundle  archive  baselineLD_v2.2  baseline_v1.2  hm3_no_MHC.list.txt  plink_files  readme_baseline_versions.txt  weights
```





## 进化
