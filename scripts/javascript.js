const ACCESS_TOKEN_KEY = "access_token_fi_share";

document.addEventListener("DOMContentLoaded", async () => {
  const access_token = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (access_token) {
    try {
        //obtener datos y mostrarlos
    } catch (error) {
      console.error(error);
    }
  } else { // Colocar boton de iniciar sesion en header
    const btnLogin = document.createElement("button");
    btnLogin.className = "ml-auto dark:bg-[#24292F] font-medium rounded-lg text-sm px-3 py-0 text-center inline-flex items-center dark:text-slate-400 hover:ring-2 dark:hover:ring-gray-500 transition duration-300 ease-in-out";
    btnLogin.innerHTML = `
      Iniciar sesion con GitHub
      <img src="/images/github.svg" alt="GitHub Logo"  class="w-4 h-4 invert ml-2">
      `;
    // Asignar funcion de redirigir a github
    btnLogin.addEventListener("click", () => {
        //...
    });
    document.querySelector("header").appendChild(btnLogin);
  }
});