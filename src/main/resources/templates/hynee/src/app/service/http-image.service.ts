import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, catchError, take, throwError } from 'rxjs';
import { Image } from '../entity/Image.interface';
import { Product } from '../entity/Product.interface';

@Injectable({
  providedIn: 'root',
})
export class HttpImageService {
  isLoading = new Subject<boolean>();
  constructor(private http: HttpClient) {}

  addImage(listImage: string[], product: Product) {
    let list: Image[] = [];
    listImage.forEach((element) => {
      let item: Image = {
        imageId: element,
        product: product,
      };
      list.push(item);
    });
    return this.http
      .post('http://localhost:8080/admin/image/add', list, {
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
            case 'NOT_FILES':
              errorMessage = 'Không có dữ liệu ảnh tải lên';
          }
          return throwError(() => errorMessage);
        })
      );
  }
  addImageClound(dataImage) {
    this.isLoading.next(true);
    return this.http
      .post<string[]>(
        'http://localhost:8080/admin/image/addClound',
        dataImage,
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
            case 'NOT_FILES':
              errorMessage = 'Không có dữ liệu ảnh tải lên';
          }
          return throwError(() => errorMessage);
        })
      );
  }
  getAllImages() {}

  getImageById(id: string) {
    return this.http.get<Image[]>(`http://localhost:8080/admin/image/${id}`, {
      observe: 'response',
    });
  }
  updateImage() {}
}
