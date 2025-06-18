import { map } from "nanostores";

export const $user = map<{ user?: { login: string; _id: string } }>();
