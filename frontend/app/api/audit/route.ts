import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const formspreeUrl = process.env.FORMSPREE_AUDIT_URL;

    if (!formspreeUrl) {
      return NextResponse.json(
        { success: false, message: "Formspree endpoint is not configured." },
        { status: 500 }
      );
    }

    const response = await fetch(formspreeUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        subject: "New TheraGrowth Free Audit Request",
        name: body.name || "",
        email: body.email || "",
        phone: body.phone || "",
        practice: body.practice || "",
        website: body.website || "",
        budget: body.budget || "Free Audit Only",
        challenge: body.challenge || "",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();

      return NextResponse.json(
        {
          success: false,
          message: `Formspree failed: ${errorText}`,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Audit request submitted successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Server error.",
      },
      { status: 500 }
    );
  }
}