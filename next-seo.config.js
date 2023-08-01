export default {
  defaultTitle: "DM Dinner Club Member Directory | Powered by Orbit",
  description:
    "Discover who's attending the DM Dinner Club. Connect, network, and engage with attendees, and explore their social profiles all in one place.",
  canonical: "https://www.members.dmdinner.club/",
  twitter: {
    cardType: "summary",
    handle: "@RoiStartup",
  },
  openGraph: {
    type: "website",
    url: "https://www.members.dmdinner.club/",
    title: "DM Dinner Club Member Directory | Powered by Orbit",
    description:
      "Discover who's attending the DM Dinner Club. Connect, network, and engage with attendees, and explore their social profiles all in one place.",
    images: [
      {
        url: `https://member-directory-eight.vercel.app/dm-logo-background.png`,
        width: 200,
        height: 200,
        alt: "DM Dinner Club - Established 2022",
      },
    ],
  },
  additionalLinkTags: [
    {
      rel: "icon",
      href: `https://member-directory-eight.vercel.app/dm-logo-background.png`,
    },
  ],
  additionalMetaTags: [
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
  ],
};
