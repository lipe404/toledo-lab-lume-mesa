import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lume à Mesa | Projeto conceitual",
  description: "Cozinha de origem, no ritmo do fogo. Landing page conceitual de portfólio.",
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
