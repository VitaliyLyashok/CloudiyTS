import axios from "axios";

const HTTPservice = {
  get: (url: string, data?: object) => {
    const access_token = sessionStorage.getItem("access_token");
    const readyHeader = "Bearer " + access_token;
    return axios({
      method: "get",
      url: url,
      params: data,
      headers: { Authorization: readyHeader },
    });
  },
  post: (url: string, data?: object) => {
    const access_token = sessionStorage.getItem("access_token");
    const readyHeader = "Bearer " + access_token;
    return axios({
      method: "post",
      url: url,
      data: data,
      headers: {
        Authorization: readyHeader,
        "content-type": "application/json",
      },
    });
  },
  delete: (url: string) => {
    const access_token = sessionStorage.getItem("access_token");
    const readyHeader = "Bearer " + access_token;
    return axios({
      method: "delete",
      url: url,
      headers: {
        Authorization: readyHeader,
        "content-type": "application/json",
      },
    });
  },
};

export default HTTPservice;
