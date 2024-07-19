import {ACCESS_TOKEN_KEY} from "../../config.js"

document.addEventListener("DOMContentLoaded", async () => {
    const access_token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!access_token) { 
        alert("Debe iniciar sesión")
        location.href = location.origin;
    }
    const response = await fetch("https://api.github.com/user/repos", {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${access_token}`,
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });
    const data = await response.json();
    const tempContent = document.getElementById("temp-repo").content
    const fieldSelecRepo = document.getElementById("seleccionar-repo")
    data.forEach(({description, full_name, name, id, owner}) => {
        if (owner.id == document.querySelector('input[type="hidden"][name="id"]').value) {
            console.log(description,full_name,name,id);
            const repo = tempContent.cloneNode(true).firstElementChild;

            function completarDatosRepo() {
                document.getElementById("titulo").value = name
                if (description)
                    document.getElementById("descripcion").textContent = description
                console.log("click");
            }

            const input = repo.querySelector("input");
            input.id = id
            input.value = full_name
            const label = repo.querySelector("label")
            label.setAttribute("for", id)
            label.textContent = full_name
            label.addEventListener("click", completarDatosRepo)
            
            fieldSelecRepo.appendChild(repo);
        }
        
    });
})

document.getElementById("form-agregar").addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log(e);
    const formdata = new FormData(e.target);
    console.log(formdata);
})