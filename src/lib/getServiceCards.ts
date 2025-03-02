interface Media {
  name: string
  caption: string
  alternativeText: string
  url: string
}

interface ServiceCardData {
  title: string
  image: Media[]
  description: string
}

export default async function getServiceCards(): Promise<ServiceCardData[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/service-cards?populate=*`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    },
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch service cards: ${response.statusText}`)
  }

  const data = await response.json()
  return data.data.map((item: ServiceCardData) => ({
    title: item.title,
    image: item.image,
    description: item.description,
  }))
}
