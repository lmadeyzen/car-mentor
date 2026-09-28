import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { CARS_BY_SLUG, fetchCar, type CarOffer } from "./cars";
import { SiteFooter, SiteNavigation } from "./components/SiteChrome";
import { CarTag, ContactModal, Icon, PrimaryButton, SecondaryButton } from "./components/ui";
import {
  ACCENT_COLOR,
  ACCENT_COLOR_DARK,
  accent,
  accentSoft,
  border,
  borderStrong,
  cardShadow,
  surface,
  surfaceMuted,
  textBody,
  textMuted,
  textStrong,
  type ThemeProps,
} from "./theme";

const Page = styled.div`
  min-height: 100vh;
`;

const Wrap = styled.section`
  width: min(1280px, calc(100% - 48px));
  margin: 0 auto;
  padding: 28px 0 72px;

  @media (max-width: 767px) {
    width: calc(100% - 28px);
    padding-top: 18px;
    padding-bottom: 48px;
  }
`;

const BackLink = styled(Link)<ThemeProps>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  padding: 8px 14px 8px 10px;
  border-radius: 999px;
  border: 1px solid ${border};
  background: ${surface};
  color: ${textBody};
  font-size: 0.88rem;
  font-weight: 600;

  &:hover {
    color: ${accent};
  }
`;

const Header = styled.header`
  margin-bottom: 24px;
`;

const Title = styled.h1<ThemeProps>`
  font-size: clamp(1.8rem, 3.6vw, 3rem);
  line-height: 1.08;
  letter-spacing: -0.03em;
  font-weight: 800;
  color: ${textStrong};
  margin-bottom: 10px;
`;

const Subtitle = styled.p<ThemeProps>`
  color: ${textMuted};
  font-size: 1rem;
`;

const Showcase = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 380px;
  gap: 28px;
  align-items: start;

  @media (max-width: 1023px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const Gallery = styled.div`
  display: grid;
  gap: 12px;
  min-width: 0;
`;

const MainImageFrame = styled.div<ThemeProps>`
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  aspect-ratio: 16 / 10;
  background: ${surfaceMuted};
  box-shadow: ${cardShadow};

  &::after {
    content: "";
    position: absolute;
    inset: auto 0 0;
    height: 32%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.45), transparent);
    pointer-events: none;
  }

  @media (max-width: 767px) {
    border-radius: 18px;
    aspect-ratio: 4 / 3;
  }
`;

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImageOverlay = styled.div`
  position: absolute;
  left: 18px;
  right: 18px;
  bottom: 16px;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const PhotoCounter = styled.span`
  font-size: 0.8rem;
  font-weight: 700;
  color: #ffffff;
  padding: 6px 11px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(6px);
`;

const ThumbGrid = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(96px, 1fr);
  gap: 10px;
  overflow-x: auto;
  padding: 2px;
  scrollbar-width: thin;

  @media (max-width: 767px) {
    grid-auto-columns: 84px;
  }
`;

const ThumbButton = styled.button<ThemeProps & { $active: boolean }>`
  position: relative;
  padding: 0;
  border-radius: 14px;
  overflow: hidden;
  border: none;
  background: transparent;
  cursor: pointer;
  outline: 2px solid ${({ $active, $isDark }) =>
    $active ? ($isDark ? ACCENT_COLOR_DARK : ACCENT_COLOR) : "transparent"};
  outline-offset: 2px;
  opacity: ${({ $active }) => ($active ? 1 : 0.62)};
  transition: opacity 0.2s ease, outline-color 0.2s ease;

  &:hover {
    opacity: 1;
  }
`;

const ThumbImage = styled.img`
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
`;

const SummaryCard = styled.aside<ThemeProps>`
  position: sticky;
  top: 104px;
  display: grid;
  gap: 20px;
  padding: 26px;
  border-radius: 24px;
  border: 1px solid ${border};
  background: ${surface};
  box-shadow: ${cardShadow};

  @media (max-width: 1023px) {
    position: static;
  }

  @media (max-width: 767px) {
    padding: 20px;
    border-radius: 18px;
  }
