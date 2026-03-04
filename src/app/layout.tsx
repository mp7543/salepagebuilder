import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sale Page Builder — สร้างเซลเพจมืออาชีพ",
  description: "สร้างเซลเพจสวยระดับมืออาชีพ เลือกเทมเพลท เลือกสี แก้ไขข้อมูล พร้อมใช้ทันที",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className="dark">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
