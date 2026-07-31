---
title: FINEMAP
icon: dna
article: true
cover: Silla.jpg
category:
  - code
  - knowledge
tag:
  - Tanzimat
---

<blockquote style="font-style: italic; font-size: 1.2rem; margin-top: 10px; color: #555;"> "Cleanse my heart from all vain, evil, and wandering thoughts;<br>Enlighten my understanding;<br>Kindle my affections." <br> <span style="font-size: 0.9rem; color: #777;">— the Prayer Before the Divine Office (<em>Aperi, Domine, os meum</em>)</span> </blockquote>



## Install & Calling

```shell
mamba create -y -n FM   --override-channels   -c conda-forge   -c bioconda   python=3.11   jupyterlab   notebook   ipykernel   numpy   pandas   scipy   matplotlib   pyarrow   openpyxl   r-base=4.4   r-data.table   r-matrix   r-ggplot2   r-irkernel   finemap=1.4.2   plink2   gcta
mamba activate FM
R
```



```R
# install.packages("remotes")
remotes::install_github("stephenslab/susieR")
# Rscript -e 'IRkernel::installspec(name="ir-fm", displayname="R (FM: SuSiE)")'
IRkernel::installspec(user = TRUE, name = "r-fm", displayname = "R453 Finemapping")
```



```shell
python -m ipykernel install --user --name FM --display-name "Py311 Finemapping"

GCTB_HOME="/cpfs01/projects-HDD/cfff-afe2df89e32e_HDD/public/czh_data/Tanzimat/software/gctb/2.5.5"
GCTB_BIN="${GCTB_HOME}/bin"
readlink -f "${GCTB_BIN}/gctb"
# /cpfs01/projects-HDD/cfff-afe2df89e32e_HDD/public/czh_data/Tanzimat/software/gctb/2.5.5/dist/gctb_2.5.5_Linux/gctb
```



```bash
mkdir -p \
  "${CONDA_PREFIX}/etc/conda/activate.d" \
  "${CONDA_PREFIX}/etc/conda/deactivate.d"

cat > "${CONDA_PREFIX}/etc/conda/activate.d/gctb.sh" <<'EOF'
export _FM_PATH_BEFORE_GCTB="${PATH}"
export GCTB_HOME="/cpfs01/projects-HDD/cfff-afe2df89e32e_HDD/public/czh_data/Tanzimat/software/gctb/2.5.5"
export PATH="${GCTB_HOME}/bin:${PATH}"
EOF

cat > "${CONDA_PREFIX}/etc/conda/deactivate.d/gctb.sh" <<'EOF'
if [[ -n "${_FM_PATH_BEFORE_GCTB:-}" ]]; then
  export PATH="${_FM_PATH_BEFORE_GCTB}"
fi

unset _FM_PATH_BEFORE_GCTB
unset GCTB_HOME
EOF
```

我的建议是直接建立软链接：



```bash
GCTB_REAL="/cpfs01/projects-HDD/cfff-afe2df89e32e_HDD/public/czh_data/Tanzimat/software/gctb/2.5.5/dist/gctb_2.5.5_Linux/gctb"
ln -s \
  "${GCTB_REAL}" \
  "${CONDA_PREFIX}/bin/gctb"
readlink -f "${CONDA_PREFIX}/bin/gctb"
```



```bash
mamba env export -n FM --no-builds > /cpfs01/projects-HDD/cfff-afe2df89e32e_HDD/zy_22111220045/Env/FM_environment.yml
```



## FINEMAP原理

### FINEMAP: 

FINEMAP 是一种**基于贝叶斯变量选择的局部精细定位方法**，

