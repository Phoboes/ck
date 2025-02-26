import getAboutPage from "../../lib/getAboutPage";
import { Metadata } from "next";
import styles from "./page.module.scss";
const data = (await getAboutPage()) as AboutPageData;
import ReactMarkdown from "react-markdown";

interface AboutPageData {
  title: string;
  content: Array<{
    type: string;
    children: Array<{
      text: string;
      type: string;
    }>;
  }>;
  seo: SeoData[];
}

interface SeoData {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  preventIndexing: boolean;
}

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: data.seo?.[0]?.metaTitle ?? "About us",
    description: data.seo?.[0]?.metaDescription ?? "",
    keywords: data.seo?.[0]?.keywords ?? [],
    openGraph: {
      title: data.seo?.[0]?.metaTitle ?? "About us",
      description: data.seo?.[0]?.metaDescription ?? "",
      images: [],
    },
    twitter: {
      card: "summary_large_image",
      title: data.seo?.[0]?.metaTitle ?? "About us",
      description: data.seo?.[0]?.metaDescription ?? "",
      images: [],
    },
    robots: {
      index: !data.seo?.[0]?.preventIndexing,
      follow: !data.seo?.[0]?.preventIndexing,
    },
    alternates: {
      canonical: "/about",
    },
  };
}

export default async function About() {
  // Transform content array into markdown string
  const markdownContent = data.content
    .map((item) => item.children.map((child) => child.text).join(""))
    .join("\n\n");

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <main
          className={`flex-grow md:w-2/3 mx-auto shadow-lg pb-8 ${styles.main}`}
        >
          {data.title ? (
            <h1 className="text-3xl md:text-4xl py-8 font-bold text-gray-800">
              {data.title}
            </h1>
          ) : null}
          <div className={` w-1/2 m-auto pb-8 ${styles.wrapper}`}>
            {data.content ? (
              <ReactMarkdown>{markdownContent}</ReactMarkdown>
            ) : (
              <p>No content available</p>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
