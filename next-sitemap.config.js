const siteMetadata = require("./lib/siteMetaData");

module.exports = {
  siteUrl: siteMetadata.siteUrl,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/workout/", "/body-weight"],
      },
    ],
  },
};
