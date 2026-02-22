import { Link } from "react-router-dom";
import styled from "styled-components";
import { SiteFooter, SiteNavigation } from "./components/SiteChrome";

const ACCENT_COLOR = "#00573F";
const ACCENT_COLOR_DARK = "#33c39b";

const Page = styled.div`
  min-height: 100vh;
`;

const Wrap = styled.section`
  width: min(1180px, calc(100% - 48px));
  margin: 0 auto;
  padding: 30px 0 56px;

  @media (max-width: 767px) {
    width: calc(100% - 28px);
  }
`;

const IntroCard = styled.article<{ $isDark: boolean }>`
  border-radius: 20px;
  border: 1px solid ${({ $isDark }) => ($isDark ? "#2e3a36" : "#d8dfdc")};
  background: ${({ $isDark }) => ($isDark ? "#151b19" : "white")};
  padding: 24px;
  margin-bottom: 16px;
`;

const Eyebrow = styled.p<{ $isDark: boolean }>`
  font-size: 0.82rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-weight: 800;
  color: ${({ $isDark }) => ($isDark ? "#8fa59e" : "#6b7d76")};
  margin-bottom: 8px;
`;

const Title = styled.h1<{ $isDark: boolean }>`
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  color: ${({ $isDark }) => ($isDark ? "#ecf2f0" : "#1d2824")};
  margin-bottom: 10px;
`;

const IntroText = styled.p<{ $isDark: boolean }>`
  color: ${({ $isDark }) => ($isDark ? "#bcc8c4" : "#4e5b57")};
  line-height: 1.6;
  max-width: 68ch;
`;

const Section = styled.section`
  margin-top: 18px;
`;

const SectionTitle = styled.h2<{ $isDark: boolean }>`
  font-size: 1.35rem;
  color: ${({ $isDark }) => ($isDark ? "#e9efed" : "#1f2b27")};
  margin-bottom: 10px;
`;

const PathsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const PathCard = styled.article<{ $isDark: boolean }>`
  border-radius: 14px;
  border: 1px solid ${({ $isDark }) => ($isDark ? "#2e3a36" : "#d8dfdc")};
  background: ${({ $isDark }) => ($isDark ? "#151b19" : "white")};
  padding: 18px;
`;

const CardTitle = styled.h2<{ $isDark: boolean }>`
  font-size: 1.08rem;
  margin-bottom: 8px;
  color: ${({ $isDark }) => ($isDark ? "#e7efec" : "#1f2b27")};
`;

const CardText = styled.p<{ $isDark: boolean }>`
  color: ${({ $isDark }) => ($isDark ? "#b5c2be" : "#4f5d58")};
  line-height: 1.55;
`;

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const StepCard = styled.article<{ $isDark: boolean }>`
  border-radius: 14px;
  border: 1px solid ${({ $isDark }) => ($isDark ? "#2e3a36" : "#d8dfdc")};
  background: ${({ $isDark }) => ($isDark ? "#151b19" : "white")};
  padding: 14px;
`;

const Num = styled.span<{ $isDark: boolean }>`
  display: inline-flex;
  border-radius: 999px;
  padding: 3px 8px;
  background: ${({ $isDark }) => ($isDark ? "#24473b" : "#e3f2ec")};
  color: ${({ $isDark }) => ($isDark ? ACCENT_COLOR_DARK : ACCENT_COLOR)};
  font-size: 0.74rem;
  font-weight: 800;
  margin-bottom: 8px;
`;

const CheckCard = styled.article<{ $isDark: boolean }>`
  border-radius: 14px;
  border: 1px solid ${({ $isDark }) => ($isDark ? "#2e3a36" : "#d8dfdc")};
  background: ${({ $isDark }) => ($isDark ? "#151b19" : "white")};
  padding: 14px;
`;

const VerifyList = styled.ul<{ $isDark: boolean }>`
  padding: 16px 18px 16px 34px;
  display: grid;
  gap: 8px;
  color: ${({ $isDark }) => ($isDark ? "#bfcbc7" : "#475650")};
  line-height: 1.5;
`;

const CtaCard = styled.article<{ $isDark: boolean }>`
  margin-top: 18px;
  border-radius: 14px;
  border: 1px solid ${({ $isDark }) => ($isDark ? "#2e3a36" : "#d8dfdc")};
  background: ${({ $isDark }) => ($isDark ? "#151b19" : "white")};
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const CtaText = styled.p<{ $isDark: boolean }>`
  color: ${({ $isDark }) => ($isDark ? "#bfcbc7" : "#475650")};
