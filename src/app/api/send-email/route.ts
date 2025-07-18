import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { email } = await req.json();

  try {
    await resend.emails.send({
  from: "onboarding@resend.dev", // Solo para pruebas
      to: email,
      subject: "¡Gracias por suscribirte!",
      html: `
        <h1>¡Gracias por suscribirte!</h1>
        <p>Estarás recibiendo noticias y actualizaciones pronto.</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    let errorMessage = "Unknown error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
