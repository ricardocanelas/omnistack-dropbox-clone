import axios from "axios";

const api = axios.create({
  baseURL: "https://omni-stack-server.herokuapp.com"
});

export default api;
