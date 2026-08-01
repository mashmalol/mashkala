"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { AuthCard } from "@/components/auth/AuthCard";
import { FormField } from "@/components/auth/FormField";
import { SocialButtons } from "@/components/auth/SocialButtons";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

interface FieldErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function RegisterForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const validate = (): FieldErrors => {
    const nextErrors: FieldErrors = {};
    if (!fullName.trim()) nextErrors.fullName = "لطفاً نام و نام خانوادگی خود را وارد کنید";

    if (!email.trim()) nextErrors.email = "لطفاً ایمیل خود را وارد کنید";
    else if (!EMAIL_PATTERN.test(email.trim())) nextErrors.email = "ایمیل وارد شده معتبر نیست";

    if (!password) nextErrors.password = "لطفاً رمز عبور خود را وارد کنید";
    else if (password.length < 6) nextErrors.password = "رمز عبور باید حداقل ۶ کاراکتر باشد";

    if (!confirmPassword) nextErrors.confirmPassword = "لطفاً تکرار رمز عبور را وارد کنید";
    else if (confirmPassword !== password) nextErrors.confirmPassword = "رمز عبور و تکرار آن یکسان نیستند";

    if (!acceptedTerms) nextErrors.terms = "برای ادامه باید قوانین و مقررات را بپذیرید";

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
      <AuthCard title="ثبت‌نام موفق" subtitle="خوش آمدید!" footer={null}>
        <div className="auth-success">
          <MaterialIcon name="check_circle" />
          <p>حساب کاربری شما با موفقیت ایجاد شد. (این یک محیط نمایشی است و حساب واقعی ایجاد نشد.)</p>
          <Link href="/" className="cart-continue-btn">
            بازگشت به فروشگاه
          </Link>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="ایجاد حساب کاربری"
      subtitle="برای خرید سریع‌تر و پیگیری سفارش‌ها ثبت‌نام کنید"
      footer={
        <span>
          قبلاً ثبت‌نام کرده‌اید؟ <Link href="/login">وارد شوید</Link>
        </span>
      }
    >
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <FormField
          label="نام و نام خانوادگی"
          type="text"
          autoComplete="name"
          value={fullName}
          error={errors.fullName}
          onChange={(event) => setFullName(event.target.value)}
        />

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
          autoComplete="new-password"
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

        <FormField
          label="تکرار رمز عبور"
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          value={confirmPassword}
          error={errors.confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />

        <div className="auth-form-row">
          <label className="auth-checkbox">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(event) => setAcceptedTerms(event.target.checked)}
            />
            <span>
              <Link href="#" onClick={(event) => event.stopPropagation()}>
                قوانین و مقررات
              </Link>{" "}
              فروشگاه را می‌پذیرم
            </span>
          </label>
        </div>
        {errors.terms ? (
          <p className="form-field-error" role="alert">
            {errors.terms}
          </p>
        ) : null}

        <button type="submit" className="auth-submit-btn" disabled={status === "loading"}>
          {status === "loading" ? (
            <>
              <span className="spinner" aria-hidden="true" />
              در حال ثبت‌نام...
            </>
          ) : (
            "ثبت‌نام"
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
