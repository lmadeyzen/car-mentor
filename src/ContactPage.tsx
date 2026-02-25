import styled from "styled-components";
import { SiteFooter, SiteNavigation } from "./components/SiteChrome";
import contactImg from "./assets/contact.jpg";

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
  max-width: 56ch;
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 16px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.article<{ $isDark: boolean }>`
  background: ${({ $isDark }) => ($isDark ? "#161f1c" : "white")};
  border: 1px solid ${({ $isDark }) => ($isDark ? "#2f3f39" : "#dadada")};
  border-radius: 16px;
  padding: 22px;
`;

const CardTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 14px;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.label`
  display: grid;
  gap: 6px;
  font-size: 0.88rem;
  font-weight: 500;
  color: inherit;
`;

const inputBase = (isDark: boolean) => `
  border-radius: 10px;
  border: 1px solid ${isDark ? "#2f3f39" : "#dde5e2"};
  background: ${isDark ? "#1a2622" : "#f8faf9"};
  color: ${isDark ? "#e4eeea" : "#1f2b27"};
  padding: 13px 14px;
  font-size: 0.95rem;
  font-weight: 400;
  width: 100%;
  transition: border-color 0.15s ease;

  &:focus {
    outline: none;
    border-color: ${isDark ? "#33c39b" : "#00573F"};
  }

  &::placeholder {
    color: ${isDark ? "#5a7069" : "#a0b0ab"};
  }
`;

const Input = styled.input<{ $isDark: boolean }>`
  ${({ $isDark }) => inputBase($isDark)}
`;

const Select = styled.select<{ $isDark: boolean }>`
  ${({ $isDark }) => inputBase($isDark)}
`;

const TextArea = styled.textarea<{ $isDark: boolean }>`
  ${({ $isDark }) => inputBase($isDark)}
  min-height: 120px;
  resize: vertical;
`;

const Full = styled.div`
  grid-column: 1 / -1;
`;

const Submit = styled.button<{ $isDark: boolean }>`
  border-radius: 12px;
  border: 1px solid
    ${({ $isDark }) => ($isDark ? ACCENT_COLOR_DARK : ACCENT_COLOR)};
  background: ${({ $isDark }) => ($isDark ? ACCENT_COLOR_DARK : ACCENT_COLOR)};
  color: ${({ $isDark }) => ($isDark ? "#10221b" : "white")};
  font-weight: 800;
  padding: 11px 18px;
  cursor: pointer;
`;

const Note = styled.p<{ $isDark: boolean }>`
  margin-top: 10px;
  font-size: 0.84rem;
  color: ${({ $isDark }) => ($isDark ? "#aeb8b4" : "#5e5e5e")};
`;

const ContactList = styled.div`
  display: grid;
  gap: 10px;
`;

const ContactItem = styled.a<{ $isDark: boolean }>`
  border-radius: 12px;
  border: 1px solid ${({ $isDark }) => ($isDark ? "#2f3f39" : "#dadada")};
  padding: 11px 14px;
  background: ${({ $isDark }) => ($isDark ? "#1b2a25" : "#f9fcfb")};
  color: ${({ $isDark }) => ($isDark ? "#dce8e4" : "#264038")};
  font-weight: 700;
`;

const Small = styled.p<{ $isDark: boolean }>`
  margin-top: 12px;
  color: ${({ $isDark }) => ($isDark ? "#aeb8b4" : "#5e5e5e")};
  line-height: 1.55;
`;

type ContactPageProps = {
  isDarkMode: boolean;
  onToggleTheme: () => void;
};

