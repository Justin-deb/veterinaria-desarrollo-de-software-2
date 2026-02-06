// postcss.config.ts
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import type { Config } from 'postcss-load-config';

const config: Config = {
  plugins: [
    tailwindcss(),
    autoprefixer(),
    // Add other PostCSS plugins here
  ],
};

export default config;