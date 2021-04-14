import { Unit } from './unit';
import { User } from './user';

export interface School {
  _id: string;
  unit: Unit;
  schoolName: string;
  schoolTaxCode: string;
  id_vnedu: string;
  id_moet: string;
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
