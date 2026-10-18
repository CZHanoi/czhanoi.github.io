<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";
import { withBase } from "vuepress/client";
import Navbar from "@theme-hope/modules/navbar/components/Navbar";
import {
  calendarDays, calendarWeeks, dateForAcademicWeek, winterTheme,
} from "../utils/renaissanceCalendar";

const visibleDates = new Set(calendarDays.map(day => day.key));
const weekColumns = calendarWeeks.map(week =>
  `calc(${week.days.length} * var(--col-w) + ${week.days.length - 1} * var(--gap))`
).join(" ");

// === Slots: 16 节课的时间刻度（新增第0节与第15节） ===
const ROWS = 16;
const PERIOD_OFFSET = 1; // 新增第0节后：CSV里第1节对应网格第2行

const SLOT_MM = [
  [ 6*60+30, 7*60+30 ],  // 0: 06:30-07:30
  [ 8*60,    8*60+45 ],  // 1: 08:00-08:45
  [ 8*60+55, 9*60+40 ],  // 2: 08:55-09:40
  [ 9*60+55, 10*60+40 ], // 3: 09:55-10:40
  [ 10*60+50,11*60+35 ], // 4: 10:50-11:35
  [ 11*60+45,12*60+30 ], // 5: 11:45-12:30
  [ 13*60+30,14*60+15 ], // 6: 13:30-14:15
  [ 14*60+25,15*60+10 ], // 7: 14:25-15:10
  [ 15*60+20,16*60+5  ], // 8: 15:20-16:05
  [ 16*60+15,17*60     ],// 9: 16:15-17:00
  [ 17*60+10,17*60+55 ], // 10: 17:10-17:55
  [ 18*60+30,19*60+15 ], // 11: 18:30-19:15
  [ 19*60+25,20*60+10 ], // 12: 19:25-20:10
  [ 20*60+20,21*60+5  ], // 13: 20:20-21:05
  [ 21*60+15,22*60    ], // 14: 21:15-22:00
  [ 22*60+30,23*60+30 ], // 15: 22:30-23:30
];

const SLOTS = [
  { i:0,  t:"06:30-07:30" }, // ✅新增
  { i:1,  t:"08:00-08:45" },
  { i:2,  t:"08:55-09:40" },
  { i:3,  t:"09:55-10:40" },
  { i:4,  t:"10:50-11:35" },
  { i:5,  t:"11:45-12:30" },
  { i:6,  t:"13:30-14:15" },
  { i:7,  t:"14:25-15:10" },
  { i:8,  t:"15:20-16:05" },
  { i:9,  t:"16:15-17:00" },
  { i:10, t:"17:10-17:55" },
  { i:11, t:"18:30-19:15" },
  { i:12, t:"19:25-20:10" },
  { i:13, t:"20:20-21:05" },
  { i:14, t:"21:15-22:00" },
  { i:15, t:"22:30-23:30" }, // ✅新增
];

const WD = ["一","二","三","四","五","六","日"];

// === 数据类型（支持可选 color 列；没有也完全兼容） ===
type RowUnified = {
  course:string; weeks?:string; weekday?:string; date?:string;
  periods?:string; start_time?:string; end_time?:string;
  room?:string; teacher?:string; type?:string; content?:string;
  color?:string; semester?:string;
};

const weekly = ref<RowUnified[]>([]);
const events = ref<RowUnified[]>([]);
const loadError = ref(false);

// === CSV 解析 ===
function parseCSV(txt:string){
  // 支持带逗号的周次列表、引号转义、BOM 与多行单元格。
  const records:string[][] = [];
  let row:string[] = [], cell = "", quoted = false;
  const source = txt.replace(/^\uFEFF/, "").replace(/\r\n?/g, "\n");
  for(let i=0; i<source.length; i++){
    const char = source[i];
    if(char === '"'){
      if(quoted && source[i+1] === '"'){ cell += '"'; i++; }
      else quoted = !quoted;
    } else if(!quoted && (char === "," || char === "\n")){
      row.push(cell.trim()); cell = "";
      if(char === "\n"){ records.push(row); row = []; }
    } else cell += char;
  }
  row.push(cell.trim());
  records.push(row);
  const head = records.shift() || [];
  return records.filter(cells => cells.some(Boolean)).map(cells =>
    Object.fromEntries(head.map((key,i) => [key, cells[i] || ""])) as RowUnified
  );
}
async function loadAll(){
  const results = await Promise.allSettled([
    loadCSV("/renaissance-weekly.csv"),
    loadCSV("/renaissance-events.csv"),
  ]);
  weekly.value = results[0].status === "fulfilled" ? results[0].value : [];
  events.value = results[1].status === "fulfilled" ? results[1].value : [];
  loadError.value = results.some(result => result.status === "rejected");
}
async function loadCSV(path:string){
  const response = await fetch(withBase(path));
  if(!response.ok) throw new Error(`Cannot load ${path}: ${response.status}`);
  return parseCSV(await response.text());
}

