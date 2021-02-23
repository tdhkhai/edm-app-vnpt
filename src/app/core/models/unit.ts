import { Timestamp } from 'rxjs/internal/operators/timestamp';

export interface Unit {
  _id: string;
  unitCode: string;
  unitName: string;
  status: boolean;
  createdAt: Date;
}
