import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/entity/Category.interface';
import { HttpCategoryService } from 'src/app/service/http-category.service';
import { NotificationService } from 'src/app/service/notification.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CategoryComponent implements OnInit {
  categoryForm: FormGroup;
  title: string = 'Thêm Loại';
  @ViewChild('close') btnClose: ElementRef;
  constructor(
    private httpCate: HttpCategoryService,
    private noti: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      cateData: new FormGroup({
        categoryId: new FormControl(null, [Validators.required]),
        categoryName: new FormControl(null, [Validators.required]),
      }),
    });
  }

  onSubmit() {
    const data: Category = this.categoryForm.value['cateData'];
    if (this.title === 'Cập Nhật') {
      this.httpCate.updateCategory(data).subscribe({
        next: (data) => {
          this.httpCate.isLoading.next(false);
          this.btnClose.nativeElement.click();
          this.noti.createNotiSuccess('Cập nhật thành công', 'Thông báo');
          this.router
            .navigateByUrl('/admin/home', { skipLocationChange: true })
            .then(() => this.router.navigate(['/admin/category']));
        },
        error: (err) => {
          this.httpCate.isLoading.next(false);
          this.noti.createNotiError(err, 'Thông báo');
        },
      });
    } else {
      this.httpCate.addCategory(data).subscribe({
        next: (data) => {
          this.btnClose.nativeElement.click();
          this.httpCate.isLoading.next(false);
          this.noti.createNotiSuccess('Thêm thành công', 'Thông báo');
          this.router
            .navigateByUrl('/admin/home', { skipLocationChange: true })
            .then(() => this.router.navigate(['/admin/category']));
        },
        error: (err) => {
          this.httpCate.isLoading.next(false);
          this.noti.createNotiError(err, 'Thông báo');
        },
      });
    }
  }
  onDataCate(data: Category) {
    this.title = 'Cập Nhật';
    this.categoryForm.setValue({
      cateData: {
        categoryId: data.categoryId,
        categoryName: data.categoryName,
      },
    });
    $('#btnAddCate').trigger('click');
  }

  onRefreshForm() {
    this.title = 'Thêm Loại';
    this.categoryForm.reset();
  }
}
