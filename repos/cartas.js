document.addEventListener("DOMContentLoaded", ()=> {
    const tempContent = document.getElementById("temp-carta").content;
    const container = document.getElementById("container-cartas");
    for (let i = 0; i < 20; i++) {
        const carta = tempContent.cloneNode(true).firstElementChild;
        container.appendChild(carta)
    }
})