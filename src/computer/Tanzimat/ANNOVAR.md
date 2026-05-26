---
title: ANNOVAR
icon: dna
article: true
cover: annovar.jpg
category:
  - code
tag:
  - format
---

<blockquote style="font-style: italic; font-size: 1.2rem; margin-top: 10px; color: #555;">
    "Come unto me, all ye that labour and are heavy laden,<br>
    and I will give you rest."
    <br>
    <span style="font-size: 0.9rem; color: #777;">— Matthew 11:28 (King James Version)</span>
</blockquote>





## ANNOVAR



cfff平台`ANNOVAR`可以调用

```bash
/cpfs01/projects-HDD/cfff-afe2df89e32e_HDD/public/czh_data/Tanzimat/software/annovar/
```

数据库功能介绍：



|        Db        |  Op  |                 Full-name                  |                          简介                          |
| :--------------: | :--: | :----------------------------------------: | :----------------------------------------------------: |
|     avsnp151     | `f`  |         dbSNP151 allelic splitting         |                      **补 rsID**                       |
|     ensGene      | `g`  |           hg38 GENCODE v46 Basic           |                 判断基因位置和功能类别                 |
| gnomad41_genome  | `f`  |             gnomAD v4.1 genome             |                       查人群频率                       |
|    dbnsfp47a     | `f`  |                dbNSFP v4.7a                |             主要服务 coding/missense 变异              |
|     cytoBand     | `r`  |                                            |                   染色体带，方便报告                   |
| clinvar_20250721 | `f`  |          ClinVar (2025.7 Update)           |                   临床意义 (Benign…)                   |
|   GTEx_v8_eQTL   | `f`  | GTEx v8 Expression Quantitative Trait Loci | 是否为 GTEx v8 显著 eQTL<br />关联表达调控、组织和基因 |
|   GTEx_v8_sQTL   | `f`  |  GTEx v8 Splicing Quantitative Trait Loci  | 是否为 GTEx v8 显著 sQTL<br />关联剪接调控、组织和基因 |
|     allofus      | `f`  |      All of Us allele frequency data       |                      罕见变异过滤                      |
|    regeneron     | `f`  |   Regeneron exome allele frequency data    |                 Regeneron 外显子频率库                 |

三类操作：

|  Op  |  Full-name   | 介绍                                                         |
| :--: | :----------: | :----------------------------------------------------------- |
| `g`  |  gene-based  | **看变异对基因和转录本的影响**<br />**①**变异相对基因的位置<br />    外显子 内含子 UTR 剪接区 基因间区<br />**②**若为coding variant，氨基酸变化情况<br />    是否造成 synonymous、nonsynonymous、stopgain、frameshift |
| `r`  | region-based | **看变异是否落在某类基因组区域**<br />变异落在染色体带的位置（区域重叠，不关心碱基是否相同） |
| `f`  | filter-based | **看变异是否和某个数据库里的具体变异精确匹配**<br />变异在某个数据库里的情况（必须 chr/start/end/ref/alt 精确匹配） |

标准输入：

最标准的 ANNOVAR 输入是 `.avinput`，前 5 列固定：

```
chromosome    start    end    reference_allele    observed_allele
1    948921    948921    T     C
```

ANNOVAR只强制使用前 5 列，后面的列可以自己的信息，比如 trait、P 值、BETA、ID 等；
运行 `table_annovar.pl` 时加 `-otherinfo`，这些额外列会被带到输出结果里。









## 数据库下载过程

本地下载：

