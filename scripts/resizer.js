document.addEventListener('DOMContentLoaded', () => {
    const resizable = document.querySelector('.resizable-x');
    const resizer = resizable.querySelector('.resizer-right');

    let isResizing = false;

    function resize(e) {
        if (isResizing) {
            resizable.style.width = `${e.pageX - resizable.clientLeft}px`;
        }
    }
    function resizeTouch(e) {
        if (isResizing) {
            resizable.style.width = `${e.touches[0].pageX - resizable.clientLeft}px`;
        }
    }
    
    function stopResize() {
        if (isResizing) {
            document.removeEventListener('mousemove', resize);
            document.removeEventListener('mouseup', stopResize);
            isResizing = false;
        }
    }
    function stopTouchResize() {
        if (isResizing) {
            document.removeEventListener('touchmove', resize);
            document.removeEventListener('touchend', stopTouchResize);
            isResizing = false;
        }
    }
    
    resizer.addEventListener('mousedown', (e) => {
        isResizing = true;
        document.addEventListener('mousemove', resize);
        document.addEventListener('mouseup', stopResize);
    });
    resizer.addEventListener('touchstart', (e) => {
        isResizing = true;
        document.addEventListener('touchmove', resizeTouch);
        document.addEventListener('touchend', stopTouchResize);
    });
});