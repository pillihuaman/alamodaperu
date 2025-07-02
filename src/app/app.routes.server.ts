import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'support/product/detail/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'system-admin/system/detail/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'system-admin/menu/detail/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'support/supplier/detail/:id',
    renderMode: RenderMode.Client
  }, 
   {
    path: 'system-admin/page/detail/:id',
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender // This catches everything else
  }
];
