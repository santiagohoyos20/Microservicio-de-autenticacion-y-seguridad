import { Observable } from 'rxjs';

export interface IUserService {
  createUser(data: CreateUserRequest): Observable<UserResponse>;
}

export interface CreateUserRequest {
  uuid: string;
  email: string;
  name: string;
  lastname: string;
  phone_number: string;
}

export interface UserResponse {
  uuid: string;
  email: string;
  name: string;
  lastname: string;
  phone_number: string;
  message: string;
}
