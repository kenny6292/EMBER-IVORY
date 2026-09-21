import {NextResponse} from "next/server";
import {isValidEmail,positiveInteger,required} from "@/lib/validation";

export async function POST(request:Request){
 const body=await request.json().catch(()=>null) as Record<string,unknown>|null;
 const items=Array.isArray(body?.items)?body.items:[];
 const orderType=body?.orderType;
 if(!body||typeof body.name!=="string"||typeof body.email!=="string"||typeof body.phone!=="string"||!required(body.name)||!isValidEmail(body.email)||!required(body.phone)||!items.length||items.length>50)
  return NextResponse.json({error:"Valid customer details and 1–50 cart items are required."},{status:400});
 if(orderType!=="pickup"&&orderType!=="delivery") return NextResponse.json({error:"Choose pickup or delivery."},{status:400});
 if(orderType==="delivery"&&(typeof body.deliveryAddress!=="string"||!required(body.deliveryAddress))) return NextResponse.json({error:"A delivery address is required."},{status:400});
 for(const item of items){
  const value=item as Record<string,unknown>;
  if(!item||typeof item!=="object"||typeof value.menuItemId!=="string"||typeof value.quantity!=="number"||!positiveInteger(value.quantity)||value.quantity>20)
   return NextResponse.json({error:"Invalid cart item or quantity."},{status:400});
 }
 return NextResponse.json({ok:false,error:"Order service is awaiting the dedicated Supabase database."},{status:503});
}