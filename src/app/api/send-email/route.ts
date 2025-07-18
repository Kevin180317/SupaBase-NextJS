import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  const { email } = await req.json();

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "¡Gracias por suscribirte!",
      html: `<h1>¡Gracias por suscribirte!</h1><p>Recibirás noticias pronto.</p>`,
    });

    await supabaseAdmin.from("email_logs").insert([
      {
        email,
        subject: "¡Gracias por suscribirte!",
        sent_at: new Date().toISOString(),
        status: "success",
        error_message: null,
      },
    ]);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    let errorMessage = "Unknown error";
    if (error instanceof Error) errorMessage = error.message;

    await supabaseAdmin.from("email_logs").insert([
      {
        email,
        subject: "¡Gracias por suscribirte!",
        sent_at: new Date().toISOString(),
        status: "error",
        error_message: errorMessage,
      },
    ]);

    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
