import { CalendarDays, Stethoscope } from "lucide-react";

export function Header() {
  return (
    <header className="relative shrink-0 overflow-hidden rounded-xl border border-teal-900/10 bg-gradient-to-r from-teal-900 via-teal-800 to-slate-900 px-4 py-2.5 text-white shadow-md">
      <div className="relative flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="mb-0.5 flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-teal-200">
            <Stethoscope className="h-3 w-3 shrink-0" />
            Clinical Governance Committee
          </div>
          <h1 className="truncate text-lg font-semibold leading-tight md:text-xl">
            TeleClinic Clinical Governance Dashboard
          </h1>
          <p className="text-[11px] text-teal-100/80">Month 3 · Feb – Apr 2026</p>
        </div>

        <div className="hidden shrink-0 items-center gap-1.5 rounded-lg border border-white/10 bg-white/10 px-2.5 py-1.5 text-xs sm:flex">
          <CalendarDays className="h-3.5 w-3.5 text-teal-200" />
          <span className="font-medium whitespace-nowrap">Weeks 1–13</span>
        </div>
      </div>
    </header>
  );
}
