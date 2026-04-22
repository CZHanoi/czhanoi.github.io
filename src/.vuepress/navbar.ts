import { navbar } from "vuepress-theme-hope";

export default navbar([
  // 首页以外的单页
  // { text: "守&望", icon: "fa6-solid:h", link: "/intro.html" },

  // ────────── 医学之路 ──────────
  {
    text: "河岳",
    icon: "pen-to-square",
    prefix: "/medicine/",
    children: [
      { text: "治安疏「2026」", link: "", icon: "fa6-solid:hurricane" },
      { text: "养生主「open-ended」", link: "nourish/" , icon: "fa6-solid:dna" },
      { text: "汉边「327」", link: "enthalpy.md" , icon: "fa6-solid:h" },
    ],
  },

  // ────────── 计算大计 ──────────
  {
    text: "云起",
    icon: "cloud",
    prefix: "/computer/",
    children: [
      { text: "序：Dentate gyrus", link: "", icon: "fa6-solid:brain" },
      { text: "湿：湿实验",      link: "wet.md", icon: "fa6-solid:code" },
      { text: "暂：Convert",   link: "convert/", icon: "fa6-solid:arrow-right-arrow-left" },
      // { text: "Python & R",  link: "python-r/" },
    ],
  },

  // ────────── 翰史 ──────────
  // {
  //   text: "风碑",
  //   icon: "monument",
  //   prefix: "/monument/",
  //   children: [
  //     { text: "序：Dentate gyrus", link: "", icon: "fa6-solid:brain" },
  //     { text: "暂：Convert",   link: "convert/", icon: "fa6-solid:arrow-right-arrow-left" },

  //   ],
  // },


  // ────────── 命名表 ──────────
  {
    text: "命表",
    icon: "fa6-solid:wind",
    link: "/nomenclature/",
  },

  // ────────── 金雨计划 ──────────
  {
    text: "金雨",
    icon: "fa6-solid:fish-fins",
    prefix: "/golden-rain/",
    children: [
      { text: "Trajectory & OT",      link: "trajectory-ot/" },
      { text: "Multi-Omics & ATAC",   link: "multi-omics-atac/" },
      { text: "ST",                   link: "st/" },
      { text: "Others",               link: "others/" },
    ],
  },
  {
    text: "神祇",
    link: "/dropsonde/",
    icon: "fa6-solid:torii-gate",
    prefix: "/dropsonde/",
    children: [
      { text: "序: Drop!!!!!", link: "", icon: "fa6-solid:hurricane" },
      { text: "Jupyter", link: "jupyter.html", icon: "fa6-solid:laptop-code" },
      { text: "Otaku-R", link: "otaku-r.html", icon: "fa6-solid:gamepad" },
      { text: "Mamba ", link: "mamba.html", icon: "fa6-solid:m" },
      { text: "scp", link: "scp.html", icon: "fa6-solid:truck-fast" },


    ],
  },
  { text: '风碑',
  icon: 'fa6-solid:c',
  link: '/monument/' },
  { text: 'Ashoka',
  icon: 'fa6-solid:dharmachakra',
  link: '/ashoka/' }


]);
