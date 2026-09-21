import crypto from "crypto";
import {NextResponse} from "next/server";

export async function POST(request:Request){
 const secret=process.env.PAYSTACK_SECRET_KEY;
 if(!secret) return NextResponse.json({error:"Payment service is not configured."},{status:503});
 const signature=request.headers.get("x-paystack-signature");
 const raw=await request.text();
 const expected=crypto.createHmac("sha512",secret).update(raw).digest("hex");
 if(!signature||signature.length!==expected.length||!crypto.timingSafeEqual(Buffer.from(signature,"utf8"),Buffer.from(expected,"utf8")))
  return NextResponse.json({error:"Invalid signature."},{status:401});
 let event:Record<string,unknown>;
 try{event=JSON.parse(raw) as Record<string,unknown>}catch{return NextResponse.json({error:"Invalid webhook payload."},{status:400});}
 if(typeof event.event!=="string") return NextResponse.json({error:"Invalid webhook event."},{status:400});
 return NextResponse.json({received:true});
}