import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 📩 EMAIL TO YOU
    await transporter.sendMail({
      from: `"TheraGrowth AI" <${process.env.SMTP_USER}>`,
      to: process.env.LEAD_NOTIFY_EMAIL,
      subject: "🔥 New Lead - TheraGrowth",
      html: `
        <h2>New Lead</h2>
        <p><b>Name:</b> ${body.name}</p>
        <p><b>Email:</b> ${body.email}</p>
        <p><b>Phone:</b> ${body.phone}</p>
        <p><b>Practice:</b> ${body.practice}</p>
        <p><b>Website:</b> ${body.website}</p>
        <p><b>Budget:</b> ${body.budget}</p>
        <p><b>Challenge:</b> ${body.challenge}</p>
      `,
    });

    // 📩 AUTO RESPONSE TO CLIENT
    await transporter.sendMail({
      from: `"TheraGrowth AI" <${process.env.SMTP_USER}>`,
      to: body.email,
      subject: "We received your request",
      html: `
        <h2>You're in 🚀</h2>
        <p>Hi ${body.name},</p>
        <p>We received your audit request.</p>
        <p>Our team will contact you shortly.</p>
        <br/>
        <p><b>TheraGrowth AI</b></p>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    return Response.json(
      { success: false, message: "Email failed" },
      { status: 500 }
    );
  }
}