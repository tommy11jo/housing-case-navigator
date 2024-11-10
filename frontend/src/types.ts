// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Petition = {
  petitionTypeNumber: string;
  petitionerArgument: Array<{
    violatedCode: string;
    summaryOfViolation: string;
  }>;
  decision: string;
  directReimbursement: string;
  rentAdjustment: string;
  rationale: {
    respondentHadNotice: string;
    issueDuration: string;
    evidenceAssessment: string;
    impactAssessment: string;
  };
  respondent: string;
  hearingOfficer: string;
  city: string;
  caseNumber: string;
  filedOnDate: string;
  hearingDate: string;
  decisionDate: string;
};
