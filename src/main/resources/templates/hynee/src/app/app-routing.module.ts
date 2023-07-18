import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { HomePageComponent } from './user/home-page/home-page.component';
import { CartPageComponent } from './user/cart-page/cart-page.component';
import { ProfileComponent } from './user/profile/profile.component';
import { AllowAccessAdmin } from './guard/admin-guard';
import { StatisticComponent } from './admin/statistic/statistic.component';
import { CategoryComponent } from './admin/category/category.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: 'home',
        component: HomePageComponent,
        title: 'Hynee - Trang Chủ',
      },
      {
        path: 'product-new',
        component: CartPageComponent,
        title: 'Hynee - Sản Phẩm Bán Chạy',
      },
      {
        path: 'profile',
        component: ProfileComponent,
        title: 'Hynee - Trang Cá Nhân',
      },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    // canActivate: [AllowAccessAdmin],
    title: 'Hynee - Admin',
    children: [
      {
        path: 'home',
        component: StatisticComponent,
        title: 'Hynee - Admin - Thống Kê',
      },
      {
        path: 'category',
        component: CategoryComponent,
        title: 'Hynee - Admin - Quản Lý Loại',
      },
    ],
  },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
