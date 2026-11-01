# Zarinpal Payment Gateway Integration Skill

This skill guides you through integrating Zarinpal's payment gateway into a small ecommerce website, primarily targeting Iranian customers. Zarinpal is a popular Iranian payment service that allows online payments via Shetab bank cards. The integration follows a standard **request → redirect → verify** workflow using Zarinpal's RESTful web services.

## Prerequisites

- A **merchant ID** (a 36-character UUID) obtained from your Zarinpal panel. For sandbox testing, you can use any arbitrary UUID.
- A publicly accessible **callback URL** on your website where Zarinpal will redirect the user after payment.
- Your server must support HTTPS (Zarinpal uses SSL, and it is recommended for your callback URL as well).
- Amounts are always in **Rials** (not Tomans) unless explicitly specified otherwise.

## Core Workflow

1. **Payment Request** – Your server sends order details to Zarinpal and receives an `authority` token.
2. **Redirect User** – Redirect the customer to Zarinpal's payment page using the `authority`.
3. **Callback & Verification** – After payment, Zarinpal redirects the user back to your `callback_url`. Your server must **verify** the transaction using the `authority` and the original `amount`.

## API Endpoints (Production)

| Step | Endpoint | Method |
|------|----------|--------|
| Request | `https://api.zarinpal.com/pg/v4/payment/request.json` | POST |
| Verify | `https://api.zarinpal.com/pg/v4/payment/verify.json` | POST |
| Redirect (StartPay) | `https://www.zarinpal.com/pg/StartPay/{authority}` | GET (redirect) |

For **sandbox** testing, replace the base domain `api.zarinpal.com` with `sandbox.zarinpal.com` and `www.zarinpal.com` with `sandbox.zarinpal.com`. Sandbox authorities start with the letter `S`[reference:0].

## Step 1: Payment Request

Send a POST request to the request endpoint with the following JSON payload[reference:1]:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `merchant_id` | String | Yes | Your 36-character merchant ID. |
| `amount` | Integer | Yes | Transaction amount in Rials. Minimum is 10,000 Rials. |
| `description` | String | Yes | A short description of the order. |
| `callback_url` | String | Yes | The URL where the user returns after payment. |
| `metadata` | Object | No | Can include `mobile` and `email` of the buyer. |

**Example (cURL):**

