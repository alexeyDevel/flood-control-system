import { api } from "../config"; // Импортируем настроенный экземпляр Axios

export interface ICredentialsDto {
  login: string;
  password: string;
}

export interface ILoginResponseDto {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  token_type?: string;
}

export const fetchLoginUser = async (
  credentials: ICredentialsDto
): Promise<ILoginResponseDto> => {
  return await api.post(`auth/login`, { json: credentials }).json();
};
