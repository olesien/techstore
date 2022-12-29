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
};

const translate = (indexor: string | null | undefined) => {
    if (!indexor) return "";
    return translations[indexor];
};

export default translate;
