import { Routes } from '@angular/router';
import { UserRegisterComponent } from './@presentation/auth/user/user-register/user-register.component';
import { LoginComponent } from './@presentation/auth/user/login/login.component';
import { AuthComponent } from './@presentation/auth/auth.component';
import { DetailMainPageComponent } from './@presentation/home/main/detail-main-page/detail-main-page.component';
import { MainPageComponent } from './@presentation/home/main/main-page/main-page.component';
import { HomeComponent } from './@presentation/home/home.component';
import path from 'path';
import { PageComponent } from './@presentation/pages/page.component';
import { CreateRandonImagenColorComponent } from './@presentation/pages/support/create-randon-imagen-color/create-randon-imagen-color.component';
import { EmployeeComponent } from './@presentation/pages/support/employee/employee.component';
import { ParametersComponent } from './@presentation/pages/support/parameters/parameters.component';
import { RegisterControlComponent } from './@presentation/pages/support/register-control/register-control.component';
import { RegisterImageByProductComponent } from './@presentation/pages/support/register-image-by-product/register-image-by-product.component';
import { RegisterPageComponent } from './@presentation/pages/support/register-page/register-page.component';
import { RegisterProductComponent } from './@presentation/pages/support/register-product/register-product.component';
import { RegisterStockComponent } from './@presentation/pages/support/register-stock/register-stock.component';
import { RegisterSystemComponent } from './@presentation/pages/support/register-system/register-system.component';

export const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [

      { path: 'main', component: MainPageComponent },
      { path: 'detail', component: DetailMainPageComponent }, // Detalle de una imagen
    ],
  },
  {
    path: 'auth',
    component: AuthComponent, // Ruta que apunta al componente standalone,
    children: [
      { path: 'login', component: LoginComponent }, // Ruta hija
      {
        path: 'user-register',
        component: UserRegisterComponent,
      },
    ],
  },
  { path: '**', redirectTo: '' }, // Redirigir cualquier ruta desconocida a la página principal
  {
    path: 'support',
    component: PageComponent,
    children: [
      {
        path: 'product',
        component: RegisterProductComponent,
      },
      {
        path: 'imagen-product',
        component: RegisterImageByProductComponent,
      },
      {
        path: 'product-stock',
        component: RegisterStockComponent,
      },
      {
        path: 'control',
        component: RegisterControlComponent,
      },
      {
        path: 'parameter',
        component: ParametersComponent,
      },
      {
        path: 'system',
        component: RegisterSystemComponent,
      },
      {
        path: 'page',
        component: RegisterPageComponent,
      },
      {
        path: 'generate-random-color-imagen',
        component: CreateRandonImagenColorComponent,
      },
      {
        path: 'employee',
        component: EmployeeComponent,
      },
    ],
  }
];