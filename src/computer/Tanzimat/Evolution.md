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
mamba create -y -n HARE -c conda-forge -c bioconda -c defaults python=3.11 pip setuptools bedtools=2.30.0 ensembl-vep=105 perl=5.32 perl-bioperl=1.7.8 perl-set-intervaltree perl-compress-raw-zlib htslib samtools git wget unzip numpy pandas scipy matplotlib
git clone https://github.com/ossmith/HARE.git
cd HARE
mamba activate hare
python -m pip install .
```

### Patch

```bash
source /cwStorage/home/chenzhh/miniforge3/etc/profile.d/conda.sh
conda activate /cwStorage/home/chenzhh/miniforge3/envs/HARE

INTERSECT_PY="$(
python - <<'PY'
import inspect
import intersect
print(inspect.getfile(intersect))
PY
)"

echo "[patch] target intersect.py:"
echo "${INTERSECT_PY}"
```



```bash
# 备份
cp -a "${INTERSECT_PY}" "${INTERSECT_PY}.bak.$(date +%Y%m%d%H%M%S)"
```



```bash
python - "${INTERSECT_PY}" <<'PY'
from pathlib import Path
import sys

p = Path(sys.argv[1])
s = p.read_text(encoding="utf-8")

start = s.index("def biomart_locate(")
end = s.index("\n###############################################################################\n##################### Simulation", start)

