import { ColumnDef } from "@tanstack/react-table";
import { PETITION_TYPE_NUMBER_TO_NAME } from "./data";
import { format } from "date-fns";
import { Petition } from "./types";
export const columns: ColumnDef<Petition>[] = [
  {
    header: "Case Number",
    accessorKey: "caseNumber",
    cell: ({ row }) => (
      <span className="font-mono text-gray-700">{row.original.caseNumber}</span>
    ),
  },
  {
    header: () => (
      <div className="text-center" style={{ width: "200px" }}>
        Petition Type
      </div>
    ),
    accessorKey: "petitionTypeNumber",
    size: 300,
    cell: ({ row }) => {
      const petitionTypeNumber = parseInt(row.original.petitionTypeNumber) as
        | 1
        | 2
        | 3;
      return PETITION_TYPE_NUMBER_TO_NAME[petitionTypeNumber];
    },
  },
  {
    header: () => (
      <div className="text-center" style={{ width: "250px" }}>
        Petitioner Argument
      </div>
    ),
    accessorKey: "petitionerArgument",
    cell: ({ row }) => {
      return (
        <ol className="list-decimal pl-4">
          {row.original.petitionerArgument.map(
            (arg: Petition["petitionerArgument"][number], i: number) => (
              <li key={i} className="mb-2">
                <strong>{arg.violatedCode}</strong>: {arg.summaryOfViolation}
              </li>
            )
          )}
        </ol>
      );
    },
  },
  {
    header: "Decision",
    accessorKey: "decision",
    cell: ({ row }) => (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${
          row.original.decision.toLowerCase() === "granted"
            ? "bg-green-100 text-green-800"
            : row.original.decision.toLowerCase() === "denied"
            ? "bg-red-100 text-red-800"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        {row.original.decision}
      </span>
    ),
  },
  {
    header: "Reimbursement",
    accessorKey: "directReimbursement",
    cell: ({ row }) => {
      const amount = parseFloat(row.original.directReimbursement);
      return (
        <span className="font-mono">
          $
          {amount.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      );
    },
  },
  {
    header: "Rent Adjustment",
    accessorKey: "rentAdjustment",
    cell: ({ row }) => {
      const value = row.original.rentAdjustment;
      const isPositive = value.includes("+");
      return (
        <div className="flex items-center gap-1">
          <span
            className={`${
              isPositive ? "text-green-600" : "text-red-600"
            } font-medium`}
          >
            {isPositive ? "↑" : "↓"} {value}
          </span>
        </div>
      );
    },
  },
  {
    header: () => (
      <div className="text-center" style={{ width: "250px" }}>
        "Rationale for Decision"
      </div>
    ),
    accessorKey: "rationaleForDecision",
    cell: ({ row }) => {
      const rationale = row.original.rationale;
      const rationaleItems = [
        {
          label: "Respondent had notice",
          value: rationale.respondentHadNotice,
        },
        { label: "Issue Duration", value: rationale.issueDuration },
        { label: "Assessment of impact", value: rationale.impactAssessment },
        {
          label: "Assessment of evidence",
          value: rationale.evidenceAssessment,
        },
      ].filter((item) => item.value && item.value.length > 0);

      return (
        <ol className="list-decimal pl-4">
          {rationaleItems.map((item, i) => (
            <li key={i} className="mb-2">
              <strong>{item.label}</strong>: {item.value}
            </li>
          ))}
        </ol>
      );
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
    header: "Hearing Date",
    accessorKey: "hearingDate",
    cell: ({ row }) => {
      const date = new Date(row.original.hearingDate);
      return format(date, "MMM d, yyyy");
    },
  },
  {
    header: "Filed On Date",
    accessorKey: "filedOnDate",
    cell: ({ row }) => {
      const date = new Date(row.original.filedOnDate);
      return format(date, "MMM d, yyyy");
    },
  },
  {
    header: "Decision Date",
    accessorKey: "decisionDate",
    cell: ({ row }) => {
      const date = new Date(row.original.decisionDate);
      return format(date, "MMM d, yyyy");
    },
  },
  {
    header: "Document",
    accessorKey: "document",
  },
];
