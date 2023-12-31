import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { data } from 'jquery';
import { Subscription } from 'rxjs';
import { ShowPassDirective } from 'src/app/directive/show-pass.directive';
import { Image } from 'src/app/entity/Image.interface';
import { Product } from 'src/app/entity/Product.interface';
import { CartStoreService } from 'src/app/service/cart-store.service';
import { HttpImageService } from 'src/app/service/http-image.service';
import { HttpProductService } from 'src/app/service/http-product.service';
import { LocalStorageService } from 'src/app/service/local-storage-service.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  @ViewChild('search') inputSearch: ElementRef;
  listProduct: Product[] = [];
  listImages: Image[] = [];
  listCart: Product[] = [];
  page: number;
  sort: boolean;
  checkParams: boolean = false;
  numberPage: number;
  subscriptionParams: Subscription;
  subscriptionQuery: Subscription;
  constructor(
    private httpProduct: HttpProductService,
    private httpImage: HttpImageService,
    private route: ActivatedRoute,
    private router: Router,
    private noti: NotificationService,
    private cartStore: CartStoreService
  ) {}
  ngOnInit(): void {
    // this.router.navigate([], {
    //   relativeTo: this.route,
    // });
    this.page = this.route.snapshot.params['page'];
    this.onLoadQueryParams();
    this.onLoadParams();
    setTimeout(() => {
      if (!!this.route.snapshot.queryParams) {
        this.onLoadQueryParams();
      }
    }, 500);
  }

  onLoadQueryParams() {
    this.subscriptionQuery = this.route.queryParams.subscribe(
      (params: Params) => {
        this.sort = params['sort'];
        const priceFrom = params['priceFrom'];
        const priceTo = params['priceTo'];
        const priceGreaterThan = params['priceGreaterThan'];
        const productSize = params['productSize'];
        const valueName = this.inputSearch.nativeElement.value;
        const detailValue = params['detailValue'];
        this.httpProduct
          .getSearchPage(
            this.page,
            this.sort,
            priceFrom,
            priceTo,
            priceGreaterThan,
            productSize,
            valueName,
            detailValue
          )
          .subscribe({
            next: (data) => {
              this.listImages = [];
              this.numberPage = data.body.totalPages;
              this.httpProduct.isLoading.next(false);
              this.listProduct = data.body.content.filter(
                (item) => item.productStatus
              );
              this.listProduct.forEach((element: Product) => {
                this.httpImage.getImageById(element.productId).subscribe({
                  next: (data) => {
                    this.listImages.push(data.body[0]);
                  },
                  complete: () => {
                    for (let i = 0; i < this.listProduct.length; i++) {
                      this.listProduct[i].image = this.listImages[i];
                    }
                  },
                });
              });
            },
          });
      }
    );
  }
  onLoadParams() {
    this.subscriptionParams = this.route.params.subscribe((params: Params) => {
      this.page = params['page'];
      this.httpProduct.getSearchPage(this.page).subscribe({
        next: (data) => {
          this.listImages = [];
          this.httpProduct.isLoading.next(false);
          this.listProduct = data.body.content.filter(
            (item) => item.productStatus
          );

          this.numberPage = data.body.totalPages;
          this.listProduct.forEach((element: Product) => {
            this.httpImage.getImageById(element.productId).subscribe({
              next: (data) => {
                this.listImages.push(data.body[0]);
              },
              complete: () => {
                for (let i = 0; i < this.listProduct.length; i++) {
                  this.listProduct[i].image = this.listImages[i];
                }
              },
            });
          });
        },
      });
    });
  }
  onSearch() {
    const valueName = this.inputSearch.nativeElement.value;
    this.httpProduct
      .getSearchPage(
        this.page,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        valueName
      )
      .subscribe({
        next: (data) => {
          this.listImages = [];
          this.numberPage = data.body.totalPages;
          this.httpProduct.isLoading.next(false);
          this.listProduct = data.body.content.filter(
            (item) => item.productStatus
          );
          this.listProduct.forEach((element: Product) => {
            this.httpImage.getImageById(element.productId).subscribe({
              next: (data) => {
                this.listImages.push(data.body[0]);
              },
              complete: () => {
                for (let i = 0; i < this.listProduct.length; i++) {
                  this.listProduct[i].image = this.listImages[i];
                }
              },
            });
          });
        },
      });
  }

  addToCart(id: string): void {
    this.httpProduct.getById(id).subscribe({
      next: (data) => {
        this.httpProduct.isLoading.next(false);
        this.noti.createNotiSuccess(
          'Thêm vào giỏ hàng thành công',
          'Thông báo'
        );
        this.cartStore.addToCart(data.body);
      },
    });
  }

  onBuyNow(product: Product): void {
    this.cartStore.addToCart(product);
    this.router.navigate(['/cart']);
  }

  onCheckQueryParams(value: boolean) {
    this.checkParams = value;
  }

  ngOnDestroy(): void {
    this.subscriptionParams.unsubscribe();
    this.subscriptionQuery.unsubscribe();
  }
}
