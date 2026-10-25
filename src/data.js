// I percorsi seguono la base Vite anche nelle pagine di progetto GitHub Pages.
export const asset = (path) => `${import.meta.env?.BASE_URL || "/"}${path.replace(/^\//, "")}`;

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
    { label: "Mercoledì", dayOfWeek: "Wednesday", opens: "11:00", closes: "20:00" },
    { label: "Giovedì", dayOfWeek: "Thursday", opens: "09:00", closes: "19:00" },
    { label: "Venerdì", dayOfWeek: "Friday", opens: "09:00", closes: "19:00" },
    { label: "Sabato", dayOfWeek: "Saturday", closed: true },
    { label: "Domenica", dayOfWeek: "Sunday", closed: true },
  ],
};
export const navigation = [
  ["Home", "home"],
  ["Chi siamo", "chi-siamo"],
  ["Trattamenti", "trattamenti"],
  ["Gallery", "gallery"],
  ["Recensioni", "recensioni"],
  ["Contatti", "contatti"],
];
export const treatments = [
  {
    id: "mani",
    title: "Manicure e cura delle mani",
    label: "01 / MANI",
    text: "Un momento da dedicare alle tue mani. Scrivici per conoscere i trattamenti disponibili e scegliere quello adatto alle tue esigenze.",
    image: asset("/images/mani.svg"),
  },
  {
    id: "piedi",
    title: "Pedicure e cura dei piedi",
    label: "02 / PIEDI",
    text: "La cura di sé passa anche dai piccoli gesti. Contattaci per informazioni sui servizi dedicati al benessere e alla bellezza dei piedi.",
    image: asset("/images/piedi.svg"),
  },
  {
    id: "unghie",
    title: "Bellezza delle unghie",
    label: "03 / UNGHIE",
    text: "Dettagli che parlano di te. Scopri con noi le possibilità per le tue unghie e richiedi informazioni su tecniche e disponibilità.",
    image: asset("/images/unghie.svg"),
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
