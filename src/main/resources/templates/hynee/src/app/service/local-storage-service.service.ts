import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private storage: Storage;

  constructor() {
    this.storage = localStorage;
  }

  public setItem(key: string, value: any): void {
    const serializedValue = JSON.stringify(value);
    this.storage.setItem(key, serializedValue);
  }

  public getItem<T>(key: string): T | null {
    const serializedValue = this.storage.getItem(key);
    if (serializedValue) {
      return JSON.parse(serializedValue) as T;
    }
    return null;
  }

  public removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  public clear(): void {
    this.storage.clear();
  }
}
