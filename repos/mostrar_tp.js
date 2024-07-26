import { URL_API } from "../config.js"

const params = new URLSearchParams(location.search);

async function get_descripcion_tp(idTP) {
    try {
        const resp = await fetch(`${URL_API}/tps/${idTP}/descripcion_html`)
        if (!resp.ok) throw Error(resp.statusText)
        return await resp.text()
    } catch (error) {
        const reload = document.createElement("button");
        reload.innerHTML = `
        <img src="../images/reload.svg" alt="Recargar pagina"/>
        `;
        reload.className =
        "border border-white opacity-35 hover:opacity-100 rounded-lg w-16 h-16 p-2 block mx-auto";
        alert(
        error +
            "\n\nEs muy probable que sea devido a que el servidor backend se esté levantando, recarga el contenido."
        );
        reload.onclick = () => {
        colocar_descripcion_tp();
        reload.outerHTML = '<span class="loader-spinner"></span>';
        };
        const container = document.getElementById("load");
        container.innerHTML = "";
        container.appendChild(reload);
        return null;
    }
}

async function colocar_descripcion_tp() {
    const idTP = params.get("tp-id")
    if (idTP) {
        const descripcion = await get_descripcion_tp(idTP);
        if (descripcion) {
            document.getElementById("load").remove();
            document.querySelector("article").innerHTML = descripcion
        }
    }
}

document.addEventListener("DOMContentLoaded", colocar_descripcion_tp)