import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowButtonBackToTopDirective } from './directive/show-btn_backTopTop';
import { FooterComponent } from './user/footer/footer.component';
import { HomePageComponent } from './user/home-page/home-page.component';
import { ShowPassDirective } from './directive/show-pass.directive';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/header/login/login.component';
import { AdvertisementComponent } from './user/header/advertisement/advertisement.component';
import { HeaderComponent } from './user/header/header.component';
import { ProfileComponent } from './user/profile/profile.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { StatisticComponent } from './admin/statistic/statistic.component';
import { TopbarComponent } from './admin/topbar/topbar.component';
import { CategoryComponent } from './admin/category/category.component';
import { DataTablesModule } from 'angular-datatables';
import { CategoryItemComponent } from './admin/category/category-item/category-item.component';
import { DetailComponent } from './admin/detail/detail.component';
import { DetailItemComponent } from './admin/detail/detail-item/detail-item.component';
import { ProductComponent } from './admin/product/product.component';
import { ProductItemComponent } from './admin/product/product-item/product-item.component';
import { CartPageComponent } from './user/cart-page/cart-page.component';
import { ProductNewComponent } from './user/product-new/product-new.component';
import { ProductListComponent } from './user/product-new/product-list/product-list.component';
import { ProductDetailComponent } from './user/product-detail/product-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShowButtonBackToTopDirective,
    FooterComponent,
    HomePageComponent,
    CartPageComponent,
    LoginComponent,
    AdvertisementComponent,
    ShowPassDirective,
    AdminComponent,
    UserComponent,
    ProfileComponent,
    SidebarComponent,
    StatisticComponent,
    TopbarComponent,
    CategoryComponent,
    CategoryItemComponent,
    DetailComponent,
    DetailItemComponent,
    ProductComponent,
    ProductItemComponent,
    ProductNewComponent,
    ProductListComponent,
    ProductDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DataTablesModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      resetTimeoutOnDuplicate: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
