import {ACCESS_TOKEN_KEY} from "../config.js"

document.addEventListener("DOMContentLoaded", () => {
    const access_token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (access_token) {
        const linkNuevo = document.createElement("a")
        linkNuevo.className = "cursor-pointer px-2 text-2xl font-medium dark:text-gray-400 dark:hover:text-white flex items-center"
        linkNuevo.setAttribute("href", "/repos/agregar" + location.search)
        linkNuevo.textContent = "+ agregar repositorio"
        
        document.getElementById("breadcrumb").insertAdjacentElement("afterend", linkNuevo)
    }
})