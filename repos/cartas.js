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
        const inputHiddenId = document.querySelector('input[type="hidden"][name="id"]');
        let id_usuario_en_maquina = null
        if (inputHiddenId) {
            id_usuario_en_maquina = inputHiddenId.value
        }
        repositorios.forEach(async ({id, full_name, titulo, descripcion, id_usuario}) => {
            const contributorsResponse = await fetch(`${GITHUB_API_URL}/repos/${full_name}/contributors`, {
                Accept: "application/vnd.github+json",
                "X-GitHub-Api-Version": "2022-11-28",
              })
            const contributors = await contributorsResponse.json();
            
            const carta = tempContent.cloneNode(true).firstElementChild;
            carta.querySelector("#titulo").value = titulo;
            carta.querySelector("#descripcion").value = descripcion;
            carta.querySelector("#url-repo").setAttribute("href", GITHUB_URL + "/" +  full_name);
            if ((id_usuario_en_maquina) && (contributors.some(({id})=> id == id_usuario_en_maquina) || id_usuario == id_usuario_en_maquina)) {
                const button = document.createElement("button");
                button.className = "absolute right-4 bottom-4";
                button.innerHTML = `
                    <img class="w-6 h-6" src="/images/editar.svg" alt="editar">
                `
                console.log(button);
                carta.appendChild(button);
            }

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