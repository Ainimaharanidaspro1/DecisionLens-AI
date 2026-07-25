"use client";

import { supabase } from "@/lib/supabase";

export default function TestPage() {

  async function testConnection() {
    console.log("Klik tombol");

    const { data, error } = await supabase.auth.getSession();

    console.log("Data:", data);
    console.log("Error:", error);

    if (error) {
      alert("Supabase gagal terhubung ❌");
    } else {
      alert("Supabase berhasil terhubung 🎉");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <button
        onClick={testConnection}
        className="bg-blue-600 text-white px-6 +py-3 rounded-lg"
      >
        Test Supabase
      </button>
    </main>
  );
}