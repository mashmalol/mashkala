import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "ورود به حساب کاربری",
};

export default function LoginPage() {
  return <LoginForm />;
}
