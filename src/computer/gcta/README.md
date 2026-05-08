---
title: GCTA
icon: dna
article: false
category:
  - code
tag:
  - format
---

<blockquote style="font-style: italic; font-size: 1.2rem; margin-top: 10px; color: #555;">
    "Do not be quick to anger,<br>
    for once you are angry, you will reveal your true skill;<br>
    and then others will discover<br>
    that your true skill is not very good."
    <br>
    <span style="font-size: 0.9rem; color: #777;">— Arabic proverb</span>
</blockquote>


```bash
mamba create -n Tanzimat -c conda-forge python=3.11 numpy pandas jupyterlab ipykernel
mamba activate Tanzimat
ln -sf /cpfs01/projects-HDD/cfff-afe2df89e32e_HDD/public/gyj_data/software/plink2 "$CONDA_PREFIX/bin/plink2"
ln -sf /cpfs01/projects-HDD/cfff-afe2df89e32e_HDD/public/gyj_data/software/gcta   "$CONDA_PREFIX/bin/gcta"
ln -sf /cpfs01/projects-HDD/cfff-afe2df89e32e_HDD/public/gyj_data/software/mph    "$CONDA_PREFIX/bin/mph"

which plink2
which gcta
which mph
```

