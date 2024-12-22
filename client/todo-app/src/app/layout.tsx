"use client";
import { Provider } from "react-redux";
import "./globals.css";
import store from "@/store";
import { metadata } from "./layoutMetadata";
import Head from "next/head";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <Provider store={store}>
          <Head>
            <title>{metadata.title}</title>
            <meta name="description" content={metadata.description} />
          </Head>
          {children}
        </Provider>
      </body>
    </html>
  );
}
