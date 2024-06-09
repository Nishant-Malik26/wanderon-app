import axios from "axios";
import Cookies from "js-cookie";

const setAuthToken = (token) => {
  if (token) {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + 30 * 60 * 1000);
    Cookies.set("token", token, { expires: expirationDate });
    axios.defaults.headers.common["Authorization"] = token; 
  } else {
    Cookies.remove("token");
    delete axios.defaults.headers.common["Authorization"]; 
  }
};

export default setAuthToken;
