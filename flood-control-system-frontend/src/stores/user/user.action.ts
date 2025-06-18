import { fetchUser } from "src/api/users";
import { $user } from "./user";

export const fetchUserData = async () => {
  try {
    const user = await fetchUser();
    if (!user) return;

    $user.set({ user: user });
  } catch (error) {
    console.error(error);
  }
};
