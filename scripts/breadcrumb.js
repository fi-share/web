const breadcrumb = document.getElementById("breadcrumb");
const tempContent = document.getElementById("temp-breadcrumb-item").content;
let primer_elemento_a_agregar = true;
const parametros = new URLSearchParams(location.search);

switch (location.pathname) {
  case "/repos/": {
    const item = tempContent.cloneNode(true).firstElementChild;
    if (primer_elemento_a_agregar) {
      item.querySelector("a").textContent = "Repos";
      primer_elemento_a_agregar = false;
    } else {
      const repo = parametros.get("repo");
      if (!repo) location.href = location.origin + "/repos";
      item.querySelector("a").textContent = repo;
    }
    breadcrumb.insertAdjacentElement("afterbegin", item);
  }
  case "/tps/": {
    const item = tempContent.cloneNode(true).firstElementChild;
    if (primer_elemento_a_agregar) {
      item.querySelector("a").textContent = "TPs";
      primer_elemento_a_agregar = false;
    } else {
      const tp = parametros.get("tp");
      if (!tp) location.href = location.origin + "/tps";
      item.querySelector("a").textContent = tp;
    }
    breadcrumb.insertAdjacentElement("afterbegin", item);
  }
  case "/cursos/": {
    const item = tempContent.cloneNode(true).firstElementChild;
    if (primer_elemento_a_agregar) {
      item.querySelector("a").textContent = "Cursos";
      primer_elemento_a_agregar = false;
    } else {
      const curso = parametros.get("curso");
      if (!curso) location.href = location.origin + "/cursos";
      item.querySelector("a").textContent = curso;
    }
    breadcrumb.insertAdjacentElement("afterbegin", item);
  }
  case "/": {
    const item = tempContent.cloneNode(true).firstElementChild;
    if (primer_elemento_a_agregar) {
      item.querySelector("a").textContent = "Materias";
      primer_elemento_a_agregar = false;
    } else {
      const materia = parametros.get("materia");
      if (!materia) location.href = location.origin + "/";
      item.querySelector("a").textContent = materia;
    }
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
