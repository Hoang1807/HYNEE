import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';

export class LoginValidators {
  static invalidLogin(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      const regexNumber = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
      if (!regexNumber.test(control.value)) {
        resolve({ numberIsForbidden: true });
      } else {
        resolve(null);
      }
    });
    return promise;
  }
}
