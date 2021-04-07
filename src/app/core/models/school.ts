import { Unit } from './unit';
import { User } from './user';

export interface School {
  _id: string;
  unit: Unit;
  idvnEdu: string;
  schoolName: string;
  schoolTaxCode: string;
  status: string;
  modules: [{
    moduleName: string;
    schoolYear: string;
    amountSLL: number;
    income: number;
    fromDate_toDate: Date;
    am: User;
    remark: string;
  }],
  remark: string;
}
