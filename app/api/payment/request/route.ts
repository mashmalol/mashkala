import { NextResponse } from "next/server";
import { createZarinpalPayment } from "@/lib/zarinpal";

export async function POST(request: Request) {
  try {
    const { amount, description, callbackUrl, orderId } = await request.json();
    const normalizedAmount = Number(amount ?? 0);
    const normalizedDescription = typeof description === "string" && description.trim()
      ? description.trim()
      : "سفارش از فروشگاه";
    const normalizedCallbackUrl =
      typeof callbackUrl === "string" && callbackUrl.trim() ? callbackUrl.trim() : `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/payment/callback`;
    const normalizedOrderId = typeof orderId === "string" && orderId.trim() ? orderId.trim() : `order-${Date.now()}`;

    const payment = await createZarinpalPayment({
      amount: normalizedAmount,
      description: normalizedDescription,
      callbackUrl: normalizedCallbackUrl,
      orderId: normalizedOrderId,
    });

    return NextResponse.json({
      success: true,
      ...payment,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "خطا در ایجاد تراکنش";
    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status: 400 },
    );
  }
}
