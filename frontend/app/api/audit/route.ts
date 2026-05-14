import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { error } = await supabase.from("theragrowth_leads").insert([
      {
        name: body.name || "",
        email: body.email || "",
        phone: body.phone || "",
        practice: body.practice || "",
        website: body.website || "",
        budget: body.budget || "Free Audit Only",
        challenge: body.challenge || "",
        source: "free_audit",
        status: "New",
        priority: "Warm",
        notes: "",
      },
    ]);

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Request submitted successfully.",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Server error." },
      { status: 500 }
    );
  }
}