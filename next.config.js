module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.githubusercontent.com",
        pathname: "/u/*",
      },
      {
        protocol: "https",
        hostname: "s.gravatar.com",
        pathname: "/avatar/*",
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
        pathname: "/profile_images/*/*",
      },
      {
        protocol: "https",
        hostname: "*.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "ca.slack-edge.com",
      },
    ],
  },
};
