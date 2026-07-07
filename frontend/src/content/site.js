export const siteConfig = {
  companyName: 'Kings of Destination',
  shortName: 'KOD',
  tagLine: 'Signature journeys, thoughtfully managed by real travel experts.',
  managerPhone: '+91 8533052000',
  managerPhoneRaw: '918533052000',
  // whatsappRaw: '918533052000',
  whatsappRaw: '919997021869',
  email: 'hello@kodtravel.com',
  address: 'The Summit Business Tower, Andheri East, Mumbai, India',
  categories: ['Honeymoon', 'Family', 'Adventure', 'International', 'Luxury'],
  destinations: [
    {
      name: 'Kashmir',
      subtitle: 'Snow valleys and slow luxury stays',
      image:
        'https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?auto=format&fit=crop&w=900&q=80',
    },
    {
      name: 'Bali',
      subtitle: 'Island calm with premium curation',
      image:
        'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80',
    },
    {
      name: 'Rajasthan',
      subtitle: 'Heritage routes with private pacing',
      image:
        'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=80',
    },
  ],
  whyChooseUs: [
    {
      title: 'Manager-led planning',
      description:
        'Every inquiry reaches a real destination manager who tailors quotes, hotels, and pacing manually.',
    },
    {
      title: 'Premium but practical',
      description:
        'We focus on clarity, trusted vendors, and polished communication instead of overcomplicated automation.',
    },
    {
      title: 'Lead-to-conversion workflow',
      description:
        'From first inquiry to token payment, the entire flow is designed to help your team close with confidence.',
    },
  ],
  testimonials: [
    {
      name: 'Riya & Arjun',
      quote:
        'The KOD team didn’t just sell us a package. They adjusted room types, meal preferences, and our arrival day without friction.',
    },
    {
      name: 'Sana Merchant',
      quote:
        'The callback was fast, the itinerary looked premium, and the pricing breakdown felt transparent from the start.',
    },
    {
      name: 'Vikram Bhatia',
      quote:
        'What stood out most was the calm, high-touch experience. It felt like working with a private travel desk.',
    },
  ],
  team: [
    {
      name: 'Aarav Khanna',
      role: 'Founder & Lead Strategist',
      bio: 'Shapes destination partnerships and premium itinerary standards.',
    },
    {
      name: 'Meher Sethi',
      role: 'Client Experience Manager',
      bio: 'Owns inquiry follow-up, travel coordination, and concierge-style communication.',
    },
    {
      name: 'Kabir Rao',
      role: 'Operations & Contracts',
      bio: 'Keeps package execution reliable across hotels, transfers, and local ground teams.',
    },
  ],
  faqs: [
    {
      question: 'Do I get instant hotel confirmation online?',
      answer:
        'No. KOD is intentionally built as a lead-generation and package-conversion platform. Final confirmations are handled manually by our team.',
    },
    {
      question: 'Can I pay only a token amount first?',
      answer:
        'Yes. Selected packages allow a small token payment so our team can lock the planning process and continue manually from there.',
    },
    {
      question: 'Can I call or WhatsApp a manager directly?',
      answer:
        'Yes. Every package page includes direct contact options, plus a callback request form that stores your details for the admin team.',
    },
  ],
}

export const fallbackPackages = [
  {
    id: 'demo-kashmir',
    title: 'Royal Kashmir Escape',
    slug: 'royal-kashmir-escape',
    description:
      'A premium Kashmir circuit with luxury touches, curated sightseeing, and a flexible travel desk.',
    price: 38999,
    duration: 6,
    startingLocation: 'Delhi',
    destination: 'Kashmir',
    coverImage:
      'https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    ],
    category: 'Honeymoon',
    highlights: ['Luxury houseboat stay', 'Private sightseeing cab', 'Destination manager support'],
    inclusions: ['Hotels', 'Breakfast & dinner', 'Airport transfers'],
    exclusions: ['Airfare', 'Personal shopping'],
    faqs: [
      {
        question: 'Can this be customized for couples?',
        answer: 'Yes, our managers can tune hotel style, room setup, and day pacing manually.',
      },
    ],
    itinerary: [
      {
        dayNumber: 1,
        title: 'Arrive in Srinagar',
        description: 'Airport pickup, check-in, and a relaxed shikara evening.',
      },
      {
        dayNumber: 2,
        title: 'Gulmarg',
        description: 'Mountain excursion with gondola assistance and free time.',
      },
    ],
    isFeatured: true,
    tokenAmount: 5000,
    status: 'published',
  },
  {
    id: 'demo-bali',
    title: 'Bali Luxe Retreat',
    slug: 'bali-luxe-retreat',
    description:
      'Private villa comfort, island experiences, and curated moments for premium international travelers.',
    price: 54999,
    duration: 5,
    startingLocation: 'Mumbai',
    destination: 'Bali',
    coverImage:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    ],
    category: 'International',
    highlights: ['Private villa', 'Island host support', 'Handpicked day tours'],
    inclusions: ['Breakfast', 'Transfers', 'Tours'],
    exclusions: ['Visa', 'Lunch', 'Insurance'],
    faqs: [],
    itinerary: [],
    isFeatured: true,
    tokenAmount: 10000,
    status: 'published',
  },
  {
    id: 'demo-triangle',
    title: 'Golden Triangle Signature',
    slug: 'golden-triangle-signature',
    description:
      'A polished Delhi, Agra, and Jaipur route ideal for first-time travelers and families.',
    price: 27999,
    duration: 4,
    startingLocation: 'Delhi',
    destination: 'Delhi, Agra, Jaipur',
    coverImage:
      'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
    ],
    category: 'Family',
    highlights: ['Heritage storytelling', 'Comfort pacing', 'Trusted local guides'],
    inclusions: ['Hotels', 'Breakfast', 'Private cab'],
    exclusions: ['Tickets', 'Meals other than breakfast'],
    faqs: [],
    itinerary: [],
    isFeatured: false,
    tokenAmount: 3000,
    status: 'published',
  },
]
