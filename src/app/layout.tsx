import type { Metadata } from "next";
import "./globals.css";

import { ApolloClientProvider } from "@/libs/apollo/client";
import { Header } from "@/components/organisms/header";
import { VirtualKeyBoard } from "@/components/elements/vkb";
import { Footer } from "@/components/organisms/footer";

export const metadata: Metadata = {
    title: "Touchual",
    description: "typing game",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja" className="w-full h-full" suppressHydrationWarning>
            <body className="w-full h-full bg-[#364155]">
                <ApolloClientProvider>
                    <main className="w-full h-full px-[5%] py-[2%]">
                        <div className="h-full grid grid-rows-[0.1fr,1fr,0.1fr] grid-flow-row gap-7">
                            <Header />
                            <div className="h-full grid grid-rows-[1fr,0.4fr]">
                                <div className="">{children}</div>
                                <div className="flex justify-center">
                                    <VirtualKeyBoard />
                                </div>
                            </div>
                            <Footer />
                        </div>
                    </main>
                </ApolloClientProvider>
            </body>
        </html>
    );
}
