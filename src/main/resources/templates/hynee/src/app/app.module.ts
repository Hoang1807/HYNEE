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
import { CartPageComponent } from './user/cart-page/cart-page.component';
import { ShowPassDirective } from './directive/show-pass.directive';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/header/login/login.component';
import { AdvertisementComponent } from './user/header/advertisement/advertisement.component';
import { HeaderComponent } from './user/header/header.component';
import { ProfileComponent } from './user/profile/profile.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      resetTimeoutOnDuplicate: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
