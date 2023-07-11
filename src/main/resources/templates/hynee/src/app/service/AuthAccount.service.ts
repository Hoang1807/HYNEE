import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../entity/User.interface';
// import { Users } from '../entity/User.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthAccountService {
  account = new BehaviorSubject<User>(null);
  constructor() {}
}