new = r'''def biomart_locate(annotation_out, argumentClass, settingsClass):
    """
    Locate VEP-annotated genes using a local HARE-compatible BioMart TSV.

    Required TSV columns:
    ENSEMBL_ID, START, END, CHR, GENE_NAME, STRAND, HGNC_SYMBOL

    Manual override:
    export HARE_BIOMART_TSV=/path/to/local.HARE.tsv
    """
    print("Locating elements with local BioMart TSV...", end="", flush=True)

    if settingsClass.species != "homo_sapiens":
        raise NotImplementedError(
            "This local BioMart patch is configured for homo_sapiens GRCh38 only."
        )

    if str(argumentClass.build) != "38":
        raise NotImplementedError(
            "This local BioMart patch is configured for GRCh38 only. "
            "Your --ref_build is GRCh%s." % argumentClass.build
        )

    if argumentClass.biotypes == "regulatory":
        raise NotImplementedError(
            "This local BioMart patch supports gene-based HARE runs only. "
            "Do not use --biotypes regulatory with this patch."
        )

    if argumentClass.biotypes not in ["protein_coding", "protein_all", "all"]:
        raise ValueError(
            "Unsupported --biotypes value for local BioMart patch: %s. "
            "Allowed values are protein_coding, protein_all, all."
            % argumentClass.biotypes
        )

    feature_col = "NEAREST"

    biomart_header = [
        "ENSEMBL_ID",
        "START",
        "END",
        "CHR",
        "GENE_NAME",
        "STRAND",
        "HGNC_SYMBOL"
    ]

    biomart_dir = "/cwStorage/nodecw_group/czh_data/Tanzimat/hare/biomart"

    default_biomart_files = {
        "protein_coding": os.path.join(
            biomart_dir,
            "BioMart_GRCh38_Ensembl105.autosomes.protein_coding.HARE.tsv"
        ),
        "protein_all": os.path.join(
            biomart_dir,
            "BioMart_GRCh38_Ensembl105.autosomes.protein_all.HARE.tsv"
        ),
        "all": os.path.join(
            biomart_dir,
            "BioMart_GRCh38_Ensembl105.autosomes.all_gene_biotypes.HARE.tsv"
        )
    }

    biomart_ref = os.environ.get("HARE_BIOMART_TSV", "").strip()

    if biomart_ref == "":
        biomart_ref = default_biomart_files[argumentClass.biotypes]

    if not os.path.exists(biomart_ref):
        raise FileNotFoundError(
            "Local BioMart TSV not found: %s\n"
            "Generate the BioMart TSV first, or set HARE_BIOMART_TSV to a valid file."
            % biomart_ref
        )

    annotation_ids = pd.read_csv(
        annotation_out,
        sep="\t",
        header=0,
        usecols=[feature_col],
        dtype=str
    )

    annotation_ids[feature_col] = (
        annotation_ids[feature_col]
        .fillna("")
        .astype(str)
        .str.strip()
    )

    requested_ids = [
        x for x in annotation_ids[feature_col].tolist()
        if x != "" and x.lower() != "nan"
    ]

    requested_ids = list(dict.fromkeys(requested_ids))
    ids_count = len(requested_ids)

    if ids_count < 1:
        raise RuntimeError(
            "No valid NEAREST Ensembl gene IDs were found in %s."
            % annotation_out
        )

    biomart_out = f"{argumentClass.output}.biomart"
    biomart_tmp = f"{biomart_out}.tmp"
    locations_out = f"{argumentClass.output}.locations.bed"

    if os.path.exists(biomart_out):
        print(f"\nWARNING: {biomart_out} already exists and will be removed/overwritten.")
        os.remove(biomart_out)

    if os.path.exists(biomart_tmp):
        os.remove(biomart_tmp)

    local_df = pd.read_csv(
        biomart_ref,
        sep="\t",
        header=0,
        dtype=str
    )

    if list(local_df.columns) != biomart_header:
        raise ValueError(
            "Local BioMart TSV columns do not exactly match HARE requirements.\n"
            "File: %s\n"
            "Observed columns: %s\n"
            "Expected columns: %s"
            % (biomart_ref, list(local_df.columns), biomart_header)
        )

    for col in biomart_header:
        local_df[col] = local_df[col].fillna("").astype(str).str.strip()

    local_df["CHR"] = local_df["CHR"].str.replace("^chr", "", regex=True)

    invalid_chr = sorted(
        set(local_df["CHR"].unique()) -
        set([str(i) for i in range(1, 23)])
    )

    if len(invalid_chr) > 0:
        raise ValueError(
            "Local BioMart TSV contains non-autosomal or invalid CHR values: %s"
            % ",".join(invalid_chr[:20])
        )

    for col in ["START", "END"]:
        local_df[col] = pd.to_numeric(local_df[col], errors="coerce")

    local_df = local_df.dropna(subset=["START", "END"]).copy()
    local_df["START"] = local_df["START"].astype(int)
    local_df["END"] = local_df["END"].astype(int)

    if (local_df["START"] <= 0).any() or (local_df["END"] <= 0).any():
        raise ValueError("Local BioMart TSV contains non-positive START or END values.")

    if (local_df["END"] < local_df["START"]).any():
        raise ValueError("Local BioMart TSV contains rows where END < START.")

    duplicated_local_ids = local_df["ENSEMBL_ID"][local_df["ENSEMBL_ID"].duplicated()].unique()

    if len(duplicated_local_ids) > 0:
        raise ValueError(
            "Local BioMart TSV must contain one row per ENSEMBL_ID. "
            "Duplicated ENSEMBL_ID examples: %s"
            % ",".join(list(duplicated_local_ids[:20]))
        )

    order_map = {gene_id: i for i, gene_id in enumerate(requested_ids)}

    biomart_df = local_df[
        local_df["ENSEMBL_ID"].isin(order_map.keys())
    ].copy()

    if len(biomart_df) < 1:
        raise RuntimeError(
            "BioMart location finding failed: none of the VEP NEAREST gene IDs "
            "were found in local TSV: %s"
            % biomart_ref
        )

    biomart_df["_hare_order"] = biomart_df["ENSEMBL_ID"].map(order_map)

    biomart_df = (
        biomart_df
        .sort_values("_hare_order")
        .drop(columns=["_hare_order"])
        .drop_duplicates()
    )

    missing_ids = sorted(set(requested_ids) - set(biomart_df["ENSEMBL_ID"]))

    if len(missing_ids) > 0:
        preview = ",".join(missing_ids[:20])
        print(
            "\nWARNING: %d annotated IDs were not found in local BioMart TSV. "
            "First missing IDs: %s"
            % (len(missing_ids), preview)
        )

    biomart_df.to_csv(
        biomart_out,
        sep="\t",
        header=True,
        index=False
    )

    biomart_df.to_csv(
        biomart_tmp,
        sep="\t",
        header=False,
        index=False
    )

    print("OK")
    print(f"[biomart] Requested annotations: {ids_count}")
    print(f"[biomart] Matched annotations: {len(biomart_df)}")
    print(f"[biomart] Local BioMart TSV: {biomart_ref}")

    print(f"Writing output to {locations_out}...", end="", flush=True)

    locations_df = pd.DataFrame({})
    locations_df[1] = "chr" + biomart_df["CHR"].astype(str).str.replace("^chr", "", regex=True)
    locations_df[2] = biomart_df["START"]
    locations_df[3] = biomart_df["END"]

    locations_df.to_csv(
        locations_out,
        sep="\t",
        header=False,
        index=False
    )

    print("OK")
    return locations_out

'''

