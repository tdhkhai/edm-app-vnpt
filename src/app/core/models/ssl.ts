import { User } from './user';

export interface SSL {
  _id: string;
  bundle: string;
  domain: string;
  am: User;
  comTaxCode: string;
  comName: string;
  status: string; // 1: Golive, 2: Extend, 3: Cancel
  registrationDate: Date;
  expirationDate: Date;
  incomeDate: Date;
  income: number;
  extend?: Extend;
  cancelDate: Date;
  remark: string;
  typeOfCustomer: string;
  detailTypeOfCustomer: string;
}

export interface Extend {
  _id: string;
  am: User;
  numberOfExtend: string;
  fromDate: Date;
  toDate: Date;
  incomeDate: Date;
  income: number;
  remark: string;
}
