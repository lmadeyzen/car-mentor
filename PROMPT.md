# CarMentor — Layout Generation Prompt

## Twoje zadanie

Twoim zadaniem jest stworzenie **4 unikalnych layoutów** strony głównej CarMentor. Każdy layout to POC (proof of concept) do zaprezentowania klientowi. Layouty muszą się od siebie istotnie różnić — każdy to inna filozofia designu.

---

## Kontekst biznesowy

**CarMentor** to butikowa marka sprzedaży aut i usług okołozakupowych. Strona ma być prosta, elegancka (bez wrażenia portalu ogłoszeń czy komisu) i nastawiona na pozyskanie kontaktu (lead generation).

Klient ma widzieć dwie ścieżki:

- **Stock** — sprawdzone auta "od ręki", gotowe do odbioru
- **Broker** — usługa "auto na zamówienie" — klient wysyła wymagania, CarMentor szuka, weryfikuje i prowadzi do zakupu

Obietnica marki: **"Stoimy po stronie kupującego"** — transparentność, weryfikacja, odradzenie złego zakupu.

---

## Co ma zawierać każdy layout

Każdy layout to **jedna strona** (single page) z następującymi sekcjami:

### 1. Nawigacja (Nav)

- Logo "CarMentor"
- Linki: Auta od ręki / Auto na zamówienie / Jak działamy / Kontakt
- CTA button
- Na mobile: hamburger lub uproszczona nawigacja

### 2. Hero section

- Nagłówek z obietnicą wartości
- Podtytuł (1-2 zdania)
- 2 CTA: "Zobacz auta od ręki" (primary) + "Znajdź mi auto" (secondary)

### 3. Top Picks (6 samochodów)

- Karty z: zdjęciem, marką/modelem, rokiem, przebiegiem, ceną
- Tagi: "Od ręki" / "Sprawdzone"
- CTA na karcie: "Zapytaj o to auto"

### 4. Jak działamy (4 kroki)

1. Wyślij zapytanie
2. Sprawdzimy historię i stan
3. Inspekcja i negocjacje
4. Zakup z pełnym wsparciem

### 5. Footer

- Logo + krótki opis
- Linki do sekcji
- Dane kontaktowe (telefon, email, WhatsApp)
- Copyright

---

## Wymagania techniczne

### Stack

- **React** (functional components, TypeScript)
- **styled-components** (v6) — cały styling inline, ZERO zewnętrznych CSS
- Każdy layout to **jeden plik** `.tsx` — self-contained, z wszystkimi danymi zahardcodowanymi
- Eksportuj komponent jako `export default function LayoutXX()`

### Dane do użycia

Użyj dokładnie tych danych (identycznych we wszystkich layoutach, żeby klient porównywał design, nie content):

```typescript
const CARS = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=400&fit=crop",
    brand: "BMW",
    model: "X3 xDrive30d",
    year: 2023,
    mileage: "18 000 km",
    price: "219 900 zł",
    tag: "Od ręki",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=400&fit=crop",
    brand: "Mercedes-Benz",
    model: "GLC 300 4MATIC",
    year: 2022,
    mileage: "32 000 km",
    price: "249 000 zł",
    tag: "Sprawdzone",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=600&h=400&fit=crop",
    brand: "Volvo",
    model: "XC60 T6 Recharge",
    year: 2023,
    mileage: "12 500 km",
    price: "279 900 zł",
    tag: "Od ręki",
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=600&h=400&fit=crop",
    brand: "Audi",
    model: "Q5 45 TFSI quattro",
    year: 2022,
    mileage: "41 000 km",
    price: "199 900 zł",
    tag: "Sprawdzone",
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop",
    brand: "Porsche",
    model: "Cayenne E-Hybrid",
    year: 2023,
    mileage: "8 200 km",
    price: "389 000 zł",
    tag: "Od ręki",
  },
  {
    id: 6,
    img: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&h=400&fit=crop",
    brand: "Toyota",
    model: "RAV4 Hybrid AWD",
    year: 2023,
    mileage: "15 800 km",
    price: "169 900 zł",
    tag: "Sprawdzone",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Wyślij zapytanie",
    desc: "Powiedz nam, jakiego auta szukasz — lub wklej link z ogłoszenia.",
  },
  {
    num: "02",
    title: "Sprawdzimy",
    desc: "Weryfikujemy historię, VIN, przebieg i stan techniczny.",
  },
  {
    num: "03",
    title: "Inspekcja i negocjacje",
    desc: "Organizujemy oględziny i negocjujemy najlepszą cenę.",
  },
  {
    num: "04",
    title: "Zakup",
    desc: "Pomagamy przy umowie, finansowaniu i odbiorze auta.",
  },
];
```

### Responsywność (MUST HAVE)

- **Desktop**: >= 1024px
- **Tablet**: 768px–1023px
- **Mobile**: < 768px

Każdy layout MUSI wyglądać dobrze na wszystkich trzech breakpointach. Używaj `@media` queries w styled-components.

### Gdzie tworzyć pliki

Pliki umieść w swoim folderze: `src/layouts/agentX/` (zostaniesz poinformowany, który folder jest Twój).

Nazewnictwo plików: `Layout01.tsx`, `Layout02.tsx`, `Layout03.tsx`.

### GlobalStyle

Każdy layout MUSI zawierać własny `createGlobalStyle` z resetem CSS:

```typescript
const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  body { /* font-family i kolory specyficzne dla layoutu */ }
  a { text-decoration: none; color: inherit; }
  img { max-width: 100%; display: block; }
`;
```

---

## Checklist przed oddaniem

- [ ] 3 layouty w osobnych plikach w Twoim folderze agenta
- [ ] Wszystkie layouty używają identycznych danych (CARS i STEPS)
- [ ] Responsywność: desktop, tablet, mobile
- [ ] Zero zewnętrznych CSS — tylko styled-components
- [ ] Każdy layout ma GlobalStyle z resetem
- [ ] Layouty wizualnie się od siebie istotnie różnią
- [ ] Kod kompiluje się bez błędów TypeScript
- [ ] Eksport: `export default function LayoutXX()`

---

## Czego NIE robić

- NIE używaj zewnętrznych bibliotek CSS (Tailwind, Bootstrap, etc.)
- NIE twórz wielu plików na layout — jeden plik = jeden layout
- NIE dodawaj interaktywności (formularze, modals) — to jest POC wizualny
- NIE modyfikuj plików poza swoim folderem agenta
