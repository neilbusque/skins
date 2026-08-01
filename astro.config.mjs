// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';

export default defineConfig({
  site: 'https://skins.neilb.app',
  output: 'static',
  image: { service: passthroughImageService() },
  devToolbar: { enabled: false },
});
