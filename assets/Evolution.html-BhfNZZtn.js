import{_ as i,c as n,d as a,o as l}from"./app-DTArMG66.js";const e={};function t(p,s){return l(),n("div",null,s[0]||(s[0]=[a(`<blockquote style="font-style:italic;font-size:1.2rem;margin-top:10px;color:#555;"> &quot;How can I move thee?<br> Will no entreaties cause thee to turn a favourable eye upon thy creature,<br> who implores thy goodness and compassion?&quot; <br><span style="font-size:0.9rem;color:#777;">— Mary Wollstonecraft Shelley, <em>Frankenstein; or, The Modern Prometheus</em>, Chapter 10</span></blockquote><h2 id="hare" tabindex="-1"><a class="header-anchor" href="#hare"><span>HARE</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">mamba</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> create</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -y</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -n</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> HARE</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -c</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> conda-forge</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -c</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> bioconda</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -c</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> defaults</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> python=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">3.11</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> pip</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> setuptools</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> bedtools=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">2.30.0</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> ensembl-vep=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">105</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> perl=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">5.32</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> perl-bioperl=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">1.7.8</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> perl-set-intervaltree</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> perl-compress-raw-zlib</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> htslib</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> samtools</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> git</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> wget</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> unzip</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> numpy</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> pandas</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> scipy</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> matplotlib</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> clone</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> https://github.com/ossmith/HARE.git</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">cd</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> HARE</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">mamba</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> activate</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> hare</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">python</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -m</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> pip</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> install</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> .</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="patch" tabindex="-1"><a class="header-anchor" href="#patch"><span>Patch</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">source</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> /cwStorage/home/chenzhh/miniforge3/etc/profile.d/conda.sh</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">conda</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> activate</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> /cwStorage/home/chenzhh/miniforge3/envs/HARE</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">INTERSECT_PY</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;$(</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">python</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> - </span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;&lt;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;PY&#39;</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">import inspect</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">import intersect</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">print(inspect.getfile(intersect))</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">PY</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">)&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;[patch] target intersect.py:&quot;</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;</span><span style="--shiki-light:#E45649;--shiki-dark:#98C379;">\${</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">INTERSECT_PY</span><span style="--shiki-light:#E45649;--shiki-dark:#98C379;">}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 备份</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">cp</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -a</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;</span><span style="--shiki-light:#E45649;--shiki-dark:#98C379;">\${</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">INTERSECT_PY</span><span style="--shiki-light:#E45649;--shiki-dark:#98C379;">}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;</span><span style="--shiki-light:#E45649;--shiki-dark:#98C379;">\${</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">INTERSECT_PY</span><span style="--shiki-light:#E45649;--shiki-dark:#98C379;">}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">.bak.$(</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">date</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> +%Y%m%d%H%M%S)&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">python</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> -</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;</span><span style="--shiki-light:#E45649;--shiki-dark:#98C379;">\${</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">INTERSECT_PY</span><span style="--shiki-light:#E45649;--shiki-dark:#98C379;">}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> &lt;&lt;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&#39;PY&#39;</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">from pathlib import Path</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">import sys</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">p = Path(sys.argv[1])</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">s = p.read_text(encoding=&quot;utf-8&quot;)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">start = s.index(&quot;def biomart_locate(&quot;)</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">end = s.index(&quot;\\n###############################################################################\\n##################### Simulation&quot;, start)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">new = r&#39;&#39;&#39;def biomart_locate(annotation_out, argumentClass, settingsClass):</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    &quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    Locate VEP-annotated genes using a local HARE-compatible BioMart TSV.</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    Required TSV columns:</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    ENSEMBL_ID, START, END, CHR, GENE_NAME, STRAND, HGNC_SYMBOL</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    Manual override:</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    export HARE_BIOMART_TSV=/path/to/local.HARE.tsv</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    &quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    print(&quot;Locating elements with local BioMart TSV...&quot;, end=&quot;&quot;, flush=True)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    if settingsClass.species != &quot;homo_sapiens&quot;:</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        raise NotImplementedError(</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">            &quot;This local BioMart patch is configured for homo_sapiens GRCh38 only.&quot;</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        )</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    if str(argumentClass.build) != &quot;38&quot;:</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        raise NotImplementedError(</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">            &quot;This local BioMart patch is configured for GRCh38 only. &quot;</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">            &quot;Your --ref_build is GRCh%s.&quot; % argumentClass.build</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        )</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    if argumentClass.biotypes == &quot;regulatory&quot;:</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        raise NotImplementedError(</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">            &quot;This local BioMart patch supports gene-based HARE runs only. &quot;</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">            &quot;Do not use --biotypes regulatory with this patch.&quot;</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        )</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    if argumentClass.biotypes not in [&quot;protein_coding&quot;, &quot;protein_all&quot;, &quot;all&quot;]:</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        raise ValueError(</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">            &quot;Unsupported --biotypes value for local BioMart patch: %s. &quot;</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">            &quot;Allowed values are protein_coding, protein_all, all.&quot;</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">            % argumentClass.biotypes</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        )</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    feature_col = &quot;NEAREST&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    biomart_header = [</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        &quot;ENSEMBL_ID&quot;,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        &quot;START&quot;,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        &quot;END&quot;,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        &quot;CHR&quot;,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        &quot;GENE_NAME&quot;,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        &quot;STRAND&quot;,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        &quot;HGNC_SYMBOL&quot;</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    ]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    biomart_dir = &quot;/cwStorage/nodecw_group/czh_data/Tanzimat/hare/biomart&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    default_biomart_files = {</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        &quot;protein_coding&quot;: os.path.join(</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">            biomart_dir,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">            &quot;BioMart_GRCh38_Ensembl105.autosomes.protein_coding.HARE.tsv&quot;</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        ),</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        &quot;protein_all&quot;: os.path.join(</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">            biomart_dir,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">            &quot;BioMart_GRCh38_Ensembl105.autosomes.protein_all.HARE.tsv&quot;</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        ),</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        &quot;all&quot;: os.path.join(</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">            biomart_dir,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">            &quot;BioMart_GRCh38_Ensembl105.autosomes.all_gene_biotypes.HARE.tsv&quot;</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        )</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    biomart_ref = os.environ.get(&quot;HARE_BIOMART_TSV&quot;, &quot;&quot;).strip()</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    if biomart_ref == &quot;&quot;:</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        biomart_ref = default_biomart_files[argumentClass.biotypes]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    if not os.path.exists(biomart_ref):</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        raise FileNotFoundError(</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">            &quot;Local BioMart TSV not found: %s\\n&quot;</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">            &quot;Generate the BioMart TSV first, or set HARE_BIOMART_TSV to a valid file.&quot;</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">            % biomart_ref</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        )</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    annotation_ids = pd.read_csv(</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        annotation_out,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        sep=&quot;\\t&quot;,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        header=0,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        usecols=[feature_col],</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        dtype=str</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    )</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    annotation_ids[feature_col] = (</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        annotation_ids[feature_col]</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        .fillna(&quot;&quot;)</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        .astype(str)</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        .str.strip()</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    )</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    requested_ids = [</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        x for x in annotation_ids[feature_col].tolist()</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        if x != &quot;&quot; and x.lower() != &quot;nan&quot;</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    ]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    requested_ids = list(dict.fromkeys(requested_ids))</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    ids_count = len(requested_ids)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    if ids_count &lt; 1:</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        raise RuntimeError(</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">            &quot;No valid NEAREST Ensembl gene IDs were found in %s.&quot;</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">            % annotation_out</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        )</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    biomart_out = f&quot;{argumentClass.output}.biomart&quot;</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    biomart_tmp = f&quot;{biomart_out}.tmp&quot;</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    locations_out = f&quot;{argumentClass.output}.locations.bed&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    if os.path.exists(biomart_out):</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        print(f&quot;\\nWARNING: {biomart_out} already exists and will be removed/overwritten.&quot;)</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        os.remove(biomart_out)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    if os.path.exists(biomart_tmp):</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        os.remove(biomart_tmp)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    local_df = pd.read_csv(</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        biomart_ref,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        sep=&quot;\\t&quot;,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        header=0,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        dtype=str</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    )</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    if list(local_df.columns) != biomart_header:</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        raise ValueError(</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">            &quot;Local BioMart TSV columns do not exactly match HARE requirements.\\n&quot;</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">            &quot;File: %s\\n&quot;</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">            &quot;Observed columns: %s\\n&quot;</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">            &quot;Expected columns: %s&quot;</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">            % (biomart_ref, list(local_df.columns), biomart_header)</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        )</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    for col in biomart_header:</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        local_df[col] = local_df[col].fillna(&quot;&quot;).astype(str).str.strip()</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    local_df[&quot;CHR&quot;] = local_df[&quot;CHR&quot;].str.replace(&quot;^chr&quot;, &quot;&quot;, regex=True)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    invalid_chr = sorted(</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        set(local_df[&quot;CHR&quot;].unique()) -</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        set([str(i) for i in range(1, 23)])</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    )</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    if len(invalid_chr) &gt; 0:</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        raise ValueError(</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">            &quot;Local BioMart TSV contains non-autosomal or invalid CHR values: %s&quot;</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">            % &quot;,&quot;.join(invalid_chr[:20])</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        )</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    for col in [&quot;START&quot;, &quot;END&quot;]:</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        local_df[col] = pd.to_numeric(local_df[col], errors=&quot;coerce&quot;)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    local_df = local_df.dropna(subset=[&quot;START&quot;, &quot;END&quot;]).copy()</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    local_df[&quot;START&quot;] = local_df[&quot;START&quot;].astype(int)</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    local_df[&quot;END&quot;] = local_df[&quot;END&quot;].astype(int)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    if (local_df[&quot;START&quot;] &lt;= 0).any() or (local_df[&quot;END&quot;] &lt;= 0).any():</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        raise ValueError(&quot;Local BioMart TSV contains non-positive START or END values.&quot;)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    if (local_df[&quot;END&quot;] &lt; local_df[&quot;START&quot;]).any():</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        raise ValueError(&quot;Local BioMart TSV contains rows where END &lt; START.&quot;)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    duplicated_local_ids = local_df[&quot;ENSEMBL_ID&quot;][local_df[&quot;ENSEMBL_ID&quot;].duplicated()].unique()</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    if len(duplicated_local_ids) &gt; 0:</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        raise ValueError(</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">            &quot;Local BioMart TSV must contain one row per ENSEMBL_ID. &quot;</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">            &quot;Duplicated ENSEMBL_ID examples: %s&quot;</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">            % &quot;,&quot;.join(list(duplicated_local_ids[:20]))</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        )</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    order_map = {gene_id: i for i, gene_id in enumerate(requested_ids)}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    biomart_df = local_df[</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        local_df[&quot;ENSEMBL_ID&quot;].isin(order_map.keys())</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    ].copy()</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    if len(biomart_df) &lt; 1:</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        raise RuntimeError(</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">            &quot;BioMart location finding failed: none of the VEP NEAREST gene IDs &quot;</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">            &quot;were found in local TSV: %s&quot;</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">            % biomart_ref</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        )</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    biomart_df[&quot;_hare_order&quot;] = biomart_df[&quot;ENSEMBL_ID&quot;].map(order_map)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    biomart_df = (</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        biomart_df</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        .sort_values(&quot;_hare_order&quot;)</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        .drop(columns=[&quot;_hare_order&quot;])</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        .drop_duplicates()</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    )</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    missing_ids = sorted(set(requested_ids) - set(biomart_df[&quot;ENSEMBL_ID&quot;]))</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    if len(missing_ids) &gt; 0:</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        preview = &quot;,&quot;.join(missing_ids[:20])</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        print(</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">            &quot;\\nWARNING: %d annotated IDs were not found in local BioMart TSV. &quot;</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">            &quot;First missing IDs: %s&quot;</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">            % (len(missing_ids), preview)</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        )</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    biomart_df.to_csv(</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        biomart_out,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        sep=&quot;\\t&quot;,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        header=True,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        index=False</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    )</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    biomart_df.to_csv(</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        biomart_tmp,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        sep=&quot;\\t&quot;,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        header=False,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        index=False</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    )</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    print(&quot;OK&quot;)</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    print(f&quot;[biomart] Requested annotations: {ids_count}&quot;)</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    print(f&quot;[biomart] Matched annotations: {len(biomart_df)}&quot;)</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    print(f&quot;[biomart] Local BioMart TSV: {biomart_ref}&quot;)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    print(f&quot;Writing output to {locations_out}...&quot;, end=&quot;&quot;, flush=True)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    locations_df = pd.DataFrame({})</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    locations_df[1] = &quot;chr&quot; + biomart_df[&quot;CHR&quot;].astype(str).str.replace(&quot;^chr&quot;, &quot;&quot;, regex=True)</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    locations_df[2] = biomart_df[&quot;START&quot;]</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    locations_df[3] = biomart_df[&quot;END&quot;]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    locations_df.to_csv(</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        locations_out,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        sep=&quot;\\t&quot;,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        header=False,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        index=False</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    )</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    print(&quot;OK&quot;)</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    return locations_out</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;&#39;&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">patched = s[:start] + new + s[end:]</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">p.write_text(patched, encoding=&quot;utf-8&quot;)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">print(f&quot;[OK] patched {p}&quot;)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">PY</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译检查：<code>python -m py_compile &quot;\${INTERSECT_PY}&quot;</code></p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">python</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> -</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> &lt;&lt;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&#39;PY&#39;</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">import inspect</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">import intersect</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">src = inspect.getsource(intersect.biomart_locate)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">ok = True</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">required_strings = [</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    &quot;local BioMart TSV&quot;,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    &quot;HARE_BIOMART_TSV&quot;,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    &quot;BioMart_GRCh38_Ensembl105.autosomes.protein_coding.HARE.tsv&quot;,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    &quot;BioMart_GRCh38_Ensembl105.autosomes.protein_all.HARE.tsv&quot;,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    &quot;BioMart_GRCh38_Ensembl105.autosomes.all_gene_biotypes.HARE.tsv&quot;,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    &quot;pd.read_csv&quot;,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    &quot;locations_out&quot;</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">for x in required_strings:</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    if x not in src:</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        print(&quot;[ERROR] missing:&quot;, x)</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        ok = False</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">forbidden_strings = [</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    &quot;os.system(run_biomart)&quot;,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    &quot;os.system(cmd_biomart)&quot;,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    &quot;build_biomart_cmd(argumentClass&quot;</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">for x in forbidden_strings:</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    if x in src:</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        print(&quot;[ERROR] old online BioMart call remains:&quot;, x)</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        ok = False</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">if ok:</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    print(&quot;[OK] biomart_locate() is patched correctly.&quot;)</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    print(&quot;[OK] using:&quot;, inspect.getfile(intersect))</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">else:</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    print(&quot;[FAIL] patch verification failed.&quot;)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">PY</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>原来的 <code>biomart_locate()</code> 做的是：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>annotation_out 里的 NEAREST gene IDs</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>拼成最多 400 个一批的 Ensembl ID list</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>build_biomart_cmd()</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>wget https://ensembl.org/biomart/martservice?query=...</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>写出 \${out}.biomart.tmp</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>读入 tmp，合并成 \${out}.biomart</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>取 CHR/START/END 写成 \${out}.locations.bed</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>补丁把 <code>biomart_locate()</code> 改成：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>annotation_out 里的 NEAREST gene IDs</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>根据 --biotypes 选择本地 HARE TSV</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>读入本地 TSV</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>按 ENSEMBL_ID inner join / filter</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>写出 \${out}.biomart</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>写出 \${out}.biomart.tmp</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>取 CHR/START/END 写出 \${out}.locations.bed</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="s-ldsc" tabindex="-1"><a class="header-anchor" href="#s-ldsc"><span>S-LDSC</span></a></h2><h3 id="install" tabindex="-1"><a class="header-anchor" href="#install"><span>Install</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> clone</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -b</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> ldsc39</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> https://github.com/CBIIT/ldsc.git</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">mamba</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> create</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --name</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> ldsc</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> python=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">3.9</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">mamba</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> activate</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> ldsc</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">mamba</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> install</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -c</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> conda-forge</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -c</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> bioconda</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> bitarray=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">2</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> nose=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">1.3</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> pybedtools=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">0.10.0</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> pip</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> flask</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> requests</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> numpy=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">1.21.5</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> pandas=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">1.3.3</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> scipy=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">1.7.3</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -y</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="patch-1" tabindex="-1"><a class="header-anchor" href="#patch-1"><span>Patch</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="参考文件下载" tabindex="-1"><a class="header-anchor" href="#参考文件下载"><span>参考文件下载</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">数据地址：</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">https://zenodo.org/records/10515792</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">服务器储存地址：</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">/cpfs01/projects-HDD/cfff-afe2df89e32e_HDD/public/czh_data/Tanzimat/ref/LDSC</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">GRCh38_bundle</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">  archive</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">  baselineLD_v2.2</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">  baseline_v1.2</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">  hm3_no_MHC.list.txt</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">  plink_files</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">  readme_baseline_versions.txt</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">  weights</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,20)]))}const h=i(e,[["render",t]]),r=JSON.parse('{"path":"/computer/Tanzimat/Evolution.html","title":"Evolution","lang":"en-US","frontmatter":{"title":"Evolution","icon":"dna","article":false,"category":["code"],"tag":["format"],"description":"\\"How can I move thee? Will no entreaties cause thee to turn a favourable eye upon thy creature, who implores thy goodness and compassion?\\" — Mary Wollstonecraft Shelley, Franken...","head":[["meta",{"property":"og:url","content":"https://czhanoi.github.io/computer/Tanzimat/Evolution.html"}],["meta",{"property":"og:site_name","content":"CZHanoi"}],["meta",{"property":"og:title","content":"Evolution"}],["meta",{"property":"og:description","content":"\\"How can I move thee? Will no entreaties cause thee to turn a favourable eye upon thy creature, who implores thy goodness and compassion?\\" — Mary Wollstonecraft Shelley, Franken..."}],["meta",{"property":"og:type","content":"website"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2026-07-02T00:23:07.000Z"}],["meta",{"property":"article:tag","content":"format"}],["meta",{"property":"article:modified_time","content":"2026-07-02T00:23:07.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"WebPage\\",\\"name\\":\\"Evolution\\",\\"description\\":\\"\\\\\\"How can I move thee? Will no entreaties cause thee to turn a favourable eye upon thy creature, who implores thy goodness and compassion?\\\\\\" — Mary Wollstonecraft Shelley, Franken...\\"}"]]},"headers":[{"level":2,"title":"HARE","slug":"hare","link":"#hare","children":[{"level":3,"title":"Patch","slug":"patch","link":"#patch","children":[]}]},{"level":2,"title":"S-LDSC","slug":"s-ldsc","link":"#s-ldsc","children":[{"level":3,"title":"Install","slug":"install","link":"#install","children":[]},{"level":3,"title":"Patch","slug":"patch-1","link":"#patch-1","children":[]},{"level":3,"title":"参考文件下载","slug":"参考文件下载","link":"#参考文件下载","children":[]}]}],"git":{"createdTime":1782951787000,"updatedTime":1782951787000,"contributors":[{"name":"CZHanoi","username":"CZHanoi","email":"21301010003@m.fudan.edu.cn","commits":1,"url":"https://github.com/CZHanoi"}]},"readingTime":{"minutes":3.69,"words":1108},"filePathRelative":"computer/Tanzimat/Evolution.md","localizedDate":"July 2, 2026","excerpt":"<blockquote style=\\"font-style: italic; font-size: 1.2rem; margin-top: 10px; color: #555;\\">\\n    \\"How can I move thee?<br>\\n    Will no entreaties cause thee to turn a favourable eye upon thy creature,<br>\\n    who implores thy goodness and compassion?\\"\\n    <br>\\n    <span style=\\"font-size: 0.9rem; color: #777;\\">— Mary Wollstonecraft Shelley, <em>Frankenstein; or, The Modern Prometheus</em>, Chapter 10</span>\\n</blockquote>","autoDesc":true}');export{h as comp,r as data};