patched = s[:start] + new + s[end:]
p.write_text(patched, encoding="utf-8")

print(f"[OK] patched {p}")
PY
```

编译检查：`python -m py_compile "${INTERSECT_PY}"`

```bash
python - <<'PY'
import inspect
import intersect

src = inspect.getsource(intersect.biomart_locate)

ok = True

required_strings = [
    "local BioMart TSV",
    "HARE_BIOMART_TSV",
    "BioMart_GRCh38_Ensembl105.autosomes.protein_coding.HARE.tsv",
    "BioMart_GRCh38_Ensembl105.autosomes.protein_all.HARE.tsv",
    "BioMart_GRCh38_Ensembl105.autosomes.all_gene_biotypes.HARE.tsv",
    "pd.read_csv",
    "locations_out"
]

for x in required_strings:
    if x not in src:
        print("[ERROR] missing:", x)
        ok = False

forbidden_strings = [
    "os.system(run_biomart)",
    "os.system(cmd_biomart)",
    "build_biomart_cmd(argumentClass"
]

for x in forbidden_strings:
    if x in src:
        print("[ERROR] old online BioMart call remains:", x)
        ok = False

if ok:
    print("[OK] biomart_locate() is patched correctly.")
    print("[OK] using:", inspect.getfile(intersect))
else:
    print("[FAIL] patch verification failed.")
PY
```

原来的 `biomart_locate()` 做的是：

```
annotation_out 里的 NEAREST gene IDs
    ↓
拼成最多 400 个一批的 Ensembl ID list
    ↓
build_biomart_cmd()
    ↓
wget https://ensembl.org/biomart/martservice?query=...
    ↓
写出 ${out}.biomart.tmp
    ↓
读入 tmp，合并成 ${out}.biomart
    ↓
取 CHR/START/END 写成 ${out}.locations.bed
```

补丁把 `biomart_locate()` 改成：

```
annotation_out 里的 NEAREST gene IDs
    ↓
根据 --biotypes 选择本地 HARE TSV
    ↓
读入本地 TSV
    ↓
按 ENSEMBL_ID inner join / filter
    ↓
写出 ${out}.biomart
    ↓
写出 ${out}.biomart.tmp
    ↓
取 CHR/START/END 写出 ${out}.locations.bed
```



## S-LDSC

###  Install

```bash
git clone -b ldsc39 https://github.com/CBIIT/ldsc.git
mamba create --name ldsc python=3.9
mamba activate ldsc
mamba install -c conda-forge -c bioconda bitarray=2 nose=1.3 pybedtools=0.10.0 pip flask requests numpy=1.21.5 pandas=1.3.3 scipy=1.7.3 -y

```

### Patch

```

```



### 参考文件下载

```bash
数据地址：
https://zenodo.org/records/10515792
服务器储存地址：
/cpfs01/projects-HDD/cfff-afe2df89e32e_HDD/public/czh_data/Tanzimat/ref/LDSC
GRCh38_bundle  archive  baselineLD_v2.2  baseline_v1.2  hm3_no_MHC.list.txt  plink_files  readme_baseline_versions.txt  weights
```

