import {ACCESS_TOKEN_KEY, CLIENT_ID} from "../config.js"

document.addEventListener("DOMContentLoaded", async () => {
  const access_token = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (access_token) {
    try {
      //obtener datos y mostrarlos
    } catch (error) {
      console.error(error);
    }
  } else {
    // Colocar boton de iniciar sesion en header
    const btnLogin = document.createElement("button");
    btnLogin.className =
      "ml-auto dark:bg-[#24292F] font-medium rounded-lg text-sm px-3 py-0 text-center inline-flex items-center dark:text-slate-400 hover:ring-2 dark:hover:ring-gray-500 transition duration-300 ease-in-out";
    btnLogin.innerHTML = `
      Iniciar sesion con GitHub
      <img src="/images/github.svg" alt="GitHub Logo"  class="w-4 h-4 invert ml-2">
      `;
    // Asignar funcion de redirigir a github
    btnLogin.addEventListener("click", () => {
      const state = btoa(window.location.href);
      window.location.href = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&state=${state}`;
    });
    document.querySelector("header").appendChild(btnLogin);
  }
});

document.addEventListener('DOMContentLoaded', function() {
    const pagina_actual = window.location.pathname;
    const paramentros = new URLSearchParams(window.location.search);
    
    if(pagina_actual === '/'){
      document.getElementById('nav_materia').classList = 'hidden';
      document.getElementById('nav_curso').classList = 'hidden';
      document.getElementById('nav_tp').classList = 'hidden';
      document.getElementById('nav_repo').classList = 'hidden';
    }
    else if(pagina_actual === '/cursos/'){
      document.getElementById('curso').classList = 'ms-1 text-sm font-medium dark:text-gray-400'
      document.getElementById('curso').removeAttribute('href');
      document.getElementById('nav_tp').classList = 'hidden';
      document.getElementById('nav_repo').classList = 'hidden';
  
      const materia = paramentros.get('materia');
      if(materia === null){
        window.location.href = '/#materias';
      }
      document.getElementById('materia').innerText = materia;
    }
    else if(pagina_actual === '/tps/'){
      document.getElementById('tp').classList = 'ms-1 text-sm font-medium dark:text-gray-400'
      document.getElementById('tp').removeAttribute('href');
      document.getElementById('nav_repo').classList = 'hidden';
  
      const materia = paramentros.get('materia');
      if(materia === null){
        window.location.href = '/#materias';
      }
      document.getElementById('materia').innerText = materia;
      const curso = paramentros.get('curso');
      if(curso === null){
        window.location.href = `/cursos/?materia=${materia}`;
      }
      document.getElementById('curso').innerText = curso;
    }
    else if(pagina_actual === '/repos/'){
      const materia = paramentros.get('materia');
      if(materia === null){
        window.location.href = '/#materias';
      }
      document.getElementById('materia').innerText = materia;
      const curso = paramentros.get('curso');
      if(curso === null){
        window.location.href = `/cursos/?materia=${materia}`;
      }
      document.getElementById('curso').innerText = curso;
      const tp = paramentros.get('tp');
      if(tp === null){
        window.location.href = `/tps/?materia=${materia}&curso=${curso}`;
      }
      document.getElementById('tp').innerText = tp;
      
    }
});