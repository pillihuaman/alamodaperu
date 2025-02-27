
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 25358, hash: '8aa955991a9da005635d62aaabf063279d4f05d8d67500dfb70d007d4637742e', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17190, hash: '7a0d9d5ec9f23a2ffb8976862122243f757d9dfaa27b62752a339d269190f8cf', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 26693, hash: 'a1d9f3e58fafa375e4c550f1e2593b45896c9e64666a668b3c7c44c21d584b55', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-MRCDCUV6.css': {size: 8772, hash: 'bdBSaIrHcKg', text: () => import('./assets-chunks/styles-MRCDCUV6_css.mjs').then(m => m.default)}
  },
};
