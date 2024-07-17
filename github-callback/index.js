import { URL_API, ACCESS_TOKEN_KEY, OAUTH_REDIRECT_URI } from "../config.js";

const urlParams = new URLSearchParams(location.search);
const code = urlParams.get("code");
const state = urlParams.get("state");
const urlOrigin = atob(state);

if (!code || !urlOrigin) {
  alert("Github no respondío con lo esperado");
  location.href = location.origin;
}

fetch(URL_API + "/exchange-code", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ code, redirect_uri: OAUTH_REDIRECT_URI }),
})
  .then((resp) => resp.json())
  .then((json) => {
    if (!json.access_token) {
      alert(json.error_description);
      location.href = location.origin;
    }

    localStorage.setItem(ACCESS_TOKEN_KEY, json.access_token);
  });
location.href = urlOrigin;
