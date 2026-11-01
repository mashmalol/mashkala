const PAYMENT_STORE = new Map<string, { amount: number; orderId: string; createdAt: number }>();

export type PendingPaymentRecord = {
  amount: number;
  orderId: string;
  createdAt: number;
};

function getMerchantId(): string {
  return process.env.ZARINPAL_MERCHANT_ID ?? "00000000-0000-0000-0000-000000000000";
}

function isSandboxMode(): boolean {
  return (process.env.ZARINPAL_MODE ?? "sandbox").toLowerCase() === "sandbox";
}

function getRequestBaseUrl(): string {
  return isSandboxMode()
    ? "https://sandbox.zarinpal.com/pg/v4"
    : "https://api.zarinpal.com/pg/v4";
}

function getRedirectBaseUrl(): string {
  return isSandboxMode()
    ? "https://sandbox.zarinpal.com/pg/StartPay/"
    : "https://www.zarinpal.com/pg/StartPay/";
}

export function getPendingPayment(authority: string): PendingPaymentRecord | undefined {
  return PAYMENT_STORE.get(authority.trim());
}

export function clearPendingPayment(authority: string): void {
  PAYMENT_STORE.delete(authority.trim());
}

export async function createZarinpalPayment({
  amount,
  description,
  callbackUrl,
  orderId,
}: {
  amount: number;
  description: string;
  callbackUrl: string;
  orderId: string;
}) {
  const merchantId = getMerchantId();
  const normalizedAmount = Math.round(Number(amount) || 0);

  if (!merchantId || normalizedAmount < 10000) {
    throw new Error("Zarinpal payment request is invalid: amount and merchant ID are required.");
  }

  const response = await fetch(`${getRequestBaseUrl()}/payment/request.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      merchant_id: merchantId,
      amount: normalizedAmount,
      description,
      callback_url: callbackUrl,
      metadata: { order_id: orderId },
    }),
  });

  const payload = (await response.json()) as {
    data?: { code?: number; authority?: string };
    errors?: Array<{ code?: string; message?: string }>;
  };

  const code = Number(payload?.data?.code ?? 0);
  const authority = payload?.data?.authority;

  if (!response.ok || code !== 100 || !authority) {
    const message = payload?.errors?.[0]?.message ?? "Payment request failed";
    throw new Error(message);
  }

  PAYMENT_STORE.set(authority, {
    amount: normalizedAmount,
    orderId,
    createdAt: Date.now(),
  });

  return {
    authority,
    redirectUrl: `${getRedirectBaseUrl()}${authority}`,
    merchantId,
    isSandbox: isSandboxMode(),
  };
}

export async function verifyZarinpalPayment({
  authority,
  amount,
}: {
  authority: string;
  amount?: number;
}) {
  const merchantId = getMerchantId();
  const pending = getPendingPayment(authority);
  const resolvedAmount = Number(amount ?? pending?.amount ?? 0);

  if (!merchantId || !authority || resolvedAmount <= 0) {
    return {
      success: false,
      code: 0,
      message: "Missing authority or amount for verification.",
    };
  }

  const response = await fetch(`${getRequestBaseUrl()}/payment/verify.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      merchant_id: merchantId,
      authority,
      amount: Math.round(resolvedAmount),
    }),
  });

  const payload = (await response.json()) as {
    data?: { code?: number; ref_id?: string | number; fee?: number; card_pan?: string };
    errors?: Array<{ code?: string; message?: string }>;
  };

  const code = Number(payload?.data?.code ?? 0);
  const refId = payload?.data?.ref_id;

  if (code === 100 || code === 101) {
    clearPendingPayment(authority);
    return {
      success: true,
      code,
      refId,
      message: code === 101 ? "Payment already verified." : "Payment verified successfully.",
    };
  }

  return {
    success: false,
    code,
    message: payload?.errors?.[0]?.message ?? "Verification failed.",
  };
}
