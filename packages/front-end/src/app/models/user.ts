import { Role } from './types';

export class User {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  role?: Role;
  confirmed?: boolean;
  tfa?: boolean;
}