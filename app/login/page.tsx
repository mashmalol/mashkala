import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "ورود به حساب کاربری | امیر کبیر کالا",
  description: "وارد حساب کاربری خود در فروشگاه امیرکبیر کالا شوید.",
};

export default function LoginPage() {
  return <LoginForm />;
}
