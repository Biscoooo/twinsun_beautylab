// I percorsi seguono la base Vite anche nelle pagine di progetto GitHub Pages.
export const asset = (path) =>
  `${import.meta.env?.BASE_URL || "/"}${path.replace(/^\//, "")}`;

export const studio = {
  name: "Twin Sun Beautylab",
  logo: asset("/images/logo.jpg"), // Originale fornito dall’utente, salvato localmente.
  phone: "+39 345 083 3217",
  phoneHref: "tel:+393450833217",
  whatsapp: "https://wa.me/393450833217",
  instagram: "https://www.instagram.com/twinsun_beautylab/",
  maps: "https://maps.app.goo.gl/aEHhGfQcEfuqpeXY6",
  address: "Via Edoardo Daneo 20/C",
  city: "10135 Torino TO",
  // Orari confermati dal titolare del progetto.
  hours: [
    { label: "Lunedì", dayOfWeek: "Monday", opens: "09:00", closes: "19:00" },
    { label: "Martedì", dayOfWeek: "Tuesday", opens: "09:00", closes: "19:00" },
    {
      label: "Mercoledì",
      dayOfWeek: "Wednesday",
      opens: "11:00",
      closes: "20:00",
    },
    {
      label: "Giovedì",
      dayOfWeek: "Thursday",
      opens: "09:00",
      closes: "19:00",
    },
    { label: "Venerdì", dayOfWeek: "Friday", opens: "09:00", closes: "19:00" },
    { label: "Sabato", dayOfWeek: "Saturday", closed: true },
    { label: "Domenica", dayOfWeek: "Sunday", closed: true },
  ],
};
const mapAddress = `${studio.address}, ${studio.city}`;
export const mapLinks = {
  embed: `https://www.google.com/maps?hl=it&q=${encodeURIComponent(mapAddress)}&z=17&output=embed`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapAddress)}`,
};

export const navigation = [
  ["Home", "home"],
  ["Chi siamo", "chi-siamo"],
  ["Trattamenti", "trattamenti"],
  ["Gallery", "gallery"],
  ["Recensioni", "recensioni"],
  ["Contatti", "contatti"],
];
// Categorie confermate dall’utente dai materiali Instagram ufficiali.
export const treatments = [
  {
    id: "manicure-pedicure",
    title: "Pedicure & Manicure",
    label: "01 / MANI E PIEDI",
    icon: "hands",
    text: "Unghie, cuticole e pelle di mani e piedi ricevono attenzioni dedicate, per un aspetto ordinato e curato. Puoi scegliere anche ricostruzione delle unghie, refill in gel e semipermanente: scrivici per trovare la soluzione più adatta a te.",
  },
  {
    id: "epilazione",
    title: "Ceretta & Pasta di zucchero",
    label: "02 / EPILAZIONE",
    icon: "flower",
    text: "Dalla ceretta tradizionale alla pasta di zucchero lavorata a mano, diverse possibilità per la tua epilazione. Per le zone più piccole e delicate, o se hai la pelle sensibile, chiedici quale metodo scegliere in base alle tue esigenze.",
  },
  {
    id: "laminazione-ciglia",
    title: "Laminazione ciglia",
    label: "03 / SGUARDO",
    icon: "eye",
    text: "Un trattamento che si prende cura delle ciglia naturali e ne valorizza la curvatura. Lo sguardo acquista definizione e le ciglia appaiono più ordinate e piene, per un risultato che richiama l’effetto del mascara.",
  },
  {
    id: "massaggio",
    title: "Massaggio Viso & Corpo",
    label: "04 / RELAX",
    icon: "waves",
    text: "Una pausa dedicata al rilassamento e al piacere di sentirsi bene. Manualità e tipologie di massaggio vengono scelte in base alle esigenze della persona, per aiutare ad allentare le tensioni e ritrovare una piacevole sensazione di benessere.",
  },
  {
    id: "trattamenti-viso-corpo",
    title: "Trattamenti Viso & Corpo",
    label: "05 / CURA DELLA PELLE",
    icon: "sparkles",
    text: "La cura della pelle incontra il piacere di una pausa per te. I trattamenti viso e corpo con Beauty Spa uniscono attenzioni estetiche e benessere: contattaci per conoscere i percorsi disponibili e trovare quello più vicino ai tuoi desideri.",
  },
  {
    id: "pressomassaggio",
    title: "Pressomassaggio",
    label: "06 / LEGGEREZZA",
    icon: "wind",
    text: "Un trattamento a compressione ritmica pensato per favorire il drenaggio dei liquidi e aiutare ad attenuare la sensazione di gonfiore e pesantezza. Un momento dedicato alla leggerezza delle gambe: chiedici informazioni per capire se fa al caso tuo.",
  },
];
export const gallery = [
  {
    image: asset("/images/studio.svg"),
    title: "Gli spazi del centro",
    note: "Segnaposto illustrato · foto degli ambienti da inserire",
  },
  {
    image: asset("/images/mani.svg"),
    title: "La cura dei dettagli",
    note: "Segnaposto illustrato · foto dei trattamenti da inserire",
  },
  {
    image: asset("/images/unghie.svg"),
    title: "I vostri piccoli rituali",
    note: "Segnaposto illustrato · foto dei risultati da inserire",
  },
];
// Trascrizioni dalle immagini di recensioni condivise dall’utente dal profilo ufficiale.
// Nessuna data o verifica Google viene attribuita alle testimonianze.
export const reviews = [
  {
    author: "Mariagrazia P.",
    initials: "MP",
    rating: 5,
    text: "Locale molto pulito e organizzato, prodotti di prima qualità. Le ragazze meritano un 10 e lode.",
  },
  {
    author: "Sara V.",
    initials: "SV",
    rating: 5,
    text: "Un centro estetico dove sentirsi davvero coccolati. Francesca ed Elena sono due ragazze solari, molto preparate e professionali. L’ambiente è rilassante e moderno. Posto ideale dove trovare un momento di relax.",
  },
  {
    author: "Gaia M.",
    initials: "GM",
    rating: 5,
    text: "Eccellente! L’esperienza nel salone è curata nei minimi dettagli, io mi sono recata per una manicure e pedicure, dopo tante esperienze negative, dato che tanti improvvisano ma pochi sono competenti, sicuramente qui ho trovato competenza, professionalità e attenzione nel soddisfare il cliente non solo nel lavoro svolto, ma anche nella cura dei dettagli all’interno del negozio per rendere l’esperienza il più confortevole possibile, grazie alla gentilezza e la simpatia di Francesca e Elena!!",
  },
];

export const businessSchema = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: studio.name,
  telephone: studio.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: studio.address,
    addressLocality: "Torino",
    postalCode: "10135",
    addressRegion: "TO",
    addressCountry: "IT",
  },
  sameAs: [studio.instagram, studio.maps],
  ...(studio.hours?.length
    ? {
        openingHoursSpecification: studio.hours.map(
          ({ dayOfWeek, opens, closes, closed }) => ({
            "@type": "OpeningHoursSpecification",
            dayOfWeek: `https://schema.org/${dayOfWeek}`,
            opens: closed ? "00:00" : opens,
            closes: closed ? "00:00" : closes,
          }),
        ),
      }
    : {}),
};
