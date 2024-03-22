/** @type {import('next').NextConfig} */

const prod = process.env.NODE_ENV === 'production';
const runtimeCaching = require('next-pwa/cache');

const withPWA = require('next-pwa')({
  disable: false,
  dest: 'public',
  register: true,
  disable: prod ? false : true,
  skipWaiting: true,
});

module.exports = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  images: { unoptimized: true },
  basePath: '/salja-knark',
  // webpack: (config) => {
  //   config.resolve.fallback = {
  //     fs: false,
  //     child_process: false,
  //     net: false,
  //     path: false,
  //     tls: false,
  //   };

  //   return config;
  // },
});
