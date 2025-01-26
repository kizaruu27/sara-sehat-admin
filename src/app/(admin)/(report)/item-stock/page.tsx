"use client";

import Table from "@/components/table/table";
import { currencyFormat, urlBE } from "@/helper/helper";
import { deleteItem, getAllItem } from "@/services/items";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { HiTrash } from "react-icons/hi2";
import { toast } from "react-toastify";
import Modal from "react-modal";

export default function ItemStockPage() {
  const [hasMounted, setHasMounted] = useState<Boolean>(false);

  const [itemCode, setItemCode] = useState<string>("");
  const [itemCategoryId, setItemCategoryId] = useState<string>("");
  const [itemName, setItemName] = useState<string>("");

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const payload = {
    itemCode,
    itemCategoryId,
    itemName,
  };

  const {
    data: itemsData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["getAllItems"],
    queryFn: () => getAllItem(payload),
    enabled: false,
  });

  useEffect(() => {
    setHasMounted(true);
  }, [hasMounted]);

  useEffect(() => {
    if (hasMounted) {
      refetch();
    }
  }, [hasMounted, itemsData, refetch, isError]);

  const handleDeleteItem = (id: number) => {
    const confirm = window.confirm("Hapus item?");
    if (confirm) {
      deleteItem(id)
        .then((res) => {
          toast.success("Item berhasil di hapus");
          refetch();
        })
        .catch((err) => {
          toast.error(err);
        });
    }
  };

  useEffect(() => {
    console.log(itemsData);
  }, [itemsData]);

  const columns = [
    {
      accessorKey: "itemCode",
      header: "KODE ITEM",
      cell: (info: any) => <p className="text-center text-sm">{info.getValue()}</p>,
    },
    {
      accessorKey: "itemName",
      header: "NAMA ITEM",
      cell: (info: any) => <p className="text-center text-sm">{info.getValue()}</p>,
    },
    {
      accessorKey: "currentStock",
      header: "SISA STOCK",
      cell: (info: any) => <p className="text-center text-sm">{info.getValue()}</p>,
    },
    {
      accessorKey: "wacc",
      header: "HARGA",
      cell: (info: any) => (
        <p className="text-center text-sm">{currencyFormat(info.getValue())}</p>
      ),
    },
    {
      accessorKey: "id",
      header: "AKSI",
      cell: (info: any) => (
        <div className="flex justify-center gap-2 p-2">
          <Link href={`/item-stock/edit/${info.getValue()}`}>
            <FaEdit color="orange" size={17} />
          </Link>
          <HiTrash
            color="red"
            size={17}
            className="cursor-pointer"
            onClick={() => handleDeleteItem(info.getValue())}
          />
        </div>
      ),
    },
  ];

  const handleFilter = () => {
    refetch();
  };

  return (
    <div className="p-3">
      <h1 className="text-[#367a9e] font-semibold text-2xl uppercase tracking-wide">
        Stock Item
      </h1>

      {/* Filter Form */}
      <div className="bg-[#DFF6E0] text-[#1A7E5B] text-sm mt-5 w-[70%] p-4 mx-auto border-2 border-[#9CE899]">
        <form className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex justify-between items-center">
              <label htmlFor="item-code">Kode Item:</label>
              <input
                type="text"
                name="item-code"
                id="item-code"
                className="bg-white text-gray-400 px-2 py-1"
                onChange={(e) => setItemCode(e.target.value)}
              />
            </div>
            <div className="flex justify-between items-center">
              <label htmlFor="category">Kategori Barang:</label>
              <select
                name="category"
                id="category"
                className="bg-white px-2 py-1"
                onChange={(e) => setItemCategoryId(e.target.value)}
              >
                <option value="">All</option>
                <option value="1">Obat</option>
                <option value="2">Alat Kesehatan</option>
              </select>
            </div>
            <div className="flex justify-between items-center">
              <label htmlFor="item-name">Nama Item:</label>
              <input
                type="text"
                name="item-name"
                id="item-name"
                className="bg-white text-gray-400 px-2 py-1"
                onChange={(e) => setItemName(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              className="px-4 py-2 text-sm bg-[#1A7E5B] text-white"
              onClick={handleFilter}
            >
              Search
            </button>
            {/* <button type="button" className="px-4 py-2 text-sm bg-[#1A7E5B] text-white">
              X L S
            </button> */}
          </div>
        </form>
      </div>

      {/* Add item button */}
      <div className="mt-4 flex flex-row-reverse px-4">
        <Link href="/item-stock/add" className="bg-[#1A7E5B] text-white px-4 py-2">
          + Tambah item
        </Link>
      </div>

      {/* Table */}
      {itemsData && (
        <>
          {itemsData?.data?.length > 0 ? (
            <Table data={itemsData.data} columns={columns} />
          ) : (
            <div className="text-center text-[#1A7E5B] mt-20">
              Data item tidak ditemukan
            </div>
          )}
        </>
      )}
    </div>
  );
}
