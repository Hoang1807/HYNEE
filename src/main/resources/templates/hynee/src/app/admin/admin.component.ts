import {
  AfterViewInit,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { HttpCategoryService } from '../service/http-category.service';
import { HttpDetailService } from '../service/http-detail.service';
import { HttpImageService } from '../service/http-image.service';
import { HttpProductService } from '../service/http-product.service';
import { HttpInvoiceService } from '../service/http-invoice.service';
import { HttpInvoiceDetailService } from '../service/http-invoice-detail.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminComponent implements AfterViewInit, OnInit {
  isLoading = false;
  constructor(
    private httpCate: HttpCategoryService,
    private httpDetail: HttpDetailService,
    private httpImage: HttpImageService,
    private httpProduct: HttpProductService,
    private httpInvoice: HttpInvoiceService,
    private httpInvoiceDetail: HttpInvoiceDetailService
  ) {}

  ngOnInit(): void {
    this.httpCate.isLoading.subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    });
    this.httpDetail.isLoading.subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    });
    this.httpImage.isLoading.subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    });
    this.httpProduct.isLoading.subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    });
    this.httpInvoice.isLoading.subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    });
    this.httpInvoiceDetail.isLoading.subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    });
  }
  ngAfterViewInit(): void {
    $('#sidebarToggleTop').on('click', function (e) {
      $('body').toggleClass('sidebar-toggled'),
        $('.sidebar').toggleClass('toggled');
    });
  }
}
