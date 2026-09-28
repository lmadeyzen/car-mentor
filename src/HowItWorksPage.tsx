import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { SiteFooter, SiteNavigation } from "./components/SiteChrome";
import {
  Container,
  Icon,
  IconBadge,
  PageIntro,
  PrimaryButton,
  SectionDesc,
  SectionHead,
  SectionTitle,
} from "./components/ui";
import {
  accent,
  accentSoft,
  border,
  borderStrong,
  cardShadow,
  pick,
  surface,
  surfaceMuted,
  textBody,
  textStrong,
  type ThemeProps,
} from "./theme";
import workImg from "./assets/work.png";

type ProcessStep = {
  title: string;
  desc: string;
};

type Process = {
  id: string;
  title: string;
  steps: ProcessStep[];
  result: string;
};

const PROCESSES: Process[] = [
  {
    id: "stock",
    title: "Auta używane od ręki",
    steps: [
      {
        title: "Wybór pojazdu i kontakt",
        desc: "Wskazujesz auto z naszej oferty, umawiamy termin.",
      },
      {
        title: "Transparentna prezentacja informacji",
        desc: "Przedstawiamy stan, historię, wyposażenie oraz realne uwagi do pojazdu.",
      },
      {
        title: "Oględziny i jazda próbna",
        desc: "Możliwość spokojnej weryfikacji bez presji.",
      },
      {
        title: "Finansowanie i formalności",
        desc: "Pomagamy dobrać formę finansowania (kredyt/leasing) i przygotować wymagane dokumenty.",
      },
      {
        title: "Finalizacja i odbiór",
        desc: "Sprawny, uporządkowany proces do momentu wydania auta.",
      },
    ],
    result:
      "Kupujesz samochód z pełnym obrazem stanu i jasnymi warunkami transakcji.",
  },
  {
    id: "komis",
    title: "Sprzedaż komisowa",
    steps: [
      {
        title: "Wycena i strategia sprzedaży",
        desc: "Analiza rynku, rekomendacja ceny i planu działania.",
      },
      {
        title: "Przygotowanie oferty",
        desc: "Zdjęcia, opis, publikacja ogłoszeń i obsługa zapytań.",
      },
      {
        title: "Prezentacje i negocjacje",
        desc: "Umawianie spotkań, jazdy próbne, prowadzenie rozmów z klientami.",
      },
      {
        title: "Wsparcie dla kupującego w finansowaniu",
        desc: "Pomagamy zainteresowanym klientom w uzyskaniu finansowania (kredyt/leasing), co przyspiesza sprzedaż.",
      },
      {
        title: "Bezpieczna finalizacja i rozliczenie",
        desc: "Umowa, płatność, przekazanie pojazdu oraz przejrzyste rozliczenie komisowe.",
      },
    ],
    result:
      "Oszczędzasz czas, a sprzedaż jest prowadzona profesjonalnie od A do Z.",
  },
  {
    id: "zamowienie",
    title: "Wyszukanie samochodu na zamówienie",
    steps: [
      {
        title: "Brief zakupowy",
        desc: "Budżet, preferencje, priorytety i oczekiwania (must-have / nice-to-have).",
      },
      {
        title: "Selekcja i rekomendacje",
        desc: "Przedstawiamy propozycje wraz z uzasadnieniem wyboru.",
      },
      {
        title: "Weryfikacja egzemplarza",
        desc: "Analiza historii, stanu technicznego i potencjalnych ryzyk.",
      },
      {
        title: "Negocjacje, rezerwacja i finansowanie",
        desc: "Optymalizacja warunków zakupu oraz wsparcie w doborze i organizacji kredytu/leasingu.",
      },
      {
        title: "Finalizacja i odbiór",
        desc: "Wsparcie w dokumentach, płatności oraz przekazaniu auta.",
      },
    ],
    result:
      "Minimalizujesz ryzyko nietrafionego zakupu i podejmujesz decyzję na podstawie faktów.",
  },
  {
    id: "nowe",
    title: "Broker samochodów nowych",
    steps: [
      {
        title: "Ustalenie konfiguracji",
        desc: "Model, wersja, wyposażenie, preferowany termin i budżet.",
      },
      {
        title: "Pozyskanie ofert i dostępności",
        desc: "Porównanie wariantów oraz warunków (cena, termin, pakiety).",
      },
      {
        title: "Rekomendacja optymalnej opcji",
        desc: "Jasno wskazujemy różnice i rekomendujemy najlepszy wybór.",
      },
      {
        title: "Finansowanie i formalności",
        desc: "Pomagamy w wyborze finansowania (leasing/kredyt) oraz w dokumentach na etapie zamówienia i umowy.",
      },
      {
        title: "Koordynacja wydania pojazdu",
        desc: "Dopięcie procesu do odbioru auta.",
      },
    ],
    result:
      "Oszczędzasz czas i otrzymujesz uporządkowaną, porównywalną ofertę dopasowaną do potrzeb.",
  },
];

