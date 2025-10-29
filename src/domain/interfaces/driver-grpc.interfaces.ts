import { Observable } from 'rxjs';

export interface IDriverService {
  createDriver(data: CreateDriverRequest): Observable<DriverResponse>;
}

export interface CreateDriverRequest {
  uuid: string;
  email: string;
  name: string;
  lastname: string;
  phoneNumber: string;
  rol: number;
}

export interface DriverResponse {
  uuid: string;
  email: string;
  name: string;
  lastname: string;
  phoneNumber: string;
  rol: number;
  message: string;
}
