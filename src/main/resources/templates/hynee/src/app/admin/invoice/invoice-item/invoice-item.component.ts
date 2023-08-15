import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Invoice } from 'src/app/entity/Invoices.interface';
import { HttpInvoiceService } from 'src/app/service/http-invoice.service';

@Component({
  selector: 'app-invoice-item',
  templateUrl: './invoice-item.component.html',
  styleUrls: ['./invoice-item.component.css'],
})
export class InvoiceItemComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  @Output() DataInvoice = new EventEmitter<Invoice>();
  constructor(private httpInvoice: HttpInvoiceService) {}
  ngOnInit(): void {
    this.loadTables();
  }

  loadTables(): void {
    this.dtOptions = {
      ajax: (dataTablesParameters: any, callback) => {
        this.httpInvoice.getAllInvoices().subscribe({
          next: (resp) => {
            this.httpInvoice.isLoading.next(false);
            callback({
              data: resp.body,
            });
          },
        });
      },
      columns: [
        {
          title: 'Mã đơn hàng',
          data: 'invoiceId',
        },
        {
          title: 'Địa chỉ nhận hàng',
          data: 'invoiceAddress',
        },
        {
          title: 'Ngày đặt',
          data: 'invoiceDate',
          render: function (data: Date) {
            const date = new Date(data);
            var dateStr =
              ('00' + date.getDate()).slice(-2) +
              '/' +
              ('00' + (date.getMonth() + 1)).slice(-2) +
              '/' +
              date.getFullYear() +
              ' ' +
              ('00' + date.getHours()).slice(-2) +
              ':' +
              ('00' + date.getMinutes()).slice(-2) +
              ':' +
              ('00' + date.getSeconds()).slice(-2);
            return dateStr;
          },
        },
        {
          title: 'Ghi chú',
          data: 'invoiceNote',
          visible: false,
        },
        {
          title: 'Trạng thái đơn hàng',
          data: 'invoiceStatus',
          render: function (data) {
            return data === true ? 'Đã thanh toán' : 'Chưa thanh toán';
          },
        },
        {
          title: 'Trạng thái giao hàng',
          data: 'invoiceShippingStatus',
          render: function (data) {
            return data === true ? 'Đã giao hàng' : 'Chưa giao hàng';
          },
        },
      ],
      pagingType: 'simple_numbers',
      language: {
        search: 'Tìm Kiếm',
        lengthMenu: 'Xem _MENU_ Mục',
        info: 'Trang _PAGE_/_PAGES_',
        infoEmpty: 'Không tìm thấy ',
        infoFiltered: '(lọc từ _MAX_ mục)',
        zeroRecords: 'Không tìm thấy',
      },
      rowCallback: (row: Node, data: Invoice, index: number) => {
        $(row).attr('data-target', '#formUpdate');
        $(row).attr('data-toggle', 'modal');
        $('td', row).on('click', () => {
          this.DataInvoice.emit(data);
        });
        return row;
      },
    };
  }
}
