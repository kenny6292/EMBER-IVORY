import {NextResponse} from "next/server";
import {Resend} from "resend";
import {isValidEmail,required} from "@/lib/validation";
export async function POST(request:Request){
 const body=await request.json().catch(()=>null) as Record<string,unknown>|null;
 if(!body||typeof body.name!=="string"||typeof body.email!=="string"||typeof body.message!=="string"||!required(body.name)||body.name.length>100||!isValidEmail(body.email)||body.email.length>254||!required(body.message)||body.message.length>5000)
  return NextResponse.json({error:"Please provide valid contact details and a message."},{status:400});
 if(!process.env.RESEND_API_KEY||!process.env.RESTAURANT_CONTACT_EMAIL||!process.env.RESEND_FROM_EMAIL) return NextResponse.json({error:"Messaging service is not configured yet."},{status:503});
 const resend=new Resend(process.env.RESEND_API_KEY);
 const subject=typeof body.subject==="string"&&body.subject.length<=150?body.subject:"Website enquiry";
 const {error}=await resend.emails.send({from:process.env.RESEND_FROM_EMAIL,to:[process.env.RESTAURANT_CONTACT_EMAIL],replyTo:body.email as string,subject:`${subject} — ${body.name}`,text:`Name: ${body.name}\nEmail: ${body.email}\nPhone: ${typeof body.phone==="string"?body.phone:""}\nSubject: ${subject}\n\n${body.message}`});
 if(error) return NextResponse.json({error:"Unable to send your message right now."},{status:502});
 return NextResponse.json({ok:true});
}