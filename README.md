# TeleClinic Month 3 — MEL Assessment

Take-home assessment for the **Data Analyst & MEL Associate** role at Irembo/TeleClinic.

**Candidate:** Herve Twahirwa  
**Period:** February – April 2026 (Month 3)

## Overview

This repository contains a full Month 3 learning review for the TeleClinic platform: data quality audit, performance metrics, equity analysis, a Clinical Governance dashboard, and a written learning brief with North Star metric reflection.

| Part | Topic | Location |
|------|--------|----------|
| 1 | Data quality audit | `teleclinic_month3_analysis.ipynb` |
| 2 | Metrics & analysis | `teleclinic_month3_analysis.ipynb` |
| 3 | Equity analysis | `teleclinic_month3_analysis.ipynb` |
| 4 | Dashboard design | `teleclinic-dashboard/` |
| 5 | Learning review brief | `teleclinic_month3_analysis.ipynb` + `submission/Twahirwa_Herve_TeleClinic_Assessment.pdf` |

**Dataset:** `TeleClinic_Candidate_Dataset_Month3.xlsx` (7 tables, Feb–Apr 2026)

## Key findings (Month 3)

- **72.4%** consultation completion rate (807 / 1,114 booked)
- **62** lab results uploaded but never viewed by the ordering clinician (top patient safety concern)
- **Rural Representation Index (RRI) = 0.72** — rural users under-represented vs ~83% national benchmark
- **18 referrals (17.6%)** with missing authorisation status (NULL `authorised`, not join orphans)
- **North Star metric:** Documented Care Completion Rate (DCCR) = **57.3%**

## Project structure

```
├── teleclinic_month3_analysis.ipynb    # Analysis notebook (Parts 1–5 + reflection)
├── TeleClinic_Candidate_Dataset_Month3.xlsx
├── teleclinic-dashboard/               # React + Vite + Tailwind dashboard (Part 4)
│   └── public/data/                    # JSON exported from the Excel workbook
├── submission/
│   ├── Twahirwa_Herve_TeleClinic_Assessment.pdf
│   └── dashboard_screenshot.png
├── requirements.txt
└── README.md
```

## Setup & run

### Analysis notebook

```bash
pip install -r requirements.txt
jupyter notebook teleclinic_month3_analysis.ipynb
```

Run all cells from the project root. The notebook uses a relative path to the Excel file.

### React dashboard

Requires [Node.js](https://nodejs.org) 18+.

```bash
cd teleclinic-dashboard
npm install
npm run dev
```

Open http://localhost:5173

The dashboard is organised as **Safety | Clinical Quality | For Whom** — one screen for the Clinical Governance Committee.

## Written submission

Full written responses (Parts 1–5, reflection, process note, dashboard screenshot) are in:

`submission/Twahirwa_Herve_TeleClinic_Assessment.pdf`

## Tech stack

- **Analysis:** Python, pandas, matplotlib, seaborn, Jupyter
- **Dashboard:** React 19, TypeScript, Vite, Tailwind CSS, Recharts
