import axios from "axios";

export class CdataService {
  constructor(context) {
    this.context = context;
    this.baseUrl = import.meta.env.VITE_APP_BASE_URL;
    this.token = localStorage.getItem("token");
  }

  async Create(parkId, sendData, token) {
    let data = null;

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${this.baseUrl}api/v1/cdata/${parkId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: sendData,
    };

    await axios
      .request(config)
      .then((response) => {
        data = response.data;
      })
      .catch((error) => {
        data = { error: error.message, data: error.response.data };
      });
    return data;
  }
}
