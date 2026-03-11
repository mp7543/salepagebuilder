import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Sale Page Builder — สร้างเซลเพจมืออาชีพ",
  description: "สร้างเซลเพจสวยระดับมืออาชีพ เลือกเทมเพลท เลือกสี แก้ไขข้อมูล พร้อมใช้ทันที",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className="dark">
      <body className={`${inter.variable} ${outfit.variable} ${inter.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
