import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'support/product/detail/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'support/system/detail/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'support/menu/detail/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'support/supplier/detail/:id',
    renderMode: RenderMode.Client
  }, 
   {
    path: 'support/page/detail/:id',
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender // This catches everything else
  }
];
