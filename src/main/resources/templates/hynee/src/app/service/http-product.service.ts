import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../entity/Product.interface';

@Injectable({
  providedIn: 'root',
})
export class HttpProductService {
  isLoading = new Subject<boolean>();
  eventEmitter = new EventEmitter<boolean>();
  constructor(private http: HttpClient) {}
  addProduct(dataPro: Product) {
    console.log(dataPro);
  }
  getALlProducts() {}
  updateProduct() {}
}
