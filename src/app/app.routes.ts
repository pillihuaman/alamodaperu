import { Routes } from '@angular/router';
import { AuthComponent } from './@presentation/auth/auth.component';
import { HomeComponent } from './@presentation/home/home.component';
import { PageComponent } from './@presentation/pages/page.component';
import { AuthGuard } from './@data/interceptors';
import { NotauthGuard } from './@data/interceptors/notauth.guard';
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
    ],
  },
  {
    path: 'auth',
    component: AuthComponent,
      //canActivate: [AuthGuard], //
    //canActivate: [NotauthGuard],
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
    canActivate: [AuthGuard], //
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
        data: { renderMode: 'client' } // 🛠️ Disable prerender
      },
      {
        path: 'control',
        loadComponent: () => import('./@presentation/pages/support/register-control/register-control.component')
          .then(m => m.RegisterControlComponent)
      },
      {
        path: 'parameter',
        loadComponent: () => import('./@presentation/pages/support/parameters/parameters.component')
          .then(m => m.ParametersComponent)
      },
      {
        path: 'generate-random-color-imagen',
        loadComponent: () => import('./@presentation/pages/support/create-randon-imagen-color/create-randon-imagen-color.component')
          .then(m => m.CreateRandonImagenColorComponent)
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
        path: 'system',
        loadComponent: () => import('./@presentation/pages/system/system.component')
          .then(m => m.SystemComponent)
      },
      {
        path: 'system/detail/:id',
        loadComponent: () => import('./@presentation/pages/system/system-detail/system-detail.component')
          .then(m => m.SystemDetailComponent),
        data: { renderMode: 'client' } // 🛠️ Disable prerender
      },
      {
        path: 'page/detail/:id',
        loadComponent: () => import('./@presentation/pages/system/page-detail/page-detail.component')
          .then(m => m.PageDetailComponent),
        data: { renderMode: 'client' } // 🛠️ Disable prerender
      },
      {
        path: 'menu/detail/:id',
        loadComponent: () => import('./@presentation/pages/system/menu-detail/menu-detail.component')
          .then(m => m.MenuDetailComponent),
        data: { renderMode: 'client' } // 🛠️ Disable prerender
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
        data: { renderMode: 'client' } // 🛠️ Disable prerender
      },
    ],
  },
  { path: '**', redirectTo: 'home/main', pathMatch: 'full' },
];
