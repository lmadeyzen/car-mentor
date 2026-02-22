import vw001 from "./assets/vw-tiguan/001.jpg";
import vw002 from "./assets/vw-tiguan/002.jpg";
import vw003 from "./assets/vw-tiguan/003.jpg";
import vw004 from "./assets/vw-tiguan/004.jpg";
import vw005 from "./assets/vw-tiguan/005.jpg";

export type CarOffer = {
  slug: string;
  brand: string;
  model: string;
  year: number;
  description: string;
  detailedDescription: string[];
  equipmentSections: Array<{
    title: string;
    items: string[];
  }>;
  engine: string;
  power: string;
  torque: string;
  gearbox: string;
  price: string;
  tag: "Od ręki";
  gallery: string[];
};

export const VW_TIGUAN: CarOffer = {
  slug: "vw-tiguan",
  brand: "Volkswagen",
  model: "Tiguan 2.0 TDI 4Motion R-Line",
  year: 2017,
  description:
    "Komfortowy SUV z napedem 4Motion, dynamicznym silnikiem i automatyczna skrzynia DSG. Dobrze sprawdzi sie jako rodzinne auto na co dzien i na dluzsze trasy.",
  detailedDescription: [
    "Volkswagen Tiguan w wersji R-Line to propozycja dla kierowcy, ktory szuka praktycznego SUV-a, ale nie chce rezygnowac z dynamiki i dobrego prowadzenia. Nadwozie ma spokojna, elegancka linie, a pakiet stylistyczny R-Line nadaje autu nowoczesny i uporzadkowany wyglad.",
    "Jednostka 2.0 TDI o mocy 240 KM i wysokim momencie 500 Nm dobrze wspolpracuje z automatyczna skrzynia DSG. W codziennej jezdzie oznacza to plynne ruszanie, wygodne wyprzedzanie i duzy zapas mocy na trasie. Naped 4Motion poprawia trakcje szczegolnie przy gorszej pogodzie i na slabszej nawierzchni.",
    "Wnetrze Tiguana jest przestronne i funkcjonalne. Samochod sprawdzi sie zarowno jako auto rodzinne, jak i wygodny srodek transportu na dluzsze wyjazdy. To model, ktory laczy komfort, bezpieczenstwo i uniwersalnosc - bez zbednych kompromisow.",
  ],
  equipmentSections: [
    {
      title: "Pakiety i systemy",
      items: [
        "Pakiet Cargo",
        "System Easy Open / Easy Close (otwieranie klapy \"wirtualny pedał\")",
        "Pakiet Driver Assistance \"Plus\"",
        "Pakiet Business Premium z systemem nawigacji",
        "Pakiet Winter (podgrzewane przednie i tylne fotele)",
        "Pakiet stylistyczny R-Line (Exterior i Interior)",
        "Pakiet chrom",
        "Pakiet oświetlenia bagażnika",
        "Oświetlenie ambient",
        "System Rear Assist z Park Assist",
        "System rozpoznawania znaków drogowych",
        "System utrzymania pasa ruchu, asystent zmiany pasa, asystent jazdy w korku, Emergency Assist",
        "Front Assist z funkcją City ANB",
        "Dynamiczny układ kierowniczy",
        "Układ wspomagania zjazdu",
        "Układ stabilizacji toru jazdy ESP",
        "Napęd na cztery koła",
        "Wybór profilu jazdy z regulacją tłumienia",
      ],
    },
    {
      title: "Koła i zawieszenie",
      items: [
        "Obręcze aluminiowe 20” (Suzuka / 8,5J x 20)",
        "Śruby kół z zabezpieczeniem przeciwkradzieżowym",
        "Opony bez określonej marki",
        "Dodatkowy komplet opon zimowych",
        "Stabilizator przód i tył",
      ],
    },
    {
      title: "Oświetlenie",
      items: [
        "Reflektory LED z dynamiczną regulacją i światłami skrętnymi",
        "Światła dzienne z funkcją Coming Home",
        "Tylne lampy LED",
        "Reflektory przeciwmgłowe z funkcją doświetlania zakrętów",
        "Automatyczna regulacja świateł",
        "Czujnik zmierzchu i deszczu",
        "Oświetlenie wnętrza (przestrzeń na nogi, lampki do czytania)",
        "Oświetlenie bagażnika",
      ],
    },
    {
      title: "Komfort i wnętrze",
      items: [
        "Komfortowo-sportowe fotele",
        "Ogrzewane przednie i tylne siedzenia (oddzielna regulacja)",
        "Kierownica sportowa, wielofunkcyjna, skórzana (z Tiptronic)",
        "Gałka zmiany biegów skórzana",
        "Elektrycznie składane i podgrzewane lusterka zewnętrzne",
        "Lusterko wewnętrzne automatycznie ściemniane",
        "Centralny zamek Keyless Entry",
        "Elektryczny hamulec postojowy",
        "Relingi dachowe (srebrne)",
        "Przyciemniane tylne szyby",
        "Składana i dzielona tylna kanapa",
        "Szuflady pod przednimi siedzeniami",
        "Środkowy podłokietnik przód",
        "Stoliki w oparciach tylnych siedzeń",
        "Siatka w bagażniku",
        "Komfortowa półka w podsufitce",
        "Klimatyzacja (standardowa strefa klimatyczna)",
      ],
    },
    {
      title: "Multimedia i łączność",
      items: [
        "System nawigacji Discover Media",
        "Radio Composition Media",
        "Car-Net: Guide & Inform (3 lata dostępu do usług online)",
        "Instalacja telefoniczna Komfort z WLAN i LTE",
        "Ładowanie bezprzewodowe",
        "Mirror Link",
        "System audio z cyfrowym pakietem dźwiękowym (subwoofer + głośnik centralny)",
        "Gniazda USB i AUX",
        "Gniazdo 12V",
        "Gniazdo 230V",
      ],
    },
    {
      title: "Bezpieczeństwo",
      items: [
        "Poduszki powietrzne (kierowcy, pasażera, kolanowa, boczne, kurtyny)",
        "PreCrash Basic (system bezpieczeństwa proaktywnego)",
        "System alarmowy z SAFELOCK",
        "Kontrola ciśnienia w oponach",
        "Asystent parkowania",
        "Kamera wielofunkcyjna",
        "Zestaw naprawczy do opon",
        "Apteczka, trójkąt ostrzegawczy i kamizelka",
      ],
    },
  ],
  engine: "1 968 cm3",
  power: "240 KM",
  torque: "500 Nm",
  gearbox: "Automatyczna DSG",
  price: "Zapytaj o cenę",
  tag: "Od ręki",
  gallery: [vw001, vw002, vw003, vw004, vw005],
};

export const CARS_BY_SLUG: Record<string, CarOffer> = {
  [VW_TIGUAN.slug]: VW_TIGUAN,
};
