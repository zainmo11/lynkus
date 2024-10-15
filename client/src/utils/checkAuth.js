import Cookies from "universal-cookie";
const cookies = new Cookies();

export const isAuthorized = () => {
  const cookiesToken = cookies.get("token");
  const cookiesData = cookies.get("user");
  if (cookiesToken && cookiesData) {
    return true;
  } else {
    return false;
  }
};
