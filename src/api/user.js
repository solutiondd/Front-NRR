import axios from "axios";

export class UserService {
  constructor(context) {
    this.context = context;
    this.baseUrl = import.meta.env.VITE_APP_BASE_URL;
    this.token = localStorage.getItem("token");
  }

  async SignIn(Userdata) {
    let data = null;
    const user = Userdata;

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${this.baseUrl}api/v1/user/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: user,
    };

    await axios
      .request(config)
      .then((response) => {
        data = response.data;
      })
      .catch((error) => {
        data = { error: error.message, data: error.response.data };
        console.log(error);
      });

    return data;
  }

  async SignOut() {
    let data = null;

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${this.baseUrl}api/v1/user/login`,
      headers: {
        "Conten-Type": "application/json",
      },
      data: user,
      withCredentials: true,
    };

    await axios
      .request(config)
      .then((response) => {
        data = response.data;
        console.log(data);
      })
      .catch((error) => {
        data = { error: error.message, data: error.response.data };
        console.log(error);
      });

    return data;
  }

  //NOTE - Call Me
  async AuthState() {
    let data = null;
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${this.baseUrl}api/v1/user/me`,
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };

    await axios
      .request(config)
      .then((response) => {
        data = response.data;
        console.log(data);
      })
      .catch((error) => {
        data = { error: error.message, data: error.response.data };
        console.log(error);
      });

    return data;
  }
}
