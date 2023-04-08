import { API_URL } from "../Api-Config";

export function call(api, method, request) {
  let headers = new Headers({
    "Content-Type": "application/json",
  });
  const accessToken = localStorage.getItem("ACCESS_TOKEN");
  if (accessToken && accessToken != null) {
    headers.append("Authorization", "Bearer " + accessToken);
  }
  let options = {
    headers: headers,
    url: API_URL + api,
    method: method,
  };
  if (request) {
    options.body = JSON.stringify(request);
  }
  return fetch(options.url, options)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else if (res.status === 403) {
        window.location.href = "/login";
      } else {
        throw Error(res);
      }
    })
    .catch((err) => {
      console.log("error : ", err);
    });
}

export function signin(userDto) {
  return call("/auth/signin", "POST", userDto).then((res) => {
    if (res.token) {
      localStorage.setItem("ACCESS_TOKEN", res.token);
      window.location.href = "/";
    }
  });
}
export function signout() {
  localStorage.setItem("ACCESS_TOKEN", null);
  window.location.href = "/login";
}
export function signup(userDto){
    return call("/auth/signup","POST",userDto);
}
