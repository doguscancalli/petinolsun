/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.NEXT_PUBLIC_APP_BASE_URL,
  generateRobotsTxt: true,
}

module.exports = config
