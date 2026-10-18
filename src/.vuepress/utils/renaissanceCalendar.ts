export const RANGE_START = "2026-10-19";
export const RANGE_END = "2027-06-26";

export type AcademicPhaseId = "autumn" | "winter" | "spring";

export interface AcademicPhase {
  id: AcademicPhaseId;
  label: string;
  start: string;
  end: string;
  semester?: 1 | 2;
}

export const ACADEMIC_PHASES: readonly AcademicPhase[] = [
  {
    id: "autumn",
    label: "第一学期",
    start: "2026-08-30",
    end: "2027-01-09",
    semester: 1,
  },
  {
    id: "winter",
    label: "寒假",
    start: "2027-01-10",
    end: "2027-02-13",
  },
  {
    id: "spring",
    label: "第二学期",
    start: "2027-02-14",
    end: "2027-06-26",
    semester: 2,
  },
];

export interface CalendarDay {
  key: string;
  /** Monday = 0, Sunday = 6, matching the timetable's weekday columns. */
  wd: number;
  phaseId: AcademicPhaseId;
  week: number;
}

export interface CalendarWeek {
  key: string;
  phaseId: AcademicPhaseId;
  week: number;
  label: string;
  days: CalendarDay[];
}

const DAY_MS = 24 * 60 * 60 * 1000;
const toTime = (iso: string): number => Date.parse(`${iso}T00:00:00Z`);
const toISO = (time: number): string => new Date(time).toISOString().slice(0, 10);

export const calendarDays: CalendarDay[] = [];

for (let time = toTime(RANGE_START); time <= toTime(RANGE_END); time += DAY_MS) {
  const key = toISO(time);
  const phase = ACADEMIC_PHASES.find(({ start, end }) => key >= start && key <= end)!;
  calendarDays.push({
    key,
    wd: (new Date(time).getUTCDay() + 6) % 7,
    phaseId: phase.id,
    // Both semesters have a week 0; the holiday starts at week 1.
    week: Math.floor((time - toTime(phase.start)) / (7 * DAY_MS)) + (phase.id === "winter" ? 1 : 0),
  });
}

export const calendarWeeks: CalendarWeek[] = [];

for (const day of calendarDays) {
  let current = calendarWeeks[calendarWeeks.length - 1];
  if (!current || current.phaseId !== day.phaseId || current.week !== day.week) {
    const phase = ACADEMIC_PHASES.find(({ id }) => id === day.phaseId)!;
    current = {
      key: day.key,
      phaseId: day.phaseId,
      week: day.week,
      label: `${phase.label} · 第 ${day.week} 周`,
      days: [],
    };
    calendarWeeks.push(current);
  }
  current.days.push(day);
}

const SEMESTERS = new Map<string, 1 | 2>([
  ["1", 1],
  ["2", 2],
  ["第一学期", 1],
  ["第二学期", 2],
  ["autumn", 1],
  ["spring", 2],
]);
const WEEKDAYS = ["日", "一", "二", "三", "四", "五", "六"];

/** Resolve a calendar week (Sunday–Saturday), including semester week 0. */
export function dateForAcademicWeek(
  semester: string | undefined,
  week: number,
  weekday: string,
): string | null {
  const semesterKey = semester?.trim().toLowerCase() || "1";
  const semesterNumber = SEMESTERS.get(semesterKey);
  if (!semesterNumber || !Number.isInteger(week) || week < 0 || week > 18) return null;

  const normalizedDay = weekday.trim().replace(/^(?:星期|周)/, "").replace(/^天$/, "日");
  const dayIndex = WEEKDAYS.indexOf(normalizedDay);
  if (dayIndex === -1) return null;

  const phase = ACADEMIC_PHASES.find(({ semester }) => semester === semesterNumber)!;
  return toISO(toTime(phase.start) + (week * 7 + dayIndex) * DAY_MS);
}


const winterWeeks = calendarWeeks.filter(week => week.phaseId === "winter").length;

/** Christmas red/evergreen gradually gives way to ice blue over the holiday. */
export function winterTheme(week: number): Record<string, string> {
  const progress = Math.min(1, Math.max(0, (week - 1) / Math.max(1, winterWeeks - 1)));
  const blend = (from: readonly number[], to: readonly number[]): string =>
    "#" + from.map((channel, index) =>
      Math.round(channel + (to[index] - channel) * progress).toString(16).padStart(2, "0")
    ).join("");
  return {
    "--phase-start": blend([165, 43, 66], [37, 95, 144]),
    "--phase-end": blend([34, 104, 75], [48, 124, 154]),
    "--winter-frost": String(progress),
  };
}
