import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/entity/Category.interface';
import { Detail } from 'src/app/entity/Detail.interface';
import { Product } from 'src/app/entity/Product.interface';
import { HttpCategoryService } from 'src/app/service/http-category.service';
import { HttpDetailService } from 'src/app/service/http-detail.service';
import { HttpProductService } from 'src/app/service/http-product.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  listCate: Category[];
  listDetail: Detail[];
  title = 'Thêm sản phẩm';
  productForm: FormGroup;
  files: string[] = [];
  @ViewChild('close') btnClose: ElementRef;
  constructor(
    private httpCate: HttpCategoryService,
    private httpDetail: HttpDetailService,
    private httpProduct: HttpProductService,
    private noti: NotificationService
  ) {
    this.httpCate.getAllCategory().subscribe({
      next: (data) => {
        this.httpCate.isLoading.next(false);
        this.listCate = data.body;
      },
      error: (err) => {
        this.httpCate.isLoading.next(false);
        this.noti.createNotiError(err, 'Thông báo');
      },
    });
    this.httpDetail.getAllDetail().subscribe({
      next: (data) => {
        this.httpDetail.isLoading.next(false);
        this.listDetail = data.body;
      },
      error: (err) => {
        this.httpDetail.isLoading.next(false);
        this.noti.createNotiError(err, 'Thông báo');
      },
    });
  }
  ngOnInit(): void {
    this.productForm = new FormGroup({
      productData: new FormGroup({
        productId: new FormControl(null),
        productCode: new FormControl(null, [Validators.required]),
        productName: new FormControl(null, [Validators.required]),
        productzDescription: new FormControl(null),
        productQuantity: new FormControl(null, [
          Validators.required,
          Validators.min(1),
        ]),
        productSize: new FormControl('', [Validators.required]),
        productColor: new FormControl('#000000', [Validators.required]),
        productPrice: new FormControl(null, [
          Validators.required,
          Validators.min(1),
        ]),
        productStatus: new FormControl('true', [Validators.required]),
        category: new FormControl('', [Validators.required]),
        detail: new FormControl('', [Validators.required]),
        images: new FormControl(null, [Validators.required]),
      }),
    });
  }

  onRefreshForm() {}
  onSubmit() {
    const data: Product = this.productForm.value['productData'];
    const formData = new FormData();
    console.log(this.files);
    for (var i = 0; i < this.files.length; i++) {
      formData.append('file', this.files[i]);
    }
    console.log(formData.getAll('file'));
    if (this.title === 'Cập Nhật') {
    } else {
      this.httpProduct.addProduct(data);
      //   next: (data) => {
      //     this.httpDetail.isLoading.next(false);
      //     this.noti.createNotiSuccess('Thêm chi tiết thành công', 'Thông báo');
      //     this.btnClose.nativeElement.click();
      //     this.router
      //       .navigateByUrl('/admin/home', { skipLocationChange: true })
      //       .then(() => this.router.navigate(['/admin/detail']));
      //   },
      //   error: (err) => {
      //     this.httpDetail.isLoading.next(false);
      //     this.noti.createNotiError(err, 'Thông báo');
      //   },
      // });
    }
  }

  onFileChange(event) {
    for (let i = 0; i < event.target.files.length; i++) {
      this.files.push(event.target.files[i]);
    }
  }
}
