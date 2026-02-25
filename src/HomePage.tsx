import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
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
};

const SERVICES: Service[] = [
  {
    title: "Auta używane od ręki",
    desc: "Sprawdzone samochody dostępne od razu. Transparentnie pokazujemy stan i historię oraz prowadzimy Cię przez formalności. Pomagamy również w finansowaniu (kredyt/leasing).",
    cta: "Poznaj proces zakupu",
    to: "/jak-dzialamy",
  },
  {
    title: "Wyszukanie auta na zamówienie",
    desc: "Szukamy auta pod Twoje wymagania i budżet. Weryfikujemy egzemplarz, omawiamy ryzyka i pomagamy w negocjacjach oraz zakupie. Wsparcie w finansowaniu (kredyt/leasing) w pakiecie.",
    cta: "Umów konsultację",
    to: "/kontakt",
  },
  {
    title: "Komis – sprzedaż Twojego samochodu",
    desc: "Zajmujemy się sprzedażą Twojego samochodu od A do Z: oferta, ogłoszenia, prezentacje i negocjacje. Ułatwiamy transakcję także przez pomoc kupującym w finansowaniu.",
    cta: "Oddaj auto w komis",
    to: "/kontakt",
  },
  {
    title: "Broker aut nowych",
    desc: "Pomagamy w zakupie nowych aut marek wolumenowych. Negocjujemy warunki i przeprowadzamy Cię przez cały proces zamówienia.",
    cta: "Dowiedz się więcej",
    to: "/kontakt",
  },
];

const ACCENT_COLOR = "#00573F";
const ACCENT_COLOR_DARK = "#33c39b";

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

const SecondaryButton = styled(PrimaryButton)`
  background: white;
  color: ${ACCENT_COLOR};
  border-color: ${ACCENT_COLOR};
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

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 28px;

  @media (max-width: 1023px) {
    height: auto;
    aspect-ratio: 1 / 1;
    max-height: 350px;
    border-radius: 20px;
  }
`;

const SectionHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 20px;
  margin-bottom: 24px;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
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

const CardButton = styled.button<{ $isDark: boolean }>`
  display: inline-flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  border: 1px solid
    ${({ $isDark }) => ($isDark ? ACCENT_COLOR_DARK : ACCENT_COLOR)};
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
  background: ${({ $isDark }) =>
    $isDark ? "rgba(6, 10, 9, 0.74)" : "rgba(0, 0, 0, 0.45)"};
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
  border: 1px solid
    ${({ $isDark }) => ($isDark ? ACCENT_COLOR_DARK : ACCENT_COLOR)};
  background: ${({ $isDark }) => ($isDark ? "#1f332d" : "#eaf6f2")};
  color: ${({ $isDark }) => ($isDark ? "#e8f4ef" : ACCENT_COLOR)};
  font-weight: 700;
`;

const ServicesSection = styled(Section)`
  margin-bottom: 78px;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled.article<{ $isDark: boolean }>`
  background: ${({ $isDark }) => ($isDark ? "#161f1c" : "white")};
  border: 1px solid ${({ $isDark }) => ($isDark ? "#2f3f39" : "#dadada")};
  border-radius: 16px;
  padding: 22px;
  display: flex;
  flex-direction: column;
`;

const ServiceTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 10px;
`;

const ServiceText = styled.p<{ $isDark: boolean }>`
  color: ${({ $isDark }) => ($isDark ? "#aeb8b4" : "#5b5b5b")};
  line-height: 1.55;
  flex: 1;
  margin-bottom: 16px;
`;

const ServiceLink = styled(Link)<{ $isDark: boolean }>`
  font-size: 0.9rem;
  font-weight: 700;
  color: ${({ $isDark }) => ($isDark ? ACCENT_COLOR_DARK : ACCENT_COLOR)};
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

type HomePageProps = {
  isDarkMode: boolean;
  onToggleTheme: () => void;
};

export default function HomePage({ isDarkMode, onToggleTheme }: HomePageProps) {
  const navigate = useNavigate();
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
      <SiteNavigation isDarkMode={isDarkMode} onToggleTheme={onToggleTheme} />

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

      <ServicesSection id="services">
        <SectionHead>
          <SectionTitle $isDark={isDarkMode}>Nasze usługi</SectionTitle>
        </SectionHead>
        <ServicesGrid>
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} $isDark={isDarkMode}>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceText $isDark={isDarkMode}>{service.desc}</ServiceText>
              <ServiceLink to={service.to} $isDark={isDarkMode}>
                {service.cta} →
              </ServiceLink>
            </ServiceCard>
          ))}
        </ServicesGrid>
      </ServicesSection>

      <CarsSection id="stock">
        <SectionHead>
          <SectionTitle $isDark={isDarkMode}>Oferta na dziś</SectionTitle>
          <SectionDesc $isDark={isDarkMode}>
            Sprawdzone auta gotowe do rozmowy. Każde ogłoszenie prowadzi do
            osobnej karty pojazdu ze zdjęciami i pełnym opisem.
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
          <SimpleImage
            src={VW_TIGUAN.gallery[0]}
            alt={`${VW_TIGUAN.brand} ${VW_TIGUAN.model}`}
          />
          <SimpleBody>
            <Tag>{VW_TIGUAN.tag}</Tag>
            <CarName>
              {VW_TIGUAN.brand} {VW_TIGUAN.model}
            </CarName>
            <Meta $isDark={isDarkMode}>
              {VW_TIGUAN.year} • {VW_TIGUAN.engine} • {VW_TIGUAN.power}
            </Meta>
            <CarDescription $isDark={isDarkMode}>
              {VW_TIGUAN.description}
            </CarDescription>
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
            Jeden proces niezależnie od tego, czy kupujesz auto ze stocku, czy
            szukasz modelu na zamówienie.
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
              <ModalTitle id="contact-modal-title">
                Skontaktuj się z nami
              </ModalTitle>
              <CloseButton
                type="button"
                $isDark={isDarkMode}
                onClick={() => setContactCar(null)}
              >
                Zamknij
              </CloseButton>
            </ModalHead>
            <ModalText $isDark={isDarkMode}>
              Wybierz preferowaną formę kontaktu dla auta:{" "}
              <strong>{contactCar}</strong>
            </ModalText>
            <ContactActions>
              <ContactLink
                $isDark={isDarkMode}
                href={`mailto:kontakt@carmentor.pl?subject=${emailSubject}`}
              >
                kontakt@carmentor.pl
              </ContactLink>
              <ContactLink $isDark={isDarkMode} href="tel:+48660488900">
                +48 660 488 900
              </ContactLink>
            </ContactActions>
          </ModalCard>
        </ModalOverlay>
      ) : null}
    </Page>
  );
}
