import { useEffect, useState, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import heroFallback from "./assets/pexels-gustavo-fring-4173194.jpg";
import { fetchCars, VW_TIGUAN, type CarOffer } from "./cars";
import { SiteFooter, SiteNavigation } from "./components/SiteChrome";
import {
  CarTag,
  Card,
  ContactModal,
  Container,
  Icon,
  IconBadge,
  PrimaryButton,
  SectionDesc,
  SectionHead,
  SectionTitle,
} from "./components/ui";
import {
  accent,
  accentSoft,
  border,
  cardShadow,
  cardShadowHover,
  surface,
  surfaceMuted,
  textBody,
  textMuted,
  textStrong,
  type ThemeProps,
} from "./theme";

const HERO_ROTATE_MS = 5000;
const HERO_FADE_MS = 1100;

type Step = {
  num: string;
  title: string;
  desc: string;
};

const STEPS: Step[] = [
  {
    num: "01",
    title: "Wyślij zapytanie",
    desc: "Powiedz nam, jakiego auta szukasz - lub wklej link z ogłoszenia.",
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

type Service = {
  title: string;
  desc: string;
  cta: string;
  to: string;
  icon: ReactNode;
};

const SERVICES: Service[] = [
  {
    title: "Auta używane od ręki",
    desc: "Sprawdzone samochody dostępne od razu. Transparentnie pokazujemy stan i historię oraz prowadzimy Cię przez formalności. Pomagamy również w finansowaniu (kredyt/leasing).",
    cta: "Poznaj proces zakupu",
    to: "/jak-dzialamy",
    icon: (
      <Icon>
        <path d="M5 17h14l-1.5-6.5A2 2 0 0 0 15.6 9H8.4a2 2 0 0 0-1.9 1.5z" />
        <circle cx="7.5" cy="17.5" r="1.5" />
        <circle cx="16.5" cy="17.5" r="1.5" />
      </Icon>
    ),
  },
  {
    title: "Wyszukanie auta na zamówienie",
    desc: "Szukamy auta pod Twoje wymagania i budżet. Weryfikujemy egzemplarz, omawiamy ryzyka i pomagamy w negocjacjach oraz zakupie. Wsparcie w finansowaniu (kredyt/leasing) w pakiecie.",
    cta: "Umów konsultację",
    to: "/kontakt",
    icon: (
      <Icon>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </Icon>
    ),
  },
  {
    title: "Komis – sprzedaż Twojego samochodu",
    desc: "Zajmujemy się sprzedażą Twojego samochodu od A do Z: oferta, ogłoszenia, prezentacje i negocjacje. Ułatwiamy transakcję także przez pomoc kupującym w finansowaniu.",
    cta: "Oddaj auto w komis",
    to: "/kontakt",
    icon: (
      <Icon>
        <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z" />
        <circle cx="7.5" cy="7.5" r="1.5" />
      </Icon>
    ),
  },
  {
    title: "Broker aut nowych",
    desc: "Pomagamy w zakupie nowych aut marek wolumenowych. Negocjujemy warunki i przeprowadzamy Cię przez cały proces zamówienia.",
    cta: "Dowiedz się więcej",
    to: "/kontakt",
    icon: (
      <Icon>
        <path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.9z" />
      </Icon>
    ),
  },
];

const Page = styled.div`
  min-height: 100vh;
`;

const HeroSection = styled(Container)`
  padding-top: 24px;
  margin-bottom: 96px;

  @media (max-width: 767px) {
    padding-top: 14px;
    margin-bottom: 64px;
  }
`;

const Hero = styled.div<ThemeProps>`
  position: relative;
  overflow: hidden;
  min-height: min(78vh, 700px);
  border-radius: 32px;
  display: flex;
  align-items: flex-end;
  box-shadow: ${cardShadow};

  @media (max-width: 767px) {
    min-height: 620px;
    border-radius: 22px;
  }
`;

const HeroSlide = styled.img<{ $active: boolean }>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transform: scale(${({ $active }) => ($active ? 1.04 : 1)});
  transition:
    opacity ${HERO_FADE_MS}ms ease,
    transform ${HERO_ROTATE_MS}ms ease-out;
  will-change: opacity, transform;
  pointer-events: none;

  @media (prefers-reduced-motion: reduce) {
    transition: opacity 0.2s ease;
    transform: none;
  }
`;

const HeroShade = styled.div`
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      to top,
      rgba(4, 12, 9, 0.88) 0%,
      rgba(4, 12, 9, 0.35) 45%,
      rgba(4, 12, 9, 0.05) 75%
    ),
    linear-gradient(to right, rgba(4, 12, 9, 0.45), transparent 60%);
`;

const featuredFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const FeaturedFade = styled.div`
  display: grid;
  gap: 10px;
  animation: ${featuredFadeIn} 0.75s ease both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const HeroDots = styled.div`
  position: absolute;
  z-index: 2;
  left: 50%;
  bottom: 22px;
  display: flex;
  gap: 8px;
  transform: translateX(-50%);

  @media (max-width: 767px) {
    bottom: 16px;
  }
`;

const HeroDot = styled.button<{ $active: boolean }>`
  width: ${({ $active }) => ($active ? "22px" : "8px")};
  height: 8px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  cursor: pointer;
  background: ${({ $active }) =>
    $active ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0.35)"};
  transition:
    width 0.35s ease,
    background 0.35s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.75);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: background 0.2s ease;
    width: 8px;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 32px;
  padding: 56px;

  @media (max-width: 1023px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 40px 32px;
  }

  @media (max-width: 767px) {
    padding: 28px 22px;
    gap: 24px;
  }
`;

const HeroCopy = styled.div`
  max-width: 640px;
  color: #ffffff;
`;

const HeroTitle = styled.h1`
  font-size: clamp(2.3rem, 5.4vw, 4.6rem);
  line-height: 1;
  letter-spacing: -0.045em;
  font-weight: 800;
  margin-bottom: 18px;
`;

const HeroText = styled.p`
  color: rgba(255, 255, 255, 0.82);
  font-size: 1.12rem;
  line-height: 1.6;
  max-width: 50ch;
`;

const CtaRow = styled.div`
  margin-top: 30px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const HeroGhostButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  padding: 12px 22px;
  border-radius: 14px;
  font-size: 0.96rem;
  font-weight: 700;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.28);
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const FeaturedCard = styled(Link)`
  flex-shrink: 0;
  display: grid;
  gap: 10px;
  width: min(320px, 100%);
  padding: 20px;
  border-radius: 20px;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(14px);

  &:hover {
    background: rgba(255, 255, 255, 0.16);
  }

  @media (max-width: 767px) {
    display: none;
  }
`;

const FeaturedName = styled.p`
  font-size: 1.05rem;
  font-weight: 700;
  line-height: 1.35;
`;

const FeaturedPrice = styled.p`
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.02em;
`;

const CarsSection = styled(Container)`
  margin-bottom: 104px;

  @media (max-width: 767px) {
    margin-bottom: 72px;
  }
`;

const CarsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 24px;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 18px;
  }
`;

const CarCard = styled.article<ThemeProps>`
  background: ${surface};
  border: 1px solid ${border};
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  box-shadow: ${cardShadow};
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${cardShadowHover};
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const CarImageFrame = styled.div<ThemeProps>`
  position: relative;
  overflow: hidden;
  aspect-ratio: 4 / 3;
  background: ${surfaceMuted};
`;

const CarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
`;

const CarImageTag = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
`;

const CarBody = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 22px 22px 24px;
`;

const CarBrand = styled.span<ThemeProps>`
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${accent};
  margin-bottom: 6px;
`;

const CarName = styled.h3<ThemeProps>`
  font-size: 1.35rem;
  line-height: 1.25;
  letter-spacing: -0.015em;
  color: ${textStrong};
  margin-bottom: 14px;
`;

const SpecChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const SpecChip = styled.span<ThemeProps>`
  font-size: 0.8rem;
  font-weight: 600;
  padding: 6px 10px;
  border-radius: 8px;
  color: ${textBody};
  background: ${surfaceMuted};
`;

const CarDescription = styled.p<ThemeProps>`
  margin-top: 14px;
  color: ${textBody};
  line-height: 1.6;
  font-size: 0.94rem;
  flex: 1;
`;

const CarFooter = styled.div<ThemeProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin-top: 20px;
  padding-top: 18px;
  border-top: 1px solid ${border};

  @media (max-width: 420px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Price = styled.p<ThemeProps>`
  font-size: 1.55rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: ${textStrong};
`;

const EmptyState = styled.p<ThemeProps>`
  color: ${textMuted};
`;

const ServicesSection = styled(Container)`
  margin-bottom: 104px;

  @media (max-width: 767px) {
    margin-bottom: 72px;
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 14px;
  }
`;

const ServiceCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ServiceTitle = styled.h3<ThemeProps>`
  font-size: 1.2rem;
  letter-spacing: -0.01em;
  color: ${textStrong};
`;

const ServiceText = styled.p<ThemeProps>`
  color: ${textBody};
  line-height: 1.65;
  flex: 1;
`;

const ServiceLink = styled(Link)<ThemeProps>`
  align-self: flex-start;
  font-size: 0.92rem;
  font-weight: 700;
  color: ${accent};
  padding: 8px 14px;
  margin-left: -14px;
  border-radius: 999px;

  &:hover {
    background: ${accentSoft};
  }
`;

const StepsSection = styled(Container)`
  margin-bottom: 104px;

  @media (max-width: 767px) {
    margin-bottom: 72px;
  }
`;

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;

  @media (max-width: 1023px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 14px;
  }
`;

const StepCard = styled(Card)`
  position: relative;
  overflow: hidden;
`;

const StepNum = styled.p<ThemeProps>`
  font-size: 3rem;
  line-height: 1;
  font-weight: 800;
  letter-spacing: -0.04em;
  color: ${accent};
  opacity: 0.9;
  margin-bottom: 18px;
`;

const StepTitle = styled.h3<ThemeProps>`
  font-size: 1.1rem;
  color: ${textStrong};
  margin-bottom: 8px;
`;

const StepDesc = styled.p<ThemeProps>`
  color: ${textBody};
  line-height: 1.6;
`;

type HomePageProps = {
  isDarkMode: boolean;
  onToggleTheme: () => void;
};

function heroImageFor(car: CarOffer): string {
  return car.gallery[1] ?? car.gallery[0] ?? "";
}

export default function HomePage({ isDarkMode, onToggleTheme }: HomePageProps) {
  const navigate = useNavigate();
  const [contactCar, setContactCar] = useState<string | null>(null);
  const [cars, setCars] = useState<CarOffer[]>([VW_TIGUAN]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);

  useEffect(() => {
    fetchCars()
      .then((next) => {
        setCars(next);
        setActiveIndex(0);
      })
      .catch(() => {
        setCars([VW_TIGUAN]);
        setActiveIndex(0);
      });
  }, []);

  useEffect(() => {
    if (cars.length <= 1 || heroPaused) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const id = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % cars.length);
    }, HERO_ROTATE_MS);

    return () => window.clearInterval(id);
  }, [cars.length, heroPaused, activeIndex]);

  const featured = cars[activeIndex] ?? null;
  const hasCars = cars.length > 0;

  return (
    <Page>
      <SiteNavigation isDarkMode={isDarkMode} onToggleTheme={onToggleTheme} />

      <HeroSection>
        <Hero
          $isDark={isDarkMode}
          onMouseEnter={() => setHeroPaused(true)}
          onMouseLeave={() => setHeroPaused(false)}
          onFocusCapture={() => setHeroPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node)) {
              setHeroPaused(false);
            }
          }}
        >
          {hasCars ? (
            cars.map((car, index) => (
              <HeroSlide
                key={car.slug}
                src={heroImageFor(car)}
                alt=""
                aria-hidden={index !== activeIndex}
                $active={index === activeIndex}
              />
            ))
          ) : (
            <HeroSlide
              src={heroFallback}
              alt=""
              aria-hidden="true"
              $active
            />
          )}
          <HeroShade />
          <HeroContent>
            <HeroCopy>
              <HeroTitle>Profesjonalne wsparcie przy zakupie auta.</HeroTitle>
              <HeroText>
                {hasCars
                  ? "Auta od ręki, komis i auta na zamówienie. Jasne zasady, rzetelna weryfikacja, bez niespodzianek."
                  : "Aktualnie kompletujemy ofertę. W międzyczasie pomożemy znaleźć auto na zamówienie albo przyjąć Twoje w komis."}
              </HeroText>
              <CtaRow>
                <PrimaryButton as="a" href="#stock" $isDark>
                  Zobacz ofertę
                </PrimaryButton>
                {featured ? (
                  <HeroGhostButton to={`/samochod/${featured.slug}`}>
                    Zobacz samochód
                  </HeroGhostButton>
                ) : (
                  <HeroGhostButton to="/kontakt">
                    Umów konsultację
                  </HeroGhostButton>
                )}
              </CtaRow>
            </HeroCopy>
            {featured ? (
              <FeaturedCard
                to={`/samochod/${featured.slug}`}
                aria-label={`${featured.brand} ${featured.model}, ${featured.price}`}
              >
                <FeaturedFade key={featured.slug}>
                  <div>
                    <CarTag>{featured.tag}</CarTag>
                  </div>
                  <FeaturedName>
                    {featured.brand} {featured.model}
                  </FeaturedName>
                  <FeaturedPrice>{featured.price}</FeaturedPrice>
                </FeaturedFade>
              </FeaturedCard>
            ) : null}
          </HeroContent>
          {cars.length > 1 ? (
            <HeroDots role="tablist" aria-label="Samochody w ofercie">
              {cars.map((car, index) => (
                <HeroDot
                  key={car.slug}
                  type="button"
                  role="tab"
                  aria-selected={index === activeIndex}
                  aria-label={`${car.brand} ${car.model}`}
                  $active={index === activeIndex}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </HeroDots>
          ) : null}
        </Hero>
      </HeroSection>

      <CarsSection id="stock">
        <SectionHead>
          <SectionTitle $isDark={isDarkMode}>
            Samochody dostępne od ręki
          </SectionTitle>
          <SectionDesc $isDark={isDarkMode}>
            Sprawdzone auta gotowe do rozmowy. Każde ogłoszenie prowadzi do
            osobnej karty pojazdu ze zdjęciami i pełnym opisem.
          </SectionDesc>
        </SectionHead>
        {cars.length === 0 ? (
          <EmptyState $isDark={isDarkMode}>
            Aktualnie brak aut w ofercie.
          </EmptyState>
        ) : (
          <CarsGrid>
            {cars.map((car) => (
              <CarCard
                key={car.slug}
                $isDark={isDarkMode}
                role="link"
                tabIndex={0}
                onClick={() => navigate(`/samochod/${car.slug}`)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    navigate(`/samochod/${car.slug}`);
                  }
                }}
                aria-label={`Przejdz do karty auta ${car.brand} ${car.model}`}
              >
                <CarImageFrame $isDark={isDarkMode}>
                  <CarImage
                    src={car.gallery[0]}
                    alt={`${car.brand} ${car.model}`}
                  />
                  <CarImageTag>
                    <CarTag>{car.tag}</CarTag>
                  </CarImageTag>
                </CarImageFrame>
                <CarBody>
                  <CarBrand $isDark={isDarkMode}>{car.brand}</CarBrand>
                  <CarName $isDark={isDarkMode}>{car.model}</CarName>
                  <SpecChips>
                    <SpecChip $isDark={isDarkMode}>{car.year}</SpecChip>
                    <SpecChip $isDark={isDarkMode}>{car.engine}</SpecChip>
                    <SpecChip $isDark={isDarkMode}>{car.power}</SpecChip>
                  </SpecChips>
                  <CarDescription $isDark={isDarkMode}>
                    {car.description}
                  </CarDescription>
                  <CarFooter $isDark={isDarkMode}>
                    <Price $isDark={isDarkMode}>{car.price}</Price>
                    <PrimaryButton
                      type="button"
                      $isDark={isDarkMode}
                      onClick={(event) => {
                        event.stopPropagation();
                        setContactCar(`${car.brand} ${car.model}`);
                      }}
                    >
                      Zapytaj o to auto
                    </PrimaryButton>
                  </CarFooter>
                </CarBody>
              </CarCard>
            ))}
          </CarsGrid>
        )}
      </CarsSection>

      <ServicesSection id="services">
        <SectionHead>
          <SectionTitle $isDark={isDarkMode}>Nasze usługi</SectionTitle>
        </SectionHead>
        <ServicesGrid>
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} $isDark={isDarkMode}>
              <IconBadge $isDark={isDarkMode}>{service.icon}</IconBadge>
              <ServiceTitle $isDark={isDarkMode}>{service.title}</ServiceTitle>
              <ServiceText $isDark={isDarkMode}>{service.desc}</ServiceText>
              <ServiceLink to={service.to} $isDark={isDarkMode}>
                {service.cta} →
              </ServiceLink>
            </ServiceCard>
          ))}
        </ServicesGrid>
      </ServicesSection>

      <StepsSection id="how">
        <SectionHead>
          <SectionTitle $isDark={isDarkMode}>Jak działamy</SectionTitle>
          <SectionDesc $isDark={isDarkMode}>
            Jeden proces niezależnie od tego, czy kupujesz auto ze stocku, czy
            szukasz modelu na zamówienie.
          </SectionDesc>
        </SectionHead>
        <StepsGrid>
          {STEPS.map((step) => (
            <StepCard key={step.num} $isDark={isDarkMode}>
              <StepNum $isDark={isDarkMode}>{step.num}</StepNum>
              <StepTitle $isDark={isDarkMode}>{step.title}</StepTitle>
              <StepDesc $isDark={isDarkMode}>{step.desc}</StepDesc>
            </StepCard>
          ))}
        </StepsGrid>
      </StepsSection>

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
