"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { AuthCard } from "@/components/auth/AuthCard";
import { FormField } from "@/components/auth/FormField";
import { SocialButtons } from "@/components/auth/SocialButtons";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

interface FieldErrors {
  email?: string;
  password?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const validate = (): FieldErrors => {
    const nextErrors: FieldErrors = {};
    if (!email.trim()) nextErrors.email = "لطفاً ایمیل خود را وارد کنید";
    else if (!EMAIL_PATTERN.test(email.trim())) nextErrors.email = "ایمیل وارد شده معتبر نیست";

    if (!password) nextErrors.password = "لطفاً رمز عبور خود را وارد کنید";
    else if (password.length < 6) nextErrors.password = "رمز عبور باید حداقل ۶ کاراکتر باشد";

    return nextErrors;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("loading");
    window.setTimeout(() => setStatus("success"), 1200);
  };

  if (status === "success") {
    return (
      <AuthCard title="ورود موفق" subtitle="خوش آمدید!" footer={null}>
        <div className="auth-success">
          <MaterialIcon name="check_circle" />
          <p>ورود شما با موفقیت انجام شد. (این یک محیط نمایشی است و حساب کاربری واقعی ایجاد نشد.)</p>
          <Link href="/" className="cart-continue-btn">
            بازگشت به فروشگاه
          </Link>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="ورود به حساب کاربری"
      subtitle="برای مشاهده سفارش‌ها و تکمیل خرید وارد شوید"
      footer={
        <span>
          حساب کاربری ندارید؟ <Link href="/register">ثبت‌نام کنید</Link>
        </span>
      }
    >
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <FormField
          label="ایمیل"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          error={errors.email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <FormField
          label="رمز عبور"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          value={password}
          error={errors.password}
          onChange={(event) => setPassword(event.target.value)}
          trailing={
            <button
              type="button"
              className="form-field-toggle"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? "پنهان کردن رمز عبور" : "نمایش رمز عبور"}
            >
              <MaterialIcon name={showPassword ? "visibility_off" : "visibility"} />
            </button>
          }
        />

        <div className="auth-form-row">
          <label className="auth-checkbox">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
            />
            مرا به خاطر بسپار
          </label>
          <a href="#" className="auth-form-link">
            رمز عبور را فراموش کرده‌اید؟
          </a>
        </div>

        <button type="submit" className="auth-submit-btn" disabled={status === "loading"}>
          {status === "loading" ? (
            <>
              <span className="spinner" aria-hidden="true" />
              در حال ورود...
            </>
          ) : (
            "ورود"
          )}
        </button>
      </form>

      <div className="auth-divider">
        <span>یا</span>
      </div>

      <SocialButtons />
    </AuthCard>
  );
}
