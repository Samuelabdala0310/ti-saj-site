"use client";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { CarrinhoProvider } from "@/context/CarrinhoContext";
import { FreteProvider } from "@/context/FreteContext";

export default function RootLayout({ children }) {
    return (
        <html lang="pt-BR">
            <head>
                <title>TI-SAJ</title>
                <meta name="description" content="Sua loja de camisetas personalizadas" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </head>
            <body>
                <FreteProvider>
                    <CarrinhoProvider>
                        <Navbar />
                        {children}
                    </CarrinhoProvider>
                </FreteProvider>
            </body>
        </html>
    );
}