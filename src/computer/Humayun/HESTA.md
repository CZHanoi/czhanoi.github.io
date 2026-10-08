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

```bash
/cwStorage/nodecw_group/czh_data/hsbrain/HESTA
/cpfs01/projects-HDD/cfff-afe2df89e32e_HDD/public/czh_data/Tanzimat/ref/gsmap/HESTA
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

```python
# /cwStorage/home/chenzhh/Tanzimat/Mujigae/HESTA-check.ipynb
import scanpy as sc
import pandas as pd
adata = sc.read_h5ad("/cwStorage/nodecw_group/czh_data/hsbrain/HESTA/CS23_E2S5_HESTA.h5ad")
adata_bin50 = sc.read_h5ad("/cwStorage/nodecw_group/czh_data/hsbrain/HESTA/CS23_E2S5.bin50.substructure.h5ad")
print("CS23_E2S5_HESTA.h5ad")
print(adata)
print("CS23_E2S5.bin50.substructure.h5ad")
print(adata_bin50)
```

```
CS23_E2S5_HESTA.h5ad
AnnData object with n_obs × n_vars = 671089 × 50470
    obs: 'orig.ident', 'x', 'y', 'n_genes_by_counts', 'log1p_n_genes_by_counts', 'total_counts', 'log1p_total_counts', 'pct_counts_in_top_50_genes', 'pct_counts_in_top_100_genes', 'pct_counts_in_top_200_genes', 'pct_counts_in_top_500_genes', 'total_counts_mt', 'log1p_total_counts_mt', 'pct_counts_mt', 'cellid', 'celltype', 'stage'
    var: 'mt', 'n_cells_by_counts', 'mean_counts', 'log1p_mean_counts', 'pct_dropout_by_counts', 'total_counts', 'log1p_total_counts', 'n_cells'
    uns: 'celltype_colors', 'log1p', 'sn'
    obsm: 'spatial'
    layers: 'counts'
CS23_E2S5.bin50.substructure.h5ad
AnnData object with n_obs × n_vars = 563390 × 49338
    obs: 'n_genes_by_counts', 'log1p_n_genes_by_counts', 'total_counts', 'log1p_total_counts', 'pct_counts_in_top_50_genes', 'pct_counts_in_top_100_genes', 'pct_counts_in_top_200_genes', 'pct_counts_in_top_500_genes', 'total_counts_mt', 'log1p_total_counts_mt', 'pct_counts_mt', 'stage', 'substructure', 'organ', 'clusters', 'sample', 'cellid'
    var: 'mt', 'n_cells_by_counts', 'mean_counts', 'log1p_mean_counts', 'pct_dropout_by_counts', 'total_counts', 'log1p_total_counts', 'n_cells', 'mean', 'std', 'highly_variable', 'means', 'dispersions', 'dispersions_norm'
    uns: '__type', 'dendrogram_clusters', 'hvg', 'leiden', 'leiden_2.2_colors', 'leiden_2.4_colors', 'leiden_2.6_colors', 'leiden_2.8_colors', 'leiden_3.0_colors', 'log1p', 'neighbors', 'pca', 'rank_genes_groups', 'spatial_neighbors', 'substructure_colors', 'umap'
    obsm: 'X_pca', 'X_umap', 'old_spatial', 'spatial'
    varm: 'PCs'
    layers: 'counts', 'log'
    obsp: 'connectivities', 'distances', 'spatial_connectivities', 'spatial_distances'
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

