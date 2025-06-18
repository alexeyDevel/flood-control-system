import { api } from "../config";

export interface IUser {
  _id: string;
  login: string;
}

export const fetchUser = async (): Promise<IUser> => {
  return await api.post(`users/getUser`).json();
};
