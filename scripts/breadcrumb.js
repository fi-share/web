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
      // const resp = await fetch(`${URL_API}/${primerParametro[0]}/${primerParametro[1]}`)
      // const { repositorio, tp, curso, materia } = await resp.json()
    }
    return {}
  }
  const { tp, curso, materia } = await getItems();

  switch (location.pathname) {
    case "/repos/": {
      const item = tempContent.cloneNode(true).firstElementChild;
      item.querySelector("a").textContent = "Repositorios";
      breadcrumb.insertAdjacentElement("afterbegin", item);
    }
    case "/tps/": {
      const item = tempContent.cloneNode(true).firstElementChild;
      item.querySelector("a").textContent = tp ? tp : "TPs";
      breadcrumb.insertAdjacentElement("afterbegin", item);
    }
    case "/cursos/": {
      const item = tempContent.cloneNode(true).firstElementChild;
      item.querySelector("a").textContent = curso ? curso : "Cursos";
      breadcrumb.insertAdjacentElement("afterbegin", item);
    }
    case "/materias": {
      const item = tempContent.cloneNode(true).firstElementChild;
      item.querySelector("a").textContent = materia ? materia : "Materias";
      breadcrumb.insertAdjacentElement("afterbegin", item);
    }
    case "/": {
      const item = tempContent.cloneNode(true).firstElementChild;
      item.querySelector("a").innerHTML = `
        <img src="/images/icono-sin-fondo.png" alt="Logo de Fi Share" class="h-10 invert">
        <h1 class="text-2xl font-bold dark:text-slate-50 tracking-tight">Fi Share</h1>
      `;
      breadcrumb.insertAdjacentElement("afterbegin", item);
    }
  }
})
