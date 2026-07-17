import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { useAuth } from "../context/AuthContext";
import logo from "../resunexus-logo.png";

export default function LoginPage(){

const navigate=useNavigate();

const {login}=useAuth();

const[email,setEmail]=useState("");

const[password,setPassword]=useState("");

const[msg,setMsg]=useState("");

const loginUser=async()=>{

try{

await login(email,password);

navigate("/app");

}

catch(err){

setMsg(err.message);

}

}

return(

<div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 overflow-hidden flex justify-center items-center">

<div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-cyan-500/20 blur-[130px]" />

<div className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full bg-blue-500/20 blur-[150px]" />

<motion.div

initial={{opacity:0,y:30}}

animate={{opacity:1,y:0}}

className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-[32px] shadow-2xl p-10 w-[430px]"

>

<div className="flex flex-col items-center">

<img src={logo} className="w-20 rounded-2xl"/>

<h2 className="text-4xl font-bold text-white mt-5">

Welcome Back

</h2>

<p className="text-slate-400 mt-2">

Sign in to continue

</p>

</div>

<input

className="w-full mt-8 rounded-xl bg-white/10 border border-white/10 p-4 text-white"

placeholder="Email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

/>

<input

type="password"

className="w-full mt-5 rounded-xl bg-white/10 border border-white/10 p-4 text-white"

placeholder="Password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

/>

{msg &&

<p className="text-red-400 mt-4">

{msg}

</p>

}

<button

onClick={loginUser}

className="w-full mt-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 transition font-semibold text-slate-900 shadow-lg shadow-cyan-500/30"

>

Login

</button>

<button

onClick={()=>navigate("/")}

className="w-full mt-4 text-slate-300 hover:text-white"

>

← Back Home

</button>

</motion.div>

</div>

);

}