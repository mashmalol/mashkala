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
          <Image src="/images/placeholder.png" alt="" width={80} height={45} />
        </Link>
        <h1>{title}</h1>
        <p className="auth-card-subtitle">{subtitle}</p>

        {children}

        <div className="auth-card-footer">{footer}</div>
      </div>
    </div>
  );
}
