import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  onLoadValidationRegister() {
    this.formRegister = new FormGroup({
      registerData: new FormGroup({
        inputRPhone: new FormControl(
          null,
          [Validators.required],
          LoginValidators.invalidLogin
        ),
        // inputRPassword: new FormControl(null, [Validators.required]),
      }),
    });
  }
  ngOnInit(): void {
    this.formLogin = new FormGroup({
      loginData: new FormGroup({
        inputPhone: new FormControl(
          null,
          [Validators.required],
          LoginValidators.invalidLogin
        ),
        inputPassword: new FormControl(null, [Validators.required]),
      }),
    });
    this.formRegister = new FormGroup({
      registerData: new FormGroup({
        inputRPhone: new FormControl(null, [Validators.required]),
      }),
    });
  }
  onSubmit() {
    console.log(this.formLogin);
  }
}
