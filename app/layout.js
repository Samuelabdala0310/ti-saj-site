// app/layout.js
import "./globals.css";
import Navbar from "@/components/Navbar";
import { CarrinhoProvider } from "@/context/CarrinhoContext";
import { FreteProvider } from "@/context/FreteContext";
import { AuthProvider } from "@/context/AuthContext";

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
        <AuthProvider>
          <CarrinhoProvider> {/* Carrinho precisa estar por fora do Frete */}
            <FreteProvider>
              <Navbar />
              {children}
            </FreteProvider>
          </CarrinhoProvider>
        </AuthProvider>
      </body>
    </html>
  );
}