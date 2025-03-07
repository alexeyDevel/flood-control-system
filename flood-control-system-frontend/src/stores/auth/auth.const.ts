import { IAuthStore } from "./auth.type";

export const INITIAL_STATE: IAuthStore = {
  waitingAuth: false,
  accessToken: "",
  refreshToken: "",
};
