import type {
  Consultation,
  DashboardData,
  DashboardMetrics,
  KpiMetric,
  Referral,
} from "../types";

const RWANDA_RURAL_BENCH = 83;

function pct(num: number, den: number): number {
  return den === 0 ? 0 : (num / den) * 100;
}

function fmtPct(n: number): string {
  return `${n.toFixed(1)}%`;
}

export function computeMetrics(data: DashboardData): DashboardMetrics {
  const { consultations, lab_tests, referrals } = data;
  const completed = consultations.filter((c) => c.status === "Completed");
  const labUploaded = lab_tests.filter((l) => l.result_uploaded === "Yes");
  const labViewed = labUploaded.filter((l) => l.clinician_viewed === "Yes").length;
  const labUnreviewed = labUploaded.length - labViewed;
  const labReviewRate = pct(labViewed, labUploaded.length);

  const notesRate = pct(
    completed.filter((c) => c.notes_entered === "Yes").length,
    completed.length,
  );
  const icdRate = pct(
    completed.filter((c) => c.icd_code_entered === "Yes").length,
    completed.length,
  );
  const fullDocRate = pct(
    completed.filter(
      (c) => c.notes_entered === "Yes" && c.icd_code_entered === "Yes",
    ).length,
    completed.length,
  );
  const completionRate = pct(
    consultations.filter((c) => c.status === "Completed").length,
    consultations.length,
  );

  const consultIds = new Set(consultations.map((c) => c.consultation_id));
  const matchedReferrals = referrals.filter((r) =>
    consultIds.has(r.consultation_id),
  );
  const knownAuth = matchedReferrals.filter((r) => r.authorised !== null);
  const refAuthRate = pct(
    knownAuth.filter((r) => r.authorised === "Yes").length,
    knownAuth.length,
  );

  const ruralShare = pct(
    completed.filter((c) => c.urban_rural === "Rural").length,
    completed.length,
  );
  const ruralRri = ruralShare / RWANDA_RURAL_BENCH;

  const kpis: KpiMetric[] = [
    {
      label: "Lab review rate",
      value: fmtPct(labReviewRate),
      sub: `${labUnreviewed} unreviewed`,
      status: labUnreviewed > 50 ? "warn" : "good",
    },
    {
      label: "Full documentation",
      value: fmtPct(fullDocRate),
      sub: "notes + ICD",
      status: fullDocRate >= 80 ? "good" : "warn",
    },
    {
      label: "Consultation completion",
      value: fmtPct(completionRate),
      sub: `${completed.length.toLocaleString()} / ${consultations.length.toLocaleString()} booked`,
      status: "neutral",
    },
    {
      label: "Referral authorisation",
      value: fmtPct(refAuthRate),
      sub: "known status only",
      status: "neutral",
    },
    {
      label: "Rural share of care",
      value: fmtPct(ruralShare),
      sub: `RRI ${ruralRri.toFixed(2)} vs 83% national`,
      status: ruralRri < 0.85 ? "warn" : "good",
    },
  ];

  const labReview = [
    { name: "Reviewed", value: labViewed, fill: "#059669" },
    { name: "Not reviewed", value: labUnreviewed, fill: "#dc2626" },
  ];

  const refAuth = countReferrals(matchedReferrals);
  const documentation = [
    { name: "Clinical notes", value: notesRate, fill: "#0284c7" },
    { name: "ICD code", value: icdRate, fill: "#0369a1" },
    { name: "Full record", value: fullDocRate, fill: "#1e3a5f" },
  ];

  const docBySettlement = ["Rural", "Urban"].map((settlement) => ({
    name: settlement,
    value: fullDocRateForSettlement(completed, settlement as "Rural" | "Urban"),
    fill: settlement === "Rural" ? "#0d9488" : "#ea580c",
  }));

  const settlementShare = ["Rural", "Urban"].map((settlement) => ({
    name: settlement,
    value: pct(
      completed.filter((c) => c.urban_rural === settlement).length,
      completed.length,
    ),
    fill: settlement === "Rural" ? "#0d9488" : "#ea580c",
  }));

  const channelBySettlement = buildChannelStack(completed);

  return {
    kpis,
    labReview,
    referrals: refAuth,
    documentation,
    docBySettlement,
    settlementShare,
    channelBySettlement,
    ruralBenchmark: RWANDA_RURAL_BENCH,
    ruralRri,
  };
}

function countReferrals(referrals: Referral[]) {
  const auth = referrals.filter((r) => r.authorised === "Yes").length;
  const denied = referrals.filter((r) => r.authorised === "No").length;
  const missing = referrals.filter((r) => r.authorised === null).length;
  return [
    { name: "Authorised", value: auth, fill: "#059669" },
    { name: "Not authorised", value: denied, fill: "#d97706" },
    { name: "Status missing", value: missing, fill: "#dc2626" },
  ];
}

function fullDocRateForSettlement(
  completed: Consultation[],
  settlement: "Rural" | "Urban",
): number {
  const subset = completed.filter((c) => c.urban_rural === settlement);
  return pct(
    subset.filter(
      (c) => c.notes_entered === "Yes" && c.icd_code_entered === "Yes",
    ).length,
    subset.length,
  );
}

function buildChannelStack(completed: Consultation[]) {
  return (["Rural", "Urban"] as const).map((settlement) => {
    const subset = completed.filter((c) => c.urban_rural === settlement);
    const ussd = pct(
      subset.filter((c) => c.channel === "USSD").length,
      subset.length,
    );
    return {
      settlement,
      USSD: ussd,
      IremboApp: 100 - ussd,
    };
  });
}

export async function loadDashboardData(): Promise<DashboardData> {
  const files = [
    "patients",
    "consultations",
    "lab_tests",
    "referrals",
    "prescriptions",
  ] as const;

  const entries = await Promise.all(
    files.map(async (file) => {
      const res = await fetch(`/data/${file}.json`);
      if (!res.ok) throw new Error(`Failed to load ${file}.json`);
      return [file, await res.json()] as const;
    }),
  );

  return Object.fromEntries(entries) as DashboardData;
}
