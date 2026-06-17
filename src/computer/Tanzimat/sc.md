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
mamba create -n gsMap python>=3.10
mamba activate gsMap
git clone https://github.com/JianYang-Lab/gsMap
cd gsMap
pip install -e .
```

