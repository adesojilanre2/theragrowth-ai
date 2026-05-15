import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = body.name || "";
    const email = body.email || "";
    const phone = body.phone || "";
    const practice = body.practice || "";
    const website = body.website || "";
    const challenge = body.challenge || "";
    const budget = body.budget || "Free Audit Only";
    const user_id = body.user_id || null;
    const owner_email = body.owner_email || null;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: "Name and email are required." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("theragrowth_leads")
      .insert([
        {
          user_id,
          owner_email,
          name,
          email,
          phone,
          practice,
          website,
          challenge,
          budget,
          source: "free_audit",
          status: "New",
          priority: "Warm",
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, lead: data });
  } catch {
    return NextResponse.json(
      { success: false, error: "Audit submission failed." },
      { status: 500 }
    );
  }
}