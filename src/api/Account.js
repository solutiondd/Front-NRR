import axios from "axios";

export class AccountService {
  constructor(context) {
    this.context = context;
    this.baseUrl = import.meta.env.VITE_APP_BASE_URL;
    this.token = localStorage.getItem("token");
  }

  async getAll(parkId) {
    let data = null;

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${this.baseUrl}api/v1/user/park/${parkId}`,
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
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

  async Create(sendData) {
    let data = null;
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${this.baseUrl}api/v1/user`,
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

  async Update(Id, sendData) {
    let data = null;

    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: `${this.baseUrl}api/v1/user/${Id}`,
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

  async Delete(Id) {
    let data = null;

    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${this.baseUrl}api/v1/user/${Id}`,
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
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
