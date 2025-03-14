import axios from "axios";

export class vehicleService {
  constructor(context) {
    this.context = context;
    this.baseUrl = import.meta.env.VITE_APP_BASE_URL;
    this.token = localStorage.getItem("token");
  }

  //NOTE - Add Device To Camera
  async AddDevice(sendData) {
    let data = null;

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${this.baseUrl}api/v1/addvehicle`,
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

  //NOTE - Delete Device
  async DeleteDevice(sendData) {
    let data = null;
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${this.baseUrl}api/v1/deletevehicle`,
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

  //NOTE - Get Device
  async getDevice(parkId) {
    let data = null;

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${this.baseUrl}api/v1/device/park/${parkId}`,
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

  //NOTE - Get Device By Id
  async getDeviceById(id) {
    let data = null;

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${this.baseUrl}api/v1/device/${id}`,
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
