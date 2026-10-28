# Verifica prima della presentazione

Il progetto è presentabile come proposta grafica da approvare, con illustrazioni segnaposto dichiarate. Non è una certificazione di conformità né la verifica completa del sito pubblicato.

## Ambito verificato

- Repository trasferito a `siti-web-torino/twinsun_beautylab`: la destinazione è stata confermata dal redirect GitHub e dal commit remoto; aggiornato il remote locale.
- Build di produzione con percorso `/`, quello utilizzato da Vercel. Il percorso speciale di GitHub Pages rimane opzionale.
- Controlli browser alle larghezze 320, 360, 375, 390, 414, 768, 1024 e 1440 px, più menu in orizzontale a 844 × 390.
- Ulteriore ispezione visiva con emulazione touch iPhone 13, Pixel 7 e telefono da 320 px, usando Chromium. Non è una prova su hardware Safari/iOS.
- Menu, collegamenti di sezione, FAQ, gallery con tastiera, finestre Privacy/Cookie, caricamento dei font locali, risorse e immagini senza errori HTTP, WhatsApp e destinazioni delle indicazioni stradali.
- Mappa creata solo su richiesta, rimossa con “Nascondi mappa” e focus ripristinato. La risposta di Google viene sostituita nel test: i test verificano l'interfaccia e l'indirizzo richiesto, non la cartografia remota.
- Controlli automatici Axe desktop/mobile senza violazioni rilevate; non sostituiscono un audit manuale completo.
- Animazioni e cambio durante la visita della preferenza di movimento ridotto.

## Correzioni effettuate

- Separazione corretta delle frasi nei contatti e nelle recensioni: nascondere i ritorni a capo su mobile faceva apparire parole unite.
- Menu in orizzontale contenuto nel viewport, con CTA raggiungibile; pulsante WhatsApp flottante nascosto mentre il menu è aperto.
- Titolo della hero adattato a 320/360 px, evitando le cinque righe dei display stretti.
- Telefono e link secondari del footer con area di tocco più comoda; tabella orari distanziata dal pulsante flottante.
- Rimossa la numerazione decorativa che sembrava uno slider; semplificate le FAQ; migliorata una frase sui servizi unghie e abbreviata la meta description.
- Informativa aggiornata al fornitore di hosting comunicato dall'utente (Vercel), mantenendo espliciti i dati ancora mancanti.

## Test eseguiti

```sh
npm test
npm run build
TEST_URL=http://127.0.0.1:4180/ npm run test:browser
```

Tre test sui contenuti e la suite browser completati con esito positivo. Per ripetere la suite avviare prima `npm run preview -- --port 4180 --strictPort`.

## Prima dell'invio e prima del sito definitivo

L'indirizzo, il telefono, gli orari e le sei categorie di servizi corrispondono alle informazioni fornite. Le tre recensioni sono conservate integralmente dalle schermate inviate: le costruzioni colloquiali appartengono alle citazioni e non sono state riscritte.

Per la mail di presentazione descrivere il sito come **anteprima/proposta**, precisando che le foto saranno sostituite con quelle autorizzate del centro. La hero, il blocco chi siamo e la gallery utilizzano ancora illustrazioni segnaposto dichiarate.

Prima della versione definitiva vanno completati i dati del titolare e l'informativa privacy, approvati testi e immagini e confermato l'uso delle recensioni. La build senza `SITE_URL` resta volutamente non indicizzabile; abilitare l'indicizzazione solo sulla versione approvata.

## Limite della verifica pubblica

L'accesso diretto a `https://twinsun-beautylab.vercel.app/` da questo ambiente restituisce un errore del proxy di rete (`CONNECT tunnel failed, response 403`). Non è un riscontro su un guasto del sito Vercel. Il dominio è stato aggiunto alla bozza della configurazione cloud, ma salvare la bozza non dimostra che la rete della macchina sia stata aggiornata.

Non è quindi stato verificato il contenuto effettivamente distribuito da Vercel né l'esito del suo nuovo deploy. Per completare questo controllo, applicare la modifica di rete nelle impostazioni dell'ambiente cloud, pubblicare l'ambiente e riprovare l'URL. La validazione locale non sostituisce questo passaggio.
