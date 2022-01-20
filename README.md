#### URL
https://shui-assignment.herokuapp.com/

# Inlämningsuppgift: SHUI

## Bakgrundsbeskrivning, frågeställning, avgränsning och mål

**Bakgrund:** Träna på webbsäkerhet genom att bygga en app, med ett
praktiskt användningsområde.

**Frågeställning:** Bygga en säker applikation där man kan prenumerera på
olika ”streams” och få innehåll på ett säkert sätt.

**Mål:** En app enligt skiss
https://www.figma.com/file/cUmgIVpLJzjaz2z0qHjQdO/shui?node-id=0%3A1

## Varför ska ni utföra detta arbete?
Syftet: 

* Att visa att man kan bygga en säker webbapplikation.
* Att man kan analysera, identifiera och planera för eventuella säkerhetsbrister.
* Att man förstår grundprinciperna kring GDPR.

## Vad ska ni leverera?

Följande ska levereras: 

1. Ett GitHub-repo.
2. En zip-fil som innehåller hela ditt repo, utom node_modules.

## Vad ska ni göra?
1. Du ska bygga en säker webb app enligt given figmaskiss.
2. En användare ska på ett säkert sätt kunna registrera sig, logga in och välja
att prenumerera på en eller flera kanaler s.k.a ”streams”.
3. En användare ska kunna publicera meddelanden till en stream.
4. Användarens lösenord ska vara krypterat med bcrypt och inloggning ska se
via JSON Web token.
5. Varje kanal ska fungera som en messageboard där varje text är krypterad i
databasen och decryptas i din front-end. Du kan ha förkrypterade
meddelanden i databasen. Använd npm-modulen crypto-js.
6. Det ska finnas en ”radera mig helt från databasen” - knapp (right to be
forgotten).
 
## Hur ska ni lösa uppgiften?
* Utgå från skissen.
* Bygg en webbapp med Vue och Node.js
* Använd materialet från kursen för att förstå vad som behöver göras.
* Utöver det hämta självständigt information från nätet.

**För Godkänt krävs:**
* Att all funktionalitet är implementerad enligt kraven ovan.
* Att webb-appen ser ut enligt skiss.
* Att du använder dig av bcryptjs, JSON Web Token och crypto-js.

**För Väl Godkänt krävs:**
* Att du har gjort ett UML diagram över webbapp:en (SHUI) där visar du tänkt kring säkerheten.
* Att det inte ska kunna gå att genomföra någon XSS-attack eller komma åt någon
endpoint från konsolen i developer tools.

**Inlämning:**
Inlämning sker via Learn Point senast 9/4.
* Zippa ditt GitHub-repo (utom node_modules) och ladda upp
* Du ska skriva en kommentar på LearnPoint med två länkar:
* länk till GitHub-repot.
* länk till din publicerade app.

### Docker

#### Docker compose build with no cache
* docker-compose build --no-cache

#### Docker start frontend & backend 
* docker-compose up

#### Docker compose build & start image/container
* docker-compose up --build 
