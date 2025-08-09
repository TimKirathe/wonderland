export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "School",
        "@id": "https://wonderlandke.com/#school",
        name: "Wonderland Early Years & Prep School",
        alternateName: "Wonderland Kindergarten",
        url: "https://wonderlandke.com",
        logo: "https://wonderlandke.com/wonderland-logo.png",
        image: "https://wonderlandke.com/wonderland-logo.png",
        description:
          "A nurturing environment where children learn, care, and play together. Offering quality education programs from Playgroup to Grade 4.",
        address: {
          "@type": "PostalAddress",
          addressCountry: "KE",
          addressRegion: "Nairobi",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "-1.32106",
          longitude: "36.80386",
        },
        telephone: "+254738626219",
        email: "info@wonderlandke.com",
        priceRange: "$232-$425",
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "08:00",
            closes: "17:00",
          },
        ],
        sameAs: ["https://www.instagram.com/wonderlandkindergartenke"],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Educational Programs",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "EducationalOccupationalProgram",
                name: "Playgroup",
                description: "For children aged 2-4 years",
                educationalLevel: "Early Years",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "EducationalOccupationalProgram",
                name: "Pre-Primary 1",
                description: "For children aged 4-5 years",
                educationalLevel: "Pre-Primary",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "EducationalOccupationalProgram",
                name: "Pre-Primary 2",
                description: "For children aged 5-6 years",
                educationalLevel: "Pre-Primary",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "EducationalOccupationalProgram",
                name: "Grade 1-4",
                description: "Primary education for children aged 6-10 years",
                educationalLevel: "Primary",
              },
            },
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://wonderlandke.com/#website",
        url: "https://wonderlandke.com",
        name: "Wonderland Early Years & Prep School",
        description: "Official website of Wonderland Early Years & Prep School",
        publisher: {
          "@id": "https://wonderlandke.com/#school",
        },
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://wonderlandke.com/#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://wonderlandke.com",
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
