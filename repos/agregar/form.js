import {ACCESS_TOKEN_KEY} from "../../config.js"

document.addEventListener("DOMContentLoaded", async () => {
    const access_token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!access_token) { 
        alert("Debe iniciar sesión")
        location.href = location.origin;
    }
    const response = await fetch("https://api.github.com/user/repos", {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${access_token}`,
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });
    const data = await response.json(); 
    console.log(data)
})