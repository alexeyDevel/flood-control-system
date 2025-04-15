import { map, onMount } from "nanostores";
import { IAuthStore } from "./auth.type";
import { INITIAL_STATE } from "./auth.const";
import { authActions } from "./auth.action";

export const $auth = map<IAuthStore>(INITIAL_STATE);

onMount($auth, () => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    authActions.setTokens({ refresh: "", access: accessToken });
    // task(async () => {
    //   $post.set(await loadPost());
    // });
  }
});
