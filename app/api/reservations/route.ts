import {NextResponse} from "next/server";
import {isValidEmail,positiveInteger,required} from "@/lib/validation";

export async function POST(request:Request){
  const body=await request.json().catch(()=>null) as Record<string,unknown>|null;
  if(!body||typeof body.name!=="string"||typeof body.email!=="string"||typeof body.phone!=="string"||typeof body.date!=="string"||typeof body.time!=="string"||typeof body.guests!=="number"||!required(body.name)||!isValidEmail(body.email)||!required(body.phone)||!required(body.date)||!required(body.time)||!positiveInteger(body.guests))
    return NextResponse.json({error:"Please provide valid reservation details."},{status:400});
  if(body.guests>50) return NextResponse.json({error:"Party size cannot exceed 50."},{status:400});
  return NextResponse.json({ok:false,error:"Reservation service is awaiting the dedicated Supabase database."},{status:503});
}