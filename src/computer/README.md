---
cover: /assets/images/ottoman.jpg
title:  吉祥事变 Auspicious Incident
icon: star-and-crescent
index: false
article: true
sticky: 99
---

<blockquote style="font-style: italic; font-size: 1.2rem; margin-top: 10px; color: #555;">
    "Here let us all for death prepare,<br>
    Or on the last great journey fare."
    <br>
    <span style="font-size: 0.9rem; color: #777;">
        — Vālmīki, <em>Rāmāyaṇa</em> (Ayodhyā-kāṇḍa 2.47.7); English verse trans. Ralph T. H. Griffith, <em>The Ramayana</em>, Book II, Canto XLVII (“The Citizens’ Return”)
    </span>
    <br>
    <span style="font-size: 0.9rem; color: #777;">
        Sanskrit: इहैव निधनं यामो महाप्रस्थानमेव वा।
    </span>
</blockquote>
自壬辰冬时至今，我们处于黑暗时代。——

（批注：耶尼切里：圣经；坦齐马特：歌词；花厅御诏：）

## 耶尼切里 Janissary

——单细胞技术整理

<div class="vp-card-container">
  <VPCard
    title="Janissary"
    desc="/ˈdʒænɪˌseri/ · n. 亲信，近卫；（奥斯曼帝国）土耳其禁卫军士兵"
    background="rgba(12, 188, 30, 0.3)"
    logo="/logoDark.png"
  />
</div>


| 基础代码 | 简介 |
| :--- | :--- |
| [Convert](./convert/) | 格式转换，格式 |
| [SCENIC+](./code/scenicplus.md) | SCENIC+ |
| [gsMap](./gsmap.md) | gsMap |
| [STalign](./code/STalign.md) | STalign 配准 |
| [hdWGCNA](./code/hdWGCNA.md) |  |

### Novae

```bash
mamba create --name novae python=3.12 -y
mamba activate novae
pip install 'novae[multimodal,conch,llm]'
python -m ipykernel install --user --name novae --display-name "Py312 novae"
```

#### novae_gpu

```bash
CONDA_OVERRIDE_GLIBC=2.17 mamba create -n novae_gpu -c conda-forge python=3.12 pip ipykernel "numpy=2.2.*" h5py pyarrow -y
python -m pip install     torch==2.5.1     torchvision==0.20.1     --index-url https://download.pytorch.org/whl/cu121
mamba install "numpy==2.2.6"   "pandas==2.2.3"   "h5py==3.14.0"   "scipy"   "scikit-learn==1.7.1"   "igraph"   "anndata==0.11.4"   "scanpy==1.11.5" -c bioconda -c conda-forge
python -m pip install   --constraint <(printf '%s\n' \                              
    'numpy==2.2.6' \
    'pandas==2.2.3' \
    'h5py==3.14.0' \
    'scipy==1.15.3' \
    'scikit-learn==1.7.1' \
    'igraph==0.11.9' \
    'anndata==0.11.4' \
    'scanpy==1.11.5')   "novae[conch,llm]==1.1.1"
    
python -m ipykernel install --user --name novae-gpu --display-name "Py312 novae-gpu"
```



### Allensdk

```bash
mamba create -n allensdk -c conda-forge python=3.10 scanpy=1.11.5 pip ipykernel jupyterlab -y
python -m pip install "git+https://github.com/AllenInstitute/AllenSDK.git@master"
python -m ipykernel install --user --name allensdk --display-name "Py310 allensdk"
```

```python
python - <<'PY'
import numpy
import pandas
import scipy
import scanpy
import allensdk

print("numpy   :", numpy.__version__)
print("pandas  :", pandas.__version__)
print("scipy   :", scipy.__version__)
print("scanpy  :", scanpy.__version__)
print("allensdk:", allensdk.__version__)
PY
```



##  坦齐马特 Tanzimat

——遗传相关技术整理

<div class="vp-card-container">
   <VPCard
    title="Tanzimat"
    desc="/ˈtanzɪmat/ · n. 改革；（奥斯曼帝国 1839–1876 年的）整顿、重组改革"
    background="var(--vp-c-bg-soft)"
    logo="/logo.png"
  />
</div>
- 隶属于[三二七汉边改革](/medicine/enthalpy.md)

代码分区块整理：



### [PLINK](plink.md)



### 遗传度

#### [GCTA](./Tanzimat/GCTA.md)

👉🏻[文档地址](https://yanglab.westlake.edu.cn/software/gcta/#Overview)

#### [MPH](./Tanzimat/GCTA.md)

👉🏻[文档地址](https://annovar.openbioinformatics.org/en/latest/user-guide/startup/)



### 注释

#### [ANNOVAR](./Tanzimat/ANNOVAR.md)

👉🏻[文档地址](https://annovar.openbioinformatics.org/en/latest/user-guide/startup/)

#### [VEP](./Tanzimat/VEP.md)

👉🏻[文档地址](https://annovar.openbioinformatics.org/en/latest/user-guide/startup/)



### Fine-mapping

[SuSiE](./Tanzimat/SuSiE.md)

[FINEMAP](./Tanzimat/FINEMAP.md)

[GCTB](./Tanzimat/GCTB.md)



### [STAAR](./Tanzimat/STAAR.md)

👉🏻[STAAR github](https://github.com/li-lab-genetics/STAAR)

👉🏻[cellSTAAR github](https://github.com/edvanburen/cellSTAAR/)

👉🏻[MetaSTAARlite github](https://github.com/li-lab-genetics/MetaSTAARlite/)




### [进化基因组学](./Tanzimat/Evolution.md)

👉🏻[HARE](https://github.com/ossmith/HARE)



### [与scRNA-seq的联合分析](./Tanzimat/sc.md)

#### [gsMap](./Tanzimat/sc.md#gsMap)

👉🏻[文档地址](https://yanglab.westlake.edu.cn/gsmap/document/software)



### [freesurfer&fsl](./Tanzimat/fs.md)

👉🏻[文档地址](https://annovar.openbioinformatics.org/en/latest/user-guide/startup/)



## 花厅御诏（Gülhane Hatt-ı Şerif）

——WGS数据基础处理





### [hail]((./Gulhane/hail.md))

👉🏻[教程](https://hail.is/docs/0.2/index.html)

👉🏻[hail-is/HAIL](https://github.com/hail-is/HAIL)

👉🏻[Nealelab/whole_genome_analysis_pipeline](https://github.com/Nealelab/whole_genome_analysis_pipeline)
