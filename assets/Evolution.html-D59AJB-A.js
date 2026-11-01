import{_ as n,c as a,d as i,o as e}from"./app-DrAvdnrf.js";const l={};function p(t,s){return e(),a("div",null,s[0]||(s[0]=[i(`<blockquote style="font-style:italic;font-size:1.2rem;margin-top:10px;color:#555;"> &quot;How can I move thee?<br> Will no entreaties cause thee to turn a favourable eye upon thy creature,<br> who implores thy goodness and compassion?&quot; <br><span style="font-size:0.9rem;color:#777;">— Mary Wollstonecraft Shelley, <em>Frankenstein; or, The Modern Prometheus</em>, Chapter 10</span></blockquote><h2 id="hare" tabindex="-1"><a class="header-anchor" href="#hare"><span>HARE</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">mamba</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> create</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -y</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -n</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> HARE</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -c</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> conda-forge</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -c</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> bioconda</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -c</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> defaults</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> python=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">3.11</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> samtools</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> bcftools</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> bedtools=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">2.30.0</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> ensembl-vep=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">105</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> perl=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">5.32</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> perl-bioperl=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">1.7.8</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> perl-set-intervaltree</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> perl-compress-raw-zlib</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> htslib</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> samtools</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> git</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> wget</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> unzip</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> numpy</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> pandas</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> scipy</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> matplotlib</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> </span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> clone</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> https://github.com/ossmith/HARE.git</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">cd</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> HARE</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">mamba</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> activate</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> HARE</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">python</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -m</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> pip</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> install</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> .</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">python</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -m</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> ipykernel</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> install</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --user</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --name</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> HARE</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --display-name</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;Py311 HARE&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="patch" tabindex="-1"><a class="header-anchor" href="#patch"><span>Patch</span></a></h3><p>脚本地址<code>/cpfs01/projects-HDD/cfff-afe2df89e32e_HDD/public/czh_data/Tanzimat/ref/HARE_GRCh38/patch_hare.py</code></p><h2 id="s-ldsc" tabindex="-1"><a class="header-anchor" href="#s-ldsc"><span>S-LDSC</span></a></h2><h3 id="install" tabindex="-1"><a class="header-anchor" href="#install"><span>Install</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> clone</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -b</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> ldsc39</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> https://github.com/CBIIT/ldsc.git</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">mamba</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> create</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --name</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> ldsc</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> python=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">3.9</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">mamba</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> activate</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> ldsc</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">mamba</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> install</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -c</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> conda-forge</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -c</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> bioconda</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> bitarray=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">2</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> nose=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">1.3</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> pybedtools=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">0.10.0</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> pip</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> flask</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> requests</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> numpy=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">1.21.5</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> pandas=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">1.3.3</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> scipy=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">1.7.3</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -y</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">python</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -m</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> ipykernel</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> install</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --user</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --name</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> ldsc</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --display-name</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;Py39 ldsc&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="patch-1" tabindex="-1"><a class="header-anchor" href="#patch-1"><span>Patch</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>from pathlib import Path</span></span>
<span class="line"><span>import re, shutil, datetime</span></span>
<span class="line"><span></span></span>
<span class="line"><span>LDSC_DIR = Path(&quot;/home1/chenzhh/package/python/ldsc&quot;)</span></span>
<span class="line"><span>p = LDSC_DIR / &quot;ldscore/parse.py&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>assert p.exists(), f&quot;not found: {p}&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>bak = p.with_name(&quot;parse.py.bak.&quot; + datetime.datetime.now().strftime(&quot;%F_%H%M%S&quot;))</span></span>
<span class="line"><span>shutil.copy2(p, bak)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>s = p.read_text()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>LD_FUNCTION = r&#39;&#39;&#39;def ldscore(fh, num=None):</span></span>
<span class="line"><span>    &#39;&#39;&#39; + &quot;&#39;&#39;&#39;&quot; + r&#39;&#39;&#39;Parse .l2.ldscore files, split across num chromosomes.</span></span>
<span class="line"><span>    See docs/file_formats_ld.txt.</span></span>
<span class="line"><span>    &#39;&#39;&#39; + &quot;&#39;&#39;&#39;&quot; + r&#39;&#39;&#39;</span></span>
<span class="line"><span>    suffix = &#39;.l2.ldscore.gz&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if num is not None:</span></span>
<span class="line"><span>        chrs = get_present_chrs(fh, num+1)</span></span>
<span class="line"><span>        if len(chrs) == 0:</span></span>
<span class="line"><span>            raise IOError(&#39;Could not find chromosome-split LD score files for prefix: {F}&#39;.format(F=fh))</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        first_fh = sub_chr(fh, chrs[0]) + suffix</span></span>
<span class="line"><span>        s, compression = which_compression(first_fh)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        chr_ld = [</span></span>
<span class="line"><span>            l2_parser(sub_chr(fh, i) + suffix + s, compression)</span></span>
<span class="line"><span>            for i in chrs</span></span>
<span class="line"><span>        ]</span></span>
<span class="line"><span>        x = pd.concat(chr_ld)</span></span>
<span class="line"><span>    else:</span></span>
<span class="line"><span>        s, compression = which_compression(fh + suffix)</span></span>
<span class="line"><span>        x = l2_parser(fh + suffix + s, compression)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    x = x.sort_values(by=[&#39;CHR&#39;, &#39;BP&#39;])</span></span>
<span class="line"><span>    x = x.drop([&#39;CHR&#39;, &#39;BP&#39;], axis=1).drop_duplicates(subset=&#39;SNP&#39;)</span></span>
<span class="line"><span>    return x</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&#39;&#39;&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ANNOT_FUNCTION = r&#39;&#39;&#39;def annot(fh_list, num=None, frqfile=None):</span></span>
<span class="line"><span>    &#39;&#39;&#39; + &quot;&#39;&#39;&#39;&quot; + r&#39;&#39;&#39;Parses .annot files and returns an overlap matrix.</span></span>
<span class="line"><span>    See docs/file_formats_ld.txt.</span></span>
<span class="line"><span>    &#39;&#39;&#39; + &quot;&#39;&#39;&#39;&quot; + r&#39;&#39;&#39;</span></span>
<span class="line"><span>    annot_suffix = [&#39;.annot&#39; for fh in fh_list]</span></span>
<span class="line"><span>    annot_compression = []</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    frq_suffix = None</span></span>
<span class="line"><span>    frq_compression = None</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if num is not None:</span></span>
<span class="line"><span>        chrs = get_present_chrs(fh_list[0], num+1)</span></span>
<span class="line"><span>        if len(chrs) == 0:</span></span>
<span class="line"><span>            raise IOError(&#39;Could not find chromosome-split annot files for prefix: {F}&#39;.format(F=fh_list[0]))</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        for i, fh in enumerate(fh_list):</span></span>
<span class="line"><span>            first_fh = sub_chr(fh, chrs[0]) + annot_suffix[i]</span></span>
<span class="line"><span>            annot_s, annot_comp_single = which_compression(first_fh)</span></span>
<span class="line"><span>            annot_suffix[i] += annot_s</span></span>
<span class="line"><span>            annot_compression.append(annot_comp_single)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        if frqfile is not None:</span></span>
<span class="line"><span>            frq_suffix = &#39;.frq&#39;</span></span>
<span class="line"><span>            first_frqfile = sub_chr(frqfile, chrs[0]) + frq_suffix</span></span>
<span class="line"><span>            frq_s, frq_compression = which_compression(first_frqfile)</span></span>
<span class="line"><span>            frq_suffix += frq_s</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        y = []</span></span>
<span class="line"><span>        M_tot = 0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        for chrom in chrs:</span></span>
<span class="line"><span>            if frqfile is not None:</span></span>
<span class="line"><span>                df_annot_chr_list = [</span></span>
<span class="line"><span>                    annot_parser(</span></span>
<span class="line"><span>                        sub_chr(fh, chrom) + annot_suffix[i],</span></span>
<span class="line"><span>                        annot_compression[i],</span></span>
<span class="line"><span>                        sub_chr(frqfile, chrom) + frq_suffix,</span></span>
<span class="line"><span>                        frq_compression</span></span>
<span class="line"><span>                    )</span></span>
<span class="line"><span>                    for i, fh in enumerate(fh_list)</span></span>
<span class="line"><span>                ]</span></span>
<span class="line"><span>            else:</span></span>
<span class="line"><span>                df_annot_chr_list = [</span></span>
<span class="line"><span>                    annot_parser(</span></span>
<span class="line"><span>                        sub_chr(fh, chrom) + annot_suffix[i],</span></span>
<span class="line"><span>                        annot_compression[i]</span></span>
<span class="line"><span>                    )</span></span>
<span class="line"><span>                    for i, fh in enumerate(fh_list)</span></span>
<span class="line"><span>                ]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            annot_matrix_chr_list = [</span></span>
<span class="line"><span>                np.matrix(df_annot_chr)</span></span>
<span class="line"><span>                for df_annot_chr in df_annot_chr_list</span></span>
<span class="line"><span>            ]</span></span>
<span class="line"><span>            annot_matrix_chr = np.hstack(annot_matrix_chr_list)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            y.append(np.dot(annot_matrix_chr.T, annot_matrix_chr))</span></span>
<span class="line"><span>            M_tot += len(df_annot_chr_list[0])</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        x = sum(y)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    else:</span></span>
<span class="line"><span>        for i, fh in enumerate(fh_list):</span></span>
<span class="line"><span>            annot_s, annot_comp_single = which_compression(fh + annot_suffix[i])</span></span>
<span class="line"><span>            annot_suffix[i] += annot_s</span></span>
<span class="line"><span>            annot_compression.append(annot_comp_single)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        if frqfile is not None:</span></span>
<span class="line"><span>            frq_suffix = &#39;.frq&#39;</span></span>
<span class="line"><span>            frq_s, frq_compression = which_compression(frqfile + frq_suffix)</span></span>
<span class="line"><span>            frq_suffix += frq_s</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        if frqfile is not None:</span></span>
<span class="line"><span>            df_annot_list = [</span></span>
<span class="line"><span>                annot_parser(</span></span>
<span class="line"><span>                    fh + annot_suffix[i],</span></span>
<span class="line"><span>                    annot_compression[i],</span></span>
<span class="line"><span>                    frqfile + frq_suffix,</span></span>
<span class="line"><span>                    frq_compression</span></span>
<span class="line"><span>                )</span></span>
<span class="line"><span>                for i, fh in enumerate(fh_list)</span></span>
<span class="line"><span>            ]</span></span>
<span class="line"><span>        else:</span></span>
<span class="line"><span>            df_annot_list = [</span></span>
<span class="line"><span>                annot_parser(</span></span>
<span class="line"><span>                    fh + annot_suffix[i],</span></span>
<span class="line"><span>                    annot_compression[i]</span></span>
<span class="line"><span>                )</span></span>
<span class="line"><span>                for i, fh in enumerate(fh_list)</span></span>
<span class="line"><span>            ]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        annot_matrix_list = [</span></span>
<span class="line"><span>            np.matrix(y)</span></span>
<span class="line"><span>            for y in df_annot_list</span></span>
<span class="line"><span>        ]</span></span>
<span class="line"><span>        annot_matrix = np.hstack(annot_matrix_list)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        x = np.dot(annot_matrix.T, annot_matrix)</span></span>
<span class="line"><span>        M_tot = len(df_annot_list[0])</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return x, M_tot</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&#39;&#39;&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>s, n1 = re.subn(</span></span>
<span class="line"><span>    r&quot;def ldscore\\(fh, num=None\\):.*?(?=\\ndef M\\(fh, num=None, N=2, common=False\\):)&quot;,</span></span>
<span class="line"><span>    LD_FUNCTION,</span></span>
<span class="line"><span>    s,</span></span>
<span class="line"><span>    count=1,</span></span>
<span class="line"><span>    flags=re.S</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>s, n2 = re.subn(</span></span>
<span class="line"><span>    r&quot;def annot\\(fh_list, num=None, frqfile=None\\):.*?(?=\\ndef __ID_List_Factory__)&quot;,</span></span>
<span class="line"><span>    ANNOT_FUNCTION,</span></span>
<span class="line"><span>    s,</span></span>
<span class="line"><span>    count=1,</span></span>
<span class="line"><span>    flags=re.S</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>assert n1 == 1, &quot;ldscore() replacement failed&quot;</span></span>
<span class="line"><span>assert n2 == 1, &quot;annot() replacement failed&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>p.write_text(s)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>for x in (LDSC_DIR / &quot;ldscore&quot;).rglob(&quot;*.pyc&quot;):</span></span>
<span class="line"><span>    x.unlink()</span></span>
<span class="line"><span>for x in [LDSC_DIR / &quot;ldscore/__pycache__&quot;, LDSC_DIR / &quot;__pycache__&quot;]:</span></span>
<span class="line"><span>    if x.exists():</span></span>
<span class="line"><span>        shutil.rmtree(x)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>print(&quot;patched:&quot;, p)</span></span>
<span class="line"><span>print(&quot;backup :&quot;, bak)</span></span>
<span class="line"><span>print(&quot;\\n&quot;.join(line for line in p.read_text().splitlines() if &quot;chrs = get_present_chrs&quot; in line))</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="参考文件下载" tabindex="-1"><a class="header-anchor" href="#参考文件下载"><span>参考文件下载</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">数据地址：</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">https://zenodo.org/records/10515792</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">服务器储存地址：</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">/cpfs01/projects-HDD/cfff-afe2df89e32e_HDD/public/czh_data/Tanzimat/ref/LDSC</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">GRCh38_bundle</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">  archive</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">  baselineLD_v2.2</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">  baseline_v1.2</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">  hm3_no_MHC.list.txt</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">  plink_files</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">  readme_baseline_versions.txt</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">  weights</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="进化" tabindex="-1"><a class="header-anchor" href="#进化"><span>进化</span></a></h2>`,13)]))}const d=n(l,[["render",p]]),c=JSON.parse('{"path":"/computer/Tanzimat/Evolution.html","title":"Evolution","lang":"en-US","frontmatter":{"title":"Evolution","icon":"dna","article":false,"category":["code"],"tag":["format"],"description":"\\"How can I move thee? Will no entreaties cause thee to turn a favourable eye upon thy creature, who implores thy goodness and compassion?\\" — Mary Wollstonecraft Shelley, Franken...","head":[["meta",{"property":"og:url","content":"https://czhanoi.github.io/computer/Tanzimat/Evolution.html"}],["meta",{"property":"og:site_name","content":"CZHanoi"}],["meta",{"property":"og:title","content":"Evolution"}],["meta",{"property":"og:description","content":"\\"How can I move thee? Will no entreaties cause thee to turn a favourable eye upon thy creature, who implores thy goodness and compassion?\\" — Mary Wollstonecraft Shelley, Franken..."}],["meta",{"property":"og:type","content":"website"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2026-11-01T16:31:39.000Z"}],["meta",{"property":"article:tag","content":"format"}],["meta",{"property":"article:modified_time","content":"2026-11-01T16:31:39.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"WebPage\\",\\"name\\":\\"Evolution\\",\\"description\\":\\"\\\\\\"How can I move thee? Will no entreaties cause thee to turn a favourable eye upon thy creature, who implores thy goodness and compassion?\\\\\\" — Mary Wollstonecraft Shelley, Franken...\\"}"]]},"headers":[{"level":2,"title":"HARE","slug":"hare","link":"#hare","children":[{"level":3,"title":"Patch","slug":"patch","link":"#patch","children":[]}]},{"level":2,"title":"S-LDSC","slug":"s-ldsc","link":"#s-ldsc","children":[{"level":3,"title":"Install","slug":"install","link":"#install","children":[]},{"level":3,"title":"Patch","slug":"patch-1","link":"#patch-1","children":[]},{"level":3,"title":"参考文件下载","slug":"参考文件下载","link":"#参考文件下载","children":[]}]},{"level":2,"title":"进化","slug":"进化","link":"#进化","children":[]}],"git":{"createdTime":1793550699000,"updatedTime":1793550699000,"contributors":[{"name":"CZHanoi","username":"CZHanoi","email":"21301010003@m.fudan.edu.cn","commits":1,"url":"https://github.com/CZHanoi"}]},"readingTime":{"minutes":2.45,"words":735},"filePathRelative":"computer/Tanzimat/Evolution.md","localizedDate":"November 1, 2026","excerpt":"<blockquote style=\\"font-style: italic; font-size: 1.2rem; margin-top: 10px; color: #555;\\">\\n    \\"How can I move thee?<br>\\n    Will no entreaties cause thee to turn a favourable eye upon thy creature,<br>\\n    who implores thy goodness and compassion?\\"\\n    <br>\\n    <span style=\\"font-size: 0.9rem; color: #777;\\">— Mary Wollstonecraft Shelley, <em>Frankenstein; or, The Modern Prometheus</em>, Chapter 10</span>\\n</blockquote>","autoDesc":true}');export{d as comp,c as data};
