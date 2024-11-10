import { ColumnDef } from "@tanstack/react-table"
import { PETITION_TYPE_NUMBER_TO_NAME } from "./data"
import { format } from "date-fns"
import { Petition } from "./types"
export const columns: ColumnDef<Petition>[] = [
  {
    header: "Case Info",
    accessorKey: "caseInfo",
    cell: ({ row }) => (
      <span className="font-mono text-gray-700">{row.original.caseInfo}</span>
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
      const petitionTypeNumber = parseInt(row.original.issueTypeNumber) as
        | 1
        | 2
        | 3
      return PETITION_TYPE_NUMBER_TO_NAME[petitionTypeNumber]
    },
  },
  {
    header: () => (
      <div className="text-center" style={{ width: "350px" }}>
        Petitioner Argument
      </div>
    ),
    accessorKey: "petitionerArgument",
    cell: ({ row }) => {
      return (
        <ol className="list-decimal pl-4 text-left w-full">
          {row.original.argumentsAndDecisions.map(
            (arg: Petition["argumentsAndDecisions"][number], i: number) => (
              <li key={i} className="mb-2">
                <strong>{arg.violatedCode}</strong>: {arg.complaintSummary}
                <br />
                <strong>Reimbursement:</strong> {arg.reimbursement}
                <br />
                {/* <strong>Impact Assessment:</strong> {arg.impactAssessment} */}
                {/* <br /> */}
                {/* <strong>Evidence Assessment:</strong> {arg.evidenceAssessment} */}
              </li>
            )
          )}
        </ol>
      )
    },
  },
  {
    header: "Reimbursement Justified",
    accessorKey: "reimbursementJustified",
    cell: ({ row }) => (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${
          row.original.reimbursementJustified.toLowerCase() === "yes"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {row.original.reimbursementJustified}
      </span>
    ),
  },
  {
    header: "Rent Adjustment",
    accessorKey: "rentAdjustment",
    cell: ({ row }) => {
      const value = row.original.rentAdjustment
      const rentReduced =
        value.includes("-") || value.toLowerCase().includes("yes")
      return (
        <div className="flex items-center gap-1">
          <span
            className={`${
              rentReduced ? "text-green-600" : "text-red-600"
            } font-medium`}
          >
            {rentReduced ? "↓" : "↑"} {value}
          </span>
        </div>
      )
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
      try {
        const date = new Date(row.original.hearingDate)
        return isNaN(date.getTime())
          ? "Invalid Date"
          : format(date, "MMM d, yyyy")
      } catch {
        return "Invalid Date"
      }
    },
  },
  {
    header: "Filed On Date",
    accessorKey: "filedOnDate",
    cell: ({ row }) => {
      try {
        const date = new Date(row.original.filedOnDate)
        return isNaN(date.getTime())
          ? "Invalid Date"
          : format(date, "MMM d, yyyy")
      } catch {
        return "Invalid Date"
      }
    },
  },
  {
    header: "Decision Date",
    accessorKey: "decisionDate",
    cell: ({ row }) => {
      try {
        const date = new Date(row.original.decisionDate)
        return isNaN(date.getTime())
          ? "Invalid Date"
          : format(date, "MMM d, yyyy")
      } catch {
        return "Invalid Date"
      }
    },
  },
  {
    header: "Source File",
    accessorKey: "sourceFile",
  },
]
