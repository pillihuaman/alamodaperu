
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/auth"
  },
  {
    "renderMode": 2,
    "route": "/auth/login"
  },
  {
    "renderMode": 2,
    "route": "/auth/user-register"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 58100, hash: 'f24fb2944fcce08288fe1d4ebd311018cd9f06f5118c1ae73bcfe14fc9797115', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 49372, hash: '884370272c00214bfa06993114d335507eb4d184618795ba1820608a39cb8d37', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'auth/index.html': {size: 72317, hash: 'c5e03eb472647b76b855755a3d142ceee8f89735f806b3dbc2d0ba2465607da7', text: () => import('./assets-chunks/auth_index_html.mjs').then(m => m.default)},
    'auth/login/index.html': {size: 80327, hash: '743eccd28fa6b2ffe6298c76bcdb345e6257ee79cb08d44031f56a10e0ca390d', text: () => import('./assets-chunks/auth_login_index_html.mjs').then(m => m.default)},
    'auth/user-register/index.html': {size: 87102, hash: '37dbd64959fd0f60d2ee258a99348f2d1b1dcc854c2f28457fe85587ebac3a81', text: () => import('./assets-chunks/auth_user-register_index_html.mjs').then(m => m.default)},
    'styles-AUA77EAO.css': {size: 729803, hash: 'VYkwwHhS+jI', text: () => import('./assets-chunks/styles-AUA77EAO_css.mjs').then(m => m.default)}
  },
};
