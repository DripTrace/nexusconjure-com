// import type { Metadata } from "next";
// import { DM_Sans } from "next/font/google";
// import "@/styles/globals.css";
// import { ThemeProvider } from "@/providers/theme-provider";
// import ModalProvider from "@/providers/modal-provider";
// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as SonnarToaster } from "@/components/ui/sonner";

// const font = DM_Sans({ subsets: ["latin"] });

// export const metadata: Metadata = {
//     title: "NexusConjure",
//     description: "All in one Agency Solution",
// };

// export default function RootLayout({
//     children,
// }: {
//     children: React.ReactNode;
// }) {
//     return (
//         <html lang="en" suppressHydrationWarning>
//             <body className={font.className}>
//                 <ThemeProvider
//                     attribute="class"
//                     defaultTheme="system"
//                     enableSystem
//                     disableTransitionOnChange
//                 >
//                     <ModalProvider>
//                         {children}
//                         <Toaster />
//                         <SonnarToaster position="bottom-left" />
//                     </ModalProvider>
//                 </ThemeProvider>
//             </body>
//         </html>
//     );
// }

import type { Metadata } from "next";
import "@/styles/globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import ModalProvider from "@/providers/modal-provider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnarToaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
    title: "NexusConjure",
    description: "All in one Agency Solution",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link
                    href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className="font-dm-sans">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <ModalProvider>
                        {children}
                        <Toaster />
                        <SonnarToaster position="bottom-left" />
                    </ModalProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
