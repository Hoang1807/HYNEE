import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthAccountService } from '../service/AuthAccount.service';
import { inject } from '@angular/core';
import { User } from '../entity/User.interface';
import { LocalStorageService } from '../service/local-storage-service.service';
import { HttpUserService } from '../service/httpUser.service';

export function AllowAccessAdmin(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean | Observable<boolean> | Promise<boolean> {
  const localStorageService: LocalStorageService = inject(LocalStorageService);
  let account_activate: User = JSON.parse(
    localStorageService.getItem('user_activate')
  );
  if (!!account_activate && account_activate.userRole) {
    return true;
  }
  inject(Router).navigate(['/home']);
}
