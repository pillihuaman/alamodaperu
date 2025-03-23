import { Routes } from '@angular/router';
import { AuthComponent } from './@presentation/auth/auth.component';
import { HomeComponent } from './@presentation/home/home.component';
import { PageComponent } from './@presentation/pages/page.component';



export const routes: Routes = [
  {
    path: 'home', component: HomeComponent, // 🔹 HomeComponent como componente principal
    children: [
      { path: 'main', loadComponent: () => import('./@presentation/home/main/main-page/main-page.component').then(m => m.MainPageComponent) },
      { path: 'detail', loadComponent: () => import('./@presentation/home/main/detail-main-page/detail-main-page.component').then(m => m.DetailMainPageComponent) },
    ],
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'login', loadComponent: () => import('./@presentation/auth/user/login/login.component').then(m => m.LoginComponent) },
      { path: 'user-register', loadComponent: () => import('./@presentation/auth/user/user-register/user-register.component').then(m => m.UserRegisterComponent) },
    ],
  },
  {
    path: 'support',
    component: PageComponent,
    children: [
      { path: 'product', loadComponent: () => import('./@presentation/pages/support/register-product/register-product.component').then(m => m.RegisterProductComponent) },
      { path: 'imagen-product', loadComponent: () => import('./@presentation/pages/support/register-image-by-product/register-image-by-product.component').then(m => m.RegisterImageByProductComponent) },
      { path: 'product-stock', loadComponent: () => import('./@presentation/pages/support/register-stock/register-stock.component').then(m => m.RegisterStockComponent) },
      { path: 'control', loadComponent: () => import('./@presentation/pages/support/register-control/register-control.component').then(m => m.RegisterControlComponent) },
      { path: 'parameter', loadComponent: () => import('./@presentation/pages/support/parameters/parameters.component').then(m => m.ParametersComponent) },
      { path: 'system', loadComponent: () => import('./@presentation/pages/support/register-system/register-system.component').then(m => m.RegisterSystemComponent) },
      { path: 'page', loadComponent: () => import('./@presentation/pages/support/register-page/register-page.component').then(m => m.RegisterPageComponent) },
      { path: 'generate-random-color-imagen', loadComponent: () => import('./@presentation/pages/support/create-randon-imagen-color/create-randon-imagen-color.component').then(m => m.CreateRandonImagenColorComponent) },
      { path: 'employee', loadComponent: () => import('./@presentation/pages/support/employee/employee.component').then(m => m.EmployeeComponent) }, // 🔹 Se añadió correctamente

    ],
  }
];
