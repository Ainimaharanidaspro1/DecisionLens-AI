"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";


export default function Dashboard() {


  const [transactions, setTransactions] = useState<any[]>([]);

  const [category,setCategory] = useState("");
  const [amount,setAmount] = useState("");
  const [type,setType] = useState("expense");

  const [aiResult,setAiResult] = useState("");




  useEffect(()=>{

    fetchTransactions();
    fetchAI();

  },[]);





  async function fetchTransactions(){


    const {data,error}=await supabase
      .from("transactions")
      .select("*")
      .order("id",{ascending:false});



    if(error){

      console.log(error);

    }else{

      setTransactions(data || []);

    }


  }






  async function fetchAI(){


    const {data,error}=await supabase
      .from("financial_analysis")
      .select("ai_result")
      .order("id",{ascending:false})
      .limit(1);



    if(data && data.length){

      setAiResult(data[0].ai_result);

    }


  }






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

    }else{


      setCategory("");
      setAmount("");

      fetchTransactions();

    }


  }







  const income = transactions

  .filter(item=>item.type==="income")

  .reduce((a,b)=>a+Number(b.amount),0);




  const expense = transactions

  .filter(item=>item.type==="expense")

  .reduce((a,b)=>a+Number(b.amount),0);



  const balance = income-expense;







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







return (

<main className="
min-h-screen
bg-[#F8FAFC]
px-8
py-10
">


<div className="
max-w-6xl
mx-auto
">



<h1 className="
text-4xl
font-bold
">

Financial Dashboard

</h1>


<p className="
text-slate-500
mt-2
">

Kelola pemasukan, pengeluaran, dan keputusan finansial.

</p>







{/* SUMMARY */}

<div className="
grid
md:grid-cols-3
gap-6
mt-8
">


<Card
title="Total Income"
value={rupiah(income)}
/>


<Card
title="Total Expense"
value={rupiah(expense)}
/>


<Card
title="Balance"
value={rupiah(balance)}
/>



</div>










{/* ADD TRANSACTION */}


<div className="
bg-white
rounded-3xl
p-8
mt-8
shadow-sm
">


<h2 className="
text-xl
font-bold
">

Tambah Transaksi

</h2>



<div className="
grid
md:grid-cols-3
gap-4
mt-5
">


<input

className="border rounded-xl p-3"

placeholder="Kategori"

value={category}

onChange={(e)=>setCategory(e.target.value)}

/>



<input

className="border rounded-xl p-3"

placeholder="Jumlah"

value={amount}

onChange={(e)=>setAmount(e.target.value)}

/>



<select

className="border rounded-xl p-3"

value={type}

onChange={(e)=>setType(e.target.value)}

>


<option value="expense">
Pengeluaran
</option>


<option value="income">
Pemasukan
</option>


</select>



</div>




<button

onClick={addTransaction}

className="
mt-5
bg-slate-900
text-white
px-6
py-3
rounded-xl
"

>

Simpan Transaksi

</button>



</div>









{/* TRANSACTION LIST */}


<div className="
bg-white
rounded-3xl
p-8
mt-8
shadow-sm
">


<h2 className="
text-xl
font-bold
">

Transaksi Terbaru

</h2>




<div className="
mt-5
space-y-3
">


{

transactions.map((item)=>(


<div

key={item.id}

className="
border
rounded-xl
p-4
flex
justify-between
"


>


<div>

<p className="font-semibold">

{item.category}

</p>


<p className="text-sm text-slate-500">

{item.type}

</p>


</div>



<p className="font-bold">

{
item.type==="income"
?
"+ "
:
"- "
}

{rupiah(Number(item.amount))}

</p>


</div>


))

}



</div>



</div>









{/* AI */}


<div className="
bg-emerald-50
rounded-3xl
p-8
mt-8
">


<h2 className="
text-xl
font-bold
">

🤖 AI Recommendation

</h2>


<p className="
mt-4
whitespace-pre-line
text-slate-700
">

{aiResult || "Belum ada rekomendasi AI"}

</p>


</div>






</div>


</main>


)


}







function Card({

title,

value

}:{

title:string;

value:string;

}){


return(

<div className="
bg-white
rounded-3xl
p-6
shadow-sm
">


<p className="
text-slate-500
">

{title}

</p>


<h2 className="
text-2xl
font-bold
mt-3
">

{value}

</h2>


</div>

)


}