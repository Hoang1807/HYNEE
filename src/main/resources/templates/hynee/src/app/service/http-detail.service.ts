import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, catchError, take, throwError } from 'rxjs';
import { Detail } from '../entity/Detail.interface';
import { DetailProduct } from '../entity/DetailProduct.interface';
import { DetailProductId } from '../entity/DetailProductId.interface';

@Injectable({
  providedIn: 'root',
})
export class HttpDetailService {
  isLoading = new Subject<boolean>();
  constructor(private http: HttpClient) {}
  addDetail(detailData: Detail) {
    this.isLoading.next(true);
    return this.http
      .post('http://localhost:8080/admin/detail/add', detailData, {
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
            case 'DETAILID_EXIST':
              errorMessage = 'Vui lòng thử lại';
            case 'DETAILNAME_EXIST-DETAILVALUE_EXIST':
              errorMessage = 'Cặp Tiêu Đề và Nội Dung này đã tồn tại';
          }
          return throwError(() => errorMessage);
        })
      );
  }
  getAllDetail() {
    this.isLoading.next(true);
    return this.http.get<Detail[]>('http://localhost:8080/admin/detail/all', {
      observe: 'response',
    });
  }
  updateDetail(detailData: Detail) {
    this.isLoading.next(true);
    return this.http
      .put(
        `http://localhost:8080/admin/detail/${detailData.detailId}`,
        detailData,
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

  addDetailProduct(detailProData: DetailProduct) {
    return this.http.post(
      'http://localhost:8080/admin/detailProduct/add',
      detailProData,
      {
        observe: 'response',
        params: new HttpParams()
          .append('productId', detailProData.product.productId)
          .append('detailId', detailProData.detail.detailId),
      }
    );
  }

  getDetailProduct(detailProductId: DetailProductId) {
    return this.http.get<DetailProduct[]>(
      `http://localhost:8080/admin/detailProduct/${detailProductId.productId}`,
      {
        observe: 'response',
      }
    );
  }

  getById(id: string) {
    return this.http.get<Detail>(`http://localhost:8080/admin/detail/${id}`, {
      observe: 'response',
    });
  }
}