`;

const CtaLink = styled(Link)<{ $isDark: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 11px;
  border: 1px solid ${({ $isDark }) => ($isDark ? ACCENT_COLOR_DARK : ACCENT_COLOR)};
  background: ${({ $isDark }) => ($isDark ? ACCENT_COLOR_DARK : ACCENT_COLOR)};
  color: ${({ $isDark }) => ($isDark ? "#10231c" : "white")};
  font-weight: 800;
  padding: 10px 14px;
`;

type HowItWorksPageProps = {
  isDarkMode: boolean;
  onToggleTheme: () => void;
};

export default function HowItWorksPage({ isDarkMode, onToggleTheme }: HowItWorksPageProps) {
  return (
    <Page>
      <SiteNavigation
        isDarkMode={isDarkMode}
        onToggleTheme={onToggleTheme}
      />
      <Wrap>
        <IntroCard $isDark={isDarkMode}>
          <Eyebrow $isDark={isDarkMode}>Proces CarMentor</Eyebrow>
          <Title $isDark={isDarkMode}>Jak działamy</Title>
          <IntroText $isDark={isDarkMode}>
            CarMentor prowadzi klienta od pierwszego zapytania do bezpiecznego zakupu. Wybierasz
            ścieżkę: auto od ręki ze stocku albo broker „auto na zamówienie”.
          </IntroText>
        </IntroCard>

        <Section>
          <SectionTitle $isDark={isDarkMode}>Dwie ścieżki</SectionTitle>
          <PathsGrid>
            <PathCard $isDark={isDarkMode}>
              <CardTitle $isDark={isDarkMode}>Ścieżka Stock</CardTitle>
              <CardText $isDark={isDarkMode}>
                Wybierasz auto z naszej selekcji, pytasz o ofertę i finansowanie, a my domykamy
                oględziny, formalności i odbiór.
              </CardText>
            </PathCard>
            <PathCard $isDark={isDarkMode}>
              <CardTitle $isDark={isDarkMode}>Ścieżka Broker</CardTitle>
              <CardText $isDark={isDarkMode}>
                Wysyłasz wymagania lub link do ogłoszenia, a my przygotowujemy rekomendację
                TAK/NIE i prowadzimy Cię do zakupu.
              </CardText>
            </PathCard>
          </PathsGrid>
        </Section>

        <Section>
          <SectionTitle $isDark={isDarkMode}>4 kroki współpracy</SectionTitle>
          <StepsGrid>
            <StepCard $isDark={isDarkMode}>
              <Num $isDark={isDarkMode}>01</Num>
              <CardTitle $isDark={isDarkMode}>Wyślij zapytanie</CardTitle>
              <CardText $isDark={isDarkMode}>Telefon, formularz lub link do ogłoszenia.</CardText>
            </StepCard>
            <StepCard $isDark={isDarkMode}>
              <Num $isDark={isDarkMode}>02</Num>
              <CardTitle $isDark={isDarkMode}>Sprawdzimy auto</CardTitle>
              <CardText $isDark={isDarkMode}>Weryfikujemy dane, historię i ryzyka zakupu.</CardText>
            </StepCard>
            <StepCard $isDark={isDarkMode}>
              <Num $isDark={isDarkMode}>03</Num>
              <CardTitle $isDark={isDarkMode}>Inspekcja / negocjacje</CardTitle>
              <CardText $isDark={isDarkMode}>Pomagamy w rozmowach i realnej ocenie auta.</CardText>
            </StepCard>
            <StepCard $isDark={isDarkMode}>
              <Num $isDark={isDarkMode}>04</Num>
              <CardTitle $isDark={isDarkMode}>Zakup</CardTitle>
              <CardText $isDark={isDarkMode}>
                Wsparcie przy umowie, finansowaniu i bezpiecznym odbiorze.
              </CardText>
            </StepCard>
          </StepsGrid>
        </Section>

        <Section>
          <SectionTitle $isDark={isDarkMode}>Co sprawdzamy</SectionTitle>
          <CheckCard $isDark={isDarkMode}>
            <VerifyList $isDark={isDarkMode}>
              <li>VIN i historię pojazdu</li>
              <li>Szkody i naprawy</li>
              <li>Przebieg i spójność dokumentów</li>
              <li>Serwis i stan eksploatacyjny</li>
              <li>Komplet dokumentów do zakupu</li>
            </VerifyList>
          </CheckCard>
        </Section>

        <CtaCard $isDark={isDarkMode}>
          <CtaText $isDark={isDarkMode}>
            Chcesz rozpocząć proces? Napisz do nas, a wrócimy z konkretnym planem działania.
          </CtaText>
          <CtaLink to="/kontakt" $isDark={isDarkMode}>
            Przejdź do kontaktu
          </CtaLink>
        </CtaCard>
      </Wrap>
      <SiteFooter isDarkMode={isDarkMode} />
    </Page>
  );
}
