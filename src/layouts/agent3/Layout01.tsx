import { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import logo from "./assets/logo.png";
import vwImage from "./assets/vw.png";

type Car = {
  id: number;
  img: string;
  brand: string;
  model: string;
  year: number;
  mileage: string;
  price: string;
  tag: "Od ręki" | "Sprawdzone";
};

type Step = {
  num: string;
  title: string;
  desc: string;
};

const CARS: Car[] = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&h=600&fit=crop&q=80",
    brand: "Toyota",
    model: "Corolla 1.8 Hybrid",
    year: 2020,
    mileage: "74 000 km",
    price: "89 900 zł",
    tag: "Od ręki",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop&q=80",
    brand: "Skoda",
    model: "Octavia 1.5 TSI",
    year: 2019,
    mileage: "92 000 km",
    price: "79 900 zł",
    tag: "Sprawdzone",
  },
  {
    id: 3,
    img: vwImage,
    brand: "Volkswagen",
    model: "Tiguan 2.0 TDI 4Motion R-Line",
    year: 2017,
    mileage: "1 968 cm3 • 500 Nm",
    price: "240 KM • DSG • Zapytaj o cenę",
    tag: "Od ręki",
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&q=80",
    brand: "Hyundai",
    model: "i30 Wagon 1.5 DPI",
    year: 2020,
    mileage: "83 000 km",
    price: "74 900 zł",
    tag: "Sprawdzone",
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=600&fit=crop&q=80",
    brand: "Kia",
    model: "Ceed 1.5 T-GDI",
    year: 2021,
    mileage: "57 000 km",
    price: "94 900 zł",
    tag: "Od ręki",
  },
  {
    id: 6,
    img: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&h=600&fit=crop&q=80",
    brand: "Opel",
    model: "Astra 1.2 Turbo",
    year: 2019,
    mileage: "98 000 km",
    price: "72 900 zł",
    tag: "Sprawdzone",
  },
];

const STEPS: Step[] = [
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

const ACCENT_COLOR = "#00573F";
const ACCENT_COLOR_DARK = "#33c39b";

const GlobalStyle = createGlobalStyle<{ $isDark: boolean }>`
  @import url("https://fonts.cdnfonts.com/css/arboria");
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: "Arboria", Inter, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: ${({ $isDark }) => ($isDark ? "#f0f3f2" : "#161616")};
    background: ${({ $isDark }) => ($isDark ? "#0f1513" : "#f5f5f5")};
    transition: background-color 0.25s ease, color 0.25s ease;
  }
  button, a {
    transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
  }
  :focus-visible {
    outline: 3px solid ${({ $isDark }) => ($isDark ? ACCENT_COLOR_DARK : ACCENT_COLOR)};
    outline-offset: 2px;
  }
  a { text-decoration: none; color: inherit; }
  img { max-width: 100%; display: block; }
`;

const Page = styled.div`
  min-height: 100vh;
`;

const Section = styled.section`
  width: min(1200px, calc(100% - 48px));
  margin: 0 auto;

  @media (max-width: 767px) {
    width: calc(100% - 28px);
  }
`;

const Nav = styled.nav<{ $isDark: boolean }>`
  position: sticky;
  top: 0;
  z-index: 20;
  background: ${({ $isDark }) =>
    $isDark ? "rgba(16, 24, 21, 0.94)" : "rgba(245, 245, 245, 0.94)"};
  backdrop-filter: blur(8px);
  border-bottom: 1px solid ${({ $isDark }) => ($isDark ? "#2d3a36" : "#dedede")};
`;

const NavInner = styled(Section)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 0;
`;

const Logo = styled.div`
  display: inline-flex;
  align-items: center;
`;

const LogoImage = styled.img`
  width: clamp(155px, 13vw, 210px);
  height: auto;
`;

const Links = styled.div<{ $isDark: boolean }>`
  display: flex;
  gap: 30px;
  color: ${({ $isDark }) => ($isDark ? "#c5d0cc" : "#3a3a3a")};
  font-weight: 500;

  a:hover {
    color: ${({ $isDark }) => ($isDark ? ACCENT_COLOR_DARK : ACCENT_COLOR)};
  }

  @media (max-width: 1023px) {
    gap: 18px;
    font-size: 0.95rem;
  }

  @media (max-width: 767px) {
    display: none;
  }
`;

const MobileMenu = styled.button<{ $isDark: boolean }>`
  display: none;
  border: 1px solid ${({ $isDark }) => ($isDark ? "#375149" : "#cbcbcb")};
  background: ${({ $isDark }) => ($isDark ? "#18231f" : "white")};
  border-radius: 10px;
  padding: 8px 12px;
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ $isDark }) => ($isDark ? ACCENT_COLOR_DARK : ACCENT_COLOR)};

  @media (max-width: 767px) {
    display: block;
  }
