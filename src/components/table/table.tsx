"use client";

import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

// Sample Data
const data = [
  {
    kodeItem: "OBT00475",
    namaItem: "ABBOTIC 500 MG TABLET*",
    kategoriItem: "OBAT",
    satuan: "TABLET",
    supplier: "Supplier A",
    min: 10,
    max: 20,
    wacc: 31920.25,
    minQty: 10,
    awalAmount: 63840.49,
    masuk: 0,
    masukAmount: 0.0,
    keluar: 0,
    keluarAmount: 0.0,
  },
  {
    kodeItem: "OBT00478",
    namaItem: "ABBOTIC GRANUL 125 MG/5ML 30 ML SYRUP*",
    kategoriItem: "OBAT",
    satuan: "BOTOL",
    supplier: "Supplier B",
    min: 0,
    max: 0,
    wacc: 0.0,
    minQty: 0,
    awalAmount: 0.0,
    masuk: 0,
    masukAmount: 0.0,
    keluar: 0,
    keluarAmount: 0.0,
  },
  // Add more rows as needed...
];

// Column Definitions
const columns = [
  { accessorKey: "kodeItem", header: "KODE ITEM" },
  { accessorKey: "namaItem", header: "NAMA ITEM" },
  { accessorKey: "kategoriItem", header: "KATEGORI ITEM" },
  { accessorKey: "satuan", header: "SATUAN" },
  { accessorKey: "supplier", header: "SUPPLIER" },
  { accessorKey: "min", header: "MIN" },
  { accessorKey: "max", header: "MAX" },
  { accessorKey: "wacc", header: "WACC" },
  { accessorKey: "minQty", header: "MIN QTY" },
  { accessorKey: "awalAmount", header: "AWAL AMOUNT" },
  { accessorKey: "masuk", header: "MASUK" },
  { accessorKey: "masukAmount", header: "MASUK AMOUNT" },
  { accessorKey: "keluar", header: "KELUAR" },
  { accessorKey: "keluarAmount", header: "KELUAR AMOUNT" },
];

type tableProps = {
  data: any;
  columns: any;
};

const Table = ({ data, columns }: tableProps) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="p-4 overflow-y-hidden">
      <table className="table-auto w-full border-collapse border border-green-500">
        <thead className="bg-[#D3EED1]">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border border-[#B9D8B0] p-2 text-center text-[#1A7E5B] font-normal text-xs"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="odd:bg-[#f8fcf4] even:bg-white hover:bg-blue-50">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="border border-green-500 px-5 text-left text-xs font-normal"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-4 py-2 bg-green-500 text-white disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-4 py-2 bg-green-500 text-white disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
