import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { VW_TIGUAN } from "./cars";
import { SiteFooter, SiteNavigation } from "./components/SiteChrome";

type Step = {
  num: string;
  title: string;
  desc: string;
};

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
const THEME_STORAGE_KEY = "car-mentor-theme";

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

const CarCard = styled.article<{ $isDark: boolean }>`
  background: ${({ $isDark }) => ($isDark ? "#161f1c" : "white")};
  border: 1px solid ${({ $isDark }) => ($isDark ? "#2f3f39" : "#dcdcdc")};
  border-radius: 24px;
  padding: 20px;
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 22px;

  @media (max-width: 1023px) {
    grid-template-columns: 1fr;
  }
`;

const CarGallery = styled.div`
  display: grid;
  gap: 10px;
`;

const MainImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 16px;
  border: 1px solid #ced8d4;

  @media (max-width: 767px) {
    height: 300px;
  }
`;

const ThumbGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 8px;

  @media (max-width: 767px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const ThumbButton = styled.button<{ $isDark: boolean; $active: boolean }>`
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid
    ${({ $active, $isDark }) =>
      $active ? ($isDark ? ACCENT_COLOR_DARK : ACCENT_COLOR) : "transparent"};
  background: transparent;
  cursor: pointer;
`;

const ThumbImage = styled.img`
  width: 100%;
  height: 72px;
  object-fit: cover;
`;

const CarBody = styled.div`
  padding: 4px;
`;

const SimpleCard = styled.article<{ $isDark: boolean }>`
  background: ${({ $isDark }) => ($isDark ? "#161f1c" : "white")};
  border: 1px solid ${({ $isDark }) => ($isDark ? "#2f3f39" : "#dcdcdc")};
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-width: 460px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 30px rgba(0, 0, 0, 0.12);
    border-color: ${({ $isDark }) => ($isDark ? "#3d5a52" : "#b9cdc6")};
  }

  &:hover img {
    transform: scale(1.03);
  }
`;

const SimpleImage = styled.img`
  width: 100%;
  height: 230px;
  object-fit: cover;
  transition: transform 0.28s ease;
`;

const SimpleBody = styled.div`
  padding: 16px;
`;

const CarDescription = styled.p<{ $isDark: boolean }>`
  margin-top: 10px;
  color: ${({ $isDark }) => ($isDark ? "#b8c5c1" : "#4f5d58")};
  line-height: 1.5;
  font-size: 0.95rem;
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
  font-size: clamp(1.5rem, 2vw, 1.85rem);
  margin-bottom: 10px;
`;

const Meta = styled.p<{ $isDark: boolean }>`
  color: ${({ $isDark }) => ($isDark ? "#aab5b1" : "#666")};
  font-size: 0.96rem;
`;

const Price = styled.p`
  margin-top: 14px;
  margin-bottom: 18px;
  font-size: 1.35rem;
  font-weight: 800;
`;

const SpecsGrid = styled.div<{ $isDark: boolean }>`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-top: 14px;
  margin-bottom: 18px;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const SpecItem = styled.div<{ $isDark: boolean }>`
  border-radius: 12px;
  border: 1px solid ${({ $isDark }) => ($isDark ? "#345047" : "#d6dfdb")};
  background: ${({ $isDark }) => ($isDark ? "#1a2924" : "#f8fbfa")};
  padding: 10px 12px;
`;

const SpecLabel = styled.p<{ $isDark: boolean }>`
  font-size: 0.75rem;
  color: ${({ $isDark }) => ($isDark ? "#9fb0ab" : "#61716b")};
  margin-bottom: 3px;
`;

const SpecValue = styled.p`
  font-size: 0.93rem;
  font-weight: 700;
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

export default function HomePage() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return window.localStorage.getItem(THEME_STORAGE_KEY) === "dark";
  });
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

  useEffect(() => {
    window.localStorage.setItem(THEME_STORAGE_KEY, isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const emailSubject = contactCar
    ? encodeURIComponent(`Zapytanie o auto: ${contactCar}`)
    : encodeURIComponent("Zapytanie o auto");

  return (
    <Page>
      <GlobalStyle $isDark={isDarkMode} />
      <SiteNavigation
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode((prev) => !prev)}
      />

      <Hero>
        <HeroCard $isDark={isDarkMode}>
          <HeroTitle>Profesjonalne wsparcie przy zakupie auta.</HeroTitle>
          <HeroText $isDark={isDarkMode}>
            Auta od ręki, komis i auta na zamówienie. Jasne zasady, rzetelna
            weryfikacja, bez niespodzianek.
          </HeroText>
          <CtaRow>
            <PrimaryButton href="#stock">Zobacz ofertę</PrimaryButton>
            <SecondaryButton as={Link} to={`/samochod/${VW_TIGUAN.slug}`}>
              Zobacz samochód
            </SecondaryButton>
          </CtaRow>
        </HeroCard>
        <HeroImage src={VW_TIGUAN.gallery[1]} alt="Volkswagen Tiguan" />
      </Hero>

      <CarsSection id="stock">
        <SectionHead>
          <SectionTitle $isDark={isDarkMode}>Oferta na dziś</SectionTitle>
          <SectionDesc $isDark={isDarkMode}>
            Sprawdzone auta gotowe do rozmowy. Każde ogłoszenie prowadzi do osobnej karty
            pojazdu ze zdjęciami i pełnym opisem.
          </SectionDesc>
        </SectionHead>
        <SimpleCard
          $isDark={isDarkMode}
          role="link"
          tabIndex={0}
          onClick={() => navigate(`/samochod/${VW_TIGUAN.slug}`)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              navigate(`/samochod/${VW_TIGUAN.slug}`);
            }
          }}
          aria-label={`Przejdz do karty auta ${VW_TIGUAN.brand} ${VW_TIGUAN.model}`}
        >
          <SimpleImage src={VW_TIGUAN.gallery[0]} alt={`${VW_TIGUAN.brand} ${VW_TIGUAN.model}`} />
          <SimpleBody>
            <Tag>{VW_TIGUAN.tag}</Tag>
            <CarName>
              {VW_TIGUAN.brand} {VW_TIGUAN.model}
            </CarName>
            <Meta $isDark={isDarkMode}>
              {VW_TIGUAN.year} • {VW_TIGUAN.engine} • {VW_TIGUAN.power}
            </Meta>
            <CarDescription $isDark={isDarkMode}>{VW_TIGUAN.description}</CarDescription>
            <Price>{VW_TIGUAN.price}</Price>
            <CardButton
              type="button"
              $isDark={isDarkMode}
              onClick={(event) => {
                event.stopPropagation();
                setContactCar(`${VW_TIGUAN.brand} ${VW_TIGUAN.model}`);
              }}
            >
              Zapytaj o to auto
            </CardButton>
          </SimpleBody>
        </SimpleCard>
      </CarsSection>
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

      <SiteFooter isDarkMode={isDarkMode} />
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
