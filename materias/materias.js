function response_received(response){
    console.log("Response received");
    return response.json();
  }
  
  function parse_data(data){
    console.log(data);
  
    const container = document.getElementById("materias");
    container.setAttribute("class", "px-10 my-5 flex flex-row flex-wrap gap-10 mx-auto justify-center");
  
    for (let i = 0; i < data.materias.length; i++) {
    const item = document.createElement("div");
    item.setAttribute("class", "px-3 py-3 w-72 h-40 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700");
  
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
  
  fetch("http://localhost:5000/materias")
    .then(response_received)
    .then(parse_data)
    .catch(request_error)