const VERIFY_ITEMS = [
  "VIN i historię pojazdu",
  "Szkody i naprawy",
  "Przebieg i spójność dokumentów",
  "Serwis i stan eksploatacyjny",
  "Komplet dokumentów do zakupu",
];

const Page = styled.div`
  min-height: 100vh;
`;

const ContentSection = styled(Container)`
  margin-bottom: 96px;

  @media (max-width: 767px) {
    margin-bottom: 64px;
  }
`;

const AccordionList = styled.div`
  display: grid;
  gap: 14px;
`;

const AccordionItem = styled.article<ThemeProps & { $isOpen: boolean }>`
  background: ${surface};
  border: 1px solid ${({ $isOpen, $isDark }) => ($isOpen ? borderStrong({ $isDark }) : border({ $isDark }))};
  border-radius: 22px;
  overflow: hidden;
  box-shadow: ${({ $isOpen, $isDark }) => ($isOpen ? cardShadow({ $isDark }) : "none")};
  transition: box-shadow 0.25s ease, border-color 0.25s ease;
`;

const AccordionHeader = styled.button<ThemeProps>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 22px 26px;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  color: ${textStrong};
  font: inherit;

  @media (max-width: 767px) {
    padding: 18px;
    gap: 14px;
  }
`;

const AccordionIndex = styled.span<ThemeProps & { $isOpen: boolean }>`
  display: inline-flex;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 14px;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: 800;
  color: ${({ $isOpen, $isDark }) => ($isOpen ? pick("#08130f", "#ffffff")({ $isDark }) : accent({ $isDark }))};
  background: ${({ $isOpen, $isDark }) => ($isOpen ? accent({ $isDark }) : accentSoft({ $isDark }))};
  transition: background 0.25s ease, color 0.25s ease;
`;

const AccordionTitle = styled.h3`
  flex: 1;
  font-size: clamp(1.05rem, 1.6vw, 1.3rem);
  letter-spacing: -0.01em;
`;

const ChevronIcon = styled.svg<ThemeProps & { $isOpen: boolean }>`
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  padding: 9px;
  border-radius: 999px;
  color: ${accent};
  background: ${surfaceMuted};
  transition: transform 0.28s ease;
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`;

const AccordionBodyWrapper = styled.div<{ $isOpen: boolean }>`
  display: grid;
  grid-template-rows: ${({ $isOpen }) => ($isOpen ? "1fr" : "0fr")};
  transition: grid-template-rows 0.32s ease;
`;

const AccordionBodyInner = styled.div`
  overflow: hidden;
`;

const AccordionBody = styled.div`
  padding: 4px 26px 26px;

  @media (max-width: 767px) {
    padding: 0 18px 18px;
  }
`;

const StepsGrid = styled.ol`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 14px;

  @media (max-width: 1023px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const StepCard = styled.li<ThemeProps>`
  background: ${surfaceMuted};
  border-radius: 16px;
  padding: 18px;
`;

const StepNum = styled.p<ThemeProps>`
  color: ${accent};
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  margin-bottom: 10px;
`;

const StepTitle = styled.h4<ThemeProps>`
  font-size: 0.98rem;
  line-height: 1.3;
  color: ${textStrong};
  margin-bottom: 6px;
`;

const StepDesc = styled.p<ThemeProps>`
  color: ${textBody};
  font-size: 0.88rem;
  line-height: 1.55;
`;

const ResultCard = styled.div<ThemeProps>`
  display: flex;
  align-items: center;
  gap: 14px;
  background: ${accentSoft};
  border-radius: 16px;
  padding: 16px 18px;
`;

const ResultText = styled.p<ThemeProps>`
  color: ${textStrong};
  font-size: 0.95rem;
  line-height: 1.55;
`;

const VerifyGrid = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px;
`;

const VerifyItem = styled.li<ThemeProps>`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 20px;
  border-radius: 20px;
  border: 1px solid ${border};
  background: ${surface};
  box-shadow: ${cardShadow};
  color: ${textStrong};
  font-weight: 600;
  line-height: 1.4;
`;

const CtaBanner = styled.article<ThemeProps>`
  position: relative;
  overflow: hidden;
  border-radius: 28px;
  padding: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  color: #ffffff;
  background:
    radial-gradient(circle at 85% 20%, rgba(51, 195, 155, 0.35), transparent 45%),
    ${pick("#10231c", "#00573F")};

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 28px 22px;
    border-radius: 20px;
  }
