import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      phone,
      practice,
      website,
      challenge,
    } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("theragrowth_leads")
      .insert([
        {
          name,
          email,
          phone: phone || null,
          practice: practice || null,
          website: website || null,
          challenge: challenge || null,
          source: "audit",
          status: "New",
          priority: "Warm",
          notes: null,
        },
      ])
      .select();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      lead: data?.[0],
      message: "Audit request submitted successfully.",
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: "Something went wrong submitting the audit request.",
      },
      { status: 500 }
    );
  }
}