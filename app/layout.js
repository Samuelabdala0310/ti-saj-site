import "./globals.css";
import Navbar from "@/components/Navbar";
import { CarrinhoProvider } from "@/context/CarrinhoContext";
import { FreteProvider } from "@/context/FreteContext";

export const metadata = {
    title: "TI-SAJ",
    description: "Sua loja de camisetas personalizadas",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="pt-BR">
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