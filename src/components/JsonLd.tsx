import {
  SITE_DESCRIPTION,
  SITE_EMAIL,
  SITE_LEGAL_NAME,
  SITE_NAME,
  SITE_PHONE,
  SITE_URL,
} from "@/lib/seo";

const organization = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  legalName: SITE_LEGAL_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/images/PJBUMI-tech-logo.png`,
  email: SITE_EMAIL,
  telephone: SITE_PHONE,
  parentOrganization: {
    "@type": "Organization",
    name: "PJBumi Berhad",
    url: "https://www.pjbumi.com.my",
  },
  sameAs: ["https://www.pjbumi.com.my"],
  address: [
    {
      "@type": "PostalAddress",
      addressLocality: "Kuala Lumpur",
      addressCountry: "MY",
      streetAddress:
        "Unit 22-1 Level 22, MOF Inc. Tower, Platinum Park, No 9 Persiaran KLCC",
      postalCode: "50088",
    },
    {
      "@type": "PostalAddress",
      addressLocality: "Toulouse",
      addressCountry: "FR",
      streetAddress: "13 Rue Sainte Ursule",
      postalCode: "31000",
    },
  ],
  areaServed: ["MY", "FR", "ID"],
  knowsAbout: [
    "hydrogen-electric drones",
    "communications satellites",
    "hydrogen energy systems",
    "aerospace engineering",
  ],
};

const website = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en",
};

const webpage = {
  "@type": "WebPage",
  "@id": `${SITE_URL}/#webpage`,
  url: SITE_URL,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en",
};

export function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [organization, website, webpage],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
