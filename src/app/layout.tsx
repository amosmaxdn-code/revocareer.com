import type { Metadata } from "next";
import { Poppins, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rev'O Carrière - Transformez Votre Carrière",
  description: "Formations certifiantes, produits digitaux et accompagnement pour accélérer votre évolution professionnelle.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${poppins.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main className="pt-20 bg-background">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
