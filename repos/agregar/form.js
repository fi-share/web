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
    data.forEach(({description, full_name, name, id, owner}) => {
        const repo = tempContent.cloneNode(true).firstElementChild;

        function completarDatosRepo() {
            document.getElementById("titulo").value = name
            document.getElementById("id_repo").value = id
            document.getElementById("id_usuario").value = owner.id
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
    });
    if (!data.length) {
        const mensaje = document.createElement("p")
        mensaje.textContent = "Revise si los repositorios que tiene son públicos."
        fieldSelecRepo.appendChild(mensaje)
    }
    document.getElementById("form-agregar").addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const idRepo = formData.get("id_repo")
        formData.delete("id_repo")
        console.log(formData);
        const resp = await fetch(`${URL_API}/tps/${idTP}/repositorios/${idRepo}`, {
            method: "POST",
            body: formData,
        })
        if (resp.status >= 200 && resp.status < 300) {
            alert("Agregado correctamente")

        } else {
            alert("Ocurrió un error")
        }
    })
})
