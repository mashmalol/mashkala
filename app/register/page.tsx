import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "ثبت‌نام | امیر کبیر کالا",
  description: "در فروشگاه امیرکبیر کالا ثبت‌نام کنید و از خرید سریع‌تر بهره‌مند شوید.",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
