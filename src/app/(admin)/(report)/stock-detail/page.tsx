import Table from "@/components/table/table";

export default function StockDetailPage() {
  return (
    <div className="p-3">
      <h1 className="text-[#367a9e] font-semibold text-2xl uppercase tracking-wide">
        Info Stock Detail
      </h1>

      {/* Form */}
      <div className="bg-[#DFF6E0] text-[#1A7E5B] text-sm mt-5 w-[70%] p-4 mx-auto border-2 border-[#9CE899]">
        <form className="flex flex-col gap-6">
          <div className="flex justify-between">
            <div className="flex flex-col gap-4 w-[40%]">
              <div className="flex justify-between items-center">
                <label htmlFor="date">Tanggal:</label>
                <input
                  type="date"
                  defaultValue={new Date().toISOString().split("T")[0]}
                  name="date"
                  id="date"
                  className="bg-white text-black px-2 py-1"
                />
              </div>
              <div className="flex justify-between items-center">
                <label htmlFor="item-code">Kode Item:</label>
                <input
                  type="text"
                  name="item-code"
                  id="item-code"
                  className="bg-white text-gray-400 px-2 py-1"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 w-[40%]">
              <div className="flex justify-between items-center">
                <label htmlFor="category">Kategori Barang:</label>
                <select name="category" id="category" className="bg-white px-2 py-1">
                  <option value="obat">Obat</option>
                  <option value="alkes">Alat Kesehatan</option>
                </select>
              </div>
              <div className="flex justify-between items-center">
                <label htmlFor="item-name">Nama Item:</label>
                <input
                  type="text"
                  name="item-name"
                  id="item-name"
                  className="bg-white text-gray-400 px-2 py-1"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button type="submit" className="px-4 py-2 text-sm bg-[#1A7E5B] text-white">
              Search
            </button>
            <button type="button" className="px-4 py-2 text-sm bg-[#1A7E5B] text-white">
              X L S
            </button>
          </div>
        </form>
      </div>

      <div className="mt-5">{/* <Table /> */}</div>
    </div>
  );
}
