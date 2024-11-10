import { ColumnDef } from "@tanstack/react-table";
import { Petition } from "./types";

export const columns: ColumnDef<Petition>[] = [
  {
    header: () => (
      <div className="text-center" style={{ width: "150px" }}>
        Petition Type
      </div>
    ),
    accessorKey: "petitionTypeNumber",
    size: 300,
  },
  {
    header: "Petitioner Argument",
    accessorKey: "petitionerArgument",
    cell: ({ row }) => {
      const text = row.original.petitionerArgument
        .map((arg) => `${arg.violatedCode}: ${arg.summaryOfViolation}`)
        .join("\n\n");
      return <pre className="whitespace-pre-wrap font-sans">{text}</pre>;
    },
  },
  {
    header: "Decision",
    accessorKey: "decision",
  },
  {
    header: "Reimbursement",
    accessorKey: "reimbursement",
  },
  {
    header: "Rent Adjustment",
    accessorKey: "rentAdjustment",
  },
  {
    header: "Rationale for Decision",
    accessorKey: "rationaleForDecision",
    cell: ({ row }) => {
      const text = Object.entries(row.original.rationale)
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n\n");
      return <pre className="whitespace-pre-wrap font-sans">{text}</pre>;
    },
  },
  {
    header: "Respondent",
    accessorKey: "respondent",
  },
  {
    header: "Hearing Officer",
    accessorKey: "hearingOfficer",
  },
  {
    header: "City",
    accessorKey: "city",
  },
  {
    header: "Case Number",
    accessorKey: "caseNumber",
  },
  {
    header: "Hearing Date",
    accessorKey: "hearingDate",
  },
  {
    header: "Filed On Date",
    accessorKey: "filedOnDate",
  },
  {
    header: "Decision Date",
    accessorKey: "decisionDate",
  },
  {
    header: "Document",
    accessorKey: "document",
  },
];
