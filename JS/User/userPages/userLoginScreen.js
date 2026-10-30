function drawLoginScreen(){
    htlml = "";
    html = /*HTML*/`
<div>
    <h1>Sprett</h1>
    <p>Bli medlem!</p>

    <h2>Innlogging</h2>

    <p>Brukernavn/Epost</p>
    <input type="text" 
    value="${model.viewState.loginPage.loginForm.username}"
    oninput="model.viewState.loginPage.loginForm.username = this.value">
    
    <p>Passord</p>
    <input type="text"
    value="${model.viewState.loginPage.loginForm.password}"
    oninput="model.viewState.loginPage.loginForm.password = this.value">
    
    <br />
    <br />

    <button id="login-button" onclick="handleLogin()">logg inn!</button>
    <button>Tilbake</button>
    <button>Glemt passord?</button> 

    <p>Adresse</p>
    <p>Åpningstider</p>
</div>
`;
    return html
}
function handleLogin(){

const skrevetBrukernavn = model.viewState.loginPage.loginForm.username;
const skrevetPassord = model.viewState.loginPage.loginForm.password;

 // Riktig brukernavn, men feil passord
if(skrevetBrukernavn === model.users[0].username && skrevetPassord !== model.users[0].password){
model.viewState.loginPage.loginForm.errorMessage = "Feil passord";
alert(model.viewState.loginPage.loginForm.errorMessage);
}

 // Feil brukernavn, men riktig passord
else if (skrevetBrukernavn !== model.users[0].username && skrevetPassord === model.users[0].password){
    model.viewState.loginPage.loginForm.errorMessage = "Feil brukernavn";
    alert(model.viewState.loginPage.loginForm.errorMessage);
}

 // Brukernavn og passord er ritkig
 else if (skrevetBrukernavn === model.users[0].username && skrevetPassord === model.users[0].password){
    // sendes til loggedInPageView --> venter på Bendik
    
 }

 // begge er feil

}

