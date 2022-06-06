export default {
  description:
    'Evcil hayvan ilanları - Yakınınızdaki köpek, kedi veya diğer hayvanları bulun. Aklınızdaki soruları diğer hayvan severlerle paylaşın.',
  titleTemplate: '%s | Petin Olsun',
  defaultTitle: 'Petin Olsun',
  additionalMetaTags: [
    {
      name: 'keywords',
      content:
        'evcil hayvan ilanları, hayvan sahiplen, köpek sahiplen, kedi sahiplen, hayvan sever platformu',
    },
  ],
  openGraph: {
    type: 'website',
    locale: 'tr',
    url: process.env.NEXT_PUBLIC_APP_BASE_URL,
    site_name: 'Petin Olsun',
  },
  twitter: {
    handle: '@petinolsun',
    site: '@petinolsun',
    cardType: 'summary_large_image',
  },
}
