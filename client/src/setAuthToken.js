import axios from "axios";
import Cookies from "js-cookie";

const setAuthToken = (token) => {
  if (token) {
    
    Cookies.set("token", token, { expires: 7 });
    axios.defaults.headers.common["Authorization"] = token; 
  } else {
    Cookies.remove("token");
    delete axios.defaults.headers.common["Authorization"]; 
  }
};

export default setAuthToken;
