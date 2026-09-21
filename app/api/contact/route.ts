import {NextResponse} from "next/server";
import {Resend} from "resend";
import {isValidEmail,required} from "@/lib/validation";
export async function POST(request:Request){
 const body=await request.json().catch(()=>null) as Record<string,unknown>|null;
 if(!body||typeof body.name!=="string"||typeof body.email!=="string"||typeof body.message!=="string"||!required(body.name)||!isValidEmail(body.email)||!required(body.message))
  return NextResponse.json({error:"Please provide a valid name, email, and message."},{status:400});
 if(!process.env.RESEND_API_KEY) return NextResponse.json({error:"Messaging service is not configured yet."},{status:503});
 const resend=new Resend(process.env.RESEND_API_KEY);
 const to=process.env.RESTAURANT_CONTACT_EMAIL||"";
 const from=process.env.RESEND_FROM_EMAIL||"";
 if(!to||!from) return NextResponse.json({error:"Messaging service is not configured yet."},{status:503});
 const {error}=await resend.emails.send({from,to:[to],replyTo:body.email as string,subject:`Website enquiry from ${body.name}`,text:`Name: ${body.name}\nEmail: ${body.email}\nPhone: ${typeof body.phone==="string"?body.phone:""}\n\n${body.message}`});
 if(error) return NextResponse.json({error:"Unable to send your message right now."},{status:502});
 return NextResponse.json({ok:true});
}