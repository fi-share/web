import {URL_API} from "../config.js";    

const params = new URLSearchParams(window.location.search);
const id_curso = params.get('curso-id');

function response_received(response){
    console.log("Response received");
    return response.json();
}

function parse_data(data){
    console.log("Data parsed");
    console.log(data);

    const curso = document.getElementById("curso");
    curso.append(data.curso.nombre);

    const container = document.getElementById("tps");
    container.setAttribute("class", "px-10 pt-5 my-5 flex flex-row flex-wrap gap-10 mx-auto justify-center");
   
    for(let i = 0; i < data.curso.tps.length ;i++){
        const item = document.createElement("div");
        item.setAttribute("class", "px-3 py-auto w-42 h- rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700");

        const card = document.createElement("a");
        card.setAttribute("href", `../repos?tp-id=${data.curso.tps[i].id}`);
        card.setAttribute("class", "text-decoration-none");

        const tp = document.createElement("p");
        tp.setAttribute("class", "dark:text-gray-50 text-xl font-medium tracking-wide text-center leading-tight pt-1");
        tp.append(data.curso.tps[i].nombre);

        const descripcion = document.createElement("p");
        descripcion.setAttribute("class", "dark:text-gray-50 text-xl font-medium tracking-wide text-center leading-tight");
        descripcion.append("Descripcion: ");

        item.appendChild(card);
        card.appendChild(tp);
        card.appendChild(descripcion);
        container.appendChild(item);
    }
} 

function request_error(error){
    console.log("Request error");
    console.log(error); 
}


fetch(`${URL_API}/cursos/${id_curso}`)
    .then(response_received)
    .then(parse_data)
    .catch(request_error)