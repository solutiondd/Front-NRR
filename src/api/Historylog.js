import axios from "axios";

export class HistorylogSer {
  constructor(context) {
    this.context = context;
    this.baseUrl = import.meta.env.VITE_APP_BASE_URL;
    this.token = localStorage.getItem("token");
  }

  async getAll(parkId, page, itemPerPage) {
    let data = null;

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${this.baseUrl}api/v1/vehiclehistory?park${parkId}&page=${page}&limit=${itemPerPage}`,
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

  async getDashBoard(start, end, parkId) {
    let data = null;

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${this.baseUrl}api/v1/dashboard?start=${start}&end=${end}&parkId=${parkId}`,
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

  async getImg(image) {
    let data = null;

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${this.baseUrl}${image}`,
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

  async getRecHis(limit, page, start, end, license, parkId) {
    let data = null;

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${this.baseUrl}api/v1/recognitionhistory?limit=${limit}&page=${page}&dateStart=${start}&dateEnd=${end}&license=${license}&parkId=${parkId}`,
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
