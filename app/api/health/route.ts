import {NextResponse} from "next/server";
export async function GET(){
 return NextResponse.json({ok:true,service:"ember-and-ivory",checks:{database:!!process.env.NEXT_PUBLIC_SUPABASE_URL,payments:!!process.env.PAYSTACK_SECRET_KEY,email:!!process.env.RESEND_API_KEY},timestamp:new Date().toISOString()});
}