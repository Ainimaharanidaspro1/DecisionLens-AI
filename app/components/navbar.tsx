"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";


export default function Navbar(){

  const pathname = usePathname();


  return (

    <nav className="bg-white border-b px-8 py-5 flex justify-between items-center">

      <Link
        href="/"
        className="text-2xl font-bold text-blue-700"
      >
        💰 DecisionLens AI
      </Link>


      <div className="flex gap-8 text-gray-600 font-medium">


        <Link
          href="/"
          className={pathname === "/" ? "text-blue-600" : ""}
        >
          Beranda
        </Link>


        <Link
          href="/analyze"
          className={pathname === "/analyze" ? "text-blue-600" : ""}
        >
          Analisis
        </Link>


        <Link
          href="/history"
          className={pathname === "/history" ? "text-blue-600" : ""}
        >
          Riwayat
        </Link>


      </div>


    </nav>

  );

}