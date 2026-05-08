---
title: SCENIC+
date: 2026-03-25
cover: scenic.jpg
category:
  - code
tag:
  - scRNAseq
  - Goni2
star: False
article: False
---





## Installation

### new

```bash
mamba create -n Mujigae -c conda-forge -c bioconda --strict-channel-priority python=3.11 scenicplus pycistopic ipykernel -y
python -m ipykernel install --user --name=mujigae --display-name "Mujigae Py311"

pip install lda

mamba install openjdk
```



### old

①首先将这五个包在github上下载并上传至服务器`~/packgae_python`

②安装代码

```bash
cd /public/home/chenzhh/packgae_python

mamba create -n Mujigae python=3.11.8 -y
mamba activate Mujigae

mamba install -y -c conda-forge -c bioconda python-annoy pybedtools pybigwig pybigtools pysam macs2 bedtools python-igraph leidenalg pytables scatac-fragment-tools
#pip编译困难包↑

grep -Ev 'git\+https://github.com/aertslab/|^(annoy|pybedtools|pyBigWig|pybigtools|pysam|macs2|igraph|leidenalg|tables|scatac-fragment-tools)==' \
  scenicplus/requirements.txt > /tmp/scenicplus.req


python -m pip install -U pip "setuptools==79.0.1" wheel setuptools-scm
python -m pip install -r /tmp/scenicplus.req

#  python -m pip install --force-reinstall "igraph==0.11.4" "leidenalg==0.10.2" "pybedtools==0.9.1" "pybigtools==0.1.2" "pysam==0.22.0" "tables==3.9.2" --no-deps

python -m pip install --no-deps ./pySCENIC ./LoomXpy ./pycistarget ./pycisTopic ./scenicplus
pip install "matplotlib-inline==0.1.7"
```

③验证

```bash
python - <<'PY'
import scenicplus, pycisTopic, pycistarget, pyscenic, loomxpy
print("SCENIC+ install OK")
PY
```

④后续

```bash
mamba install ipykernel
python -m ipykernel install --user --name=mujigae --display-name "Mujigae Py311"
```



### create_cistarget_databases 安装



```
mamba create -n create_cistarget_databases \
    'python=3.10' \
    'numpy=1.21' \
    'pandas>=1.4.1' \
    'pyarrow>=7.0.0' \
    'numba>=0.55.1' \
    'python-flatbuffers'
```



```bash
mamba activate create_cistarget_databases

cd "${CONDA_PREFIX}/bin"
# mamba install -c conda-forge wget ca-certificates openssl -y
# Download precompiled Cluster-Buster binary.
wget https://resources.aertslab.org/cistarget/programs/cbust

# Make downloaded binary executable.
chmod a+x cbust

# Download liftOver.
wget http://hgdownload.soe.ucsc.edu/admin/exe/linux.x86_64/liftOver

# Download bigWigAverageOverBed.
wget http://hgdownload.soe.ucsc.edu/admin/exe/linux.x86_64/bigWigAverageOverBed

# Make downloaded binaries executable.
chmod a+x liftOver bigWigAverageOverBed
```

安装之后：

```bash
(create_cistarget_databases) [chenzhh@headcw create_cisTarget_databases-master]$ pwd
/cwStorage/home/chenzhh/package/python/create_cisTarget_databases-master
(create_cistarget_databases) [chenzhh@headcw create_cisTarget_databases-master]$ ls
bigwigaverageoverbed.py
cistarget_db.py
clusterbuster.py
combine_partial_motifs_or_tracks_vs_regions_or_genes_scores_cistarget_dbs.py
combine_partial_regions_or_genes_vs_motifs_or_tracks_scores_cistarget_dbs.py
convert_cistarget_databases_v1_to_v2.py
convert_feather_db_to_sqlite3_db.py
convert_motifs_or_tracks_vs_regions_or_genes_scores_to_rankings_cistarget_dbs.py
create_cistarget_motif_databases.py
create_cistarget_track_databases.py
create_cross_species_motifs_rankings_db.py
create_fasta_with_padded_bg_from_bed.sh
feather_v1_fbs
feather_v1_or_v2.py
orderstatistics.py
pyproject.toml
README.md
test_cistarget_db.py
test_orderstatistics.py
```

