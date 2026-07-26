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
  PieChart,
  Pie,
  Cell
} from "recharts";


export default function Dashboard() {


const [transactions,setTransactions]=useState<any[]>([]);
const [goal,setGoal]=useState<any>(null);

const [modal,setModal]=useState(false);

const [category,setCategory]=useState("");
const [amount,setAmount]=useState("");
const [type,setType]=useState("expense");



useEffect(()=>{

loadTransactions();
loadGoal();

},[]);



async function loadTransactions(){

const {data}=await supabase
.from("transactions")
.select("*")
.order("created_at",{ascending:false});


setTransactions(data||[]);

}



async function loadGoal(){

const {data}=await supabase
.from("financial_goals")
.select("*")
.limit(1);


if(data?.length){
setGoal(data[0]);
}

}



async function addTransaction(){

if(!category || !amount){
alert("Lengkapi data");
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
setModal(false);

loadTransactions();

}



const income =
transactions
.filter(t=>t.type==="income")
.reduce(
(a,b)=>a+Number(b.amount),
0
);


const expense =
transactions
.filter(t=>t.type==="expense")
.reduce(
(a,b)=>a+Number(b.amount),
0
);



const balance=income-expense;



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





const cashData=[

{
name:"Pemasukan",
value:income
},

{
name:"Pengeluaran",
value:expense
}

];



const categoryData=
Object.values(

transactions
.filter(t=>t.type==="expense")
.reduce((acc:any,item)=>{


if(!acc[item.category]){

acc[item.category]={
name:item.category,
value:0
}

}


acc[item.category].value+=Number(item.amount);


return acc;


},{})

);




return (

<main className="
min-h-screen
bg-slate-50
p-6
">


<div className="
max-w-6xl
mx-auto
">


{/* HEADER */}

<div>

<h1 className="
text-3xl
font-bold
text-slate-900
">

Dashboard Finansial

</h1>


<p className="
text-slate-500
mt-2
">

Pantau pemasukan, pengeluaran, dan tujuan keuangan kamu.

</p>


</div>







{/* BALANCE */}

<div className="
mt-8
rounded-3xl
bg-gradient-to-r
from-teal-700
to-emerald-500
p-8
text-white
shadow-lg
">


<p className="opacity-80">

Total Saldo

</p>


<h2 className="
text-4xl
font-bold
mt-3
">

{rupiah(balance)}

</h2>


<div className="
mt-6
flex
gap-8
text-sm
">


<div>

<p className="opacity-80">
Pemasukan
</p>

<p className="font-semibold">
{rupiah(income)}
</p>

</div>



<div>

<p className="opacity-80">
Pengeluaran
</p>

<p className="font-semibold">
{rupiah(expense)}
</p>

</div>


</div>


</div>









{/* GRAPH */}

<div className="
grid
lg:grid-cols-2
gap-6
mt-6
">



<div className="
bg-white
rounded-3xl
border
p-6
">


<h2 className="
font-bold
text-lg
">

Cash Flow

</h2>


<div className="
h-64
mt-4
">


<ResponsiveContainer
width="100%"
height="100%"
>


<LineChart data={cashData}>


<XAxis dataKey="name"/>

<YAxis/>


<Tooltip/>


<Line

type="monotone"

dataKey="value"

stroke="#0F766E"

strokeWidth={3}

/>


</LineChart>


</ResponsiveContainer>


</div>


</div>







<div className="
bg-white
rounded-3xl
border
p-6
">


<h2 className="
font-bold
text-lg
">

Pengeluaran

</h2>



<div className="
h-64
mt-4
">


<ResponsiveContainer
width="100%"
height="100%"
>


<PieChart>


<Pie

data={categoryData}

dataKey="value"

nameKey="name"

outerRadius={90}

>


{
categoryData.map((_,i)=>(

<Cell
key={i}
/>

))
}


</Pie>


<Tooltip/>


</PieChart>


</ResponsiveContainer>



</div>



</div>


</div>










{/* GOAL */}

<div className="
bg-white
rounded-3xl
border
p-6
mt-6
">


<h2 className="
font-bold
text-lg
">

🎯 Target Keuangan

</h2>


{

goal ?

<>

<div className="
flex
justify-between
mt-5
">

<span>

{goal.goal_name}

</span>


<span>

{
Math.round(
goal.current_amount /
goal.target_amount *
100
)
}%

</span>


</div>



<div className="
h-3
bg-slate-200
rounded-full
mt-3
">


<div

className="
h-3
bg-teal-600
rounded-full
"

style={{

width:
`${goal.current_amount /
goal.target_amount *
100}%`

}}

/>


</div>

</>


:

<p className="
text-slate-500
mt-4
">

Belum ada target keuangan.

</p>

}


</div>









{/* TRANSACTION */}

<div className="
bg-white
rounded-3xl
border
p-6
mt-6
">


<h2 className="
font-bold
text-lg
">

Transaksi Terbaru

</h2>


<div className="
mt-5
space-y-4
">


{

transactions.length===0 ?

<p className="
text-slate-500
">

Belum ada transaksi.

</p>


:


transactions
.slice(0,5)
.map(item=>(


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
"text-teal-600 font-semibold"
:
"text-red-500 font-semibold"

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


</div>









</div>









{/* BUTTON */}

<button

onClick={()=>setModal(true)}

className="
fixed
right-8
bottom-8
w-16
h-16
rounded-full
bg-teal-700
text-white
shadow-xl
flex
items-center
justify-center
text-4xl
hover:scale-105
transition
"

>

+

</button>









{/* MODAL */}

{

modal &&

<div className="
fixed
inset-0
bg-black/40
flex
items-center
justify-center
z-50
">


<div className="
bg-white
rounded-3xl
p-8
w-full
max-w-md
">


<h2 className="
text-xl
font-bold
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

onChange={
e=>setCategory(e.target.value)
}

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

onChange={
e=>setAmount(e.target.value)
}

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

onChange={
e=>setType(e.target.value)
}

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
w-full
mt-5
bg-teal-700
text-white
rounded-xl
py-3
"

>

Simpan

</button>



</div>


</div>

}


</main>

)

}