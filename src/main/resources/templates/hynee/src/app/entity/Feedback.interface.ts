import { FeedbackId } from './FeedbackId.interface';
import { Product } from './Product.interface';
import { User } from './User.interface';

export interface Feedback {
  id: FeedbackId;
  product: Product;
  users: User;
  feedbackContent: string;
  feedbackDate?: Date;
  feedbackStar: number;
}
