import {
  Component,
  Renderer2,
  ViewChild,
  ElementRef,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/entity/Product.interface';
import { User } from 'src/app/entity/User.interface';
import { AuthAccountService } from 'src/app/service/AuthAccount.service';
import { CartStoreService } from 'src/app/service/cart-store.service';
import { HttpUserService } from 'src/app/service/http-user.service';
import { NotificationService } from 'src/app/service/notification.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('navbar') btnNav: ElementRef;
  hiddenCarousel: boolean = false;
  hiddenLogin: boolean = false;
  logged: boolean = false;
  account_activate: User;
  products: Product[] = [];
  constructor(
    private router: Router,
    private renderer: Renderer2,
    private httpUserService: HttpUserService,
    private authService: AuthAccountService,
    private noti: NotificationService,
    private cartStore: CartStoreService
  ) {
    this.products = cartStore.getCart();
  }

  ngOnInit(): void {
    this.checkUrlShowCarousel();
    this.httpUserService.eventEmitter.subscribe((data: boolean) => {
      if (data) {
        this.checkUrlShowCarousel();
      }
    });
    this.authService.account.subscribe((account) => {
      if (!!account) {
        this.account_activate = account;
        this.logged = true;
      } else {
        this.logged = false;
      }
    });
    this.authService.autoLogin();
  }

  checkUrlShowCarousel() {
    setTimeout(() => {
      if (this.router.url === '/home') {
        this.renderer.addClass(this.btnNav.nativeElement, 'show');
        this.hiddenCarousel = true;
        this.hiddenLogin = false;
      } else {
        this.hiddenCarousel = false;
        this.hiddenLogin = false;
        this.renderer.removeClass(this.btnNav.nativeElement, 'show');
      }
    }, 10);
  }

  showLogin() {
    if (!this.hiddenLogin) {
      this.hiddenLogin = true;
      this.hiddenCarousel = false;
    }
  }

  onLogout() {
    this.authService.logout();
    this.noti.createNotiSuccess('Đăng xuất thành công', 'Thông báo');
  }

  navToAdmin() {
    this.router.navigate(['/admin/home']);
    setTimeout(() => {
      location.reload();
    }, 10);
  }
}
