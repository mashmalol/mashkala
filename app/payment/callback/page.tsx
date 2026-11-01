import { redirect } from "next/navigation";
import { getPendingPayment, verifyZarinpalPayment } from "@/lib/zarinpal";

export default async function PaymentCallbackPage({
  searchParams,
}: {
  searchParams: Promise<{ Status?: string; Authority?: string }>;
}) {
  const params = await searchParams;
  const status = params.Status ?? "";
  const authority = params.Authority ?? "";

  if (!authority) {
    redirect("/cart?payment=failed&reason=missing_authority");
  }

  if (status === "OK") {
    const pending = getPendingPayment(authority);
    const verification = await verifyZarinpalPayment({
      authority,
      amount: pending?.amount,
    });

    if (verification.success) {
      const refId = verification.refId ? `&ref_id=${encodeURIComponent(String(verification.refId))}` : "";
      redirect(`/cart?payment=success${refId}`);
    }

    redirect(`/cart?payment=failed&reason=${encodeURIComponent(verification.message ?? "verification_failed")}`);
  }

  redirect(`/cart?payment=failed&reason=${encodeURIComponent("payment_cancelled")}`);
}
