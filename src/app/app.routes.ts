import { Routes } from '@angular/router';
import { AuthComponent } from './@presentation/auth/auth.component';
import { HomeComponent } from './@presentation/home/home.component';
import { PageComponent } from './@presentation/pages/page.component';
import { AuthGuard } from './@data/interceptors';
import { NotauthGuard } from './@data/interceptors/notauth.guard';
import { SystemComponent } from './@presentation/system-admin/system.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'main',
        loadComponent: () => import('./@presentation/home/main/main-page/main-page.component')
          .then(m => m.MainPageComponent)
      },
      {
        path: 'detail',
        loadComponent: () => import('./@presentation/home/main/detail-main-page/detail-main-page.component')
          .then(m => m.DetailMainPageComponent)
      },
     {
        path: 'quotations', 
        loadComponent: () => import('./@presentation/home/cotizacion/quotation-list/quotation-list.component')
          .then(m => m.QuotationListComponent)
      },
      {
        // Ruta para VER o EDITAR una cotización existente por su ID
        path: 'quotation/detail/:id', // La ruta que causaba el error
        loadComponent: () => import('./@presentation/home/cotizacion/quotation-detail/quotation-create.component')
          .then(m => m.QuotationCreateComponent),
        data: { renderMode: 'client' } // Importante para SSR
      },
    ],
  },
  {
    path: 'auth',
    component: AuthComponent,
    //canActivate: [NotauthGuard], // Puedes habilitarlo si el guard funciona bien
    children: [
      {
        path: 'login',
        loadComponent: () => import('./@presentation/auth/user/login/login.component')
          .then(m => m.LoginComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('./@presentation/auth/user/user-register/user-register.component')
          .then(m => m.UserRegisterComponent)
      },
    ],
  },
  {
    path: 'support',
    component: PageComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'imagen-product',
        loadComponent: () => import('./@presentation/pages/support/register-image-by-product/register-image-by-product.component')
          .then(m => m.RegisterImageByProductComponent)
      },
      {
        path: 'product',
        loadComponent: () => import('./@presentation/pages/support/product/product.component')
          .then(m => m.ProductComponent)
      },
      {
        path: 'product/detail/:id',
        loadComponent: () => import('./@presentation/pages/support/product/detail-product/detail-product.component')
          .then(m => m.DetailProductComponent),
        data: { renderMode: 'client' }
      },
      {
        path: 'employee',
        loadComponent: () => import('./@presentation/pages/support/workers/employee/employee.component')
          .then(m => m.EmployeeComponent)
      },
      {
        path: 'store',
        loadComponent: () => import('./@presentation/pages/support/stores/store.component')
          .then(m => m.StoreComponent)
      },
      {
        path: 'supplier',
        loadComponent: () => import('./@presentation/pages/support/supplier/supplier.component')
          .then(m => m.SupplierComponent)
      },
      {
        path: 'supplier/detail/:id',
        loadComponent: () => import('./@presentation/pages/support/supplier/detail-supplier/detail-supplier.component')
          .then(m => m.DetailSupplierComponent),
        data: { renderMode: 'client' }
      },
      {
        path: 'tenant',
        loadComponent: () =>
          import('./@presentation/pages/support/tenant/support-tenant.component')
            .then(m => m.SupportTenantComponent)
      },
      {
        path: 'tenant/detail/:id',
        loadComponent: () =>
          import('./@presentation/pages/support/tenant/detail/support-tenant-detail.component')
            .then(m => m.SupportTenantDetailComponent),
        data: { renderMode: 'client' }
      },
         {
        path: 'common-data/detail/:id',
        loadComponent: () => import('./@presentation/pages/support/manage-common-data/manage-common-data.component')
          .then(m => m.ManageCommonDataComponent),
        data: { renderMode: 'client' }
      },
      {
  // RUTA PARA CREAR UN NUEVO ELEMENTO
  path: 'common-data/new', // O 'common-data/create' si lo prefieres
  loadComponent: () => import('./@presentation/pages/support/manage-common-data/manage-common-data.component')
    .then(m => m.ManageCommonDataComponent),
  data: { renderMode: 'client' }
},
    ],
  },
  {
    path: 'system-admin',
    component: SystemComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'control',
        loadComponent: () => import('./@presentation/system-admin/admin/system/register-control/register-control.component')
          .then(m => m.RegisterControlComponent)
      },
      {
        path: 'parameter',
        loadComponent: () => import('./@presentation/system-admin/admin/system/parameters/parameters.component')
          .then(m => m.ParametersComponent)
      },
      {
        path: 'generate-random-color-imagen',
        loadComponent: () => import('./@presentation/pages/support/create-randon-imagen-color/create-randon-imagen-color.component')
          .then(m => m.CreateRandonImagenColorComponent)
      },
      {
        path: 'system',
        loadComponent: () => import('./@presentation/system-admin/admin/system/system.component')
          .then(m => m.SystemComponent)
      },
      {
        path: 'system/detail/:id',
        loadComponent: () => import('./@presentation/system-admin/admin/system/system-detail/system-detail.component')
          .then(m => m.SystemDetailComponent),
        data: { renderMode: 'client' }
      },
      {
        path: 'page/detail/:id',
        loadComponent: () => import('./@presentation/system-admin/admin/system/page-detail/page-detail.component')
          .then(m => m.PageDetailComponent),
        data: { renderMode: 'client' }
      },
      {
        path: 'menu/detail/:id',
        loadComponent: () => import('./@presentation/system-admin/admin/system/menu-detail/menu-detail.component')
          .then(m => m.MenuDetailComponent),
        data: { renderMode: 'client' }
      }
    ],
  },
  // Redirección por defecto
  { path: '', redirectTo: 'home/main', pathMatch: 'full' },
  { path: '**', redirectTo: 'home/main' },
];
