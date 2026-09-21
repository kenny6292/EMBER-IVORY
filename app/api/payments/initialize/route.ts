import {NextResponse} from "next/server";
export async function POST(request:Request){
 const secret=process.env.PAYSTACK_SECRET_KEY;
 if(!secret) return NextResponse.json({error:"Payment service is not configured."},{status:503});
 const body=await request.json().catch(()=>null) as {email?:unknown,amount?:unknown,reference?:unknown}|null;
 if(typeof body?.email!=="string"||typeof body.amount!=="number"||body.amount<=0||typeof body.reference!=="string")
  return NextResponse.json({error:"Invalid payment initialization request."},{status:400});
 const response=await fetch("https://api.paystack.co/transaction/initialize",{method:"POST",headers:{Authorization:`Bearer ${secret}`, "Content-Type":"application/json"},body:JSON.stringify({email:body.email,amount:Math.round(body.amount*100),reference:body.reference})});
 const data=await response.json();
 if(!response.ok||!data.status) return NextResponse.json({error:"Unable to initialize payment."},{status:502});
 return NextResponse.json({ok:true,data:data.data});
}