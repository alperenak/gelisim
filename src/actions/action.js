import axios from "axios";
import { useContext } from "react";
import { useCookies } from "react-cookie";
const uri = "https://gelisim-okullari.herokuapp.com/api/v1";
const location = window.location;
export async function GetAuthentication(username, password) {
  // axios
  //   .post("https://gelisim-okullari.herokuapp.com/api/v1/auth/login", {
  //     username: username,
  //     password: password,
  //   })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     return data;
  //   });
  const response = await fetch(`${uri}/auth/login`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify({ username: username, password: password }), // body data type must match "Content-Type" header
  });
  return response.json();
}
export async function UpdateAnnouncements(id, title, token) {
  console.log(id);
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.put(
    `${uri}/announcements/${id}`,
    {
      title: title,
    },
    config
  );
  return response;
}
export async function DeleteAnnouncements(id, token) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.delete(`${uri}/announcements/${id}`, config);
  return response;
}

export async function AddAnnouncements(title, detail, token) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.post(
    `${uri}/announcements`,
    {
      title: title,
      detail: detail,
    },
    config
  );
  return response;
}

export async function GetUser(token) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = axios.get(`${uri}/auth/me`, config);
  return response;
}
export function GetToken() {
  const [cookies, setCookies] = useCookies(["token"]);
  return cookies.token;
}

export async function GetAnnouncements(limit, page, token) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = axios.get(
    `${uri}/announcements?limit=${limit}&page=${page}`,
    config
  );

  return response;
}

export async function GetStorage(token) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = axios.get(`${uri}/storage`, config);

  return response;
}
export function IsAuth(token) {
  if (token) {
    return true;
  } else {
    return false;
  }
}

export async function GetSSO(token, appName) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = axios.get(`${uri}/gelisim-sso/${appName}`, config);
  return response;
}

export default function IsAdmin(data) {
  if (data.data.data.role && data.data.data.role === "admin") {
    location.replace("/admin");
  }
}
export function IsRoleAdmin() {
  const token = GetToken();
  GetUser(token).then((data) => {
    if (data.data.data.role && data.data.data.role === "admin") {
      return true;
    } else return false;
  });
}

export async function getAllClass(token, limit = 20, page = 1) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.get(
    `${uri}/classes?limit=${limit}&page=${1}`,
    config
  );
  return response;
}
export async function updateClass(token, classId, name) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.put(
    `${uri}/classes/${classId}`,
    { name: name },
    config
  );
  return response;
}
export async function deleteClass(token, classId) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.delete(`${uri}/classes/${classId}`, config);
  return response;
}
export async function addClass(token, instructorId, classesName) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.post(
    `${uri}/classes`,
    { name: classesName, instructor: instructorId },
    config
  );
  return response;
}
export function getAllUser(token) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = axios.get(`${uri}/users`, config);
  return response;
}
