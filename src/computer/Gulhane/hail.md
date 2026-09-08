---
title: hail
icon: dna
article: true
cover: annovar.jpg
category:
  - code
tag:
  - format
---

<blockquote style="font-style: italic; font-size: 1.2rem; margin-top: 10px; color: #555;">
    "Multitudes, multitudes in the valley of decision:<br>
    for the day of the LORD is near<br>
    in the valley of decision."
    <br>
    <span style="font-size: 0.9rem; color: #777;">— Joel 3:14 (King James Version)</span>
</blockquote>




## hail

### 安装

```bash
mamba env create -f hail.yml
mamba activate hail
python -m ipykernel install --user --name novae-gpu --display-name "Py312 novae-gpu"
```

`hail.yml`在`/cwStorage/home/chenzhh/Env/hail.yml`

```yaml
name: hail

channels:
  - conda-forge

dependencies:
  # Python
  - python=3.10

  # Java
  - openjdk=11

  # C / C++ runtime and compiler toolchain
  - libgcc-ng
  - libstdcxx-ng
  - gcc_linux-64
  - gxx_linux-64
  - make
  - pkg-config

  # BLAS / LAPACK
  - openblas
  - libblas
  - liblapack

  # Python packaging tools
  - pip
  - setuptools
  - wheel
  - ipykernel

  # Install Hail from PyPI rather than Bioconda
  - pip:
      - hail
```



### 使用
