interface AboutPageData {
  title: string
  content: Array<{
    type: string
    children: Array<{
      text: string
      type: string
    }>
  }>
  seo: SeoData[]
}

interface StrapiResponse {
  data: {
    title: string
    content: Array<{
      type: string
      children: Array<{
        text: string
        type: string
      }>
    }>
    seo: SeoData[]
  }
}

interface SeoData {
  metaTitle: string
  metaDescription: string
  keywords: string[]
  preventIndexing: boolean
}

export default async function getAboutPage(): Promise<AboutPageData> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/about?populate[seo][populate]=*`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
        next: {
          revalidate: 0,
        },
      },
    )

    if (!response.ok) {
      throw new Error(
        `Failed to fetch About page data: ${response.status} ${response.statusText}`,
      )
    }

    const res = (await response.json()) as StrapiResponse

    if (!res.data || !res.data.title || !res.data.content || !res.data.seo) {
      throw new Error('Invalid response structure from Strapi API')
    }

    return {
      title: res.data.title || '',
      content: res.data.content || [],
      seo: res.data.seo || [],
    }
  } catch (error) {
    console.error('Error fetching About page:', error)
    throw new Error(
      error instanceof Error ? error.message : 'An unexpected error occurred',
    )
  }
}
