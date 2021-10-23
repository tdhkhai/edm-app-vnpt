import { User } from './user';

export interface Datlich1080 {
  _id: string;
  status: string;
  am: User;
  comTaxCode: string;
  comName: string;
  registrationDate: Date;
  cancelDate: Date;
  remark: string;
}
