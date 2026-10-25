# Twin Sun Beautylab

Sito React + Tailwind CSS + Vite, senza backend, account, moduli, prenotazioni o strumenti di tracciamento. Richiede Node.js 20.19+ o 22.12+ (validato con Node 24).

## Sviluppo

```sh
cd /workspace/twinsun_beautylab
npm ci
npm run dev -- --port 5173
```

```sh
npm test
npm run build
npm run preview -- --port 4173
```

Aprire il sito attraverso il proprio ambiente di sviluppo. Per verifiche interne: `curl -f http://127.0.0.1:5173/`.

## Contenuti e design

Dati, trattamenti e gallery sono centralizzati in `src/data.js`. Il numero WhatsApp è unico e senza messaggi precompilati. Le sei categorie sono state confermate dall’utente dai contenuti Instagram ufficiali: Pedicure & Manicure (inclusi ricostruzione, refill gel e semipermanente), Ceretta & Pasta di zucchero, Laminazione ciglia, Massaggio Viso & Corpo, Trattamenti Viso & Corpo con Beauty Spa e Pressomassaggio. Le descrizioni sono rielaborate in italiano; non sono aggiunti prezzi, ruoli dello staff o recensioni. Le card dei servizi usano icone decorative, senza presentare immagini generiche come fotografie dei trattamenti reali.

Maps e Instagram hanno restituito HTTP 403 nell'ambiente: non è stato possibile verificare identità visiva, immagini, recensioni. Gli orari sono stati successivamente confermati dall’utente e inseriti nel sito. Il logo ufficiale (sole nero e fondo crema caldo) è stato recuperato dal link fornito dall’utente e salvato in `public/images/logo.jpg`. Header, footer e favicon usano l’originale locale, senza dipendere dal CDN Instagram. La palette è stata adattata ai suoi colori e alla versione completa del marchio mostrata successivamente: crema `#EDE3D9` (campionato dal logo locale), nero caldo `#171513` e accenti tortora. Il crema viene usato anche in header e footer per integrare il fondo del simbolo. La nuova versione con scritta è disponibile solo come riferimento in chat, non come file locale: resta quindi in uso il simbolo originale scaricato, senza ricostruire il lettering. I colori principali sono definiti nel blocco `@theme` di `src/style.css`. L’immagine disponibile è 150×150 px: è usata a dimensioni contenute, senza ricostruzioni o ingrandimenti artificiali. Le illustrazioni SVG sono segnaposto, non materiali autentici del brand. Le immagini sono locali e dichiarate segnaposto nel sito. Sostituirle con fotografie autorizzate, aggiornando i testi alternativi e rimuovendo le etichette segnaposto. Il profilo Instagram e le recensioni Google sono collegamenti esterni reali, non feed simulati. Le illustrazioni sono originali, senza richieste esterne.

Gli orari forniti dall’utente sono pubblicati: lunedì, martedì, giovedì e venerdì 09:00–19:00; mercoledì 11:00–20:00; sabato e domenica chiuso. Per pubblicare orari verificati, valorizzare `studio.hours` con un elenco di intervalli `{label, dayOfWeek, opens, closes}`: il sito aggiorna automaticamente contatti e dati strutturati. Usare giorni Schema.org in inglese (come `Monday`) e orari `HH:mm`. Inserire solo intervalli confermati; per pause giornaliere usare più intervalli sullo stesso giorno. Per i giorni di chiusura usare `closed: true`, senza `opens` e `closes`; i dati strutturati indicano 00:00–00:00 secondo la convenzione Google per i giorni chiusi. L'informativa Privacy è una bozza dichiarata: servono identità del titolare, dati fiscali quando applicabili, hosting, conservazione e recapiti privacy. Non sono caricati font remoti, analytics, mappe o social incorporati; questa versione non imposta cookie o localStorage.

## Prima della pubblicazione

