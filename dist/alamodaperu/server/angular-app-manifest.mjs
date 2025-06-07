
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
      "chunk-OX6IXMQC.js",
      "chunk-Q6BP24XQ.js",
      "chunk-SM2U5EFL.js"
    ],
    "route": "/home/main"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-VUHH5XBG.js"
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
      "chunk-BEIPMJAJ.js"
    ],
    "route": "/auth/login"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-JO5OKPCQ.js",
      "chunk-YC56EOMS.js",
      "chunk-GJEU6FZM.js",
      "chunk-WL5WWBSN.js",
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
      "chunk-A33IP7QM.js",
      "chunk-Q6BP24XQ.js",
      "chunk-SM2U5EFL.js"
    ],
    "route": "/support/imagen-product"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-YRSSLD2Q.js",
      "chunk-2ZX65H3W.js",
      "chunk-TPLC5BAK.js",
      "chunk-GJEU6FZM.js",
      "chunk-WL5WWBSN.js",
      "chunk-SM2U5EFL.js"
    ],
    "route": "/support/product"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RWAJKCID.js",
      "chunk-YC56EOMS.js",
      "chunk-TPLC5BAK.js",
      "chunk-GJEU6FZM.js",
      "chunk-WL5WWBSN.js",
      "chunk-SM2U5EFL.js"
    ],
    "route": "/support/product/detail/*"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-YEDTWYJZ.js",
      "chunk-637MD6IH.js"
    ],
    "route": "/support/control"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-I6AWGJ7V.js",
      "chunk-637MD6IH.js"
    ],
    "route": "/support/parameter"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-7ORXVTWG.js"
    ],
    "route": "/support/generate-random-color-imagen"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-ZL6KRLIK.js",
      "chunk-2ZX65H3W.js",
      "chunk-TPLC5BAK.js",
      "chunk-GJEU6FZM.js",
      "chunk-WL5WWBSN.js",
      "chunk-SM2U5EFL.js"
    ],
    "route": "/support/employee"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-2EPVPZHR.js",
      "chunk-2ZX65H3W.js",
      "chunk-TPLC5BAK.js",
      "chunk-GJEU6FZM.js",
      "chunk-WL5WWBSN.js",
      "chunk-SM2U5EFL.js"
    ],
    "route": "/support/store"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-VUE7OEVM.js",
      "chunk-2ZX65H3W.js",
      "chunk-WL5WWBSN.js",
      "chunk-SM2U5EFL.js"
    ],
    "route": "/support/system"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-P3N6YIQC.js"
    ],
    "route": "/support/system/detail/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-UGZDEGZV.js",
      "chunk-WL5WWBSN.js",
      "chunk-SM2U5EFL.js"
    ],
    "route": "/support/page/detail/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-5JXQPEIX.js",
      "chunk-WL5WWBSN.js",
      "chunk-SM2U5EFL.js"
    ],
    "route": "/support/menu/detail/*"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-YXPLRXBU.js",
      "chunk-2ZX65H3W.js",
      "chunk-WL5WWBSN.js",
      "chunk-SM2U5EFL.js"
    ],
    "route": "/support/supplier"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-LS3IL5TT.js",
      "chunk-TPLC5BAK.js",
      "chunk-GJEU6FZM.js",
      "chunk-WL5WWBSN.js",
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
    'index.csr.html': {size: 58844, hash: '27610e8ac12d2fd5ea117dabbccf23fb49972a077c34d98d78bed66fa869aaa8', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 49882, hash: '65926f67855315b35bea859d359d99ac0d19bed1309616ea153b627440731fa5', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'auth/index.html': {size: 81146, hash: '0eac56bb0bbbc87357154b5cdcea7b18ea87492eaf2bfcc22065deb0656ac79c', text: () => import('./assets-chunks/auth_index_html.mjs').then(m => m.default)},
    'home/detail/index.html': {size: 82883, hash: '4ea236228242a2e4f60e39ebcf9d094b43a163b01366841b3237c3d71eee9288', text: () => import('./assets-chunks/home_detail_index_html.mjs').then(m => m.default)},
    'home/main/index.html': {size: 88299, hash: '4d3ed076affb1f00343f96179fc5752deb83963d397e1cd523832d13202fcd9d', text: () => import('./assets-chunks/home_main_index_html.mjs').then(m => m.default)},
    'home/index.html': {size: 81527, hash: '4cab8e2cee3a2236d3a260a53b164d63d1f6a0037fcd7069475b29e491ab63d4', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'support/index.html': {size: 83826, hash: 'ccc5818f12745d5faefb5d8e31a321efdefb729e0b6882fc71256cf1878d6a2c', text: () => import('./assets-chunks/support_index_html.mjs').then(m => m.default)},
    'auth/login/index.html': {size: 88277, hash: 'dd4a4f27e98ac5170265d9f5dcad75a489d600ce711115b7cda61656ad3e4acc', text: () => import('./assets-chunks/auth_login_index_html.mjs').then(m => m.default)},
    'auth/register/index.html': {size: 101925, hash: '5fdb5c2dbd074a9786c9b63d0c9886cc6f7915e8470710704d03dc5029edcf29', text: () => import('./assets-chunks/auth_register_index_html.mjs').then(m => m.default)},
    'support/imagen-product/index.html': {size: 99600, hash: '2825c92a56e759ad23ae719e20c35ccf5b9db972da70fe02bbd579f75d08a3d8', text: () => import('./assets-chunks/support_imagen-product_index_html.mjs').then(m => m.default)},
    'support/control/index.html': {size: 100452, hash: '378c9b05984794452686162430e232374d1355078e9beea83bfef751786523ab', text: () => import('./assets-chunks/support_control_index_html.mjs').then(m => m.default)},
    'support/generate-random-color-imagen/index.html': {size: 84199, hash: '73024391c27f4e2bcf08282abbbbf30d7d5ebf2d61d08e68359d95f8025508d9', text: () => import('./assets-chunks/support_generate-random-color-imagen_index_html.mjs').then(m => m.default)},
    'support/parameter/index.html': {size: 93239, hash: 'b8fff7d2e4c7759a45676996066d4de3d949a01b6859c68705e19a07054e521e', text: () => import('./assets-chunks/support_parameter_index_html.mjs').then(m => m.default)},
    'support/product/index.html': {size: 90888, hash: '1f17cfd4ef98b63632fe7ec673af31231a383d018100278cca30015e3d95f292', text: () => import('./assets-chunks/support_product_index_html.mjs').then(m => m.default)},
    'support/employee/index.html': {size: 90888, hash: 'ef010425523d83c3c29ff218a68cc9675d248d969c7f33df265088d6b28e0591', text: () => import('./assets-chunks/support_employee_index_html.mjs').then(m => m.default)},
    'support/store/index.html': {size: 90888, hash: '8b9e6269ddac0b9e092eb16d20f278653915419f4837047e5420229784577015', text: () => import('./assets-chunks/support_store_index_html.mjs').then(m => m.default)},
    'support/system/index.html': {size: 90784, hash: '8ca22f29cd91dd5fecfbb6baaa5c423c3b377558696f92a7959d36fa4c41ae88', text: () => import('./assets-chunks/support_system_index_html.mjs').then(m => m.default)},
    'support/supplier/index.html': {size: 90784, hash: 'f4e7d5683535c9b7fcf271ced85199b08f0725ff4acd228ea57258a1ce224f2d', text: () => import('./assets-chunks/support_supplier_index_html.mjs').then(m => m.default)},
    'styles-4QOUSXMU.css': {size: 1667054, hash: 'vrdZ5sEG8ck', text: () => import('./assets-chunks/styles-4QOUSXMU_css.mjs').then(m => m.default)}
  },
};
