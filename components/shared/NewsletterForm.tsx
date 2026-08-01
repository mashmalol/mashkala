"use client";

import { useId, useState, type FormEvent } from "react";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface NewsletterFormProps {
  variant?: "footer" | "inline";
}

type Status = "idle" | "error" | "loading" | "success";

/**
 * A single, reusable newsletter subscription form used both in the footer
 * and on the blog article page. Handles its own validation, focus styling,
 * and submit/loading/success states so both call sites stay consistent.
 */
export function NewsletterForm({ variant = "footer" }: NewsletterFormProps) {
  const inputId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = email.trim();

    if (!trimmed) {
      setStatus("error");
      setErrorMessage("لطفاً ایمیل خود را وارد کنید");
      return;
    }
    if (!EMAIL_PATTERN.test(trimmed)) {
      setStatus("error");
      setErrorMessage("ایمیل وارد شده معتبر نیست");
      return;
    }

    setStatus("loading");
    setErrorMessage(null);
    window.setTimeout(() => {
      setStatus("success");
    }, 900);
  };

  if (status === "success") {
    return (
      <div className={`newsletter-form newsletter-form--${variant} newsletter-form--success`}>
        <MaterialIcon name="check_circle" />
        <span>با تشکر! ایمیل شما با موفقیت در خبرنامه ثبت شد.</span>
      </div>
    );
  }

  return (
    <form
      className={`newsletter-form newsletter-form--${variant}${
        status === "error" ? " newsletter-form--invalid" : ""
      }`}
      onSubmit={handleSubmit}
      noValidate
    >
      <label htmlFor={inputId} className="sr-only">
        ایمیل برای عضویت در خبرنامه
      </label>
      <div className="newsletter-form-field">
        <input
          id={inputId}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="ایمیل خود را وارد کنید"
          value={email}
          disabled={status === "loading"}
          aria-invalid={status === "error"}
          aria-describedby={status === "error" ? `${inputId}-error` : undefined}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status === "error") setStatus("idle");
          }}
        />
        <button type="submit" disabled={status === "loading"} aria-label="عضویت در خبرنامه">
          {status === "loading" ? (
            <span className="spinner" aria-hidden="true" />
          ) : (
            <MaterialIcon name="check_circle" />
          )}
        </button>
      </div>
      {status === "error" && errorMessage ? (
        <p id={`${inputId}-error`} className="newsletter-form-error" role="alert">
          {errorMessage}
        </p>
      ) : null}
    </form>
  );
}
