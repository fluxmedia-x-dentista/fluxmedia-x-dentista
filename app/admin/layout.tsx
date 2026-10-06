import type { Metadata } from "next";
import type { ReactNode } from "react";

import { ToastProvider } from "@/components/admin/toast";

export const metadata: Metadata = {
  title: "FLUXMEDIA Admin",
  robots: { index: false, follow: false },
};

/** The admin is always left-to-right, even when the site is in Arabic. */
export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <div dir="ltr" className="admin-root">
        {children}
      </div>
    </ToastProvider>
  );
}
