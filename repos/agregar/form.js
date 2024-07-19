import {ACCESS_TOKEN_KEY, URL_API} from "../../config.js"

const params = new URLSearchParams(location.search);

document.addEventListener("DOMContentLoaded", async () => {
    const access_token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!access_token) { 
        alert("Debe iniciar sesión")
        location.href = location.origin;
    }
    const idTP = params.get("tp-id")
    if (!idTP) {
        alert("No se coloco el tp en la url")
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
    const idUsuario = document.querySelector('input[type="hidden"][name="id"]').value
    data.forEach(({description, full_name, name, id, owner}) => {
        if (owner.id == idUsuario) {
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
    document.getElementById("form-agregar").addEventListener("submit", async (e) => {
        e.preventDefault();
        console.log(e);
        const formData = new FormData(e.target);
        formData.append("id_usuario", idUsuario)
        const resp = await fetch(`${URL_API}/tps/${idTP}/repositorios`, {
            method: "POST",
            body: formData,
        })
        if (resp.status >= 200 && resp.status < 300) {
            alert("Agregado correctamente")

        } else {
            alert("Ocurrió un error")
        }
        console.log(formData);
    })
})
