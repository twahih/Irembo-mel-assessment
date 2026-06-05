import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ChartDatum, DashboardMetrics, StackedChannelDatum } from "../types";
import { ChartCard, SectionPanel } from "./SectionPanel";

interface SafetyChartsProps {
  labReview: ChartDatum[];
  referrals: ChartDatum[];
}

const CHART_HEIGHT = "100%";

export function SafetyCharts({ labReview, referrals }: SafetyChartsProps) {
  return (
    <>
      <ChartCard
        title="Lab results: clinician review"
        subtitle="Uploaded results only"
      >
        <ResponsiveContainer width="100%" height={CHART_HEIGHT} minHeight={100}>
          <BarChart data={labReview} margin={{ top: 12, right: 4, left: -8, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} width={32} />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #e2e8f0",
                fontSize: 12,
              }}
            />
            <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={56}>
              {labReview.map((entry) => (
                <Cell key={entry.name} fill={entry.fill} />
              ))}
              <LabelList dataKey="value" position="top" className="text-xs font-semibold" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard
        title="Referral authorisation"
        subtitle="18 missing authorisation records"
      >
        <ResponsiveContainer width="100%" height={CHART_HEIGHT} minHeight={100}>
          <BarChart data={referrals} margin={{ top: 12, right: 4, left: -8, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              interval={0}
              tick={{ fontSize: 10 }}
            />
            <YAxis tickLine={false} axisLine={false} width={32} />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #e2e8f0",
                fontSize: 12,
              }}
            />
            <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={48}>
              {referrals.map((entry) => (
                <Cell key={entry.name} fill={entry.fill} />
              ))}
              <LabelList dataKey="value" position="top" className="text-xs font-semibold" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </>
  );
}

interface QualityChartsProps {
  documentation: ChartDatum[];
  docBySettlement: ChartDatum[];
}

export function QualityCharts({ documentation, docBySettlement }: QualityChartsProps) {
  return (
    <>
      <ChartCard title="Documentation compliance" subtitle="Completed consults only">
        <ResponsiveContainer width="100%" height={CHART_HEIGHT} minHeight={100}>
          <BarChart
            layout="vertical"
            data={documentation}
            margin={{ top: 0, right: 36, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" domain={[0, 100]} tickLine={false} axisLine={false} unit="%" />
            <YAxis
              type="category"
              dataKey="name"
              tickLine={false}
              axisLine={false}
              width={72}
              tick={{ fontSize: 10 }}
            />
            <Tooltip formatter={(v: number) => [`${v.toFixed(1)}%`, "Rate"]} />
            <Bar dataKey="value" radius={[0, 8, 8, 0]} maxBarSize={22}>
              {documentation.map((entry) => (
                <Cell key={entry.name} fill={entry.fill} />
              ))}
              <LabelList
                dataKey="value"
                position="right"
                formatter={(v: number) => `${v.toFixed(1)}%`}
                className="text-xs font-semibold fill-slate-600"
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Documentation by settlement" subtitle="Rural vs urban">
        <ResponsiveContainer width="100%" height={CHART_HEIGHT} minHeight={100}>
          <BarChart data={docBySettlement} margin={{ top: 12, right: 4, left: -8, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tickLine={false} axisLine={false} />
            <YAxis domain={[0, 100]} tickLine={false} axisLine={false} width={32} unit="%" />
            <Tooltip formatter={(v: number) => [`${v.toFixed(1)}%`, "Full documentation"]} />
            <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={56}>
              {docBySettlement.map((entry) => (
                <Cell key={entry.name} fill={entry.fill} />
              ))}
              <LabelList
                dataKey="value"
                position="top"
                formatter={(v: number) => `${v.toFixed(1)}%`}
                className="text-xs font-semibold"
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </>
  );
}

interface EquityChartsProps {
  settlementShare: ChartDatum[];
  channelBySettlement: StackedChannelDatum[];
  ruralBenchmark: number;
  ruralRri: number;
}

export function EquityCharts({
  settlementShare,
  channelBySettlement,
  ruralBenchmark,
  ruralRri,
}: EquityChartsProps) {
  return (
    <>
      <ChartCard
        title="Who receives care?"
        subtitle={`RRI ${ruralRri.toFixed(2)} · benchmark ${ruralBenchmark}%`}
      >
        <ResponsiveContainer width="100%" height={CHART_HEIGHT} minHeight={100}>
          <BarChart data={settlementShare} margin={{ top: 12, right: 4, left: -8, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tickLine={false} axisLine={false} />
            <YAxis domain={[0, 100]} tickLine={false} axisLine={false} width={32} unit="%" />
            <ReferenceLine
              y={ruralBenchmark}
              stroke="#dc2626"
              strokeDasharray="6 4"
              label={{
                value: `${ruralBenchmark}% national rural`,
                position: "insideTopRight",
                fill: "#dc2626",
                fontSize: 10,
              }}
            />
            <Tooltip formatter={(v: number) => [`${v.toFixed(1)}%`, "Share of care"]} />
            <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={56}>
              {settlementShare.map((entry) => (
                <Cell key={entry.name} fill={entry.fill} />
              ))}
              <LabelList
                dataKey="value"
                position="top"
                formatter={(v: number) => `${v.toFixed(1)}%`}
                className="text-xs font-semibold"
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Channel by settlement" subtitle="USSD vs IremboApp">
        <ResponsiveContainer width="100%" height={CHART_HEIGHT} minHeight={100}>
          <BarChart data={channelBySettlement} margin={{ top: 12, right: 4, left: -8, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="settlement" tickLine={false} axisLine={false} />
            <YAxis domain={[0, 100]} tickLine={false} axisLine={false} width={32} unit="%" />
            <Tooltip formatter={(v: number) => [`${v.toFixed(1)}%`]} />
            <Legend wrapperStyle={{ fontSize: 10 }} iconSize={8} />
            <Bar dataKey="USSD" stackId="a" fill="#7c3aed" radius={[0, 0, 0, 0]} />
            <Bar dataKey="IremboApp" stackId="a" fill="#0284c7" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </>
  );
}

interface DashboardChartsProps {
  metrics: DashboardMetrics;
}

export function DashboardCharts({ metrics }: DashboardChartsProps) {
  return (
    <div className="grid h-full min-h-0 grid-cols-3 gap-2">
      <SectionPanel title="Safety" accent="safety">
        <SafetyCharts labReview={metrics.labReview} referrals={metrics.referrals} />
      </SectionPanel>
      <SectionPanel title="Clinical Quality" accent="quality">
        <QualityCharts
          documentation={metrics.documentation}
          docBySettlement={metrics.docBySettlement}
        />
      </SectionPanel>
      <SectionPanel title="For Whom" accent="equity">
        <EquityCharts
          settlementShare={metrics.settlementShare}
          channelBySettlement={metrics.channelBySettlement}
          ruralBenchmark={metrics.ruralBenchmark}
          ruralRri={metrics.ruralRri}
        />
      </SectionPanel>
    </div>
  );
}