`;

const CtaText = styled.p`
  font-size: clamp(1.05rem, 1.6vw, 1.25rem);
  line-height: 1.6;
  max-width: 62ch;
  color: rgba(255, 255, 255, 0.9);
`;

type HowItWorksPageProps = {
  isDarkMode: boolean;
  onToggleTheme: () => void;
};

export default function HowItWorksPage({
  isDarkMode,
  onToggleTheme,
}: HowItWorksPageProps) {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  return (
    <Page>
      <SiteNavigation isDarkMode={isDarkMode} onToggleTheme={onToggleTheme} />

      <PageIntro
        isDarkMode={isDarkMode}
        title="Jak działamy"
        image={workImg}
        imageAlt="Konsultacja CarMentor"
      >
        CarMentor prowadzi klienta od pierwszego zapytania do bezpiecznego
        zakupu lub sprzedaży. Wybierz usługę, żeby zobaczyć szczegółowy
        proces współpracy.
      </PageIntro>

      <ContentSection>
        <SectionHead>
          <SectionTitle $isDark={isDarkMode}>Nasze usługi</SectionTitle>
          <SectionDesc $isDark={isDarkMode}>
            Kliknij, żeby zobaczyć szczegółowy proces.
          </SectionDesc>
        </SectionHead>
        <AccordionList>
          {PROCESSES.map((process, i) => {
            const isOpen = activeIdx === i;
            return (
              <AccordionItem
                key={process.id}
                $isDark={isDarkMode}
                $isOpen={isOpen}
              >
                <AccordionHeader
                  $isDark={isDarkMode}
                  onClick={() => setActiveIdx(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  <AccordionIndex $isDark={isDarkMode} $isOpen={isOpen}>
                    {String(i + 1).padStart(2, "0")}
                  </AccordionIndex>
                  <AccordionTitle>{process.title}</AccordionTitle>
                  <ChevronIcon
                    $isDark={isDarkMode}
                    $isOpen={isOpen}
                    viewBox="0 0 18 18"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 6.5L9 11.5L14 6.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </ChevronIcon>
                </AccordionHeader>
                <AccordionBodyWrapper $isOpen={isOpen}>
                  <AccordionBodyInner>
                    <AccordionBody>
                      <StepsGrid>
                        {process.steps.map((step, j) => (
                          <StepCard key={j} $isDark={isDarkMode}>
                            <StepNum $isDark={isDarkMode}>
                              {String(j + 1).padStart(2, "0")}
                            </StepNum>
                            <StepTitle $isDark={isDarkMode}>{step.title}</StepTitle>
                            <StepDesc $isDark={isDarkMode}>
                              {step.desc}
                            </StepDesc>
                          </StepCard>
                        ))}
                      </StepsGrid>
                      <ResultCard $isDark={isDarkMode}>
                        <IconBadge $isDark={isDarkMode}>
                          <Icon>
                            <path d="M20 6 9 17l-5-5" />
                          </Icon>
                        </IconBadge>
                        <ResultText $isDark={isDarkMode}>
                          <strong>Rezultat:</strong> {process.result}
                        </ResultText>
                      </ResultCard>
                    </AccordionBody>
                  </AccordionBodyInner>
                </AccordionBodyWrapper>
              </AccordionItem>
            );
          })}
        </AccordionList>
      </ContentSection>

      <ContentSection>
        <SectionHead>
          <SectionTitle $isDark={isDarkMode}>Co sprawdzamy</SectionTitle>
        </SectionHead>
        <VerifyGrid>
          {VERIFY_ITEMS.map((item) => (
            <VerifyItem key={item} $isDark={isDarkMode}>
              <IconBadge $isDark={isDarkMode}>
                <Icon>
                  <path d="M12 3 4 6v6c0 5 3.4 8.4 8 9 4.6-.6 8-4 8-9V6z" />
                  <path d="m9 12 2 2 4-4" />
                </Icon>
              </IconBadge>
              {item}
            </VerifyItem>
          ))}
        </VerifyGrid>
      </ContentSection>

      <ContentSection>
        <CtaBanner $isDark={isDarkMode}>
          <CtaText>
            Stawiamy na bezpieczeństwo zakupu i przejrzyste zasady. Weryfikujemy
            samochód, pokazujemy fakty i jasno mówimy, czy to dobry wybór.
            Prowadzimy Cię przez cały proces - od wyboru po finalizację,
            spokojnie i bez ryzyka.
          </CtaText>
          <PrimaryButton as={Link} to="/kontakt" $isDark>
            Umów konsultację
          </PrimaryButton>
        </CtaBanner>
      </ContentSection>

      <SiteFooter isDarkMode={isDarkMode} />
    </Page>
  );
}
