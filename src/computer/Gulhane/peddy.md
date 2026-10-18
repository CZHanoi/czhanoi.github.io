---
title: peddy
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




## Peddy

### 安装

```bash
mamba create -n peddy -y --override-channels -c conda-forge -c bioconda python=3.10 numpy=1.26.4 "pandas<3" cython cyvcf2 networkx matplotlib scikit-learn click coloredlogs seaborn ipykernel plink plink2 bcftools r-base r-data.table
# git clone https://github.com/brentp/peddy
mamba activate peddy
cd /cpfs01/projects-HDD/cfff-afe2df89e32e_HDD/public/czh_data/Tanzimat/env/peddy
python -m pip install --no-deps --no-build-isolation -e .

python -m ipykernel install --user --name peddy --display-name "Py310 peddy"
```

