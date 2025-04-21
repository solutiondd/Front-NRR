import axios from "axios";

export class VisitorService {
  constructor(context) {
    this.context = context;
    this.baseUrl = import.meta.env.VITE_APP_BASE_URL;
    this.token = localStorage.getItem("token");
  }

  async checkout(sendData) {
    let data = null;

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${this.baseUrl}api/v1/visitorcheckout`,
      headers: {
        Authorization: `Bearer ${this.token}`,
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

  async Create(parkId, sendData) {
    let data = null;

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${this.baseUrl}api/v1/requestentry/${parkId}`,
      headers: {
        "Content-Type": "application/json",
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

  async getAll(parkId) {
    return this.sendRequest("get", `api/v1/requestentry/${parkId}`);
  }

  async Delete(Id) {
    return this.sendRequest("delete", `api/v1/requestentry/${Id}`);
  }

  async sendRequest(method, endpoint, data = null) {
    let responseData = null;

    const config = {
      method,
      maxBodyLength: Infinity,
      url: `${this.baseUrl}${endpoint}`,
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };

    if (data) {
      config.data = data;
    }

    await axios
      .request(config)
      .then((response) => {
        responseData = response.data;
      })
      .catch((error) => {
        responseData = { error: error.message, data: error?.response?.data };
      });

    return responseData;
  }
}
