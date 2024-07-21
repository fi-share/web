import { URL_API, ACCESS_TOKEN_KEY } from "../config.js";

const GITHUB_URL = "https://github.com";
const GITHUB_API_URL = "https://api.github.com";

const params = new URLSearchParams(location.search);
const access_token = localStorage.getItem(ACCESS_TOKEN_KEY);

document.addEventListener("DOMContentLoaded", async () => {
  const tempContent = document.getElementById("temp-carta").content;
  const container = document.getElementById("container-cartas");
  const idTP = params.get("tp-id");
  if (idTP) {
    const resp = await fetch(`${URL_API}/tps/${idTP}`);
    const { repositorios } = await resp.json();
    const inputHiddenId = document.querySelector(
      'input[type="hidden"][name="id"]'
    );
    let id_usuario_en_maquina = null;
    if (inputHiddenId) {
      id_usuario_en_maquina = inputHiddenId.value;
    }
    repositorios.forEach(
      async ({ id, full_name, titulo, descripcion, id_usuario }) => {
        const contributorsResponse = await fetch(
          `${GITHUB_API_URL}/repos/${full_name}/contributors`,
          {
            Accept: "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
          }
        );
        const contributors = await contributorsResponse.json();

        const carta = tempContent.cloneNode(true).firstElementChild;

        const tituloElement = carta.querySelector("#titulo");
        const descripcionElement = carta.querySelector("#descripcion");

        tituloElement.value = titulo;
        descripcionElement.value = descripcion;

        if (
          id_usuario_en_maquina &&
          (contributors.some(({ id }) => id == id_usuario_en_maquina) ||
            id_usuario == id_usuario_en_maquina)
        ) {
          const floats = document.createElement("div");
          floats.className =
            "absolute right-4 bottom-4 flex gap-4 transition-all";

          const editBtn = document.createElement("button");
          editBtn.innerHTML = `
                    <svg class="h-4 w-4 hover:scale-125" fill="#2563eb" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="m13.835 7.578-.005.007-7.137 7.137 2.139 2.138 7.143-7.142-2.14-2.14Zm-10.696 3.59 2.139 2.14 7.138-7.137.007-.005-2.141-2.141-7.143 7.143Zm1.433 4.261L2 12.852.051 18.684a1 1 0 0 0 1.265 1.264L7.147 18l-2.575-2.571Zm14.249-14.25a4.03 4.03 0 0 0-5.693 0L11.7 2.611 17.389 8.3l1.432-1.432a4.029 4.029 0 0 0 0-5.689Z"/>
                    </svg>
                `;
          editBtn.onclick = () => {
            const form = carta.querySelector("form");

            form.removeAttribute("aria-disabled");
            tituloElement.removeAttribute("disabled");
            descripcionElement.removeAttribute("disabled");

            descripcionElement.focus();

            const tituloAntes = tituloElement.value;
            const descripcionAntes = descripcionElement.value;

            floats.innerHTML = "";

            const submitBtn = document.createElement("button");
            submitBtn.innerHTML = `
                        <svg class="h-4 w-4 hover:scale-125" fill="#2563eb" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                            <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
                        </svg>
                    `;
            submitBtn.onclick = async () => {
              const formData = new FormData(form);
              await fetch(`${URL_API}/tps/${idTP}/repositorios/${id}`, {
                method: "PUT",
                body: formData,
                headers: {
                  Authorization: `Bearer ${access_token}`,
                },
              })
                .catch((err) => alert(err))
                .finally(() => location.reload());
            };
            floats.appendChild(submitBtn);

            const cancelBtn = document.createElement("button");
            cancelBtn.innerHTML = `
                        <svg class="h-4 w-4 hover:scale-125" fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                            <path d="M463.5 224l8.5 0c13.3 0 24-10.7 24-24l0-128c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8l119.5 0z"/>
                        </svg>
                    `;
            cancelBtn.onclick = () => {
              tituloElement.value = tituloAntes;
              descripcionElement.value = descripcionAntes;

              form.setAttribute("aria-disabled", "");
              tituloElement.setAttribute("disabled", "");
              descripcionElement.setAttribute("disabled", "");

              floats.innerHTML = "";
              floats.append(editBtn);
            };
            floats.appendChild(cancelBtn);

            const deleteBtn = document.createElement("button");
            deleteBtn.innerHTML = `
                        <svg class="h-4 w-4 hover:fill-red-950" fill="#000a"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                            <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                        </svg>
                    `;
            deleteBtn.onclick = async () => {
              const formData = new FormData();
              await fetch(`${URL_API}/tps/${idTP}/repositorios/${id}`, {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${access_token}`,
                },
              })
                .catch((err) => alert(err))
                .finally(() => location.reload());
            };
            floats.appendChild(deleteBtn);
          };
          floats.appendChild(editBtn);
          carta.appendChild(floats);
        }

        carta
          .querySelector("#url-repo")
          .setAttribute("href", GITHUB_URL + "/" + full_name);

        container.appendChild(carta);
      }
    );

    if (!repositorios.length) {
      const mensaje = document.createElement("p");
      mensaje.className = "text-2xl font-bold";
      mensaje.textContent =
        "¡Sé el primero en agregar un repositorio para este trabajo práctico!";
      container.appendChild(mensaje);
    }
  }
});
