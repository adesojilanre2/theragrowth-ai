import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const owner_email = searchParams.get("owner_email");

  if (!owner_email) {
    return NextResponse.json({ leads: [] });
  }

  const { data, error } = await supabase
    .from("theragrowth_leads")
    .select("*")
    .eq("owner_email", owner_email)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ leads: [], error: error.message }, { status: 500 });
  }

  return NextResponse.json({ leads: data || [] });
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, owner_email, status, priority, notes, follow_up_date } = body;

    if (!id || !owner_email) {
      return NextResponse.json(
        { success: false, error: "Missing lead id or owner email." },
        { status: 400 }
      );
    }

    const updates: Record<string, string | null> = {};

    if (status !== undefined) updates.status = status;
    if (priority !== undefined) updates.priority = priority;
    if (notes !== undefined) updates.notes = notes;
    if (follow_up_date !== undefined) updates.follow_up_date = follow_up_date || null;

    const { data, error } = await supabase
      .from("theragrowth_leads")
      .update(updates)
      .eq("id", id)
      .eq("owner_email", owner_email)
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
      { success: false, error: "Lead update failed." },
      { status: 500 }
    );
  }
}