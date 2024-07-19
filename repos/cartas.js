import { URL_API } from "../config.js"

const GITHUB_URL = "https://github.com"

const params = new URLSearchParams(location.search);

document.addEventListener("DOMContentLoaded", async () => {
    const tempContent = document.getElementById("temp-carta").content;
    const container = document.getElementById("container-cartas");
    const idTP = params.get("tp-id")
    if (idTP) {
        const resp = await fetch(`${URL_API}/tps/${idTP}`)
        const {repositorios} = await resp.json()
        repositorios.forEach(({id, full_name, descripcion, id_usuario}) => {
            const carta = tempContent.cloneNode(true).firstElementChild;
            carta.getElementById("titulo").textContent = full_name;
            carta.getElementById("descripcion").textContent = descripcion;
            carta.getElementById("url-repo").setAttribute("href", GITHUB_URL + full_name);

            container.appendChild(carta)
        });

        if (!repositorios.length) {
            const mensaje = document.createElement("p");
            mensaje.className = "text-2xl font-bold"
            mensaje.textContent = "¡Sé el primero en agregar un repositorio para este trabajo práctico!"
            container.appendChild(mensaje)
        }
    }
})