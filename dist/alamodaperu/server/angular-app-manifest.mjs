
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/home/main",
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/home"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-GTHARCUQ.js",
      "chunk-QWGOPHMS.js",
      "chunk-SM2U5EFL.js"
    ],
    "route": "/home/main"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-K6GSLKKJ.js",
      "chunk-QA622CXO.js",
      "chunk-SM2U5EFL.js"
    ],
    "route": "/home/detail"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-IKXHAHB7.js",
      "chunk-QA622CXO.js",
      "chunk-IGSJ74VS.js",
      "chunk-SM2U5EFL.js"
    ],
    "route": "/home/quotation"
  },
  {
    "renderMode": 2,
    "route": "/auth"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-OT5WMUHJ.js"
    ],
    "route": "/auth/login"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-24WLCNUA.js",
      "chunk-VCL27VZS.js",
      "chunk-GJEU6FZM.js",
      "chunk-IGSJ74VS.js",
      "chunk-SM2U5EFL.js"
    ],
    "route": "/auth/register"
  },
  {
    "renderMode": 2,
    "route": "/support"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-JCLG6MPK.js",
      "chunk-QWGOPHMS.js",
      "chunk-SM2U5EFL.js"
    ],
    "route": "/support/imagen-product"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-PTV6YQWZ.js",
      "chunk-7TELWWLP.js",
      "chunk-YZLXWSIR.js",
      "chunk-GJEU6FZM.js",
      "chunk-IGSJ74VS.js",
      "chunk-SM2U5EFL.js"
    ],
    "route": "/support/product"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-KZQVKJJM.js",
      "chunk-VCL27VZS.js",
      "chunk-YZLXWSIR.js",
      "chunk-GJEU6FZM.js",
      "chunk-IGSJ74VS.js",
      "chunk-SM2U5EFL.js"
    ],
    "route": "/support/product/detail/*"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-OWOMRIQJ.js",
      "chunk-7TELWWLP.js",
      "chunk-YZLXWSIR.js",
      "chunk-GJEU6FZM.js",
      "chunk-IGSJ74VS.js",
      "chunk-SM2U5EFL.js"
    ],
    "route": "/support/employee"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-RIKGOKZU.js",
      "chunk-7TELWWLP.js",
      "chunk-YZLXWSIR.js",
      "chunk-GJEU6FZM.js",
      "chunk-IGSJ74VS.js",
      "chunk-SM2U5EFL.js"
    ],
    "route": "/support/store"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-6U75NBF2.js",
      "chunk-7TELWWLP.js",
      "chunk-IGSJ74VS.js",
      "chunk-SM2U5EFL.js"
    ],
    "route": "/support/supplier"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-ZCQFNHL6.js",
      "chunk-YZLXWSIR.js",
      "chunk-GJEU6FZM.js",
      "chunk-IGSJ74VS.js",
      "chunk-SM2U5EFL.js"
    ],
    "route": "/support/supplier/detail/*"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-E7C44BPO.js",
      "chunk-R6IASW6H.js",
      "chunk-7TELWWLP.js",
      "chunk-IGSJ74VS.js",
      "chunk-SM2U5EFL.js"
    ],
    "route": "/support/tenant"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-UBGY5NCE.js",
      "chunk-R6IASW6H.js",
      "chunk-YZLXWSIR.js",
      "chunk-GJEU6FZM.js",
      "chunk-IGSJ74VS.js",
      "chunk-SM2U5EFL.js"
    ],
    "route": "/support/tenant/detail/*"
  },
  {
    "renderMode": 2,
    "route": "/system-admin"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-SX2MXBYW.js",
      "chunk-IOUYSUNS.js"
    ],
    "route": "/system-admin/control"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-IOQQTS2V.js",
      "chunk-IOUYSUNS.js"
    ],
    "route": "/system-admin/parameter"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-QWSKNL3P.js"
    ],
    "route": "/system-admin/generate-random-color-imagen"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-FODC7YE5.js",
      "chunk-7TELWWLP.js",
      "chunk-IGSJ74VS.js",
      "chunk-SM2U5EFL.js"
    ],
    "route": "/system-admin/system"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-7LK6COM3.js"
    ],
    "route": "/system-admin/system/detail/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RSODBEBA.js",
      "chunk-IGSJ74VS.js",
      "chunk-SM2U5EFL.js"
    ],
    "route": "/system-admin/page/detail/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-VRDKV4WG.js",
      "chunk-IGSJ74VS.js",
      "chunk-SM2U5EFL.js"
    ],
    "route": "/system-admin/menu/detail/*"
  },
  {
    "renderMode": 2,
    "redirectTo": "/home/main",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 58858, hash: '55b0822529759d7651461e38669e9a6f651cea239d8b8f63c2b074042a831b06', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 49896, hash: '2c3b9bfe6946e47ae11a77bae92fb8050274cc4ad6360b8d5bf0177853bd89dc', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'home/main/index.html': {size: 95876, hash: 'efb4bbc7a1b5202dfe3492db4c99426d653e4548dbb593f4a95261d98de515bd', text: () => import('./assets-chunks/home_main_index_html.mjs').then(m => m.default)},
    'home/index.html': {size: 92034, hash: '0012b9f91b25375033d02aae39826fafb65fb300c3930a5cdd1de3a4c660ce27', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'home/detail/index.html': {size: 124992, hash: '750fa9d69a2f1dca59670b7058a25c67ab513ca99f6019be3f3942849db17f45', text: () => import('./assets-chunks/home_detail_index_html.mjs').then(m => m.default)},
    'home/quotation/index.html': {size: 154824, hash: 'fb5ab6d3e164c094d1cb59224cf0f83d193ef89fcbcfe27da5482202e22bf2a5', text: () => import('./assets-chunks/home_quotation_index_html.mjs').then(m => m.default)},
    'auth/index.html': {size: 92034, hash: '1c1678628009088d4ce511149e53c4657027f406a8b0310ada3d6323d5ef2251', text: () => import('./assets-chunks/auth_index_html.mjs').then(m => m.default)},
    'auth/login/index.html': {size: 99363, hash: '4bc180af18369090284370b5a057840f84fe6441653bbb0d5e855b092423a9cf', text: () => import('./assets-chunks/auth_login_index_html.mjs').then(m => m.default)},
    'support/index.html': {size: 92034, hash: '2cb3064f5a2a152fdf3c8875ce4ea642acf780d94724a41d8fb81bb920b2ee03', text: () => import('./assets-chunks/support_index_html.mjs').then(m => m.default)},
    'support/imagen-product/index.html': {size: 105340, hash: 'c9d34fd27079aabd4d9cbc56323e0ba9a1a955eb08eaf19ba9f75cfd9ecaf938', text: () => import('./assets-chunks/support_imagen-product_index_html.mjs').then(m => m.default)},
    'auth/register/index.html': {size: 109908, hash: '751bdc68342df498ef3d6ca93f85fe5b87fb43249fc3abdf75d9260391314c6d', text: () => import('./assets-chunks/auth_register_index_html.mjs').then(m => m.default)},
    'support/store/index.html': {size: 98571, hash: 'b12f0dd59e52767564f5481bc6b770781adb578306a8b22178d06c359a093974', text: () => import('./assets-chunks/support_store_index_html.mjs').then(m => m.default)},
    'support/employee/index.html': {size: 98571, hash: '31adfc1c3a00dc6a3967f1b1de3a6c4e5c922957c50fa53d6c84bb9b05d4c1a3', text: () => import('./assets-chunks/support_employee_index_html.mjs').then(m => m.default)},
    'support/product/index.html': {size: 99814, hash: '2b52fffd7b8f63079c323ba135953d923d5376b3dc37ed54dfed23a60290b558', text: () => import('./assets-chunks/support_product_index_html.mjs').then(m => m.default)},
    'support/supplier/index.html': {size: 99710, hash: '3d8d2352f249a0168f6b4e7e4050fdc3a1e23a8a95c905fa0b9177557f166847', text: () => import('./assets-chunks/support_supplier_index_html.mjs').then(m => m.default)},
    'support/tenant/index.html': {size: 92295, hash: 'ac1555bd5bb3931afb088d449928625bd0df974005a2ae7b29723d37ed6f3394', text: () => import('./assets-chunks/support_tenant_index_html.mjs').then(m => m.default)},
    'system-admin/index.html': {size: 92038, hash: 'd5ee68ef56d4fff0bff4b6b9fcbbf008763c5b969b17ec9bfa1d100930b61ad7', text: () => import('./assets-chunks/system-admin_index_html.mjs').then(m => m.default)},
    'system-admin/control/index.html': {size: 108967, hash: 'fde3b4fdd1ebeb758ea0d727c16d188fdb7a327a2b6e311fbd3d0fc0239a6332', text: () => import('./assets-chunks/system-admin_control_index_html.mjs').then(m => m.default)},
    'system-admin/parameter/index.html': {size: 101698, hash: 'be26277e4993619cd2dd20deecf6bacc42c8eccb666131f61b6076098bbb89d8', text: () => import('./assets-chunks/system-admin_parameter_index_html.mjs').then(m => m.default)},
    'system-admin/generate-random-color-imagen/index.html': {size: 92412, hash: '7ef0bf2e8afd2599ee30130f0de782efefba953331d88fa152b51916bbfe60ac', text: () => import('./assets-chunks/system-admin_generate-random-color-imagen_index_html.mjs').then(m => m.default)},
    'system-admin/system/index.html': {size: 99712, hash: 'df25c96961333d25291d56de1b9ec39e9ccb751bcb291e12919d7ec820b15ed0', text: () => import('./assets-chunks/system-admin_system_index_html.mjs').then(m => m.default)},
    'styles-OE7GQLO5.css': {size: 1667160, hash: 'ZbX5DekT54I', text: () => import('./assets-chunks/styles-OE7GQLO5_css.mjs').then(m => m.default)}
  },
};
