
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/home"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-CRWDOOMT.js",
      "chunk-TWR55DS5.js",
      "chunk-SGZVPLXZ.js"
    ],
    "route": "/home/main"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-MA2RYLGY.js"
    ],
    "route": "/home/detail"
  },
  {
    "renderMode": 2,
    "route": "/auth"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-MMKVXYGE.js"
    ],
    "route": "/auth/login"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-WRFFN5GO.js",
      "chunk-MYIS6U52.js",
      "chunk-LQ2CNIKZ.js",
      "chunk-SGZVPLXZ.js"
    ],
    "route": "/auth/user-register"
  },
  {
    "renderMode": 2,
    "route": "/support"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-JXNQ4REL.js",
      "chunk-TWR55DS5.js",
      "chunk-SGZVPLXZ.js"
    ],
    "route": "/support/imagen-product"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-FQTFWBUW.js",
      "chunk-74SYO77B.js",
      "chunk-LQ2CNIKZ.js",
      "chunk-SGZVPLXZ.js"
    ],
    "route": "/support/product"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-AYCJAOPC.js",
      "chunk-MPQT664S.js"
    ],
    "route": "/support/control"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-WLT5ILGY.js",
      "chunk-MPQT664S.js"
    ],
    "route": "/support/parameter"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-PQEGOS4Q.js"
    ],
    "route": "/support/system"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-ZT2U666A.js"
    ],
    "route": "/support/generate-random-color-imagen"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-7HLYEUHV.js",
      "chunk-MYIS6U52.js",
      "chunk-74SYO77B.js",
      "chunk-LQ2CNIKZ.js",
      "chunk-SGZVPLXZ.js"
    ],
    "route": "/support/employee"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-RM3LDXVF.js",
      "chunk-74SYO77B.js",
      "chunk-LQ2CNIKZ.js",
      "chunk-SGZVPLXZ.js"
    ],
    "route": "/support/store"
  },
  {
    "renderMode": 2,
    "redirectTo": "/home/main",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 58844, hash: '15b64501af59a76f5da6d41f47ef5a5cbeeb867624bc1a90af93f19cf434b551', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 49882, hash: '949084ba4fa4eac098258571e68f8cf0e96cc7d62b9a1da2d8361dd1cc91e7bb', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'home/detail/index.html': {size: 76013, hash: 'da68e4f558e1195f0d6b5d5c4f764965a582e0494bee663022a683986a1f7de0', text: () => import('./assets-chunks/home_detail_index_html.mjs').then(m => m.default)},
    'auth/index.html': {size: 74657, hash: '8287bf760cc3677e4f99176f350112dc6495f4741466113e44eaa3a109e8dba2', text: () => import('./assets-chunks/auth_index_html.mjs').then(m => m.default)},
    'home/index.html': {size: 74657, hash: '4ea12f30390e2f73779c3efcc936e15b05cc2051c72c9156b1bb9877187e6a4f', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'auth/login/index.html': {size: 81771, hash: '4bfd86f2d94ab77f8e4512f34ef6fda4d33b8119272049aab8d5cf309437ee09', text: () => import('./assets-chunks/auth_login_index_html.mjs').then(m => m.default)},
    'support/index.html': {size: 74657, hash: 'f9a69abb8c81b3e30951023461d08607545e400c38f181bad87b01bb5bb3f954', text: () => import('./assets-chunks/support_index_html.mjs').then(m => m.default)},
    'auth/user-register/index.html': {size: 95532, hash: '0ddd2f172d228197fd0208f3f1143db784c6e88f895f4b8bd9a2ec2fcd469b35', text: () => import('./assets-chunks/auth_user-register_index_html.mjs').then(m => m.default)},
    'support/imagen-product/index.html': {size: 90431, hash: 'eefefe978580b4d866850235ec60fcd801e770ece244ef80d5a35b7ec488b801', text: () => import('./assets-chunks/support_imagen-product_index_html.mjs').then(m => m.default)},
    'support/control/index.html': {size: 91283, hash: '0dc15eb781e9ac8e5aa8b2ff5be004f6479c3032385d1f5e68fa08f91bd775c6', text: () => import('./assets-chunks/support_control_index_html.mjs').then(m => m.default)},
    'support/parameter/index.html': {size: 84070, hash: 'eb2c648b44985d1ac55358a0b71ac67477bf15629df67f582ba28b69c9a89cc6', text: () => import('./assets-chunks/support_parameter_index_html.mjs').then(m => m.default)},
    'support/system/index.html': {size: 75948, hash: '604348d4441ff2ad300b9df509189e1612b88075a124525adb27c0eb3305b3c2', text: () => import('./assets-chunks/support_system_index_html.mjs').then(m => m.default)},
    'support/generate-random-color-imagen/index.html': {size: 75030, hash: 'ac565a94071cfc556fe91a9267368b0c41ff9c0b2d0bfc3d52d675aee64d631b', text: () => import('./assets-chunks/support_generate-random-color-imagen_index_html.mjs').then(m => m.default)},
    'home/main/index.html': {size: 85070, hash: '9626d657ba6f608cc22145073b3f9091b5cd2e3b6220ba752d2521c0f3635c85', text: () => import('./assets-chunks/home_main_index_html.mjs').then(m => m.default)},
    'support/product/index.html': {size: 84252, hash: 'f9da9e57df3b1685df1d215b0e1386340f05de108253abd7701b4f2fa258cb1e', text: () => import('./assets-chunks/support_product_index_html.mjs').then(m => m.default)},
    'support/employee/index.html': {size: 84304, hash: 'dad5c170871e0cffbdd21d384b08ed6a0e1323f97c75c45307e120ee1953de03', text: () => import('./assets-chunks/support_employee_index_html.mjs').then(m => m.default)},
    'support/store/index.html': {size: 84252, hash: 'a50d555605c56e3d871c8a88847b4c471a4853e241ff9d444f578e58b9c6dedf', text: () => import('./assets-chunks/support_store_index_html.mjs').then(m => m.default)},
    'styles-WUQ4DCOY.css': {size: 1667202, hash: 'H3ILzdqzuoY', text: () => import('./assets-chunks/styles-WUQ4DCOY_css.mjs').then(m => m.default)}
  },
};
