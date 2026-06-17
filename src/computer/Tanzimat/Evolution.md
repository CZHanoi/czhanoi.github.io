---
title: Evolution
icon: dna
article: false
category:
  - code
tag:
  - format
---

<blockquote style="font-style: italic; font-size: 1.2rem; margin-top: 10px; color: #555;">
    "How can I move thee?<br>
    Will no entreaties cause thee to turn a favourable eye upon thy creature,<br>
    who implores thy goodness and compassion?"
    <br>
    <span style="font-size: 0.9rem; color: #777;">— Mary Wollstonecraft Shelley, <em>Frankenstein; or, The Modern Prometheus</em>, Chapter 10</span>
</blockquote>


```bash
mamba create -y -n hare -c conda-forge -c bioconda -c defaults python=3.11 pip setuptools=52.0.0 bedtools=2.30.0 ensembl-vep=105 perl=5.32 perl-bioperl=1.7.8 perl-set-intervaltree perl-compress-raw-zlib htslib samtools git wget unzip numpy pandas scipy matplotlib
git clone https://github.com/ossmith/HARE.git
cd HARE
mamba activate hare
python -m pip install .
```

