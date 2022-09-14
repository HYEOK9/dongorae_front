import axios from "axios";

axios.defaults.baseURL = "http://43.200.167.136:8080";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";

export default axios;
