import Cookies from "universal-cookie";

export function capitalizeName(name) {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter of each word
    .join(" ");
}

export function fetchUserDataFromCookies() {
  const cookies = new Cookies();
  const userData = cookies.get("user");
  console.log(userData);
  return userData;
}
