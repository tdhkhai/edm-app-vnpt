import { User } from './user';

export interface Dauso {
  _id: string;
  loaiDauso: string;
  dauso: string;
  status: string;
  am: User;
  comTaxCode: string;
  comName: string;
  registrationDate: Date;
  cancelDate: Date;
  remark: string;
}
