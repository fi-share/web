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

  if (location.pathname == "/repos/agregar/") {
    const item = tempContent.cloneNode(true).firstElementChild;
    item.querySelector("a").textContent = "Agregar Repositorio";
    breadcrumb.insertAdjacentElement("afterbegin", item);
  }

  if (tp) {
    const item = tempContent.cloneNode(true).firstElementChild;
    const anchor = item.querySelector("a")
    anchor.textContent = tp.nombre;
    anchor.setAttribute("href", `/repos?tp-id=${tp.id}`)
    anchor.setAttribute("title", `Repositorios de ${tp.nombre}`)
    breadcrumb.insertAdjacentElement("afterbegin", item);
  }
  
  if (curso) {
    const item = tempContent.cloneNode(true).firstElementChild;
    const anchor = item.querySelector("a")
    anchor.textContent = curso ? curso.nombre : "Cursos";
    anchor.setAttribute("href", `/tps?curso-id=${curso.id}`)
    anchor.setAttribute("title", `TPs de ${curso.nombre}`)
    breadcrumb.insertAdjacentElement("afterbegin", item);
  }
    
  if (materia) {
    const item = tempContent.cloneNode(true).firstElementChild;
    const anchor = item.querySelector("a")
    anchor.textContent = materia ? materia.nombre : "Materias";
    anchor.setAttribute("href", `/cursos?materia-id=${materia.id}`)
    anchor.setAttribute("title", `Cursos de ${materia.nombre}`)
    breadcrumb.insertAdjacentElement("afterbegin", item);
  }

  {
    const item = tempContent.cloneNode(true).firstElementChild;
    const anchor = item.querySelector("a")
    anchor.textContent = "Materias";
    anchor.setAttribute("href", "/materias")
    anchor.setAttribute("title", "Todas las materias")
    breadcrumb.insertAdjacentElement("afterbegin", item); 
  }
  
  {
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
})
