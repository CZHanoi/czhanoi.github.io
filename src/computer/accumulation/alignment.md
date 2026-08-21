---
title: ST配准
date: 2026-02-3
cover: Qajar.jpg
category:
  - code
tag:
  - scRNAseq
  - format
  - ST
star: true
article: true
---



## 环境安装

### STAlign



### Allensdk

```bash
mamba create -n allensdk python=3.10 numpy=1.23 pandas=1.5.3 "scipy<1.11" "xarray<2023.2.0"  scanpy=1.10.4 python-igraph  leidenalg ipykernel -y
pip install allensdk
python -m ipykernel install --user --name allensdk --display-name "Py310 allensdk"
```

验证：

```python
import allensdk
print(allensdk.__version__)
# 2.16.2
import scanpy
print(scanpy.__version__)
# 1.10.4
```



