const translations: { [indexor: string]: string } = {
    cases: "Datorchassi",
    graphicscards: "Grafikkort",
    mechanical: "Hårddisk Mekanisk",
    ssd: "Hårddisk SSD",
    ram: "Internminne/RAM",
    cpus: "Processor/CPU",
    motherboards: "Moderkort",
    soundcards: "Ljudkort",
    psu: "Nätaggregat",
    cooling: "Kylning/Moddning",
    dvd: "DVD",
    color: "Färg",
    manufacturer: "Tillverkare",
    formfactor: "Formfaktor",
    sounddampening: "Ljuddämpning",
    dustfilter: "Dammfilter",
    fancontroller: "Fläktkotroller",
    led: "LED-belysning",
    soundexit: "Ljudutgång (3.5mm)",
    micinput: "Mikrofåningång (3.5mm)",
    "USB3.0": "USB 3.0/3.1 Gen 1",
    "USB3.1": "USB 3.1 Gen2 Type-C",
};

const translate = (indexor: string | null | undefined) => {
    if (!indexor) return "";
    const translation = translations[indexor];
    if (!translation) return indexor;
    return translations[indexor];
};

export default translate;
