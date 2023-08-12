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
import { DetailComponent } from './admin/detail/detail.component';
import { ProductComponent } from './admin/product/product.component';
import { ProductNewComponent } from './user/product-new/product-new.component';
import { ProductListComponent } from './user/product-new/product-list/product-list.component';
import { ProductDetailComponent } from './user/product-detail/product-detail.component';
import { InvoiceComponent } from './admin/invoice/invoice.component';

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
        path: 'product-new/:page',
        component: ProductNewComponent,
        title: 'Hynee - Sản Phẩm Mới',
        children: [
          {
            path: ':p',
            component: ProductListComponent,
            title: 'Server',
          },
        ],
      },
      {
        path: 'profile',
        component: ProfileComponent,
        title: 'Hynee - Trang Cá Nhân',
      },
      {
        path: 'cart',
        component: CartPageComponent,
        title: 'Hynee - Giỏ Hàng',
      },
      {
        path: 'product-detail/:id',
        component: ProductDetailComponent,
        title: 'Hynee - Sản Phẩm Chi Tiết',
      },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AllowAccessAdmin],
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
      {
        path: 'detail',
        component: DetailComponent,
        title: 'Hynee - Admin - Quản Lý Thông Tin Chi Tiết',
      },
      {
        path: 'product',
        component: ProductComponent,
        title: 'Hynee - Admin - Quản Lý Sản Phẩm',
      },
      {
        path: 'invoice',
        component: InvoiceComponent,
        title: 'Hynee - Admin - Quản lý Hóa Đơn',
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
