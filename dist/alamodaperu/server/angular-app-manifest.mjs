
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
      "chunk-AXY37T3P.js",
      "chunk-DUEX7GZ6.js",
      "chunk-SM2U5EFL.js"
    ],
    "route": "/home/main"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-65VNFRMJ.js",
      "chunk-SM2U5EFL.js"
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
      "chunk-Q7GA5FGS.js"
    ],
    "route": "/auth/login"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-AMNSXLHF.js",
      "chunk-SEGHYHH7.js",
      "chunk-GJEU6FZM.js",
      "chunk-LRVPKQWK.js",
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
      "chunk-F2EIMFDR.js",
      "chunk-DUEX7GZ6.js",
      "chunk-SM2U5EFL.js"
    ],
    "route": "/support/imagen-product"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-FGHAGOUD.js",
      "chunk-V7NZXRXS.js",
      "chunk-DILUZ57C.js",
      "chunk-GJEU6FZM.js",
      "chunk-LRVPKQWK.js",
      "chunk-SM2U5EFL.js"
    ],
    "route": "/support/product"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-UTNAHAHB.js",
      "chunk-SEGHYHH7.js",
      "chunk-DILUZ57C.js",
      "chunk-GJEU6FZM.js",
      "chunk-LRVPKQWK.js",
      "chunk-SM2U5EFL.js"
    ],
    "route": "/support/product/detail/*"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-4RBDB7KB.js",
      "chunk-V7NZXRXS.js",
      "chunk-DILUZ57C.js",
      "chunk-GJEU6FZM.js",
      "chunk-LRVPKQWK.js",
      "chunk-SM2U5EFL.js"
    ],
    "route": "/support/employee"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-MKMXCVPB.js",
      "chunk-V7NZXRXS.js",
      "chunk-DILUZ57C.js",
      "chunk-GJEU6FZM.js",
      "chunk-LRVPKQWK.js",
      "chunk-SM2U5EFL.js"
    ],
    "route": "/support/store"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-MEQJA3Q2.js",
      "chunk-V7NZXRXS.js",
      "chunk-LRVPKQWK.js",
      "chunk-SM2U5EFL.js"
    ],
    "route": "/support/supplier"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EZAZ5T3K.js",
      "chunk-DILUZ57C.js",
      "chunk-GJEU6FZM.js",
      "chunk-LRVPKQWK.js",
      "chunk-SM2U5EFL.js"
    ],
    "route": "/support/supplier/detail/*"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-5Y3LOQ7B.js",
      "chunk-R6IASW6H.js",
      "chunk-V7NZXRXS.js",
      "chunk-LRVPKQWK.js",
      "chunk-SM2U5EFL.js"
    ],
    "route": "/support/tenant"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-O7XNX6JC.js",
      "chunk-R6IASW6H.js",
      "chunk-DILUZ57C.js",
      "chunk-GJEU6FZM.js",
      "chunk-LRVPKQWK.js",
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
      "chunk-ZWF6PYBC.js",
      "chunk-RFC46ZEG.js"
    ],
    "route": "/system-admin/control"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-6BPOHXJN.js",
      "chunk-RFC46ZEG.js"
    ],
    "route": "/system-admin/parameter"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-FDGBCRFP.js"
    ],
    "route": "/system-admin/generate-random-color-imagen"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-AWPXLWL5.js",
      "chunk-V7NZXRXS.js",
      "chunk-LRVPKQWK.js",
      "chunk-SM2U5EFL.js"
    ],
    "route": "/system-admin/system"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-2UTISA7Z.js"
    ],
    "route": "/system-admin/system/detail/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-D6KJP2EE.js",
      "chunk-LRVPKQWK.js",
      "chunk-SM2U5EFL.js"
    ],
    "route": "/system-admin/page/detail/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-NBXDB46Y.js",
      "chunk-LRVPKQWK.js",
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
    'index.csr.html': {size: 58858, hash: '4cddbb94587d2a855a6a88d1efd3ca5ed69f7949a40e612d9675c11e1baff5fb', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 49896, hash: 'c29d08add0a45a333ac2c1b2b6bd4dc6d39a0f74599b0493620154a02ba472e5', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'home/index.html': {size: 60399, hash: '3140129c63191f01aade9b8c278b0f5a9cb5a2f3da93003db9638e4c934e55ce', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'home/main/index.html': {size: 67287, hash: '00579c01b0799595ce868bc47b3aea8b5a97e61296aed35433da0a4605280e93', text: () => import('./assets-chunks/home_main_index_html.mjs').then(m => m.default)},
    'auth/index.html': {size: 61998, hash: '8507adab4a3a8571c3272aedbddf501cf32183322cc847512cb70257a9fbbe48', text: () => import('./assets-chunks/auth_index_html.mjs').then(m => m.default)},
    'home/detail/index.html': {size: 87267, hash: '1341cc57001563da7fa4e157ecd59bffc80b4317594b2c1214f276a199c8b9a9', text: () => import('./assets-chunks/home_detail_index_html.mjs').then(m => m.default)},
    'auth/login/index.html': {size: 67921, hash: '474e54401e86e92d72e918ac97a7332a97055070b22378fe9fa821a7a2a6007d', text: () => import('./assets-chunks/auth_login_index_html.mjs').then(m => m.default)},
    'support/index.html': {size: 60399, hash: 'ccaf5499f5a2ae4ccb18c77ad077da6fe757f8b5f01092dd20799ec42dbbafe9', text: () => import('./assets-chunks/support_index_html.mjs').then(m => m.default)},
    'auth/register/index.html': {size: 76928, hash: '437f78d37c25ecf6f591390afb33c677fe92f9d26458b7233a850d5ceaa17731', text: () => import('./assets-chunks/auth_register_index_html.mjs').then(m => m.default)},
    'support/imagen-product/index.html': {size: 73017, hash: 'b5b4ea299cf1d2d54c388c42e00f6f6d6fa07fff9511d3471a1a3180f557fbd5', text: () => import('./assets-chunks/support_imagen-product_index_html.mjs').then(m => m.default)},
    'support/product/index.html': {size: 76751, hash: 'de4460e3ccfeb631d3ba0091aa1b89f987542a04fbc37205de2cfa804a142911', text: () => import('./assets-chunks/support_product_index_html.mjs').then(m => m.default)},
    'support/supplier/index.html': {size: 76260, hash: 'df91d9ba1cb382076cd929437b2bec0cce1195cf821f799488afaee98b01c1c3', text: () => import('./assets-chunks/support_supplier_index_html.mjs').then(m => m.default)},
    'system-admin/index.html': {size: 62002, hash: 'e6aa81680065665e164fbda7837e404a30248e55eb7e49de56e11a99e3b1aab6', text: () => import('./assets-chunks/system-admin_index_html.mjs').then(m => m.default)},
    'support/tenant/index.html': {size: 60660, hash: 'bafc62004506f77ae3669d6169b02178a2c9e9139035d83cfd449feb8d511982', text: () => import('./assets-chunks/support_tenant_index_html.mjs').then(m => m.default)},
    'system-admin/control/index.html': {size: 74413, hash: '51a180880467614c022c7f740f323f46d338612f5b238ad9ca5c5465688b922a', text: () => import('./assets-chunks/system-admin_control_index_html.mjs').then(m => m.default)},
    'system-admin/parameter/index.html': {size: 69992, hash: 'a88b61323d83e55be304698e8c8f900608599e3957914e9a9f1d8f5a42680346', text: () => import('./assets-chunks/system-admin_parameter_index_html.mjs').then(m => m.default)},
    'support/employee/index.html': {size: 71306, hash: '5149ec60fa04fe006da87ebf287a75a0e675af4fa87732fd3350e2f41fb119e4', text: () => import('./assets-chunks/support_employee_index_html.mjs').then(m => m.default)},
    'support/store/index.html': {size: 71306, hash: 'c544907d158cdbef58157f5e27f6d03ce68b916b0ad5cbbc874a0ae0c24e16ab', text: () => import('./assets-chunks/support_store_index_html.mjs').then(m => m.default)},
    'system-admin/generate-random-color-imagen/index.html': {size: 60857, hash: 'e19994b9b5c482e003e962a736645e1661d1496cf9135d1be41d61067709446d', text: () => import('./assets-chunks/system-admin_generate-random-color-imagen_index_html.mjs').then(m => m.default)},
    'system-admin/system/index.html': {size: 78289, hash: '922fa2d5a95f3942776b7e40c50a0af5877ed202161a197a483364864dac2d75', text: () => import('./assets-chunks/system-admin_system_index_html.mjs').then(m => m.default)},
    'styles-OE7GQLO5.css': {size: 1667160, hash: 'ZbX5DekT54I', text: () => import('./assets-chunks/styles-OE7GQLO5_css.mjs').then(m => m.default)}
  },
};
