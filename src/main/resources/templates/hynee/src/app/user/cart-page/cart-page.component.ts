import { Component, ElementRef, EventEmitter, ViewChild } from '@angular/core';
import { data } from 'jquery';
import { Image } from 'src/app/entity/Image.interface';
import { InvoiceDetail } from 'src/app/entity/InvoiceDetail.interface';
import { InvoiceDetailId } from 'src/app/entity/InvoiceDetailId.interface';
import { Invoice } from 'src/app/entity/Invoices.interface';
import { Product } from 'src/app/entity/Product.interface';
import { AuthAccountService } from 'src/app/service/AuthAccount.service';
import { CartStoreService } from 'src/app/service/cart-store.service';
import { HttpImageService } from 'src/app/service/http-image.service';
import { HttpInvoiceDetailService } from 'src/app/service/http-invoice-detail.service';
import { HttpInvoiceService } from 'src/app/service/http-invoice.service';
import { HttpProductService } from 'src/app/service/http-product.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent {
  products: Product[] = [];
  sum: number = 0;
  constructor(
    private cartStore: CartStoreService,
    private httpImage: HttpImageService,
    private authAccount: AuthAccountService,
    private noti: NotificationService,
    private httpInvoice: HttpInvoiceService,
    private httpInvoiceDetail: HttpInvoiceDetailService,
    private httpProduct: HttpProductService
  ) {
    this.products = this.cartStore.getCart();
    this.onTotal();
    for (let i = 0; i < this.products.length; i++) {
      this.httpImage.getImageById(this.products[i].productId).subscribe({
        next: (data) => {
          this.products[i].image = data.body[0];
        },
      });
    }
  }
  onIncreaseQuantity(product: Product) {
    this.cartStore.addToCart(product);
    this.onTotal();
  }
  onDecreaseQuantity(product: Product) {
    this.cartStore.decreaseCartItemQuantity(product);
    this.products = this.cartStore.getCart();
    this.onTotal();
  }

  onChangeQuantity(product: Product, event: any) {
    const value = event.target.value;
    this.cartStore.updateCartItemQuantity(product, value);
    this.onTotal();
  }
  onDeleteProduct(product: Product) {
    this.cartStore.removeFromCart(product);
    this.products = this.cartStore.getCart();
    this.onTotal();
  }
  onTotal() {
    this.sum = 0;
    for (const product of this.products) {
      this.sum += product.productPrice * (product.quantity || 0);
    }
  }

  onPay(inputAddress, inputNote) {
    let valueAddress: string = inputAddress.value;
    let valueNote: string = inputNote.value;
    if (this.authAccount.account.getValue() == null) {
      this.noti.createNotiError('Vui lòng đăng nhập', 'Thông báo');
    } else if (valueAddress == '') {
      this.noti.createNotiError('Vui lòng điền đầy đủ thông tin', 'Thông báo');
    } else if (this.products.length == 0) {
      this.noti.createNotiError(
        'Không có sản phẩm nào trong giỏ hàng',
        'Thông báo'
      );
    } else {
      const invoice: Invoice = {
        invoiceDate: new Date(),
        invoiceAddress: valueAddress,
        invoiceNote: valueNote,
        invoiceStatus: false,
        invoiceShippingStatus: false,
        users: this.authAccount.account.getValue(),
      };
      this.httpInvoice.createInvoice(invoice).subscribe({
        next: (dataInvoice) => {
          this.noti.createNotiSuccess('Đặt hàng thành công', 'Thông báo');
          this.products = this.cartStore.getCart();
          this.sum = 0;

          this.products.forEach((product) => {
            this.httpProduct.updateProduct(product).subscribe({
              next: (data) => {},
              error: (err) => {},
            });

            const invoiceId: InvoiceDetailId = {
              invoiceId: dataInvoice.body.invoiceId,
              productId: product.productId,
              invoiceDtQuantity: product.quantity,
              invoiceDtPrice: product.quantity * product.productPrice,
            };

            const invoiceDetail: InvoiceDetail = {
              id: invoiceId,
              product: product,
              invoice: dataInvoice.body,
            };

            this.httpInvoiceDetail
              .createInvoiceDetail(invoiceDetail)
              .subscribe({
                next: (data) => {
                  console.log(data);
                },
                error: (err) => {
                  console.log(err);
                },
              });
          });
          this.cartStore.clearCart();
          this.products = this.cartStore.getCart();
        },
      });
    }
  }
}
