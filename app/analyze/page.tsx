"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AnalyzePage() {

  const [income, setIncome] = useState("");
  const [expense, setExpense] = useState("");
  const [goal, setGoal] = useState("");
  const [problem, setProblem] = useState("");

  const [result, setResult] = useState("");

  const [loading, setLoading] = useState(false);



  async function submitData() {

    if (!income || !expense || !goal || !problem) {
      alert("Lengkapi semua data terlebih dahulu.");
      return;
    }


    setLoading(true);


    try {

      const response = await fetch("/api/analyze", {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({

          income,

          expense,

          saving_goal: goal,

          financial_problem: problem

        }),

      });



      const aiData = await response.json();



      if (!response.ok) {

        alert(aiData.error || "Terjadi kesalahan");

        return;

      }



      setResult(aiData.result);



      const { error } = await supabase

        .from("financial_analysis")

        .insert({

          income,

          expense,

          saving_goal: goal,

          financial_problem: problem,

          ai_result: aiData.result,

        });



      if (error) {

        console.log(error);

      }



    } catch (error) {

      console.log(error);

      alert("Gagal melakukan analisis AI");


    } finally {

      setLoading(false);

    }


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


      <div className="max-w-6xl mx-auto">


        {/* HEADER */}

        <div className="text-center mb-12">


          <div className="
            inline-flex
            bg-emerald-100
            text-emerald-700
            px-4
            py-2
            rounded-full
            text-sm
            font-semibold
          ">

            🤖 AI Financial Checkup

          </div>



          <h1 className="
            text-4xl
            font-bold
            mt-5
          ">

            Analyze Your Finance

          </h1>



          <p className="
            text-slate-600
            mt-3
          ">

            Masukkan kondisi finansialmu dan
            dapatkan rekomendasi dari AI.

          </p>


        </div>







        {/* TWO COLUMN */}

        <div className="
          grid
          lg:grid-cols-2
          gap-8
          items-start
        ">



          {/* LEFT FORM */}

          <div className="
            bg-white
            rounded-[32px]
            border
            shadow-lg
            p-8
          ">


            <h2 className="
              text-xl
              font-bold
            ">

              Financial Information

            </h2>


            <p className="
              text-sm
              text-slate-500
              mt-2
            ">

              Isi data berikut untuk mendapatkan analisis.

            </p>





            <InputField

              icon="💰"

              label="Pendapatan Bulanan"

              placeholder="Contoh: 8000000"

              value={income}

              onChange={setIncome}

            />





            <InputField

              icon="🛒"

              label="Pengeluaran Bulanan"

              placeholder="Contoh: 4500000"

              value={expense}

              onChange={setExpense}

            />






            <InputField

              icon="🎯"

              label="Tujuan Finansial"

              placeholder="Contoh: Menabung rumah"

              value={goal}

              onChange={setGoal}

            />






            <label className="
              flex
              items-center
              gap-2
              font-semibold
              mt-5
            ">

              ⚠ Tantangan Finansial

            </label>



            <textarea

              className="
                w-full
                mt-3
                h-32
                border
                rounded-2xl
                p-4
                resize-none
                focus:outline-none
                focus:ring-2
                focus:ring-emerald-300
              "

              placeholder="Contoh: Sulit mengontrol pengeluaran"

              value={problem}

              onChange={(e)=>setProblem(e.target.value)}

            />







            <button

              onClick={submitData}

              disabled={loading}

              className="
                mt-6
                w-full
                bg-[#0F172A]
                text-white
                py-4
                rounded-2xl
                font-semibold
                hover:bg-slate-800
                transition
              "

            >

              {

                loading

                ?

                "🤖 AI sedang menganalisis..."

                :

                "✨ Analisis dengan AI"

              }


            </button>



          </div>










          {/* RIGHT AI PANEL */}

          <div className="
            bg-white
            rounded-[32px]
            border
            shadow-lg
            p-8
            min-h-[600px]
          ">


            <div className="
              flex
              items-center
              gap-3
            ">


              <div className="
                bg-emerald-100
                p-3
                rounded-xl
              ">

                🤖

              </div>



              <div>


                <h2 className="font-bold text-xl">

                  AI Financial Insight

                </h2>


                <p className="
                  text-sm
                  text-slate-500
                ">

                  Powered by Gemini AI

                </p>


              </div>


            </div>







            {

              result ?


              <div className="
                mt-8
                bg-emerald-50
                rounded-2xl
                p-6
                text-slate-700
                leading-relaxed
                whitespace-pre-line
              ">

                {result}

              </div>


              :


              <div className="
                mt-10
                space-y-5
              ">


                <div className="
                  bg-slate-50
                  rounded-2xl
                  p-5
                ">

                  <p className="
                    font-semibold
                  ">

                    📊 Financial Analysis

                  </p>


                  <p className="
                    text-sm
                    text-slate-500
                    mt-2
                  ">

                    AI akan mengevaluasi kondisi keuanganmu.

                  </p>


                </div>





                <div className="
                  bg-slate-50
                  rounded-2xl
                  p-5
                ">


                  <p className="font-semibold">

                    💡 Recommendation

                  </p>


                  <p className="
                    text-sm
                    text-slate-500
                    mt-2
                  ">

                    Mendapatkan saran penghematan
                    dan strategi finansial.

                  </p>


                </div>





                <div className="
                  bg-emerald-50
                  rounded-2xl
                  p-5
                ">


                  <p className="
                    font-semibold
                    text-emerald-700
                  ">

                    🎯 Financial Goal

                  </p>


                  <p className="
                    text-sm
                    text-slate-600
                    mt-2
                  ">

                    Membantu mencapai target keuangan.

                  </p>


                </div>



              </div>


            }



          </div>



        </div>


      </div>


    </main>

  );

}








function InputField({

icon,

label,

placeholder,

value,

onChange

}:{

icon:string;

label:string;

placeholder:string;

value:string;

onChange:(value:string)=>void;

}){


return (

<div className="mt-5">


<label className="
font-semibold
flex
items-center
gap-2
">

{icon}

{label}

</label>



<input

className="
w-full
mt-3
border
rounded-2xl
p-4
focus:outline-none
focus:ring-2
focus:ring-emerald-300
"

placeholder={placeholder}

value={value}

onChange={(e)=>onChange(e.target.value)}

/>


</div>

)

}