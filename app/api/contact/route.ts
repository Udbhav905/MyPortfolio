import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message } = await req.json();

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // Create transporter using Gmail (or any SMTP)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,      // your Gmail address
        pass: process.env.GMAIL_APP_PASS,  // Gmail App Password (not your login password)
      },
    });

    // Email sent TO you (the portfolio owner)
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER, // sends to yourself
      replyTo: email,             // so you can just hit Reply to respond
      subject: `📬 New Contact from ${name}`,
      html: `
        <div style="font-family: 'Courier New', monospace; background: #0B0E14; color: #EDF2F7; padding: 32px; border-radius: 8px; border: 1px solid #222936;">
          <h2 style="color: #3B82F6; font-size: 20px; margin: 0 0 24px; letter-spacing: 2px; text-transform: uppercase;">
            New Message from Portfolio
          </h2>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #222936; color: #5A6E85; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; width: 120px;">Name</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #222936; color: #EDF2F7; font-size: 14px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #222936; color: #5A6E85; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #222936;">
                <a href="mailto:${email}" style="color: #3B82F6; text-decoration: none; font-size: 14px;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #222936; color: #5A6E85; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Phone</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #222936; color: #EDF2F7; font-size: 14px;">${phone || '—'}</td>
            </tr>
          </table>

          <div style="margin-top: 24px;">
            <p style="color: #5A6E85; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 10px;">Message</p>
            <div style="background: #121720; border: 1px solid #222936; padding: 16px; color: #A0AEC0; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${message}</div>
          </div>

          <p style="margin-top: 24px; color: #5A6E85; font-size: 11px;">
            Sent from your portfolio contact form • Hit reply to respond directly to ${name}
          </p>
        </div>
      `,
    });

    // Optional: auto-reply to the person who messaged you
    await transporter.sendMail({
      from: `"Udbhav Prajapati" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `Got your message, ${name.split(' ')[0]}! 👋`,
      html: `
        <div style="font-family: 'Courier New', monospace; background: #0B0E14; color: #EDF2F7; padding: 32px; border-radius: 8px; border: 1px solid #222936;">
          <h2 style="color: #3B82F6; font-size: 20px; margin: 0 0 16px; letter-spacing: 2px; text-transform: uppercase;">
            Thanks for reaching out!
          </h2>
          <p style="color: #A0AEC0; font-size: 14px; line-height: 1.7; margin: 0 0 16px;">
            Hey ${name.split(' ')[0]}, I received your message and will get back to you as soon as possible.
          </p>
          <p style="color: #5A6E85; font-size: 12px; margin: 0;">— Udbhav Prajapati</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}