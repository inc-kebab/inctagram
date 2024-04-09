/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) =>
        rule.test?.test?.('.svg'),
    )

    config.module.rules.push(
        {
          ...fileLoaderRule,
          test: /\.svg$/i,
          resourceQuery: /url/, // *.svg?url
        },
        {
          test: /\.svg$/i,
          issuer: fileLoaderRule.issuer,
          resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
          use: ['@svgr/webpack'],
        },
    )

    fileLoaderRule.exclude = /\.svg$/i

    return config
  },
  i18n: {
    locales: ["en", "ru"],
    defaultLocale: "en",
  },
  images: {
    domains: ['dummyimage.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.yandexcloud.net',
        pathname: '/kebab-inctagram/media/users/**',
      },
    ],
  },
};

export default nextConfig;