export default function ContactPage({
  isDarkMode,
  onToggleTheme,
}: ContactPageProps) {
  return (
    <Page>
      <SiteNavigation isDarkMode={isDarkMode} onToggleTheme={onToggleTheme} />

      <IntroSection>
        <IntroCard $isDark={isDarkMode}>
          <PageTitle>Kontakt</PageTitle>
          <IntroText $isDark={isDarkMode}>
            Zostaw kontakt i kilka informacji - oddzwonimy, dopytamy o potrzeby
            i zaproponujemy najlepsze rozwiązanie. Auta od ręki, komis,
            wyszukiwanie na zamówienie i nowe auta.
          </IntroText>
        </IntroCard>
        <IntroImage src={contactImg} alt="Konsultacja CarMentor" />
      </IntroSection>

      <ContentSection>
        <SectionHead>
          <SectionTitle $isDark={isDarkMode}>Napisz do nas</SectionTitle>
          <SectionDesc $isDark={isDarkMode}>
            Wrócimy z konkretnym planem działania w ciągu 24 h.
          </SectionDesc>
        </SectionHead>
        <Grid>
          <Card $isDark={isDarkMode}>
            <CardTitle>Formularz leadowy</CardTitle>
            <FormGrid>
              <Field>
                Telefon
                <Input $isDark={isDarkMode} type="tel" placeholder="+48..." />
              </Field>
              <Field>
                Email
                <Input
                  $isDark={isDarkMode}
                  type="email"
                  placeholder="kontakt@email.pl"
                />
              </Field>
              <Field>
                Forma
                <Select $isDark={isDarkMode} defaultValue="">
                  <option value="" disabled>
                    Wybierz
                  </option>
                  <option>Osoba prywatna</option>
                  <option>Firma</option>
                </Select>
              </Field>
              <Field>
                Miasto
                <Input
                  $isDark={isDarkMode}
                  type="text"
                  placeholder="np. Warszawa"
                />
              </Field>
              <Field>
                Usługa
                <Select $isDark={isDarkMode} defaultValue="">
                  <option value="" disabled>
                    Wybierz
                  </option>
                  <option>Auta od ręki</option>
                  <option>Auto używane na zamówienie</option>
                  <option>Broker auta nowego</option>
                  <option>Komis – sprzedaż auta</option>
                  <option>Sprawdzenie ogłoszenia</option>
                </Select>
              </Field>
              <Field>
                Budżet
                <Input
                  $isDark={isDarkMode}
                  type="text"
                  placeholder="np. 90 000 zł"
                />
              </Field>
              <Field style={{ gridColumn: "1 / -1" }}>
                Link do ogłoszenia (opcjonalnie)
                <Input
                  $isDark={isDarkMode}
                  type="url"
                  placeholder="https://..."
                />
              </Field>
              <Full>
                <Field>
                  Dodatkowe informacje
                  <TextArea
                    $isDark={isDarkMode}
                    placeholder="Typ auta, rocznik, przebieg, paliwo, termin zakupu..."
                  />
                </Field>
              </Full>
              <Full>
                <Submit $isDark={isDarkMode} type="button">
                  Wyślij zapytanie
                </Submit>
              </Full>
            </FormGrid>
          </Card>

          <Card $isDark={isDarkMode}>
            <CardTitle>Szybki kontakt</CardTitle>
            <ContactList>
              <ContactItem $isDark={isDarkMode} href="tel:+48660488900">
                Zadzwoń: +48 660 488 900
              </ContactItem>
              <ContactItem
                $isDark={isDarkMode}
                href="mailto:kontakt@carmentor.pl"
              >
                Email: kontakt@carmentor.pl
              </ContactItem>
              <ContactItem
                $isDark={isDarkMode}
                href="https://wa.me/48660488900"
              >
                WhatsApp: napisz teraz
              </ContactItem>
            </ContactList>
            <Small $isDark={isDarkMode}>
              Stawiamy na bezpieczeństwo zakupu i przejrzyste zasady.
              Weryfikujemy samochód, pokazujemy fakty i jasno mówimy, czy to
              dobry wybór. Prowadzimy Cię przez cały proces - od wyboru po
              finalizację, spokojnie i bez ryzyka.
            </Small>
          </Card>
        </Grid>
      </ContentSection>

      <SiteFooter isDarkMode={isDarkMode} />
    </Page>
  );
}
