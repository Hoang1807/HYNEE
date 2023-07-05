import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { LoginComponent } from './header/login/login.component';
import { HeaderComponent } from './header/header.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent, title: 'Hynee - Trang Chủ' },
  {
    path: 'product-new',
    component: CartPageComponent,
    title: 'Hynee - Sản Phẩm Bán Chạy',
  },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