1. Confermare informazioni dell'attività e categorie di servizi.
2. Logo ufficiale già inserito in header, footer e favicon. Un originale a risoluzione superiore può sostituire `public/images/logo.jpg`; nessun ritaglio o filtro viene applicato al logo.
3. Inserire fotografie autorizzate al posto dei segnaposto.
4. Completare dati fiscali e informativa con il titolare; gli orari sono già confermati.
5. Eseguire la build con il dominio effettivo: `SITE_URL=https://dominio-reale.it npm run build` (sostituire il dominio nell'esempio).
6. Pubblicare `dist/` su hosting statico HTTPS. Non è necessario un backend.

Senza `SITE_URL`, la build è intenzionalmente non indicizzabile, senza sitemap o dominio fittizio. Con un'origine HTTPS valida vengono generati sitemap.xml, robots.txt, canonical e og:url. Lo schema BeautySalon usa solo nome, telefono, indirizzo e canali forniti dal brief; non contiene rating o orari inventati.

## Accessibilità e verifica

Menu mobile con aria-expanded ed Escape, link di salto, focus visibile, dialog nativo con focus contenuto e ripristinato, gallery navigabile con pulsanti e frecce della tastiera, accordion, rispetto di prefers-reduced-motion. Verificare anche contenuti e contrasti dopo sostituzioni. Non si dichiarano punteggi Lighthouse o conformità WCAG certificata senza un audit.

Ogni attività cloud usa il checkout esistente: non creare worktree senza richiesta esplicita. Le dipendenze sono conservabili, i processi devono essere riavviati.

## Verifiche eseguite

- `npm test`: tre controlli su contatti, categorie e risorse.
- `npm run build`: build produzione riuscita; generazione SEO verificata anche con un dominio di test e poi ripristinata in modalità anteprima.
- `npm run test:browser` con il server attivo: gallery, Escape e dialog, FAQ, privacy, menu mobile, collegamenti WhatsApp, nessun overflow a 360/390/768/1024/1440 px e nessun errore JavaScript.
- Axe su desktop e smartphone: nessuna violazione automatica rilevata per WCAG A/AA nelle pagine esaminate. Non sostituisce una verifica manuale completa.

Il test browser usa Chromium già disponibile in questo ambiente in `/usr/bin/chromium`. Su altri sistemi impostare `CHROMIUM_PATH` al proprio eseguibile. Si può impostare `TEST_URL` per verificare anche la build servita in preview. Le schermate di test sono salvate in `/tmp/twinsun-desktop.png` e `/tmp/twinsun-mobile.png`, fuori dal checkout.


## Anteprima con GitHub Pages

Il workflow `.github/workflows/pages.yml` pubblica il contenuto di `dist/` dopo ogni push su `main`, oppure con **Actions → Pubblica sito su GitHub Pages → Run workflow**. Non servono token personali: usa i permessi del workflow GitHub.

Per la prima attivazione, nel repository aprire **Settings → Pages → Build and deployment → Source → GitHub Actions**. Quindi avviare il workflow. Il link effettivo appare nel risultato del job `deploy` e in Settings → Pages: non è disponibile finché il deploy non riesce. Il repository deve supportare Pages secondo visibilità e piano GitHub.

La build segue automaticamente il percorso di progetto fornito da GitHub Pages, incluse immagini, logo e favicon. Per riprodurla localmente: `BASE_PATH=/twinsun_beautylab/ npm run build`, poi avviare `BASE_PATH=/twinsun_beautylab/ npm run preview` e aprire il percorso `/twinsun_beautylab/`. La build senza `SITE_URL` resta volutamente non indicizzabile: questa pubblicazione serve per visionare la bozza, che contiene ancora segnaposto fotografici e informativa da completare.


## Tipografia

Cormorant Garamond (400, 400 corsivo e 500) per titoli, citazioni e marchio tipografico; Manrope variabile per testi, navigazione e controlli. I font sono distribuiti localmente tramite pacchetti Fontsource, con `font-display: swap`: nessuna richiesta a Google Fonts o altri fornitori esterni. Famiglie centralizzate nelle variabili `--font-display` e `--font-body` del tema. Licenze OFL incluse in `public/licenses/`.
