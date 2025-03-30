import axios from "axios";

export class ImageService {
  constructor(context) {
    this.context = context;
    this.baseUrl = import.meta.env.VITE_APP_BASE_URL;
    this.token = localStorage.getItem("token");
  }

  async uploadimg(sendData) {
    let data = null;

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${this.baseUrl}api/v1/upload`,
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

  async getImg(imageUrl) {
    try {
      const response = await axios.get(`${this.baseUrl}${imageUrl}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        responseType: "arraybuffer", // ส่วนสำคัญที่สุด!
      });

      // แปลง ArrayBuffer เป็น base64
      const base64 = this.arrayBufferToBase64(response.data);
      return base64;
    } catch (error) {
      console.error("Error fetching image:", error);
      return null;
    }
  }

  // ฟังก์ชันสำหรับแปลง ArrayBuffer เป็น base64
  arrayBufferToBase64(buffer) {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }
}
