import crypto from "crypto";
import {NextResponse} from "next/server";

export async function POST(request:Request){
 const secret=process.env.PAYSTACK_SECRET_KEY;
 const dbReady=!!process.env.NEXT_PUBLIC_SUPABASE_URL&&!!process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!secret||!dbReady) return NextResponse.json({error:"Payment service is not ready for production orders."},{status:503});
 const body=await request.json().catch(()=>null) as {orderId?:unknown,email?:unknown}|null;
 if(typeof body?.orderId!=="string"||!crypto.randomUUID||typeof body.email!=="string"||!/^\S+@\S+\.\S+$/.test(body.email))
  return NextResponse.json({error:"A valid order ID and email are required."},{status:400});
 // The production implementation must load the order total from Supabase here.
 // Never accept amount or payment reference from the browser.
 return NextResponse.json({error:"Payment initialization is awaiting live order persistence."},{status:503});
}