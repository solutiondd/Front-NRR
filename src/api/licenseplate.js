import axios from "axios";

export class LPService {
  constructor(context) {
    this.context = context;
    this.baseUrl = import.meta.env.VITE_APP_BASE_URL;
    this.token = localStorage.getItem("token");
  }

  async getAll(parkId, page, itemPerPage, license, status) {
    let data = null;
    // สร้าง base URL
    let url = `${this.baseUrl}api/v1/licenseplate/${parkId}?page=${page}&limit=${itemPerPage}&license=${license}`;

    // เพิ่ม status parameter เฉพาะเมื่อมีค่า
    if (status) {
      url += `&cate=${status}`;
    }

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: url,
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

  async CreateLP(parkId, sendData, refreshToken) {
    let data = null;

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${this.baseUrl}api/v1/licenseplate/${parkId}`,
      headers: {
        Authorization: `Bearer ${refreshToken}`,
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
      url: `${this.baseUrl}api/v1/licenseplate/${Id}`,
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
      url: `${this.baseUrl}api/v1/licenseplate/${Id}`,
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
