import { Component, EventEmitter, Output } from '@angular/core';
import { Product } from 'src/app/entity/Product.interface';
import { HttpProductService } from 'src/app/service/http-product.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent {
  dtOptions: DataTables.Settings = {};
  @Output() DataProduct = new EventEmitter<Product>();
  constructor(private httpProduct: HttpProductService) {}
  ngOnInit(): void {
    this.loadTables();
  }

  loadTables(): void {
    this.dtOptions = {
      ajax: (dataTablesParameters: any, callback) => {
        this.httpProduct.getAllProducts().subscribe({
          next: (resp) => {
            this.httpProduct.isLoading.next(false);
            callback({
              data: resp.body,
            });
          },
        });
      },
      columns: [
        {
          title: 'Mã hệ thống',
          data: 'productId',
          visible: false,
        },
        {
          title: 'Mã sản phẩm',
          data: 'productCode',
        },
        {
          title: 'Tên sản phẩm',
          data: 'productName',
        },
        {
          title: 'Mô tả',
          data: 'productDescription',
        },
        {
          title: 'Số lượng',
          data: 'productQuantity',
        },
        {
          title: 'Size',
          data: 'productSize',
        },
        {
          title: 'Màu',
          data: 'productColor',
          render: function (data, type, row) {
            return data === true
              ? '<span class="glyphicon glyphicon-ok">${}</span>'
              : '<span class="glyphicon glyphicon-remove">as</span>';
          },
        },
        {
          title: 'Giá',
          data: 'productPrice',
        },
        {
          title: 'Trạng thái',
          data: 'productStatus',
        },
        {
          title: 'Loại',
          data: 'category.categoryName',
        },
        {
          title: 'Chi',
          data: 'details',
          visible: false,
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
      rowCallback: (row: Node, data: Product, index: number) => {
        $('td', row).on('click', () => {
          this.DataProduct.emit(data);
        });
        return row;
      },
    };
  }
}
