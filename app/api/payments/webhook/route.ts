import crypto from "crypto";
import {NextResponse} from "next/server";
export async function POST(request:Request){
 const secret=process.env.PAYSTACK_SECRET_KEY;
 if(!secret) return NextResponse.json({error:"Payment service is not configured."},{status:503});
 const signature=request.headers.get("x-paystack-signature");
 const raw=await request.text();
 const expected=crypto.createHmac("sha512",secret).update(raw).digest("hex");
 if(!signature||!crypto.timingSafeEqual(Buffer.from(signature),Buffer.from(expected))) return NextResponse.json({error:"Invalid signature."},{status:401});
 const event=JSON.parse(raw);
 return NextResponse.json({received:true,event:event.event});
}