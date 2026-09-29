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
  /** HTML z panelu (Quill). Legacy: tablica akapitów. */
  detailedDescription: string | string[];
  engine: string;
  power: string;
  mileage: string;
  gearbox: string;
  fuel?: string;
  drive?: string;
  /** Forma sprzedaży, np. Faktura VAT / Umowa kupna-sprzedaży. */
  saleForm?: string;
  originCountry?: string;
  vin?: string;
  offerFrom?: string;
  registeredInPoland?: boolean;
  registrationNumber?: string;
  firstRegistrationDate?: string;
  firstOwner?: boolean;
  history?: string;
  servicing?: string;
  price: string;
  otomotoUrl?: string;
  /** URL do opcjonalnego PDF (historia serwisowa / CarVertical). */
  documentPdf?: string;
  documentType?: "service-history" | "car-vertical" | "";
  tag: "Od ręki" | "Sprawdzone";
  gallery: string[];
  published?: boolean;
};

export function documentDownloadLabel(
  type: CarOffer["documentType"] | undefined,
): string {
  if (type === "car-vertical") {
    return "Pobierz raport CarVertical";
  }
  if (type === "service-history") {
    return "Pobierz historię serwisową";
  }
  return "Pobierz dokument PDF";
}

function escapeHtml(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

/** Normalizuje opis do HTML — obsługuje też stare tablice akapitów. */
export function detailedDescriptionHtml(
  value: string | string[] | undefined,
): string {
  if (Array.isArray(value)) {
    return value
      .map((paragraph) => paragraph.trim())
      .filter(Boolean)
      .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
      .join("");
  }
  return typeof value === "string" ? value : "";
}

function normalizeCar(car: CarOffer): CarOffer {
  return {
    ...car,
    detailedDescription: detailedDescriptionHtml(car.detailedDescription),
  };
}

export async function fetchCars(): Promise<CarOffer[]> {
  const response = await fetch("/api/cars.php");
  if (!response.ok) {
    throw new Error("Nie udało się pobrać oferty");
  }
  const data: unknown = await response.json();
  return Array.isArray(data)
    ? (data as CarOffer[]).map(normalizeCar)
    : [];
}

export async function fetchCar(slug: string): Promise<CarOffer | null> {
  const response = await fetch(
    `/api/cars.php?slug=${encodeURIComponent(slug)}`,
  );
  if (response.status === 404) {
    return null;
  }
  if (!response.ok) {
    throw new Error("Nie udało się pobrać auta");
  }
  return normalizeCar((await response.json()) as CarOffer);
}

export const VW_TIGUAN: CarOffer = {
  slug: "vw-tiguan",
  brand: "Volkswagen",
  model: "Tiguan 2.0 TDI 4Motion R-Line",
  year: 2017,
  description:
    "Komfortowy SUV z napedem 4Motion, dynamicznym silnikiem i automatyczna skrzynia DSG. Dobrze sprawdzi sie jako rodzinne auto na co dzien i na dluzsze trasy.",
  detailedDescription:
    "<p>Volkswagen Tiguan w wersji R-Line to propozycja dla kierowcy, ktory szuka praktycznego SUV-a, ale nie chce rezygnowac z dynamiki i dobrego prowadzenia. Nadwozie ma spokojna, elegancka linie, a pakiet stylistyczny R-Line nadaje autu nowoczesny i uporzadkowany wyglad.</p>" +
    "<p>Jednostka 2.0 TDI o mocy 240 KM i wysokim momencie 500 Nm dobrze wspolpracuje z automatyczna skrzynia DSG. W codziennej jezdzie oznacza to plynne ruszanie, wygodne wyprzedzanie i duzy zapas mocy na trasie. Naped 4Motion poprawia trakcje szczegolnie przy gorszej pogodzie i na slabszej nawierzchni.</p>" +
    "<p>Wnetrze Tiguana jest przestronne i funkcjonalne. Samochod sprawdzi sie zarowno jako auto rodzinne, jak i wygodny srodek transportu na dluzsze wyjazdy. To model, ktory laczy komfort, bezpieczenstwo i uniwersalnosc - bez zbednych kompromisow.</p>",
  engine: "1 968 cm3",
  power: "240 KM",
  mileage: "169 078 km",
  gearbox: "Automatyczna DSG",
  fuel: "Diesel",
  drive: "4Motion",
  saleForm: "Faktura VAT marża",
  price: "83 900 PLN",
  otomotoUrl:
    "https://www.otomoto.pl/osobowe/oferta/volkswagen-tiguan-ID6HUNRM.html",
  tag: "Od ręki",
  gallery: [vw001, vw002, vw003, vw004, vw005],
};

export const CARS_BY_SLUG: Record<string, CarOffer> = {
  [VW_TIGUAN.slug]: VW_TIGUAN,
};
