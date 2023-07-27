export default {
  defaultTitle: "Member Directory",
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
    title: "Member Directory",
    description:
      "Discover who's attending the DM Dinner Club. Connect, network, and engage with attendees, and explore their social profiles all in one place.",
    images: [
      {
        url: `https://member-directory-eight.vercel.app/dm-icon-light.svg`,
        width: 200,
        height: 200,
        alt: "DM Dinner Club",
      },
    ],
  },
  additionalLinkTags: [
    {
      rel: "icon",
      href: `https://member-directory-eight.vercel.app/dm-icon-light.svg`,
    },
  ],
  additionalMetaTags: [
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
  ],
};
