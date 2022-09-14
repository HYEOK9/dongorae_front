import axios from "axios";

axios.defaults.baseURL = "https://dongore-backend2.herokuapp.com";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";

export default axios;
