import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShowButtonBackToTopDirective } from './directive/show-btn_backTopTop';
import { FooterComponent } from './footer/footer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { LoginComponent } from './header/login/login.component';
import { AdvertisementComponent } from './header/advertisement/advertisement.component';

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
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
