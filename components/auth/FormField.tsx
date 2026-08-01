"use client";

import { useId, type InputHTMLAttributes, type ReactNode } from "react";

export interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  /** Optional trailing element rendered inside the field, e.g. a
   * show/hide-password toggle button. */
  trailing?: ReactNode;
}

export function FormField({ label, error, trailing, id, ...inputProps }: FormFieldProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const errorId = `${fieldId}-error`;

  return (
    <div className="form-field">
      <label htmlFor={fieldId}>{label}</label>
      <div className={`form-field-control${error ? " form-field-control--invalid" : ""}`}>
        <input
          id={fieldId}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          {...inputProps}
        />
        {trailing}
      </div>
      {error ? (
        <p id={errorId} className="form-field-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
