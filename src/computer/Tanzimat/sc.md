---
title: gwas→scRNA-seq
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




## scPagwas

<div class="vp-card-container">
  <VPCard
    title="scPagwas"
    desc="scRNA-seq"
    background="rgba(12, 188, 30, 0.3)"
    logo="/logo/scPagwas-logo.png"
  />
</div>

### ①install

`ISTBI`

```bash
mamba create -n scPagwas -c conda-forge -c bioconda \
  r-base=4.3 \
  r-remotes r-devtools \
  r-seurat r-seuratobject \
  r-ggpubr r-data.table r-dplyr r-ggplot2 r-reshape2 \
  r-matrix r-irlba r-glmnet r-rcpp \
  r-bigmemory r-biganalytics r-bigstatsr r-bigreadr \
  r-ggthemes r-ggsci r-ggtext r-gridextra \
  bioconductor-genomicranges bioconductor-iranges bioconductor-rhdf5 \
  git make gcc_linux-64 gxx_linux-64 \
  r-xml r-grimport2 r-haven r-tidyverse r-wgcna \
  bioconductor-impute bioconductor-preprocesscore \
  libxml2 zlib libzlib pkg-config \
  r-irkernel
-y

mamba activate scPagwas

R
```



```R
proxy <- "http://127.0.0.1:17897"

Sys.setenv(
  http_proxy  = proxy,
  https_proxy = proxy,
  HTTP_PROXY  = proxy,
  HTTPS_PROXY = proxy,
  all_proxy   = proxy,
  ALL_PROXY   = proxy,
  no_proxy    = "localhost,127.0.0.1,::1",
  NO_PROXY    = "localhost,127.0.0.1,::1"
)
library(devtools)
install_git("https://github.com/WMU-SuLab/scPagwas.git", ref = "main")
Rscript -e 'IRkernel::installspec(user = TRUE, name = "scpagwas", displayname = "scPagwas-R")'
```



## gsMap

`cfff-2604`

```bash
mamba create -n gsMap python=3.11.17
mamba install -c conda-forge "numpy<2" pandas scipy scikit-learn matplotlib seaborn tqdm pyyaml python-kaleido zarr bitarray jinja2 plotly scanpy "scikit-misc==0.4.0" pyarrow
mamba install -c conda-forge -c bioconda "bitarray<3" pyranges sorted_nearest
git clone https://github.com/JianYang-Lab/gsMap
cd gsMap
pip install -e .
```



## scRDS



```bash
mamba create -n scDRS --override-channels -c conda-forge -c bioconda python=3.11 pip git numpy=1.26.4 scipy=1.11.4 pandas=1.5.3 scanpy=1.11.5 anndata=0.10.9 numba=0.59.1 matplotlib-base=3.8.4 "zarr<3" statsmodels tqdm fire pytest ipykernel -y
mamba activate scDRS
pip install "scikit-misc==0.3.1"
git clone https://github.com/martinjzhang/scDRS.git
cd /cpfs01/projects-HDD/cfff-afe2df89e32e_HDD/public/czh_data/Tanzimat/env/scDRS
pip install .
python -m ipykernel install --user --name scdrs --display-name "Py311 scDRS"
```

检查安装代码：

```bash
python -m pytest tests/test_CLI.py -p no:warnings
```

```python
import os
import pandas as pd
import scdrs

DATA_PATH = scdrs.__path__[0]
H5AD_FILE = os.path.join(DATA_PATH, "data/toydata_mouse.h5ad")
COV_FILE = os.path.join(DATA_PATH, "data/toydata_mouse.cov")
GS_FILE = os.path.join(DATA_PATH, "data/toydata_mouse.gs")

# Load .h5ad file, .cov file, and .gs file
adata = scdrs.util.load_h5ad(H5AD_FILE, flag_filter_data=False, flag_raw_count=False)
df_cov = pd.read_csv(COV_FILE, sep="\t", index_col=0)
df_gs = scdrs.util.load_gs(GS_FILE)

# Preproecssing .h5ad data compute scDRS score
scdrs.preprocess(adata, cov=df_cov)
gene_list = df_gs['toydata_gs_mouse'][0]
gene_weight = df_gs['toydata_gs_mouse'][1]
df_res = scdrs.score_cell(adata, gene_list, gene_weight=gene_weight, n_ctrl=20)

print(df_res.iloc[:4])
```

