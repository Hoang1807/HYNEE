import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Detail } from 'src/app/entity/Detail.interface';
import { HttpDetailService } from 'src/app/service/http-detail.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  detailForm: FormGroup;
  title = 'Thêm Chi Tiết';
  @ViewChild('close') btnClose: ElementRef;

  constructor(
    private httpDetail: HttpDetailService,
    private noti: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.detailForm = new FormGroup({
      detailData: new FormGroup({
        detailId: new FormControl(null),
        detailName: new FormControl(null, [Validators.required]),
        detailValue: new FormControl(null, [Validators.required]),
      }),
    });
  }

  onSubmit() {
    const data: Detail = this.detailForm.value['detailData'];
    if (this.title === 'Cập Nhật') {
      this.httpDetail.updateDetail(data).subscribe({
        next: (data) => {
          this.httpDetail.isLoading.next(false);
          this.noti.createNotiSuccess('Cập nhật thành công', 'Thông báo');
          this.btnClose.nativeElement.click();
          this.router
            .navigateByUrl('/admin/home', { skipLocationChange: true })
            .then(() => this.router.navigate(['/admin/detail']));
        },
        error: (err) => {
          this.httpDetail.isLoading.next(false);
          this.noti.createNotiError(err, 'Thông báo');
        },
      });
    } else {
      this.httpDetail.addDetail(data).subscribe({
        next: (data) => {
          this.httpDetail.isLoading.next(false);
          this.noti.createNotiSuccess('Thêm chi tiết thành công', 'Thông báo');
          this.btnClose.nativeElement.click();
          this.router
            .navigateByUrl('/admin/home', { skipLocationChange: true })
            .then(() => this.router.navigate(['/admin/detail']));
        },
        error: (err) => {
          this.httpDetail.isLoading.next(false);
          this.noti.createNotiError(err, 'Thông báo');
        },
      });
    }
  }

  onDataCate(data: Detail) {
    this.title = 'Cập Nhật';
    this.detailForm.setValue({
      detailData: {
        detailId: data.detailId,
        detailName: data.detailName,
        detailValue: data.detailValue,
      },
    });
    $('#btnAddDetail').trigger('click');
  }

  onRefreshForm() {
    this.title = 'Thêm Chi Tiết';
    this.detailForm.reset();
  }
}
