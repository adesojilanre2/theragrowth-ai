import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET() {
  const { data, error } = await supabase
    .from("theragrowth_leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ success: false, leads: [], error: error.message });
  }

  return NextResponse.json({ success: true, leads: data || [] });
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const { id, status, priority, follow_up_date, notes } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Missing lead ID." },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("theragrowth_leads")
      .update({
        status,
        priority,
        follow_up_date: follow_up_date || null,
        notes,
      })
      .eq("id", id);

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, message: "Server error." },
      { status: 500 }
    );
  }
}