import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  output: 'export',
  cleanDistDir: true,
  reactStrictMode: false,
};

export default nextConfig;