`;

const PrimaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  padding: 11px 18px;
  font-size: 0.9rem;
  font-weight: 700;
  background: ${ACCENT_COLOR};
  color: white;
  border: 1px solid ${ACCENT_COLOR};
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ThemeButton = styled.button<{ $isDark: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  padding: 11px 14px;
  font-size: 0.85rem;
  font-weight: 700;
  border: 1px solid ${({ $isDark }) => ($isDark ? ACCENT_COLOR_DARK : ACCENT_COLOR)};
  color: ${({ $isDark }) => ($isDark ? ACCENT_COLOR_DARK : ACCENT_COLOR)};
  background: ${({ $isDark }) => ($isDark ? "#14211d" : "#eaf6f2")};
  cursor: pointer;
`;

const Hero = styled(Section)`
  margin-top: 50px;
  margin-bottom: 70px;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 40px;

  @media (max-width: 1023px) {
    margin-top: 32px;
    grid-template-columns: 1fr;
  }
`;

const HeroCard = styled.div<{ $isDark: boolean }>`
  background: ${({ $isDark }) => ($isDark ? "#161f1c" : "white")};
  border: 1px solid ${({ $isDark }) => ($isDark ? "#2f3f39" : "#d8d8d8")};
  border-radius: 28px;
  padding: 42px;

  @media (max-width: 767px) {
    padding: 30px 22px;
    border-radius: 20px;
  }
`;

const HeroTitle = styled.h1`
  font-size: clamp(2rem, 3.6vw, 3.5rem);
  line-height: 1.05;
  letter-spacing: -0.03em;
  margin-bottom: 16px;
`;

const HeroText = styled.p<{ $isDark: boolean }>`
  color: ${({ $isDark }) => ($isDark ? "#c0cbc8" : "#515151")};
  font-size: 1.06rem;
  line-height: 1.6;
  max-width: 56ch;
`;

const CtaRow = styled.div`
  margin-top: 30px;
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
`;

const SecondaryButton = styled(PrimaryButton)`
  background: white;
  color: ${ACCENT_COLOR};
  border-color: ${ACCENT_COLOR};
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 28px;
  min-height: 320px;
`;

const SectionHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 20px;
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2<{ $isDark: boolean }>`
  font-size: clamp(1.5rem, 2.4vw, 2.2rem);
  letter-spacing: -0.02em;
  color: ${({ $isDark }) => ($isDark ? ACCENT_COLOR_DARK : ACCENT_COLOR)};
`;

const SectionDesc = styled.p<{ $isDark: boolean }>`
  color: ${({ $isDark }) => ($isDark ? "#aeb8b4" : "#5e5e5e")};
  max-width: 48ch;
`;

const CarsSection = styled(Section)`
  margin-bottom: 78px;
`;

const CarsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;

  @media (max-width: 1023px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const CarCard = styled.article<{ $isDark: boolean }>`
  background: ${({ $isDark }) => ($isDark ? "#161f1c" : "white")};
  border: 1px solid ${({ $isDark }) => ($isDark ? "#2f3f39" : "#dcdcdc")};
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const CarImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const CarBody = styled.div`
  padding: 16px;
`;

const Tag = styled.span`
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 99px;
  padding: 6px 10px;
  color: ${ACCENT_COLOR};
  background: #d7efe8;
  border: 1px solid #b6ddd1;
  margin-bottom: 10px;
`;

const CarName = styled.h3`
  font-size: 1.07rem;
  margin-bottom: 10px;
`;

const Meta = styled.p<{ $isDark: boolean }>`
  color: ${({ $isDark }) => ($isDark ? "#aab5b1" : "#666")};
  font-size: 0.88rem;
`;

const Price = styled.p`
  margin-top: 12px;
  margin-bottom: 16px;
  font-size: 1.17rem;
  font-weight: 800;
`;

const CardButton = styled.button<{ $isDark: boolean }>`
  display: inline-flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ $isDark }) => ($isDark ? ACCENT_COLOR_DARK : ACCENT_COLOR)};
  color: ${({ $isDark }) => ($isDark ? "#0c1613" : ACCENT_COLOR)};
  background: ${({ $isDark }) => ($isDark ? ACCENT_COLOR_DARK : "transparent")};
  border-radius: 11px;
  padding: 10px 14px;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
`;

const ModalOverlay = styled.div<{ $isDark: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 40;
  display: grid;
  place-items: center;
  padding: 20px;
  background: ${({ $isDark }) => ($isDark ? "rgba(6, 10, 9, 0.74)" : "rgba(0, 0, 0, 0.45)")};
`;

const ModalCard = styled.div<{ $isDark: boolean }>`
  width: min(520px, 100%);
  border-radius: 18px;
  border: 1px solid ${({ $isDark }) => ($isDark ? "#335048" : "#d5ddd9")};
  background: ${({ $isDark }) => ($isDark ? "#14201c" : "white")};
  color: ${({ $isDark }) => ($isDark ? "#eff4f2" : "#19201d")};
  padding: 22px;
  box-shadow: 0 20px 55px rgba(0, 0, 0, 0.28);
`;

const ModalHead = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 12px;
`;

const ModalTitle = styled.h3`
  font-size: 1.2rem;
`;

const CloseButton = styled.button<{ $isDark: boolean }>`
  border: 1px solid ${({ $isDark }) => ($isDark ? "#44635a" : "#cad4d0")};
  background: ${({ $isDark }) => ($isDark ? "#1b2a25" : "#f7faf9")};
  color: ${({ $isDark }) => ($isDark ? "#d8e4e0" : "#1d2a26")};
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 700;
  padding: 8px 11px;
  cursor: pointer;
`;

const ModalText = styled.p<{ $isDark: boolean }>`
  margin-top: 12px;
  margin-bottom: 16px;
  color: ${({ $isDark }) => ($isDark ? "#c6d4cf" : "#43514c")};
  line-height: 1.5;
`;

const ContactActions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const ContactLink = styled.a<{ $isDark: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  border-radius: 12px;
  border: 1px solid ${({ $isDark }) => ($isDark ? ACCENT_COLOR_DARK : ACCENT_COLOR)};
  background: ${({ $isDark }) => ($isDark ? "#1f332d" : "#eaf6f2")};
  color: ${({ $isDark }) => ($isDark ? "#e8f4ef" : ACCENT_COLOR)};
  font-weight: 700;
`;

const StepsSection = styled(Section)`
  margin-bottom: 90px;
`;

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 1023px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const StepCard = styled.article<{ $isDark: boolean }>`
  background: ${({ $isDark }) => ($isDark ? "#161f1c" : "white")};
  border: 1px solid ${({ $isDark }) => ($isDark ? "#2f3f39" : "#dadada")};
  border-radius: 16px;
  padding: 22px;
`;

const StepNum = styled.p<{ $isDark: boolean }>`
  color: ${({ $isDark }) => ($isDark ? ACCENT_COLOR_DARK : ACCENT_COLOR)};
  font-size: 0.8rem;
  margin-bottom: 12px;
  font-weight: 700;
`;

const StepTitle = styled.h3`
  margin-bottom: 8px;
`;

const StepDesc = styled.p<{ $isDark: boolean }>`
  color: ${({ $isDark }) => ($isDark ? "#aeb8b4" : "#5b5b5b")};
  line-height: 1.55;
`;

