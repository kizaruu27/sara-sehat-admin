"use client";

import { addNewItem } from "@/services/items";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface IFormInput {
  itemName: string;
  minStock: number;
  maxStock: number;
  stockIn: number;
  wacc: number;
  itemCategoryId: number;
  itemTypeId: number;
  supplierId: number;
  supplierName: string;
}

export default function AddItemPage() {
  const [hasMounted, setHasMounted] = useState<Boolean>(false);
  const [categoryId, setCategoryId] = useState<string>("default");
  const [itemTypeId, setItemTypeId] = useState<string>("default");
  const [supplierId, setSupplierId] = useState<string>("default");
  const [useExistingSupplier, setUseExistingSupplier] = useState<boolean>(false);

  const { push } = useRouter();

  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    if (categoryId === "default") {
      return toast.error("Category tidak boleh kosong");
    }
    if (categoryId === "1") {
      if (itemTypeId === "default") return toast.error("Tipe obat tidak boleh kosong");
    }

    let payloadBody = {
      itemName: data.itemName,
      minStock: Number(data.minStock),
      maxStock: Number(data.maxStock),
      stockIn: Number(data.stockIn),
      wacc: Number(data.wacc),
      itemCategoryId: Number(data.itemCategoryId),
      itemTypeId: Number(data.itemTypeId),
      supplierName: data.supplierName,
      // supplierId: Number(data.supplierId),
    };

    addNewItem(payloadBody)
      .then((res) => {
        toast.success(res.messege);
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
                    <option value="1">PT Kimia Farma</option>
                    <option value="2">PT Ngawi Barat</option>
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
                  Stock Masuk
                </label>
                <input
                  placeholder="Masukkan jumlah stock masuk"
                  type="number"
                  id="stockIn"
                  className="bg-white text-gray-500 px-2 py-1 border border-[#367a9e]"
                  {...register("stockIn")}
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
    </div>
  );
}
