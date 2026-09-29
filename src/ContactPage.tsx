import { useState, type FormEvent } from "react";
import styled from "styled-components";
import { SiteFooter, SiteNavigation } from "./components/SiteChrome";
import {
  Card,
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
  ACCENT_COLOR,
  ACCENT_COLOR_DARK,
  accent,
  border,
  surfaceMuted,
  textBody,
  textMuted,
  textStrong,
  type ThemeProps,
} from "./theme";
import contactImg from "./assets/contact.jpg";

const Page = styled.div`
  min-height: 100vh;
`;

const ContentSection = styled(Container)`
  margin-bottom: 96px;

  @media (max-width: 767px) {
    margin-bottom: 64px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 0.8fr;
  gap: 24px;
  align-items: start;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const FormCard = styled(Card)`
  padding: 36px;

  @media (max-width: 767px) {
    padding: 22px;
  }
`;

const CardTitle = styled.h3<ThemeProps>`
  font-size: 1.3rem;
  letter-spacing: -0.01em;
  color: ${textStrong};
  margin-bottom: 22px;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px 16px;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.label<ThemeProps>`
  display: grid;
  gap: 8px;
  font-size: 0.82rem;
  font-weight: 700;
  color: ${textBody};
`;

const inputBase = (isDark: boolean) => `
  border-radius: 12px;
  border: 1px solid ${isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(15, 35, 28, 0.1)"};
  background: ${isDark ? "#1a2522" : "#f4f7f6"};
  color: ${isDark ? "#eef3f1" : "#111a17"};
  padding: 14px 16px;
  font-size: 0.97rem;
  font-weight: 400;
  width: 100%;
  transition: border-color 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease;

  &:focus {
    outline: none;
    border-color: ${isDark ? ACCENT_COLOR_DARK : ACCENT_COLOR};
    background: ${isDark ? "#141c19" : "#ffffff"};
    box-shadow: 0 0 0 4px ${isDark ? "rgba(51, 195, 155, 0.16)" : "rgba(0, 87, 63, 0.1)"};
  }

  &::placeholder {
    color: ${isDark ? "#5f716b" : "#9aa8a3"};
  }
`;

const Input = styled.input<ThemeProps>`
  ${({ $isDark }) => inputBase($isDark)}
`;

const Select = styled.select<ThemeProps>`
  ${({ $isDark }) => inputBase($isDark)}
`;

const TextArea = styled.textarea<ThemeProps>`
  ${({ $isDark }) => inputBase($isDark)}
  min-height: 140px;
  resize: vertical;
`;

const Full = styled.div`
  grid-column: 1 / -1;
`;

const Submit = styled(PrimaryButton)`
  width: 100%;
  margin-top: 4px;

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
`;

const Honeypot = styled.div`
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
`;

const FormStatus = styled.p<{ $tone: "ok" | "error" } & ThemeProps>`
  margin-top: 14px;
  font-size: 0.92rem;
  font-weight: 600;
  color: ${({ $tone, $isDark }) =>
    $tone === "ok"
      ? $isDark
        ? "#6ee7b7"
        : ACCENT_COLOR
      : $isDark
        ? "#fca5a5"
        : "#b42318"};
`;

const QuickCard = styled(Card)`
  position: sticky;
  top: 104px;

  @media (max-width: 980px) {
    position: static;
  }
`;

const ContactList = styled.div`
  display: grid;
  gap: 10px;
`;

const ContactItem = styled.a<ThemeProps>`
  display: flex;
  align-items: center;
  gap: 14px;
  border-radius: 16px;
  padding: 14px;
  background: ${surfaceMuted};
  color: ${textStrong};
  font-weight: 700;

  &::after {
    content: "→";
    margin-left: auto;
    color: ${accent};
  }

  &:hover {
    color: ${accent};
  }
`;

const Small = styled.p<ThemeProps>`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid ${border};
  color: ${textMuted};
  line-height: 1.65;
`;

type ContactPageProps = {
  isDarkMode: boolean;
  onToggleTheme: () => void;
};

type FormStatusState =
  | { tone: "ok"; text: string }
  | { tone: "error"; text: string }
  | null;

