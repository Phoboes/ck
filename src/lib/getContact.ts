interface ContactData {
  addressLine1: string | undefined
  addressLine2: string | undefined
  city: string | undefined
  postcode: string | undefined
  email: string
  phoneNumber: string
}

// Add interface for API response type
interface ContactResponse {
  data: {
    addressLine1: string
    addressLine2: string
    city: string
    postcode: string
    email: string
    phoneNumber: string
  }
}

export default async function getContact(): Promise<ContactData> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/contact?populate=*`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
        next: {
          revalidate: 0, // disable cache revalidation
        },
      },
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch Contact data: ${response.statusText}`)
    }

    const res = (await response.json()) as ContactResponse
    return {
      addressLine1: res.data.addressLine1,
      addressLine2: res.data.addressLine2,
      city: res.data.city,
      postcode: res.data.postcode,
      email: res.data.email,
      phoneNumber: res.data.phoneNumber,
    }
  } catch (error) {
    console.error('Error fetching contact data:', error)
    throw error // Re-throw to handle it at the component level
  }
}
