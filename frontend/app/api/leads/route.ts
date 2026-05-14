import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("theragrowth_leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message, leads: [] },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      leads: data || [],
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to load leads.",
        leads: [],
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const { id, status, priority, notes, follow_up_date } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Lead ID is required." },
        { status: 400 }
      );
    }

    const updates: Record<string, unknown> = {};

    if (status !== undefined) updates.status = status;
    if (priority !== undefined) updates.priority = priority;
    if (notes !== undefined) updates.notes = notes;
    if (follow_up_date !== undefined) updates.follow_up_date = follow_up_date;

    const { data, error } = await supabase
      .from("theragrowth_leads")
      .update(updates)
      .eq("id", id)
      .select();

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      lead: data?.[0],
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update lead.",
      },
      { status: 500 }
    );
  }
}