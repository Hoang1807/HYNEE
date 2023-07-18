import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../entity/User.interface';
import { Subject, catchError, throwError, exhaustMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpUserService {
  isLoading = new Subject();
  eventEmitter = new EventEmitter<boolean>();
  constructor(private http: HttpClient) {}

  addUser(userData: User) {
    this.isLoading.next(true);
    return this.http
      .post<User>('http://localhost:8080/user/add', userData, {
        observe: 'response',
      })
      .pipe(
        take(1),
        catchError((error) => {
          console.log(error);
          let errorMessage = 'Đã có lỗi xảy ra! Lỗi không được xác định';
          if (!error.error) {
            return throwError(errorMessage);
          }
          switch (error.error) {
            case 'USER_EXISTS':
              errorMessage = 'Số điện thoại này đã được đăng ký';
          }
          return throwError(errorMessage);
        })
      );
  }
  getAllUsers() {}

  loginUser(userData: User) {
    this.isLoading.next(true);
    return this.http
      .post<User>('http://localhost:8080/user/login', userData, {
        observe: 'response',
      })
      .pipe(
        take(1),
        catchError((error) => {
          let errorMessage = 'Đã có lỗi xảy ra! Lỗi không được xác định';
          if (!error.error) {
            return throwError(errorMessage);
          }
          switch (error.error) {
            case 'USER_NOT_EXISTS':
              errorMessage = 'Tài khoản hoặc mật khẩu sai';
          }
          return throwError(errorMessage);
        })
      );
  }
  getUsersById(user: User) {}
  updateUser() {}
  deleteUser() {}
}
