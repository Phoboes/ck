import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./custom.scss";

import getContact from "../lib/getContact";
import Header from "./components/Header";
import Footer from "./components/Footer";
import getMetaImages from "../lib/getMetaImages";

const metaImages = await getMetaImages();

export const metadata: Metadata = {
  icons: {
    icon: [
      {
        rel: "icon",
        url: metaImages.favicon?.url || "",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    shortcut: [
      {
        rel: "shortcut icon",
        url: metaImages.favicon?.url || "",
        sizes: "32x32",
        type: "image/png",
      },
    ],
  },
  other: {
    "msapplication-TileImage": metaImages.favicon?.url || "",
    "msapplication-TileColor": "#ffffff",
  },
};

const contactData = (await getContact()) as ContactData;

interface ContactData {
  addressLine1: string | undefined;
  addressLine2: string | undefined;
  city: string | undefined;
  postcode: string | undefined;
  email: string;
  phoneNumber: string;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log(await getMetaImages());
  return (
    <html lang="en">
      <body className={`min-h-screen antialiased text-center m-auto`}>
        <Header />
        {children}

        <Footer footerData={contactData} />
      </body>
    </html>
  );
}