```bash
curl -X POST https://api.zarinpal.com/pg/v4/payment/request.json \
  -H "Content-Type: application/json" \
  -d '{
    "merchant_id": "YOUR_MERCHANT_ID",
    "amount": 50000,
    "description": "Order #1234",
    "callback_url": "https://your-site.com/payment/callback"
  }'
Successful response:

json
{
  "data": {
    "code": 100,
    "authority": "A000000000000000000000000000000000123"
  }
}
If code is 100, extract the authority and proceed to redirect the user.

Step 2: Redirect User to Payment Page
Construct the payment URL by appending the authority to:

text
https://www.zarinpal.com/pg/StartPay/{authority}
Redirect the customer's browser to this URL (e.g., using window.location.href on the frontend or an HTTP redirect from your server).

Step 3: Callback and Verification
After the user completes or cancels the payment, Zarinpal redirects them to your callback_url with query string parameters:

Authority – The same authority token.

Status – Either OK (successful) or NOK (failed/cancelled).

Important: You must only verify if Status === 'OK'. If NOK, treat the order as failed or cancelled.

To verify, send a POST request to the verify endpoint with:

Parameter	Type	Required	Description
merchant_id	String	Yes	Your merchant ID.
amount	Integer	Yes	The original amount in Rials (must match the request).
authority	String	Yes	The authority from the query string.
Example (cURL):

bash
curl -X POST https://api.zarinpal.com/pg/v4/payment/verify.json \
  -H "Content-Type: application/json" \
  -d '{
    "merchant_id": "YOUR_MERCHANT_ID",
    "amount": 50000,
    "authority": "A000000000000000000000000000000000123"
  }'
Successful verification response:

json
{
  "data": {
    "code": 100,
    "ref_id": 123456789,
    "card_pan": "6037****1234",
    "fee": 1000
  }
}
code === 100 → payment verified successfully. Use ref_id as the transaction reference.

code === 101 → payment was already verified (idempotent case). Treat as success.

Any other code → verification failed; handle the error accordingly.

Code Examples
Node.js (using zarinpal-node-sdk)
javascript
import { ZarinPal } from 'zarinpal-node-sdk';

const zarinpal = new ZarinPal({
  merchantId: 'your-merchant-id',
  sandbox: true, // set to false in production
});

// Step 1: Request payment
async function requestPayment(amount, callbackUrl) {
  const response = await zarinpal.payments.create({
    amount,
    callback_url: callbackUrl,
    description: 'Test order',
  });
  if (response.data.code === 100) {
    return response.data.authority;
  }
  throw new Error('Payment request failed');
}

// Step 3: Verify payment
async function verifyPayment(authority, amount) {
  const response = await zarinpal.verifications.verify({ amount, authority });
  if (response.data.code === 100) {
    console.log('Payment verified. Ref ID:', response.data.ref_id);
    return true;
  }
  if (response.data.code === 101) {
    console.log('Payment already verified.');
    return true;
  }
  return false;
}
PHP (using zarinpal-checkout or similar)
php
$zarinpal = new Zarinpal('YOUR_MERCHANT_ID');
$zarinpal->enableSandbox(); // disable in production

// Step 1: Request
$result = $zarinpal->request([
    'Amount' => 50000,
    'CallbackURL' => 'https://your-site.com/callback',
    'Description' => 'Order #1234',
]);
if ($result['data']['code'] === 100) {
    $authority = $result['data']['authority'];
    // Step 2: Redirect
    header('Location: https://www.zarinpal.com/pg/StartPay/' . $authority);
    exit;
}

// Step 3: Verify (in your callback handler)
$verify = $zarinpal->verify([
    'Amount' => 50000,
    'Authority' => $_GET['Authority'],
]);
if ($verify['data']['code'] === 100) {
    // Payment successful; save $verify['data']['ref_id']
}
Sandbox Testing
To test without real money, use the sandbox environment:

Change request URL to https://sandbox.zarinpal.com/pg/v4/payment/request.json.

Change verify URL to https://sandbox.zarinpal.com/pg/v4/payment/verify.json.

Redirect to https://sandbox.zarinpal.com/pg/StartPay/{authority}.

For merchant_id, you can use any arbitrary UUID (e.g., generate one at uuidgenerator.net).

Sandbox authorities start with the letter S.

Error Handling & Important Notes
Never verify without checking Status === 'OK' in the callback. If Status is NOK, the payment failed or was cancelled; do not call verify.

Amounts must be in Rials. If your store prices in Tomans, multiply by 10. Minimum amount is 10,000 Rials (1,000 Tomans).

Idempotency: If you call verify again after a successful verification, Zarinpal returns code 101. This is normal; you should treat it as already verified.

Store the authority in your database when you receive it so you can match it later during verification.

Use HTTPS for your callback URL. Zarinpal recommends it, and it protects your users.

Do not trust client‑side data – always verify the amount and authority on your server using the original order record.

Test thoroughly in sandbox before switching to production.

Quick Reference (Production vs. Sandbox)
Component	Production	Sandbox
Request endpoint	api.zarinpal.com/pg/v4/payment/request.json	sandbox.zarinpal.com/pg/v4/payment/request.json
Verify endpoint	api.zarinpal.com/pg/v4/payment/verify.json	sandbox.zarinpal.com/pg/v4/payment/verify.json
StartPay redirect	www.zarinpal.com/pg/StartPay/{authority}	sandbox.zarinpal.com/pg/StartPay/{authority}
Merchant ID	Your real 36‑char ID	Any UUID (e.g., 123e4567-e89b-12d3-a456-426614174000)
Authority prefix	A	S
References
Zarinpal Payment Gateway Documentation (Persian): https://www.zarinpal.com/docs/paymentGateway

Sandbox Service: https://www.zarinpal.com/docs/paymentGateway/sandBox

Node.js SDK Verify Example: https://www.zarinpal.com/docs/sdk/nodejs/method/verify.html

Integration Guide (Next): https://next.zarinpal.com/paymentGateway/guide/

text

This `skill.md` file can be placed in your repository (e.g., under `docs/`) to guide developers through the Zarinpal integration. It distills the official Persian documentation into a practical, step‑by‑step English reference with code snippets for common backend languages.

