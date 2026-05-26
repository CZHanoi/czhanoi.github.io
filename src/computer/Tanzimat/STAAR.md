---
title: STAAR
icon: dna
article: false
category:
  - code
tag:
  - Tanzimat
  - STAAR
---

<blockquote style="font-style: italic; font-size: 1.2rem; margin-top: 10px; color: #555;">
    "The ancient Oracle said that I was the wisest of all the Greeks.<br>
    It is because I alone, of all the Greeks, know that I know nothing."
    <br>
    <span style="font-size: 0.9rem; color: #777;">— Plato, Apology 21a–23b (paraphrase of Socrates)</span>
</blockquote>



## 环境安装

```bash
mamba create -n STAAR -c conda-forge -c bioconda -c r r-base r-remotes r-devtools r-biocmanager bioconductor-genesis bioconductor-rtracklayer bioconductor-seqarray bioconductor-seqvartools git make pkg-config cxx-compiler fortran-compiler zlib libzlib zstd libdeflate -y

mamba activate STAAR
R
```

进入R安装：

```R
library(devtools)

proxy <- "http://127.0.0.1:17897"

Sys.setenv(
  http_proxy  = proxy,
  https_proxy = proxy,
  HTTP_PROXY  = proxy,
  HTTPS_PROXY = proxy,
  all_proxy   = proxy,
  ALL_PROXY   = proxy,
  no_proxy    = "localhost,127.0.0.1,::1",
  NO_PROXY    = "localhost,127.0.0.1,::1",
  GITHUB_PAT  = "贴出github_token"
)

Sys.getenv("GITHUB_PAT")

devtools::install_github("xihaoli/STAAR", auth_token = Sys.getenv("GITHUB_PAT"))
remotes::install_github(
  "edvanburen/cellSTAAR",
  auth_token = Sys.getenv("GITHUB_PAT")
)
```



```
ln -sf /cpfs01/projects-HDD/cfff-afe2df89e32e_HDD/public/gyj_data/software/plink2 "$CONDA_PREFIX/bin/plink2"
ln -sf /cpfs01/projects-HDD/cfff-afe2df89e32e_HDD/public/gyj_data/software/gcta   "$CONDA_PREFIX/bin/gcta"
ln -sf /cpfs01/projects-HDD/cfff-afe2df89e32e_HDD/public/gyj_data/software/mph    "$CONDA_PREFIX/bin/mph"

which plink2
which gcta
which mph
```

