import getHomePage from "../lib/getHomePage";
import getContact from "../lib/getContact";
import Image from "next/image";
// import Footer from "./components/Footer";
import ServiceCards from "./components/ServiceCards/ServiceCards";
import ContactButtons from "./components/ContactButtons/ContactButtons";
import styles from "./page.module.scss";
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
  titleImage: Media;
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
export const revalidate = 3600;

export default async function Home() {
  return (
    <>
      <div className="flex flex-col">
        <main className="flex-grow mx-auto shadow-lg pb-8 w-full md:min-w-[1000px]">
          <div className="flex flex-col justify-center text-center pageFonts">
            {data.landingPageImage ? (
              <div className="imageWrap mx-auto mb-8 overflow-hidden w-full relative">
                <Image
                  src={`${data.landingPageImage.url}`}
                  width={1000}
                  height={1000}
                  className="w-full h-[300px] md:h-[500px] object-cover max-w-[800px] md:max-w-none "
                  title={data.landingPageImage.name}
                  alt={data.landingPageImage.alternativeText}
                />
                {/* {data.title ? (
                  <h1
                    className={`text-3xl md:text-5xl lg:text-6xl py-8 font-extrabold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center ${styles.title}`}
                  >
                    {data.title}
                  </h1>
                ) : null} */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full bg-blue-100/40 flex items-center justify-center max-h-[400px]">
                  <Image
                    src={`${data.titleImage.url}`}
                    width={1000}
                    height={400}
                    className="w-full h-auto max-w-[80%] max-h-[450px]"
                    title={data.titleImage.name}
                    alt={data.titleImage.alternativeText}
                  />
                </div>
              </div>
            ) : null}
            {data.content ? (
              <>
                <p className="whitespace-pre-wrap px-4 max-w-4xl mx-auto py-8 text-sm md:text-base">
                  {data.content}
                </p>
              </>
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
          <hr className="max-w-[1000px] mx-auto my-8" />
          {data.secondaryTitle ? (
            <h1 className="text-2xl md:text-4xl font-bold">
              {data.secondaryTitle}
            </h1>
          ) : null}
          {data.secondaryContent ? (
            <p className="whitespace-pre-wrap px-4 max-w-4xl mx-auto py-8 text-sm md:text-base">
              {data.secondaryContent}
            </p>
          ) : null}
          <ServiceCards />
        </main>
      </div>
    </>
  );
}
