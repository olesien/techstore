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
    diskspace: "Diskutrymme",
    chipset: "Chipset",
    overclockingsupport: "Överklockingsstöd",
    socket: "Proccessorsocket",
    memory_type: "Internminnestyp",
    model: "Modell",
    speed: "Hastighet",
    speed_overclock: "Överklockingshastighet",
    cores: "Kärnor",
    threads: "Trådar",
    l2cache: "L2 Cache",
    l3cache: "L3 Cache",
    l4cache: "l4 Cache",
    diesize: "Chipsstorlek",
    TDP: "TDP",
    integrated_graphics: "Integrerad Grafik",
    included_cooler: "Inkluderad Kylare",
    guarantee: "Garanti",
    controller: "Kontroller",
    size: "Storlek",
    read_speed: "Läshastighet",
    write_speed: "Skrivhastighet",
    lifespan: "Förväntad livslängd",
    connection: "Anslutning",
    cooling_type: "Kylningstyp",
    material: "Material",
    coolingcapacity: "Kylningskapacitet",
    fan_size: "Fläkt (storlek)",
    rotationspeed: "Rotationshastighet",
    sound: "Ljudnivå",
    width: "Bredd",
    depth: "Djup/Längd",
    weight: "Vikt",
    interface: "Gränsnitt",
    sound_processor: "Ljudprocessor",
    channels: "Kanaler",
    passive: "Passivt",
    modular: "Modulärt",
    molex: "Molex",
    sata: "Sata",
    "80plus": "80+ Certifiering",
    length: "Längd",
    memory_speed: "Minneshastighet",
    memory_speed_oc: "Minneshastighet (överklockad)",
    memory_slots: "Antal platser",
    soundcard: "Ljudkort",
    effect: "Effekt",
};

const translate = (indexor: string | null | undefined) => {
    if (!indexor) return "";
    const translation = translations[indexor];
    if (!translation) return indexor;
    return translations[indexor];
};

export default translate;
