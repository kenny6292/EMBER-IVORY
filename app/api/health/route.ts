import {NextResponse} from "next/server";

export async function GET(){
  return NextResponse.json({
    ok:true,
    service:"ember-and-ivory",
    backend:"pending-supabase",
    timestamp:new Date().toISOString()
  });
}