`;

const SummaryHead = styled.div`
  display: grid;
  gap: 6px;
`;

const Brand = styled.span<ThemeProps>`
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${accent};
`;

const CarName = styled.h2<ThemeProps>`
  font-size: 1.4rem;
  line-height: 1.25;
  letter-spacing: -0.015em;
  color: ${textStrong};
`;

const Meta = styled.p<ThemeProps>`
  color: ${textMuted};
  font-size: 0.92rem;
`;

const SpecsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
`;

const SpecItem = styled.div<ThemeProps>`
  display: grid;
  gap: 8px;
  border-radius: 16px;
  background: ${surfaceMuted};
  padding: 14px;
`;

const SpecIcon = styled.span<ThemeProps>`
  display: inline-flex;
  width: 30px;
  height: 30px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  color: ${accent};
  background: ${accentSoft};
`;

const SpecLabel = styled.p<ThemeProps>`
  font-size: 0.74rem;
  color: ${textMuted};
`;

const SpecValue = styled.p<ThemeProps>`
  font-size: 0.98rem;
  font-weight: 700;
  color: ${textStrong};
`;

const PriceBlock = styled.div<ThemeProps>`
  padding-top: 18px;
  border-top: 1px solid ${border};
`;

const PriceLabel = styled.p<ThemeProps>`
  font-size: 0.78rem;
  color: ${textMuted};
  margin-bottom: 4px;
`;

const Price = styled.p<ThemeProps>`
  font-size: 2rem;
  line-height: 1.1;
  letter-spacing: -0.02em;
  font-weight: 800;
  color: ${textStrong};
`;

const ButtonsRow = styled.div`
  display: grid;
  gap: 10px;
`;

const CardButton = styled(PrimaryButton)`
  min-height: 54px;
`;

const OtomotoLink = styled(SecondaryButton)`
  min-height: 54px;
`;

const DetailsGrid = styled.div`
  display: grid;
  gap: 20px;
  margin-top: 28px;
`;

const SectionCard = styled.article<ThemeProps>`
  background: ${surface};
  border: 1px solid ${border};
  border-radius: 24px;
  padding: 28px;
  box-shadow: ${cardShadow};

  @media (max-width: 767px) {
    padding: 20px;
    border-radius: 18px;
  }
`;

const SectionHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 18px;
`;

const SectionTitleRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
`;

const SectionIcon = styled.span<ThemeProps>`
  display: inline-flex;
  width: 34px;
  height: 34px;
  border-radius: 11px;
  align-items: center;
  justify-content: center;
  color: ${accent};
  background: ${accentSoft};
`;

const SectionTitle = styled.h3<ThemeProps>`
  font-size: 1.2rem;
  letter-spacing: -0.01em;
  color: ${textStrong};
`;

const DescriptionBody = styled.div`
  max-width: 820px;
`;

const DescriptionParagraph = styled.p<ThemeProps>`
  color: ${textBody};
  font-size: 1rem;
  line-height: 1.75;
  margin-bottom: 14px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ExpandButton = styled.button<ThemeProps>`
  border-radius: 999px;
  border: 1px solid ${borderStrong};
  background: transparent;
  color: ${textStrong};
  padding: 8px 16px;
  font: inherit;
  font-size: 0.84rem;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: ${surfaceMuted};
  }
`;

const EquipmentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 12px;
`;

const EquipmentSection = styled.section<ThemeProps>`
  border-radius: 18px;
  background: ${surfaceMuted};
  padding: 18px;
`;

const EquipmentSectionTitle = styled.h4<ThemeProps>`
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 12px;
  color: ${accent};
`;

const EquipmentList = styled.ul<ThemeProps>`
  display: grid;
  gap: 9px;
  list-style: none;
  color: ${textBody};
  line-height: 1.5;
  font-size: 0.92rem;

  li {
    position: relative;
    padding-left: 22px;
  }

  li::before {
    content: "";
    position: absolute;
    left: 2px;
    top: 0.32em;
    width: 12px;
    height: 12px;
    border-radius: 999px;
    background: ${accent};
    opacity: 0.18;
  }

  li::after {
    content: "";
    position: absolute;
    left: 6px;
    top: calc(0.32em + 4px);
    width: 4px;
    height: 4px;
    border-radius: 999px;
    background: ${accent};
  }
`;

