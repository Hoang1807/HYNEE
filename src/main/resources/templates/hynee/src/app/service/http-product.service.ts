import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject, catchError, take, throwError } from 'rxjs';
import { Product } from '../entity/Product.interface';

@Injectable({
  providedIn: 'root',
})
export class HttpProductService {
  isLoading = new Subject<boolean>();
  constructor(private http: HttpClient) {}
  addProduct(dataPro: Product) {
    console.log(dataPro);
    this.isLoading.next(true);
    return this.http
      .post<Product>('http://localhost:8080/admin/product/add', dataPro, {
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
            case 'PRODUCTID_EXIST':
              errorMessage = 'Mã sản phẩm đã tồn tại';
            case 'PRODUCTCODE_EXIST-PRODUCTCOLOR_EXIST':
              errorMessage = 'Mã sản phẩm này đã tồn tại';
          }
          return throwError(() => errorMessage);
        })
      );
  }
  getAllProducts() {
    this.isLoading.next(true);
    return this.http.get<Product[]>('http://localhost:8080/admin/product/all', {
      observe: 'response',
    });
  }
  getById(id: string) {
    this.isLoading.next(true);
    return this.http.get<Product>(`http://localhost:8080/admin/product/${id}`, {
      observe: 'response',
    });
  }
  getSearchPage(
    page: number,
    sortBy: boolean = true,
    priceFrom: number = 0,
    priceTo: number = 0,
    priceGreaterThan: number = 0,
    productSize: string = '',
    productName: string = '',
    detailValue: string = ''
  ) {
    this.isLoading.next(true);
    return this.http.get<any>('http://localhost:8080/admin/product/search', {
      params: new HttpParams()
        .append('page', page)
        .append('sort', sortBy)
        .append('priceFrom', priceFrom)
        .append('priceTo', priceTo)
        .append('priceGreaterThan', priceGreaterThan)
        .append('productSize', productSize)
        .append('productName', productName)
        .append('detailValue', detailValue),
      observe: 'response',
    });
  }

  updateProduct(product: Product) {
    product.productQuantity -= product.quantity;
    return this.http.put(
      'http://localhost:8080/admin/product/update',
      product,
      { observe: 'response' }
    );
  }
}
