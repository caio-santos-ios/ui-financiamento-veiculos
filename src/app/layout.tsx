import { Outfit } from 'next/font/google';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { Providers } from "./providers";
import { Loading } from '@/components/loading/Loading';

const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <Providers>
          <Loading />
          {children}
        </Providers>
      </body>
    </html>
  );
}
