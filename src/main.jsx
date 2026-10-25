import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  ArrowDown,
  Menu,
  X,
  MessageCircle,
  MapPin,
  Phone,
  Instagram,
  Plus,
  Minus,
  Sun,
  Sparkles,
  Heart,
  Flower2,
  Hand,
  Eye,
  Waves,
  Wind,
} from "lucide-react";
import {
  studio,
  asset,
  navigation,
  treatments,
  gallery,
  businessSchema,
} from "./data";
import "@fontsource/cormorant-garamond/latin-400.css";
import "@fontsource/cormorant-garamond/latin-400-italic.css";
import "@fontsource/cormorant-garamond/latin-500.css";
import "@fontsource-variable/manrope";
import "./style.css";
const treatmentIcons = {
  hands: Hand,
  flower: Flower2,
  eye: Eye,
  waves: Waves,
  sparkles: Sparkles,
  wind: Wind,
};

function WhatsApp({ children = "Scrivici su WhatsApp", className = "" }) {
  return (
    <a
      className={`button ${className}`}
      href={studio.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <ArrowUpRight size={17} />
    </a>
  );
}
function Brand() {
  return (
    <a href="#home" className="brand" aria-label="Twin Sun Beautylab — Home">
      {studio.logo ? (
        <img
          className="brand-official-logo"
          src={studio.logo}
          width="62"
          height="62"
          alt=""
        />
      ) : (
        <span className="brand-symbol" aria-hidden="true">
          <Sun />
          <Sun />
        </span>
      )}
      <span>
        TWIN SUN<small>BEAUTYLAB</small>
      </span>
    </a>
  );
}
function Modal({ children, label, onClose, className = "" }) {
  const ref = useRef();
  useEffect(() => {
    const old = document.activeElement;
    const d = ref.current;
    d.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
      old?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={className}
      aria-label={label}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      <button
        className="close icon-button"
        onClick={onClose}
        aria-label="Chiudi"
      >
        <X />
      </button>
      {children}
    </dialog>
  );
}
function OpeningHours() {
  if (!studio.hours?.length)
    return <p>Orari: contattaci per gli aggiornamenti.</p>;
  return (
    <div className="opening-hours">
      <h3>Orari di apertura</h3>
      <dl>
        {studio.hours.map((row, i) => (
          <div key={`${row.dayOfWeek}-${i}`}>
            <dt>{row.label}</dt>
            <dd>
              {row.closed ? (
                "Chiuso"
              ) : (
                <>
                  <time>{row.opens}</time>–<time>{row.closes}</time>
                </>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
function App() {
  const [menu, setMenu] = useState(false),
    [photo, setPhoto] = useState(null),
    [policy, setPolicy] = useState(null),
    [faq, setFaq] = useState(null);
  const menuButton = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.08 },
    );
    document.querySelectorAll(".reveal").forEach((e) => obs.observe(e));
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (photo === null) return;
    const handle = (e) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setPhoto((i) => (i + 1) % gallery.length);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setPhoto((i) => (i + gallery.length - 1) % gallery.length);
      }
    };
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [photo]);
  useEffect(() => {
    if (!menu) return;
    const handle = (e) => {
      if (e.key === "Escape") {
        setMenu(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [menu]);
  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(businessSchema)}
      </script>
      <a className="skip" href="#main">
        Vai al contenuto
      </a>
      <div className="topline">
        IL TUO MOMENTO DI BELLEZZA, A TORINO{" "}
        <span>
          Via Edoardo Daneo 20/C <ArrowUpRight size={12} />
        </span>
      </div>
      <header>
        <Brand />
        <button
          ref={menuButton}
          className="mobile-toggle icon-button"
          aria-expanded={menu}
          aria-controls="navigation"
          aria-label={menu ? "Chiudi menu" : "Apri menu"}
          onClick={() => setMenu(!menu)}
        >
          {menu ? <X /> : <Menu />}
        </button>
        <nav
          id="navigation"
          className={menu ? "open" : ""}
          aria-label="Navigazione principale"
        >
          {navigation.map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>
              {label}
            </a>
          ))}
          <WhatsApp className="nav-cta" />
        </nav>
      </header>
      <main id="main">
        <section id="home" className="hero">
          <div className="hero-copy">
            <p className="eyebrow">
              <span /> TWIN SUN BEAUTYLAB · TORINO
            </p>
            <h1>
              La bellezza di
              <br />
              prenderti cura
              <br />
              di <em>te.</em>
              <span className="heading-sun" aria-hidden="true">
                <Sun strokeWidth={1} />
              </span>
            </h1>
            <p className="intro">
              Uno spazio per rallentare.
              <br />
              Un momento per ritrovarti.
              <br />
              La tua bellezza, al centro.
            </p>
            <div className="hero-actions">
              <WhatsApp>Contattaci su WhatsApp</WhatsApp>
              <a href="#trattamenti" className="text-link">
                Esplora i trattamenti <ArrowDown size={16} />
              </a>
            </div>
            <div className="hero-bottom">
              <span>PRENDITI IL TEMPO CHE MERITI</span>
              <span className="line" />
              <span>01 — 03</span>
            </div>
          </div>
          <div className="hero-art">
            <img
              src={asset("/images/studio.svg")}
              alt="Illustrazione segnaposto: composizione architettonica con archi e forme botaniche"
              width="900"
              height="1100"
            />
            <span className="art-caption">
              VISIONE CREATIVA · IMMAGINE SEGNAPOSTO
            </span>
            <div className="hero-note">
              <Flower2 size={29} />
              <span>
                Un piccolo rituale.
                <br />
                <em>Una nuova energia.</em>
              </span>
            </div>
          </div>
        </section>
        <div className="ribbon" aria-label="Cura, equilibrio, bellezza">
          <span>CURA DI TE</span>
          <span aria-hidden="true">
            <Sun strokeWidth={1} />
          </span>
          <span>PICCOLI RITUALI</span>
          <span aria-hidden="true">
            <Sun strokeWidth={1} />
          </span>
          <span>BELLEZZA AUTENTICA</span>
          <span aria-hidden="true">
            <Sun strokeWidth={1} />
          </span>
          <span>IL TUO TEMPO</span>
        </div>
        <section id="chi-siamo" className="about section reveal">
          <div className="about-visual">
            <img
              src={asset("/images/dettaglio.svg")}
              alt="Segnaposto illustrato per una futura fotografia degli interni"
              width="700"
              height="850"
              loading="lazy"
            />
            <span className="image-label">
              SEGNAPOSTO · GLI INTERNI DEL CENTRO
            </span>
            <span className="round-note">
              TWIN SUN
              <br />
              <Sun size={32} />
              <span>BEAUTYLAB</span>
            </span>
          </div>
          <div className="about-copy">
            <p className="eyebrow">01 / IL NOSTRO BEAUTY LAB</p>
            <h2>
              Il tuo momento
              <br />
              di bellezza,
              <br />
              <em>qui a Torino.</em>
            </h2>
            <p>
              Ci sono momenti che scegli di dedicare soltanto a te. Twin Sun
              Beautylab è il centro estetico in Via Edoardo Daneo 20/C a Torino
              dove iniziare il tuo prossimo rituale di bellezza.
            </p>
            <p>
              Dalla cura di mani e piedi ai trattamenti viso e corpo,
              dall’epilazione ai piccoli rituali per lo sguardo: raccontaci cosa
              desideri e trova il tuo momento di bellezza.
            </p>
            <a className="text-link" href="#contatti">
              Vieni a conoscerci <ArrowUpRight size={17} />
            </a>
            <div className="signature">Il tempo per te è tempo prezioso.</div>
          </div>
        </section>
        <section id="trattamenti" className="treatments section">
          <div className="section-heading reveal">
            <div>
              <p className="eyebrow">02 / I TRATTAMENTI</p>
              <h2>
                Piccoli gesti.
                <br />
                <em>Una bella differenza.</em>
              </h2>
            </div>
            <p>
              La bellezza è fatta di attenzioni.
              <br />
              Scopri da dove iniziare il tuo rituale.
            </p>
          </div>
          <div className="treatment-grid">
            {treatments.map((t) => {
              const TreatmentIcon = treatmentIcons[t.icon] || Flower2;
              return (
                <article className="treatment reveal" key={t.id}>
                  <div className="treatment-image service-art">
                    <TreatmentIcon
                      className="service-mark"
                      aria-hidden="true"
                      strokeWidth={1}
                    />
                    <span>TWIN SUN BEAUTYLAB</span>
                    <a
                      href={studio.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Informazioni su ${t.title}`}
                      className="circle-link"
                    >
                      <ArrowUpRight />
                    </a>
                  </div>
                  <p className="eyebrow">{t.label}</p>
                  <h3>{t.title}</h3>
                  <p>{t.text}</p>
                  <a
                    href={studio.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link"
                  >
                    Richiedi informazioni <ArrowUpRight size={16} />
                  </a>
                </article>
              );
            })}
          </div>
          <p className="section-footnote">
            Per conoscere l’elenco aggiornato dei servizi e i dettagli dei
            trattamenti, scrivici su WhatsApp.
          </p>
        </section>
        <section className="values">
          <div className="section-heading reveal">
            <div>
              <p className="eyebrow">IL PIACERE DI SENTIRSI BENE</p>
              <h2>
                La cura si vede.
                <br />
                <em>E si sente.</em>
              </h2>
            </div>
            <p>
              Professionalità, precisione, accoglienza e ascolto.
              <br />
              La bellezza comincia da queste attenzioni.
            </p>
          </div>
          <div className="value-grid">
            {[
              [
                Sparkles,
                "Professionalità",
                "Attenzione e competenza nel prendersi cura di te.",
              ],
              [
                Flower2,
                "Cura dei dettagli",
                "Il valore delle piccole cose, in ogni gesto.",
              ],
              [
                Sun,
                "Accoglienza",
                "Il piacere di dedicarti un momento di pausa.",
              ],
              [
                Heart,
                "Attenzione alla persona",
                "Una conversazione che parte dalle tue esigenze.",
              ],
            ].map(([Icon, title, text]) => (
              <article key={title} className="reveal">
                <Icon size={30} strokeWidth={1} />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
        <section id="gallery" className="section gallery">
          <div className="section-heading reveal">
            <div>
              <p className="eyebrow">03 / IL MONDO TWIN SUN</p>
              <h2>
                Dettagli da <em>vivere.</em>
              </h2>
            </div>
            <p>
              Uno spazio per le immagini del centro.
              <br />
              Le illustrazioni sono segnaposto da sostituire con foto
              autorizzate.
            </p>
          </div>
          <div className="gallery-grid">
            {gallery.map((g, i) => (
              <button
                className={`gallery-item gallery-${i} reveal`}
                key={g.title}
                onClick={() => setPhoto(i)}
                aria-label={`Ingrandisci: ${g.title}, immagine segnaposto`}
              >
                <img
                  src={g.image}
                  alt={g.note}
                  loading="lazy"
                  width="700"
                  height="850"
                />
                <span className="gallery-caption">
                  <span>
                    {g.title}
                    <small>ILLUSTRAZIONE SEGNAPOSTO</small>
                  </span>
                  <Plus />
                </span>
              </button>
            ))}
          </div>
        </section>
        <section id="recensioni" className="reviews reveal">
          <p className="eyebrow">LE VOSTRE ESPERIENZE</p>
          <span className="review-mark" aria-hidden="true">
            “
          </span>
          <h2>
            La bellezza di
            <br />
            <em>una parola sincera.</em>
          </h2>
          <p>
            Le esperienze si raccontano meglio con le parole di chi le ha
            vissute.
            <br />
            Leggi le recensioni del centro direttamente su Google.
          </p>
          <a
            href={studio.maps}
            className="button outline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Leggi le recensioni su Google <ArrowUpRight size={17} />
          </a>
        </section>
        <section id="instagram" className="instagram section reveal">
          <Instagram size={30} strokeWidth={1.2} />
          <p className="eyebrow">@TWINSUN_BEAUTYLAB</p>
          <h2>
            Una piccola dose
            <br />
            <em>di ispirazione.</em>
          </h2>
          <p>
            Novità, dettagli e momenti dal beauty lab.
            <br />
            Scopri le immagini originali sul nostro profilo ufficiale.
          </p>
          <a
            href={studio.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            Seguici su Instagram <ArrowUpRight size={17} />
          </a>
        </section>
        <section className="faq section reveal">
          <p className="eyebrow">PRIMA DI SCRIVERCI</p>
          <h2>
            Le cose <em>da sapere.</em>
          </h2>
          {[
            [
              "Come posso contattare il centro?",
              "Scrivici direttamente su WhatsApp al +39 345 083 3217. Non sono necessari account o registrazioni e non è presente un sistema di prenotazione sul sito.",
            ],
            [
              "Dove si trova Twin Sun Beautylab?",
              "Ci trovi in Via Edoardo Daneo 20/C, 10135 Torino TO. Nella sezione contatti puoi aprire le indicazioni stradali su Google Maps.",
            ],
            [
              "Quali sono gli orari e i trattamenti disponibili?",
              "Contattaci su WhatsApp per conoscere gli orari aggiornati, l’elenco dei trattamenti e le disponibilità. Trovi gli orari di apertura nella sezione contatti.",
            ],
          ].map(([q, a], i) => (
            <div className="faq-item" key={q}>
              <h3>
                <button
                  onClick={() => setFaq(faq === i ? null : i)}
                  aria-expanded={faq === i}
                  aria-controls={`answer-${i}`}
                >
                  {q}
                  {faq === i ? <Minus size={18} /> : <Plus size={18} />}
                </button>
              </h3>
              <div id={`answer-${i}`} hidden={faq !== i}>
                <p>{a}</p>
              </div>
            </div>
          ))}
        </section>
        <section id="contatti" className="contacts">
          <div className="contact-copy reveal">
            <p className="eyebrow">04 / CI TROVI QUI</p>
            <h2>
              Il prossimo momento
              <br />
              <em>è tutto tuo.</em>
            </h2>
            <p>
              Hai voglia di dedicarti un momento tutto tuo?
              <br />
              Scrivici per conoscere i trattamenti e richiedere informazioni.
            </p>
            <WhatsApp>Contattaci su WhatsApp</WhatsApp>
            <div className="contact-details">
              <div>
                <MapPin size={19} />
                <span>
                  {studio.address}
                  <br />
                  {studio.city}
                </span>
              </div>
              <div>
                <Phone size={19} />
                <a href={studio.phoneHref}>{studio.phone}</a>
              </div>
              <OpeningHours />
            </div>
          </div>
          <div className="location-card reveal">
            <div className="map-art" aria-hidden="true">
              <span className="street street-a" />
              <span className="street street-b" />
              <span className="street street-c" />
              <span className="park" />
              <span className="map-pin">
                <Sun size={24} />
              </span>
              <span className="map-city">TORINO</span>
              <span className="map-label">TWIN SUN BEAUTYLAB</span>
            </div>
            <div className="location-caption">
              <span>
                Ci vediamo in
                <br />
                <strong>Via Edoardo Daneo 20/C</strong>
                <small>
                  Illustrazione indicativa, non una mappa geografica
                </small>
              </span>
              <a
                href={studio.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="circle-link"
                aria-label="Apri indicazioni stradali su Google Maps"
              >
                <ArrowUpRight />
              </a>
            </div>
            <a
              href={studio.maps}
              className="text-link directions"
              target="_blank"
              rel="noopener noreferrer"
            >
              Indicazioni stradali <ArrowUpRight size={16} />
            </a>
          </div>
        </section>
      </main>
      <footer>
        <div className="footer-top">
          <div>
            <Brand />
            <p>Il tuo momento di bellezza, a Torino.</p>
          </div>
          <div className="footer-nav">
            {navigation.slice(1).map(([l, id]) => (
              <a key={id} href={`#${id}`}>
                {l}
              </a>
            ))}
          </div>
          <div className="footer-contact">
            <a href={studio.whatsapp} target="_blank" rel="noopener noreferrer">
              {studio.phone} <ArrowUpRight size={14} />
            </a>
            <span>{studio.address} · Torino</span>
            <a
              href={studio.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Twin Sun Beautylab</span>
          <span className="legal-buttons">
            <button onClick={() => setPolicy("privacy")}>Privacy</button>
            <button onClick={() => setPolicy("cookie")}>Cookie</button>
          </span>
          <span>UN PICCOLO SPAZIO PER TE.</span>
        </div>
      </footer>
      <a
        className="floating-wa"
        href={studio.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contatta Twin Sun Beautylab su WhatsApp"
      >
        <MessageCircle size={25} />
      </a>
      {photo !== null && (
        <Modal
          label={`Gallery: ${gallery[photo].title}`}
          onClose={() => setPhoto(null)}
          className="lightbox"
        >
          <img src={gallery[photo].image} alt={gallery[photo].note} />
          <p className="gallery-help">
            Usa le frecce per sfogliare · Esc per chiudere
          </p>
          <div className="lightbox-caption" aria-live="polite">
            <button
              className="icon-button"
              aria-label="Immagine precedente"
              onClick={() =>
                setPhoto((photo + gallery.length - 1) % gallery.length)
              }
            >
              ←
            </button>
            <p>
              {gallery[photo].title}
              <small>{gallery[photo].note}</small>
            </p>
            <button
              className="icon-button"
              aria-label="Immagine successiva"
              onClick={() => setPhoto((photo + 1) % gallery.length)}
            >
              →
            </button>
          </div>
        </Modal>
      )}
      {policy && (
        <Modal
          label={
            policy === "privacy"
              ? "Informazioni sulla privacy"
              : "Informazioni sui cookie"
          }
          onClose={() => setPolicy(null)}
          className="policy"
        >
          <p className="eyebrow">INFORMAZIONI SUL SITO</p>
          <h2>{policy === "privacy" ? "Privacy" : "Cookie"}</h2>
          {policy === "privacy" ? (
            <>
              <p>
                Questo sito non contiene moduli, account o sistemi di
                prenotazione. Non utilizza strumenti di analisi o marketing. Le
                illustrazioni sono caricate dal sito, senza incorporamenti
                social o mappe di terze parti.
              </p>
              <p>
                I link a WhatsApp, Instagram e Google Maps conducono a servizi
                esterni, con proprie informative privacy. Per contattare il
                centro: {studio.phone}.
              </p>
              <p>
                L’hosting può trattare dati tecnici di connessione. Prima della
                pubblicazione occorre completare l’informativa con identità e
                recapiti del titolare, dati del fornitore di hosting, tempi di
                conservazione, basi giuridiche e modalità di esercizio dei
                diritti.
              </p>
              <p className="notice">
                Bozza informativa: i dati legali e di hosting non sono stati
                forniti. Da completare prima della pubblicazione.
              </p>
            </>
          ) : (
            <>
              <p>
                Questa versione del sito non imposta cookie né utilizza
                archiviazione locale, tracker o contenuti esterni incorporati.
                Non viene quindi mostrato un banner di consenso.
              </p>
              <p>
                Aprendo i collegamenti esterni, si applicano le politiche dei
                rispettivi servizi. Se verranno aggiunti analytics, mappe o feed
                incorporati, sarà necessario rivalutare consenso e informativa.
              </p>
            </>
          )}
        </Modal>
      )}
    </>
  );
}
createRoot(document.getElementById("root")).render(<App />);
