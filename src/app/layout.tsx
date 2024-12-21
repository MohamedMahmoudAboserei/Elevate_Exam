'use client';

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import NextAuthProvider from "./(Authentication)/api/Providers/NextAuthProviders";

import { Toaster } from "react-hot-toast";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "./globals.css";

export default function RootLayout(
  { children }: { children: ReactNode }
) {
  return (
    <html lang="en">
      <body className="bg-[#FBF9F9]">
        <Provider store={store}>
          <NextAuthProvider>
            {children}
            <Toaster />
          </NextAuthProvider>
        </Provider>
      </body>
    </html>
  );
}
