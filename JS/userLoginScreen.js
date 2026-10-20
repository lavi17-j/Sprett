function drawLoginScreen(){
    htlml = "";


    html = /*HTML*/`
<div>
    <h1>Sprett</h1>
    <p>Bli medlem!</p>

    <h2>Innlogging</h2>

    <p>Brukernavn/Epost</p>
    <input type="text" id="login-username"/>


    <p>Passord</p>
    <input type="text" id="login-password"/>

    <br />
    <br />

    <button id="login-button" onclick="handleLogin()">logg inn!</button>
    <button>Tilbake</button>
    <button>Glemt passord?</button> 

    <p>Adresse</p>
    <p>Åpningstider</p>
</div>
`
    
    return html
}

function handleLogin(){
    const usernameInput = document.getElementById("login-username").value
    const passwordInput = document.getElementById("login-password").value

    if ()
}