import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastrService: ToastrService) {}

  createNotiSuccess(message: string, title: string) {
    this.toastrService.success(message, title, {
      closeButton: true,
      tapToDismiss: true,
      timeOut: 5000,
      progressBar: true,
      disableTimeOut: 'extendedTimeOut',
      progressAnimation: 'decreasing',
      titleClass: 'h6 font-weight-normal mb-0',
      messageClass: 'font-weight-light',
      positionClass: 'toast-top-right',
    });
  }

  createNotiError(message: string, title: string) {
    this.toastrService.error(message, title, {
      closeButton: true,
      tapToDismiss: true,
      timeOut: 5000,
      progressBar: true,
      disableTimeOut: 'extendedTimeOut',
      progressAnimation: 'decreasing',
      titleClass: 'h6 font-weight-normal mb-0',
      messageClass: 'font-weight-light',
      positionClass: 'toast-top-right',
    });
  }
}
