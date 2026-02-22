import { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { SiteFooter, SiteNavigation } from "./components/SiteChrome";

const THEME_STORAGE_KEY = "car-mentor-theme";
const ACCENT_COLOR = "#00573F";
const ACCENT_COLOR_DARK = "#33c39b";

const GlobalStyle = createGlobalStyle<{ $isDark: boolean }>`
  @import url("https://fonts.cdnfonts.com/css/arboria");
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: "Arboria", Inter, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: ${({ $isDark }) => ($isDark ? "#f0f3f2" : "#161616")};
    background: ${({ $isDark }) => ($isDark ? "#0f1513" : "#f5f5f5")};
  }
  a { text-decoration: none; color: inherit; }
  input, select, textarea {
    font: inherit;
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
  }
`;

const Hero = styled.article<{ $isDark: boolean }>`
  border-radius: 22px;
  border: 1px solid ${({ $isDark }) => ($isDark ? "#30413b" : "#d8dfdc")};
  background: ${({ $isDark }) => ($isDark ? "#16211d" : "white")};
  padding: 26px;
  margin-bottom: 18px;
`;

const Title = styled.h1<{ $isDark: boolean }>`
  font-size: clamp(1.8rem, 3vw, 2.7rem);
  color: ${({ $isDark }) => ($isDark ? ACCENT_COLOR_DARK : ACCENT_COLOR)};
  margin-bottom: 10px;
`;

const Lead = styled.p<{ $isDark: boolean }>`
  color: ${({ $isDark }) => ($isDark ? "#bfcbc7" : "#4e5b57")};
  line-height: 1.6;
  max-width: 70ch;
`;

const Grid = styled.section`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 14px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.article<{ $isDark: boolean }>`
  border-radius: 18px;
  border: 1px solid ${({ $isDark }) => ($isDark ? "#30413b" : "#d8dfdc")};
  background: ${({ $isDark }) => ($isDark ? "#16211d" : "white")};
  padding: 18px;
`;

const CardTitle = styled.h2<{ $isDark: boolean }>`
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: ${({ $isDark }) => ($isDark ? "#e8f0ed" : "#1f2b27")};
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
  gap: 5px;
  font-size: 0.9rem;
  font-weight: 700;
`;

const Input = styled.input<{ $isDark: boolean }>`
  border-radius: 10px;
  border: 1px solid ${({ $isDark }) => ($isDark ? "#3a514a" : "#c9d7d2")};
  background: ${({ $isDark }) => ($isDark ? "#1b2a25" : "#fff")};
  color: ${({ $isDark }) => ($isDark ? "#e4eeea" : "#1f2b27")};
  padding: 10px 12px;
`;

const Select = styled.select<{ $isDark: boolean }>`
  border-radius: 10px;
  border: 1px solid ${({ $isDark }) => ($isDark ? "#3a514a" : "#c9d7d2")};
  background: ${({ $isDark }) => ($isDark ? "#1b2a25" : "#fff")};
  color: ${({ $isDark }) => ($isDark ? "#e4eeea" : "#1f2b27")};
  padding: 10px 12px;
`;

const TextArea = styled.textarea<{ $isDark: boolean }>`
  border-radius: 10px;
  border: 1px solid ${({ $isDark }) => ($isDark ? "#3a514a" : "#c9d7d2")};
  background: ${({ $isDark }) => ($isDark ? "#1b2a25" : "#fff")};
  color: ${({ $isDark }) => ($isDark ? "#e4eeea" : "#1f2b27")};
  padding: 10px 12px;
  min-height: 120px;
  resize: vertical;
`;

const Full = styled.div`
  grid-column: 1 / -1;
`;

const Submit = styled.button<{ $isDark: boolean }>`
  border-radius: 12px;
  border: 1px solid ${({ $isDark }) => ($isDark ? ACCENT_COLOR_DARK : ACCENT_COLOR)};
  background: ${({ $isDark }) => ($isDark ? ACCENT_COLOR_DARK : ACCENT_COLOR)};
  color: ${({ $isDark }) => ($isDark ? "#10221b" : "white")};
  font-weight: 800;
  padding: 11px 16px;
  cursor: pointer;
`;

const Note = styled.p<{ $isDark: boolean }>`
  margin-top: 10px;
  font-size: 0.84rem;
  color: ${({ $isDark }) => ($isDark ? "#aebcb7" : "#60706a")};
`;

const ContactList = styled.div`
  display: grid;
  gap: 10px;
`;

const ContactItem = styled.a<{ $isDark: boolean }>`
  border-radius: 12px;
  border: 1px solid ${({ $isDark }) => ($isDark ? "#3a514a" : "#d4dfdb")};
  padding: 11px 12px;
  background: ${({ $isDark }) => ($isDark ? "#1b2a25" : "#f9fcfb")};
  color: ${({ $isDark }) => ($isDark ? "#dce8e4" : "#264038")};
  font-weight: 700;
`;

const Small = styled.p<{ $isDark: boolean }>`
  color: ${({ $isDark }) => ($isDark ? "#b2bfbb" : "#5a6964")};
  line-height: 1.55;
`;

export default function ContactPage() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(THEME_STORAGE_KEY) === "dark";
  });

  useEffect(() => {
    window.localStorage.setItem(THEME_STORAGE_KEY, isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <Page>
      <GlobalStyle $isDark={isDarkMode} />
      <SiteNavigation
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode((prev) => !prev)}
      />
      <Wrap>
        <Hero $isDark={isDarkMode}>
          <Title $isDark={isDarkMode}>Kontakt</Title>
          <Lead $isDark={isDarkMode}>
            Wypełnij krótki formularz i oddzwonimy z konkretną propozycją. Obsługujemy zarówno
            auta ze stocku, jak i usługę brokera „auto na zamówienie”.
          </Lead>
        </Hero>

        <Grid>
          <Card $isDark={isDarkMode}>
            <CardTitle $isDark={isDarkMode}>Formularz leadowy</CardTitle>
            <FormGrid>
              <Field>
                Telefon
                <Input $isDark={isDarkMode} type="tel" placeholder="+48..." />
              </Field>
              <Field>
                Email
                <Input $isDark={isDarkMode} type="email" placeholder="kontakt@email.pl" />
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
                <Input $isDark={isDarkMode} type="text" placeholder="np. Warszawa" />
              </Field>
              <Field>
                Usługa
                <Select $isDark={isDarkMode} defaultValue="">
                  <option value="" disabled>
                    Wybierz
                  </option>
                  <option>Stock (auto od ręki)</option>
                  <option>Broker (auto na zamówienie)</option>
                  <option>Ocena ogłoszenia</option>
                </Select>
              </Field>
              <Field>
                Budżet
                <Input $isDark={isDarkMode} type="text" placeholder="np. 90 000 zł" />
              </Field>
              <Field className="full" style={{ gridColumn: "1 / -1" }}>
                Link do ogłoszenia (opcjonalnie)
                <Input $isDark={isDarkMode} type="url" placeholder="https://..." />
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
                <Note $isDark={isDarkMode}>
                  MVP: formularz gotowy pod podpięcie do CRM (statusy: nowy / w trakcie / oferta
                  wysłana / wygrany / przegrany).
                </Note>
              </Full>
            </FormGrid>
          </Card>

          <Card $isDark={isDarkMode}>
            <CardTitle $isDark={isDarkMode}>Szybki kontakt</CardTitle>
            <ContactList>
              <ContactItem $isDark={isDarkMode} href="tel:+48600123456">
                Zadzwoń: +48 600 123 456
              </ContactItem>
              <ContactItem $isDark={isDarkMode} href="mailto:kontakt@carmentor.pl">
                Email: kontakt@carmentor.pl
              </ContactItem>
              <ContactItem $isDark={isDarkMode} href="https://wa.me/48600123456">
                WhatsApp: napisz teraz
              </ContactItem>
            </ContactList>
            <Small $isDark={isDarkMode} style={{ marginTop: 12 }}>
              Pracujemy butikowo: mniejsza liczba leadów, większa jakość obsługi i realna
              rekomendacja TAK/NIE.
            </Small>
          </Card>
        </Grid>
      </Wrap>
      <SiteFooter isDarkMode={isDarkMode} />
    </Page>
  );
}
