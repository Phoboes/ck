interface MetaDataMedia {
  favicon: {
    url: string
  }
  shareImage: {
    url: string
  }
}

interface Media {
  name: string
  caption: string
  alternativeText: string
  url: string
}

export default async function getMetaImages(): Promise<MetaDataMedia> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/meta-data-media?populate=*`,
  )

  try {
    if (!response.ok) {
      if (response.status === 404) {
        return {
          favicon: {
            url: '/images/default-meta-image.png',
          },
          shareImage: {
            url: '/images/default-meta-image.png',
          },
        }
      }
      throw new Error('Failed to fetch homepage data')
    }
    const res = await response.json()

    return {
      favicon: {
        url: `${res.data.favicon?.url || ''}`,
      },
      shareImage: {
        url: `${res.data.shareImage?.url || ''}`,
      },
    }
  } catch (e) {
    console.error(e) // Changed to console.error for better error logging
    throw e // Re-throw the error after logging it
  }
}
