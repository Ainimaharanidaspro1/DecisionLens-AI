"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AnalyzePage(){

  const [income,setIncome] = useState("");
  const [expense,setExpense] = useState("");
  const [goal,setGoal] = useState("");
  const [problem,setProblem] = useState("");


  async function submitData(){

    // 1. Kirim data ke Gemini melalui API route
    const response = await fetch("/api/analyze", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    income,
    expense,
    saving_goal: goal,
    financial_problem: problem,
  }),
});

console.log("Status:", response.status);

const aiData = await response.json();

console.log("AI DATA:", aiData);

if (!response.ok) {
  alert(aiData.error || "Terjadi kesalahan.");
  return;
}


    if(aiData.error){
      alert(aiData.error);
      return;
    }


    // 2. Simpan data + hasil AI ke Supabase
    const {error} = await supabase
      .from("financial_analysis")
      .insert({
        income,
        expense,
        saving_goal: goal,
        financial_problem: problem,
        ai_result: aiData.result
      });


    if(error){
      alert(error.message);
    }else{
      alert("Analisis AI berhasil 🎉");
      console.log("Hasil AI:", aiData.result);
    }

    }

  return(
    <main className="min-h-screen flex items-center justify-center">

      <div className="space-y-4 w-96">

        <h1 className="text-3xl font-bold">
          Financial Analyzer
        </h1>


        <input
        className="border p-2 w-full"
        placeholder="Pendapatan per bulan"
        onChange={(e)=>setIncome(e.target.value)}
        />


        <input
        className="border p-2 w-full"
        placeholder="Pengeluaran per bulan"
        onChange={(e)=>setExpense(e.target.value)}
        />


        <input
        className="border p-2 w-full"
        placeholder="Tujuan finansial"
        onChange={(e)=>setGoal(e.target.value)}
        />


        <textarea
        className="border p-2 w-full"
        placeholder="Masalah finansial"
        onChange={(e)=>setProblem(e.target.value)}
        />


        <button
        onClick={submitData}
        className="bg-blue-600 text-white px-5 py-2 rounded">
          Analisis
        </button>

      </div>

    </main>
  )

}