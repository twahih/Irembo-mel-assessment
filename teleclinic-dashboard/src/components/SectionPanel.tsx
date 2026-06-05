import type { ReactNode } from "react";

interface SectionPanelProps {
  title: string;
  accent: "safety" | "quality" | "equity";
  children: ReactNode;
}

const accents = {
  safety: {
    badge: "bg-red-50 text-red-800 border-red-100",
    ring: "ring-red-100",
  },
  quality: {
    badge: "bg-sky-50 text-sky-800 border-sky-100",
    ring: "ring-sky-100",
  },
  equity: {
    badge: "bg-teal-50 text-teal-800 border-teal-100",
    ring: "ring-teal-100",
  },
};

export function SectionPanel({ title, accent, children }: SectionPanelProps) {
  const style = accents[accent];
  return (
    <section
      className={`flex h-full min-h-0 flex-col gap-2 rounded-xl border border-white/80 bg-white/85 p-2.5 shadow-sm ring-1 ${style.ring}`}
    >
      <div
        className={`inline-flex w-fit shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${style.badge}`}
      >
        {title}
      </div>
      <div className="grid min-h-0 flex-1 grid-rows-2 gap-2">{children}</div>
    </section>
  );
}

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function ChartCard({ title, subtitle, children }: ChartCardProps) {
  return (
    <div className="flex h-full min-h-0 flex-col rounded-lg border border-slate-100 bg-slate-50/60 p-2">
      <div className="mb-1 shrink-0">
        <h3 className="text-xs font-semibold text-slate-800">{title}</h3>
        {subtitle && <p className="truncate text-[10px] text-slate-500">{subtitle}</p>}
      </div>
      <div className="min-h-0 flex-1">{children}</div>
    </div>
  );
}
