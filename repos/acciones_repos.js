import {ACCESS_TOKEN_KEY} from "../config.js"

document.addEventListener("DOMContentLoaded", () => {
    const access_token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (access_token) {
        const linkNuevo = document.createElement("a")
        linkNuevo.className = "cursor-pointer float-right ml-2 mb-2 w-12 h-12 text-center text-4xl dark:text-gray-400 dark:hover:text-white rounded-lg border border-gray-400 hover:border-white"
        linkNuevo.setAttribute("href", "web/repos/agregar" + location.search)
        linkNuevo.textContent = "+"
        
        document.getElementById("title-Repositorios").insertAdjacentElement("beforebegin", linkNuevo)
    }
})