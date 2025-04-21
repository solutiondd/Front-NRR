import axios from "axios";

export class StrangerService {
  constructor(context) {
    this.context = context;
    this.baseUrl = import.meta.env.VITE_APP_BASE_URL;
    this.token = localStorage.getItem("token");
  }

  async Registered(start, end, parkId) {
    return this.sendRequest(
      "get",
      `api/v1/stranger/registered?dateStart=${start}&dateEnd=${end}&parkId=${parkId}`
    );
  }

  async CheckOut(start, end, parkId) {
    return this.sendRequest(
      "get",
      `api/v1/stranger/checkout?dateStart=${start}&dateEnd=${end}&parkId=${parkId}`
    );
  }

  async NotRegister(start, end, parkId) {
    return this.sendRequest(
      "get",
      `api/v1/stranger/noregister?dateStart=${start}&dateEnd=${end}&parkId=${parkId}`
    );
  }

  async Remaining(start, end, parkId) {
    return this.sendRequest(
      "get",
      `api/v1/stranger/remaining?dateStart=${start}&dateEnd=${end}&parkId=${parkId}`
    );
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

    // if (data) {
    //   config.data = data;
    // }

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
