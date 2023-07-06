import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';

export class LoginValidators {
  static invalidLogin(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        const regexNumber = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
        if (!regexNumber.test(control.value)) {
          resolve({ numberIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 1000);
    });
    return promise;
  }
  static equalValueValidator(
    targetKey: string,
    toMatchKey: string
  ): ValidatorFn {
    return (group: FormGroup): { [key: string]: any } => {
      const target = group.controls[targetKey];
      const toMatch = group.controls[toMatchKey];
      if (target.touched && toMatch.touched) {
        const isMatch = target.value === toMatch.value;
        // set equal value error on dirty controls
        if (!isMatch && target.valid && toMatch.valid) {
          toMatch.setErrors({ equalValue: targetKey });
          const message = targetKey + ' != ' + toMatchKey;
          return { equalValue: message };
        }
        if (isMatch && toMatch.hasError('equalValue')) {
          toMatch.setErrors(null);
        }
      }
      return null;
    };
  }
}
