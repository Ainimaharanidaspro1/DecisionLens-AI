"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";


export default function AnalyzePage() {


  const [income,setIncome] = useState("");
  const [expense,setExpense] = useState("");
  const [goal,setGoal] = useState("");
  const [problem,setProblem] = useState("");

  const [result,setResult] = useState("");

  const [loading,setLoading] = useState(false);



  async function submitData(){


    if(
      !income ||
      !expense ||
      !goal ||
      !problem
    ){

      alert("Lengkapi semua data terlebih dahulu");
      return;

    }



    setLoading(true);



    try{


      // =========================
      // AI ANALYSIS
      // =========================


      const response = await fetch(
        "/api/analyze",
        {

          method:"POST",

          headers:{
            "Content-Type":"application/json"
          },

          body:JSON.stringify({

            income,
            expense,
            saving_goal:goal,
            financial_problem:problem

          })

        }
      );



      const aiData = await response.json();



      if(!response.ok){

        alert(aiData.error || "AI gagal");
        return;

      }



      setResult(aiData.result);




      // =========================
      // SIMPAN HASIL AI
      // =========================


      const {error:analysisError}=await supabase

      .from("financial_analysis")

      .insert({

        income:Number(income),

        expense:Number(expense),

        saving_goal:goal,

        financial_problem:problem,

        ai_result:aiData.result

      });



      if(analysisError){

        console.log(
          analysisError
        );

      }





      // =========================
      // SIMPAN TRANSAKSI
      // AGAR DASHBOARD TERISI
      // =========================



      const {error:transactionError}=await supabase

      .from("transactions")

      .insert([


        {

          category:"Pendapatan Awal",

          amount:Number(income),

          type:"income"

        },


        {

          category:"Pengeluaran Awal",

          amount:Number(expense),

          type:"expense"

        }


      ]);




      if(transactionError){

        console.log(
          transactionError
        );

      }




    }

    catch(error){

      console.log(error);

      alert(
        "Gagal melakukan analisis"
      );

    }


    finally{

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



<div className="
max-w-6xl
mx-auto
">



<div className="
text-center
mb-12
">


<div className="
inline-flex
bg-emerald-100
text-emerald-700
px-4
py-2
rounded-full
font-semibold
text-sm
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

Masukkan kondisi finansial dan dapatkan rekomendasi AI.

</p>


</div>






<div className="
grid
lg:grid-cols-2
gap-8
">





{/* FORM */}

<div className="
bg-white
rounded-3xl
p-8
shadow-lg
">



<h2 className="
text-xl
font-bold
">

Financial Information

</h2>



<Input

label="💰 Pendapatan Bulanan"

placeholder="8000000"

value={income}

setValue={setIncome}

/>



<Input

label="🛒 Pengeluaran Bulanan"

placeholder="4500000"

value={expense}

setValue={setExpense}

/>




<Input

label="🎯 Tujuan Finansial"

placeholder="Menabung rumah"

value={goal}

setValue={setGoal}

/>





<label className="
font-semibold
block
mt-5
">

⚠ Tantangan Finansial

</label>



<textarea

className="
w-full
border
rounded-2xl
p-4
mt-3
h-32
"

placeholder="Contoh: Sulit mengatur pengeluaran"

value={problem}

onChange={
e=>setProblem(e.target.value)
}

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









{/* RESULT */}


<div className="
bg-white
rounded-3xl
p-8
shadow-lg
min-h-[500px]
">



<h2 className="
text-xl
font-bold
">

🤖 AI Financial Insight

</h2>



<p className="
text-sm
text-slate-500
mt-1
">

Powered by Gemini AI

</p>





{

result

?

<div className="
mt-6
bg-emerald-50
rounded-2xl
p-6
whitespace-pre-line
">

{result}



<a

href="/dashboard"

className="
inline-block
mt-6
bg-[#166534]
text-white
px-6
py-3
rounded-xl
"

>

Lihat Dashboard →

</a>



</div>



:


<div className="
mt-10
space-y-5
">


<Card
title="📊 Financial Analysis"
text="AI akan menganalisis kondisi finansial."
/>


<Card
title="💡 Recommendation"
text="AI memberikan strategi pengelolaan uang."
/>


<Card
title="🎯 Financial Goal"
text="Membantu mencapai target finansial."
/>



</div>


}



</div>



</div>



</div>


</main>


);


}





function Input({

label,
placeholder,
value,
setValue

}:{

label:string;
placeholder:string;
value:string;
setValue:(v:string)=>void;

}){


return (

<div className="
mt-5
">


<label className="
font-semibold
">

{label}

</label>


<input

className="
w-full
border
rounded-2xl
p-4
mt-3
"

placeholder={placeholder}

value={value}

onChange={
e=>setValue(e.target.value)
}

/>


</div>

)


}






function Card({

title,
text

}:{

title:string;
text:string;

}){


return (

<div className="
bg-slate-50
rounded-2xl
p-5
">


<h3 className="font-bold">

{title}

</h3>


<p className="
text-sm
text-slate-500
mt-2
">

{text}

</p>


</div>

)


}