import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.css'],
})
export class AdvertisementComponent {
  @Input() isShow = true;
}
