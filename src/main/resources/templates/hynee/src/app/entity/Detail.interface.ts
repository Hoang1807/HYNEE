import { Product } from './Product.interface';

export interface Detail {
  detailId: string;
  detailName: string;
  detailValue: string;
  products: Product[];
}
