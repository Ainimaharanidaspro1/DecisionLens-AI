"use client";

import { supabase } from "@/lib/supabase";

export default function TestPage() {

  async function testSupabase() {

    const { data, error } = await supabase.auth.getSession();

    console.log(data);
    console.log(error);

    if(error){
      alert("Koneksi gagal");
    } else {
      alert("Supabase berhasil terhubung 🎉");
    }

  }


  return (
    <main className="min-h-screen flex items-center justify-center">

      <button
        onClick={testSupabase}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        Test Supabase
      </button>

    </main>
  );
}