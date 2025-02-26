interface ServicesPageData {
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

export default async function getServicesPage(): Promise<ServicesPageData> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/services?populate[seo][populate]=*`,
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
        `Failed to fetch Services page data: ${response.status} ${response.statusText}`,
      )
    }

    const res = (await response.json()) as StrapiResponse

    if (!res.data || !res.data.title || !res.data.content || !res.data.seo) {
      throw new Error('Invalid response structure from Strapi API')
    }

    return {
      title: res.data.title || '',
      content: res.data.content || [],
      seo: res.data.seo || [
        {
          metaTitle: '',
          metaDescription: '',
          keywords: [],
          preventIndexing: false,
          favicon: { url: '' },
          shareImage: { url: '' },
        },
      ],
    }
  } catch (error) {
    console.error('Error fetching Services page:', error)
    throw new Error(
      error instanceof Error ? error.message : 'An unexpected error occurred',
    )
  }
}
