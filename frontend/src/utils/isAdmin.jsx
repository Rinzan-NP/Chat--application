import {jwtDecode} from "jwt-decode";
import axios from "axios";

const baseURL = "http://127.0.0.1:8000";

const updateAdminToken = async () => {
  const refreshToken = localStorage.getItem("refresh");

  try {
    const res = await axios.post(baseURL + "/api/token/refresh/", {
      refresh: refreshToken,
    });

    if (res.status === 200) {
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};



const isAuthAdmin = async () => {
  const accessToken = localStorage.getItem("access");
  
  if (!accessToken) {
    return { name: null, isAuthenticated: false, isAdmin: false };
  }
  
  const currentTime = Date.now() / 1000;
  let decoded = jwtDecode(accessToken);
  if (decoded.exp > currentTime) {
    let checkAdmin = decoded.is_superuser; 
    return {
      name: decoded.first_name,
      isAuthenticated: true,
      isAdmin: checkAdmin,
    };
  } else {
    const updateSuccess = await updateAdminToken();

    if (updateSuccess) {
      let decoded = jwtDecode(accessToken);
      let checkAdmin = decoded.is_superuser
      return {
        name: decoded.first_name,
        isAuthenticated: true,
        isAdmin: checkAdmin,
      };
    } else {
      return { name: null, isAuthenticated: false, isAdmin: false };
    }
  }
};

export default isAuthAdmin;