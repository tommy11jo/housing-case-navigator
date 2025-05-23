// This mapping is duplicated in backend/app/retrieval/retrieval.py. Keep them in sync!
// (1) Rent Ceiling Violations (2) Housing Service Reductions (3) Failure to Register a Unit with the Rent Stabilization Program
export const PETITION_TYPE_NUMBER_TO_NAME = {
  1: "Rent Ceiling Violations",
  2: "Reductions in Maintenance and Habitability",
  3: "Reductions in Service",
  4: "Failure to Register a Unit with the Rent Stabilization Program",
}

// We don't use this data anymore, we fetch from the backend now.
// export const DATA: Petition[] = [
//   {
//     petitionTypeNumber: "2",
//     petitionerArgument: [
//       {
//         violatedCode: "CSFRA Regulations, Chapter 2(h)",
//         summaryOfViolation:
//           "Peeling bathroom surfaces, leaking plumbing fixtures, and inadequate maintenance of tub, sink, shower and toilet",
//       },
//       {
//         violatedCode: "CSFRA Regulations, Chapter 2(h)",
//         summaryOfViolation:
//           "Blocked parking access due to dumpster placement, pest issues, and inadequate laundry facilities maintenance",
//       },
//     ],
//     decision: "granted",
//     reimbursement: "12,865.18",
//     rentAdjustment: "Yes",
//     rationale: {
//       respondentHadNotice:
//         "Yes, through tenant portal and direct communications",
//       issueDuration: "Various issues persisting 8-19 months",
//       evidenceAssessment:
//         "Photos, texts, videos, and testimony demonstrated ongoing maintenance issues",
//       impactAssessment:
//         "Multiple habitability issues affecting daily living including bathroom facilities, parking access, and laundry services",
//     },
//     respondent: "TayCon Properties",
//     hearingOfficer: "E. Alexandra DeLateur",
//     city: "Mountain View",
//     caseNumber: "C2324003 & C2324004",
//     hearingDate: "November 8, 2023",
//     filedOnDate: "August 25, 2023",
//     decisionDate: "February 15, 2024",
//     source_file: "WMiddlefield_2120 2024.02.15 HODecision_Redacted.json",
//   },
//   {
//     petitionTypeNumber: "1",
//     petitionerArgument: [
//       {
//         violatedCode: "CSFRA Section 1707",
//         summaryOfViolation:
//           "Landlord demanded unlawful rent increases and failed to register property with Rent Stabilization Program",
//       },
//     ],
//     decision: "granted",
//     reimbursement: "2317.66",
//     rentAdjustment: "Yes",
//     rationale: {
//       respondentHadNotice:
//         "Yes, through city correspondence requesting registration",
//       issueDuration:
//         "Property unregistered from start of tenancy until February 2023",
//       evidenceAssessment:
//         "Found rent increases exceeded allowable AGA and proper notices not given",
//       impactAssessment: "Tenant overcharged due to improper rent increases",
//     },
//     respondent: "Frank Cervantes for Cervantes, LLC",
//     hearingOfficer: "E. Alexandra DeLateur",
//     city: "Mountain View",
//     caseNumber: "22230026",
//     hearingDate: "March 10, 2023",
//     filedOnDate: "February 1, 2023",
//     decisionDate: "April 12, 2023",
//     source_file: "Park_880 2023.04.12 HODecision_Redacted (2).json",
//   },
//   {
//     petitionTypeNumber: "2",
//     petitionerArgument: [
//       {
//         violatedCode:
//           "CA Civil Code \u00a71941.1, Health & Safety Code \u00a717920.3",
//         summaryOfViolation:
//           "Multiple habitability issues including mold, damaged carpet, electrical problems, non-functioning appliances, inadequate heat, leaking plumbing and presence of rats",
//       },
//       {
//         violatedCode:
//           "CA Electrical Code \u00a7404.9, \u00a7406.6, \u00a7210.8(a)",
//         summaryOfViolation:
//           "Faulty electrical system with only one working outlet requiring extension cords, lack of GFCI outlets",
//       },
//     ],
//     decision: "granted",
//     reimbursement: "8217.06",
//     rentAdjustment: "Yes (45%)",
//     rationale: {
//       respondentHadNotice: "Yes, as early as January 2022 for most issues",
//       issueDuration: "Multiple issues persisting 5-8 years",
//       evidenceAssessment:
//         "MFH inspection reports confirmed code violations, photographic evidence showed mold and damage, PG&E report verified heating issues",
//       impactAssessment:
//         "Serious habitability violations affecting safety, comfort and daily living conditions",
//     },
//     respondent: "Sergio Sanchez Morado",
//     hearingOfficer: "Barbara M. Arischer",
//     city: "Mountain View",
//     caseNumber: "C2223055, C2223056",
//     hearingDate: "September 29, 2023",
//     filedOnDate: "June 28, 2023",
//     decisionDate: "November 22, 2023",
//     source_file: "California_1556 2023.11.21 HODecision_Redacted.json",
//   },
//   {
//     petitionTypeNumber: "2",
//     petitionerArgument: [
//       {
//         violatedCode: "Community Stabilization and Fair Rent Act (CSFRA)",
//         summaryOfViolation:
//           "Failure to maintain habitable premises due to insufficient hot water temperature below California health and safety codes since November 2022",
//       },
//     ],
//     decision: "granted",
//     reimbursement: "$2,640.00",
//     rentAdjustment: "Yes (8%)",
//     rationale: {
//       respondentHadNotice: "Yes, notice given on November 23, 2022",
//       issueDuration: "Since December 1, 2022",
//       evidenceAssessment:
//         "Hearing Officer determined 110-degree Fahrenheit minimum standard was appropriate based on International Property Maintenance Code and City's Multifamily Housing Inspection Department",
//       impactAssessment: "Constituted a failure to maintain habitable premises",
//     },
//     respondent: "Shirley Ankenbauer/Timpson Enterprises, Inc.",
//     hearingOfficer: "Not specified",
//     city: "Mountain View",
//     caseNumber: "C22230037",
//     hearingDate: "May 9, 2023",
//     filedOnDate: "March 2, 2023",
//     decisionDate: "January 26, 2024",
//     source_file: "Wright_1725 2024.04.03 RemandAppealDecision_Redacted.json",
//   },
//   {
//     petitionTypeNumber: "2",
//     petitionerArgument: [
//       {
//         violatedCode: "CA Civil Code \u00a7 1941.1",
//         summaryOfViolation:
//           "Security issues with main gate left open allowing non-residents access",
//       },
//       {
//         violatedCode: "EPA Municipal Code \u00a7 14.04.130",
//         summaryOfViolation:
//           "Unsanitary conditions including ant/spider infestation and cloudy water",
//       },
//     ],
//     decision: "granted",
//     reimbursement:
//       "$460 ($230 for security gate issue, $230 for ant infestation)",
//     rentAdjustment: "No",
//     rationale: {
//       respondentHadNotice: "Yes, gate issue was known to respondent",
//       issueDuration: "Not specified in document",
//       evidenceAssessment:
//         "Respondent testified gate was left open for parking; Water was tested by vendor and found safe",
//       impactAssessment:
//         "Security compromised due to open gate allowing non-resident access",
//     },
//     respondent: "Kristian Widjaja",
//     hearingOfficer: "Derek Chantler",
//     city: "East Palo Alto",
//     caseNumber: "20210156",
//     hearingDate: "March 29, 2022",
//     filedOnDate: "July 4, 2022",
//     decisionDate: "January 18, 2023",
//     source_file:
//       "2023-01-23 Rent Boards Finding and Decisions Appeal Case 2021056 - 2070 Glen Way Apartment F.json",
//   },
//   {
//     petitionTypeNumber: "1",
//     petitionerArgument: [
//       {
//         violatedCode: "CSFRA Section 1707(f)",
//         summaryOfViolation:
//           "Unlawful rent increase above allowed Annual General Adjustment (AGA) and multiple rent increases within 12 months",
//       },
//       {
//         violatedCode: "CSFRA Registration Requirements",
//         summaryOfViolation:
//           "Landlord failed to register property with Rent Stabilization Program before implementing rent increases",
//       },
//     ],
//     decision: "granted",
//     reimbursement: "2209.00",
//     rentAdjustment: "Yes",
//     rationale: {
//       respondentHadNotice:
//         "No, landlord failed to provide required CSFRA notices to tenant",
//       issueDuration:
//         "Multiple unlawful increases from March 2022 through October 2022",
//       evidenceAssessment:
//         "Documentation showed rent increases exceeded AGA limits and property was not properly registered",
//       impactAssessment:
//         "Tenant overpaid rent due to multiple unlawful increases",
//     },
//     respondent: "Fairview Townhomes, WRL LLC",
//     hearingOfficer: "E. Alexandra DeLateur",
//     city: "Mountain View",
//     caseNumber: "22230011",
//     hearingDate: "January 13, 2023",
//     filedOnDate: "September 30, 2022",
//     decisionDate: "February 21, 2023",
//     source_file: "Rengstorff_429 2023.02.17 HODecision_Redacted.json",
//   },
//   {
//     petitionTypeNumber: "2",
//     petitionerArgument: [
//       {
//         violatedCode:
//           "Civil Code Section 1941.1(a)(1) and Health & Safety Code Section 17920.3(a)(13)",
//         summaryOfViolation:
//           "Failure to maintain habitable premises due to water leaks and mold in garage and living room",
//       },
//       {
//         violatedCode:
//           "Civil Code Section 1941.1(a)(8) and Health & Safety Code Sections 17920.3 subd. (b)(2)",
//         summaryOfViolation:
//           "Property lacked flooring in good repair and faulty weather protection",
//       },
//     ],
//     decision: "granted",
//     reimbursement: "$1,293.00",
//     rentAdjustment: "Yes (25%)",
//     rationale: {
//       respondentHadNotice:
//         "Yes, notified on multiple occasions between December 12-30, 2022",
//       issueDuration: "December 12, 2022 through February 28, 2023",
//       evidenceAssessment:
//         "Petitioner provided sufficient photographic evidence and testimony of conditions, respondent failed to rebut evidence or take timely action",
//       impactAssessment:
//         "Conditions prevented tenant's elderly mother from using living room and garage due to health concerns",
//     },
//     respondent: "TFT Investments",
//     hearingOfficer: "Not specified",
//     city: "Mountain View",
//     caseNumber: "C22230030",
//     hearingDate: "May 3, 2023",
//     filedOnDate: "February 13, 2023",
//     decisionDate: "June 30, 2023",
//     source_file: "Montecito_1260 2023.10.24 AppealDecision_Redacted.json",
//   },
//   {
//     petitionTypeNumber: "3",
//     petitionerArgument: [
//       {
//         violatedCode: "CSFRA Registration Requirements",
//         summaryOfViolation:
//           "Failure to register property with Rent Stabilization Program prior to issuing rent increase",
//       },
//     ],
//     decision: "granted",
//     reimbursement: "200.00",
//     rentAdjustment: "Yes (5%)",
//     rationale: {
//       respondentHadNotice: "Yes",
//       issueDuration: "2021-2023",
//       evidenceAssessment:
//         "Property was not registered until September 2023, after rent increase notice was issued",
//       impactAssessment:
//         "Rent increase deemed invalid due to non-compliance with registration requirements",
//     },
//     source_file: "Wentworth_1084 2024.05.06 HODecision_Redacted.json",
//   },
//   {
//     petitionTypeNumber: "2",
//     petitionerArgument: [
//       {
//         violatedCode: "Civil Code Sections 1941.1",
//         summaryOfViolation:
//           "Multiple maintenance issues including water leaks, mold, broken stove, and other habitability concerns",
//       },
//     ],
//     decision: "granted",
//     reimbursement: "5750.00",
//     rentAdjustment: "Yes (various percentages for different issues)",
//     rationale: {
//       respondentHadNotice: "Yes, through multiple emails and communications",
//       issueDuration: "Various issues from 2021-2023",
//       evidenceAssessment:
//         "Photos, videos, and testimony showed pattern of maintenance problems with little response",
//       impactAssessment:
//         "Significant impact on habitability and use of premises",
//     },
//     source_file: "Wentworth_1084 2024.05.06 HODecision_Redacted.json",
//   },
//   {
//     petitionTypeNumber: "3",
//     petitionerArgument: [
//       {
//         violatedCode: "CSFRA \u00a7 1707(f)(1)",
//         summaryOfViolation:
//           "Failure to register property with the City before imposing rent increase",
//       },
//     ],
//     decision: "granted",
//     reimbursement: "1487.20",
//     rentAdjustment: "Yes (2%)",
//     rationale: {
//       respondentHadNotice: "No evidence of prior notice",
//       issueDuration: "July 2022 - April 2023 (improper rent increase period)",
//       evidenceAssessment:
//         "Property registration records showed non-compliance during rent increase period",
//       impactAssessment:
//         "Tenant was charged 10% increase instead of allowed 2% due to registration non-compliance",
//     },
//     respondent: "Tenant Planet Inc.",
//     hearingOfficer: "Derek W. Chantler",
//     city: "Mountain View",
//     caseNumber: "C22230021",
//     hearingDate: "May 18, 2023",
//     filedOnDate: "December 30, 2022",
//     decisionDate: "August 3, 2023",
//     source_file: "Chiquita_465 2023.08.04 HODecision_Redacted.json",
//   },
//   {
//     petitionTypeNumber: "2",
//     petitionerArgument: [
//       {
//         violatedCode:
//           "Mountain View Municipal Code Ch. 21, Art. II, Section 21.56, CA Civil Code Section 1941.1",
//         summaryOfViolation:
//           "Second-hand smoke from neighboring units entering tenant's unit causing health issues",
//       },
//       {
//         violatedCode:
//           "CA Health & Safety Code Section 17920.3(c)(10), Property Maintenance Code 402.3",
//         summaryOfViolation:
//           "Inadequate lighting in parking lot creating safety hazards",
//       },
//       {
//         violatedCode:
//           "CA Civil Code Section 1941.1(g), Property Maintenance Code 302.1",
//         summaryOfViolation:
//           "Rat infestation in common areas and excess trash accumulation",
//       },
//     ],
//     decision: "granted",
//     reimbursement: "34,931.23",
//     rentAdjustment: "Yes",
//     rationale: {
//       respondentHadNotice:
//         "Yes, through multiple emails and complaints since 2019",
//       issueDuration: "Multiple issues spanning 2019-2023",
//       evidenceAssessment:
//         "Found substantial documentation of complaints, Fire Department reports, and photo evidence",
//       impactAssessment:
//         "Serious impact on tenant's health and safety, including hospitalization due to smoke exposure",
//     },
//     respondent: "West Washington Properties, LLC",
//     hearingOfficer: "Barbara M. Anscher",
//     city: "Mountain View",
//     caseNumber: "C22230019, C22230025",
//     hearingDate: "May 4, 2023 and December 20, 2023",
//     filedOnDate: "February 3, 2023",
//     decisionDate: "March 20, 2024",
//     source_file: "Whitney_2489 2024.03.20 HODecision_Redacted.json",
//   },
//   {
//     petitionTypeNumber: "2",
//     petitionerArgument: [
//       {
//         violatedCode:
//           "CSFRA Section 1707(d) and Chapter 7, Section C of Regulations",
//         summaryOfViolation:
//           "Undue tenant hardship due to inadequate household income relative to rent increases",
//       },
//     ],
//     decision: "granted",
//     reimbursement:
//       "Rent increase amount for Oct 7-9, 2022 and reduction of banked increases after Oct 10, 2022",
//     rentAdjustment: "Yes (reduction of banked increases beyond 5% AGA)",
//     rationale: {
//       respondentHadNotice:
//         "Yes, through proper petition filing on September 9, 2022",
//       issueDuration: "Not applicable",
//       evidenceAssessment:
//         "Tenant proved income below 100% AMI threshold through tax returns and testimony",
//       impactAssessment:
//         "Tenant's household income qualified for hardship protection under regulations",
//     },
//     respondent: "Del Medio Manor LLC/Calson Property Management",
//     hearingOfficer: "Martin Eichner",
//     city: "Mountain View",
//     caseNumber: "22230004",
//     hearingDate: "October 7, 2022",
//     filedOnDate: "September 9, 2022",
//     decisionDate: "November 18, 2022",
//     source_file: "Del Medio_141 2022.11.18 HODecision_Redacted.json",
//   },
//   {
//     petitionTypeNumber: "2",
//     petitionerArgument: [
//       {
//         violatedCode: "CSFRA Regulations on Housing Services and Maintenance",
//         summaryOfViolation:
//           "Failure to maintain bathroom fixtures (bathtub, shower, sinks) in proper condition with ongoing glazing issues",
//       },
//       {
//         violatedCode: "City Housing Code - Waste Management",
//         summaryOfViolation:
//           "Blocked access to assigned parking spot due to overflowing dumpsters",
//       },
//       {
//         violatedCode: "Housing Services Requirements",
//         summaryOfViolation:
//           "Unsanitary and non-functional laundry facilities with broken machines",
//       },
//     ],
//     decision: "granted",
//     reimbursement:
//       "$12,367.34 total (various refunds for rent overcharges, repairs, and service reductions)",
//     rentAdjustment: "Yes ($25-100 monthly reductions for various issues)",
//     rationale: {
//       respondentHadNotice: "Yes, multiple notifications about various issues",
//       issueDuration: "Issues persisted from February 2021 through hearing date",
//       evidenceAssessment:
//         "Photographic evidence and testimony demonstrated ongoing maintenance issues",
//       impactAssessment:
//         "Significant impact on habitability and use of facilities",
//     },
//     respondent: "Property owner represented by Ela Levin",
//     hearingOfficer: "Not explicitly named",
//     city: "Mountain View",
//     caseNumber: "C23240003 and C23240004",
//     hearingDate: "November 8, 2023",
//     filedOnDate: "August 25, 2023",
//     decisionDate: "February 15, 2024",
//     source_file: "WMiddlefield_2120 2024.04.26 AppealDecision_Redacted.json",
//   },
//   {
//     petitionTypeNumber: "1",
//     petitionerArgument: [
//       {
//         violatedCode: "CSFRA Section 1707(f)(1)",
//         summaryOfViolation:
//           "Landlord failed to register property with Rent Stabilization Program and charged unlawful rent increases without proper compliance",
//       },
//     ],
//     decision: "granted",
//     reimbursement: "2434.29",
//     rentAdjustment: "No",
//     rationale: {
//       respondentHadNotice:
//         "Failed to notify tenant of CSFRA protections at lease commencement",
//       issueDuration: "Non-compliance from April 2021 until February 3, 2023",
//       evidenceAssessment:
//         "Landlord failed to dispute tenant's factual statements and evidence showed multiple improper rent increases",
//       impactAssessment:
//         "Tenant paid excessive rent due to landlord's non-compliance with CSFRA requirements",
//     },
//     respondent: "Frank Cervantes aka Francisco Cervantes for Cervantes, LLC",
//     hearingOfficer: "E. Alexandra DeLateur",
//     city: "Mountain View",
//     caseNumber: "22230017",
//     hearingDate: "March 10, 2023",
//     filedOnDate: "December 27, 2022",
//     decisionDate: "April 12, 2023",
//     source_file: "Park_880 2023.04.12 HODecision_Redacted (1).json",
//   },
//   {
//     petitionTypeNumber: "1",
//     petitionerArgument: [
//       {
//         violatedCode: "CSFRA Section 1702(b)(2)",
//         summaryOfViolation:
//           "Incorrect calculation of base rent during initial lease term",
//       },
//       {
//         violatedCode: "CSFRA Section 1707(c)",
//         summaryOfViolation: "Rent increase without proper notice",
//       },
//     ],
//     decision: "granted",
//     reimbursement: "$806.89",
//     rentAdjustment: "Yes",
//     rationale: {
//       respondentHadNotice:
//         "No, landlord failed to properly notify tenant of rent increases",
//       issueDuration: "June 2022 - December 2022",
//       evidenceAssessment:
//         "Lease agreement and payment records showed incorrect base rent calculation",
//       impactAssessment:
//         "Tenant was overcharged due to improper base rent calculation and unauthorized increases",
//     },
//     respondent: "Washington Square",
//     hearingOfficer: "Barbara M. Anscher",
//     city: "Mountain View",
//     caseNumber: "22230008",
//     hearingDate: "November 18, 2022",
//     filedOnDate: "September 26, 2022",
//     decisionDate: "December 16, 2022",
//     source_file: "Montecito_1375 2022.12.14 HODecision_Redacted.json",
//   },
//   {
//     petitionTypeNumber: "2",
//     petitionerArgument: [
//       {
//         violatedCode:
//           "Section 13 of City's Rent Stabilization and Just Cause for Eviction Ordinance",
//         summaryOfViolation:
//           "Reduction in maintenance and services, including non-functioning elevator, broken lights in common areas, water overflow issues, and mold",
//       },
//       {
//         violatedCode: "CA Civil Code \u00a7 1941.1",
//         summaryOfViolation:
//           "Failure to maintain rental unit in habitable condition with proper maintenance and repairs",
//       },
//     ],
//     decision: "granted",
//     reimbursement: "$268.56",
//     rentAdjustment: "Yes (7.5%)",
//     rationale: {
//       respondentHadNotice: "Yes, issues reported over multiple years",
//       issueDuration:
//         "Various issues spanning several months (elevator out for 6 months)",
//       evidenceAssessment:
//         "Hearing officer found evidence of maintenance issues during inspection, particularly with elevator service and common area lights",
//       impactAssessment:
//         "Determined reduction in housing services warranted temporary rent reduction",
//     },
//     respondent: "Woodland Park Communities",
//     hearingOfficer: "Michael H. Roush",
//     city: "East Palo Alto",
//     caseNumber: "2024-0001",
//     hearingDate: "May 17, 2024",
//     filedOnDate: "January 25, 2024",
//     decisionDate: "May 27, 2024",
//     source_file: "Decision Wilkerson v WPC 20240001.json",
//   },
//   {
//     petitionTypeNumber: "2",
//     petitionerArgument: [
//       {
//         violatedCode: "CSFRA",
//         summaryOfViolation:
//           "Landlord failed to maintain habitable premises due to water leaks, moisture, and mold issues in living room wall",
//       },
//     ],
//     decision: "granted",
//     reimbursement: "$7,050.60",
//     rentAdjustment: "Yes (40%)",
//     rationale: {
//       respondentHadNotice: "Yes, first notified in October 2021",
//       issueDuration: "Unresolved from January 4, 2023 through July 1, 2023",
//       evidenceAssessment:
//         "Tenants provided detailed testimony, maintenance requests, and photo evidence showing persistent issues; landlord's evidence was inconsistent",
//       impactAssessment:
//         "Significant reduction in property value and health impacts from humidity/mold condition",
//     },
//     respondent: "Highland Garden Apartments",
//     hearingOfficer: "Not specified in document",
//     city: "Mountain View",
//     caseNumber: "C22330052",
//     hearingDate: "August 30, 2023",
//     filedOnDate: "May 16, 2023",
//     decisionDate: "October 16, 2023",
//     source_file: "Escuela_222 2024.01.25 AppealDecision_Redacted.json",
//   },
//   {
//     petitionTypeNumber: "1",
//     petitionerArgument: [
//       {
//         violatedCode: "CSFRA Section 1707(d)",
//         summaryOfViolation:
//           "Undue tenant hardship due to household income not exceeding 100% of median household income",
//       },
//     ],
//     decision: "granted",
//     reimbursement:
//       "$28.25 per month for Dec 2022-Sep 2023; $101.44 per month for Oct-Dec 2023",
//     rentAdjustment: "Yes (5%)",
//     rationale: {
//       respondentHadNotice:
//         "Yes, through formal rent increase notice dated August 29, 2023",
//       issueDuration:
//         "Issue addressed within 10 days of effective rent increase date",
//       evidenceAssessment:
//         "Petitioner demonstrated income below threshold and provided necessary documentation",
//       impactAssessment:
//         "Tenant would experience hardship if proposed rent increase were imposed",
//     },
//     respondent: "Shoreline Village LLC",
//     hearingOfficer: "Not specified",
//     city: "Mountain View",
//     caseNumber: "23240026",
//     hearingDate: "November 29, 2023",
//     filedOnDate: "October 9, 2023",
//     decisionDate: "January 11, 2024",
//     source_file: "Central_511 2024.02.27 AppealDecision_Redacted.json",
//   },
//   {
//     petitionTypeNumber: "2",
//     petitionerArgument: [
//       {
//         violatedCode: "CSFRA and Mountain View Rent Stabilization Program",
//         summaryOfViolation:
//           "Failure to roll back rent to effective date of Community Stabilization and Fair Rent Act and improper imposition of 2018 Annual General Adjustment",
//       },
//       {
//         violatedCode: "CA Civil Code \u00a7 1941.1",
//         summaryOfViolation:
//           "Water intrusion and damage to second bedroom making it unusable, and reduction in landscaping/maintenance services",
//       },
//     ],
//     decision: "granted",
//     reimbursement: "24347.67",
//     rentAdjustment: "Yes (25%)",
//     rationale: {
//       respondentHadNotice:
//         "Yes, Petitioner notified Respondent multiple times including June 2023",
//       issueDuration: "Several months of unresolved water intrusion issues",
//       evidenceAssessment:
//         "City inspection report confirmed water damage and need for repairs, testimony and documentary evidence supported claims",
//       impactAssessment:
//         "Second bedroom became unusable, affecting approximately one-fourth of livable space",
//     },
//     respondent: "Mountain View Corporate Center",
//     hearingOfficer: "Not specified",
//     city: "Mountain View",
//     caseNumber: "C22230050 and C22230051",
//     hearingDate: "October 4, 2023",
//     filedOnDate: "May 26, 2023",
//     decisionDate: "February 1, 2024",
//     source_file: "Rich_939 2024.04.03 AppealDecision_Redacted.json",
//   },
//   {
//     petitionTypeNumber: "2",
//     petitionerArgument: [
//       {
//         violatedCode:
//           "Civil Code \u00a71941.1, Health and Safety Code \u00a717920.3",
//         summaryOfViolation:
//           "Water intrusion and mold in second bedroom making it uninhabitable, with damage to walls, ceiling, and floors requiring use of space heaters and open windows",
//       },
//       {
//         violatedCode: "CSFRA \u00a71710(c)",
//         summaryOfViolation:
//           "Elimination of gardening services without corresponding rent reduction and failure to maintain common areas",
//       },
//     ],
//     decision: "granted",
//     reimbursement: "$24,347.67",
//     rentAdjustment: "Yes (25%)",
//     rationale: {
//       respondentHadNotice:
//         "Yes, verbally in November/December 2022 and in writing",
//       issueDuration: "10+ months since December 2022",
//       evidenceAssessment:
//         "Photos and inspection report confirmed substantial water damage; no evidence of repair attempts by landlord",
//       impactAssessment:
//         "25% of living space rendered unusable, teenage daughter unable to use bedroom",
//     },
//     respondent: "Mountain View Chinese Christian Church",
//     hearingOfficer: "Renee Glover Chantler",
//     city: "Mountain View",
//     caseNumber: "C22230050 and C22230051",
//     hearingDate: "October 4, 2023",
//     filedOnDate: "May 26, 2023",
//     decisionDate: "January 25, 2024",
//     source_file: "Rich_939 2024.02.01 HODecision_Redacted.json",
//   },
//   {
//     petitionTypeNumber: "2",
//     petitionerArgument: [
//       {
//         violatedCode:
//           "CA Health & Safety Code Section 114192, Civil Code Section 1941.1, Health & Safety Code Sections 17920.3 and 17920.10",
//         summaryOfViolation:
//           "Insufficient hot water temperature below required minimum of 120-degrees, affecting tenant's ability to shower and properly use sinks",
//       },
//     ],
//     decision: "granted",
//     reimbursement: "$1,100.00",
//     rentAdjustment: "Yes (10%)",
//     rationale: {
//       respondentHadNotice: "Yes, notified on November 23, 2022",
//       issueDuration: "From November 2022 through hearing date",
//       evidenceAssessment:
//         "Hearing officer found tenant's water temperature measurements reliable and confirmed violation through witness testimony and evidence",
//       impactAssessment:
//         "Significant impact on tenant's use of shower and sinks, requiring use of portable heater",
//     },
//     respondent: "Trungent Enterprises, Inc.",
//     hearingOfficer: "Not specified",
//     city: "Mountain View",
//     caseNumber: "C22230037",
//     hearingDate: "May 9, 2023",
//     filedOnDate: "March 2, 2023",
//     decisionDate: "June 9, 2023",
//     source_file: "Wright_1725 2023.10.12 AppealDecision_Redacted.json",
//   },
//   {
//     petitionTypeNumber: "1",
//     petitionerArgument: [
//       {
//         violatedCode: "CSFRA Sections 1706 and 1707",
//         summaryOfViolation:
//           "Improper calculation of base rent and rent increases, failing to account for rent concessions",
//       },
//     ],
//     decision: "granted",
//     reimbursement: "7,596.30",
//     rentAdjustment: "Yes",
//     rationale: {
//       respondentHadNotice: "Yes, via lease terms and rent payment history",
//       issueDuration: "Nov 2022 - Oct 2023",
//       evidenceAssessment:
//         "Rent ledger and payment records showed improper base rent calculations",
//       impactAssessment:
//         "Tenant overcharged due to incorrect base rent calculation",
//     },
//     respondent: "Ferdi DeLuna",
//     hearingOfficer: "E. Alexandra DeLateur",
//     city: "Mountain View",
//     caseNumber: "C23240032",
//     hearingDate: "February 16, 2024",
//     filedOnDate: "November 22, 2023",
//     decisionDate: "April 22, 2024",
//     source_file: "California_2200 2024.04.24 HODecision_Redacted.json",
//   },
//   {
//     petitionTypeNumber: "2",
//     petitionerArgument: [
//       {
//         violatedCode: "CA Civil Code 1941.1",
//         summaryOfViolation:
//           "Multiple maintenance issues including mold, peeling paint, broken appliances, and damaged flooring in bathrooms, kitchen and living room",
//       },
//     ],
//     decision: "granted",
//     reimbursement: "2,800.00",
//     rentAdjustment: "Yes",
//     rationale: {
//       respondentHadNotice: "Yes, via maintenance request on August 23, 2023",
//       issueDuration: "3+ months before petition filing",
//       evidenceAssessment:
//         "Photos and video evidence supported claims of disrepair",
//       impactAssessment:
//         "Issues affected habitability and proper use of multiple rooms",
//     },
//     respondent: "Ferdi DeLuna",
//     hearingOfficer: "E. Alexandra DeLateur",
//     city: "Mountain View",
//     caseNumber: "C23240033",
//     hearingDate: "February 16, 2024",
//     filedOnDate: "November 22, 2023",
//     decisionDate: "April 22, 2024",
//     source_file: "California_2200 2024.04.24 HODecision_Redacted.json",
//   },
//   {
//     petitionTypeNumber: "2",
//     petitionerArgument: [
//       {
//         violatedCode: "California Health and Safety Code Section 114192",
//         summaryOfViolation:
//           "Failure to maintain minimum hot water temperature of 120 degrees, resulting in unusable shower and sinks",
//       },
//     ],
//     decision: "granted",
//     reimbursement: "1,100.00",
//     rentAdjustment: "Yes (10%)",
//     rationale: {
//       respondentHadNotice: "Yes, notified on November 17, 2022",
//       issueDuration: "Ongoing since November 23, 2022 through hearing date",
//       evidenceAssessment:
//         "Both parties agreed water temperature was at least 13 degrees below minimum requirement, multiple temperature readings provided as evidence",
//       impactAssessment:
//         "Significant impact on tenant's ability to use shower and sinks properly",
//     },
//     respondent: "Timpson Enterprises, Inc.",
//     hearingOfficer: "Duf Sundheim",
//     city: "Mountain View",
//     caseNumber: "C22230037",
//     hearingDate: "May 9, 2023",
//     filedOnDate: "March 3, 2023",
//     decisionDate: "June 9, 2023",
//     source_file: "Wright_1725 2023.06.09 HODecision_Redacted.json",
//   },
//   {
//     petitionTypeNumber: "1",
//     petitionerArgument: [
//       {
//         violatedCode: "CSFRA Sections 1706 and 1707",
//         summaryOfViolation:
//           "Landlord charged rent above lawful Base Rent and failed to properly refund overcharges according to schedule",
//       },
//     ],
//     decision: "granted",
//     reimbursement: "$256.35",
//     rentAdjustment: "No",
//     rationale: {
//       respondentHadNotice: "Yes, through original Decision in May 2023",
//       issueDuration: "7 months of withheld refunds, 9 months of overcharges",
//       evidenceAssessment:
//         "Documentation showed respondent failed to follow refund schedule and continued charging above Base Rent",
//       impactAssessment:
//         "Tenants deprived of rightful refunds and overcharged for extended period",
//     },
//     respondent: "Americana I, LLC",
//     hearingOfficer: "Barbara M. Anscher",
//     city: "Mountain View",
//     caseNumber: "C22230028",
//     hearingDate: "January 29, 2024",
//     filedOnDate: "November 28, 2023",
//     decisionDate: "March 4, 2024",
//     source_file: "Continental_707 2024.03.04 HOCPDecision_Redacted.json",
//   },
//   {
//     petitionTypeNumber: "2",
//     petitionerArgument: [
//       {
//         violatedCode: "Cal. Code Regs. Tit. 25, \u00a7 34",
//         summaryOfViolation:
//           "Landlord failed to maintain adequate heating facilities and fix malfunctioning gas heater",
//       },
//       {
//         violatedCode: "Civil Code Sections 1941.1",
//         summaryOfViolation:
//           "Failure to maintain premises in habitable condition due to gas leak and heating issues",
//       },
//     ],
//     decision: "granted",
//     reimbursement: "1174.73",
//     rentAdjustment: "Yes (4-5%)",
//     rationale: {
//       respondentHadNotice:
//         "Yes, multiple notices from April 2021 through April 2023",
//       issueDuration: "Over 2 years (April 2021 - December 2023)",
//       evidenceAssessment:
//         "PG&E verification of gas leak, tenant documentation of communications and purchase of electric heater",
//       impactAssessment:
//         "Significant impact on habitability requiring tenant to purchase alternative heating source",
//     },
//     respondent: "Cervantes LLC, Francisco Cervantes",
//     hearingOfficer: "Duf Sundheim",
//     city: "Mountain View",
//     caseNumber: "C23240002",
//     hearingDate: "December 18, 2023",
//     filedOnDate: "October 10, 2023",
//     decisionDate: "March 25, 2024",
//     source_file: "Church_31 2024.03.25 HODecision_Redacted.json",
//   },
//   {
//     petitionTypeNumber: "2",
//     petitionerArgument: [
//       {
//         violatedCode: "Mountain View Municipal Code Article XVII, Section 1700",
//         summaryOfViolation:
//           "Maintenance and habitability issues including gaps allowing vermin entry, kitchen defects, door problems, and structural issues",
//       },
//     ],
//     decision: "granted",
//     reimbursement: "$46,834.50",
//     rentAdjustment: "Yes ($310.50 monthly reduction)",
//     rationale: {
//       respondentHadNotice:
//         "Yes, documented through multiple inspections and communications",
//       issueDuration: "Multiple months spanning 2022-2023",
//       evidenceAssessment:
//         "City inspections verified repairs were completed, with photographic evidence and permits confirming work",
//       impactAssessment:
//         "Issues affected habitability including vermin entry and structural integrity",
//     },
//     respondent: "Maria Guadalupe Roque",
//     hearingOfficer: "Derek W. Chantler",
//     city: "Mountain View",
//     caseNumber: "22230012",
//     hearingDate: "November 14, 2023",
//     filedOnDate: "October 19, 2022",
//     decisionDate: "January 12, 2024",
//     source_file: "Higdon_1826 2024.01.29 HOCPDecision_Redacted.json",
//   },
//   {
//     petitionTypeNumber: "2",
//     petitionerArgument: [
//       {
//         violatedCode: "CSFRA Sec. 1707(d) and Chapter 7, Section C",
//         summaryOfViolation:
//           "Undue tenant hardship due to rent increase exceeding 50% of income for senior tenant",
//       },
//     ],
//     decision: "granted",
//     reimbursement: "Rent credit for increases paid between Sept 1-Oct 9, 2022",
//     rentAdjustment: "Yes (reduction of banked increases beyond 5% AGA)",
//     rationale: {
//       respondentHadNotice: "Not applicable",
//       issueDuration: "Not applicable",
//       evidenceAssessment:
//         "Tenant proved income significantly below AMI level and senior status requiring >50% income for rent",
//       impactAssessment:
//         "Hardship determined to continue for foreseeable future due to fixed income status",
//     },
//     respondent: "Del Medio Manor, LLP (Calson Property Management)",
//     hearingOfficer: "Martin Eichner",
//     city: "Mountain View",
//     caseNumber: "22230007",
//     hearingDate: "October 7, 2022",
//     filedOnDate: "September 15, 2022",
//     decisionDate: "November 16, 2022",
//     source_file: "DelMedio_141 2022.11.16 HODecision_Redacted.json",
//   },
//   {
//     petitionTypeNumber: "2",
//     petitionerArgument: [
//       {
//         violatedCode: "Civil Code \u00a71941.1",
//         summaryOfViolation:
//           "Water leaks in living room and garage causing mold growth and floor damage",
//       },
//       {
//         violatedCode: "Health and Safety Code \u00a717920.3",
//         summaryOfViolation:
//           "Dampness and mold in unit endangering health and safety of occupants",
//       },
//     ],
//     decision: "granted",
//     reimbursement: "1293.00",
//     rentAdjustment: "Yes (25%)",
//     rationale: {
//       respondentHadNotice: "Yes, written notice given December 12 and 17, 2022",
//       issueDuration: "December 12, 2022 to February 28, 2023 (78 days)",
//       evidenceAssessment:
//         "Photographs showed significant mold growth and water damage; landlord failed to conduct proper testing or repairs",
//       impactAssessment:
//         "Severe risk to tenant's elderly mother's health due to mold conditions",
//     },
//     respondent: "TFT Investments",
//     hearingOfficer: "Renee Glover Chantler",
//     city: "Mountain View",
//     caseNumber: "C22230030",
//     hearingDate: "May 3, 2023",
//     filedOnDate: "February 13, 2023",
//     decisionDate: "June 30, 2023",
//     source_file: "Montecito_1260 2023.06.30 HODecision_Redacted.json",
//   },
//   {
//     petitionTypeNumber: "2",
//     petitionerArgument: [
//       {
//         violatedCode: "CA Civil Code \u00a71941.1, CA H&SC \u00a717920.3",
//         summaryOfViolation:
//           "Failure to maintain premises due to extensive mold growth and moisture issues in wall causing unhealthy living conditions",
//       },
//     ],
//     decision: "granted",
//     reimbursement: "7050.60",
//     rentAdjustment: "Yes (40%)",
//     rationale: {
//       respondentHadNotice:
//         "Yes, first notified in October 2021 and multiple times thereafter",
//       issueDuration:
//         "Issue persisted from January 2023 through July 2023 (180 days)",
//       evidenceAssessment:
//         "Landlord failed to provide evidence of completed repairs, had inconsistent records, and AT&T worker incident confirmed serious mold issue requiring specialized mask",
//       impactAssessment:
//         "Significant negative health impacts on tenants, requiring specialized masks and causing respiratory issues",
//     },
//     respondent: "Highland Garden Apartments",
//     hearingOfficer: "Duf Sundheim",
//     city: "Mountain View",
//     caseNumber: "C22230052",
//     hearingDate: "August 30, 2023",
//     filedOnDate: "May 16, 2023",
//     decisionDate: "October 10, 2023",
//     source_file: "Escuela_222 2023.10.16 HODecision_Redacted.json",
//   },
//   {
//     petitionTypeNumber: "2",
//     petitionerArgument: [
//       {
//         violatedCode: "CA Civil Code \u00a7 1941.1(1)",
//         summaryOfViolation:
//           "Single pane windows failed to provide effective weatherproofing and protection against cold air",
//       },
//       {
//         violatedCode: "CA Civil Code \u00a7 1941.1(4)",
//         summaryOfViolation:
//           "Heating system failed to provide adequate heat in bedrooms and bathrooms, leading to freezing temperatures",
//       },
//     ],
//     decision: "granted",
//     reimbursement: "2875.50",
//     rentAdjustment: "Yes (30%)",
//     rationale: {
//       respondentHadNotice:
//         "Written notice provided on December 19, 2022 with multiple follow-up complaints",
//       issueDuration: "90 days (December 22, 2022 to March 22, 2023)",
//       evidenceAssessment:
//         "Tenant provided credible testimony about freezing temperatures; landlord failed to prove tenant was responsible for heating issues",
//       impactAssessment:
//         "Major discomfort and serious loss of tenancy benefits due to freezing temperatures in bedrooms and bathrooms",
//     },
//     respondent: "Solano Apartments LP",
//     hearingOfficer: "Martin Eichner",
//     city: "Mountain View",
//     caseNumber: "C22230046",
//     hearingDate: "July 12, 2023",
//     filedOnDate: "April 21, 2023",
//     decisionDate: "August 31, 2023",
//     source_file: "Crestview_1050 2023.08.31 HODecision_Redacted.json",
//   },
//   {
//     petitionTypeNumber: "1",
//     petitionerArgument: [
//       {
//         violatedCode: "CSFRA Sec. 1707(d) and Chapter 7, Section C",
//         summaryOfViolation:
//           "Tenant claims undue hardship due to income being below 120% AMI for household size, making rent increase burdensome",
//       },
//     ],
//     decision: "granted",
//     reimbursement: "Credit for excess rent paid since September 1, 2022",
//     rentAdjustment: "Yes (reduction to 5% AGA only)",
//     rationale: {
//       respondentHadNotice: "Yes, through formal petition process",
//       issueDuration: "Ongoing financial hardship since 2021",
//       evidenceAssessment:
//         "Tenant provided credible testimony and documentation of income below AMI threshold; landlord did not dispute evidence",
//       impactAssessment:
//         "Tenant's income significantly below 120% AMI threshold, with continued hardship expected due to reduced child support",
//     },
//     respondent: "Del Medio Manor, LLP and Calson Property Management",
//     hearingOfficer: "Martin Eichner",
//     city: "Mountain View",
//     caseNumber: "22230003",
//     hearingDate: "October 6, 2022",
//     filedOnDate: "August 5, 2022",
//     decisionDate: "November 8, 2022",
//     source_file: "Del Medio_141 2022.11.08 HODecision_Redacted.json",
//   },
//   {
//     petitionTypeNumber: "1",
//     petitionerArgument: [
//       {
//         violatedCode: "CSFRA Sec. 1707(d) and Chapter 7",
//         summaryOfViolation:
//           "Improper banked rent increase of 5% causing undue hardship due to tenant's limited income",
//       },
//     ],
//     decision: "granted",
//     reimbursement: "$586.82",
//     rentAdjustment: "Yes (5%)",
//     rationale: {
//       respondentHadNotice: "Yes, through proper petition filing",
//       issueDuration:
//         "Affected rent calculations from December 2022 through December 2023",
//       evidenceAssessment:
//         "Petitioner proved income below 100% of median household income, qualifying for hardship relief",
//       impactAssessment:
//         "Rent increase would create undue financial hardship given petitioner's limited income",
//     },
//     respondent: "Shoreline Village LLC rep. by Steve Welter",
//     hearingOfficer: "E. Alexandra DeLateur",
//     city: "Mountain View",
//     caseNumber: "C23240026",
//     hearingDate: "November 29, 2023",
//     filedOnDate: "October 9, 2023",
//     decisionDate: "January 11, 2024",
//     source_file: "Central_511 2024.01.11 HODecision_Redacted.json",
//   },
//   {
//     petitionTypeNumber: "1",
//     petitionerArgument: [
//       {
//         violatedCode: "CSFRA Sec. 1707(d) and Chapter 7, Section C",
//         summaryOfViolation:
//           "Undue tenant hardship due to inadequate household income below AMI threshold, making banked rent increases unaffordable",
//       },
//     ],
//     decision: "granted",
//     reimbursement: "Full refund of rent increase paid from Sept 1-Oct 9, 2022",
//     rentAdjustment: "Yes (4.9%)",
//     rationale: {
//       respondentHadNotice: "Yes, petition filed before increase effective date",
//       issueDuration: "Not applicable",
//       evidenceAssessment:
//         "Tenant proved income significantly below 100% AMI threshold, landlord did not dispute income evidence",
//       impactAssessment:
//         "Tenant's income significantly below hardship threshold, hardship expected to continue",
//     },
//     respondent: "Del Medio Manor, LLP and Calson Property Management",
//     hearingOfficer: "Martin Eichner",
//     city: "Mountain View",
//     caseNumber: "22230002",
//     hearingDate: "October 6, 2022",
//     filedOnDate: "August 5, 2022",
//     decisionDate: "November 4, 2022",
//     source_file: "Del Medio_141 2022.11.04 HODecision_Redacted.json",
//   },
//   {
//     petitionTypeNumber: "2",
//     petitionerArgument: [
//       {
//         violatedCode: "Section 13 of City's Rent Stabilization Ordinance",
//         summaryOfViolation:
//           "Cracked and uneven outdoor patio affecting storage use and maintenance/services reduction",
//       },
//       {
//         violatedCode: "CA Civil Code \u00a7 1941.1",
//         summaryOfViolation: "Bathtub in need of repair with drain issues",
//       },
//     ],
//     decision: "granted",
//     reimbursement: "$396.76",
//     rentAdjustment: "Yes (5%)",
//     rationale: {
//       respondentHadNotice: "Yes, notified in July and August 2023",
//       issueDuration: "Issue with patio existing since at least July 2023",
//       evidenceAssessment:
//         "No visual evidence of repairs despite invoice claiming August 2023 repair",
//       impactAssessment:
//         "Condition exceeds minor maintenance deficiency but does not constitute habitability violation",
//     },
//     respondent: "Woodland Park Communities",
//     hearingOfficer: "Michael H. Roush",
//     city: "East Palo Alto",
//     caseNumber: "2023-0001 and 2023-0002",
//     hearingDate: "May 17, 2024",
//     filedOnDate: "November 3, 2023",
//     decisionDate: "May 22, 2024",
//     source_file: "Decision Franklin v WPC 20230001 and 20230002.json",
//   },
//   {
//     petitionTypeNumber: "3",
//     petitionerArgument: [
//       {
//         violatedCode: "CSFRA \u00a7 1707(f)",
//         summaryOfViolation:
//           "Landlord's failure to register rental unit with Rent Stabilization Program prior to imposing utility charges and rent increases",
//       },
//     ],
//     decision: "granted",
//     reimbursement: "$5,600.85",
//     rentAdjustment: "Yes",
//     rationale: {
//       respondentHadNotice:
//         "Yes, landlord was aware of registration requirement through city website",
//       issueDuration: "Unresolved from June 2019 to March 31, 2023",
//       evidenceAssessment:
//         "Found landlord failed to register unit and improperly imposed utility charges without authorization",
//       impactAssessment:
//         "Tenant was charged unlawful rent increases and utility costs above maximum legal rent",
//     },
//     respondent: "Shufang Chen & William Pan",
//     hearingOfficer: "Renee Glover Chandler",
//     city: "Mountain View",
//     caseNumber: "C22230029",
//     hearingDate: "May 17, 2023",
//     filedOnDate: "March 8, 2023",
//     decisionDate: "June 30, 2023",
//     source_file: "Villa_1643 2023.06.30 HODecision_Redacted.json",
//   },
//   {
//     petitionTypeNumber: "2",
//     petitionerArgument: [
//       {
//         violatedCode: "CSFRA \u00a71710(b)",
//         summaryOfViolation:
//           "Basement flooding and sewage leak causing uninhabitable conditions and strong smells",
//       },
//       {
//         violatedCode: "Civil Code \u00a71941.1",
//         summaryOfViolation:
//           "Multiple habitability issues including broken windows, pest infestation, faulty water heater, and structural cracks",
//       },
//     ],
//     decision: "granted",
//     reimbursement: "46834.50",
//     rentAdjustment: "Yes (10%)",
//     rationale: {
//       respondentHadNotice: "Yes, multiple issues reported between 2016-2022",
//       issueDuration: "Various issues lasting from 3 months to over 46 months",
//       evidenceAssessment:
//         "City inspection reports and witness testimony confirmed multiple habitability violations",
//       impactAssessment:
//         "Severe impact on daily living - unable to use kitchen, forced to wash dishes outside, pest infestation, no hot water",
//     },
//     respondent: "Maria Guadalupe Roque",
//     hearingOfficer: "Derek W. Chantler",
//     city: "Mountain View",
//     caseNumber: "22230012",
//     hearingDate: "December 1, 2022",
//     filedOnDate: "October 19, 2022",
//     decisionDate: "February 23, 2023",
//     source_file: "Higdon_1826 2023.02.23 HODecision_Redacted.json",
//   },
//   {
//     petitionTypeNumber: "1",
//     petitionerArgument: [
//       {
//         violatedCode: "CSFRA Sec. 1707(d)",
//         summaryOfViolation:
//           "Challenge to banked rent increases from 2020-2021 due to senior status and limited income creating undue hardship",
//       },
//     ],
//     decision: "granted",
//     reimbursement: "$199.50 plus December 2022 overpayments",
//     rentAdjustment: "Yes (5%)",
//     rationale: {
//       respondentHadNotice:
//         "Yes, petition filed within 10 days of rent increase notice",
//       issueDuration: "Not applicable",
//       evidenceAssessment:
//         "Petitioner proved senior status (65+ years) and income below 120% AMI through documentation",
//       impactAssessment:
//         "Undue hardship established due to senior status and limited income",
//     },
//     respondent: "Avery Shadows L/P",
//     hearingOfficer: "E. Alexandra DeLateur",
//     city: "Mountain View",
//     caseNumber: "22230009",
//     hearingDate: "November 16, 2022",
//     filedOnDate: "September 29, 2022",
//     decisionDate: "December 8, 2022",
//     source_file: "NShoreline_750 2022.12.08 HODecision_Redacted.json",
//   },
//   {
//     petitionTypeNumber: "1",
//     petitionerArgument: [
//       {
//         violatedCode: "CSFRA Section 1706(a)",
//         summaryOfViolation:
//           "Landlord charged rent exceeding the lawful Base Rent by not including rent concessions in calculation",
//       },
//       {
//         violatedCode: "CSFRA Section 1706(c)",
//         summaryOfViolation:
//           "Unlawful increase in security deposit from $500 to $1000 for pet addition",
//       },
//     ],
//     decision: "granted",
//     reimbursement: "$6,072.11 plus additional monthly credits",
//     rentAdjustment: "Yes",
//     rationale: {
//       respondentHadNotice: "Yes, through tenant petition and hearing",
//       issueDuration: "Approximately 1 year (Feb 2022 - Feb 2023)",
//       evidenceAssessment:
//         "Documentation showed incorrect base rent calculation and unlawful security deposit increase",
//       impactAssessment:
//         "Tenants overcharged due to improper rent calculations and deposit requirements",
//     },
//     respondent: "Americana I, LLC",
//     hearingOfficer: "Barbara M. Ainscher",
//     city: "Mountain View",
//     caseNumber: "C22230028",
//     hearingDate: "April 13, 2023",
//     filedOnDate: "February 9, 2023",
//     decisionDate: "May 19, 2023",
//     source_file: "Continental_707 2023.05.19 HODecision_Redacted.json",
//   },
//   {
//     petitionTypeNumber: "1",
//     petitionerArgument: [
//       {
//         violatedCode: "CSFRA Section 1702(b)(2)",
//         summaryOfViolation:
//           "Incorrect calculation of Base Rent by not accounting for rent concessions and using 18-month instead of 12-month initial term",
//       },
//       {
//         violatedCode: "CSFRA Section 1707(b)",
//         summaryOfViolation:
//           "Multiple rent increases within 12-month period and increase exceeding allowed Annual General Adjustment",
//       },
//     ],
//     decision: "granted",
//     reimbursement: "7,472.38",
//     rentAdjustment: "Yes",
//     rationale: {
//       respondentHadNotice:
//         "Yes, through tenant petition filed December 15, 2022",
//       issueDuration:
//         "Multiple unlawful rent increases from December 2021 to June 2022",
//       evidenceAssessment:
//         "Review of lease terms, rent concessions, and payment records showed incorrect base rent calculations",
//       impactAssessment:
//         "Tenants were overcharged due to improper base rent calculation and multiple unauthorized increases",
//     },
//     respondent: "SI VI LLC",
//     hearingOfficer: "Barbara M. Anscher",
//     city: "Mountain View",
//     caseNumber: "22230015",
//     hearingDate: "February 22, 2023",
//     filedOnDate: "December 15, 2022",
//     decisionDate: "March 23, 2023",
//     source_file: "NWhisman_100 2023.03.23 HODecision_Redacted.json",
//   },
//   {
//     petitionTypeNumber: "1",
//     petitionerArgument: [
//       {
//         violatedCode: "CSFRA Section 1707",
//         summaryOfViolation:
//           "Landlord imposed multiple unlawful rent increases and failed to register property with Rent Stabilization Program",
//       },
//     ],
//     decision: "granted",
//     reimbursement: "2,337.04",
//     rentAdjustment: "No",
//     rationale: {
//       respondentHadNotice:
//         "Yes, was notified by City about compliance requirements",
//       issueDuration:
//         "Failed to register property for years until February 3, 2023",
//       evidenceAssessment:
//         "Landlord did not contest tenant's factual statements and failed to provide required CSFRA notices",
//       impactAssessment:
//         "Tenant was overcharged due to improper rent increases above allowable amounts",
//     },
//     respondent: "Francisco Cervantes aka Frank Cervantes for Cervantes, LLC",
//     hearingOfficer: "E. Alexandra DeLateur",
//     city: "Mountain View",
//     caseNumber: "22230016",
//     hearingDate: "March 10, 2023",
//     filedOnDate: "December 19, 2022",
//     decisionDate: "April 13, 2023",
//     source_file: "Park_880 2023.04.13 HODecision_Redacted.json",
//   },
//   {
//     petitionTypeNumber: "1",
//     petitionerArgument: [
//       {
//         violatedCode: "CSFRA Section 1707",
//         summaryOfViolation:
//           "Unlawful rent increases - more than allowed AGA and multiple increases within 12 months",
//       },
//       {
//         violatedCode: "CSFRA Registration Requirements",
//         summaryOfViolation:
//           "Landlord failed to register property with Rent Stabilization Program",
//       },
//     ],
//     decision: "granted",
//     reimbursement: "3040.42",
//     rentAdjustment: "Yes",
//     rationale: {
//       respondentHadNotice: "Yes, received multiple requests from CSFRA staff",
//       issueDuration: "Multiple unlawful rent increases over 12 months",
//       evidenceAssessment:
//         "Clear documentation of improper rent increases and failure to register",
//       impactAssessment:
//         "Tenant overcharged significantly compared to lawful base rent",
//     },
//     respondent: "Frank Cervantes for Cervantes, LLC",
//     hearingOfficer: "E. Alexandra DeLateur",
//     city: "Mountain View",
//     caseNumber: "22230006",
//     hearingDate: "January 12, 2023",
//     filedOnDate: "November 29, 2022",
//     decisionDate: "February 13, 2023",
//     source_file: "Church_31 2023.02.13 HODecision_Redacted.json",
//   },
//   {
//     petitionTypeNumber: "2",
//     petitionerArgument: [
//       {
//         violatedCode:
//           "Section 13 of City's Rent Stabilization Ordinance & CA Civil Code \u00a7 1941.1",
//         summaryOfViolation:
//           "Roach infestation, unsanitary conditions from neighbor's garbage storage, rats on balcony, and noise disturbances impacting habitability",
//       },
//     ],
//     decision: "granted",
//     reimbursement: "$2024.79",
//     rentAdjustment: "Yes (7.5%)",
//     rationale: {
//       respondentHadNotice: "Yes, since at least 2022",
//       issueDuration:
//         "Multiple years of ongoing issues, particularly since 2022",
//       evidenceAssessment:
//         "Tenant's testimony supported finding of periodic maintenance and habitability issues; temporary remedial efforts by landlord proved insufficient",
//       impactAssessment:
//         "Unit not free of roaches/rats, balcony unusable due to neighbor's dog waste, significant impact on living conditions",
//     },
//     respondent: "Woodland Park Communities",
//     hearingOfficer: "Michael H. Roush",
//     city: "East Palo Alto",
//     caseNumber: "2023-0003 and 2023-0004",
//     hearingDate: "May 17, 2024",
//     filedOnDate: "November 15, 2023",
//     decisionDate: "May 23, 2024",
//     source_file: "Decision Nee v WPC 20230003 and 20230004.json",
//   },
//   {
//     petitionTypeNumber: "2",
//     petitionerArgument: [
//       {
//         violatedCode: "CSFRA Sections 1706(a) and 1707(a)",
//         summaryOfViolation:
//           "Respondent improperly calculated Base Rent and imposed unlawful rent increases",
//       },
//       {
//         violatedCode:
//           "CA Civil Code \u00a7 1941.1, Health & Safety Code \u00a7 17920.3(c)",
//         summaryOfViolation:
//           "Multiple habitability issues including second-hand smoke, rodent infestation, inadequate lighting, trash accumulation, and swimming pool maintenance",
//       },
//       {
//         violatedCode: "CSFRA Housing Services Requirements",
//         summaryOfViolation:
//           "Reduction in housing services including laundry room closure and lack of on-site property manager",
//       },
//     ],
//     decision: "granted",
//     reimbursement: "$34,931.23",
//     rentAdjustment: "Yes (20%)",
//     rationale: {
//       respondentHadNotice:
//         "Yes, through multiple complaints and emails from 2019-2023",
//       issueDuration: "Various issues persisted between 2019-2023",
//       evidenceAssessment:
//         "Hearing Officer found substantial evidence through testimony, photos, inspection reports and emails documenting ongoing issues",
//       impactAssessment:
//         "Multiple habitability and maintenance issues significantly impacted tenant's use and enjoyment of property",
//     },
//     respondent: "West Washington Gardens LLC/CMF Property Management",
//     hearingOfficer: "Not explicitly stated",
//     city: "Mountain View",
//     caseNumber: "C22230019 and C22230025",
//     hearingDate: "December 20, 2023",
//     filedOnDate: "February 3, 2023",
//     decisionDate: "March 20, 2024",
//     source_file: "Whitney_2489 2024.07.09 Appeal Decision_Redacted.json",
//   },
// ];
