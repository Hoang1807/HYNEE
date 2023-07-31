import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthAccountService } from 'src/app/service/AuthAccount.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
})
export class TopbarComponent {
  @ViewChild('btnClose') btnClose: ElementRef;
  constructor(private authAccountService: AuthAccountService) {}
  onLogout() {
    this.btnClose.nativeElement.click();
    this.authAccountService.logout();
  }
}
