import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpUserService } from '../service/http-user.service';
import { HttpProductService } from '../service/http-product.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class UserComponent implements OnInit {
  isLoading = false;

  constructor(
    private httpUser: HttpUserService,
    private httpProduct: HttpProductService
  ) {}

  ngOnInit(): void {
    this.httpUser.isLoading.subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    });
    this.httpProduct.isLoading.subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    });
  }
}
