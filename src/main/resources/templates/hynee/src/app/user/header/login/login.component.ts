import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/entity/User.interface';
import { AuthAccountService } from 'src/app/service/AuthAccount.service';
import { HttpUserService } from 'src/app/service/http-user.service';
import { LocalStorageService } from 'src/app/service/local-storage-service.service';
import { NotificationService } from 'src/app/service/notification.service';
import { LoginValidators } from 'src/app/validate/login-validators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @Input() isShow = false;
  formLogin: FormGroup;
  formRegister: FormGroup;
  constructor(
    private httpUserService: HttpUserService,
    private localStore: LocalStorageService,
    private noti: NotificationService,
    private authService: AuthAccountService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      loginData: new FormGroup({
        userPhone: new FormControl(
          null,
          [Validators.required],
          LoginValidators.invalidLogin
        ),
        userPassword: new FormControl(null, [Validators.required]),
      }),
    });

    this.formRegister = new FormGroup({
      registerData: new FormGroup({
        userPhone: new FormControl(
          null,
          [Validators.required],
          LoginValidators.invalidLogin
        ),
        userPassword: new FormControl(null, [Validators.required]),
        inputRCPassword: new FormControl(null, [Validators.required]),
        userFullname: new FormControl(null, [Validators.required]),
        userGmail: new FormControl(null, [
          Validators.required,
          Validators.email,
        ]),
      }),
    });
  }

  // giải quyết submit của Đăng Nhập
  onSubmitLogin() {
    const formData = this.formLogin.value['loginData'];
    const user: User = {
      userPhone: formData.userPhone,
      userPassword: formData.userPassword,
    };
    this.httpUserService.loginUser(user).subscribe({
      next: (resp) => {
        this.httpUserService.eventEmitter.emit(true);
        this.httpUserService.isLoading.next(false);
        this.authService.account.next(resp.body);
        this.localStore.setItem('user_activate', JSON.stringify(resp.body));
        this.router.navigate(['/home'], { relativeTo: this.route });
        this.formLogin.reset();
        this.noti.createNotiSuccess('Đăng nhập thành công', 'Thông báo');
      },
      error: (errorMessage) => {
        this.httpUserService.isLoading.next(false);
        this.noti.createNotiError(errorMessage, 'Thông báo');
      },
    });
  }

  // giải quyết submit của Đăng Ký
  onSubmitRegister() {
    const formData = this.formRegister.value['registerData'];
    const user: User = {
      userPhone: formData.userPhone,
      userFullname: formData.userFullname,
      userPassword: formData.userPassword,
      userGmail: formData.userGmail,
      userImage: null,
      userStatus: true,
      userCreateDate: new Date(),
      userRole: false,
    };
    this.httpUserService.addUser(user).subscribe({
      next: (resp) => {
        this.httpUserService.eventEmitter.emit(true);
        this.httpUserService.isLoading.next(false);
        this.authService.account.next(resp.body);
        this.localStore.setItem('user_activate', JSON.stringify(resp.body));
        this.noti.createNotiSuccess('Đăng ký thành công', 'Thông báo');
        this.router.navigate(['/home'], { relativeTo: this.route });
        this.formRegister.reset();
      },
      error: (errorMessage) => {
        this.httpUserService.isLoading.next(false);
        this.noti.createNotiError(errorMessage, 'Thông báo');
      },
    });
  }
}
