import { URL_API } from "../config.js"

const params = new URLSearchParams(location.search);

document.addEventListener("DOMContentLoaded", async () => {
    const idTP = params.get("tp-id")
    if (idTP) {
        const resp = await fetch(`${URL_API}/tps/${idTP}/descripcion_html`)
        const descripcion = await resp.text()
        document.querySelector("article").innerHTML = descripcion
    }
})