import {URL_API} from '../config.js';

const params = new URLSearchParams(window.location.search);
const id_materia = params.get('materia-id');

function response_received(response){
    console.log("Response received");
    return response.json();
}

function parse_data(data){
    console.log("Data parsed");
    console.log(data);

    const materia = document.getElementById("materia");
    materia.append(data.materia.nombre);

    const container = document.getElementById("cursos");
    container.setAttribute("class", "px-10 pt-5 my-5 flex flex-row flex-wrap gap-10 mx-auto justify-center");

    for(let i = 0; i < data.materia.cursos.length ;i++){
        console.log(data.materia.cursos[i].nombre);
        const item = document.createElement("div");
        item.setAttribute("class", "px-3 py-3 w-42 h-20 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700");

        const card = document.createElement("a");
        card.setAttribute("href", `../tps?curso-id=${data.materia.cursos[i].id}`);
        card.setAttribute("class", "text-decoration-none");

        const curso = document.createElement("p");
        curso.setAttribute("class", "dark:text-gray-50 text-xl font-medium tracking-wide text-center leading-tight pt-3");
        curso.append(data.materia.cursos[i].nombre);


        item.appendChild(card);
        card.appendChild(curso);
        container.appendChild(item);
    }

}

function request_error(error){
    console.log("Request error");
    console.log(error); 
}

fetch(`${URL_API}/materias/${id_materia}`)
    .then(response_received)
    .then(parse_data)
    .catch(request_error)