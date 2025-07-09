import axios from "axios";

export class StrangerService {
  constructor(context) {
    this.context = context;
    this.baseUrl = import.meta.env.VITE_APP_BASE_URL;
    this.token = localStorage.getItem("token");
  }

  //SECTION - Not Group
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

  //SECTION - Group By LicensePlate
  async RegisteredGroup(start, end, parkId) {
    return this.sendRequestGroup(
      "get",
      `api/v1/stranger/registered/group?dateStart=${start}&dateEnd=${end}&parkId=${parkId}`
    );
  }

  async CheckOutGroup(start, end, parkId) {
    return this.sendRequestGroup(
      "get",
      `api/v1/stranger/checkout/group?dateStart=${start}&dateEnd=${end}&parkId=${parkId}`
    );
  }

  async NotRegisterGroup(start, end, parkId) {
    return this.sendRequestGroup(
      "get",
      `api/v1/stranger/noregister/group?dateStart=${start}&dateEnd=${end}&parkId=${parkId}`
    );
  }

  async RemainingGroup(start, end, parkId) {
    return this.sendRequestGroup(
      "get",
      `api/v1/stranger/remaining/group?dateStart=${start}&dateEnd=${end}&parkId=${parkId}`
    );
  }

  async sendRequestGroup(method, endpoint) {
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

  async SRgetreport(start, end, parkId) {
    let responseData = null;

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${this.baseUrl}api/v1/stranger/remaining/security?dateStart=${start}&dateEnd=${end}&parkId=${parkId}`,
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };

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

  async ReportCR(start, end, status) {
    let data = null;

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${this.baseUrl}api/v1/stranger/list?dateStart=${start}&dateEnd=${end}&status=${status}`,
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
        data = { error: error.message, data: error?.response?.data };
      });

    return data;
  }

  //ANCHOR - CR Stranger Group By licensePlate
  async RegisteredIn(start, end, parkId, type = "register") {
    return this.strangerList(
      "get",
      `api/v1/stranger/list?dateStart=${start}&dateEnd=${end}&parkId=${parkId}&type=${type}`
    );
  }

  async CheckOutByCam(
    start,
    end,
    parkId,
    status = "out",
    type = "register",
    typeOut = "camera"
  ) {
    return this.strangerList(
      "get",
      `api/v1/stranger/list?dateStart=${start}&dateEnd=${end}&parkId=${parkId}&status=${status}&type=${type}&outBy=${typeOut}`
    );
  }

  async CheckOutByQr(
    start,
    end,
    parkId,
    status = "out",
    type = "register",
    typeOut = "qrcode"
  ) {
    return this.strangerList(
      "get",
      `api/v1/stranger/list?dateStart=${start}&dateEnd=${end}&parkId=${parkId}&status=${status}&type=${type}&outBy=${typeOut}`
    );
  }

  async NotRegisterIn(start, end, parkId, type = "noregist") {
    return this.strangerList(
      "get",
      `api/v1/stranger/list?dateStart=${start}&dateEnd=${end}&parkId=${parkId}&type=${type}`
    );
  }
  async NotRegisterOut(start, end, parkId, status = "out", type = "noregist") {
    return this.strangerList(
      "get",
      `api/v1/stranger/list?dateStart=${start}&dateEnd=${end}&parkId=${parkId}&status=${status}&type=${type}`
    );
  }

  async RemainingInSite(start, end, parkId, status = "in") {
    return this.strangerList(
      "get",
      `api/v1/stranger/list?dateStart=${start}&dateEnd=${end}&parkId=${parkId}&status=${status}`
    );
  }

  async strangerList(method, endpoint) {
    let responseData = null;

    const config = {
      method,
      maxBodyLength: Infinity,
      url: `${this.baseUrl}${endpoint}`,
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };

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
