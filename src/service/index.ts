import { BASE_URL, TIMEOUT } from "./config";
import jlRequest from "./request";

const jlReq = new jlRequest({
    baseURL:BASE_URL,
    timeout:TIMEOUT
})

export { jlReq }