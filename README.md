ADAMFREDRIK - Webshop

Projekt för FED19G, kurs - Dynamisk webbutveckling

React och typescript med Grommet som designsystem

Projektdeltagare : Anne-Lie Bäck, Adam Kjäll, Anton Öhman och Christian Ågren

länk till designsystem
https://v2.grommet.io

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

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

 Uppfylld

- En besökare ska kunna beställa produkter från sidan, detta ska uppdatera lagersaldot i databasen (G) :heavy_check_mark: 

När en order har godkänts och lagts uppdateras saldot. **En användare kan inte BESTÄLLA utöver lagersaldot**, ordern blir då inte godkänd.

- Administratörer ska kunna uppdatera antalet produkter i lager från admin delen av sidan (G) :heavy_check_mark: 

Kirrad! **Admin kan även uppdatera allt annat med produkten** (förutom sizes, vi har bara S, M och L)

- Administratörer ska kunna se en lista på alla gjorda beställningar (G) :heavy_check_mark: 
 Genomförd, **Admin kan även söka på specifikt order-id**

- Administratörer ska kunna markera beställningar som skickade (VG) :heavy_check_mark:
 Bemästrad, **Administratörer kan även avmarkera beställningar som inte skickade**

- Sidans produkter ska delas upp i kategorier, en produkt ska tillhöra minst en kategori, men kan tillhöra flera (G) :heavy_check_mark:

 Man kan även tillskriva produkter en ny kategori som inte redan finns, men de nya kategorierna dyker tyvärr inte upp i header-menyn.

- Från hemsidan ska man kunna se en lista över alla produkter, och man ska kunna lista bara dom produkter som tillhör en kategori (G) :heavy_check_mark:

 SUPERDONE!

- Besökare ska kunna lägga produkterna i en kundkorg, som är sparad i local-storage på klienten (G) :heavy_check_mark:

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

definitivt!

- Checkoutflödet i frontendapplikationen ska ha validering på samtliga fält (G) :heavy_check_mark: 

definitivt


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

Mål:

Ni skall bygga en webbshops-applikation inkluderande en klient och en server. Servern ska vara kopplad till en mongodb databas och vara strukturerad baserad på ett REST-API med resurser. Till er hjälp har ni en uppgiftsbeskrivning samt en kravspecifikation.

Regler

Projektet genomförs i grupper om 4 eller 5 personer

Ert projekt ska skötas från ett gemensamt Github repo. Ni skall använda er av issues och pull request för att strukturera upp erat arbete. I början av projektet skall ni presentera två diagram. Ett ER-diagram över er datastruktur och ett diagram över er kodstruktur. Diagrammen skall uppdateras under projektets gång och lämnas in tillsammans med er kodbas - diagrammen och koden skall stämma överens.
Ett gruppkontrakt skall skrivas på och lämnas in.

Projektledare

Er grupp skall utse en projektledare vars roll utöver alla andras är att samla ihop gruppen och försöka ha en mer övergripande roll över projektet. Det här ansvarar projektledaren för:

- att alla i gruppen har läst och förstått det här dokumentet.
- att projektet flyter på enligt planering och samla gruppen till ev. möten.
- att fokus är på rätt saker och att alla har något att göra.
- ta kontakt med gruppmedlemmar om dom är frånvarande utan att ha meddelat gruppen.

Betyg

Projektarbetets betyg beror på er givna idépresentation tillsammans med ert resultat. Alla VG krav behöver inte uppfyllas för betyget VG.

Redovisningar

Idégodkännande

I slutet av veckan ska er grupp presentera en färdig idé på er webbshop tillsammans med en grov sketch på er databasmodell i form av ett enklare ER-Diagram, samt en grov sketch över eran kod i form av ett enklare koddiagram.

Ni skall även presentera gruppens namn, vem som kommer vara projektledare samt lämna in påskriva gruppkontrakt.

Inlämning av projektet

Projektet (kodbas & diagram) skall lämnas in på Zenit.

Förutom att uppfylla kravspecen, skall erat projekt innehålla en README.md fil där det tydligt skall framgå:
Hur projektet installeras och körs
Vid behov: uppgifter att testa med, så som inloggningsuppgifter.

