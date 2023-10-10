import { API_URL } from "../const";

export class LocalStorage {
  #apiUrl = API_URL

  constructor() {
    this.accessKeyGet(key) = localStorage.getItem("accessKey");
    console.log(this.accessKeyGet);

    this.accessKeySet(key, value) = localStorage.setItem("accessKey");
    console.log(this.accessKeySet);

    this.accessKeyDelete(key) = localStorage.remove("accessKey");
    console.log(this.accessKeyDelete);
  }
}
