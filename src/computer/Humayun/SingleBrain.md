---
title: SingleBrain
icon: dna
article: true
cover: Humayun.jpg
category:
  - data
tag:
  - data
---



<blockquote style="font-style: italic; font-size: 1.2rem; margin-top: 10px; color: #555;">
    “圣 人 不 死，<br>
    大 盗 不 止。”
    <br>
    <span style="font-size: 0.9rem; color: #777;">— 《庄子·胠箧》</span>
</blockquote>





## 数据描述

```bash
SingleBrain/
├── full/                     # 36个完整关联文件：共定位主要用这里
│   ├── Ast_eqtl_full_assoc.tsv.gz
│   ├── Ast1_eqtl_full_assoc.tsv.gz
│   ├── MG_eqtl_full_assoc.tsv.gz
│   ├── MiGA3_eqtl_full_assoc.tsv.gz
│   └── ...
├── top/                      # 36个每基因最强关联文件：浏览、筛选用
│   ├── Ast_eqtl_top_assoc.tsv.gz
│   ├── MG_eqtl_top_assoc.tsv.gz
│   └── ...
├── metadata/                 # 官方记录、数据字典等来源信息
├── manifest/                 # 细胞名称、下载地址、MD5清单
└── logs/                     # 下载与校验日志
```





- 原始文献：[A meta-analysis of single-nucleus expression quantitative trait loci linking genetic risk to brain disorders](https://www.nature.com/articles/s41588-026-02541-x)

- 数据地址：https://zenodo.org/records/14908182
- 在线数据：[SingleBrain Portal](https://singlebrain.nygenome.org/)
- 主要用途：eQTL共定位



### 长相：

```

```





## 构建记录

```bash
# mamba install -c conda-forge aria2 curl jq
mkdir -p /cpfs01/projects-HDD/cfff-afe2df89e32e_HDD/public/czh_data/Tanzimat/ref/colocalization/SingleBrain

cd /cpfs01/projects-HDD/cfff-afe2df89e32e_HDD/public/czh_data/Tanzimat/ref/colocalization/SingleBrain

mkdir -p full top metadata manifest logs

printf '%s\n' Ast End Ext IN MG OD OPC Ast{1..4} Ext{1..8} IN{1..7} MG{1..4} OD{1..3} OPC{1..2} MiGA3 > manifest/cell_types.txt
# cat manifest/cell_types.txt
# wc -l manifest/cell_types.txt

sed 's|^|https://zenodo.org/records/14908182/files/|;s|$|_eqtl_top_assoc.tsv.gz?download=1|' manifest/cell_types.txt > manifest/top.urls

aria2c -c -j2 -x2 -s2 \
  --auto-file-renaming=false --file-allocation=none \
  --max-tries=10 --retry-wait=30 \
  --dir="$PWD/top" --input-file=manifest/top.urls \
  --log=logs/top.download.log
  
  
aria2c -c -j32 -x4 -s4 \
  --auto-file-renaming=false --file-allocation=none \
  --max-tries=5 --retry-wait=60 \
  --summary-interval=60 --log-level=notice \
  --dir="$PWD/full" --input-file=manifest/full.urls \
  --log=logs/full.j4x4.log
  
curl -fL --retry 5 --retry-delay 10 \
  'https://zenodo.org/api/records/14908182' \
  -o metadata/zenodo_14908182.json
  
jq '.id, (.files | length)' metadata/zenodo_14908182.json
jq -r '.metadata.description' metadata/zenodo_14908182.json > metadata/README_source.html
jq -r '.files[] | select(.key | endswith("_full_assoc.tsv.gz")) | "\(.checksum | sub("^md5:";""))  full/\(.key)"' metadata/zenodo_14908182.json > manifest/full.md5
jq -r '.files[] | select(.key | endswith("_top_assoc.tsv.gz")) | "\(.checksum | sub("^md5:";""))  top/\(.key)"' metadata/zenodo_14908182.json > manifest/top.md5

LC_ALL=C md5sum -c manifest/top.md5 manifest/full.md5 > logs/md5check.log 2>&1 && echo "MD5 is OK!"
grep -c ': OK$' logs/md5check.log
```

