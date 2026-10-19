function drawLoginScreen(){
    
const app = document.getElementById("app");
app.innerHTML = /*HTML*/`
<div>
<h1>Sprett</h1>
<p>Bli medlem!</p>

<h2>Innlogging</h2>

<p>Brukernavn/Epost</p>
<input type="text"/>

<p>Passord</p>
<input type="text"/>

<br />
<br />

<button onclick>logg inn!</button>
<button onclick>Tilbake</button>
<button >Glemt passord?</button> 

<p>Adresse</p>
<p>Åpningstider</p>

</div>
`
}