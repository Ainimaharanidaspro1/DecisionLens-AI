import Link from "next/link";

export default function Home() {

  return (

    <main className="
      min-h-screen
      bg-gradient-to-b
      from-white
      via-[#F8FAFC]
      to-[#ECFDF5]
      text-[#0F172A]
    ">

      {/* HERO */}

      <section className="
        max-w-7xl
        mx-auto
        px-8
        pt-8
        pb-20
      ">


        <div className="
          grid
          lg:grid-cols-2
          gap-16
          items-center
        ">



          {/* TEXT */}

          <div>


            <span className="
              inline-flex
              items-center
              bg-emerald-100
              text-emerald-700
              px-4
              py-2
              rounded-full
              text-sm
              font-semibold
            ">

              🤖 AI Financial Assistant

            </span>





            <h2 className="
              text-5xl
              font-bold
              leading-tight
              mt-6
            ">


              Make Better


              <br />


              <span className="
                text-emerald-600
              ">

                Financial Decisions

              </span>


            </h2>






            <p className="
              mt-6
              text-lg
              text-slate-600
              leading-relaxed
              max-w-xl
            ">

              DecisionLens AI membantu pengguna memahami kondisi
              finansial, menganalisis pengeluaran, dan mendapatkan
              rekomendasi keuangan berbasis Artificial Intelligence.

            </p>






            <Link

              href="/analyze"

              className="
                inline-block
                mt-8
                bg-[#0F172A]
                text-white
                px-8
                py-4
                rounded-xl
                font-semibold
                hover:bg-slate-800
                transition
              "

            >

              Mulai Analisis

            </Link>


          </div>








          {/* MOCKUP */}


          <div className="
            flex
            justify-center
          ">


            <div className="
              relative
            ">


              <div className="
                absolute
                inset-0
                bg-emerald-300
                blur-3xl
                opacity-25
                rounded-full
              "></div>





              <div className="
                relative
                w-[380px]
                bg-white
                rounded-[32px]
                shadow-xl
                border
                border-slate-100
                p-7
              ">



                <div className="
                  flex
                  justify-between
                  items-start
                ">


                  <div>


                    <h3 className="
                      font-bold
                      text-lg
                    ">

                      Financial Overview

                    </h3>


                    <p className="
                      text-xs
                      text-slate-500
                      mt-1
                    ">

                      Contoh tampilan hasil analisis

                    </p>


                  </div>





                  <span className="
                    bg-emerald-100
                    text-emerald-700
                    text-xs
                    font-bold
                    px-3
                    py-1
                    rounded-full
                  ">

                    SAMPLE

                  </span>



                </div>







                <div className="
                  mt-7
                  bg-[#0F172A]
                  rounded-2xl
                  p-6
                  text-white
                ">


                  <p className="
                    text-sm
                    text-slate-300
                  ">

                    Financial Health Score

                  </p>



                  <h3 className="
                    text-5xl
                    font-bold
                    mt-2
                  ">

                    85

                    <span className="
                      text-xl
                      text-slate-400
                    ">

                      /100

                    </span>


                  </h3>




                  <p className="
                    text-emerald-400
                    mt-3
                    font-medium
                  ">

                    Kondisi Finansial Baik

                  </p>



                </div>







                <div className="
                  grid
                  grid-cols-2
                  gap-4
                  mt-5
                ">


                  <InfoCard

                    title="Pendapatan"

                    value="Rp8.000.000"

                  />



                  <InfoCard

                    title="Pengeluaran"

                    value="Rp4.500.000"

                  />


                </div>







                <div className="
                  mt-5
                  bg-emerald-50
                  rounded-xl
                  p-4
                ">



                  <p className="
                    font-bold
                    text-emerald-700
                    text-sm
                  ">

                    🤖 AI Recommendation

                  </p>



                  <p className="
                    text-sm
                    text-slate-700
                    mt-2
                    leading-relaxed
                  ">

                    Optimalkan pengeluaran rutin dan
                    tingkatkan alokasi tabungan.

                  </p>



                </div>



              </div>


            </div>


          </div>


        </div>


      </section>









      {/* FEATURES */}


      <section className="
        max-w-7xl
        mx-auto
        px-8
        py-14
      ">


        <h2 className="
          text-3xl
          font-bold
          text-center
        ">

          Financial Intelligence

        </h2>





        <div className="
          grid
          md:grid-cols-3
          gap-10
          mt-12
        ">


          <Feature

            icon="📊"

            title="Analyze"

            desc="Menganalisis pemasukan dan pengeluaran pengguna."

          />



          <Feature

            icon="🤖"

            title="AI Insight"

            desc="Memberikan rekomendasi berdasarkan hasil analisis."

          />



          <Feature

            icon="🎯"

            title="Goal Planning"

            desc="Membantu pengguna mencapai target finansial."

          />


        </div>


      </section>









      {/* HOW IT WORKS */}


      <section className="
        bg-[#ECFDF5]
      ">


        <div className="
          max-w-6xl
          mx-auto
          px-8
          py-16
        ">



          <h2 className="
            text-3xl
            font-bold
            text-center
          ">

            How DecisionLens AI Works

          </h2>




          <div className="
            grid
            md:grid-cols-3
            gap-8
            mt-12
          ">



            <Step

              number="01"

              title="Input Data"

              desc="Masukkan pendapatan, pengeluaran, dan tujuan finansial."

            />



            <Step

              number="02"

              title="AI Analysis"

              desc="Sistem menganalisis kondisi finansial menggunakan AI."

            />



            <Step

              number="03"

              title="Get Insight"

              desc="Pengguna mendapatkan rekomendasi keputusan finansial."

            />


          </div>



        </div>


      </section>








      {/* FOOTER */}


      <footer className="
        text-center
        py-5
        border-t
        text-sm
        text-slate-400
      ">


        DecisionLens AI · AI-powered financial decision assistant


      </footer>




    </main>

  );

}









function InfoCard({

title,

value

}:{

title:string;

value:string;

}){


return (

<div className="
bg-slate-50
rounded-xl
p-4
">


<p className="
text-xs
text-slate-500
">

{title}

</p>



<p className="
font-bold
mt-2
">

{value}

</p>


</div>

)

}










function Feature({

icon,

title,

desc

}:{

icon:string;

title:string;

desc:string;

}){


return (

<div className="
text-center
">


<div className="
text-4xl
">

{icon}

</div>



<h3 className="
text-xl
font-bold
mt-4
">

{title}

</h3>




<p className="
text-slate-600
mt-2
">

{desc}

</p>



</div>

)

}









function Step({

number,

title,

desc

}:{

number:string;

title:string;

desc:string;

}){


return (

<div className="
bg-white
rounded-2xl
p-6
border
border-emerald-100
shadow-sm
">


<div className="
text-emerald-600
text-3xl
font-bold
">

{number}

</div>



<h3 className="
text-xl
font-bold
mt-4
">

{title}

</h3>




<p className="
text-slate-600
mt-3
leading-relaxed
">

{desc}

</p>


</div>

)

}