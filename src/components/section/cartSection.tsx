import { currencyFormat } from "@/helper/helper";
import Table from "../table/table";

type cartListProps = {
  cartData: any;
};

export default function CartListSection({ cartData }: cartListProps) {
  const cartsRow = cartData?.data
    ?.filter((data: any) => data?.status?.status === "Pending")
    .map((data: any) => ({
      itemCode: data?.item?.itemCode,
      itemName: data?.item?.itemName,
      qty: data?.qty,
      totalPrice: data?.qty * data?.item?.wacc,
    }));

  console.log(cartsRow);

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
  ];

  return (
    <div className="mt-10">
      <h1 className="text-[#367a9e] font-semibold text-2xl uppercase tracking-wide">
        Daftar Keranjang
      </h1>

      <Table columns={cartColumns} data={cartsRow} />
    </div>
  );
}
