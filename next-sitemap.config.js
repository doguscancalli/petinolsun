/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'http://petinolsun.com',
  generateRobotsTxt: true,
  exclude: ['/404', '/admin', '/admin/*'],
}

module.exports = config
