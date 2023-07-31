import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../entity/User.interface';
import { LocalStorageService } from './local-storage-service.service';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';
import { HttpUserService } from './http-user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthAccountService {
  account = new BehaviorSubject<User>(null);
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private httpUserService: HttpUserService
  ) {}

  autoLogin() {
    let user: User = JSON.parse(
      this.localStorageService.getItem('user_activate')
    );
    if (!!user) {
      this.httpUserService.loginUser(user).subscribe(
        (resp) => {
          this.httpUserService.isLoading.next(false);
          user = resp.body;
          this.localStorageService.setItem(
            'user_activate',
            JSON.stringify(user)
          );
          this.account.next(user);
        },
        (err) => {
          this.httpUserService.isLoading.next(false);
          this.localStorageService.removeItem('user_activate');
          this.account.next(null);
          this.router.navigate(['/home']);
        }
      );
    }
  }

  logout() {
    this.localStorageService.removeItem('user_activate');
    this.account.next(null);
    this.httpUserService.eventEmitter.emit(true);
    this.router.navigate(['/home']);
  }
}
