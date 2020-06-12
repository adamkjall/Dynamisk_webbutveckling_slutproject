# ADAMFREDRIK - Webshop

Projekt för FED19G, kurs - Dynamisk webbutveckling

React med Grommet som designsystem, Express och mongoDb

Projektdeltagare : Anne-Lie Bäck, Adam Kjäll, Anton Öhman och Christian Ågren

länk till designsystem
https://v2.grommet.io

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Bakgrund till projektet:

Året är 1992, Waynes World och Charlie Moon går på biograferna. Janne Kemi är en finsk ultramiljonär som bestämt sig för att satsa på en ny e-handeln. Han vill investera i nya hemsidor. Han har anlitat er för att ta fram dessa sidor.

Han har vissa specifika krav från sin IT avdelning som han bifogat som en kravspecifikation. Förutom det har ni fria händer att ta fram en grym idé och tjäna sjuka pengar (åt Janne).

Ni skall bygga en webbshops-applikation inkluderande en klient och en server. Servern ska vara kopplad till en mongodb databas och vara strukturerad baserad på ett REST-API med resurser. Till er hjälp har ni en uppgiftsbeskrivning samt en kravspecifikation.


## Kravspec

- Alla sidor skall vara responsiva. (G) :heavy_check_mark:

  Uppfyllt ner till iphone 5


- Arbetet ska implementeras med en React frontend och en Express backend. (G) :heavy_check_mark:

   Vi har valt att stänga av typescript strict-mode, eftersom TypeScript inte var ett krav för uppgiften men vi inte ville lägga energi på att bygga en helt ny front end från grunden.
 

- Skapa ett ER diagram och koddiagram, detta ska lämnas in vid idégodkännandet (G) :heavy_check_mark:

- Beskriv er företagsidé i en kort textuell presentation, detta ska lämnas in vid idégodkännandet (G) :heavy_check_mark:

- All data som programmet utnyttjar ska vara sparat i en Mongo-databas (produkter, beställningar, konton mm) (G) :heavy_check_mark: 

  Uppfylld (Cloud Atlas)


- Man ska kunna logga in som administratör i systemet (G) :heavy_check_mark: 

  Uppfylld!
   e-mail: **admin@email.se** lösenord: **password**
 

- Man ska kunna registrera sig som administratör på sidan, nya användare ska sparas i databasen (VG) :x: :heavy_check_mark:  

  Man kan inte registrera sig som admin, men nya användare sparas i systemet


- En administratör behöver godkännas av en tidigare administratör innan man kan logga in fösta gången (VG) :x:

- Inga Lösenord får sparas i klartext i databasen (G) :heavy_check_mark:

   Uppfylld. Bcrypt och hash
 

- En besökare ska kunna beställa produkter från sidan, detta ska uppdatera lagersaldot i databasen (G) :heavy_check_mark: 

  När en order har godkänts och lagts uppdateras saldot. **En användare kan inte BESTÄLLA utöver lagersaldot**, ordern blir då inte godkänd.


- Administratörer ska kunna uppdatera antalet produkter i lager från admin delen av sidan (G) :heavy_check_mark: 

  Kirrad! **Admin kan även uppdatera allt annat med produkten** (förutom sizes, vi har bara Small, Medium och Large)


- Administratörer ska kunna se en lista på alla gjorda beställningar (G) :heavy_check_mark: 

   Genomförd, **Admin kan även söka på specifikt order-id**
 

- Administratörer ska kunna markera beställningar som skickade (VG) :heavy_check_mark:

   Bemästrad, **Administratörer kan även avmarkera beställningar som inte skickade**
 

- Sidans produkter ska delas upp i kategorier, en produkt ska tillhöra minst en kategori, men kan tillhöra flera (G) :heavy_check_mark:

   Man kan även tillskriva produkter en ny kategori som inte redan finns, men de nya kategorierna dyker tyvärr inte upp i header-menyn. En produkt kan för tillfället enbart tillhöra en kategori.


- Från hemsidan ska man kunna se en lista över alla produkter, och man ska kunna lista bara dom produkter som tillhör en kategori (G) :heavy_check_mark:

   SUPERDONE!


- Besökare ska kunna lägga produkterna i en kundkorg, som är sparad i local-storage på klienten (G) :heavy_check_mark:
  
  Sköts i cart-context.

- En besökare som gör en beställning ska få möjligheten att registrera sig samt logga in och måste vara inloggad som kund innan beställningen skapas (G) :heavy_check_mark: 

  Uppfylld! Man kan öppna sin cart, men inte gå till kassan utan att gå via en inlogg/registrerings-modal (om man inte redan är inloggad, då slipper man modalen)


- När man är inloggad som kund ska man kunna se sina gjorda beställning och om det är skickade eller inte (VG) :heavy_check_mark: 

  Kunden ser det i sin orderhistorik. **De kan även söka bland sina tidigare ordrar**


- Besökare ska kunna välja ett av flera fraktalternativ (G) :heavy_check_mark:

- Tillgängliga fraktalternativ ska vara hämtade från databasen (G) :heavy_check_mark:

- Administratörer ska kunna redigera vilka kategorier en produkt tillhör (VG) :heavy_check_mark:

  Görs på samma ställe som admin kan redigera produkter.


- Administratörer ska kunna lägga till och ta bort produkter (VG) :heavy_check_mark:

  Görs under fliken "Edit Products". Där kan man lätt lägga till en produkt genom att klicka på plusset bredvid en av de färdiga kategorierna. Ta bort genom att trycka på minus för önskad produkt i produktöversikten.



- Backendapplikationen måste ha en fungerande global felhantering (VG) :heavy_check_mark: 

  definitivt! Vi har errormiddleware som körs om fel uppstår i alla olika routes/handlers/middlewares och har skräddarsytt diverse fel som kan uppstå för att kunna hantera dem korrekt på frontend.


- Checkoutflödet i frontendapplikationen ska ha validering på samtliga fält (G) :heavy_check_mark: 

  definitivt. Knappen är disabled fram till att alla fält är korrekt ifyllda, och text kommer fram för de som är felaktiga.



### ANNAT STRÖSSEL (förutom fetmarkerade grejer i krav-specen)

- Man kan söka på produkter i ett sökfält
- login/register-modalen man når om man loggar in via carten har en shakeeffekt när det är felaktigt ifyllt vid submit
- man kan inte ta sig till checkout om carten är tom
- protected routes
- error boundarys och spinners
- Man kan se en produkts current stock i produkt-detaljvyn, om en produkts storlek är slut är storleken inte valbar.


No :bug: only features

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
