import { NextResponse } from "next/server";
import { verifyZarinpalPayment } from "@/lib/zarinpal";

export async function POST(request: Request) {
  try {
    const { authority, amount } = await request.json();

    const verification = await verifyZarinpalPayment({
      authority: String(authority ?? ""),
      amount: Number(amount ?? 0),
    });

    if (!verification.success) {
      return NextResponse.json(verification, { status: 400 });
    }

    return NextResponse.json(verification);
  } catch (error) {
    const message = error instanceof Error ? error.message : "خطا در اعتبارسنجی پرداخت";
    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status: 400 },
    );
  }
}
