import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/entity/Category.interface';
import { HttpCategoryService } from 'src/app/service/http-category.service';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.css'],
})
export class CategoryItemComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  @Output() DataCate = new EventEmitter<Category>();
  constructor(private httpCate: HttpCategoryService) {}

  ngOnInit(): void {
    this.loadTables();
  }

  loadTables(): void {
    this.dtOptions = {
      ajax: (dataTablesParameters: any, callback) => {
        this.httpCate.getAllCategory().subscribe({
          next: (resp) => {
            this.httpCate.isLoading.next(false);
            callback({
              data: resp.body,
            });
          },
        });
      },
      columns: [
        {
          title: 'Mã Loại',
          data: 'categoryId',
        },
        {
          title: 'Tên Loại',
          data: 'categoryName',
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
      rowCallback: (row: Node, data: Category, index: number) => {
        $('td', row).on('click', () => {
          this.DataCate.emit(data);
        });
        return row;
      },
    };
  }
}
