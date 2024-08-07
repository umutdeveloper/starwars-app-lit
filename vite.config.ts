import { defineConfig } from 'vite';

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

export default defineConfig({
  plugins: [PreloadLinkStylesheetPlugin()],
});
