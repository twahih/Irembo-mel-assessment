import type { KpiMetric } from "../types";
import { Activity, AlertTriangle, CheckCircle2, MapPin, Shield } from "lucide-react";

const icons = [Shield, CheckCircle2, Activity, AlertTriangle, MapPin];

const statusStyles = {
  good: "text-emerald-600",
  warn: "text-amber-600",
  neutral: "text-sky-700",
};

interface KpiStripProps {
  kpis: KpiMetric[];
}

export function KpiStrip({ kpis }: KpiStripProps) {
  return (
    <div className="grid shrink-0 grid-cols-5 gap-2">
      {kpis.map((kpi, i) => {
        const Icon = icons[i] ?? Activity;
        return (
          <div
            key={kpi.label}
            className="rounded-lg border border-white/80 bg-white/90 px-2.5 py-2 shadow-sm"
          >
            <div className="mb-0.5 flex items-center gap-1 text-slate-500">
              <Icon className="h-3 w-3 shrink-0 text-teal-600" />
              <span className="truncate text-[10px] font-medium uppercase tracking-wide">
                {kpi.label}
              </span>
            </div>
            <p className={`text-xl font-bold leading-none ${statusStyles[kpi.status]}`}>
              {kpi.value}
            </p>
            <p className="mt-0.5 truncate text-[10px] text-slate-500">{kpi.sub}</p>
          </div>
        );
      })}
    </div>
  );
}
