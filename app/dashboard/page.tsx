"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";


export default function Dashboard() {

  const [analysis, setAnalysis] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    loadDashboard();
  }, []);




  async function loadDashboard() {

    const { data, error } = await supabase
      .from("financial_analysis")
      .select("*")
      .order("id", { ascending: false });



    if (error) {

      console.log("SUPABASE ERROR:", error);
      setLoading(false);
      return;

    }



    if (data && data.length > 0) {

      setAnalysis(data[0]);
      setHistory(data);

    }


    setLoading(false);

  }






  function rupiah(value:any){

    if(!value) return "Rp0";


    return new Intl.NumberFormat(
      "id-ID",
      {
        style:"currency",
        currency:"IDR",
        maximumFractionDigits:0
      }

    ).format(Number(value));

  }






  if(loading){

    return (

      <main className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-[#F8FAFC]
      ">

        <p className="text-slate-500">
          Memuat dashboard...
        </p>

      </main>

    )

  }





  return (

    <main className="
    min-h-screen
    bg-gradient-to-b
    from-white
    via-[#F8FAFC]
    to-[#ECFDF5]
    px-8
    py-12
    ">


      <div className="
      max-w-6xl
      mx-auto
      ">



        <h1 className="
        text-4xl
        font-bold
        ">

          Financial Dashboard

        </h1>


        <p className="
        text-slate-600
        mt-2
        ">

          Kelola dan pantau kondisi finansialmu bersama AI.

        </p>





        {
          analysis ?


          <>

          {/* SUMMARY */}

          <div className="
          grid
          md:grid-cols-3
          gap-6
          mt-10
          ">


            <SummaryCard

              icon="💰"

              title="Pendapatan"

              value={rupiah(analysis.income)}

            />



            <SummaryCard

              icon="🛒"

              title="Pengeluaran"

              value={rupiah(analysis.expense)}

            />



            <SummaryCard

              icon="📈"

              title="Sisa Dana"

              value={rupiah(
                Number(analysis.income) -
                Number(analysis.expense)
              )}

            />


          </div>









          {/* AI RESULT */}

          <div className="
          bg-white
          rounded-3xl
          border
          shadow-sm
          p-8
          mt-8
          ">


            <h2 className="
            text-2xl
            font-bold
            ">

              🤖 AI Financial Insight

            </h2>



            <div className="
            mt-5
            bg-emerald-50
            rounded-2xl
            p-6
            whitespace-pre-line
            text-slate-700
            leading-relaxed
            ">

              {analysis.ai_result}

            </div>


          </div>










          {/* HISTORY */}

          <div className="
          bg-white
          rounded-3xl
          border
          shadow-sm
          p-8
          mt-8
          ">


            <h2 className="
            text-2xl
            font-bold
            ">

              Riwayat Analisis

            </h2>



            <div className="
            mt-5
            space-y-4
            ">


            {
              history.map((item,index)=>(


                <div

                key={index}

                className="
                border
                rounded-2xl
                p-5
                flex
                justify-between
                ">


                  <div>

                    <p className="font-semibold">

                      {rupiah(item.income)}

                    </p>


                    <p className="
                    text-sm
                    text-slate-500
                    ">

                      Pengeluaran:
                      {" "}
                      {rupiah(item.expense)}

                    </p>


                  </div>



                  <span className="
                  text-sm
                  text-slate-400
                  ">

                    Analisis #{history.length-index}

                  </span>


                </div>


              ))

            }


            </div>


          </div>


          </>


          :


          <div className="
          mt-10
          bg-white
          rounded-3xl
          p-10
          text-center
          ">


            <h2 className="
            text-xl
            font-bold
            ">

              Belum Ada Data

            </h2>


            <p className="
            text-slate-500
            mt-3
            ">

              Lakukan analisis finansial terlebih dahulu.

            </p>


          </div>


        }





      </div>


    </main>


  )

}







function SummaryCard({

icon,

title,

value

}:{

icon:string;

title:string;

value:string;

}){


return (

<div className="
bg-white
rounded-3xl
border
shadow-sm
p-6
">


<div className="text-3xl">

{icon}

</div>


<p className="
text-slate-500
mt-4
">

{title}

</p>


<h3 className="
text-xl
font-bold
mt-2
">

{value}

</h3>


</div>


)

}