import type { DashboardMetrics } from "../types";
import { DashboardCharts } from "./DashboardCharts";
import { Header } from "./Header";
import { KpiStrip } from "./KpiStrip";

interface DashboardProps {
  metrics: DashboardMetrics;
}

export function Dashboard({ metrics }: DashboardProps) {
  return (
    <div className="dashboard-page mx-auto flex h-screen max-h-screen max-w-[1600px] flex-col gap-2 overflow-hidden px-3 py-2 md:px-4 md:py-3">
      <Header />
      <KpiStrip kpis={metrics.kpis} />
      <div className="min-h-0 flex-1">
        <DashboardCharts metrics={metrics} />
      </div>
    </div>
  );
}
