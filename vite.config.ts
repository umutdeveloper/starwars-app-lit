import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import copy from 'rollup-plugin-copy';

function PreloadLinkStylesheetPlugin() {
  return {
    name: 'preserve-link-attributes',
    transformIndexHtml(html: string) {
      // Find the default stylesheet link Vite generates
      const viteLinkRegex = /<link\s+rel="stylesheet".*href="([^"]+index-[^"]+\.css)".*>/;

      return html.replace(viteLinkRegex, (_, href: string) => {
        // Replace the matched link with the preload link and noscript block
        return `<link rel="preload" href="${href}" as="style" onload="this.onload=null;this.rel='stylesheet'">
        <noscript>
            <link rel="stylesheet" href="${href}">
        </noscript>`;
      });
    },
  };
}

function ReplaceShoelaceAssets() {
  return copy({
    copyOnce: true,
    targets: [
      {
        src: path.resolve(__dirname, 'node_modules/@shoelace-style/shoelace/dist/assets'),
        dest: path.resolve(__dirname, 'dist/assets/shoelace'),
      },
    ],
    hook: 'writeBundle',
  });
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    base: env.VITE_BASE_HREF,
    plugins: [PreloadLinkStylesheetPlugin(), ReplaceShoelaceAssets()],
    build: {
      target: 'es2015',
    },
    resolve: {
      alias: {
        '@shoelace-style/shoelace': path.resolve(__dirname, 'node_modules/@shoelace-style/shoelace'),
      },
    },
  };
});
