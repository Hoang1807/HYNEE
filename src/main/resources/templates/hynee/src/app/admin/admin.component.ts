import {
  AfterViewInit,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { HttpCategoryService } from '../service/http-category.service';
import { HttpDetailService } from '../service/http-detail.service';
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
    private httpDetail: HttpDetailService
  ) {}

  ngOnInit(): void {
    this.httpCate.isLoading.subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    });
    this.httpDetail.isLoading.subscribe((isLoading: boolean) => {
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
