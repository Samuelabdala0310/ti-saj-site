"use client";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { CarrinhoProvider } from "@/context/CarrinhoContext";

export default function RootLayout({ children }) {
    return (
        <html lang="pt-BR">
            <head>
                <title>TI-SAJ</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </head>
            <body>
                <CarrinhoProvider>
                    <Navbar />
                    {children}
                </CarrinhoProvider>
            </body>
        </html>
    );
}