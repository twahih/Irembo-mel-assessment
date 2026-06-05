export interface Patient {
  patient_id: string;
  registration_date: string;
  district: string;
  province: string;
  urban_rural: "Urban" | "Rural";
  channel: "USSD" | "IremboApp";
  gender: "Female" | "Male";
  age_group: string;
  insurance_scheme: string;
  insurance_validated: "Yes" | "No";
  registration_complete: "Yes" | "No";
}

export interface Consultation {
  consultation_id: string;
  patient_id: string;
  clinician_id: string;
  clinician_type: "GP" | "Nurse";
  clinic: string;
  district: string;
  province: string;
  urban_rural: "Urban" | "Rural";
  channel: "USSD" | "IremboApp";
  call_type: string | null;
  booked_datetime: string;
  week_number: number;
  status: "Completed" | "No-Show" | "Cancelled";
  diagnosis_category: string | null;
  notes_entered: "Yes" | "No" | null;
  icd_code_entered: "Yes" | "No" | null;
  reassigned: "Yes" | "No";
  insurance_scheme: string;
  gender: "Female" | "Male";
  age_group: string;
}

export interface LabTest {
  lab_id: string;
  consultation_id: string;
  patient_id: string;
  result_uploaded: "Yes" | "No";
  clinician_viewed: "Yes" | "No" | null;
  tat_hours: number | null;
}

export interface Referral {
  referral_id: string;
  consultation_id: string;
  patient_id: string;
  authorised: "Yes" | "No" | null;
  processing_hours: number | null;
}

export interface Prescription {
  prescription_id: string;
  consultation_id: string;
  dispensed: "Yes" | "No";
}

export interface DashboardData {
  patients: Patient[];
  consultations: Consultation[];
  lab_tests: LabTest[];
  referrals: Referral[];
  prescriptions: Prescription[];
}

export interface KpiMetric {
  label: string;
  value: string;
  sub: string;
  status: "good" | "warn" | "neutral";
}

export interface ChartDatum {
  name: string;
  value: number;
  fill?: string;
}

export interface StackedChannelDatum {
  settlement: string;
  USSD: number;
  IremboApp: number;
}

export interface DashboardMetrics {
  kpis: KpiMetric[];
  labReview: ChartDatum[];
  referrals: ChartDatum[];
  documentation: ChartDatum[];
  docBySettlement: ChartDatum[];
  settlementShare: ChartDatum[];
  channelBySettlement: StackedChannelDatum[];
  ruralBenchmark: number;
  ruralRri: number;
}
