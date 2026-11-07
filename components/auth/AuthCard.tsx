import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export interface AuthCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}

export function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link href="/" className="auth-card-brand">
          <Image src="/images/logo-mark.png" alt="مشکله" width={45} height={45} style={{ objectFit: "contain" }} />
        </Link>
        <h1>{title}</h1>
        <p className="auth-card-subtitle">{subtitle}</p>

        {children}

        <div className="auth-card-footer">{footer}</div>
      </div>
    </div>
  );
}
