"use client";
import { useState } from "react";
import sarasehatLogo from "../../../public/images/logo/sarasehat-logo.png";
import { GrTransaction } from "react-icons/gr";
import { TbReportAnalytics } from "react-icons/tb";
import Image from "next/image";
import Link from "next/link";

type SideBarProps = {
  children: React.ReactNode;
};

export default function SideBar({ children }: SideBarProps) {
  return (
    <div className="flex flex-row">
      <div className="w-full max-w-[18rem]">
        <aside className="sidebar h-full sidebar-fixed-left justify-start bg-[#0bb29d]">
          {/* Header Title */}
          <Link href="/">
            <section className="sidebar-title items-center p-4 bg-white rounded-xl w-[80%] mx-auto mt-4">
              <Image src={sarasehatLogo} alt="logo" />
            </section>
          </Link>

          {/* Content */}
          <section className="sidebar-content h-full overflow-y-auto">
            <nav className="menu rounded-md">
              <section className="menu-section px-4">
                <span className="menu-title text-white text-lg tracking-wide font-bold">
                  DASHBOARD
                </span>
                <ul className="menu-items">
                  <li>
                    <input type="checkbox" id="menu-1" className="menu-toggle" />
                    <label
                      className="menu-item justify-between hover:bg-[#367a9e] text-white"
                      htmlFor="menu-1"
                    >
                      <div className="flex gap-2">
                        <GrTransaction size={25} />
                        <span>Transaction</span>
                      </div>

                      <span className="menu-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </label>

                    <div className="menu-item-collapse">
                      <div className="min-h-0">
                        <Link
                          href="/resep-pasien"
                          className="menu-item ml-6 hover:bg-[#367a9e] text-white"
                        >
                          Resep Pasien
                        </Link>
                        <Link
                          href="/retur-resep"
                          className="menu-item ml-6 hover:bg-[#367a9e] text-white"
                        >
                          Retur Resep
                        </Link>
                        <Link
                          href="/list-resep-pasien"
                          className="menu-item ml-6 hover:bg-[#367a9e] text-white"
                        >
                          List Resep Pasien
                        </Link>
                        <Link
                          href="/outstanding-resep"
                          className="menu-item ml-6 hover:bg-[#367a9e] text-white"
                        >
                          Outstanding Daily Resep
                        </Link>
                        <Link
                          href="/purchase-request"
                          className="menu-item ml-6 hover:bg-[#367a9e] text-white"
                        >
                          Purchase Request
                        </Link>
                      </div>
                    </div>
                  </li>
                  <li>
                    <input type="checkbox" id="menu-2" className="menu-toggle" />
                    <label
                      className="menu-item justify-between hover:bg-[#367a9e] text-white"
                      htmlFor="menu-2"
                    >
                      <div className="flex gap-2">
                        <TbReportAnalytics size={25} />
                        <span>Report</span>
                      </div>

                      <span className="menu-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </label>

                    <div className="menu-item-collapse">
                      <div className="min-h-0">
                        <Link
                          href="/item-stock"
                          className="menu-item ml-6 hover:bg-[#367a9e] text-white"
                        >
                          Item Stock
                        </Link>
                        <Link
                          href="stock-detail"
                          className="menu-item ml-6 hover:bg-[#367a9e] text-white"
                        >
                          Info Stock Detail
                        </Link>
                        <Link
                          href="kartu-stock"
                          className="menu-item ml-6 hover:bg-[#367a9e] text-white"
                        >
                          Kartu Stock
                        </Link>
                        <Link
                          href="expired-date"
                          className="menu-item ml-6 hover:bg-[#367a9e] text-white"
                        >
                          Info Expire Obat
                        </Link>
                        <Link
                          href="harga-obat"
                          className="menu-item ml-6 hover:bg-[#367a9e] text-white"
                        >
                          Info Harga Obat
                        </Link>
                      </div>
                    </div>
                  </li>
                </ul>
              </section>
            </nav>
          </section>

          {/* Footer */}
          <section className="sidebar-footer justify-end pt-2 bg-[#0bb29d]">
            <div className="bg-white h-[2px]" />
            <div className="dropdown z-50 flex h-fit w-full cursor-pointer hover:bg-[#367a9e]">
              <label
                className="whites mx-2 flex h-fit w-full cursor-pointer p-0 hover:bg-[#367a9e]"
                tabIndex={0}
              >
                <div className="flex flex-row gap-4 p-4">
                  <div className="flex flex-col text-white">
                    <span>Apt. Sri Lusye Dewi Tipayanti</span>
                    <span className="text-xs font-normal text-white">Owner</span>
                  </div>
                </div>
              </label>
              <div className="dropdown-menu dropdown-menu-right-top ml-2 bg-gray-300">
                <div className="dropdown-item text-sm text-black hover:bg-gray-300 hover:text-white">
                  Logout
                </div>
              </div>
            </div>
          </section>
        </aside>
      </div>
      <div className="p-4 w-[75%] mx-auto">{children}</div>
    </div>
  );
}
