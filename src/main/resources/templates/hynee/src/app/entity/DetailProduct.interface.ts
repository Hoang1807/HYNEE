import { Detail } from './Detail.interface';
import { DetailProductId } from './DetailProductId.interface';
import { Product } from './Product.interface';

export interface DetailProduct {
  id: DetailProductId;
  product: Product;
  detail: Detail;
}
