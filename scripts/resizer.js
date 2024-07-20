document.addEventListener('DOMContentLoaded', () => {
    const resizable = document.querySelector('.resizable-x');
    const resizer = resizable.querySelector('.resizer-right');

    let isResizing = false;

    function resize(e) {
        if (isResizing) {
<<<<<<< HEAD
            resizable.style.width = `${e.pageX - resizable.clientLeft}px`;
=======
            resizable.style.width = `${e.pageX + 1 - resizable.clientLeft}px`;
>>>>>>> f01c456949567e88fa44bf9fa2e40d0396f697ce
        }
    }
    
    function stopResize() {
        if (isResizing) {
            document.removeEventListener('mousemove', resize);
            document.removeEventListener('mouseup', stopResize);
            isResizing = false;
        }
    }
    
    resizer.addEventListener('mousedown', (e) => {
        isResizing = true;
        document.addEventListener('mousemove', resize);
        document.addEventListener('mouseup', stopResize);
    });
});