// === 工具函数 ===
function expandWeeks(expr?:string):number[]{
  if(!expr) return [];
  return expr.split(",").flatMap(seg=>{
    seg = seg.trim();
    const m = seg.match(/^(\d+)-(\d+)$/);
    if(m){
      const a=+m[1],b=+m[2];
      return a <= b && b <= 18 ? Array.from({length:b-a+1},(_,i)=>a+i) : [];
    }
    return /^\d+$/.test(seg) && +seg <= 18 ? [+seg] : [];
  });
}

// periods：把 CSV 的“第x节”映射到网格行号（新增第0节后整体 +1）
// 例如：CSV 1-2 => 网格 2-3；CSV 0 => 网格 1
function periods(expr?:string){
  let m = expr?.match?.(/^(\d+)-(\d+)$/);
  if(m) return { s:+m[1] + PERIOD_OFFSET, e:+m[2] + PERIOD_OFFSET };
  m = expr?.match?.(/^(\d+)$/);
  if(m) return { s:+m[1] + PERIOD_OFFSET, e:+m[1] + PERIOD_OFFSET };
  return { s:0, e:0 };
}

function fmtDate(d:Date){ return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`; }
function toMin(hhmm?:string){
  if(!hhmm) return null;
  const m = hhmm.match(/^(\d{1,2}):(\d{2})$/); if(!m) return null;
  if(+m[1] > 23 || +m[2] > 59) return null;
  return (+m[1])*60 + (+m[2]);
}

// timeToPeriods 直接输出“网格行号”(1..ROWS)，不需要额外 offset
function timeToPeriods(startHHMM?:string, endHHMM?:string){
  const sMin = toMin(startHHMM), eMin = toMin(endHHMM);
  if(sMin==null || eMin==null || eMin <= sMin || sMin >= SLOT_MM[ROWS-1][1] || eMin <= SLOT_MM[0][0]) return { s:0, e:0 };
  let sIdx = 1, eIdx = ROWS;
  for(let i=0;i<ROWS;i++){ const [,b]=SLOT_MM[i]; if(sMin < b){ sIdx=i+1; break; } }
  for(let i=ROWS-1;i>=0;i--){ const [a]=SLOT_MM[i]; if(eMin > a){ eIdx=i+1; break; } }
  if(eIdx < sIdx) eIdx = sIdx;
  return { s:sIdx, e:eIdx };
}

// === 颜色策略 ===
function hueHash(key:string){ let h=0; for(const ch of key) h=(h*33+ch.charCodeAt(0))%360; return h; }
function colorFor(key:string){ return `hsl(${hueHash(key)} 70% 60%)`; }
function grayify(c:string){ return `color-mix(in oklab, ${c} 35%, #999 65%)`; }
function looksLikeColor(x?:string){
  if(!x) return false;
  return /^#([0-9a-fA-F]{3,8})$/.test(x)
      || /^rgb(a)?\(/i.test(x)
      || /^hsl(a)?\(/i.test(x)
      || /^oklch\(/i.test(x)
      || /^var\(/i.test(x);
}
function colorFromContent(content?:string){
  if(!content) return null;
  const m = content.match(/\{color:\s*([^}]+)\}/i);
  return m ? m[1].trim() : null;
}
function stripColorTag(content?:string){
  return (content||"").replace(/\s*\{color:\s*[^}]+\}\s*/ig, "").trim();
}
function tintByType(base:string, type?:string){
  const t = (type || "").toLowerCase();
  if(t==="exam") return "#d32f2f";
  if(t==="demo" || t==="lab") return grayify(base);
  if(t==="meeting") return `color-mix(in oklab, ${base} 75%, #1e88e5 25%)`;
  if(t==="party")   return `color-mix(in oklab, ${base} 70%, #e91e63 30%)`;
  if(t==="ds")      return `color-mix(in oklab, ${base} 75%, #673ab7 25%)`;
  if(t==="play")    return `color-mix(in oklab, ${base} 75%, #2e7d32 25%)`;
  return base;
}
function resolveColor(r:RowUnified){
  // 1) color 列
  if(looksLikeColor(r.color)) return r.color!;
  // 2) content 中的颜色标记（兼容旧写法）
  const tagged = colorFromContent(r.content);
  if(looksLikeColor(tagged||"")) return tagged!;
  // 3) 默认：按课程名哈希，并按 type 微调
  const base = colorFor(r.course || r.content || r.teacher || "Renaissance");
  return tintByType(base, r.type);
}

// === 网格计算（不在文字中展示 date；并剔除 content 里的 {color:...} ） ===
type Cell = { title:string; sub?:string; s:number; e:number; color:string; isExam?:boolean };
const grid = computed<Record<string, Cell[]>>(()=> {
  const g:Record<string,Cell[]> = {};

  const subFromRow = (r:RowUnified) => {
    const cleanContent = stripColorTag(r.content);
    const parts = [
      cleanContent || null,
      r.start_time && r.end_time ? `${r.start_time}—${r.end_time}` : null,
      r.room, r.teacher
    ].filter(Boolean);
    return parts.join(" · ");
  };

  const putRow = (row:RowUnified) => {
    const p = row.periods && /^\d+(-\d+)?$/.test(row.periods)
      ? periods(row.periods)
      : timeToPeriods(row.start_time, row.end_time);
    if(p.s < 1 || p.e < p.s || p.e > ROWS) return;
    const color = resolveColor(row);
    const sub = subFromRow(row);
    const isExam = (row.type||"").toLowerCase()==="exam";

    if(row.date){
      const key = row.date;
      if(visibleDates.has(key)) (g[key] ||= []).push({ title: row.course, sub, s:p.s, e:p.e, color, isExam });
    } else if(row.weeks && row.weekday){
      // weeks 按校历计数；semester=1/2，省略时为第一学期。假期事件用 date。
      for(const w of expandWeeks(row.weeks)){
        const key = dateForAcademicWeek(row.semester, w, row.weekday);
        if(key && visibleDates.has(key)) (g[key] ||= []).push({ title: row.course, sub, s:p.s, e:p.e, color, isExam });
      }
    }
  };

  for(const r of weekly.value){ putRow(r); }
  for(const e of events.value){ putRow(e); }

  for(const k of Object.keys(g)){
    g[k].sort((a,b)=> a.s - b.s || a.e - b.e || a.title.localeCompare(b.title));
  }
  return g;
});

// === 头部/滚动 ===
const weeksHeadRef = ref<HTMLElement | null>(null);
const daysHeadRef  = ref<HTMLElement | null>(null);
const boardRef     = ref<HTMLElement | null>(null);
const canvasRef    = ref<HTMLElement | null>(null);
const timesBodyRef = ref<HTMLElement | null>(null);
const timesRef     = ref<HTMLElement | null>(null);

const headsH = ref(108); // (48 + 60)

function applyHeadsH(px:number){
  headsH.value = px;
  boardRef.value?.style.setProperty("--heads-h", `${px}px`);
}
function measureHeads(){
  const a = weeksHeadRef.value;
  const b = daysHeadRef.value;
  if(!a || !b) return;
  const ax = Math.round(a.getBoundingClientRect().height);
  const bx = Math.round(b.getBoundingClientRect().height);
  applyHeadsH(ax + bx);
}

const todayKey = ref<string>(fmtDate(new Date()));
function scrollToToday() {
  const canvas = canvasRef.value;
  if(!canvas) return;
  const target = canvas.querySelector<HTMLElement>(`.day-col[data-date="${todayKey.value}"]`);
  if(!target) return;
  const pad = parseFloat(getComputedStyle(canvas).getPropertyValue("--pad") || "8");
  const left = (target.offsetLeft || 0) - pad;
  canvas.scrollTo({ left, top: 0, behavior: "auto" });
}

let onCanvasScroll: ((ev: Event)=>void) | null = null;
let onTimesWheel: ((ev: WheelEvent)=>void) | null = null;
function installScrollSync(){
  const canvas = canvasRef.value;
  const timesBody = timesBodyRef.value;
  if(!canvas || !timesBody) return;

  canvas.style.scrollbarGutter = "stable both-edges";

  onCanvasScroll = () => {
    const y = Math.round(canvas.scrollTop);
    timesBody.style.setProperty("--vscroll", String(y));
  };
  canvas.addEventListener("scroll", onCanvasScroll, { passive: true });

  const times = timesRef.value;
  if(times){
    onTimesWheel = (e: WheelEvent) => {
      if(!canvas) return;
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        canvas.scrollBy({ top: e.deltaY, behavior: "auto" });
        e.preventDefault();
      }
    };
    times.addEventListener("wheel", onTimesWheel, { passive: false });
  }
}

let roA:ResizeObserver | null = null;
let roB:ResizeObserver | null = null;

onMounted(async ()=>{
  await loadAll();
  await nextTick();
  measureHeads();
  roA = new ResizeObserver(measureHeads);
  roB = new ResizeObserver(measureHeads);
  weeksHeadRef.value && roA.observe(weeksHeadRef.value);
  daysHeadRef.value  && roB.observe(daysHeadRef.value);
  window.addEventListener("resize", measureHeads);

  await nextTick();
  installScrollSync();
  scrollToToday();
});
onUnmounted(()=>{
  roA?.disconnect(); roB?.disconnect();
  window.removeEventListener("resize", measureHeads);
  if(onCanvasScroll && canvasRef.value){
    canvasRef.value.removeEventListener("scroll", onCanvasScroll);
  }
  if(onTimesWheel && timesRef.value) timesRef.value.removeEventListener("wheel", onTimesWheel);
});
</script>

<template>
  <div class="renaissance-layout">
    <Navbar />
    <main class="renaissance-page">
      <header class="hdr">
        <h1 class="title">Toward the Renaissance</h1>
      </header>
      <p v-if="loadError" class="data-status" role="status">课程或事件暂时无法读取，请稍后刷新。</p>

      <section class="board" ref="boardRef" aria-label="Renaissance 课程与事件日历">
        <!-- 左：时间刻度轴 -->
        <aside class="times" ref="timesRef">
          <div class="times-head">Class / Time</div>
          <div class="times-body" ref="timesBodyRef">
            <div v-for="s in SLOTS" :key="s.i" class="time-row">
              <div class="no">第{{ s.i }}节</div>
              <div class="range">{{ s.t }}</div>
            </div>
          </div>
        </aside>

        <!-- 右：主画布（唯一滚动容器） -->
        <div class="canvas" ref="canvasRef" tabindex="0" role="region" aria-label="可横向及纵向滚动的课表">
          <div class="weeks-head" ref="weeksHeadRef" :style="{ gridTemplateColumns: weekColumns }">
            <div
              v-for="week in calendarWeeks" :key="week.key" class="week-tag" :class="week.phaseId"
              :style="week.phaseId === 'winter' ? winterTheme(week.week) : undefined"
            ><span>{{ week.label }}<span v-if="week.phaseId === 'winter'" class="frost" aria-hidden="true">❄</span></span></div>
          </div>

          <div class="days-head" ref="daysHeadRef">
            <div
              v-for="d in calendarDays"
              :key="'h'+d.key"
              class="day-head"
              :class="[d.phaseId, { today: d.key === todayKey }]"
              :style="d.phaseId === 'winter' ? winterTheme(d.week) : undefined"
              :aria-current="d.key === todayKey ? 'date' : undefined"
            >
              <div class="dow">
                星期{{ WD[d.wd] }}
              </div>
              <div class="date">{{ d.key }}</div>
            </div>
          </div>

          <div class="days-body">
            <div
              v-for="d in calendarDays"
              :key="'c'+d.key"
              class="day-col"
              :class="[d.phaseId, { today: d.key === todayKey }]"
              :style="d.phaseId === 'winter' ? winterTheme(d.week) : undefined"
              :data-date="d.key"
            >
              <div
                v-for="c in (grid[d.key] || [])"
                :key="c.title + c.s + '-' + c.e + (c.sub||'')"
                class="cell"
                :class="{ exam: c.isExam }"
                :style="{ gridRow: `${c.s} / ${c.e + 1}`, background: c.color, color: c.isExam ? '#fff' : '#111' }"
              >
                <div class="cell-title">{{ c.title }}</div>
                <div v-if="c.sub" class="cell-sub">{{ c.sub }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  </div>
</template>

<style scoped>
.renaissance-layout{
  --page-bg:#f7f7fa;
  --surface:#fff;
  --ink:#303244;
  --muted:#676b7d;
  --line:#e5e7ef;
  height:100vh;height:100dvh;
  background:var(--page-bg);color:var(--ink);
}
.renaissance-page{
  box-sizing:border-box;height:100%;
  padding:calc(var(--navbar-height) + 14px) 16px 16px;
  display:flex;flex-direction:column;gap:12px;overflow:hidden;
}
.hdr{
  flex:0 0 auto;display:flex;justify-content:space-between;align-items:center;gap:16px;
  padding:0 4px;
}
.title{
  margin:0;border:0;padding:0;font:700 clamp(1.5rem, 2.5vw, 2.2rem)/1.4 Georgia,serif;
  background:linear-gradient(110deg,#6653a1 10%,#aa7b3b 60%,#367e73);
  color:#6653a1;background-clip:text;-webkit-background-clip:text;-webkit-text-fill-color:transparent;
}
.autumn{--phase-start:#6551a0;--phase-end:#8170b8}
.winter{--phase-start:#a52b42;--phase-end:#22684b;--winter-frost:0}
.spring{--phase-start:#286b63;--phase-end:#4d8b74}
.data-status{margin:0;color:var(--muted);font-size:.85rem}
.board{
  --row-h:64px;--rows:16;--col-w:240px;--gap:10px;--pad:8px;
  --weeks-h:48px;--dhead-h:60px;--heads-h:calc(var(--weeks-h) + var(--dhead-h));
  --times-w:var(--col-w);
  flex:1 1 auto;min-height:0;
  display:grid;grid-template-columns:var(--times-w) minmax(0,1fr);gap:12px;
}
.times{
  align-self:stretch;height:100%;background:var(--surface);border-radius:12px;
  box-shadow:0 4px 18px #2526400a;display:flex;flex-direction:column;overflow:hidden;
}
.times-head{
  box-sizing:border-box;
  position:relative;z-index:6;height:var(--heads-h);padding:0 .8rem;
  background:linear-gradient(125deg,#6551a0,#4d758f);color:#fff;
  font-weight:700;text-align:center;line-height:1.2;flex:0 0 auto;
  display:flex;align-items:center;justify-content:center;
}
.times-body{
  position:relative;flex:1 1 auto;min-height:0;display:grid;
  grid-template-rows:repeat(var(--rows),var(--row-h));
  transform:translateY(calc(-1px * var(--vscroll,0)));will-change:transform;
}
.time-row{
  display:grid;grid-template-columns:110px 1fr;align-items:center;
  height:var(--row-h);box-sizing:border-box;padding:0 .8rem;
  border-bottom:1px solid var(--line);
}
.no{font-weight:700}
.range{color:var(--muted);font-variant-numeric:tabular-nums}
.canvas{
  height:100%;min-width:0;overflow:auto;position:relative;display:grid;
  grid-template-rows:var(--weeks-h) var(--dhead-h) 1fr;align-items:start;
  overscroll-behavior:contain;-webkit-overflow-scrolling:touch;scrollbar-gutter:stable both-edges;
  border-radius:12px;
}
.canvas:focus-visible{outline:2px solid #8170b8;outline-offset:2px}
.weeks-head{
  position:sticky;top:0;z-index:5;height:var(--weeks-h);
  box-sizing:border-box;padding:0 var(--pad);background:var(--page-bg);
  display:grid;gap:var(--gap);
}
.week-tag{
  background:linear-gradient(110deg,var(--phase-start),var(--phase-end));
  color:#fff;border-radius:10px;display:flex;align-items:center;font-weight:700;padding:0 16px;
}
.week-tag > span{position:sticky;left:calc(var(--pad) + 16px);white-space:nowrap}
.week-tag .frost{margin-left:.7rem;font-size:1.2em;opacity:var(--winter-frost,0);text-shadow:0 0 8px #d9f4ff66}
.days-head{
  position:sticky;top:var(--weeks-h);z-index:5;height:var(--dhead-h);
  box-sizing:border-box;padding:0 var(--pad);background:var(--page-bg);
  display:grid;grid-auto-flow:column;grid-auto-columns:var(--col-w);gap:var(--gap);
}
.day-head{
  box-sizing:border-box;background:color-mix(in srgb,var(--phase-end) 15%,var(--surface));
  border-radius:10px;padding:.2rem .4rem;text-align:center;
  display:flex;flex-direction:column;justify-content:center;gap:.2rem;height:100%;overflow:hidden;
}
.day-head .dow{font-weight:800;line-height:1.1}
.day-head .date{font-size:.85rem;opacity:.8;line-height:1.1;font-variant-numeric:tabular-nums}
.days-body{
  display:grid;grid-auto-flow:column;grid-auto-columns:var(--col-w);gap:var(--gap);
  padding:0 var(--pad) var(--pad);
}
.day-col{
  display:grid;grid-template-rows:repeat(var(--rows),var(--row-h));position:relative;
  background-color:color-mix(in srgb,var(--phase-end) 3%,var(--surface));
  border-radius:12px;box-shadow:0 4px 14px #25264008;min-width:0;overflow:hidden;
  background-image:repeating-linear-gradient(to bottom,transparent 0,transparent calc(var(--row-h) - 1px),var(--line) calc(var(--row-h) - 1px),var(--line) var(--row-h));
  background-origin:content-box;background-clip:content-box;
}
.day-head.today{box-shadow:inset 0 0 0 2px var(--phase-end)}
.day-col.today{box-shadow:inset 0 0 0 2px var(--phase-end);background-color:color-mix(in srgb,var(--phase-end) 9%,var(--surface))}
.cell{
  z-index:1;border-radius:12px;padding:.6rem .7rem;box-shadow:0 2px 8px #0000001f;
  display:flex;flex-direction:column;justify-content:center;font-size:.98rem;line-height:1.28;
  min-width:0;overflow:hidden;
}
.cell.exam{background:#d32f2f !important;color:#fff !important}
.cell-title{
  font-weight:800;overflow:hidden;text-overflow:ellipsis;
  display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;word-break:break-word;
}
.cell-sub{
  opacity:.95;font-size:.86rem;margin-top:.2rem;overflow:hidden;text-overflow:ellipsis;
  display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;word-break:break-word;
}
:global(html.dark .renaissance-layout),
:global(html[data-theme="dark"] .renaissance-layout){
  --page-bg:#171922;--surface:#202330;--ink:#e7e8f1;--muted:#afb3c7;--line:#323646;
}
:global(html.dark .renaissance-layout .title),
:global(html[data-theme="dark"] .renaissance-layout .title){background-image:linear-gradient(110deg,#b6a4e0 10%,#ddba7a 60%,#8ac2a7)}
@media (max-width:1200px){
  .board{--col-w:200px}
  .time-row{grid-template-columns:80px 1fr}
}
@media (max-width:900px){
  .board{--col-w:170px;--row-h:60px}
  .time-row{grid-template-columns:1fr;gap:2px;align-content:center}
  .hdr{align-items:flex-start}
}
@media (max-width:600px){
  .renaissance-page{padding:calc(var(--navbar-height) + 10px) 8px 8px;gap:10px}
  .hdr{flex-direction:column;gap:6px;padding:0 4px}
  .title{font-size:1.55rem}
  .board{--times-w:96px;--col-w:44vw;--row-h:56px;--gap:8px;gap:6px}
  .times-head{font-size:.85rem;padding:.35rem .4rem}
  .time-row{padding:.2rem .5rem}
  .no{font-size:.9rem;line-height:1.1}
  .range{font-size:.8rem;line-height:1.1}
  .day-head{padding:.2rem}
  .cell{font-size:.92rem}
}
</style>
