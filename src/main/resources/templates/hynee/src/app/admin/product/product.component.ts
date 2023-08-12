import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/entity/Category.interface';
import { Detail } from 'src/app/entity/Detail.interface';
import { DetailProduct } from 'src/app/entity/DetailProduct.interface';
import { Product } from 'src/app/entity/Product.interface';
import { HttpCategoryService } from 'src/app/service/http-category.service';
import { HttpDetailService } from 'src/app/service/http-detail.service';
import { HttpImageService } from 'src/app/service/http-image.service';
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
  listImage: string[];
  title = 'Thêm sản phẩm';
  productForm: FormGroup;
  files: string[] = [];
  @ViewChild('close') btnClose: ElementRef;
  constructor(
    private httpCate: HttpCategoryService,
    private httpDetail: HttpDetailService,
    private httpProduct: HttpProductService,
    private httpImage: HttpImageService,
    private noti: NotificationService,
    private router: Router
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
        productDescription: new FormControl(null),
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
        // images: new FormControl(null, [Validators.required]),
      }),
    });
  }

  onRefreshForm() {
    this.title = 'Thêm Sản Phẩm';
    this.productForm.reset({
      productData: {
        productStatus: 'true',
        productColor: '#000000',
        productSize: '',
        category: '',
        detail: '',
      },
    });
  }

  onSubmit() {
    let data = this.productForm.value['productData'];
    const formData = new FormData();
    for (var i = 0; i < this.files.length; i++) {
      formData.append('image', this.files[i]);
    }
    formData.append('name', data.productName + data.productColor);
    if (this.title === 'Cập Nhật') {
      data = this.productForm.value['productData'];
      let dataCopy: Product = {
        productId: data.productId,
        productQuantity: this.productForm.get('productData.productQuantity')
          .value,
        category: data.category,
        productCode: data.productCode,
        productColor: data.productColor,
        productDescription: data.productDescription,
        productName: data.productName,
        productPrice: data.productPrice,
        productSize: data.productSize,
        productStatus: data.productStatus,
        quantity: 0,
      };
      this.httpCate.getById(data.category).subscribe({
        next: (dataCate) => {
          dataCopy.category = dataCate.body;
          this.httpProduct.updateProduct(dataCopy).subscribe({
            next: (dataPro) => {
              this.noti.createNotiSuccess('Cập nhật thành công', 'Thông báo');
              this.btnClose.nativeElement.click();
              this.router
                .navigateByUrl('/admin/home', {
                  skipLocationChange: true,
                })
                .then(() => this.router.navigate(['/admin/product']));
            },
            error: (err) => {
              this.noti.createNotiSuccess('Cập nhật thất bại', 'Thông báo');
            },
          });
        },
      });
    } else {
      this.httpImage.addImageClound(formData).subscribe({
        next: (responseImg) => {
          data = this.productForm.value['productData'];
          this.httpCate.getById(data.category).subscribe({
            next: (dataCate) => {
              data.category = dataCate.body;
              this.httpProduct.addProduct(data).subscribe({
                next: (responsePro) => {
                  data.detail.forEach((detailId) => {
                    this.httpDetail.getById(detailId).subscribe({
                      next: (dataDetail) => {
                        const item: DetailProduct = {
                          id: {
                            detailId: dataDetail.body.detailId,
                            productId: responsePro.body.productId,
                          },
                          detail: dataDetail.body,
                          product: responsePro.body,
                        };
                        this.httpDetail.addDetailProduct(item).subscribe({
                          next: () => {
                            console.log('ok');
                          },
                          error: () => {
                            console.log('error');
                          },
                        });
                      },
                      error: (err) => {},
                    });
                  });
                  this.httpProduct.isLoading.next(false);
                  this.httpImage
                    .addImage(responseImg.body, responsePro.body)
                    .subscribe({
                      next: () => {
                        this.noti.createNotiSuccess(
                          'Thêm thành công',
                          'Thông báo'
                        );
                        this.btnClose.nativeElement.click();
                        this.router
                          .navigateByUrl('/admin/home', {
                            skipLocationChange: true,
                          })
                          .then(() => this.router.navigate(['/admin/product']));
                      },
                    });
                },
                error: (err) => {
                  this.httpProduct.isLoading.next(false);
                  this.noti.createNotiError(err, 'Thông báo');
                },
              });
            },
            error: (err) => {},
          });
          this.httpImage.isLoading.next(false);
          this.listImage = responseImg.body;
        },
        error: (err) => {
          this.httpImage.isLoading.next(false);
        },
      });
    }
  }

  onFileChange(event) {
    this.files = [];
    for (let i = 0; i < event.target.files.length; i++) {
      this.files.push(event.target.files[i]);
    }
  }

  onDataProduct(data: Product) {
    this.title = 'Cập Nhật';
    let details: string[] = [];
    for (const item of data.details) {
      details.push(item.detailId);
    }
    this.productForm.patchValue({
      productData: {
        productId: data.productId,
        productCode: data.productCode,
        productName: data.productName,
        productDescription: data.productDescription,
        productQuantity: isNaN(data.productQuantity)
          ? 0
          : +data.productQuantity,
        productSize: data.productSize,
        productColor: data.productColor,
        productStatus: data.productStatus ? 'true' : 'false',
        productPrice: data.productPrice,
        category: data.category.categoryId,
        detail: details,
      },
    });
    $('#btnAddProduct').trigger('click');
  }
}
