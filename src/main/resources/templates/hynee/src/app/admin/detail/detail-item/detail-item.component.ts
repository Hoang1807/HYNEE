import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Detail } from 'src/app/entity/Detail.interface';
import { HttpDetailService } from 'src/app/service/http-detail.service';

@Component({
  selector: 'app-detail-item',
  templateUrl: './detail-item.component.html',
  styleUrls: ['./detail-item.component.css'],
})
export class DetailItemComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  @Output() DataDetail = new EventEmitter<Detail>();
  constructor(private httpDetail: HttpDetailService) {}
  ngOnInit(): void {
    this.loadTables();
  }

  loadTables(): void {
    this.dtOptions = {
      ajax: (dataTablesParameters: any, callback) => {
        this.httpDetail.getAllDetail().subscribe({
          next: (resp) => {
            this.httpDetail.isLoading.next(false);
            callback({
              data: resp.body,
            });
          },
        });
      },
      columns: [
        {
          title: 'Mã',
          data: 'detailId',
        },
        {
          title: 'Tiêu đề',
          data: 'detailName',
        },
        {
          title: 'Nội dung',
          data: 'detailValue',
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
      rowCallback: (row: Node, data: Detail, index: number) => {
        $('td', row).on('click', () => {
          this.DataDetail.emit(data);
        });
        return row;
      },
    };
  }
}
