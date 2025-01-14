import Image from "next/image";
import logo from "./../../../public/images/logo/sarasehat-logo.png";

export default function Home() {
  return (
    <div>
      <Image src={logo} alt="logo" className="my-5" />
      <h1 className="text-gray-400 text-sm tracking-wider mb-2">
        JI. Moh. Kahfi II No 69, RT06 RW05 Kel. Srengseng Sawah, Kec. Jagakarsa
        <br />
        Kota Jakarta Selatan 12640
      </h1>
      <h1 className="text-gray-400 text-sm tracking-wider">No telp: 0812 95312113</h1>
    </div>
  );
}
