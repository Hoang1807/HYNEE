import {
  Component,
  Renderer2,
  ViewChild,
  ElementRef,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/entity/User.interface';
import { AuthAccountService } from 'src/app/service/AuthAccount.service';
import { HttpUserService } from 'src/app/service/httpUser.service';
import { LocalStorageService } from 'src/app/service/local-storage-service.service';
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
  constructor(
    private router: Router,
    private renderer: Renderer2,
    private httpUserService: HttpUserService,
    private authService: AuthAccountService,
    private localStorageService: LocalStorageService,
    private noti: NotificationService
  ) {}

  ngOnInit(): void {
    this.checkUrlShowCarousel();
    this.httpUserService.eventEmitter.subscribe((data: boolean) => {
      if (data) {
        this.checkUrlShowCarousel();
      }
    });
    this.authService.account.subscribe((account) => {
      if (!!account) {
        this.logged = true;
      } else {
        this.logged = false;
      }
    });
    this.autoLogin();
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
  autoLogin() {
    const user: User = JSON.parse(
      this.localStorageService.getItem('user_activate')
    );
    if (!!user) {
      this.logged = true;
      this.authService.account.next(user);
    } else {
      this.logged = false;
    }
  }

  logout() {
    this.httpUserService.isLoading.next(true);
    this.localStorageService.removeItem('user_activate');
    this.authService.account.next(null);
    this.noti.createNotiSuccess('Đăng xuất thành công', 'Thông báo');
    this.httpUserService.isLoading.next(false);
  }

  login() {
    this.localStorageService.removeItem('user_activate');
    this.authService.account.next(null);
  }
}
