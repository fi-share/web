import {URL_API} from "../config.js"

const breadcrumb = document.getElementById("breadcrumb");
const tempContent = document.getElementById("temp-breadcrumb-item").content;
const params = new URLSearchParams(location.search);

document.addEventListener("DOMContentLoaded", async () => {
  async function getItems() {
    const [primerParametro] = params.entries();
    if (primerParametro) {
      const apiEndpoint = primerParametro[0].replace("-id", "s") // materias, cursos o tps
      const id = primerParametro[1];
      console.log(`${URL_API}/${apiEndpoint}/${id}`)
      const resp = await fetch(`${URL_API}/${apiEndpoint}/${id}`)
      console.log(resp)
      return await resp.json()
    }
    return {}
  }
  const { tp, curso, materia } = await getItems();

  switch (location.pathname) {
    case "/repos/agregar/": {
      const item = tempContent.cloneNode(true).firstElementChild;
      item.querySelector("a").textContent = "Agregar";
      breadcrumb.insertAdjacentElement("afterbegin", item);
    }
    case "/repos/": {
      const item = tempContent.cloneNode(true).firstElementChild;
      const anchor = item.querySelector("a")
      anchor.textContent = "Repositorios";
      anchor.setAttribute("href", `/repos?tp-id=${tp.id}`)
      breadcrumb.insertAdjacentElement("afterbegin", item);
    }
    case "/tps/": {
      const item = tempContent.cloneNode(true).firstElementChild;
      const anchor = item.querySelector("a")
      anchor.textContent = tp ? tp.nombre : "TPs";
      anchor.setAttribute("href", tp ? `/tps?curso-id=${curso.id}` : "/tps")
      anchor.setAttribute("title", tp ? `TPs de ${curso.nombre}` : "")
      breadcrumb.insertAdjacentElement("afterbegin", item);
    }
    case "/cursos/": {
      const item = tempContent.cloneNode(true).firstElementChild;
      const anchor = item.querySelector("a")
      anchor.textContent = curso ? curso.nombre : "Cursos";
      anchor.setAttribute("href", curso ? `/cursos?materia-id=${materia.id}` : "")
      anchor.setAttribute("title", curso ? `Cursos de ${materia.nombre}` : "")
      breadcrumb.insertAdjacentElement("afterbegin", item);
    }
    case "/materias/": {
      const item = tempContent.cloneNode(true).firstElementChild;
      const anchor = item.querySelector("a")
      anchor.textContent = materia ? materia.nombre : "Materias";
      anchor.setAttribute("href", "/materias")
      anchor.setAttribute("title", "Todas las materias")
      breadcrumb.insertAdjacentElement("afterbegin", item);
    }
    case "/": {
      const item = tempContent.cloneNode(true).firstElementChild;
      const anchor = item.querySelector("a")
      anchor.setAttribute("href", "/")
      anchor.setAttribute("title", "Inicio")
      anchor.innerHTML = `
        <img src="/images/icono-sin-fondo.png" alt="Logo de Fi Share" class="h-10 invert">
        <h1 class="text-2xl font-bold dark:text-slate-50 tracking-tight">Fi Share</h1>
      `;
      breadcrumb.insertAdjacentElement("afterbegin", item);
    }
  }
})
