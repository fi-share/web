import {ACCESS_TOKEN_KEY, CLIENT_ID} from "../config.js"

document.addEventListener("DOMContentLoaded", async () => {
  const access_token = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (access_token) { //obtener datos y mostrarlos
    try {
      const avatar_url = "/images/icono.jpeg";
      const login = "fi-share";
      const name = "";
      const html_url = "https://github.com/fi-share";

      const containerPerfil = document.createElement("details");
      containerPerfil.className = "relative";
      containerPerfil.role = "container-perfil"
      containerPerfil.innerHTML = `
      <summary class="list-none cursor-pointer">
        <img src="${avatar_url}" alt="avatar" class="w-10 h-10 rounded-full shadow-2xl p-1">
      </summary>
      <section class="absolute w-36 text-center right-full -translate-x-4 translate-y-4 text-indigo-900">
        <ul role="minidata-list" 
        class="border border-indigo-900 rounded-t-lg mb-2 p-2 first:text-lg first:font-bold [&:not(:first-child)]:text-xs [&:not(:first-child)]:font-light">
          ${(name ? `<li class="text-nowrap">${name}</li>` : "")}
          <li class="text-nowrap">${login}</li>
        </ul>
        <nav class="border border-indigo-900 rounded-b-lg py-3">
          <a href="${html_url}" target="_blank" href="#" 
            class="block p-2 hover:font-black">
            Mi GitHub
          </a>
          <button id="cerrar-sesion" 
            class="block w-full p-2 hover:font-bold">
            Cerrar Sesión
          </button>
        </nav>
      </section>
      `
      document.querySelector("header").appendChild(containerPerfil)
    } catch (error) {
      console.error(error);
    }
  } else {
    // Colocar boton de iniciar sesion en header
    const btnLogin = document.createElement("button");
    btnLogin.className =
      "ml-auto dark:bg-[#24292F] font-medium rounded-lg text-sm px-3 py-0 text-center inline-flex items-center dark:text-slate-400 hover:ring-2 dark:hover:ring-gray-500 transition duration-300 ease-in-out";
    btnLogin.innerHTML = `
      Iniciar sesion con GitHub
      <img src="/images/github.svg" alt="GitHub Logo"  class="w-4 h-4 invert ml-2">
      `;
    // Asignar funcion de redirigir a github
    btnLogin.addEventListener("click", () => {
      const state = btoa(window.location.href);
      window.location.href = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&state=${state}`;
    });
    document.querySelector("header").appendChild(btnLogin);
  }
});