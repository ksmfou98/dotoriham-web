import axios from "axios";
import { SERVER_URL } from "lib/const";
import getTokens from "lib/utils/getTokens";

const client = axios.create({
  withCredentials: true,
});

client.defaults.baseURL = `${SERVER_URL}`;

client.interceptors.request.use(
  (config) => {
    if (!config?.headers) {
      throw new Error(
        `Expected 'config' and 'config.headers' not to be undefined`
      );
    }
    const tokens = getTokens();
    if (!tokens) throw new Error("No tokens found");

    const { accessToken, refreshToken } = tokens;
    config.headers.accessToken = `Bearer ${accessToken}`;
    config.headers.refreshToken = `Bearer ${refreshToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      response: { status, data },
    } = error;

    console.log(data);
    // @TODO 지환님이 에러 메세지 형식 다 맞춰주시면 이쪽
    // switch 문을 data로 바꿔서 각 에러메세지 별로 처리하도록 해야함.
    // accessToken이 만료되었을 때, refreshToken이 만료되었을 때 등등
    switch (status) {
      case 401:
        // window.location.replace("/login");
        // const tokens = getTokens();
        // if (!tokens) throw new Error("No tokens found");
        // const { accessToken, refreshToken } = tokens;
        // console.log(tokens);
        // const { data } = await axios.get(
        //   `${SERVER_URL}/api/v1/user/reIssuanceAccessToken`,
        //   {
        //     headers: {
        //       accessToken: `Bearer ${accessToken}`,
        //       refreshToken: `Bearer ${refreshToken}`,
        //     },
        //   }
        // );

        break;

      default:
        throw new Error("Unknown Error");
    }
  }
);

export default client;
