import {NextResponse} from "next/server";
import {createClient} from "@/lib/supabase/server";

export async function POST(request:Request){
  const {email,password}=await request.json().catch(()=>({}));
  if(typeof email!=="string"||typeof password!=="string"||!email||!password)
    return NextResponse.json({error:"Email and password are required."},{status:400});
  try{
    const supabase=await createClient();
    const {error}=await supabase.auth.signInWithPassword({email,password});
    if(error) return NextResponse.json({error:"Invalid email or password."},{status:401});
    return NextResponse.json({ok:true});
  }catch{
    return NextResponse.json({error:"Authentication is not configured yet."},{status:503});
  }
}