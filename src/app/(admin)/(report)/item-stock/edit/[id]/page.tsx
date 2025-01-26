"use client";

import { addNewItem, getItemById, updateItemData } from "@/services/items";
import { getAllSuppliers } from "@/services/supplier";
import { useQuery } from "@tanstack/react-query";
import { notFound, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface IFormInput {
  itemName: string;
  minStock: string | number;
  maxStock: string | number;
  currentStock: string | number;
  wacc: string | number;
  itemCategoryId: string | number;
  itemTypeId: string | number;
  supplierId: string | number;
  supplierName: string;
}

type EditItemProps = {
  params: Promise<{ id: string }>;
};

export default function EditItemPage({ params }: EditItemProps) {
  const [hasMounted, setHasMounted] = useState<Boolean>(false);
  const [categoryId, setCategoryId] = useState<any>("default");
  const [itemTypeId, setItemTypeId] = useState<string>("default");
  const [supplierId, setSupplierId] = useState<string>("default");
  const [useExistingSupplier, setUseExistingSupplier] = useState<boolean>(true);
  const { register, handleSubmit, setValue } = useForm<IFormInput>();
  const { push } = useRouter();
  const { id } = React.use(params);

  const {
    data: itemData,
    isLoading: isLoadingItemData,
    error: errorItemdata,
    refetch: refetchItemData,
  } = useQuery({
    queryKey: ["getSpesificData"],
    queryFn: () => getItemById(id),
    enabled: false,
  });

  const {
    data: supplierData,
    isLoading: isLoadingSupplierData,
    isError: isErrorSupplierData,
    refetch: refetchSupplierData,
  } = useQuery({
    queryKey: ["getAllItems"],
    queryFn: getAllSuppliers,
    enabled: false,
  });

  useEffect(() => {
    setHasMounted(true);
  }, [hasMounted]);

  useEffect(() => {
    if (hasMounted) {
      refetchSupplierData();
      refetchItemData();
      if (itemData?.data) {
        getInformationItemData(itemData);
      }
    }
  }, [
    hasMounted,
    supplierData,
    refetchSupplierData,
    isErrorSupplierData,
    itemData,
    refetchItemData,
  ]);

  const getInformationItemData = (itemData: any) => {
    if (itemData?.data) {
      setValue("itemName", itemData?.data?.itemName);
      setValue("itemCategoryId", itemData?.data?.itemCategoryId);
      setCategoryId(itemData?.data?.itemCategoryId.toString());
      setSupplierId(itemData?.data?.supplierId);
      setValue(
        "itemTypeId",
        itemData?.data?.itemTypeId ? itemData?.data?.itemTypeId : "default"
      );
      setValue("maxStock", itemData?.data?.maxStock);
      setValue("minStock", itemData?.data?.minStock);
      setValue("currentStock", itemData?.data?.currentStock);
      setValue("supplierId", itemData?.data?.supplierId);
      setValue("supplierName", itemData?.data?.supplier?.supplierName);
      setValue("wacc", itemData?.data?.wacc);
    }
  };

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    if (categoryId === "default") {
      return toast.error("Category tidak boleh kosong");
    }
    if (categoryId === "1") {
      if (itemTypeId === "default") return toast.error("Tipe obat tidak boleh kosong");
    }

    if (Number(data.maxStock) < Number(data.minStock))
      return toast.error("Minimum stock dan maximum stock tidak sesuai!");

    if (Number(data.currentStock) < Number(data.minStock))
      return toast.error("Stock masuk tidak bisa kurang dari minimum stock");
    if (Number(data.currentStock) > Number(data.maxStock))
      return toast.error("Stock masuk tidak bisa lebih besar dari maximum stock");

    const payloadBody = new FormData();
    payloadBody.append("itemName", data.itemName);
    payloadBody.append("minStock", data.minStock.toString());
    payloadBody.append("maxStock", data.maxStock.toString());
    payloadBody.append("currentStock", data.currentStock.toString());
    payloadBody.append("wacc", data.wacc.toString());
    payloadBody.append("itemCategoryId", data.itemCategoryId.toString());

    if (data.itemTypeId) payloadBody.append("itemTypeId", data.itemTypeId.toString());

    if (useExistingSupplier) {
      payloadBody.append("supplierId", data.supplierId.toString());
    } else {
      payloadBody.append("supplierName", data.supplierName);
    }

    updateItemData(id, payloadBody)
      .then((res) => {
        toast.success("Berhasil mengubah data item");
        push("/item-stock");
      })
      .catch((err) => {
        console.error(err);
        toast.error(err);
      });
  };

  return (
    <div className="p-3">
      <h1 className="text-[#367a9e] font-semibold text-2xl uppercase tracking-wide">
        tambah item
      </h1>
      {itemData?.data ? (
        <section className="bg-gray-2 rounded-xl mt-5">
          <div className="p-8 shadow-lg">
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="itemName" className="text-[#0bb29d] font-bold">
                    Nama item
                  </label>
                  <input
                    placeholder="Masukkan nama item"
                    type="itemName"
                    id="itemName"
                    className="bg-white text-gray-500 px-2 py-1 border border-[#367a9e]"
                    {...register("itemName")}
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="category" className="text-[#0bb29d] font-bold">
                    Kategori Barang
                  </label>
                  <select
                    id="itemCategoryId"
                    className="bg-white px-2 py-1 border border-[#367a9e]"
                    value={categoryId}
                    {...register("itemCategoryId", {
                      onChange(e) {
                        setCategoryId(e.target.value);
                      },
                    })}
                  >
                    <option value="default" disabled>
                      Pilih kategori
                    </option>
                    <option value={1}>Obat</option>
                    <option value={2}>Alat Kesehatan</option>
                  </select>
                </div>
                {categoryId === "1" && (
                  <div className="flex flex-col gap-2 col-span-2">
                    <label htmlFor="itemType" className="text-[#0bb29d] font-bold">
                      Tipe Obat
                    </label>
                    <select
                      id="itemType"
                      className="bg-white px-2 py-1 border border-[#367a9e]"
                      value={itemTypeId}
                      {...register("itemTypeId", {
                        onChange(e) {
                          setItemTypeId(e.target.value);
                        },
                      })}
                    >
                      <option value="default" disabled>
                        Pilih tipe
                      </option>
                      <option value={1}>Tablet</option>
                      <option value={2}>Sirup</option>
                    </select>
                  </div>
                )}

                {useExistingSupplier ? (
                  <div className="flex flex-col gap-2 col-span-2">
                    <label htmlFor="supplierList" className="text-[#0bb29d] font-bold">
                      Supplier
                    </label>
                    <select
                      id="supplierList"
                      className="bg-white px-2 py-1 border border-[#367a9e]"
                      value={supplierId}
                      {...register("supplierId", {
                        onChange(e) {
                          setSupplierId(e.target.value);
                        },
                      })}
                    >
                      <option value="default" disabled>
                        Pilih supplier
                      </option>
                      {supplierData && (
                        <>
                          {supplierData?.data?.length > 0 ? (
                            <>
                              {supplierData?.data?.map((supplier: any, index: number) => (
                                <option key={index} value={supplier.id}>
                                  {supplier.supplierName}
                                </option>
                              ))}
                            </>
                          ) : (
                            <option value="" disabled>
                              Data tidak ditemukan
                            </option>
                          )}
                        </>
                      )}
                    </select>
                    <p className="text-[#0bb29d] font-semibold text-sm">
                      Ingin menambah supplier? klik{" "}
                      <span
                        className="text-[#367a9e] cursor-pointer font-bold"
                        onClick={() => setUseExistingSupplier(false)}
                      >
                        di sini
                      </span>
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 col-span-2">
                    <label htmlFor="supplier" className="text-[#0bb29d] font-bold">
                      Supplier
                    </label>
                    <input
                      placeholder="Masukkan nama supplier"
                      type="text"
                      id="supplier"
                      className="bg-white text-gray-500 px-2 py-1 border border-[#367a9e]"
                      {...register("supplierName")}
                      required
                    />
                    <p className="text-[#0bb29d] font-semibold text-sm">
                      Supplier sudah terdaftar? klik{" "}
                      <span
                        className="text-[#367a9e] cursor-pointer font-bold"
                        onClick={() => setUseExistingSupplier(true)}
                      >
                        di sini
                      </span>
                    </p>
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <label htmlFor="minStock" className="text-[#0bb29d] font-bold">
                    Stock Minimum
                  </label>
                  <input
                    placeholder="Masukkan stock minimum"
                    type="number"
                    id="minStock"
                    className="bg-white text-gray-500 px-2 py-1 border border-[#367a9e]"
                    {...register("minStock")}
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="maxStock" className="text-[#0bb29d] font-bold">
                    Stock Maximum
                  </label>
                  <input
                    placeholder="Masukkan stock maximum"
                    type="number"
                    id="maxStock"
                    className="bg-white text-gray-500 px-2 py-1 border border-[#367a9e]"
                    {...register("maxStock")}
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="stockIn" className="text-[#0bb29d] font-bold">
                    Stock Sekarang
                  </label>
                  <input
                    placeholder="Masukkan jumlah stock masuk"
                    type="number"
                    id="stockIn"
                    className="bg-white text-gray-500 px-2 py-1 border border-[#367a9e]"
                    {...register("currentStock")}
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="wacc" className="text-[#0bb29d] font-bold">
                    Harga
                  </label>
                  <div className="flex gap-2 items-center">
                    <p>Rp.</p>
                    <input
                      placeholder="Masukkan harga item"
                      type="number"
                      id="wacc"
                      className="bg-white text-gray-500 px-2 py-1 border border-[#367a9e] flex-1"
                      {...register("wacc")}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <button
                  type="submit"
                  className="rounded-lg btn btn-primary btn-block bg-[#0bb29d] hover:bg-[#367a9e] mt-5"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </section>
      ) : (
        <div className="h-screen flex justify-center items-center text-xl text-[#367a9e] font-bold">
          Data Tidak ditemukan
        </div>
      )}
    </div>
  );
}
