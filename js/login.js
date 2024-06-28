
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


const loginSection = document.getElementById('login-section')
const userSection = document.getElementById('user-section')

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
        const {location} = window;
        // Intercambiar el código de autorización por un token de acceso y lo guardo
        const response = await fetch('http://localhost:5000/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code, redirect_uri: location.href })
        });
        const {access_token} = await response.json();
        localStorage.setItem('access_token', access_token);

        // elimino code de URLSearchParams
        urlParams.delete('code');
        history.replaceState(null, '', 
            location.origin + location.pathname + "?" + urlParams.toString()
            );
        

    }

    const access_token = localStorage.getItem('access_token');
    if (access_token) {
        loginSection.style.display = 'none';
        userSection.style.display = 'block';
    } else {
        loginSection.style.display = 'block';
        userSection.style.display = 'none';
    }

    document.getElementById('login-button').addEventListener('click', () => {
        const clientId = 'Ov23li0fsg8Uodd5Qy1d';
        const redirectUri = encodeURIComponent(window.location.href);
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;
    });
});