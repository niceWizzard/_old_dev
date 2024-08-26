import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css"
import React from "react";

export const metadata : Metadata = {
    title: "Threads Clone",
    description: "A clone of the threads app made with NextJs",
}

const inter = Inter({subsets: ["latin"]})


export default function RootLayout({children} : {children: React.ReactNode}) {
    return (
        <ClerkProvider>
            <html
            lang="en"
            >
                <body
                className={`${inter.className} bg-dark-1`}
                >
                    {children}
                </body>

            </html>
        </ClerkProvider> 
    )
}