import type { Metadata } from "next";
import "./globals.css";

import { Header } from "@/components/presentationals/elements/header/header";
import { Footer } from "@/components/presentationals/elements/footer/footer";
import { VirtualKeyBoard } from "@/components/presentationals/elements/vkb/virtualKeyboard";

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="w-full h-full" suppressHydrationWarning>
      <body className="w-full h-full bg-[#364155]">
        <main className="w-full h-full px-[5%] py-[2%]">
          <div className="h-full grid grid-rows-[0.1fr,1fr,0.1fr] grid-flow-row gap-7">
            <Header />
            <div className="h-full grid grid-rows-[1fr,0.4fr]">
              {children}
              <div className="flex justify-center">
                <VirtualKeyBoard />
              </div>
            </div>
            <Footer />
          </div>
        </main>
      </body>
    </html>
  );
}
