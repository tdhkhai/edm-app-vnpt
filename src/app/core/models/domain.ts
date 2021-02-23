import { User } from './user';

export interface Domain {
  _id: string;
  loaiDomain: string;
  domain: string;
  am: User;
  comTaxCode: string;
  comName: string;
  status: string; // 1: Golive, 2: Extend, 3: Cancel
  registrationDate: Date;
  expirationDate: Date;
  incomeDate: Date;
  income: number;
  extend: [
    {
      _id: string,
      numberOfExtend: string,
      fromDate: Date,
      toDate: Date,
      incomeDate: Date,
      income: number,
      remark: string
    }
  ];
  cancelDate: Date;
  remark: string;
}
