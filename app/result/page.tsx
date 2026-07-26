"use client";

import Link from "next/link";
import { useEffect, useState } from "react";


export default function ResultPage(){

  const [result,setResult] = useState("");

  useEffect(()=>{

    const savedResult = localStorage.getItem("ai_result");

    if(savedResult){
      setResult(savedResult);
    }

  },[]);



  return(

    <main className="min-h-screen bg-slate-100 py-10 px-5">


      <div className="max-w-4xl mx-auto">


        <div className="bg-white rounded-3xl shadow-xl p-8">


          <h1 className="text-3xl font-bold text-blue-700">
            📊 Hasil Analisis Finansial
          </h1>


          <p className="text-gray-500 mt-2">
            Berikut adalah rekomendasi yang diberikan oleh DecisionLens AI.
          </p>



          <div className="mt-8 bg-blue-50 rounded-2xl p-6">


            {
              result
              ?
              <p className="whitespace-pre-wrap leading-8 text-gray-700">
                {result}
              </p>

              :

              <p className="text-gray-500">
                Belum ada hasil analisis.
              </p>
            }


          </div>



          <div className="flex gap-4 mt-8">


            <Link
            href="/analyze"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl"
            >
              🔄 Analisis Lagi
            </Link>



            <Link
            href="/history"
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-xl"
            >
              📁 Lihat Riwayat
            </Link>


          </div>


        </div>


      </div>


    </main>

  )

}