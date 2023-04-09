import '@/styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';
// import { NextApiRequest, NextApiResponse } from 'next';

const inter = Inter({ subsets: ['latin'] });

function App({ Component, pageProps }: AppProps<{ session: any }>) {
  return (
    <div className={ inter.className }>
      <Toaster/>
      <Component { ...pageProps } />
    </div>
  );
}

const TranslateApp = appWithTranslation(App);

const SessionApp = ({ Component, pageProps:{session,...pageProps} }: AppProps) => {
  return (
    <SessionProvider session={session}>
      <Component { ...pageProps } />
    </SessionProvider>
  );
};

export default SessionApp;