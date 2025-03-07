export interface IAuthStore {
  waitingAuth: boolean;
  refreshToken: string;
  accessToken: string;
}

export type TTokens = {
  access: string;
  refresh: string;
};
