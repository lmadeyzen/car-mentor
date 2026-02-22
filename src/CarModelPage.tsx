import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { CARS_BY_SLUG } from "./cars";
import { SiteFooter, SiteNavigation } from "./components/SiteChrome";

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
  }
  a { text-decoration: none; color: inherit; }
  img { max-width: 100%; display: block; }
  :focus-visible {
    outline: 3px solid ${({ $isDark }) => ($isDark ? ACCENT_COLOR_DARK : ACCENT_COLOR)};
    outline-offset: 2px;
  }
`;

const Page = styled.div`
  min-height: 100vh;
`;

const Wrap = styled.section`
  width: min(1180px, calc(100% - 48px));
  margin: 0 auto;
  padding: 30px 0 56px;

  @media (max-width: 767px) {
    width: calc(100% - 28px);
    padding-top: 22px;
  }
`;

const BackLink = styled(Link)<{ $isDark: boolean }>`
  display: inline-flex;
  margin-bottom: 14px;
  color: ${({ $isDark }) => ($isDark ? "#c7d2ce" : "#3f4d47")};
  font-weight: 700;
`;

const Title = styled.h1<{ $isDark: boolean }>`
  font-size: clamp(1.55rem, 2.8vw, 2.4rem);
  color: ${({ $isDark }) => ($isDark ? ACCENT_COLOR_DARK : ACCENT_COLOR)};
  margin-bottom: 8px;
`;

const Subtitle = styled.p<{ $isDark: boolean }>`
  color: ${({ $isDark }) => ($isDark ? "#b4c1bc" : "#5e6b66")};
  margin-bottom: 22px;
`;

const DescriptionCard = styled.article<{ $isDark: boolean }>`
  background: ${({ $isDark }) => ($isDark ? "#161f1c" : "white")};
  border: 1px solid ${({ $isDark }) => ($isDark ? "#2f3f39" : "#dcdcdc")};
  border-radius: 18px;
  padding: 20px;
  margin-top: 18px;
`;

const DescriptionTitle = styled.h3<{ $isDark: boolean }>`
  font-size: 1.15rem;
  margin-bottom: 10px;
  color: ${({ $isDark }) => ($isDark ? "#e7efec" : "#1f2b27")};
`;

const DescriptionParagraph = styled.p<{ $isDark: boolean }>`
  color: ${({ $isDark }) => ($isDark ? "#c1ceca" : "#43514c")};
  line-height: 1.7;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const EquipmentCard = styled.article<{ $isDark: boolean }>`
  background: ${({ $isDark }) => ($isDark ? "#161f1c" : "white")};
  border: 1px solid ${({ $isDark }) => ($isDark ? "#2f3f39" : "#dcdcdc")};
  border-radius: 18px;
  padding: 20px;
  margin-top: 18px;
`;

const EquipmentHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
`;

const EquipmentTitleRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

const EquipmentIcon = styled.span<{ $isDark: boolean }>`
  display: inline-flex;
  width: 28px;
  height: 28px;
  border-radius: 999px;
  align-items: center;
  justify-content: center;
  color: ${({ $isDark }) => ($isDark ? ACCENT_COLOR_DARK : ACCENT_COLOR)};
  background: ${({ $isDark }) => ($isDark ? "#1f312b" : "#e8f3ef")};
`;

const EquipmentTitle = styled.h3<{ $isDark: boolean }>`
  font-size: 1.15rem;
  color: ${({ $isDark }) => ($isDark ? "#e7efec" : "#1f2b27")};
`;

const ExpandButton = styled.button<{ $isDark: boolean }>`
  border-radius: 10px;
  border: 1px solid ${({ $isDark }) => ($isDark ? "#3f5b53" : "#c9d8d2")};
  background: ${({ $isDark }) => ($isDark ? "#1b2a25" : "#f5faf8")};
  color: ${({ $isDark }) => ($isDark ? "#dce8e4" : "#214039")};
  padding: 8px 12px;
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
`;

const EquipmentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 10px;
`;

