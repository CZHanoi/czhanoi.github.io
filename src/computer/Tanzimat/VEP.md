---
title: VEP
icon: dna
article: true
cover: annovar.jpg
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





## VEP

## 数据库下载以及准备

### `rsID_Pos.txt`

```bash
cd /cpfs01/projects-HDD/cfff-afe2df89e32e_HDD/public/czh_data/Tanzimat/ref/VEP
mkdir -p dbsnp_hg38
cd dbsnp_hg38

wget https://ftp.ncbi.nih.gov/snp/latest_release/VCF/GCF_000001405.40.gz
wget https://ftp.ncbi.nih.gov/snp/latest_release/VCF/GCF_000001405.40.gz.tbi
```



### `Biomart_export.csv`

```R
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
  # GITHUB_PAT  = "贴出github_token"
)

library(biomaRt)

mart <- useEnsembl(
    biomart = "genes",
    dataset = "hsapiens_gene_ensembl",
    version = 115
)

x <- getBM(
    attributes = c(
        "ensembl_gene_id",
        "ensembl_gene_id_version",
        "start_position",
        "end_position",
        "external_gene_name"# "hgnc_symbol"
    ),
    mart = mart
)

colnames(x) <- c(
    "Gene stable ID",
    "Gene stable ID version",
    "Gene start (bp)",
    "Gene end (bp)",
    "Gene name"
)

write.csv(x, "Biomart_export.csv", row.names = FALSE, quote = FALSE)
```

