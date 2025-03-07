import { UserDocument } from 'src/users/users.schema';

export interface ILoginCredentials {
  login: string;
  password: string;
}

export interface IJwtPayload {
  id: string; // Typically the user ID
  login: string; // Example: Include login in the payload
}
