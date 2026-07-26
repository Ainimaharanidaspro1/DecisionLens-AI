"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";


export default function Dashboard(){


const [analysis,setAnalysis]=useState<any>(null);

const [transactions,setTransactions]=useState<any[]>([]);

const [goal,setGoal]=useState<any>(null);

const [aiInsight,setAiInsight]=useState(
"Belum ada analisis AI. Silakan lakukan analisis terlebih dahulu."
);


const [showModal,setShowModal]=useState(false);


const [category,setCategory]=useState("");
const [amount,setAmount]=useState("");
const [type,setType]=useState("expense");





useEffect(()=>{

getAnalysis();
getTransactions();
getGoal();
getInsight();

},[]);






// AMBIL HASIL ANALISIS AI

async function getAnalysis(){


const {data,error}=await supabase
.from("financial_analysis")
.select("*")
.order("created_at",{ascending:false})
.limit(1);



if(!error && data && data.length){

setAnalysis(data[0]);

}


}






// AMBIL TRANSAKSI TAMBAHAN

async function getTransactions(){


const {data,error}=await supabase
.from("transactions")
.select("*")
.order("created_at",{ascending:false});



if(!error){

setTransactions(data || []);

}


}







async function getGoal(){


const {data,error}=await supabase
.from("financial_goals")
.select("*")
.limit(1);



if(!error && data?.length){

setGoal(data[0]);

}


}







async function getInsight(){


const {data,error}=await supabase
.from("financial_analysis")
.select("*")
.order("created_at",{ascending:false})
.limit(1);



if(!error && data?.length){


setAiInsight(
data[0].ai_result ||
"Tidak ada rekomendasi AI."
);


}


}









// TAMBAH TRANSAKSI

async function addTransaction(){


if(!category || !amount){

alert("Lengkapi data transaksi");
return;

}



const {error}=await supabase
.from("transactions")
.insert({

category,

amount:Number(amount),

type


});



if(error){

alert(error.message);
return;

}



setCategory("");
setAmount("");

setShowModal(false);


getTransactions();


}









// HITUNG TOTAL

const income =

Number(analysis?.income || 0)

+

transactions

.filter(item=>item.type==="income")

.reduce(

(total,item)=>

total + Number(item.amount),

0

);






const expense =


Number(analysis?.expense || 0)

+

transactions

.filter(item=>item.type==="expense")

.reduce(

(total,item)=>

total + Number(item.amount),

0

);





const balance = income-expense;





const score =

income===0

?

0

:

Math.min(

Math.round(

(balance/income)*100

),

100

);







function rupiah(value:number){

return new Intl.NumberFormat(

"id-ID",

{

style:"currency",

currency:"IDR",

maximumFractionDigits:0

}

).format(value);


}







const chartData=[

{

name:"Pendapatan",

value:income

},

{

name:"Pengeluaran",

value:expense

}


];









return (


<main className="
min-h-screen
bg-[#FAF7F0]
p-6
">


<div className="
max-w-6xl
mx-auto
">






<h1 className="
text-3xl
font-bold
text-[#1F2937]
">

Dashboard Finansial

</h1>



<p className="
text-gray-500
mt-2
">

Pantau kondisi finansial berdasarkan analisis AI dan transaksi.

</p>









{/* SCORE */}


<section className="
mt-8
bg-[#166534]
rounded-3xl
p-8
text-white
">


<p className="opacity-70">

Financial Health Score

</p>


<h2 className="
text-6xl
font-bold
mt-3
">

{score}

<span className="
text-2xl
">

/100

</span>

</h2>




<div className="
mt-5
inline-block
bg-[#DCFCE7]
text-[#166534]
px-4
py-2
rounded-full
">

{

score>=80

?

"Keuangan Sehat"

:

score>=50

?

"Perlu Perhatian"

:

"Perlu Perbaikan"

}


</div>


</section>









{/* SUMMARY */}


<section className="
grid
md:grid-cols-3
gap-5
mt-6
">


<Card

title="Pendapatan"

value={rupiah(income)}

/>


<Card

title="Pengeluaran"

value={rupiah(expense)}

/>


<Card

title="Sisa Dana"

value={rupiah(balance)}

/>


</section>









{/* CHART */}


<section className="
mt-6
bg-white
rounded-3xl
p-6
">


<h2 className="
font-bold
text-xl
">

Financial Overview

</h2>



<div className="
h-72
mt-5
">


<ResponsiveContainer
width="100%"
height="100%"
>


<LineChart data={chartData}>


<CartesianGrid strokeDasharray="3 3"/>


<XAxis dataKey="name"/>


<YAxis/>


<Tooltip/>


<Line

type="monotone"

dataKey="value"

stroke="#166534"

strokeWidth={3}

/>


</LineChart>


</ResponsiveContainer>


</div>


</section>









{/* AI */}


<section className="
mt-6
bg-[#F5E6C8]
rounded-3xl
p-6
">


<h2 className="
text-xl
font-bold
text-[#166534]
">

🤖 AI Insight

</h2>



<p className="
mt-4
leading-relaxed
">

{aiInsight}

</p>


</section>









{/* TRANSACTIONS */}


<section className="
mt-6
bg-white
rounded-3xl
p-6
">


<h2 className="
text-xl
font-bold
">

Transaksi Tambahan

</h2>



<div className="
mt-5
space-y-4
">


{

transactions.length===0

?

<p className="text-gray-500">

Belum ada transaksi tambahan.

</p>


:


transactions.map(item=>(


<div

key={item.id}

className="
flex
justify-between
border-b
pb-3
">


<span>

{item.category}

</span>



<span className={

item.type==="income"

?

"text-green-600 font-bold"

:

"text-red-500 font-bold"

}>


{

item.type==="income"

?

"+ "

:

"- "

}



{rupiah(Number(item.amount))}


</span>


</div>


))


}



</div>


</section>







</div>









{/* BUTTON */}


<button

onClick={()=>setShowModal(true)}

className="
fixed
right-8
bottom-8
w-16
h-16
rounded-full
bg-[#166534]
text-white
text-4xl
"

>

+

</button>









{/* MODAL */}


{

showModal &&

<div className="
fixed
inset-0
bg-black/40
flex
items-center
justify-center
">


<div className="
bg-white
rounded-3xl
p-8
w-full
max-w-md
">


<h2 className="
font-bold
text-xl
">

Tambah Transaksi

</h2>



<input

className="
w-full
border
rounded-xl
p-3
mt-5
"

placeholder="Kategori"

value={category}

onChange={e=>setCategory(e.target.value)}

/>




<input

className="
w-full
border
rounded-xl
p-3
mt-3
"

placeholder="Jumlah"

value={amount}

onChange={e=>setAmount(e.target.value)}

/>





<select

className="
w-full
border
rounded-xl
p-3
mt-3
"

value={type}

onChange={e=>setType(e.target.value)}

>


<option value="expense">

Pengeluaran

</option>


<option value="income">

Pemasukan

</option>


</select>





<button

onClick={addTransaction}

className="
mt-5
w-full
bg-[#166534]
text-white
py-3
rounded-xl
"

>

Simpan

</button>


</div>


</div>


}



</main>


);


}









function Card({

title,

value

}:{

title:string;

value:string;

}){


return (

<div className="
bg-white
rounded-3xl
p-6
shadow-sm
">


<p className="text-gray-500">

{title}

</p>


<h3 className="
text-2xl
font-bold
text-[#166534]
mt-3
">

{value}

</h3>


</div>

)


}