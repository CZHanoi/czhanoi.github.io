---
title: gsMap
icon: dna
article: true
cover: Humayun.jpg
category:
  - data
tag:
  - data
---



<blockquote style="font-style: italic; font-size: 1.2rem; margin-top: 10px; color: #555;">
    “酒 极 则 乱，乐 极 则 悲；<br>
    万 事 尽 然。”
    <br>
    <span style="font-size: 0.9rem; color: #777;">— 《史记·滑稽列传》</span>
</blockquote>

（骄兵必败，败兵必哀；哀兵必胜，胜兵必骄（确信）

## HESTA

```
/cwStorage/nodecw_group/czh_data/hsbrain/HESTA
```




### 数据描述

```bash
/HESTA
├── CS12-13_E1S1_HESTA.h5ad
├── CS12-13_E1S2.bin50.substructure.h5ad
├── ...
├── logs
│   └── full.download.log
├── manifest
│   ├── files.txt
│   ├── full.files
│   ├── full.urls
│   ├── index.html
│   ├── md5
│   └── md5.urls
└── S19_CS20_CS23_snRNA_HESTA.h5ad
```





- 原始文献：[Spatiotemporal transcriptome atlas of human embryos after gastrulation](https://www.nature.com/articles/s41586-026-10545-0)

- 数据地址：https://db.cngb.org/hesta/download/
                     https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE326326
- 分析代码：[Yuejiao2025/HESTA](https://github.com/Yuejiao2025/HESTA)
- 主要用途：gsMap



### 长相：

```

```





### 构建记录

```bash
# mamba install -y -c conda-forge aria2 curl coreutils
mkdir -p /cwStorage/nodecw_group/czh_data/hsbrain/HESTA
cd /cwStorage/nodecw_group/czh_data/hsbrain/HESTA

mkdir -p manifest/md5 logs

BASE="https://ftp.cngb.org/pub/SciRAID/stomics/STDS0000394/stomics/"

set -euo pipefail

curl -fL --retry 10 --retry-delay 60 \
  "$BASE" -o manifest/index.html

grep -oE 'href="[^"]+"' manifest/index.html \
  | cut -d '"' -f2 \
  | sed 's|.*/||' \
  | sort -u > manifest/files.txt

grep -E '(HESTA\.h5ad|bin50\.substructure\.h5ad)$' \
  manifest/files.txt > manifest/full.files

sed "s|^|$BASE|" manifest/full.files > manifest/full.urls

wc -l manifest/full.urls

aria2c -c -j32 -x4 -s4 \
  --auto-file-renaming=false --file-allocation=none \
  --max-tries=10 --retry-wait=60 \
  --summary-interval=60 --log-level=notice \
  --dir="$PWD" --input-file=manifest/full.urls \
  --log=logs/full.download.log
```

