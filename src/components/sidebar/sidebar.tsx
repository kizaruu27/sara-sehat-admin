"use client";

import Image from "next/image";
import sarasehatLogo from "../../../public/images/logo/sarasehat-logo.png";
import { MdKeyboardArrowRight } from "react-icons/md";
import { TbTransactionDollar } from "react-icons/tb";
import { HiDocumentReport } from "react-icons/hi";
import { useState } from "react";

export default function SideBar() {
  const [indexTab, setIndexTab] = useState(0);

  const handleClick = (index: number) => {
    setIndexTab(index);
  };

  return (
    <nav className="bg-[#0bb29d] fixed text-white w-[250px] h-screen overflow-y-auto">
      <div className="bg-white p-3 rounded-xl mx-auto w-[90%] mt-5">
        <Image src={sarasehatLogo} alt="logo" />
      </div>
      <div className="mt-5 py-3">
        <h2 className="text-center w-full font-bold text-lg">John Doe</h2>
      </div>
      <div className="mt-5">
        <ul className="flex flex-col text-md cursor-pointer">
          <li onClick={() => handleClick(1)}>
            {/* Main Menu */}
            <div className="flex items-center gap-2 p-3 hover:bg-[#275c7f]">
              <TbTransactionDollar size={28} />
              <div className="flex items-center justify-between flex-1">
                <h2>Transaction</h2>
                <MdKeyboardArrowRight size={30} />
              </div>
            </div>
            {/* Sub menu */}
            {indexTab === 1 && (
              <div>
                <div className="p-3 hover:bg-[#275c7f]">
                  <p className="ml-12">Menu 1</p>
                </div>
                <div className="p-3 hover:bg-[#275c7f]">
                  <p className="ml-12">Menu 2</p>
                </div>
                <div className="p-3 hover:bg-[#275c7f]">
                  <p className="ml-12">Menu 3</p>
                </div>
              </div>
            )}
          </li>
          <li className="flex items-center gap-2 cursor-pointer p-3 hover:bg-[#275c7f]">
            <HiDocumentReport size={28} />
            <div className="flex items-center justify-between flex-1">
              <h2>Report</h2>
              <MdKeyboardArrowRight size={30} />
            </div>
          </li>
        </ul>
      </div>
      <div className="flex items-center justify-between cursor-pointer p-3 hover:bg-[#275c7f] absolute w-full bottom-0">
        <h2 className="w-full text-center">Logout</h2>
      </div>
    </nav>
  );
}
