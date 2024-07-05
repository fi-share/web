const ACCESS_TOKEN_KEY = "access_token_fi_share";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  if (code) {
    const { location } = window;
    // Intercambiar el código de autorización por un token de acceso y lo guardo
    const response = await fetch("http://localhost:5000/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code, redirect_uri: location.href }),
    });
    const { access_token } = await response.json();
    localStorage.setItem(ACCESS_TOKEN_KEY, access_token);

    // elimino code de URLSearchParams
    urlParams.delete("code");
    history.replaceState(
      null,
      "",
      location.origin + location.pathname + "?" + urlParams.toString()
    );
  }

  const access_token = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (access_token) {
    try {
      const response = await fetch("https://api.github.com/user", {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${access_token}`,
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });
      const { avatar_url, login, email, name, html_url } = await response.json();
      console.log(avatar_url, login, email, name, html_url);

      const avatar = document.getElementById("login-avatar");
      avatar.setAttribute("src", avatar_url)
      avatar.setAttribute("alt", "user avatar")

      const miniDataList = document.getElementById("login-minidata-list");
      const spanLogin = document.createElement("span");
      spanLogin.textContent = login;
      spanLogin.className = "block font-bold";
      if (name) {
        const spanName = document.createElement("span");
        spanName.textContent = name;
        spanName.className = "block font-bold";
        spanLogin.className = "text-xs text-slate-400";
        miniDataList.appendChild(spanName);
    }
    miniDataList.appendChild(spanLogin);

      document.getElementById("mi-github").setAttribute("href", html_url);


      document
        .getElementById("login-section")
        .setAttribute("aria-disabled", "false");
    } catch (error) {
      console.error(error);
    }
  } else {
    document.getElementById("login-button").addEventListener("click", () => {
      const clientId = "Ov23li0fsg8Uodd5Qy1d";
      const redirectUri = encodeURIComponent(window.location.href);
      window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;
    });
  }

  document.getElementById("cerrar-sesion").addEventListener("click", () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    window.location.reload();
  });
});
