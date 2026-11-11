import type { NextConfig } from 'next';

const config: NextConfig = {
  output: 'export',
  trailingSlash: false,
  images: { unoptimized: true },
};

// Next emits route.html with trailingSlash:false. The build script subsequently
// arranges those files as route/index.html without changing canonical URLs.
export default config;
