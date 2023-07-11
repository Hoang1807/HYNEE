import { Feedback } from './Feedback.interface';
import { Invoice } from './Invoices.interface';

export interface User {
  userPhone: string;
  userFullname: string;
  userPassword: string;
  userRole: boolean;
  userGmail: string;
  userImage?: string;
  userCreateDate?: Date;
  userStatus?: boolean;
  invoices?: Invoice[];
  feedbacks?: Feedback[];
}
