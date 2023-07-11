import { Product } from './Product.interface';

export interface Category {
  categoryId: string;
  categoryName: string;
  products: Product[];
}
