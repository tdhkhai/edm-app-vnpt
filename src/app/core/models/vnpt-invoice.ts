import { User } from './user';

export interface Invoice {
  _id: string;
  status: string;
  monthAction: Date;
  am: User;
  comTaxCode: string;
  comName: string;
  dateDemo: Date;
  dateGolive: Date;
  dateDelete: Date;
  dateExtend: Date;
  amount: number;
  income: number;
  incomeDate: Date;
  typeOfIncome: string;
}
