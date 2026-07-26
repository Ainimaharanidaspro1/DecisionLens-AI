import Link from "next/link";


export default function Home(){

  return (

    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">


      <section className="max-w-6xl mx-auto px-6 py-20">


        <div className="text-center">


          <div className="inline-block bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-medium">
            🤖 AI Financial Advisor
          </div>



          <h1 className="text-5xl font-bold text-gray-800 mt-8">

            Kelola Keuangan Lebih Cerdas
            Bersama

            <span className="text-blue-600">
              {" "}DecisionLens AI
            </span>

          </h1>



          <p className="max-w-2xl mx-auto text-gray-600 text-lg mt-6 leading-8">

            DecisionLens AI membantu kamu memahami kondisi
            finansial, mengontrol pengeluaran, menentukan
            tujuan keuangan, dan mendapatkan rekomendasi
            menggunakan Artificial Intelligence.

          </p>




          <Link
          href="/analyze"
          className="inline-block mt-10 bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-semibold"
          >

            🚀 Mulai Analisis

          </Link>


        </div>





        <div className="grid md:grid-cols-3 gap-6 mt-20">


          <div className="bg-white rounded-2xl shadow p-6">

            <h3 className="text-xl font-bold">
              📊 Analisis Finansial
            </h3>

            <p className="text-gray-600 mt-3">
              Analisis pendapatan dan pengeluaran
              untuk memahami kondisi keuangan.
            </p>

          </div>




          <div className="bg-white rounded-2xl shadow p-6">

            <h3 className="text-xl font-bold">
              🤖 Rekomendasi AI
            </h3>

            <p className="text-gray-600 mt-3">
              Mendapatkan saran pengelolaan uang
              berdasarkan kondisi pengguna.
            </p>

          </div>




          <div className="bg-white rounded-2xl shadow p-6">

            <h3 className="text-xl font-bold">
              🎯 Target Keuangan
            </h3>

            <p className="text-gray-600 mt-3">
              Membantu pengguna mencapai tujuan
              finansial secara terarah.
            </p>

          </div>


        </div>


      </section>


    </main>

  )

}