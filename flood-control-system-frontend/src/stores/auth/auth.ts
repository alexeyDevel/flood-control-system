import { map } from "nanostores";
import { IAuthStore } from "./auth.type";
import { INITIAL_STATE } from "./auth.const";

export const $auth = map<IAuthStore>(INITIAL_STATE);