OBS: Readme filen ska framförallt innehålla en lista över alla kraven i kravspecen nedanför samt en kort kommentar från er - har ni uppfyllt kravet? I så fall, hur?

Presentation

Fredag den 12:e Juni ska ni presentera ert projektarbete med en presentation och genomgång av ert slutresultat. Ni ska i presentationen svara på följande frågor:

- Hur ser ert första ER diagram ut.
- Ert färdiga och normaliserade databasdiagram.
- Vad skiljer sig från när ni gjorde slutarbetet i Javascript 1 kursen - Hur har ni delat upp projektet i moduler, klasser etc?
- Vad känner ni att ni framförallt har lärt er under den här kursen?

Efter er presentation ska ni vara beredda att svara på ytterligare frågor från lärare och från andra elever.

Tips när ni sätter igång

• Prata med varandra - gör en enkel planering - bestäm upplägg, dagar, tider mm. • Läs hela det här dokumentet, det gäller alla i gruppen!
• Viktigt att ni bestämmer er för en mappstruktur, se tips nedan.
• Börja inte koda för tidigt.

• Lägg upp det ni väljer att genomföra från kravspecifikationen som issues på Github. • Gör er egen grupp i Teams för kommunikation.
• Jobba agilt, stäm av med teamet varje dag och kolla PR’s ofta.

Hjälp oss lärare hjälpa er!

Fundera ut bra frågor och ställ dem till oss under handledningen så vi kan förklara för er. 

Bakgrund till projektet:

Året är 1992, Waynes World och Charlie Moon går på biograferna. Janne Kemi är en finsk ultramiljonär som bestämt sig för att satsa på en ny e-handeln. Han vill investera i nya hemsidor. Han har anlitat er för att ta fram dessa sidor.

Han har vissa specifika krav från sin IT avdelning som han bifogat som en kravspecifikation. Förutom det har ni fria händer att ta fram en grym idé och tjäna sjuka pengar (åt Janne).

Kravspecifikation på projektet:

Alla sidor skall vara responsiva. (G)

Arbetet ska implementeras med en React frontend och en Express backend. (G)

Skapa ett ER diagram och koddiagram, detta ska lämnas in vid idégodkännandet G)

Beskriv er företagsidé i en kort textuell presentation, detta ska lämnas in vid idégodkännandet (G)

All data som programmet utnyttjar ska vara sparat i en Mongo-databas (produkter, beställningar, konton mm) (G)

Man ska kunna logga in som administratör i systemet (G)

Man ska kunna registrera sig som administratör på sidan, nya användare ska sparas i databasen (VG)

En administratör behöver godkännas av en tidigare administratör innan man kan logga in fösta gången (VG)

Inga Lösenord får sparas i klartext i databasen (G)

En besökare ska kunna beställa produkter från sidan, detta ska uppdatera lagersaldot i databasen (G)

Administratörer ska kunna uppdatera antalet produkter i lager från admin delen av sidan (G)

Administratörer ska kunna se en lista på alla gjorda beställningar (G)

Administratörer ska kunna markera beställningar som skickade (VG)

Sidans produkter ska delas upp i kategorier, en produkt ska tillhöra minst en kategori, men kan tillhöra flera (G)

Från hemsidan ska man kunna se en lista över alla produkter, och man ska kunna lista bara dom produkter som tillhör en kategori (G)

Besökare ska kunna lägga produkterna i en kundkorg, som är sparad i local-storage på klienten (G)

En besökare som gör en beställning ska få möjligheten att registrera sig samt logga in och måste vara inloggad som kund innan beställningen skapas (G)

När man är inloggad som kund ska man kunna se sina gjorda beställning och om det är skickade eller inte (VG)

Besökare ska kunna välja ett av flera fraktalternativ (G)

Tillgängliga fraktalternativ ska vara hämtade från databasen (G)

Administratörer ska kunna redigera vilka kategorier en produkt tillhör (VG)

Administratörer ska kunna lägga till och ta bort produkter (VG)

Backendapplikationen måste ha en fungerande global felhantering (VG)

Checkoutflödet i frontendapplikationen ska ha validering på samtliga fält (G)
