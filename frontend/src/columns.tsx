import { ColumnDef } from "@tanstack/react-table";
import { PETITION_TYPE_NUMBER_TO_NAME } from "./data";
import { format } from "date-fns";
import { Petition } from "./types";
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
    accessorKey: "issueTypeNumber",
    size: 300,
    cell: ({ row }) => {
      const issueTypeNumber = parseInt(row.original.issueTypeNumber) as
        | 1
        | 2
        | 3
        | 4;
      return PETITION_TYPE_NUMBER_TO_NAME[issueTypeNumber];
    },
  },
  {
    header: () => (
      <div className="text-center" style={{ width: "350px" }}>
        Argument and Decision
      </div>
    ),
    accessorKey: "argumentsAndDecisions",
    cell: ({ row }) => {
      const decisions = row.original.argumentsAndDecisions;
      // Check if decisions is an array before mapping
      if (!Array.isArray(decisions)) {
        return <span className="text-gray-500">N/A</span>;
      }
      return (
        <ol className="list-decimal pl-4 text-left w-full">
          {decisions.map(
            (arg: Petition["argumentsAndDecisions"][number], i: number) => (
              <li key={i} className="mb-2">
                <strong>{arg.violatedCode}</strong>: {arg.complaintSummary}
                <br />
                <strong>Reimbursement:</strong> {arg.reimbursement}
                <br />
                <strong>Impact Assessment:</strong> {arg.impactAssessment}
                <br />
                <strong>Evidence Assessment:</strong> {arg.evidenceAssessment}
              </li>
            )
          )}
        </ol>
      );
    },
  },
  // {
  //   header: "Reimbursement Justified",
  //   accessorKey: "reimbursementJustified",
  //   cell: ({ row }) => (
  //     <span
  //       className={`px-3 py-1 rounded-full text-sm font-medium ${
  //         row.original.reimbursementJustified.toLowerCase() === "yes"
  //           ? "bg-green-100 text-green-800"
  //           : "bg-red-100 text-red-800"
  //       }`}
  //     >
  //       {row.original.reimbursementJustified}
  //     </span>
  //   ),
  // },
  {
    header: "Rent Adjustment",
    accessorKey: "rentAdjustment",
    cell: ({ row }) => {
      const value = row.original.rentAdjustment;
      // Check if value is a string before using string methods
      if (typeof value !== "string") {
        return <span className="text-gray-500">N/A</span>; // Handle non-string case
      }
      const rentReduced =
        value.includes("-") || value.toLowerCase().includes("yes");
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
      try {
        const date = new Date(row.original.hearingDate);
        return isNaN(date.getTime())
          ? "Invalid Date"
          : format(date, "MMM d, yyyy");
      } catch {
        return "Invalid Date";
      }
    },
  },
  {
    header: "Filed On Date",
    accessorKey: "filedOnDate",
    cell: ({ row }) => {
      try {
        const date = new Date(row.original.filedOnDate);
        return isNaN(date.getTime())
          ? "Invalid Date"
          : format(date, "MMM d, yyyy");
      } catch {
        return "Invalid Date";
      }
    },
  },
  {
    header: "Decision Date",
    accessorKey: "decisionDate",
    cell: ({ row }) => {
      try {
        const date = new Date(row.original.decisionDate);
        return isNaN(date.getTime())
          ? "Invalid Date"
          : format(date, "MMM d, yyyy");
      } catch {
        return "Invalid Date";
      }
    },
  },
  {
    header: "Source File",
    accessorKey: "sourceFile",
    cell: ({ row, cell }) => {
      const sourceFile = row.original.sourceFile;
      // Access the function from table meta, now strongly typed
      const onOpenFile = cell.getContext().table.options.meta?.onOpenFile;

      if (!onOpenFile) {
        // Fallback if the function isn't passed (optional)
        return <span>{sourceFile}</span>;
      }

      return (
        <button
          onClick={() => onOpenFile(sourceFile)}
          className="text-blue-600 hover:underline cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background: 'none', border: 'none', padding: 0, font: 'inherit' }} // Make it look like text
        >
          {sourceFile}
        </button>
      );
    },
  },
];
