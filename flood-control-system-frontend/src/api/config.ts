import ky from "ky";
import { authActions } from "src/stores/auth";
// import { refreshToken } from "./routes/auth";
// import { authActions } from "src/stores/AuthStore";

export const api = ky.create({
  prefixUrl: `${import.meta.env.VITE_FCS_API_URL}/api/v1`,
  hooks: {
    beforeRequest: [
      (request) => {
        request.headers.set("X-Requested-With", "ky");

        const accessToken = localStorage.getItem("accessToken");
        // Если токен есть, добавляем его в заголовки запроса

        if (accessToken) {
          request.headers.set("Authorization", `Bearer ${accessToken}`);
        }
      },
    ],
    beforeError: [
      (error) => {
        const { response } = error;
        // if (response && response.body) {
        // }
        switch (response.status) {
          case 403:
            window.location.href = "/accessDenied";
            console.log(403);
            break;
          case 401:
            // refreshToken({
            //   refresh: localStorage.getItem("refreshToken") || "",
            // })
            //   .then((res) => {
            //     authActions.setTokens(res);
            //     window.location.reload();
            //   })
            //   .catch(() => {
            authActions.reset();
            window.location.href = "/login";
            // });
            break;
          default:
            break;
        }

        return error;
      },
    ],
  },
});
