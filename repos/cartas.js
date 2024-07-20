import { URL_API } from "../config.js"

const GITHUB_URL = "https://github.com"
const GITHUB_API_URL = "https://api.github.com"

const params = new URLSearchParams(location.search);

document.addEventListener("DOMContentLoaded", async () => {
    const tempContent = document.getElementById("temp-carta").content;
    const container = document.getElementById("container-cartas");
    const idTP = params.get("tp-id")
    if (idTP) {
        const resp = await fetch(`${URL_API}/tps/${idTP}`)
        const {repositorios} = await resp.json()
        console.log(repositorios);
        repositorios.forEach(async ({id, full_name, titulo, descripcion, id_usuario}) => {
            const contributorsResponse = await fetch(`${GITHUB_API_URL}/repos/${full_name}/contributors`, {
                Accept: "application/vnd.github+json",
                "X-GitHub-Api-Version": "2022-11-28",
              })
            const contributors = await contributorsResponse.json();
            console.log("contributors: ", contributorsResponse, contributors);

            const carta = tempContent.cloneNode(true).firstElementChild;
            carta.querySelector("#titulo").textContent = titulo;
            carta.querySelector("#descripcion").textContent = descripcion;
            carta.querySelector("#url-repo").setAttribute("href", GITHUB_URL + "/" +  full_name);

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