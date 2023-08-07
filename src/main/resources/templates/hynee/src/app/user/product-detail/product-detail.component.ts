import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/entity/Product.interface';
import { CartStoreService } from 'src/app/service/cart-store.service';
import { HttpImageService } from 'src/app/service/http-image.service';
import { HttpProductService } from 'src/app/service/http-product.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  idProduct: string;
  @ViewChild('quantity') quantity: ElementRef;
  checkQuantity: boolean = false;
  product: Product;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpProduct: HttpProductService,
    private httpImage: HttpImageService,
    private noti: NotificationService,
    private cartStore: CartStoreService
  ) {}
  ngOnInit(): void {
    this.idProduct = this.route.snapshot.params['id'];
    this.httpProduct.getById(this.idProduct).subscribe({
      next: (data) => {
        this.httpProduct.isLoading.next(false);
        this.product = data.body;
        this.httpImage.getImageById(this.product.productId).subscribe({
          next: (dataImg) => {
            this.httpImage.isLoading.next(false);
            this.product.images = dataImg.body;
            console.log(this.product);
          },
        });
      },
    });
  }
  onIncreaseQuantity() {
    if (++this.quantity.nativeElement.value > this.product.productQuantity) {
      this.noti.createNotiError('Số lượng trong kho không đủ', 'Thông báo');
      this.checkQuantity = true;
    } else {
      this.checkQuantity = false;
    }
  }
  onDecreaseQuantity() {
    if (--this.quantity.nativeElement.value <= 0) {
      this.noti.createNotiError('Không ', 'Thông báo');
      this.checkQuantity = true;
    } else if (this.quantity.nativeElement.value > 0) {
      this.checkQuantity = false;
    }
  }

  onAddToCart(product: Product) {
    let quantity = this.quantity.nativeElement.value;
    this.cartStore.addToCart(product);
    this.cartStore.updateCartItemQuantity(product, quantity);
    this.router.navigate(['/cart']);
  }
}
