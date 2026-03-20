import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { fullName, email, phone, message, to } = body;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_URL,
                pass: process.env.EMAIL_SECRET_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_URL,
            to: to,
            replyTo: email,
            subject: `New Inquiry from ${fullName}`,
            html: `
                <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
                    <h2 style="color: #a68258;">New Travel Inquiry</h2>
                    <p><strong>Full Name:</strong> ${fullName}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Phone:</strong> ${phone}</p>
                    <p style="margin-top: 20px;"><strong>Message:</strong></p>
                    <div style="background: #f9f9f9; padding: 15px; border-radius: 5px;">
                        ${message}
                    </div>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: "Success" }, { status: 200 });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json(
            { error: "Failed to send email" },
            { status: 500 },
        );
    }
}
