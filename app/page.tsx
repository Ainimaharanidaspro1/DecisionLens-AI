import Link from "next/link";


export default function Home(){

  return (

    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white">


      <section className="max-w-6xl mx-auto px-8 py-24">


        <div className="text-center">


          <div className="inline-block bg-blue-100 text-blue-700 px-5 py-2 rounded-full">
            🤖 AI Financial Advisor
          </div>



          <h1 className="text-5xl font-extrabold text-gray-800 mt-8">

            Kelola Keuangan Lebih Cerdas
            <br/>

            Bersama 
            <span className="text-blue-600">
              {" "}DecisionLens AI
            </span>

          </h1>




          <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-6 leading-8">

            DecisionLens AI membantu menganalisis kondisi
            finansial, menemukan masalah keuangan, dan memberikan
            rekomendasi keputusan finansial menggunakan teknologi
            Artificial Intelligence.

          </p>




          <Link
            href="/analyze"
            className="inline-block mt-10 bg-blue-600 text-white px-10 py-4 rounded-xl font-semibold hover:bg-blue-700 transition"
          >

            🚀 Mulai Analisis

          </Link>


        </div>





        <div className="grid md:grid-cols-3 gap-6 mt-20">


          <div className="bg-white shadow rounded-2xl p-6">

            <div className="text-4xl">
              📊
            </div>

            <h3 className="font-bold text-xl mt-4">
              Analisis Finansial
            </h3>

            <p className="text-gray-600 mt-2">
              Menganalisis kondisi pemasukan dan pengeluaran pengguna.
            </p>

          </div>




          <div className="bg-white shadow rounded-2xl p-6">

            <div className="text-4xl">
              🤖
            </div>

            <h3 className="font-bold text-xl mt-4">
              Rekomendasi AI
            </h3>

            <p className="text-gray-600 mt-2">
              Memberikan solusi finansial berdasarkan kondisi pengguna.
            </p>

          </div>




          <div className="bg-white shadow rounded-2xl p-6">

            <div className="text-4xl">
              🎯
            </div>

            <h3 className="font-bold text-xl mt-4">
              Target Finansial
            </h3>

            <p className="text-gray-600 mt-2">
              Membantu pengguna mencapai tujuan keuangan.
            </p>

          </div>


        </div>


      </section>


    </main>

  )

}