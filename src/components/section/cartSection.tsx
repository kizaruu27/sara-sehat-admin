import { currencyFormat } from "@/helper/helper";
import Table from "../table/table";
import { FaEdit } from "react-icons/fa";
import { HiTrash } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { deleteCart, updateCartQty } from "@/services/transactions";
import { toast } from "react-toastify";
import Modal from "../modal/modal";

type cartListProps = {
  cartData: any;
  refetchCart: any;
  // setShowTransactionModal: any;
};

export default function CartListSection({
  cartData,
  refetchCart,
}: // setShowTransactionModal,
cartListProps) {
  const cartsRow = cartData?.data?.map((data: any) => ({
    itemCode: data?.item?.itemCode,
    itemName: data?.item?.itemName,
    qty: data?.qty,
    totalPrice: data?.item?.wacc,
    cartData: {
      cartId: data?.id,
      qty: data?.qty,
      currentStock: data?.item?.currentStock,
    },
  }));

  const cartColumns = [
    {
      accessorKey: "itemCode",
      header: "KODE ITEM",
      cell: (info: any) => <p className="text-center text-sm p-3">{info.getValue()}</p>,
    },
    {
      accessorKey: "itemName",
      header: "NAMA ITEM",
      cell: (info: any) => <p className="text-center text-sm">{info.getValue()}</p>,
    },
    {
      accessorKey: "qty",
      header: "QTY",
      cell: (info: any) => <p className="text-center text-sm">{info.getValue()}</p>,
    },
    {
      accessorKey: "totalPrice",
      header: "TOTAL HARGA",
      cell: (info: any) => (
        <p className="text-center text-sm">{currencyFormat(info.getValue())}</p>
      ),
    },
    {
      accessorKey: "cartData",
      header: "AKSI",
      cell: (info: any) => {
        const [showUpdateCart, setShowUpdateCart] = useState(false);
        const [qty, setQty] = useState<any>(info.getValue().qty);

        const currentStock = info.getValue().currentStock;

        const decreaseQty = () => {
          setQty((prevQty: any) => (prevQty <= 1 ? 1 : prevQty - 1));
        };

        const increaseQty = () => {
          setQty((prevQty: any) => (prevQty >= currentStock ? prevQty : prevQty + 1));
        };

        const updateQtyBody = {
          qty: Number(qty),
        };

        const onUpdateCartQty = async () => {
          if (qty <= 0) return toast.error("Total item tidak boleh kurang dari 0");
          if (qty > currentStock)
            return toast.error("Total item tidak boleh lebih dari sisa stock");

          await updateCartQty(info.getValue().cartId, updateQtyBody)
            .then((res) => {
              toast.success("Berhasil mengubah data keranjang");
              setShowUpdateCart(false);
              refetchCart();
            })
            .catch((err) => {
              toast.error(err);
            });
        };

        const onDeleteCart = async () => {
          const confirm = window.confirm("Hapus data keranjang?");
          if (confirm) {
            await deleteCart(info.getValue().cartId)
              .then((res) => {
                refetchCart();
                toast.success("Keranjang berhasil dihapus");
              })
              .catch((err) => {
                toast.error(err);
              });
          }
        };

        return (
          <>
            {showUpdateCart ? (
              <div className="flex justify-center gap-2">
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
                  onClick={onUpdateCartQty}
                >
                  Konfirmasi
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-2"
                  onClick={() => setShowUpdateCart(false)}
                >
                  X
                </button>
              </div>
            ) : (
              <div className="flex gap-3 justify-center">
                <FaEdit
                  color="orange"
                  size={18}
                  onClick={() => setShowUpdateCart(true)}
                  className="cursor-pointer"
                />
                <HiTrash
                  color="red"
                  size={18}
                  className="cursor-pointer"
                  onClick={onDeleteCart}
                />
              </div>
            )}
          </>
        );
      },
    },
  ];

  return (
    <div className="mt-10">
      <h1 className="text-[#367a9e] font-semibold text-2xl uppercase tracking-wide">
        Daftar Keranjang
      </h1>

      <Table columns={cartColumns} data={cartsRow} />
      <button
        // onClick={() => setShowTransactionModal(true)}
        className="w-full py-2 bg-[#1A7E5B] hover:bg-[#9CE899] hover:text-[#1A7E5B] text-white mt-5"
      >
        Proses Transaksi
      </button>
    </div>
  );
}
