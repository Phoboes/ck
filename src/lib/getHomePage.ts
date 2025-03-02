interface Media {
  name: string
  caption: string
  alternativeText: string
  url: string
}

interface HomePageData {
  title: string
  landingPageImage: Media
  content: string
  secondaryTitle: string
  secondaryContent: string
  seo: SeoData[]
}
interface SeoData {
  metaTitle: string
  metaDescription: string
  keywords: string[]
  preventIndexing: boolean
}

const createPopulateQuery = (fields: string[]) => {
  return fields.map((field, index) => `populate[${index}]=${field}`).join('&')
}

export default async function getHomePage(): Promise<HomePageData> {
  const query = createPopulateQuery(['landingPageImage', 'seo'])
  const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/home?${query}`

  try {
    console.log('Fetching from URL:', url)

    if (!process.env.NEXT_PUBLIC_STRAPI_URL) {
      throw new Error('NEXT_PUBLIC_STRAPI_URL is not defined')
    }
    if (!process.env.STRAPI_API_TOKEN) {
      throw new Error('STRAPI_API_TOKEN is not defined')
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      next: {
        revalidate: 3600, // Changed to 1 hour to match page revalidation
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Response not OK:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      })
      throw new Error(
        `Failed to fetch homepage data: ${response.status} ${response.statusText}`,
      )
    }

    const res = await response.json()

    if (!res.data) {
      console.error('No data in response:', res)
      throw new Error('No data returned from Strapi')
    }

    return {
      title: res.data.attributes.title,
      landingPageImage: res.data.attributes.landingPageImage,
      content: res.data.attributes.content,
      secondaryTitle: res.data.attributes.secondaryTitle,
      secondaryContent: res.data.attributes.secondaryContent,
      seo: res.data.attributes.seo,
    }
  } catch (e) {
    console.error('Error fetching homepage:', e)
    throw e
  }
}
