import type { Metadata } from "next";
import { Inter }          from "next/font/google";
import { ThemeProvider }  from "next-themes";
import "./globals.css";
import Footer             from "./components/layout/footer";

const inter = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rian Febriansyah — Full Stack Developer",
  description: "Portfolio of Rian Febriansyah — Full Stack Developer & Discord Bot Engineer based in Bandung, Indonesia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className + " bg-background text-foreground transition-colors duration-200"}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Footer/>
        </ThemeProvider>
      </body>
    </html>
  );
}

// THANK U FOT THAT!
// KARIN???