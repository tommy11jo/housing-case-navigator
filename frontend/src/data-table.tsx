"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  FilterFn,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { Fragment } from "react";
import { Input } from "./components/ui/input";
import { Search } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const fuzzyFilter: FilterFn<TData> = (row, columnId, value) => {
    const cellValue = row.getValue(columnId);
    if (cellValue == null) return false;

    // Convert the cell value to a searchable string
    const searchableValue =
      typeof cellValue === "object"
        ? JSON.stringify(cellValue).toLowerCase()
        : String(cellValue).toLowerCase();

    return searchableValue.includes(String(value).toLowerCase());
  };

  const table = useReactTable({
    data,
    columns: columns.map((c) => ({ ...c, filterFn: fuzzyFilter })),
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    globalFilterFn: fuzzyFilter,
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-md border bg-white shadow-sm w-full">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <Fragment key={headerGroup.id}>
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="border-b border-r bg-gray-50/75 py-4"
                    >
                      <div className="font-semibold text-center text-sm text-gray-900 whitespace-nowrap min-w-32">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
                <TableRow className="bg-gray-50/30">
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="p-2 border-r">
                      <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Filter..."
                          value={
                            (header.column.getFilterValue() as string) ?? ""
                          }
                          onChange={(event) =>
                            header.column.setFilterValue(event.target.value)
                          }
                          className="w-full max-w-sm pl-8 text-sm h-9"
                        />
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </Fragment>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-gray-50/50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="p-4 border-r">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-gray-500"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
