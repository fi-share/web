function response_received(response){
    console.log("Response received");
    return response.json();
  }
  
function parse_data(data){
  console.log(data);

  const container = document.getElementById("materias");

  for (let i = 0; i < data.materias.length; i++) {
    const item = document.createElement("div");
    item.setAttribute("class", "block px-3 py-3 w-72 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700");
    item.setAttribute("data-anio", data.materias[i].anio);
    item.setAttribute("data-cuatri", data.materias[i].cuatrimestre);

    const card = document.createElement("a");
    card.setAttribute("href", `../cursos?materia-id=${data.materias[i].id}`);

    const materia = document.createElement("p");
    materia.setAttribute("class", "dark:text-gray-50 text-xl font-medium tracking-wide text-left leading-tight");
    materia.append(data.materias[i].nombre);

    const anio = document.createElement("p");
    anio.setAttribute("class", "pt-4 dark:text-gray-300 text-base");
    anio.append(`Año: ${data.materias[i].anio}`);

    const cuatrimestre = document.createElement("p");
    cuatrimestre.setAttribute("class", "pt-2 pb-7 dark:text-gray-300 text-base");
    cuatrimestre.append(`Cuatrimestre: ${data.materias[i].cuatrimestre}°`);

    card.appendChild(materia);
    card.appendChild(anio);
    card.appendChild(cuatrimestre);
    item.appendChild(card);
    container.appendChild(item);
  }
}

function request_error(error){
  console.log("Error ");
  console.log(error);
}

function filtrar_materias() {
  let contenidos = document.querySelectorAll("#materias .block");

  let anios_seleccionados = [];
  let cuatrimestres_seleccionados = [];

  let checkboxes_anio = document.getElementsByName("anio_selec");
  for (let i = 0; i < checkboxes_anio.length; i++) {
      if (checkboxes_anio[i].checked) {
          anios_seleccionados.push(checkboxes_anio[i].value);
      }
  }

  let checkboxes_cuatri = document.getElementsByName("cuatri_selec");
  for (let i = 0; i < checkboxes_cuatri.length; i++) {
      if (checkboxes_cuatri[i].checked) {
          cuatrimestres_seleccionados.push(checkboxes_cuatri[i].value);
      }
  }

  for (let i = 0; i < contenidos.length; i++) {
      let contenido = contenidos[i];
      let anio_cont = contenido.getAttribute("data-anio");
      let cuatri_cont = contenido.getAttribute("data-cuatri");

      let mostrar_por_anio = anios_seleccionados.length === 0 || anios_seleccionados.includes(anio_cont);
      let mostrar_por_cuatri = cuatrimestres_seleccionados.length === 0 || cuatrimestres_seleccionados.includes(cuatri_cont);

      if (mostrar_por_anio && mostrar_por_cuatri) {
          contenido.style.display = "block";
      } else {
          contenido.style.display = "none";
      }
  }
}

document.getElementById("filtro").addEventListener("change", filtrar_materias);
  
  fetch("http://localhost:5000/materias")
    .then(response_received)
    .then(parse_data)
    .then(filtrar_materias)
    .catch(request_error)