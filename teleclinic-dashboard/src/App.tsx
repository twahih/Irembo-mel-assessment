import { useEffect, useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { computeMetrics, loadDashboardData } from "./utils/metrics";

export default function App() {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<ReturnType<typeof computeMetrics> | null>(null);

  useEffect(() => {
    loadDashboardData()
      .then((data) => {
        setMetrics(computeMetrics(data));
        setReady(true);
      })
      .catch((err: Error) => setError(err.message));
  }, []);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <div className="max-w-md rounded-2xl border border-red-200 bg-white p-6 text-center shadow-lg">
          <p className="font-semibold text-red-700">Failed to load dashboard data</p>
          <p className="mt-2 text-sm text-slate-600">{error}</p>
          <p className="mt-4 text-xs text-slate-500">
            Run <code className="rounded bg-slate-100 px-1">npm run sync-data</code> from
            the project root to export JSON from the Excel workbook.
          </p>
        </div>
      </div>
    );
  }

  if (!ready || !metrics) {
    return (
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-200 border-t-teal-600" />
        <p className="text-sm font-medium text-slate-600">Loading TeleClinic data…</p>
      </div>
    );
  }

  return <Dashboard metrics={metrics} />;
}