export default function ContactPage({
  isDarkMode,
  onToggleTheme,
}: ContactPageProps) {
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<FormStatusState>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;

    const form = event.currentTarget;
    const data = new FormData(form);

    setSending(true);
    setStatus(null);

    try {
      const response = await fetch("/api/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: String(data.get("phone") ?? "").trim(),
          email: String(data.get("email") ?? "").trim(),
          clientType: String(data.get("clientType") ?? "").trim(),
          city: String(data.get("city") ?? "").trim(),
          service: String(data.get("service") ?? "").trim(),
          budget: String(data.get("budget") ?? "").trim(),
          listingUrl: String(data.get("listingUrl") ?? "").trim(),
          message: String(data.get("message") ?? "").trim(),
          website: String(data.get("website") ?? "").trim(),
        }),
      });

      const payload = (await response.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
      } | null;

      if (!response.ok || !payload?.ok) {
        setStatus({
          tone: "error",
          text:
            payload?.error ??
            "Nie udało się wysłać wiadomości. Spróbuj ponownie.",
        });
        return;
      }

      form.reset();
      setStatus({
        tone: "ok",
        text: "Dziękujemy — odezwemy się w ciągu 24 h.",
      });
    } catch {
      setStatus({
        tone: "error",
        text: "Brak połączenia z serwerem. Sprawdź sieć i spróbuj ponownie.",
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <Page>
      <SiteNavigation isDarkMode={isDarkMode} onToggleTheme={onToggleTheme} />

      <PageIntro
        isDarkMode={isDarkMode}
        title="Kontakt"
        image={contactImg}
        imageAlt="Konsultacja CarMentor"
      >
        Zostaw kontakt i kilka informacji - oddzwonimy, dopytamy o potrzeby i
        zaproponujemy najlepsze rozwiązanie. Auta od ręki, komis, wyszukiwanie
        na zamówienie i nowe auta.
      </PageIntro>

      <ContentSection>
        <SectionHead>
          <SectionTitle $isDark={isDarkMode}>Napisz do nas</SectionTitle>
          <SectionDesc $isDark={isDarkMode}>
            Wrócimy z konkretnym planem działania w ciągu 24 h.
          </SectionDesc>
        </SectionHead>
        <Grid>
          <FormCard $isDark={isDarkMode}>
            <CardTitle $isDark={isDarkMode}>Formularz leadowy</CardTitle>
            <form onSubmit={handleSubmit}>
              <FormGrid>
                <Honeypot aria-hidden="true">
                  <label>
                    Website
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </label>
                </Honeypot>
                <Field $isDark={isDarkMode}>
                  Telefon
                  <Input
                    $isDark={isDarkMode}
                    name="phone"
                    type="tel"
                    placeholder="+48..."
                    required
                  />
                </Field>
                <Field $isDark={isDarkMode}>
                  Email
                  <Input
                    $isDark={isDarkMode}
                    name="email"
                    type="email"
                    placeholder="biuro@carmentor.pl"
                    required
                  />
                </Field>
                <Field $isDark={isDarkMode}>
                  Forma
                  <Select $isDark={isDarkMode} name="clientType" defaultValue="">
                    <option value="" disabled>
                      Wybierz
                    </option>
                    <option>Osoba prywatna</option>
                    <option>Firma</option>
                  </Select>
                </Field>
                <Field $isDark={isDarkMode}>
                  Miasto
                  <Input
                    $isDark={isDarkMode}
                    name="city"
                    type="text"
                    placeholder="np. Warszawa"
                  />
                </Field>
                <Field $isDark={isDarkMode}>
                  Usługa
                  <Select
                    $isDark={isDarkMode}
                    name="service"
                    defaultValue=""
                    required
                  >
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
                <Field $isDark={isDarkMode}>
                  Budżet
                  <Input
                    $isDark={isDarkMode}
                    name="budget"
                    type="text"
                    placeholder="np. 90 000 zł"
                  />
                </Field>
                <Full>
                  <Field $isDark={isDarkMode}>
                    Link do ogłoszenia (opcjonalnie)
                    <Input
                      $isDark={isDarkMode}
                      name="listingUrl"
                      type="url"
                      placeholder="https://..."
                    />
                  </Field>
                </Full>
                <Full>
                  <Field $isDark={isDarkMode}>
                    Dodatkowe informacje
                    <TextArea
                      $isDark={isDarkMode}
                      name="message"
                      placeholder="Typ auta, rocznik, przebieg, paliwo, termin zakupu..."
                    />
                  </Field>
                </Full>
                <Full>
                  <Submit
                    $isDark={isDarkMode}
                    type="submit"
                    disabled={sending}
                  >
                    {sending ? "Wysyłanie…" : "Wyślij zapytanie"}
                  </Submit>
                  {status ? (
                    <FormStatus $isDark={isDarkMode} $tone={status.tone}>
                      {status.text}
                    </FormStatus>
                  ) : null}
                </Full>
              </FormGrid>
            </form>
          </FormCard>

          <QuickCard $isDark={isDarkMode}>
            <CardTitle $isDark={isDarkMode}>Szybki kontakt</CardTitle>
            <ContactList>
              <ContactItem $isDark={isDarkMode} href="tel:+48660488900">
                <IconBadge $isDark={isDarkMode}>
                  <Icon>
                    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
                  </Icon>
                </IconBadge>
                Zadzwoń: +48 660 488 900
              </ContactItem>
              <ContactItem
                $isDark={isDarkMode}
                href="mailto:biuro@carmentor.pl"
              >
                <IconBadge $isDark={isDarkMode}>
                  <Icon>
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </Icon>
                </IconBadge>
                Email: biuro@carmentor.pl
              </ContactItem>
              <ContactItem
                $isDark={isDarkMode}
                href="https://wa.me/48660488900"
              >
                <IconBadge $isDark={isDarkMode}>
                  <Icon>
                    <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.4A8.4 8.4 0 1 1 21 11.5z" />
                  </Icon>
                </IconBadge>
                WhatsApp: napisz teraz
              </ContactItem>
            </ContactList>
            <Small $isDark={isDarkMode}>
              Stawiamy na bezpieczeństwo zakupu i przejrzyste zasady.
              Weryfikujemy samochód, pokazujemy fakty i jasno mówimy, czy to
              dobry wybór. Prowadzimy Cię przez cały proces - od wyboru po
              finalizację, spokojnie i bez ryzyka.
            </Small>
          </QuickCard>
        </Grid>
      </ContentSection>

      <SiteFooter isDarkMode={isDarkMode} />
    </Page>
  );
}
