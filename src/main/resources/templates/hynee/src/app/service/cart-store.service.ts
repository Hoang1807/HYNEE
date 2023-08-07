import { Injectable } from '@angular/core';
import { Product } from '../entity/Product.interface';
import { BehaviorSubject, Subject } from 'rxjs';
import { LocalStorageService } from './local-storage-service.service';

@Injectable({
  providedIn: 'root',
})
export class CartStoreService {
  private cartKey = 'cart';
  private cart: Product[] = [];

  constructor(private localStorageService: LocalStorageService) {
    // Load cart data from localStorage on service initialization
    this.loadCart();
  }

  private saveCart(): void {
    this.localStorageService.setItem(this.cartKey, this.cart);
  }

  private loadCart(): void {
    this.cart = this.localStorageService.getItem<Product[]>(this.cartKey) || [];
  }

  public getCart(): Product[] {
    return this.cart;
  }

  public addToCart(product: Product): void {
    // Check if the product is already in the cart
    const existingProduct = this.cart.find(
      (item) => item.productId === product.productId
    );

    if (existingProduct) {
      // If the product is already in the cart, update its quantity
      existingProduct.quantity += 1;
    } else {
      // If the product is not in the cart, add it with quantity 1
      product.quantity = 1;
      this.cart.push(product);
    }

    this.saveCart();
  }

  public decreaseCartItemQuantity(product: Product): void {
    const existingProduct = this.cart.find(
      (item) => item.productId === product.productId
    );

    if (existingProduct) {
      if (existingProduct.quantity > 1) {
        existingProduct.quantity -= 1;
      } else {
        // If quantity is 1 or less, remove the product from the cart
        this.removeFromCart(existingProduct);
      }

      this.saveCart();
    }
  }
  public removeFromCart(product: Product): void {
    this.cart = this.cart.filter(
      (item) => item.productId !== product.productId
    );
    this.saveCart();
  }

  public updateCartItemQuantity(product: Product, quantity: number): void {
    const existingProduct = this.cart.find(
      (item) => item.productId === product.productId
    );

    if (existingProduct) {
      existingProduct.quantity = quantity;
      this.saveCart();
    }
  }

  public clearCart(): void {
    this.cart = [];
    this.localStorageService.removeItem(this.cartKey);
  }
}
