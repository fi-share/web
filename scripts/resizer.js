document.addEventListener('DOMContentLoaded', () => {
    const resizable = document.querySelector('.resizable-x');
    const resizer = resizable.querySelector('.resizer-right');

    let isResizing = false;

    function resize(e) {
        if (isResizing) {
            resizable.style.width = `${e.pageX - resizable.clientLeft}px`;
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