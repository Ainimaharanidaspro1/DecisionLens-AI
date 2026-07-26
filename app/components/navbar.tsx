"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";


export default function Navbar(){

const pathname = usePathname();


const menu = [
    {
        name:"Home",
        href:"/"
    },
    {
        name:"Analyze",
        href:"/analyze"
    },
    {
        name:"Dashboard",
        href:"/dashboard"
    }
];


return (

<nav className="
max-w-7xl
mx-auto
px-8
py-6
flex
justify-between
items-center
">


{/* LOGO */}

<Link href="/" className="flex items-center gap-3">


<div className="
w-11
h-11
rounded-xl
bg-emerald-600
flex
items-center
justify-center
text-white
text-xl
">

💰

</div>


<div>

<h1 className="
font-bold
text-xl
text-[#0F172A]
">

DecisionLens AI

</h1>


<p className="
text-xs
text-slate-500
">

Financial Assistant

</p>


</div>


</Link>





{/* MENU */}

<div className="
flex
gap-2
bg-white
border
border-slate-100
shadow-sm
rounded-full
p-2
">


{
menu.map((item)=>(

<Link

key={item.href}

href={item.href}

className={`
px-5
py-2
rounded-full
text-sm
font-medium
transition

${
pathname===item.href

?

"bg-emerald-600 text-white"

:

"text-slate-600 hover:bg-emerald-50"

}

`}

>

{item.name}

</Link>


))

}


</div>



</nav>

)

}