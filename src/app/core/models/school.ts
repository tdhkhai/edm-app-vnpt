import { Unit } from './unit';
import { User } from './user';

export interface School {
  _id: string;
  unit: Unit;
  schoolName: string;
  schoolTaxCode: string;
  typeOfSchool: string;
  id_vnedu: string;
  id_moet: string;
  status: string;
  caphoc: string;
  modules?: Modules;
  remark: string;
}

export interface Modules {
  moduleName: string;
  loaiHD_SLL?: string;
  schoolYear?: string;
  amountSLL?: number;
  income: number;
  incomeDate: Date;
  fromDate_toDate: Date;
  thoihanhopdong?: string;
  am?: User;
  remark: string;
  status: string
}
