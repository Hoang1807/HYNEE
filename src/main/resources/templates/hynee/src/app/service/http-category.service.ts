import { Injectable } from '@angular/core';
import { Subject, catchError, take, throwError } from 'rxjs';
import { Category } from '../entity/Category.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpCategoryService {
  isLoading = new Subject<boolean>();
  constructor(private http: HttpClient) {}

  addCategory(cateData: Category) {
    this.isLoading.next(true);
    return this.http
      .post<Category>('http://localhost:8080/admin/category/add', cateData, {
        observe: 'response',
      })
      .pipe(
        take(1),
        catchError((error) => {
          let errorMessage = 'Đã có lỗi xảy ra! Lỗi không được xác định';
          if (!error.error) {
            return throwError(() => errorMessage);
          }
          switch (error.error) {
            case 'CATEROGYID_EXIST':
              errorMessage = 'Mã loại này đã tồn tại';
          }
          return throwError(() => errorMessage);
        })
      );
  }
  getAllCategory() {
    this.isLoading.next(true);
    return this.http.get<Category[]>(
      'http://localhost:8080/admin/category/all',
      {
        observe: 'response',
      }
    );
  }
  updateCategory(cateData: Category) {
    this.isLoading.next(true);
    return this.http
      .put(
        `http://localhost:8080/admin/category/${cateData.categoryId}`,
        cateData,
        {
          observe: 'response',
        }
      )
      .pipe(
        take(1),
        catchError((error) => {
          let errorMessage = 'Đã có lỗi xảy ra! Lỗi không được xác định';
          if (!error.error) {
            return throwError(() => errorMessage);
          }
          switch (error.error) {
            case 'CATEROGYID_NOT_EXIST':
              errorMessage = 'Mã loại này không tồn tại';
          }
          return throwError(() => errorMessage);
        })
      );
  }

  getById(id: string) {
    return this.http.get<Category>(
      `http://localhost:8080/admin/category/${id}`,
      {
        observe: 'response',
      }
    );
  }
}
