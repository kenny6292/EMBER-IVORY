"use client";
import Link from "next/link";
import {useState} from "react";
import {ArrowLeft,CalendarDays} from "lucide-react";

export default function Reservations(){
 const [submitted,setSubmitted]=useState(false);
 const [error,setError]=useState("");
 const [loading,setLoading]=useState(false);
 async function submit(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault(); setError(""); setLoading(true);
  const form=new FormData(e.currentTarget);
  const payload={name:String(form.get("name")||""),email:String(form.get("email")||""),phone:String(form.get("phone")||""),guests:Number(form.get("guests")),date:String(form.get("date")||""),time:String(form.get("time")||""),specialRequest:String(form.get("specialRequest")||"")};
  try{const r=await fetch("/api/reservations",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});const data=await r.json();if(!r.ok)throw new Error(data.error||"Unable to submit reservation.");setSubmitted(true)}catch(err){setError(err instanceof Error?err.message:"Unable to submit reservation.")}finally{setLoading(false)}
 }
 if(submitted)return <main className="min-h-screen bg-[#171513] px-5 py-20 text-[#f5f0e6]"><div className="mx-auto max-w-xl pt-20 text-center"><p className="text-xs uppercase tracking-[.3em] text-[#d9a57d]">Reservation received</p><h1 className="serif mt-5 text-6xl">Your table request is in.</h1><p className="mt-6 text-white/60">We’ll confirm your reservation details shortly.</p><Link href="/" className="mt-10 inline-block bg-[#b9572b] px-6 py-4 text-xs uppercase tracking-[.18em]">Return Home</Link></div></main>;
 return <main className="min-h-screen bg-[#f5f0e6]"><header className="px-5 py-6"><Link href="/" className="serif tracking-[.2em]">EMBER & IVORY</Link></header><div className="mx-auto max-w-3xl px-5 py-16"><Link href="/" className="flex items-center gap-2 text-xs uppercase tracking-[.15em]"><ArrowLeft size={14}/> Back</Link><p className="mt-12 text-xs uppercase tracking-[.3em] text-[#b9572b]">Reservations</p><h1 className="serif mt-4 text-6xl">Reserve your table.</h1><form onSubmit={submit} className="mt-12 grid gap-5 md:grid-cols-2">{[["name","Full Name","text"],["email","Email","email"],["phone","Phone","tel"],["guests","Guests","number"],["date","Date","date"],["time","Time","time"]].map(([id,label,type])=><label key={id} className="grid gap-2 text-xs uppercase tracking-[.12em]">{label}<input name={id} required id={id} type={type} min={type==="number"?"1":undefined} className="border border-black/15 bg-white/40 px-4 py-4 text-sm normal-case tracking-normal outline-none focus:border-[#b9572b]"/></label>)}<label className="grid gap-2 text-xs uppercase tracking-[.12em] md:col-span-2">Special Requests<textarea name="specialRequest" rows={5} className="border border-black/15 bg-white/40 px-4 py-4 text-sm normal-case tracking-normal outline-none focus:border-[#b9572b]"/></label>{error&&<p className="text-sm text-[#a33f1f] md:col-span-2">{error}</p>}<button disabled={loading} className="mt-3 flex items-center justify-center gap-3 bg-[#171513] px-6 py-5 text-xs uppercase tracking-[.18em] text-[#f5f0e6] disabled:opacity-50 md:col-span-2">{loading?"Submitting…":"Request Reservation"} <CalendarDays size={16}/></button></form></div></main>
}