import { fetchLoginUser, ICredentialsDto } from "src/api";
import { $auth } from "./auth";

import { TTokens } from "./auth.type";

const fetchlogin = async (loginData: ICredentialsDto) => {
  try {
    console.log("sssssssssss");
    $auth.setKey("waitingAuth", true);
    const authData = await fetchLoginUser(loginData);
    setTokens({
      access: authData.access_token,
      refresh: "",
    });
  } catch (error) {
    //TODO: ADD ERROR HANDLING
    console.log("error", error);
    throw Error();
  }
  $auth.setKey("waitingAuth", false);
};

const setTokens = (tokens: TTokens) => {
  $auth.setKey("refreshToken", tokens.refresh);
  $auth.setKey("accessToken", tokens.access);
  localStorage.setItem("refreshToken", tokens.refresh);
  localStorage.setItem("accessToken", tokens.access);
};

const setAccessTokenFromStorage = () => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    $auth.setKey("accessToken", accessToken);
    return;
  }
};

export const reset = () => {
  $auth.setKey("waitingAuth", false);
  $auth.setKey("accessToken", "");
  $auth.setKey("refreshToken", "");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("accessToken");
};

export const authActions = {
  fetchlogin,
  reset,
  setAccessTokenFromStorage,
  setTokens,
};
