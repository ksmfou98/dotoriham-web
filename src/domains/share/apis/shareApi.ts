import axios from "axios";
import { SERVER_URL } from "lib/constants";

const shareApi = axios.create({});

shareApi.defaults.baseURL = `${SERVER_URL}`;

export default shareApi;
