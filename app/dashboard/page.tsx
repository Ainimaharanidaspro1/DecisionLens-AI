"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";


export default function Dashboard(){

  const [data,setData] = useState<any>(null);


  useEffect(()=>{

    async function getData(){

      const {data,error}= await supabase
      .from("financial_analysis")
      .select("*")
      .order("created_at",{ascending:false})
      .limit(1)
      .single();


      if(error){
        console.log(error);
        return;
      }


      setData(data);

    }


    getData();

  },[]);



  const balance =
  data
  ?
  Number(data.income)-Number(data.expense)
  :
  0;



  return(

    <main className="min-h-screen bg-slate-100 p-8">


      <div className="max-w-6xl mx-auto">


        <h1 className="text-4xl font-bold text-blue-700">
          📊 Dashboard DecisionLens AI
        </h1>


        <p className="text-gray-500 mt-2">
          Pantau kondisi finansial berdasarkan analisis AI terakhir.
        </p>



        {/* CARD SUMMARY */}

        <div className="grid md:grid-cols-3 gap-6 mt-10">


          <div className="bg-white rounded-2xl shadow p-6">

            <p className="text-gray-500">
              💰 Pendapatan
            </p>

            <h2 className="text-3xl font-bold mt-3">

              Rp {
                data
                ?
                Number(data.income)
                .toLocaleString("id-ID")
                :
                "0"
              }

            </h2>

          </div>




          <div className="bg-white rounded-2xl shadow p-6">

            <p className="text-gray-500">
              💸 Pengeluaran
            </p>

            <h2 className="text-3xl font-bold mt-3">

              Rp {
                data
                ?
                Number(data.expense)
                .toLocaleString("id-ID")
                :
                "0"
              }

            </h2>

          </div>





          <div className="bg-white rounded-2xl shadow p-6">

            <p className="text-gray-500">
              💎 Sisa Dana
            </p>

            <h2 className="text-3xl font-bold mt-3">

              Rp {
                balance
                .toLocaleString("id-ID")
              }

            </h2>

          </div>


        </div>




        {/* TARGET */}

        <div className="bg-white rounded-3xl shadow p-8 mt-8">

          <h2 className="text-2xl font-bold">
            🎯 Target Finansial
          </h2>


          <p className="mt-3 text-gray-600">

            {
              data
              ?
              data.saving_goal
              :
              "Belum ada analisis"
            }

          </p>


        </div>





        {/* AI RESULT */}

        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-3xl shadow p-8 mt-8">


          <h2 className="text-2xl font-bold">
            🤖 Insight AI
          </h2>


          <p className="mt-4 whitespace-pre-wrap leading-7">

            {
              data
              ?
              data.ai_result
              :
              "Lakukan analisis terlebih dahulu untuk mendapatkan insight."
            }

          </p>


        </div>




        <Link
        href="/analyze"
        className="inline-block mt-8 bg-blue-600 text-white px-6 py-3 rounded-xl"
        >

          🚀 Analisis Baru

        </Link>



      </div>


    </main>

  )

}