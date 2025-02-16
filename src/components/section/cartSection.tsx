import { currencyFormat } from "@/helper/helper";
import Table from "../table/table";
import { FaEdit } from "react-icons/fa";
import { HiTrash } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { createTransaction, deleteCart, updateCartQty } from "@/services/transactions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

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
  const [paymentId, setPaymentId] = useState<string>("1");
  const { push } = useRouter();

  const cartsRow = cartData?.data?.map((data: any) => ({
    itemCode: data?.item?.itemCode,
    itemName: data?.item?.itemName,
    qty: data?.qty,
    totalPrice: data?.item?.wacc * data?.qty,
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

  const onCreateTransaction = async () => {
    const cartIds = cartData?.data?.map((data: any) => data?.id);

    const payloadBody = {
      paymentTypeId: Number(paymentId),
      statusId: 3,
      cartIds,
    };

    await createTransaction(payloadBody)
      .then((res) => {
        toast.success("Transaksi berhasil!");
        push("/transaction/list");
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return (
    <div className="mt-10">
      <h1 className="text-[#367a9e] font-semibold text-2xl uppercase tracking-wide">
        Daftar Keranjang
      </h1>

      <Table columns={cartColumns} data={cartsRow} />

      <div className="w-full bg-[#0bb29d] hover:bg-[#367a9e] text-white mt-5 flex justify-center">
        <label
          className="py-2 text-center flex-1 cursor-pointer font-bold"
          htmlFor="modal-confirm"
        >
          Proses transaksi
        </label>
        <input className="modal-state" id="modal-confirm" type="checkbox" />
        <div className="modal">
          <label className="modal-overlay" htmlFor="modal-confirm"></label>
          <div className="modal-content flex flex-col gap-5">
            <label
              htmlFor="modal-confirm"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </label>
            {/* Modal Body */}
            <div className="text-black w-[400px] mx-5 border">
              <div className="flex flex-col gap-2">
                <h2 className="text-xl uppercase font-bold text-[#1A7E5B]">
                  konfirmasi transaksi
                </h2>
                {/* Cart list */}
                {cartsRow?.map((data: any, index: number) => (
                  <div
                    className="bg-[#D3EED1] p-3 flex flex-col gap-1 text-sm"
                    key={`cart${index}`}
                  >
                    <h1 className="uppercase text-lg font-bold text-[#1A7E5B]">
                      {data?.itemName}
                    </h1>
                    <div className="flex justify-between">
                      <p>Qty</p>
                      <p className="font-bold text-[#1A7E5B]">{data?.qty} item</p>
                    </div>
                    <div className="flex justify-between">
                      <p>Harga</p>
                      <p className="font-bold text-[#1A7E5B]">
                        {currencyFormat(data?.totalPrice)}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Payment section */}
                <div className="flex flex-col gap-1">
                  <h1 className="text-[#1A7E5B] font-bold">Metode Pembayaran</h1>
                  <select
                    onChange={(e) => setPaymentId(e.target.value)}
                    className="border border-[#1A7E5B] py-1"
                    name="payment"
                    id="payment"
                  >
                    <option value="1">Cash</option>
                    <option value="2">QRIS</option>
                  </select>
                </div>

                {/* Total price section */}
                <div className="flex justify-between mt-5">
                  <h1 className="uppercase text-[#1A7E5B] font-bold">total harga</h1>
                  <p className="text-[#1A7E5B] font-bold">
                    {currencyFormat(
                      cartsRow?.reduce((acc: any, item: any) => acc + item.totalPrice, 0)
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 justify-center">
              <button onClick={onCreateTransaction} className="bg-[#1A7E5B] px-5 py-2">
                Konfirmasi
              </button>
              <div className="bg-red-500 flex justify-center items-center">
                <label
                  htmlFor="modal-confirm"
                  className="flex-1 px-5 py-2 cursor-pointer"
                >
                  Batal
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
