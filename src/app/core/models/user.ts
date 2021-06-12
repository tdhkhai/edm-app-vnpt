import { Unit } from './unit';

export interface User {
  _id: string;
  userCode: string;
  unit: Unit;
  userName: string;
  status: boolean;
  createdAt: Date;
}