const SPEC_ICONS = {
  engine: (
    <Icon size={16}>
      <path d="M4 10h2V8h4V6h4v2h3l2 3v5h-2v2h-4l-2-2H8v-2H6v2H4z" />
    </Icon>
  ),
  power: (
    <Icon size={16}>
      <path d="M13 3 5 14h6l-1 7 8-11h-6z" />
    </Icon>
  ),
  mileage: (
    <Icon size={16}>
      <path d="M4 17a8 8 0 1 1 16 0" />
      <path d="m12 17 4-5" />
    </Icon>
  ),
  gearbox: (
    <Icon size={16}>
      <circle cx="6" cy="6" r="2" />
      <circle cx="12" cy="6" r="2" />
      <circle cx="18" cy="6" r="2" />
      <path d="M6 8v10M12 8v10M18 8v4H6" />
    </Icon>
  ),
};

type CarModelPageProps = {
  isDarkMode: boolean;
  onToggleTheme: () => void;
};

export default function CarModelPage({ isDarkMode, onToggleTheme }: CarModelPageProps) {
  const { carSlug } = useParams<{ carSlug: string }>();
  const [car, setCar] = useState<CarOffer | null>(null);
  const [loadedSlug, setLoadedSlug] = useState<string | null>(null);
  const [activePhoto, setActivePhoto] = useState("");
  const [contactCar, setContactCar] = useState<string | null>(null);
  const [showFullEquipment, setShowFullEquipment] = useState(false);

  useEffect(() => {
    if (!carSlug) {
      return;
    }

    let cancelled = false;
    fetchCar(carSlug)
      .then((found) => found ?? CARS_BY_SLUG[carSlug] ?? null)
      .catch(() => CARS_BY_SLUG[carSlug] ?? null)
      .then((next) => {
        if (cancelled) {
          return;
        }
        setCar(next);
        setLoadedSlug(carSlug);
        setActivePhoto(next?.gallery[0] ?? "");
      });

    return () => {
      cancelled = true;
    };
  }, [carSlug]);

  const isLoading = Boolean(carSlug) && loadedSlug !== carSlug;

  if (!carSlug) {
    return (
      <Page>
        <Wrap>
          <p>Nie znaleziono samochodu.</p>
          <p>
            <Link to="/">Wróć do strony głównej</Link>
          </p>
        </Wrap>
      </Page>
    );
  }

  if (isLoading) {
    return (
      <Page>
        <Wrap>
          <p>Ładowanie oferty...</p>
        </Wrap>
      </Page>
    );
  }

  if (!car) {
    return (
      <Page>
        <Wrap>
          <p>Nie znaleziono samochodu.</p>
          <p>
            <Link to="/">Wróć do strony głównej</Link>
          </p>
        </Wrap>
      </Page>
    );
  }

  const visibleEquipmentSections = showFullEquipment
    ? car.equipmentSections
    : car.equipmentSections.slice(0, 3);
  const activePhotoIndex = car.gallery.indexOf(activePhoto);
  const specs = [
    { key: "engine", label: "Pojemność silnika", value: car.engine },
    { key: "power", label: "Moc", value: car.power },
    { key: "mileage", label: "Przebieg", value: car.mileage },
    { key: "gearbox", label: "Skrzynia biegów", value: car.gearbox },
  ] as const;

  return (
    <Page>
      <SiteNavigation
        isDarkMode={isDarkMode}
        onToggleTheme={onToggleTheme}
      />
      <Wrap>
        <BackLink to="/" $isDark={isDarkMode}>
          ← Wróć do oferty
        </BackLink>
        <Header>
          <Title $isDark={isDarkMode}>
            {car.brand} {car.model}
          </Title>
          <Subtitle $isDark={isDarkMode}>
            Szczegółowa karta pojazdu. Możesz spokojnie przejrzeć zdjęcia i specyfikację.
          </Subtitle>
        </Header>
        <Showcase id="gallery">
          <Gallery>
            <MainImageFrame $isDark={isDarkMode}>
              <MainImage src={activePhoto} alt={`${car.brand} ${car.model}`} />
              <ImageOverlay>
                <CarTag>{car.tag}</CarTag>
                {car.gallery.length > 1 && activePhotoIndex >= 0 ? (
                  <PhotoCounter>
                    {activePhotoIndex + 1} / {car.gallery.length}
                  </PhotoCounter>
                ) : null}
              </ImageOverlay>
            </MainImageFrame>
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
          <SummaryCard $isDark={isDarkMode}>
            <SummaryHead>
              <Brand $isDark={isDarkMode}>{car.brand}</Brand>
              <CarName $isDark={isDarkMode}>{car.model}</CarName>
              <Meta $isDark={isDarkMode}>Rok produkcji: {car.year}</Meta>
            </SummaryHead>
            <SpecsGrid>
              {specs.map((spec) => (
                <SpecItem key={spec.key} $isDark={isDarkMode}>
                  <SpecIcon $isDark={isDarkMode}>{SPEC_ICONS[spec.key]}</SpecIcon>
                  <div>
                    <SpecLabel $isDark={isDarkMode}>{spec.label}</SpecLabel>
                    <SpecValue $isDark={isDarkMode}>{spec.value}</SpecValue>
                  </div>
                </SpecItem>
              ))}
            </SpecsGrid>
            <PriceBlock $isDark={isDarkMode}>
              <PriceLabel $isDark={isDarkMode}>Cena</PriceLabel>
              <Price $isDark={isDarkMode}>{car.price}</Price>
            </PriceBlock>
            <ButtonsRow>
              <CardButton
                id="contact"
                type="button"
                $isDark={isDarkMode}
                onClick={() => setContactCar(`${car.brand} ${car.model}`)}
              >
                Zapytaj o to auto
              </CardButton>
              {car.otomotoUrl && (
                <OtomotoLink
                  as="a"
                  $isDark={isDarkMode}
                  href={car.otomotoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Zobacz na Otomoto
                </OtomotoLink>
              )}
            </ButtonsRow>
          </SummaryCard>
        </Showcase>
        <DetailsGrid>
          <SectionCard $isDark={isDarkMode}>
            <SectionHead>
              <SectionTitleRow>
                <SectionIcon $isDark={isDarkMode}>
                  <Icon size={16}>
                    <path d="M6 3h9l4 4v14H6z" />
                    <path d="M9 12h7M9 16h5" />
                  </Icon>
                </SectionIcon>
                <SectionTitle $isDark={isDarkMode}>Opis pojazdu</SectionTitle>
              </SectionTitleRow>
            </SectionHead>
            <DescriptionBody>
              {car.detailedDescription.map((paragraph) => (
                <DescriptionParagraph $isDark={isDarkMode} key={paragraph}>
                  {paragraph}
                </DescriptionParagraph>
              ))}
            </DescriptionBody>
          </SectionCard>
          <SectionCard $isDark={isDarkMode}>
            <SectionHead>
              <SectionTitleRow>
                <SectionIcon $isDark={isDarkMode}>
                  <Icon size={16}>
                    <path d="M4 7h16M6 12h12M8 17h8" />
                  </Icon>
                </SectionIcon>
                <SectionTitle $isDark={isDarkMode}>Wyposażenie</SectionTitle>
              </SectionTitleRow>
              {car.equipmentSections.length > 3 ? (
                <ExpandButton
                  type="button"
                  $isDark={isDarkMode}
                  onClick={() => setShowFullEquipment((prev) => !prev)}
                >
                  {showFullEquipment ? "Pokaż mniej" : "Więcej"}
                </ExpandButton>
              ) : null}
            </SectionHead>
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
          </SectionCard>
        </DetailsGrid>
      </Wrap>
      <SiteFooter isDarkMode={isDarkMode} />
      {contactCar ? (
        <ContactModal
          isDarkMode={isDarkMode}
          carName={contactCar}
          onClose={() => setContactCar(null)}
        />
      ) : null}
    </Page>
  );
}
