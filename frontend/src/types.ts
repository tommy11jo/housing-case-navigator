// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Petition = {
  caseInfo: string
  city: string
  issueTypeNumber: string
  argumentsAndDecisions: Array<{
    complaintSummary: string
    violatedCode: string
    reimbursement: string
    complaintTiming: string
    respondentHadNotice: string
    evidenceAssessment: string
    impactAssessment: string
  }>
  reimbursementJustified: string
  rentAdjustment: string
  respondent: string
  hearingOfficer: string
  hearingDate: string
  filedOnDate: string
  decisionDate: string
  sourceFile: string
}

export type PetitionGuidance = {
  guidance: {
    petitionType: string
    supportingCases: string[]
    keyLegalGrounds: string[]
    evidenceToGather: string[]
    keyPoints: string[]
    remediesToRequest: string[]
  }
}
