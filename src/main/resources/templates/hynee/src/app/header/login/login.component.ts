import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
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
  constructor(private fb:FormBuilder){}
  ngOnInit(): void {
    this.formLogin = this.fb.group({
      loginData: new FormGroup({
        inputPhone: new FormControl(
          null,
          [Validators.required],
          LoginValidators.invalidLogin
        ),
        inputPassword: new FormControl(null, [Validators.required]),
      }),
    });
    // this.formLogin = new FormGroup({
    //   loginData: new FormGroup({
    //     inputPhone: new FormControl(
    //       null,
    //       [Validators.required],
    //       LoginValidators.invalidLogin
    //     ),
    //     inputPassword: new FormControl(null, [Validators.required]),
    //   }),
    // });
    this.formRegister = this.fb.group({
      registerData: new FormGroup({
        inputRPhone: new FormControl(null, [Validators.required],LoginValidators.invalidLogin),
        inputRPassword: new FormControl(null, [Validators.required]),
        inputRCPassword: new FormControl(null,[Validators.required])
      }),
    });
    // this.formRegister = new FormGroup({
    //   registerData: new FormGroup({
    //     inputRPhone: new FormControl(null, [Validators.required],LoginValidators.invalidLogin),
    //     inputRPassword: new FormControl(null, [Validators.required]),
    //     inputRCPassword: new FormControl(null,[Validators.required],LoginValidators.ComparePassword)
    //   }),
    // });
  }
  onSubmitLogin() {
    console.log(this.formLogin);
  }
}
