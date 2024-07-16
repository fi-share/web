document.addEventListener('DOMContentLoaded', function() {
    const pagina_actual = window.location.pathname;
    const paramentros = new URLSearchParams(window.location.search);
    
    if(pagina_actual === '/'){
      document.getElementById('materia').classList = 'ms-1 text-sm font-medium dark:text-gray-400';
      document.getElementById('materia').removeAttribute('href');
      document.getElementById('nav_curso').classList = 'hidden';
      document.getElementById('nav_tp').classList = 'hidden';
      document.getElementById('nav_repo').classList = 'hidden';
    }else if(pagina_actual === '/#materias'){
      document.getElementById('materia').classList = 'ms-1 text-sm font-medium dark:text-gray-400';
      document.getElementById('materia').removeAttribute('href');
      document.getElementById('nav_curso').classList = 'hidden';
      document.getElementById('nav_tp').classList = 'hidden';
      document.getElementById('nav_repo').classList = 'hidden';
    }else if(pagina_actual === '/cursos/'){
      document.getElementById('curso').classList = 'ms-1 text-sm font-medium dark:text-gray-400';
      document.getElementById('curso').removeAttribute('href');
      document.getElementById('nav_tp').classList = 'hidden';
      document.getElementById('nav_repo').classList = 'hidden';
  
      const materia = paramentros.get('materia');
      if(materia === null){
        window.location.href = '/#materias';
      }
      document.getElementById('materia').innerText = materia;
    }else if(pagina_actual === '/tps/'){
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
    }else if(pagina_actual === '/repos/'){
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