import {URL_API} from "../config.js";    

const params = new URLSearchParams(window.location.search);
const id_curso = params.get('curso-id');

function mostrar_desc(descripcion){
    const aside = document.getElementById("aside");
    aside.scrollTop = 0;
    const contenido = document.getElementById("descripcion");
    contenido.textContent = descripcion;
}
function mostrar_nombre(nombre){
    const tp = document.getElementById("nombre_tp");
    tp.textContent = nombre;
}

function response_received(response){
    console.log("Response received");
    return response.json();
}

function parse_data(data){
    console.log("Data parsed");
    console.log(data);

    const curso = document.getElementById("curso");
    curso.append(data.curso.nombre);

    if(data.curso.tps.length === 0){
        const alerta = document.createElement("div");
        alerta.setAttribute("class", "mx-auto mt-10 w-1/2 flex items-center p-4 text-xl text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800");
        alerta.innerHTML = `<svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                            </svg>
                            <div>
                                <span class="font-medium">No hay TPs subidos del curso elegido.</span>
                            </div>`;
        curso.appendChild(alerta);
    }else{
        const aside = document.getElementById("aside");
        aside.classList.add("w-1/4"); 

        const container = document.getElementById("tps");
        container.setAttribute("class", "px-10 pt-5 my-5 flex flex-row flex-wrap gap-10 mx-auto justify-center");
    
        for(let i = 0; i < data.curso.tps.length ;i++){
            const item = document.createElement("div");
            item.setAttribute("class", "m-4 px-3 py-auto w-42 h- rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700");

            const card = document.createElement("a");
            card.setAttribute("href", `../repos?tp-id=${data.curso.tps[i].id}`);
            card.setAttribute("class", "text-decoration-none");

            const tp = document.createElement("p");
            tp.setAttribute("class", "dark:text-gray-50 text-2xl font-medium tracking-wide text-center leading-tight p-3");
            tp.append(data.curso.tps[i].nombre);

            const boton_desc = document.createElement("button");
            boton_desc.setAttribute("class", "text-white font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 dark:bg-gray-900 dark:hover:bg-gray-800 hover:ring-2 hover:ring-gray-500");
            boton_desc.innerText = "Descripción"
            boton_desc.addEventListener("click", () => mostrar_desc(data.curso.tps[i].descripcion));
            boton_desc.addEventListener("click", () => mostrar_nombre(data.curso.tps[i].nombre))

            item.appendChild(card);
            card.appendChild(tp);
            item.appendChild(boton_desc)
            container.appendChild(item);

            if(i === 0){
                mostrar_desc(data.curso.tps[i].descripcion)
                mostrar_nombre(data.curso.tps[i].nombre)
            }
        }
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