const Footer = styled.footer<{ $isDark: boolean }>`
  border-top: 1px solid ${({ $isDark }) => ($isDark ? "#2f3f39" : "#d4d4d4")};
  background: ${({ $isDark }) => ($isDark ? "#131a17" : "#f0f0f0")};
  padding: 38px 0;
`;

const FooterGrid = styled(Section)`
  display: grid;
  grid-template-columns: 1.25fr 1fr 1fr;
  gap: 24px;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const FooterTitle = styled.p<{ $isDark: boolean }>`
  font-weight: 800;
  margin-bottom: 10px;
  color: ${({ $isDark }) => ($isDark ? ACCENT_COLOR_DARK : ACCENT_COLOR)};
`;

const FooterText = styled.p<{ $isDark: boolean }>`
  color: ${({ $isDark }) => ($isDark ? "#afbab6" : "#595959")};
  line-height: 1.6;
`;

const List = styled.ul<{ $isDark: boolean }>`
  list-style: none;
  display: grid;
  gap: 8px;
  color: ${({ $isDark }) => ($isDark ? "#c2cdc9" : "#3f3f3f")};
`;

const Copyright = styled.p<{ $isDark: boolean }>`
  margin-top: 26px;
  color: ${({ $isDark }) => ($isDark ? "#96a3a0" : "#696969")};
  font-size: 0.84rem;
