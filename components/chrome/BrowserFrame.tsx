"use client";

import type { ReactNode } from "react";

export function BrowserFrame({ children }: { children: ReactNode }) {
  return <div className="browser-viewport" dir="rtl">{children}</div>;
}
