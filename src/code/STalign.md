---
title: STalign
date: 2026-03-26
cover: STalign.gif
category:
  - code
tag:
  - scRNAseq
  - Goni2
star: true
article: true
---



## ①Install

需要手动将`STalign.git`上传到服务器上。

```bash
/cwStorage/home/chenzhh/package/python/STalign-main
```

然后`mamba`安装

```bash
mamba create -f /cwStorage/home/chenzhh/Env/STalign.yml
```

其中，`STAlign.yml`内容如下：

```yaml
name: STalign
channels:
  - pytorch
  - nvidia
  - conda-forge
dependencies:
  - python=3.8
  - pip
  - numpy=1.23.4
  - pandas=2.0.0
  - networkx=3.1
  - scikit-image
  - matplotlib
  - plotly=5.14.1
  - tenacity=8.2.2
  - openpyxl=3.1.1
  - et_xmlfile=1.1.0
  - pillow=9.5.0
  - requests=2.28.1
  - pyyaml=6.0
  - filelock=3.11.0
  - webencodings=0.5.1
  - yarg=0.1.9
  - imagesize=1.4.1
  - kiwisolver=1.4.4
  - fonttools=4.39.3
  - docopt=0.6.2
  - pygments=2.15.0
  - markdown-it-py=2.2.0
  - mdit-py-plugins=0.3.5
  - mdurl=0.1.2
  - mpmath=1.3.0
  - pytz=2023.3
  - pynrrd=1.0.0
  - nptyping=2.5.0
  - sympy=1.11.1
  - tornado=6.2
```

然后安装对应依赖和源包安装

```bash
cd /cwStorage/home/chenzhh/package/python/STalign-main
pip install .
```

安装`kernel`

```
mamba install ipykernel -y
python -m ipykernel install --user --name stalign --display-name "Py38 STalign"
```