`;

export default function Layout01() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [contactCar, setContactCar] = useState<string | null>(null);

  useEffect(() => {
    if (!contactCar) {
      return;
    }

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setContactCar(null);
      }
    };

    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [contactCar]);

  const emailSubject = contactCar
    ? encodeURIComponent(`Zapytanie o auto: ${contactCar}`)
    : encodeURIComponent("Zapytanie o auto");

  return (
    <Page>
      <GlobalStyle $isDark={isDarkMode} />
      <Nav $isDark={isDarkMode}>
        <NavInner>
          <Logo>
            <LogoImage src={logo} alt="Car Mentor" />
          </Logo>
          <Links $isDark={isDarkMode}>
            <a href="#stock">Auta od ręki</a>
            <a href="#broker">Auto na zamówienie</a>
            <a href="#how">Jak działamy</a>
            <a href="#contact">Kontakt</a>
          </Links>
          <NavActions>
            <ThemeButton
              type="button"
              $isDark={isDarkMode}
              onClick={() => setIsDarkMode((prev) => !prev)}
            >
              {isDarkMode ? "Light mode" : "Dark mode"}
            </ThemeButton>
            <PrimaryButton href="#contact">Umów rozmowę</PrimaryButton>
            <MobileMenu $isDark={isDarkMode}>Menu</MobileMenu>
          </NavActions>
        </NavInner>
      </Nav>

      <Hero>
        <HeroCard $isDark={isDarkMode}>
          <HeroTitle>Stoimy po stronie kupującego, nie sprzedającego.</HeroTitle>
          <HeroText $isDark={isDarkMode}>
            CarMentor łączy ofertę sprawdzonych aut od ręki z usługą wyszukania auta
            na zamówienie. Transparentnie pokazujemy fakty, odradzamy złe wybory i
            prowadzimy cały proces zakupu.
          </HeroText>
          <CtaRow>
            <PrimaryButton href="#stock">Zobacz auta od ręki</PrimaryButton>
            <SecondaryButton href="#broker">Znajdź mi auto</SecondaryButton>
          </CtaRow>
        </HeroCard>
        <HeroImage
          src="https://images.unsplash.com/photo-1502877338535-766e1452684a?w=900&h=700&fit=crop"
          alt="Nowoczesny samochód"
        />
      </Hero>

      <CarsSection id="stock">
        <SectionHead>
          <SectionTitle $isDark={isDarkMode}>Top Picks</SectionTitle>
          <SectionDesc $isDark={isDarkMode}>
            Wyselekcjonowane samochody po naszej weryfikacji. Każdy z pełną historią i
            jasną rekomendacją.
          </SectionDesc>
        </SectionHead>
        <CarsGrid>
          {CARS.map((car) => (
            <CarCard key={car.id} $isDark={isDarkMode}>
              <CarImage src={car.img} alt={`${car.brand} ${car.model}`} />
              <CarBody>
                <Tag>{car.tag}</Tag>
                <CarName>
                  {car.brand} {car.model}
                </CarName>
                <Meta $isDark={isDarkMode}>
                  {car.year} • {car.mileage}
                </Meta>
                <Price>{car.price}</Price>
                <CardButton
                  type="button"
                  $isDark={isDarkMode}
                  onClick={() => setContactCar(`${car.brand} ${car.model}`)}
                >
                  Zapytaj o to auto
                </CardButton>
              </CarBody>
            </CarCard>
          ))}
        </CarsGrid>
      </CarsSection>

      <div id="broker" />
      <StepsSection id="how">
        <SectionHead>
          <SectionTitle $isDark={isDarkMode}>Jak działamy</SectionTitle>
          <SectionDesc $isDark={isDarkMode}>
            Jeden proces niezależnie od tego, czy kupujesz auto ze stocku, czy szukasz
            modelu na zamówienie.
          </SectionDesc>
        </SectionHead>
        <StepsGrid>
          {STEPS.map((step) => (
            <StepCard key={step.num} $isDark={isDarkMode}>
              <StepNum $isDark={isDarkMode}>{step.num}</StepNum>
              <StepTitle>{step.title}</StepTitle>
              <StepDesc $isDark={isDarkMode}>{step.desc}</StepDesc>
            </StepCard>
          ))}
        </StepsGrid>
      </StepsSection>

      <Footer id="contact" $isDark={isDarkMode}>
        <FooterGrid>
          <div>
            <FooterTitle $isDark={isDarkMode}>CarMentor</FooterTitle>
            <FooterText $isDark={isDarkMode}>
              Butikowe doradztwo zakupowe dla osób, które chcą kupić auto spokojnie i
              świadomie.
            </FooterText>
            <Copyright $isDark={isDarkMode}>
              © 2026 CarMentor. Wszelkie prawa zastrzeżone.
            </Copyright>
          </div>
          <div>
            <FooterTitle $isDark={isDarkMode}>Sekcje</FooterTitle>
            <List $isDark={isDarkMode}>
              <li>
                <a href="#stock">Auta od ręki</a>
              </li>
              <li>
                <a href="#broker">Auto na zamówienie</a>
              </li>
              <li>
                <a href="#how">Jak działamy</a>
              </li>
              <li>
                <a href="#contact">Kontakt</a>
              </li>
            </List>
          </div>
          <div>
            <FooterTitle $isDark={isDarkMode}>Kontakt</FooterTitle>
            <List $isDark={isDarkMode}>
              <li>+48 600 123 456</li>
              <li>kontakt@carmentor.pl</li>
              <li>WhatsApp: +48 600 123 456</li>
            </List>
          </div>
        </FooterGrid>
      </Footer>
      {contactCar ? (
        <ModalOverlay $isDark={isDarkMode} onClick={() => setContactCar(null)}>
          <ModalCard
            $isDark={isDarkMode}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <ModalHead>
              <ModalTitle id="contact-modal-title">Skontaktuj się z nami</ModalTitle>
              <CloseButton
                type="button"
                $isDark={isDarkMode}
                onClick={() => setContactCar(null)}
              >
                Zamknij
              </CloseButton>
            </ModalHead>
            <ModalText $isDark={isDarkMode}>
              Wybierz preferowaną formę kontaktu dla auta: <strong>{contactCar}</strong>
            </ModalText>
            <ContactActions>
              <ContactLink
                $isDark={isDarkMode}
                href={`mailto:kontakt@carmentor.pl?subject=${emailSubject}`}
              >
                kontakt@carmentor.pl
              </ContactLink>
              <ContactLink $isDark={isDarkMode} href="tel:+48600123456">
                +48 600 123 456
              </ContactLink>
            </ContactActions>
          </ModalCard>
        </ModalOverlay>
      ) : null}
    </Page>
  );
}
