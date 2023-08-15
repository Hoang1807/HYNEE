import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InvoiceDetail } from 'src/app/entity/InvoiceDetail.interface';
import { Invoice } from 'src/app/entity/Invoices.interface';
import { Product } from 'src/app/entity/Product.interface';
import { User } from 'src/app/entity/User.interface';
import { HttpInvoiceDetailService } from 'src/app/service/http-invoice-detail.service';
import { HttpInvoiceService } from 'src/app/service/http-invoice.service';
import { HttpProductService } from 'src/app/service/http-product.service';
import { HttpUserService } from 'src/app/service/http-user.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  invoiceForm: FormGroup;
  listProductBuys: InvoiceDetail[] = [];
  invoiceForUser: User = {
    userPhone: '',
    userPassword: '',
  };
  @ViewChild('close') btnClose: ElementRef;
  constructor(
    private httpInvoiceDetail: HttpInvoiceDetailService,
    private router: Router,
    private httpProduct: HttpProductService,
    private httpUser: HttpUserService,
    private httpInvoice: HttpInvoiceService,
    private noti: NotificationService
  ) {}
  ngOnInit(): void {
    this.invoiceForm = new FormGroup({
      invoiceData: new FormGroup({
        invoiceId: new FormControl(null),
        invoiceAddress: new FormControl(null, [Validators.required]),
        invoiceNote: new FormControl(null),
        invoiceStatus: new FormControl('false', [Validators.required]),
        invoiceShippingStatus: new FormControl(null, [Validators.required]),
        invoiceDate: new FormControl(null),
      }),
    });
  }
  onSubmit() {
    let data = this.invoiceForm.value['invoiceData'];
    const invoice: Invoice = {
      invoiceId: data.invoiceId,
      invoiceAddress: data.invoiceAddress,
      invoiceDate: new Date(data.invoiceDate),
      invoiceNote: data.invoiceNote,
      invoiceShippingStatus: data.invoiceShippingStatus,
      invoiceStatus: data.invoiceStatus,
      users: this.invoiceForUser,
    };
    console.log(invoice);
    this.httpInvoice.updateInvoice(invoice.invoiceId, invoice).subscribe({
      next: (data) => {
        this.noti.createNotiSuccess('Cập nhật thành công', 'Thông báo');
        this.btnClose.nativeElement.click();
        this.router
          .navigateByUrl('/admin/home', { skipLocationChange: true })
          .then(() => this.router.navigate(['/admin/invoice']));
      },
      error: (err) => {},
    });
  }

  onDataInvoice(data: Invoice) {
    // const date = new Date(data.invoiceDate);
    // var dateStr =
    //   ('00' + date.getDate()).slice(-2) +
    //   '/' +
    //   ('00' + (date.getMonth() + 1)).slice(-2) +
    //   '/' +
    //   date.getFullYear() +
    //   ' ' +
    //   ('00' + date.getHours()).slice(-2) +
    //   ':' +
    //   ('00' + date.getMinutes()).slice(-2) +
    //   ':' +
    //   ('00' + date.getSeconds()).slice(-2);
    this.invoiceForm.setValue({
      invoiceData: {
        invoiceId: data.invoiceId,
        invoiceAddress: data.invoiceAddress,
        invoiceNote: data.invoiceNote,
        invoiceStatus: '' + data.invoiceStatus,
        invoiceShippingStatus: '' + data.invoiceShippingStatus,
        invoiceDate: data.invoiceDate,
      },
    });
    this.httpInvoiceDetail.getInvoiceDetailById(data.invoiceId).subscribe({
      next: (dataInvoiceDetail) => {
        this.listProductBuys = dataInvoiceDetail.body;
        this.listProductBuys.forEach((product) => {
          this.httpProduct.getById(product.id.productId).subscribe({
            next: (dataProduct) => {
              this.httpProduct.isLoading.next(false);
              product.product = dataProduct.body;
            },
          });
        });
        this.httpUser
          .getUserByInvoiceId(this.listProductBuys[0].id.invoiceId)
          .subscribe({
            next: (dataUser) => {
              this.invoiceForUser = dataUser.body;
            },
            error: (err) => {},
          });
      },
      error: (err) => {},
    });
  }

  onTotalMoney() {
    let sum = 0;
    this.listProductBuys.forEach((product) => {
      sum += product.id.invoiceDtPrice;
    });
    return sum;
  }
}