const EquipmentSection = styled.section<{ $isDark: boolean }>`
  border-radius: 12px;
  border: 1px solid ${({ $isDark }) => ($isDark ? "#345047" : "#d6dfdb")};
  background: ${({ $isDark }) => ($isDark ? "#1a2924" : "#f8fbfa")};
  padding: 12px;
`;

const EquipmentSectionTitle = styled.h4<{ $isDark: boolean }>`
  font-size: 0.9rem;
  margin-bottom: 8px;
  color: ${({ $isDark }) => ($isDark ? "#dbe7e2" : "#233832")};
`;

const EquipmentList = styled.ul<{ $isDark: boolean }>`
  display: grid;
  gap: 7px;
  padding-left: 18px;
  color: ${({ $isDark }) => ($isDark ? "#c2cfca" : "#43514c")};
  line-height: 1.5;
  font-size: 0.9rem;
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

const Gallery = styled.div`
  display: grid;
  gap: 10px;
`;

const MainImage = styled.img`
  width: 100%;
  height: 430px;
  object-fit: cover;
  border-radius: 16px;
  border: 1px solid #ced8d4;

  @media (max-width: 767px) {
    height: 310px;
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

const CarName = styled.h2`
  font-size: clamp(1.45rem, 2vw, 1.82rem);
  margin-bottom: 10px;
`;

const Meta = styled.p<{ $isDark: boolean }>`
  color: ${({ $isDark }) => ($isDark ? "#aab5b1" : "#666")};
  font-size: 0.96rem;
`;

const SpecsGrid = styled.div<{ $isDark: boolean }>`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-top: 14px;
  margin-bottom: 18px;
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

const Price = styled.p`
  margin-top: 14px;
  margin-bottom: 18px;
  font-size: 1.35rem;
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

export default function CarModelPage() {
  const { carSlug } = useParams<{ carSlug: string }>();
  const car = useMemo(() => (carSlug ? CARS_BY_SLUG[carSlug] : null), [carSlug]);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return window.localStorage.getItem(THEME_STORAGE_KEY) === "dark";
  });
  const [activePhoto, setActivePhoto] = useState(car?.gallery[0] ?? "");
  const [contactCar, setContactCar] = useState<string | null>(null);
  const [showFullEquipment, setShowFullEquipment] = useState(false);

  useEffect(() => {
    setActivePhoto(car?.gallery[0] ?? "");
  }, [car]);

  useEffect(() => {
    if (!contactCar) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setContactCar(null);
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [contactCar]);

  useEffect(() => {
    window.localStorage.setItem(THEME_STORAGE_KEY, isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  if (!car) {
    return (
      <Page>
        <GlobalStyle $isDark={false} />
        <Wrap>
          <p>Nie znaleziono samochodu.</p>
          <p>
            <Link to="/">Wróć do strony głównej</Link>
          </p>
        </Wrap>
      </Page>
    );
  }

  const emailSubject = encodeURIComponent(`Zapytanie o auto: ${car.brand} ${car.model}`);
  const visibleEquipmentSections = showFullEquipment
    ? car.equipmentSections
    : car.equipmentSections.slice(0, 3);

  return (
    <Page>
      <GlobalStyle $isDark={isDarkMode} />
      <SiteNavigation
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode((prev) => !prev)}
      />
      <Wrap>
        <BackLink to="/" $isDark={isDarkMode}>
          ← Wróć do oferty
        </BackLink>
        <Title $isDark={isDarkMode}>
          {car.brand} {car.model}
        </Title>
        <Subtitle $isDark={isDarkMode}>
          Szczegółowa karta pojazdu. Możesz spokojnie przejrzeć zdjęcia i specyfikację.
        </Subtitle>
        <CarCard id="gallery" $isDark={isDarkMode}>
          <Gallery>
            <MainImage src={activePhoto} alt={`${car.brand} ${car.model}`} />
            <ThumbGrid>
              {car.gallery.map((photoSrc, index) => (
                <ThumbButton
                  key={photoSrc}
                  type="button"
                  $isDark={isDarkMode}
                  $active={activePhoto === photoSrc}
                  onClick={() => setActivePhoto(photoSrc)}
                  aria-label={`Zdjęcie ${index + 1} ${car.brand} ${car.model}`}
                >
                  <ThumbImage src={photoSrc} alt={`${car.brand} ${car.model} zdjęcie ${index + 1}`} />
                </ThumbButton>
              ))}
            </ThumbGrid>
          </Gallery>
          <CarBody>
            <Tag>{car.tag}</Tag>
            <CarName>
              {car.brand} {car.model}
            </CarName>
            <Meta $isDark={isDarkMode}>Rok produkcji: {car.year}</Meta>
            <SpecsGrid $isDark={isDarkMode}>
              <SpecItem $isDark={isDarkMode}>
                <SpecLabel $isDark={isDarkMode}>Pojemność silnika</SpecLabel>
                <SpecValue>{car.engine}</SpecValue>
              </SpecItem>
              <SpecItem $isDark={isDarkMode}>
                <SpecLabel $isDark={isDarkMode}>Moc</SpecLabel>
                <SpecValue>{car.power}</SpecValue>
              </SpecItem>
              <SpecItem $isDark={isDarkMode}>
                <SpecLabel $isDark={isDarkMode}>Moment obrotowy</SpecLabel>
                <SpecValue>{car.torque}</SpecValue>
              </SpecItem>
              <SpecItem $isDark={isDarkMode}>
                <SpecLabel $isDark={isDarkMode}>Skrzynia biegów</SpecLabel>
                <SpecValue>{car.gearbox}</SpecValue>
              </SpecItem>
            </SpecsGrid>
            <Price>{car.price}</Price>
            <CardButton
              id="contact"
              type="button"
              $isDark={isDarkMode}
              onClick={() => setContactCar(`${car.brand} ${car.model}`)}
            >
              Zapytaj o to auto
            </CardButton>
          </CarBody>
        </CarCard>
        <DescriptionCard $isDark={isDarkMode}>
          <DescriptionTitle $isDark={isDarkMode}>Opis pojazdu</DescriptionTitle>
          {car.detailedDescription.map((paragraph) => (
            <DescriptionParagraph $isDark={isDarkMode} key={paragraph}>
              {paragraph}
            </DescriptionParagraph>
          ))}
        </DescriptionCard>
        <EquipmentCard $isDark={isDarkMode}>
          <EquipmentHead>
            <EquipmentTitleRow>
              <EquipmentIcon $isDark={isDarkMode} aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 7h16M6 12h12M8 17h8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </EquipmentIcon>
              <EquipmentTitle $isDark={isDarkMode}>Wyposażenie</EquipmentTitle>
            </EquipmentTitleRow>
            {car.equipmentSections.length > 3 ? (
              <ExpandButton
                type="button"
                $isDark={isDarkMode}
                onClick={() => setShowFullEquipment((prev) => !prev)}
              >
                {showFullEquipment ? "Pokaż mniej" : "Więcej"}
              </ExpandButton>
            ) : null}
          </EquipmentHead>
          <EquipmentGrid>
            {visibleEquipmentSections.map((section) => (
              <EquipmentSection key={section.title} $isDark={isDarkMode}>
                <EquipmentSectionTitle $isDark={isDarkMode}>{section.title}</EquipmentSectionTitle>
                <EquipmentList $isDark={isDarkMode}>
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </EquipmentList>
              </EquipmentSection>
            ))}
          </EquipmentGrid>
        </EquipmentCard>
      </Wrap>
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
              <CloseButton type="button" $isDark={isDarkMode} onClick={() => setContactCar(null)}>
                Zamknij
              </CloseButton>
            </ModalHead>
            <ModalText $isDark={isDarkMode}>
              Wybierz preferowaną formę kontaktu dla auta: <strong>{contactCar}</strong>
            </ModalText>
            <ContactActions>
              <ContactLink $isDark={isDarkMode} href={`mailto:kontakt@carmentor.pl?subject=${emailSubject}`}>
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
