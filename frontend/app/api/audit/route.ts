import nodemailer from "nodemailer";

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

    if (!name || !email || !phone || !practice) {
      return Response.json(
        { success: false, message: "Missing required fields." },
        { status: 400 }
      );
    }

    const requiredEnv = [
      "SMTP_HOST",
      "SMTP_PORT",
      "SMTP_USER",
      "SMTP_PASS",
      "LEAD_NOTIFY_EMAIL",
    ];

    for (const key of requiredEnv) {
      if (!process.env[key]) {
        return Response.json(
          { success: false, message: `${key} is not configured.` },
          { status: 500 }
        );
      }
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 1. EMAIL TO YOU
    await transporter.sendMail({
      from: `"TheraGrowth AI" <${process.env.SMTP_USER}>`,
      to: process.env.LEAD_NOTIFY_EMAIL,
      replyTo: email,
      subject: "🔥 New Lead - TheraGrowth",
      html: `
        <h2>New TheraGrowth Lead</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Practice:</b> ${practice}</p>
        <p><b>Website:</b> ${website || "Not provided"}</p>
        <p><b>Budget / Interest:</b> ${budget || "Free Audit Only"}</p>
        <p><b>Challenge:</b> ${challenge || "Not provided"}</p>

        <hr/>

        <h3>Money Mode Follow-Up Script</h3>
        <p>Hi ${name}, thanks for requesting your free practice growth audit.</p>
        <p>I reviewed your request and the main goal is to help your practice capture more private-pay leads and convert them into booked consultations.</p>
        <p>The next step is a quick growth review where we identify what is leaking leads from your website, follow-up, offer, and booking flow.</p>
      `,
    });

    // 2. EMAIL TO THE LEAD
    await transporter.sendMail({
      from: `"TheraGrowth AI" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "We received your TheraGrowth audit request 🚀",
      html: `
        <h2>Thanks for reaching out, ${name}</h2>

        <p>We received your free practice growth audit request.</p>

        <p>We’ll review your practice details and look at how your website, lead capture, and follow-up system can convert more visitors into booked consultations.</p>

        <h3>What happens next?</h3>
        <ul>
          <li>We review your website and offer.</li>
          <li>We identify where leads may be dropping off.</li>
          <li>We send you practical recommendations.</li>
          <li>If it makes sense, we’ll show you how TheraGrowth AI can help you capture and follow up with more leads.</li>
        </ul>

        <p>Best,<br/>TheraGrowth AI</p>
      `,
    });

    return Response.json({
      success: true,
      message: "Request submitted successfully.",
    });
  } catch (error) {
    console.error("AUDIT ROUTE ERROR:", error);

    return Response.json(
      {
        success: false,
        message: "Server error.",
      },
      { status: 500 }
    );
  }
}