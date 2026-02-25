import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { SiteFooter, SiteNavigation } from "./components/SiteChrome";
import workImg from "./assets/work.png";

const ACCENT_COLOR = "#00573F";
const ACCENT_COLOR_DARK = "#33c39b";

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

const IntroSection = styled(Section)`
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

const IntroCard = styled.article<{ $isDark: boolean }>`
  background: ${({ $isDark }) => ($isDark ? "#161f1c" : "white")};
  border: 1px solid ${({ $isDark }) => ($isDark ? "#2f3f39" : "#d8d8d8")};
  border-radius: 28px;
  padding: 42px;

  @media (max-width: 767px) {
    padding: 30px 22px;
    border-radius: 20px;
  }
`;

const PageTitle = styled.h1`
  font-size: clamp(2rem, 3.6vw, 3.5rem);
  line-height: 1.05;
  letter-spacing: -0.03em;
  margin-bottom: 16px;
`;

const IntroText = styled.p<{ $isDark: boolean }>`
  color: ${({ $isDark }) => ($isDark ? "#c0cbc8" : "#515151")};
  font-size: 1.06rem;
  line-height: 1.6;
  max-width: 62ch;
`;

const IntroImage = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  max-height: 350px;
  object-fit: cover;
  border-radius: 28px;

  @media (max-width: 767px) {
    border-radius: 20px;
  }
`;

const ContentSection = styled(Section)`
  margin-bottom: 78px;
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

const AccordionList = styled.div`
  display: grid;
  gap: 10px;
`;

const AccordionItem = styled.article<{ $isDark: boolean; $isOpen: boolean }>`
  background: ${({ $isDark }) => ($isDark ? "#161f1c" : "white")};
  border: 1px solid
    ${({ $isDark, $isOpen }) =>
      $isOpen
        ? $isDark
          ? "#3d5a52"
          : "#b9cdc6"
        : $isDark
        ? "#2f3f39"
        : "#dadada"};
  border-radius: 16px;
  overflow: hidden;
  transition: border-color 0.2s ease;
`;

const AccordionHeader = styled.button<{ $isDark: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 22px;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  color: inherit;
`;

const AccordionTitle = styled.h3`
  font-size: 1.1rem;
`;

const ChevronIcon = styled.svg<{ $isOpen: boolean }>`
  flex-shrink: 0;
  color: ${ACCENT_COLOR};
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
  padding: 0 22px 22px;
`;

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 10px;

  @media (max-width: 1023px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const StepCard = styled.div<{ $isDark: boolean }>`
  background: ${({ $isDark }) => ($isDark ? "#111918" : "#f8faf9")};
  border: 1px solid ${({ $isDark }) => ($isDark ? "#2f3f39" : "#e4ecea")};
  border-radius: 12px;
  padding: 14px 16px;
`;

const StepNum = styled.p<{ $isDark: boolean }>`
  color: ${({ $isDark }) => ($isDark ? ACCENT_COLOR_DARK : ACCENT_COLOR)};
  font-size: 0.78rem;
  font-weight: 700;
  margin-bottom: 8px;
`;

const StepTitle = styled.h4`
  font-size: 0.95rem;
  margin-bottom: 6px;
`;

const StepDesc = styled.p<{ $isDark: boolean }>`
  color: ${({ $isDark }) => ($isDark ? "#aeb8b4" : "#5b5b5b")};
  font-size: 0.88rem;
  line-height: 1.5;
`;

const ResultCard = styled.div<{ $isDark: boolean }>`
  background: ${({ $isDark }) => ($isDark ? "#111918" : "#f8faf9")};
  border: 1px solid ${({ $isDark }) => ($isDark ? "#2f3f39" : "#e4ecea")};
  border-radius: 12px;
  padding: 12px 16px;
`;

const ResultText = styled.p<{ $isDark: boolean }>`
  color: ${({ $isDark }) => ($isDark ? "#aeb8b4" : "#5b5b5b")};
  font-size: 0.9rem;
  line-height: 1.5;
`;

const VerifyCard = styled.div<{ $isDark: boolean }>`
  background: ${({ $isDark }) => ($isDark ? "#161f1c" : "white")};
  border: 1px solid ${({ $isDark }) => ($isDark ? "#2f3f39" : "#dadada")};
  border-radius: 16px;
  padding: 22px;
`;

const VerifyList = styled.ul<{ $isDark: boolean }>`
  padding: 4px 4px 4px 22px;
  display: grid;
  gap: 8px;
  color: ${({ $isDark }) => ($isDark ? "#aeb8b4" : "#5b5b5b")};
  line-height: 1.55;
`;

const CtaCard = styled.article<{ $isDark: boolean }>`
  background: ${({ $isDark }) => ($isDark ? "#161f1c" : "white")};
  border: 1px solid ${({ $isDark }) => ($isDark ? "#2f3f39" : "#d8d8d8")};
  border-radius: 16px;
  padding: 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const CtaText = styled.p<{ $isDark: boolean }>`
  color: ${({ $isDark }) => ($isDark ? "#c0cbc8" : "#515151")};
  line-height: 1.5;
`;

const CtaLink = styled(Link)`
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
  white-space: nowrap;
`;

const CtaLinkDark = styled(CtaLink)`
  background: ${ACCENT_COLOR_DARK};
  color: #0c1613;
  border-color: ${ACCENT_COLOR_DARK};
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
  const Cta = isDarkMode ? CtaLinkDark : CtaLink;

  return (
    <Page>
      <SiteNavigation isDarkMode={isDarkMode} onToggleTheme={onToggleTheme} />

      <IntroSection>
        <IntroCard $isDark={isDarkMode}>
          <PageTitle>Jak działamy</PageTitle>
          <IntroText $isDark={isDarkMode}>
            CarMentor prowadzi klienta od pierwszego zapytania do bezpiecznego
            zakupu lub sprzedaży. Wybierz usługę, żeby zobaczyć szczegółowy
            proces współpracy.
          </IntroText>
        </IntroCard>
        <IntroImage src={workImg} alt="Konsultacja CarMentor" />
      </IntroSection>

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
                  <AccordionTitle>{process.title}</AccordionTitle>
                  <ChevronIcon
                    $isOpen={isOpen}
                    width="18"
                    height="18"
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
                            <StepTitle>{step.title}</StepTitle>
                            <StepDesc $isDark={isDarkMode}>
                              {step.desc}
                            </StepDesc>
                          </StepCard>
                        ))}
                      </StepsGrid>
                      <ResultCard $isDark={isDarkMode}>
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
        <VerifyCard $isDark={isDarkMode}>
          <VerifyList $isDark={isDarkMode}>
            <li>VIN i historię pojazdu</li>
            <li>Szkody i naprawy</li>
            <li>Przebieg i spójność dokumentów</li>
            <li>Serwis i stan eksploatacyjny</li>
            <li>Komplet dokumentów do zakupu</li>
          </VerifyList>
        </VerifyCard>
      </ContentSection>

      <ContentSection>
        <CtaCard $isDark={isDarkMode}>
          <CtaText $isDark={isDarkMode}>
            Stawiamy na bezpieczeństwo zakupu i przejrzyste zasady. Weryfikujemy
            samochód, pokazujemy fakty i jasno mówimy, czy to dobry wybór.
            Prowadzimy Cię przez cały proces - od wyboru po finalizację,
            spokojnie i bez ryzyka.
          </CtaText>
          <Cta to="/kontakt">Umów konsultację</Cta>
        </CtaCard>
      </ContentSection>

      <SiteFooter isDarkMode={isDarkMode} />
    </Page>
  );
}
