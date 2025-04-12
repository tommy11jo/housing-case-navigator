"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  FilterFn,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import React, { Fragment } from "react"
import { Input } from "./components/ui/input"
import { Search } from "lucide-react"

// Extend react-table types to include our custom meta
declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData> {
    onOpenFile?: (filePath: string) => Promise<void>;
  }
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  onOpenFile?: (filePath: string) => Promise<void>
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onOpenFile,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )

  const fuzzyFilter: FilterFn<TData> = (row, columnId, value) => {
    try {
      const cellValue = row.getValue(columnId)

      if (!value) return true

      if (cellValue == null) {
        return false
      }

      const searchableValue =
        typeof cellValue === "object"
          ? JSON.stringify(cellValue).toLowerCase()
          : String(cellValue).toLowerCase()

      return searchableValue.includes(String(value).toLowerCase())
    } catch (error) {
      console.error("Error in fuzzyFilter:", error)
      return false
    }
  }

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
    // Pass the function down via meta, now strongly typed
    meta: {
      onOpenFile,
    },
  })

  const getFilteredRowCount = (columnId: string) => {
    const filterValue = table.getColumn(columnId)?.getFilterValue()
    if (!filterValue) return null

    // Pass undefined for the addMeta parameter
    return table
      .getFilteredRowModel()
      .rows.filter((row) => fuzzyFilter(row, columnId, filterValue, () => {}))
      .length
  }

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
                        {header.column.getFilterValue() != null ? (
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                            {getFilteredRowCount(header.column.id)}/
                            {table.getPreFilteredRowModel().rows.length}
                          </div>
                        ) : null}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </Fragment>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                try {
                  return (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className="hover:bg-gray-50/50"
                    >
                      {row.getVisibleCells().map((cell) => {
                        // This try catch logic isn't actually working :(
                        let cellContent
                        try {
                          cellContent = flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )
                        } catch {
                          // Skip cells that can't be rendered
                          cellContent = "Unable to load"
                        }
                        return (
                          <TableCell key={cell.id} className="p-4 border-r">
                            {cellContent}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                } catch {
                  // Skip rows that can't be rendered
                  return null
                }
              })
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
  )
}
