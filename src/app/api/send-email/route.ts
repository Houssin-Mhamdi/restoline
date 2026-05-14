import { NextResponse } from "next/server"

interface EmailPayload {
  to: string
  guestName: string
  tableNumber: number
  date: string
  time: string
  guests: number
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

export async function POST(request: Request) {
  try {
    const body: EmailPayload = await request.json()
    const { to, guestName, tableNumber, date, time, guests } = body

    if (!to || !guestName) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400, headers: corsHeaders })
    }

    const transporter = await getTransporter()
    if (!transporter) {
      console.log("--- EMAIL NOT SENT (SMTP not configured) ---")
      console.log(`To: ${to}`)
      console.log(`Subject: Reservation Accepted - Table ${tableNumber}`)
      console.log(`Body: Dear ${guestName}, your reservation for Table ${tableNumber} on ${date} at ${time} for ${guests} guests has been confirmed.`)
      console.log("--- END ---")
      return NextResponse.json({ success: true, sent: false, reason: "SMTP not configured" }, { headers: corsHeaders })
    }

    await transporter.sendMail({
      from: process.env.SMTP_FROM || "noreply@restocms.com",
      to,
      subject: `Reservation Accepted - Table ${tableNumber}`,
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px;background:#131313;color:#e5e2e1;border:1px solid #4e4639;">
          <h1 style="color:#e9c176;font-size:24px;margin-bottom:16px;">Reservation Confirmed</h1>
          <p>Dear ${guestName},</p>
          <p>Your reservation has been accepted! We look forward to welcoming you.</p>
          <table style="width:100%;border-collapse:collapse;margin:16px 0;">
            <tr><td style="padding:8px;border:1px solid #4e4639;color:#d1c5b4;">Table</td><td style="padding:8px;border:1px solid #4e4639;font-weight:600;">${tableNumber}</td></tr>
            <tr><td style="padding:8px;border:1px solid #4e4639;color:#d1c5b4;">Date</td><td style="padding:8px;border:1px solid #4e4639;font-weight:600;">${date}</td></tr>
            <tr><td style="padding:8px;border:1px solid #4e4639;color:#d1c5b4;">Time</td><td style="padding:8px;border:1px solid #4e4639;font-weight:600;">${time}</td></tr>
            <tr><td style="padding:8px;border:1px solid #4e4639;color:#d1c5b4;">Guests</td><td style="padding:8px;border:1px solid #4e4639;font-weight:600;">${guests}</td></tr>
          </table>
          <p>We are waiting for you on that day!</p>
          <p style="color:#d1c5b4;font-size:12px;">— RestoCMS</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true, sent: true }, { headers: corsHeaders })
  } catch (err) {
    console.error("Email send error:", err)
    return NextResponse.json({ success: false, error: "Failed to send email" }, { status: 500, headers: corsHeaders })
  }
}

async function getTransporter() {
  try {
    const nodemailer = await import("nodemailer")
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
      return null
    }

    return nodemailer.createTransport({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT || "587"),
      secure: SMTP_PORT === "465",
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    })
  } catch {
    return null
  }
}
