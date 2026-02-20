import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: 'SweetArt Atelier',
  description: 'Elegância e sabor em cada detalhe. Onde a confeitaria se torna arte para celebrar os seus melhores momentos.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <link rel="icon" href="https://ojkhtaoxalsknciripdh.supabase.co/storage/v1/object/sign/Ayme%20Varela/Hero_Section/Logo_icon.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xODFmNDcyOC04ZDVlLTRhMGYtOTRhZC1hZDUzMDUyYzFjZjMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJBeW1lIFZhcmVsYS9IZXJvX1NlY3Rpb24vTG9nb19pY29uLnBuZyIsImlhdCI6MTc3MTU5MzU2MCwiZXhwIjoxODAzMTI5NTYwfQ.OXMA56Thz_mfvnCyyUkMojTMvcJz77qLwNuMGS01YEo" type="image/png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Belleza&family=Alegreya:ital,wght@0,400;0,500;0,700;1,400&family=Great+Vibes&family=Jost:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body bg-background text-primary antialiased selection:bg-stone-200 selection:text-primary">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
