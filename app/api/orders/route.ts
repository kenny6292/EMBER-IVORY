import {NextResponse} from "next/server";
import {isValidEmail,positiveInteger,required} from "@/lib/validation";

export async function POST(request:Request){
 const body=await request.json().catch(()=>null) as Record<string,unknown>|null;
 const items=Array.isArray(body?.items)?body.items:[];
 if(!body||typeof body.name!=="string"||typeof body.email!=="string"||typeof body.phone!=="string"||!required(body.name)||!isValidEmail(body.email)||!required(body.phone)||!items.length)
  return NextResponse.json({error:"Valid customer details and at least one item are required."},{status:400});
 for(const item of items){
  if(!item||typeof item!=="object"||typeof (item as Record<string,unknown>).menuItemId!=="string"||typeof (item as Record<string,unknown>).quantity!=="number"||!positiveInteger((item as Record<string,unknown>).quantity as number))
   return NextResponse.json({error:"Invalid cart item."},{status:400});
 }
 return NextResponse.json({ok:false,error:"Order service is awaiting the dedicated Supabase database."},{status:503});
}