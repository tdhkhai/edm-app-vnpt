import { TypeOfService } from './typeofservice';

export interface Service {
  _id: string;
  serviceCode: string;
  serviceName: string;
  serviceBrand: string;
  typeOfService: string;
  status: boolean;
  createdAt: Date;
}
