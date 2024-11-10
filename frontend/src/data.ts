import { Petition } from "./types";

// (1) Rent Ceiling Violations (2) Housing Service Reductions (3) Failure to Register a Unit with the Rent Stabilization Program
export const PETITION_TYPE_NUMBER_TO_NAME = {
  1: "Rent Ceiling Violations",
  2: "Housing Service Reductions",
  3: "Failure to Register a Unit with the Rent Stabilization Program",
};

export const DATA: Petition[] = [
  {
    petitionTypeNumber: "3",
    petitionerArgument: [
      {
        violatedCode: "CA Civil Code § 1941.1",
        summaryOfViolation:
          "Failure to maintain rental unit in habitable condition",
      },
      {
        violatedCode: "City's Rent Stabilization Ordinance § 13",
        summaryOfViolation:
          "Reduction in housing services, lack of maintenance impacts livability and property value, and prevents use of outdoor space for storage",
      },
    ],
    decision: "granted",
    directReimbursement: "398.76",
    rentAdjustment: "Yes (-5%)",
    rationale: {
      respondentHadNotice: "Yes, in July & August 2023",
      issueDuration: "Unresolved for 10+ months",
      evidenceAssessment:
        "Found no visual evidence of repairs during May 2024 inspection, despite invoice from Innovative General Engineering (Aug 2023) claims repairs made",
      impactAssessment:
        "Not a habitability violation but exceeds minor maintenance deficiency",
    },
    respondent: "Woodland Park Communities",
    hearingOfficer: "Michael H. Roush",
    city: "East Palo Alto",
    caseNumber: "2023-0001/0002",
    filedOnDate: "Nov 3, 2023",
    hearingDate: "May 17, 2024",
    decisionDate: "May 22, 2024",
  },
];
