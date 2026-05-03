import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      phone,
      practice,
      website,
      budget,
      challenge,
    } = body;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: "Name and email are required." },
        { status: 400 }
      );
    }

    const formspreeUrl = process.env.FORMSPREE_AUDIT_URL;

    if (!formspreeUrl) {
      return NextResponse.json(
        { success: false, message: "Formspree endpoint is not configured." },
        { status: 500 }
      );
    }

    const formspreeResponse = await fetch(formspreeUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        subject: "New TheraGrowth Free Audit Request",
        name,
        email,
        phone,
        practice,
        website,
        budget,
        challenge,
      }),
    });

    if (!formspreeResponse.ok) {
      return NextResponse.json(
        { success: false, message: "Formspree email service failed." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Audit request submitted successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error." },
      { status: 500 }
    );
  }
}