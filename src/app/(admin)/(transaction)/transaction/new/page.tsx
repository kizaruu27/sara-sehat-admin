"use client";

import CartListSection from "@/components/section/cartSection";
import Table from "@/components/table/table";
import { currencyFormat } from "@/helper/helper";
import { getAllItem } from "@/services/items";
import { addToCart, getAllCarts } from "@/services/transactions";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function NewTransactionPage() {
  const [hasMounted, setHasMounted] = useState<boolean>(false);

  const [itemCode, setItemCode] = useState<string>("");
  const [itemCategoryId, setItemCategoryId] = useState<string>("");
  const [itemName, setItemName] = useState<string>("");

  const payload = {
    itemCode,
    itemCategoryId,
    itemName,
  };

  const {
    data: itemsData,
    isError: itemsDataError,
    refetch: refetchItemsData,
  } = useQuery({
    queryKey: ["getAllItemsForTransaction"],
    queryFn: () => getAllItem(payload),
    enabled: false,
  });

  const {
    data: cartsData,
    isError: isErrorCarts,
    refetch: refetchCartsData,
  } = useQuery({
    queryKey: ["getAllCartsData"],
    queryFn: () => getAllCarts(),
    enabled: false,
  });

  useEffect(() => {
    setHasMounted(true);
  }, [hasMounted]);

  useEffect(() => {
    if (hasMounted) {
      refetchItemsData();
      refetchCartsData();
    }
  }, [
    hasMounted,
    itemsData,
    cartsData,
    refetchCartsData,
    refetchItemsData,
    isErrorCarts,
    itemsDataError,
  ]);

  const itemsRow = itemsData?.data?.map((data: any) => ({
    ...data,
    cartData: {
      id: data?.id,
      currentStock: data?.currentStock,
    },
  }));

  const itemColumns = [
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
      accessorKey: "cartData",
      header: "AKSI",
      cell: (info: any) => {
        "use client";
        const [qty, setQty] = useState<any>(0);
        const [showInputCounter, setShowInputCounter] = useState(false);

        const currentStock = info.getValue().currentStock;

        const decreaseQty = () => {
          setQty((prevQty: any) => (prevQty <= 0 ? 0 : prevQty - 1));
        };

        const increaseQty = () => {
          setQty((prevQty: any) => (prevQty >= currentStock ? prevQty : prevQty + 1));
        };

        const handleSubmitCart = async () => {
          if (Number(qty) > currentStock) {
            return toast.error("Qty tidak boleh melebihi stock");
          }

          if (Number(qty) <= 0) {
            return toast.error("Qty tidak boleh kurang dari 0");
          }

          const dataBody = {
            qty: Number(qty),
            itemId: info.getValue().id,
          };

          await addToCart(dataBody)
            .then((res) => {
              toast.success("Berhasil menambah item ke keranjang");
              refetchCartsData();
              setShowInputCounter(false);
            })
            .catch((err) => {
              console.log(err);
            });
        };

        return (
          <div className="flex justify-center gap-2 p-2">
            {showInputCounter ? (
              <>
                <div className="flex justify-center gap-2">
                  <button
                    className="text-lg bg-slate-100 px-3 border border-[#9CE899]"
                    onClick={decreaseQty}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="w-10 text-center appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                  />

                  <button
                    className="text-lg bg-slate-100 px-3 border border-[#9CE899]"
                    onClick={increaseQty}
                  >
                    +
                  </button>
                </div>
                <button
                  className="bg-[#1A7E5B] text-white px-3 py-2"
                  onClick={handleSubmitCart}
                >
                  + Keranjang
                </button>
              </>
            ) : (
              <button
                className="bg-[#1A7E5B] text-white px-3 py-2"
                onClick={() => setShowInputCounter(true)}
              >
                Tambah
              </button>
            )}
          </div>
        );
      },
    },
  ];

  const handleFilter = () => {
    refetchItemsData();
  };

  return (
    <div className="p-3">
      {/* Title Header */}
      <h1 className="text-[#367a9e] font-semibold text-2xl uppercase tracking-wide">
        transaksi baru
      </h1>

      {/* Form search */}
      <div className="bg-[#DFF6E0] text-[#1A7E5B] text-sm mt-5 w-[70%] p-4 mx-auto border-2 border-[#9CE899]">
        <form className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-4">
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
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              className="px-4 py-2 text-sm bg-[#1A7E5B] text-white"
              onClick={handleFilter}
            >
              Cari
            </button>
            {/* <button type="button" className="px-4 py-2 text-sm bg-[#1A7E5B] text-white">
							X L S
						</button> */}
          </div>
        </form>
      </div>

      {/* Table data */}
      {itemsData && (
        <>
          {itemsData?.data?.length > 0 ? (
            <Table data={itemsRow} columns={itemColumns} />
          ) : (
            <div className="text-center text-[#1A7E5B] mt-20">
              Data item tidak ditemukan
            </div>
          )}
        </>
      )}

      {/* Cart list table */}
      {cartsData?.data?.length > 0 ? (
        <CartListSection cartData={cartsData} />
      ) : (
        <div className="text-center text-[#1A7E5B] mt-20">
          Data keranjang tidak ditemukan
        </div>
      )}
    </div>
  );
}
