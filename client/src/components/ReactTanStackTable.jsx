import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

const ReactTanStackTable = ({data , columns}) => {
  // {"id":1,"candidateName":"dtouson0","trainingCenter":"Walsh-Gutmann","trainingSubject":"Developer I","issueDate":"5/12/2023","country":"Indonesia","action":"pending"}


  const [sorting, setSorting] = useState();
  const [filtering , setFiltering] = useState('')

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter:filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <>
    <input className="form-inpu" type="text" value={filtering} onChange={(e) => setFiltering(e.target.value)} />
      <table className="table">
        <thead className="table-head">
          {/*  table header */}
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                className="table-header"
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {{ asc: "⬆️", desc: "⬇️" }[header.column.getIsSorted() ?? null]}
                </th>
              ))}
              
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr className="table-row"
            key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="table-btn">
        <button className="btn"  onClick={() => table.setPageIndex(0)}>first page</button>
        <button
        className="btn" 
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          previous page
        </button>
        <button
        className="btn" 
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          next page
        </button>
        <button className="btn" onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
          last page
        </button>
      </div>
    </>
  );
};

export default ReactTanStackTable;
