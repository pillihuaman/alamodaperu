
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
      "chunk-3EZ4EWCF.js",
      "chunk-AYWXOFQG.js",
      "chunk-SM2U5EFL.js"
    ],
    "route": "/home/main"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-2IDLSGQC.js"
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
      "chunk-BAE6QD64.js"
    ],
    "route": "/auth/login"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-DMIRPOWI.js",
      "chunk-ZSG5KS6B.js",
      "chunk-GJEU6FZM.js",
      "chunk-6HQQTRXB.js",
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
      "chunk-V6DFHR3J.js",
      "chunk-AYWXOFQG.js",
      "chunk-SM2U5EFL.js"
    ],
    "route": "/support/imagen-product"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-X7MBK6WX.js",
      "chunk-UKJ5OTZR.js",
      "chunk-IVSMQMJ3.js",
      "chunk-GJEU6FZM.js",
      "chunk-6HQQTRXB.js",
      "chunk-SM2U5EFL.js"
    ],
    "route": "/support/product"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-PT272OEQ.js",
      "chunk-ZSG5KS6B.js",
      "chunk-IVSMQMJ3.js",
      "chunk-GJEU6FZM.js",
      "chunk-6HQQTRXB.js",
      "chunk-SM2U5EFL.js"
    ],
    "route": "/support/product/detail/*"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-B24XF2NE.js",
      "chunk-WT7LSI7Q.js"
    ],
    "route": "/support/control"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-R4IDSJXN.js",
      "chunk-WT7LSI7Q.js"
    ],
    "route": "/support/parameter"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-63FD6TIA.js"
    ],
    "route": "/support/generate-random-color-imagen"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-V5TCYXPH.js",
      "chunk-UKJ5OTZR.js",
      "chunk-IVSMQMJ3.js",
      "chunk-GJEU6FZM.js",
      "chunk-6HQQTRXB.js",
      "chunk-SM2U5EFL.js"
    ],
    "route": "/support/employee"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-QUGJ5QMN.js",
      "chunk-UKJ5OTZR.js",
      "chunk-IVSMQMJ3.js",
      "chunk-GJEU6FZM.js",
      "chunk-6HQQTRXB.js",
      "chunk-SM2U5EFL.js"
    ],
    "route": "/support/store"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-LGE53NF2.js",
      "chunk-UKJ5OTZR.js",
      "chunk-6HQQTRXB.js",
      "chunk-SM2U5EFL.js"
    ],
    "route": "/support/system"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EO5L7PHY.js"
    ],
    "route": "/support/system/detail/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-KQUD4XOH.js",
      "chunk-6HQQTRXB.js",
      "chunk-SM2U5EFL.js"
    ],
    "route": "/support/page/detail/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-X43N6NZ7.js",
      "chunk-6HQQTRXB.js",
      "chunk-SM2U5EFL.js"
    ],
    "route": "/support/menu/detail/*"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-BKQGUQ6L.js",
      "chunk-UKJ5OTZR.js",
      "chunk-6HQQTRXB.js",
      "chunk-SM2U5EFL.js"
    ],
    "route": "/support/supplier"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-ZPTEGUNJ.js",
      "chunk-IVSMQMJ3.js",
      "chunk-GJEU6FZM.js",
      "chunk-6HQQTRXB.js",
      "chunk-SM2U5EFL.js"
    ],
    "route": "/support/supplier/detail/*"
  },
  {
    "renderMode": 2,
    "redirectTo": "/home/main",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 58844, hash: 'a3e9bf2ad487efa6e29e193366229022a70b919c5ef328b843dc36f35121cd70', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 49882, hash: 'a35ad933aefcc5c7d61dc5a6109357a3ccd8b6a46d000396e65c6da66929d1dd', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'auth/index.html': {size: 81146, hash: '958891683329bd894e760338441badd86f3ecf7bcc2a8cbe349a25891f0d5251', text: () => import('./assets-chunks/auth_index_html.mjs').then(m => m.default)},
    'home/index.html': {size: 81527, hash: 'bf352ffe020e2dd533006549fde522348f32bd7ce653d95c3d9b6925b0f8dcb0', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'home/main/index.html': {size: 88299, hash: '240e083c87604f077a98713d558702fdba8d984cd4da8b97c0a32cb366bc826e', text: () => import('./assets-chunks/home_main_index_html.mjs').then(m => m.default)},
    'home/detail/index.html': {size: 82883, hash: '2f6c43039b0a4921f0eccc43b03e5f67ea116308455563f91ebb194b2ae72cac', text: () => import('./assets-chunks/home_detail_index_html.mjs').then(m => m.default)},
    'auth/login/index.html': {size: 88277, hash: '4cbc93486270bf9f1a2d2e96a2506dffec6debb27606b73ec891ee1b8d0484bc', text: () => import('./assets-chunks/auth_login_index_html.mjs').then(m => m.default)},
    'support/index.html': {size: 83826, hash: '2e831862a7b15a950313eecabc953494fa4509964e1170f292384829881ea676', text: () => import('./assets-chunks/support_index_html.mjs').then(m => m.default)},
    'auth/register/index.html': {size: 101925, hash: '44fc81c006fd4471e9c2b3cf55fc063902cc131945a5bc6e70a70be5379922f9', text: () => import('./assets-chunks/auth_register_index_html.mjs').then(m => m.default)},
    'support/imagen-product/index.html': {size: 99600, hash: 'd6d7e151585a43d7a12f93080484d75cf6dd9c86f5b6ee292efe7555b9f21ab7', text: () => import('./assets-chunks/support_imagen-product_index_html.mjs').then(m => m.default)},
    'support/control/index.html': {size: 100452, hash: '818b792f365b716a172f6edfb4117238eb0d5b3bdf56a4383860163f1b203fb8', text: () => import('./assets-chunks/support_control_index_html.mjs').then(m => m.default)},
    'support/parameter/index.html': {size: 93239, hash: 'ae656d68d6be6e1a86d36d0e39007c15f158dde07371b995dc7dfa696be033ec', text: () => import('./assets-chunks/support_parameter_index_html.mjs').then(m => m.default)},
    'support/generate-random-color-imagen/index.html': {size: 84199, hash: '6700964ccad127bb75a2f063053ecc6b49a1a1d3593a7795b092d0d7825cc8c3', text: () => import('./assets-chunks/support_generate-random-color-imagen_index_html.mjs').then(m => m.default)},
    'support/system/index.html': {size: 90784, hash: '9762f4f0561077e1feefdf6825ed5a1c5b3442c2cb3d8f2d278f8797150b225e', text: () => import('./assets-chunks/support_system_index_html.mjs').then(m => m.default)},
    'support/store/index.html': {size: 90888, hash: 'd444049fd891c64b8da0cfcf00cb16c8b166b1350e8108e82e8b69d6b0b11dca', text: () => import('./assets-chunks/support_store_index_html.mjs').then(m => m.default)},
    'support/product/index.html': {size: 90888, hash: '37d7354ba4bfaf8a1794bffa37baf0fe8d2fe337a7a9d06ba576f5162aa6fb5d', text: () => import('./assets-chunks/support_product_index_html.mjs').then(m => m.default)},
    'support/employee/index.html': {size: 90888, hash: '533ad96e89399d50cbbd6174f4990221623ce09af7bff135a3275b548a0f4848', text: () => import('./assets-chunks/support_employee_index_html.mjs').then(m => m.default)},
    'support/supplier/index.html': {size: 90784, hash: 'f8e7b6a3378a1917abd599ad96a63f5497c7de88d72df182d172d1ba0cdd5556', text: () => import('./assets-chunks/support_supplier_index_html.mjs').then(m => m.default)},
    'styles-4QOUSXMU.css': {size: 1667054, hash: 'vrdZ5sEG8ck', text: () => import('./assets-chunks/styles-4QOUSXMU_css.mjs').then(m => m.default)}
  },
};
