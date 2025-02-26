import getHomePage from "../lib/getHomePage";
import getContact from "../lib/getContact";
import Image from "next/image";
import Footer from "./components/Footer";
import ContactButtons from "./components/ContactButtons";

import { Metadata } from "next";
const data = (await getHomePage()) as HomePageData;
const contactData = (await getContact()) as ContactData;

interface Media {
  name: string;
  caption: string;
  alternativeText: string;
  url: string;
}

interface HomePageData {
  title: string;
  landingPageImage: Media;
  content: string;
  secondaryTitle: string;
  secondaryContent: string;
  seo: SeoData[];
}
interface SeoData {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  preventIndexing: boolean;
  favicon: {
    url?: string | null;
  };
  shareImage: {
    url?: string | null;
  };
}

export async function generateMetadata(): Promise<Metadata> {
  // const faviconUrl = data.seo?.[0]?.favicon?.url
  //   ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${data.seo?.[0]?.favicon?.url}`
  //   : undefined;
  // console.log(faviconUrl);
  return {
    title: data.seo?.[0]?.metaTitle ?? "Our Services",
    description: data.seo?.[0]?.metaDescription ?? "",
    keywords: data.seo?.[0]?.keywords ?? [],

    openGraph: {
      title: data.seo?.[0]?.metaTitle ?? "Our Services",
      description: data.seo?.[0]?.metaDescription ?? "",
      images: [],
    },
    twitter: {
      card: "summary_large_image",
      title: data.seo?.[0]?.metaTitle ?? "Our Services",
      description: data.seo?.[0]?.metaDescription ?? "",
      images: [],
    },
    robots: {
      index: !data.seo?.[0]?.preventIndexing,
      follow: !data.seo?.[0]?.preventIndexing,
    },
    alternates: {
      canonical: "/services",
    },
  };
}

interface ContactData {
  email: string;
  phoneNumber: string;
}
export const revalidate = 0;

export default async function Home() {
  console.log(data);
  return (
    <>
      <div className="flex flex-col">
        <main className="flex-grow md:w-2/3 mx-auto shadow-lg pb-8">
          {data.title ? (
            <h1 className="text-3xl md:text-4xl py-8 font-bold text-gray-800">
              {data.title}
            </h1>
          ) : null}
          <div className="flex flex-col justify-center text-center pageFonts">
            {data.landingPageImage ? (
              <div className="imageWrap max-w-xl mx-auto mb-8">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${data.landingPageImage.url}`}
                  width={1000}
                  height={1000}
                  title={data.landingPageImage.name}
                  alt={data.landingPageImage.alternativeText}
                />
              </div>
            ) : null}
            {data.content ? (
              <p className="whitespace-pre-wrap px-4 max-w-2xl mx-auto py-8 text-sm md:text-base">
                {data.content}
              </p>
            ) : (
              <h1 className="text-center text-xl font-bold align-middle">
                You have not provided any data yet.
              </h1>
            )}
          </div>
          <ContactButtons
            email={contactData.email}
            phoneNumber={contactData.phoneNumber}
          />
          {data.secondaryTitle ? (
            <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
              {data.secondaryTitle}
            </h1>
          ) : null}
          {data.secondaryContent ? (
            <p className="whitespace-pre-wrap px-4 max-w-2xl mx-auto py-8 text-sm md:text-base">
              {data.secondaryContent}
            </p>
          ) : null}
        </main>
      </div>
    </>
  );
}
