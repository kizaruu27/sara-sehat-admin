import Link from "next/link";
import { TbError404 } from "react-icons/tb";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <TbError404 size={200} color="#0bb29d" />
      <h2 className="text-2xl tracking-wide font-semibold text-[#367a9e]">
        Halaman tidak ditemukan!
      </h2>
      <Link
        href="/"
        className="py-2 px-3 mt-2 bg-[#367a9e] text-white hover:bg-[#0bb29d]"
      >
        Back to home
      </Link>
    </div>
  );
}
