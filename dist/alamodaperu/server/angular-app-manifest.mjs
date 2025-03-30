
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
      "chunk-GGMS4PF5.js",
      "chunk-RRJYQH5A.js",
      "chunk-SGZVPLXZ.js"
    ],
    "route": "/home/main"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-VG2FNFID.js"
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
      "chunk-B46YM2WI.js"
    ],
    "route": "/auth/login"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-CRZEI3AF.js",
      "chunk-KHQMTLPU.js",
      "chunk-GJEU6FZM.js",
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
      "chunk-7QV4H67P.js"
    ],
    "route": "/support/product"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-LFOSE7KM.js",
      "chunk-RRJYQH5A.js",
      "chunk-SGZVPLXZ.js"
    ],
    "route": "/support/imagen-product"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-UOAGKVCD.js",
      "chunk-RRJYQH5A.js",
      "chunk-SGZVPLXZ.js"
    ],
    "route": "/support/product-stock"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-SA5PXQDU.js",
      "chunk-LVBVXXGA.js"
    ],
    "route": "/support/control"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-XYDSDNEQ.js",
      "chunk-LVBVXXGA.js"
    ],
    "route": "/support/parameter"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-UZ5ARMVQ.js"
    ],
    "route": "/support/system"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-Q7YZGFUQ.js",
      "chunk-E5L23D6D.js",
      "chunk-GJEU6FZM.js",
      "chunk-SGZVPLXZ.js"
    ],
    "route": "/support/page"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-BQMG6THC.js"
    ],
    "route": "/support/generate-random-color-imagen"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-I34KNBB2.js",
      "chunk-E5L23D6D.js",
      "chunk-KHQMTLPU.js",
      "chunk-GJEU6FZM.js",
      "chunk-SGZVPLXZ.js"
    ],
    "route": "/support/employee"
  },
  {
    "renderMode": 2,
    "redirectTo": "/home/main",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 58844, hash: '1eca0d03a33a6fb41c6d159c98bac1c972a1ff2cfb4e3671acc2b1179f4ae610', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 49882, hash: '761865822f84d44afcc14eee74f65828a21e250f0ce3266717b0b7c19b3c8d3f', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'auth/index.html': {size: 74657, hash: '7f0ee95c2e53993c2a3b992b3dffa96c8ff5f4d54e4b3d3b605f1e96d8b090be', text: () => import('./assets-chunks/auth_index_html.mjs').then(m => m.default)},
    'home/detail/index.html': {size: 76013, hash: '8995161674d44d7d541f15fe79fa3ac4f1ed5c674d78612c51ca9ca78f7922ec', text: () => import('./assets-chunks/home_detail_index_html.mjs').then(m => m.default)},
    'home/index.html': {size: 74657, hash: 'c06273a2bd99bcaeeb8f523413afb67e4b983440e042b825943ac7caaf388a9e', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'auth/login/index.html': {size: 81771, hash: '8e169e060be0e98ed5b7d130ddd0a26599a8ef2dd075c29a54924948862a4578', text: () => import('./assets-chunks/auth_login_index_html.mjs').then(m => m.default)},
    'auth/user-register/index.html': {size: 95449, hash: '87601c3fdb48daed6040883e7a31689790e316601dedab130a173264bb6e14b5', text: () => import('./assets-chunks/auth_user-register_index_html.mjs').then(m => m.default)},
    'support/index.html': {size: 74657, hash: 'a81137cd6c2e3b965b721c8f4d5ab232099e0945536ddf3036afe07b97478e81', text: () => import('./assets-chunks/support_index_html.mjs').then(m => m.default)},
    'support/product-stock/index.html': {size: 75168, hash: 'd9c0e8a5575bb8c9b0f086e9e07a001fe0da04556499fbb5a817699a669949e7', text: () => import('./assets-chunks/support_product-stock_index_html.mjs').then(m => m.default)},
    'support/imagen-product/index.html': {size: 90431, hash: '6d6775f136cd5d1e9e0f675fb89e1cc225a243fe78eb3038b4b9d5866c267826', text: () => import('./assets-chunks/support_imagen-product_index_html.mjs').then(m => m.default)},
    'support/parameter/index.html': {size: 84070, hash: 'a3b9aba660fb9bceaecea09b50e6fad69a824fad2bc0388cb7e8e7569f380a41', text: () => import('./assets-chunks/support_parameter_index_html.mjs').then(m => m.default)},
    'home/main/index.html': {size: 85070, hash: '536210bf3912cc6c37d09eec4d18d97d1be8bed0f75da5efd9e8c3385a5a855c', text: () => import('./assets-chunks/home_main_index_html.mjs').then(m => m.default)},
    'support/control/index.html': {size: 91283, hash: 'fc99a624e373a4df1cabe63b84f6f00e8607b3cb854c1b30c2af41e5ae51d284', text: () => import('./assets-chunks/support_control_index_html.mjs').then(m => m.default)},
    'support/system/index.html': {size: 75948, hash: '5dc673d30733d1effe73be0267c851974455dfbfee65b1e649e8f934f33f5a50', text: () => import('./assets-chunks/support_system_index_html.mjs').then(m => m.default)},
    'support/generate-random-color-imagen/index.html': {size: 75030, hash: 'da3b6b298bc0e8e91f3ff10029d49ba2344ff03e4811b8f6c0c001cea4bb5973', text: () => import('./assets-chunks/support_generate-random-color-imagen_index_html.mjs').then(m => m.default)},
    'support/product/index.html': {size: 84966, hash: '68fee02c6d46d1ca453de3951b8743f2deacdcb125c7b3af4aba034370f8d813', text: () => import('./assets-chunks/support_product_index_html.mjs').then(m => m.default)},
    'support/page/index.html': {size: 85263, hash: 'ef0e0190fbd6f20681c5bd19c39eee1c126d66a6bff2c94722cb4de252704050', text: () => import('./assets-chunks/support_page_index_html.mjs').then(m => m.default)},
    'support/employee/index.html': {size: 84304, hash: '6c061ca4f73d76ae2a5afd894f464025ea55fd7c74f2e860a87be65e314d822d', text: () => import('./assets-chunks/support_employee_index_html.mjs').then(m => m.default)},
    'styles-WUQ4DCOY.css': {size: 1667202, hash: 'H3ILzdqzuoY', text: () => import('./assets-chunks/styles-WUQ4DCOY_css.mjs').then(m => m.default)}
  },
};