```bash
BASEURL="http://www.openbioinformatics.org/annovar/download"

cat > annovar_hg38_all_files.txt <<'EOF'
hg38_avsnp151.txt.gz
hg38_avsnp151.txt.idx.gz
hg38_ensGene.txt.gz
hg38_ensGeneMrna.fa.gz
hg38_gnomad41_genome.txt.gz
hg38_gnomad41_genome.txt.idx.gz
hg38_dbnsfp47a.txt.gz
hg38_dbnsfp47a.txt.idx.gz
hg38_clinvar_20250721.txt.gz
hg38_clinvar_20250721.txt.idx.gz
hg38_GTEx_v8_eQTL.txt.gz
hg38_GTEx_v8_eQTL.txt.idx.gz
hg38_GTEx_v8_sQTL.txt.gz
hg38_GTEx_v8_sQTL.txt.idx.gz
hg38_allofus.txt.gz
hg38_allofus.txt.idx.gz
hg38_regeneron.txt.gz
hg38_regeneron.txt.idx.gz
EOF

while read -r f
do
  echo "Downloading $f"
  curl -fL --retry 20 --retry-delay 10 -C - -O "${BASEURL}/${f}"
done < annovar_hg38_all_files.txt
# cytoBand来自UCSC
curl -fL --retry 20 --retry-delay 10 -C - \
  -o hg38_cytoBand.txt.gz \
  http://hgdownload.soe.ucsc.edu/goldenPath/hg38/database/cytoBand.txt.gz
```

检验兼容性：

```bash
for f in *.gz
do
  echo "Testing $f"
  gzip -t "$f"
done
```

上传至服务器：

```bash
# rsync
rsync -avP --append-verify -e "ssh -p 30143" \
  *.gz \
  zy_22111220045@10.193.2.99:/cpfs01/projects-HDD/cfff-afe2df89e32e_HDD/public/czh_data/Tanzimat/software/annovar/humandb/
# or scp
scp -P 30143 *.gz \
  zy_22111220045@10.193.2.99:/cpfs01/projects-HDD/cfff-afe2df89e32e_HDD/public/czh_data/Tanzimat/software/annovar/humandb/
```

检查完整性：

```bash
for f in \
  hg38_avsnp151.txt.gz \
  hg38_avsnp151.txt.idx.gz \
  hg38_ensGene.txt.gz \
  hg38_ensGeneMrna.fa.gz \
  hg38_gnomad41_genome.txt.gz \
  hg38_gnomad41_genome.txt.idx.gz \
  hg38_dbnsfp47a.txt.gz \
  hg38_dbnsfp47a.txt.idx.gz \
  hg38_clinvar_20250721.txt.gz \
  hg38_clinvar_20250721.txt.idx.gz \
  hg38_GTEx_v8_eQTL.txt.gz \
  hg38_GTEx_v8_eQTL.txt.idx.gz \
  hg38_GTEx_v8_sQTL.txt.gz \
  hg38_GTEx_v8_sQTL.txt.idx.gz \
  hg38_allofus.txt.gz \
  hg38_allofus.txt.idx.gz \
  hg38_regeneron.txt.gz \
  hg38_regeneron.txt.idx.gz \
  hg38_cytoBand.txt.gz
do
  echo "Testing $f"
  gzip -t "$f"
done
```

解压：

```bash
for gz in \
  hg38_avsnp151.txt.gz \
  hg38_avsnp151.txt.idx.gz \
  hg38_ensGene.txt.gz \
  hg38_ensGeneMrna.fa.gz \
  hg38_gnomad41_genome.txt.gz \
  hg38_gnomad41_genome.txt.idx.gz \
  hg38_dbnsfp47a.txt.gz \
  hg38_dbnsfp47a.txt.idx.gz \
  hg38_clinvar_20250721.txt.gz \
  hg38_clinvar_20250721.txt.idx.gz \
  hg38_GTEx_v8_eQTL.txt.gz \
  hg38_GTEx_v8_eQTL.txt.idx.gz \
  hg38_GTEx_v8_sQTL.txt.gz \
  hg38_GTEx_v8_sQTL.txt.idx.gz \
  hg38_allofus.txt.gz \
  hg38_allofus.txt.idx.gz \
  hg38_regeneron.txt.gz \
  hg38_regeneron.txt.idx.gz \
  hg38_cytoBand.txt.gz
do
  out="${gz%.gz}"
  if [ -s "$out" ]; then
    echo "SKIP exists: $out"
  else
    echo "Decompressing: $gz"
    # gzip -t "$gz"
    gzip -cd "$gz" > "${out}.tmp"
    mv -f "${out}.tmp" "$out"
  fi
done
```



