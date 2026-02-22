import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    background: #0e1016;
    color: #f5f1e8;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  a { text-decoration: none; color: inherit; }
  img { max-width: 100%; display: block; }
`;

const CARS = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=400&fit=crop",
    brand: "BMW",
    model: "X3 xDrive30d",
    year: 2023,
    mileage: "18 000 km",
    price: "219 900 zł",
    tag: "Od ręki",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=400&fit=crop",
    brand: "Mercedes-Benz",
    model: "GLC 300 4MATIC",
    year: 2022,
    mileage: "32 000 km",
    price: "249 000 zł",
    tag: "Sprawdzone",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=600&h=400&fit=crop",
    brand: "Volvo",
    model: "XC60 T6 Recharge",
    year: 2023,
    mileage: "12 500 km",
    price: "279 900 zł",
    tag: "Od ręki",
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=600&h=400&fit=crop",
    brand: "Audi",
    model: "Q5 45 TFSI quattro",
    year: 2022,
    mileage: "41 000 km",
    price: "199 900 zł",
    tag: "Sprawdzone",
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop",
    brand: "Porsche",
    model: "Cayenne E-Hybrid",
    year: 2023,
    mileage: "8 200 km",
    price: "389 000 zł",
    tag: "Od ręki",
  },
  {
    id: 6,
    img: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&h=400&fit=crop",
    brand: "Toyota",
    model: "RAV4 Hybrid AWD",
    year: 2023,
    mileage: "15 800 km",
    price: "169 900 zł",
    tag: "Sprawdzone",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Wyślij zapytanie",
    desc: "Powiedz nam, jakiego auta szukasz — lub wklej link z ogłoszenia.",
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

const Page = styled.div`
  min-height: 100vh;
  background: radial-gradient(1200px 640px at 10% -20%, rgba(255, 207, 74, 0.16), rgba(14, 16, 22, 0) 60%),
    radial-gradient(900px 620px at 110% 0%, rgba(255, 88, 88, 0.14), rgba(14, 16, 22, 0) 55%),
    radial-gradient(1000px 700px at 50% 120%, rgba(104, 255, 194, 0.08), rgba(14, 16, 22, 0) 55%),
    #0e1016;
`;

const Max = styled.div`
  width: 100%;
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 24px;
  @media (max-width: 767px) {
    padding: 0 18px;
  }
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 20;
  background: rgba(14, 16, 22, 0.78);
  backdrop-filter: blur(14px);
  border-bottom: 1px dashed rgba(245, 241, 232, 0.2);
`;

const Nav = styled.nav`
  height: 76px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 16px;
  @media (max-width: 1023px) {
    grid-template-columns: 1fr auto;
  }
`;

const Brand = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-weight: 950;
  letter-spacing: -0.04em;
  font-size: 18px;
`;

const Stamp = styled.span`
  width: 14px;
  height: 14px;
  border-radius: 4px;
  background: linear-gradient(135deg, rgba(255, 207, 74, 1), rgba(255, 88, 88, 1));
  box-shadow: 0 0 0 6px rgba(255, 207, 74, 0.08);
`;

const Links = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: rgba(245, 241, 232, 0.82);
  font-size: 13px;

  a {
    padding: 10px 10px;
    border-radius: 14px;
    border: 1px dashed rgba(245, 241, 232, 0.22);
    background: rgba(245, 241, 232, 0.04);
    transition: transform 140ms ease, background 140ms ease;
    white-space: nowrap;
  }
  a:hover {
    transform: translateY(-1px);
    background: rgba(245, 241, 232, 0.08);
  }

  @media (max-width: 1023px) {
    display: none;
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
`;

const TicketButton = styled.a<{ $tone: "primary" | "secondary" }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 11px 14px;
  border-radius: 16px;
  font-weight: 950;
  letter-spacing: -0.02em;
  font-size: 13px;
  border: 1px dashed rgba(245, 241, 232, 0.22);
  background: ${(p) =>
    p.$tone === "primary"
      ? "linear-gradient(135deg, rgba(255, 207, 74, 0.22), rgba(255, 88, 88, 0.18))"
      : "rgba(245, 241, 232, 0.05)"};
  color: rgba(245, 241, 232, 0.95);
  transition: transform 140ms ease, background 140ms ease;
  white-space: nowrap;

  &:hover {
    transform: translateY(-1px);
    background: rgba(245, 241, 232, 0.1);
  }
`;

const Burger = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 16px;
  border: 1px dashed rgba(245, 241, 232, 0.22);
  background: rgba(245, 241, 232, 0.05);
  display: none;
  align-items: center;
  justify-content: center;
  @media (max-width: 1023px) {
    display: inline-flex;
  }

  span {
    width: 18px;
    height: 2px;
    border-radius: 999px;
    background: rgba(245, 241, 232, 0.86);
    position: relative;
  }
  span::before,
  span::after {
    content: "";
    position: absolute;
    left: 0;
    width: 18px;
    height: 2px;
    border-radius: 999px;
    background: rgba(245, 241, 232, 0.86);
  }
  span::before {
    top: -6px;
  }
  span::after {
    top: 6px;
  }
`;

const Section = styled.section`
  padding: 30px 0;
  @media (max-width: 767px) {
    padding: 24px 0;
  }
`;

const Ticket = styled.div`
  position: relative;
  border-radius: 26px;
  border: 1px dashed rgba(245, 241, 232, 0.26);
  background: rgba(245, 241, 232, 0.04);
  overflow: hidden;
  box-shadow: 0 28px 80px rgba(0, 0, 0, 0.35);

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      90deg,
      rgba(245, 241, 232, 0.05) 0px,
      rgba(245, 241, 232, 0.05) 1px,
      rgba(245, 241, 232, 0.0) 1px,
      rgba(245, 241, 232, 0.0) 12px
    );
    opacity: 0.65;
    pointer-events: none;
  }
`;

const Perforation = styled.div`
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 0;
  border-left: 1px dashed rgba(245, 241, 232, 0.22);
  opacity: 0.9;

  @media (max-width: 1023px) {
    display: none;
  }
`;

const Punch = styled.div<{ $side: "left" | "right" }>`
  position: absolute;
  top: 50%;
  ${(p) => (p.$side === "left" ? "left: -12px;" : "right: -12px;")}
  width: 24px;
  height: 24px;
  border-radius: 999px;
  background: #0e1016;
  border: 1px dashed rgba(245, 241, 232, 0.24);
  transform: translateY(-50%);

  @media (max-width: 1023px) {
    display: none;
  }
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1.25fr 0.75fr;
  gap: 0;
  position: relative;
  z-index: 1;

  @media (max-width: 1023px) {
    grid-template-columns: 1fr;
  }
`;

const HeroLeft = styled.div`
  padding: 28px 28px 24px;

  @media (max-width: 767px) {
    padding: 22px 18px 18px;
  }
`;

const Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(245, 241, 232, 0.72);
`;

const H1 = styled.h1`
  margin-top: 14px;
  font-size: 54px;
  line-height: 1.02;
  letter-spacing: -0.06em;
  font-weight: 950;

  @media (max-width: 1023px) {
    font-size: 46px;
  }
  @media (max-width: 767px) {
    font-size: 36px;
  }
`;

const Lead = styled.p`
  margin-top: 14px;
  color: rgba(245, 241, 232, 0.76);
  font-size: 14px;
  line-height: 1.85;
  max-width: 72ch;
`;

const HeroCtas = styled.div`
  margin-top: 18px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const HeroRight = styled.div`
  border-left: 1px dashed rgba(245, 241, 232, 0.22);
  padding: 18px 18px 18px;
  display: grid;
  align-content: start;
  gap: 10px;

  @media (max-width: 1023px) {
    border-left: none;
    border-top: 1px dashed rgba(245, 241, 232, 0.22);
  }
`;

const MiniRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 10px;
  align-items: start;
`;

const MiniTitle = styled.div`
  font-weight: 950;
  letter-spacing: -0.03em;
`;

const MiniSub = styled.div`
  margin-top: 6px;
  color: rgba(245, 241, 232, 0.68);
  font-size: 12px;
  line-height: 1.6;
`;

const SideBadge = styled.div`
  padding: 8px 10px;
  border-radius: 999px;
  border: 1px dashed rgba(245, 241, 232, 0.22);
  background: rgba(245, 241, 232, 0.05);
  font-weight: 950;
  font-size: 12px;
  white-space: nowrap;
`;

const Preview = styled.div`
  margin-top: 8px;
  border-radius: 20px;
  overflow: hidden;
  border: 1px dashed rgba(245, 241, 232, 0.22);
  background: rgba(245, 241, 232, 0.03);
  position: relative;

  img {
    width: 100%;
    height: 240px;
    object-fit: cover;
    filter: saturate(1.03) contrast(1.02);
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(14, 16, 22, 0.0) 0%, rgba(14, 16, 22, 0.55) 100%);
    pointer-events: none;
  }
`;

const SectionHead = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 14px;
  flex-wrap: wrap;
`;

const H2 = styled.h2`
  font-size: 18px;
  font-weight: 950;
  letter-spacing: -0.03em;
`;

const Sub = styled.p`
  color: rgba(245, 241, 232, 0.7);
  font-size: 13px;
  line-height: 1.7;
  max-width: 70ch;
`;

const Picks = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 1023px) {
    grid-template-columns: repeat(8, minmax(0, 1fr));
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const CarTicket = styled.article`
  grid-column: span 4;
  position: relative;
  border-radius: 22px;
  border: 1px dashed rgba(245, 241, 232, 0.26);
  background: rgba(245, 241, 232, 0.04);
  overflow: hidden;

  @media (max-width: 1023px) {
    grid-column: span 4;
  }
  @media (max-width: 767px) {
    grid-column: span 1;
  }
`;

const Cut = styled.div`
  position: absolute;
  left: 16px;
  right: 16px;
  top: 54%;
  height: 0;
  border-top: 1px dashed rgba(245, 241, 232, 0.2);
  opacity: 0.9;
`;

const CarMedia = styled.div`
  position: relative;
  height: 168px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(14, 16, 22, 0.0) 0%, rgba(14, 16, 22, 0.58) 100%);
    pointer-events: none;
  }
`;

const Tag = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 8px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 950;
  border: 1px dashed rgba(245, 241, 232, 0.26);
  background: rgba(14, 16, 22, 0.55);
  backdrop-filter: blur(10px);
`;

const CarBody = styled.div`
  padding: 14px 14px 16px;
  display: grid;
  gap: 10px;
`;

const CarTitle = styled.div`
  font-weight: 950;
  letter-spacing: -0.03em;
`;

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 12px;
  color: rgba(245, 241, 232, 0.74);
`;

const Meta = styled.span`
  padding: 7px 10px;
  border-radius: 999px;
  border: 1px dashed rgba(245, 241, 232, 0.22);
  background: rgba(245, 241, 232, 0.04);
`;

const Foot = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

const Price = styled.div`
  font-weight: 950;
  letter-spacing: -0.03em;
`;

const CarCta = styled.a`
  padding: 10px 12px;
  border-radius: 16px;
  border: 1px dashed rgba(245, 241, 232, 0.26);
  background: rgba(245, 241, 232, 0.05);
  font-weight: 950;
  font-size: 12px;
  white-space: nowrap;
  &:hover {
    background: rgba(245, 241, 232, 0.1);
  }
`;

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 1023px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const StepCard = styled.div`
  border-radius: 22px;
  border: 1px dashed rgba(245, 241, 232, 0.26);
  background: rgba(245, 241, 232, 0.04);
  padding: 16px;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(400px 220px at 20% 20%, rgba(255, 207, 74, 0.08), rgba(14, 16, 22, 0) 60%);
    opacity: 0.9;
    pointer-events: none;
  }
`;

const StepNum = styled.div`
  font-size: 42px;
  font-weight: 950;
  letter-spacing: -0.1em;
  line-height: 1;
  position: relative;
  z-index: 1;
`;

const StepTitle = styled.div`
  margin-top: 10px;
  font-weight: 950;
  letter-spacing: -0.03em;
  position: relative;
  z-index: 1;
`;

const StepDesc = styled.div`
  margin-top: 8px;
  color: rgba(245, 241, 232, 0.72);
  font-size: 12px;
  line-height: 1.75;
  position: relative;
  z-index: 1;
`;

const Footer = styled.footer`
  padding: 32px 0 46px;
  border-top: 1px dashed rgba(245, 241, 232, 0.22);
  background: rgba(14, 16, 22, 0.62);
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr;
  gap: 12px;
  @media (max-width: 1023px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const FooterCard = styled.div`
  border-radius: 22px;
  border: 1px dashed rgba(245, 241, 232, 0.22);
  background: rgba(245, 241, 232, 0.04);
  padding: 16px;
`;

const FooterTitle = styled.div`
  font-weight: 950;
  letter-spacing: -0.03em;
`;

const FooterText = styled.p`
  margin-top: 10px;
  color: rgba(245, 241, 232, 0.74);
  font-size: 13px;
  line-height: 1.8;
`;

const FooterLinks = styled.div`
  margin-top: 10px;
  display: grid;
  gap: 8px;
  color: rgba(245, 241, 232, 0.8);
  font-size: 13px;
`;

const Contact = styled.div`
  margin-top: 10px;
  display: grid;
  gap: 8px;
  color: rgba(245, 241, 232, 0.8);
  font-size: 13px;
`;

const Copy = styled.div`
  margin-top: 16px;
  font-size: 12px;
  color: rgba(245, 241, 232, 0.58);
`;

export default function Layout04() {
  const featured = CARS[2];

  return (
    <Page>
      <GlobalStyle />
      <Header>
        <Max>
          <Nav>
            <Brand href="#top" aria-label="CarMentor — strona główna">
              <Stamp />
              CarMentor
            </Brand>

            <Links aria-label="Główna nawigacja">
              <a href="#stock">Auta od ręki</a>
              <a href="#broker">Auto na zamówienie</a>
              <a href="#how">Jak działamy</a>
              <a href="#contact">Kontakt</a>
            </Links>

            <Right>
              <TicketButton href="#stock" $tone="secondary">
                Zobacz stock
              </TicketButton>
              <TicketButton href="#contact" $tone="primary">
                Umów rozmowę
              </TicketButton>
              <Burger aria-label="Menu (mobile)">
                <span />
              </Burger>
            </Right>
          </Nav>
        </Max>
      </Header>

      <main id="top">
        <Section>
          <Max>
            <Ticket>
              <Perforation />
              <Punch $side="left" />
              <Punch $side="right" />
              <HeroGrid>
                <HeroLeft>
                  <Eyebrow>
                    <Stamp />
                    Stoimy po stronie kupującego
                  </Eyebrow>
                  <H1>Kupno auta jak kontrolowany lot.</H1>
                  <Lead>
                    Stock i broker, bez chaosu: weryfikacja historii, inspekcja i negocjacje. Jeśli
                    coś nie gra — nie „boardingujemy” tego auta.
                  </Lead>
                  <HeroCtas>
                    <TicketButton href="#stock" $tone="primary">
                      Zobacz auta od ręki
                    </TicketButton>
                    <TicketButton href="#broker" $tone="secondary">
                      Znajdź mi auto
                    </TicketButton>
                  </HeroCtas>
                </HeroLeft>

                <HeroRight>
                  <MiniRow>
                    <div>
                      <MiniTitle>Featured</MiniTitle>
                      <MiniSub>
                        {featured.brand} {featured.model}
                      </MiniSub>
                    </div>
                    <SideBadge>{featured.tag}</SideBadge>
                  </MiniRow>
                  <Preview>
                    <img src={featured.img} alt={`${featured.brand} ${featured.model}`} />
                  </Preview>
                  <MiniSub>
                    DATA: {featured.year} • {featured.mileage} • {featured.price}
                  </MiniSub>
                </HeroRight>
              </HeroGrid>
            </Ticket>
          </Max>
        </Section>

        <Section id="stock">
          <Max>
            <SectionHead>
              <div>
                <H2>Top Picks</H2>
                <Sub>6 kart w formie „biletów” — szybki skan danych + CTA bez rozpraszaczy.</Sub>
              </div>
              <TicketButton href="#contact" $tone="secondary">
                Zapytaj o dostępność
              </TicketButton>
            </SectionHead>

            <Picks>
              {CARS.map((car) => (
                <CarTicket key={car.id}>
                  <CarMedia>
                    <img src={car.img} alt={`${car.brand} ${car.model}`} loading="lazy" />
                    <Tag>{car.tag}</Tag>
                  </CarMedia>
                  <Cut />
                  <CarBody>
                    <CarTitle>
                      {car.brand} {car.model}
                    </CarTitle>
                    <MetaRow>
                      <Meta>{car.year}</Meta>
                      <Meta>{car.mileage}</Meta>
                    </MetaRow>
                    <Foot>
                      <Price>{car.price}</Price>
                      <CarCta href="#contact">Zapytaj o to auto</CarCta>
                    </Foot>
                  </CarBody>
                </CarTicket>
              ))}
            </Picks>
          </Max>
        </Section>

        <Section id="broker">
          <Max>
            <SectionHead>
              <div>
                <H2>Auto na zamówienie</H2>
                <Sub>Opisz wymagania, a my wyszukamy, sprawdzimy i przeprowadzimy przez zakup.</Sub>
              </div>
              <TicketButton href="#contact" $tone="primary">
                Wyślij wymagania
              </TicketButton>
            </SectionHead>
          </Max>
        </Section>

        <Section id="how">
          <Max>
            <SectionHead>
              <div>
                <H2>Jak działamy</H2>
                <Sub>4 kroki — jak check‑lista przed startem: kolejno i bez skrótów.</Sub>
              </div>
            </SectionHead>

            <StepsGrid>
              {STEPS.map((s) => (
                <StepCard key={s.num}>
                  <StepNum>{s.num}</StepNum>
                  <StepTitle>{s.title}</StepTitle>
                  <StepDesc>{s.desc}</StepDesc>
                </StepCard>
              ))}
            </StepsGrid>
          </Max>
        </Section>
      </main>

      <Footer id="contact">
        <Max>
          <FooterGrid>
            <FooterCard>
              <FooterTitle>CarMentor</FooterTitle>
              <FooterText>
                Butikowa sprzedaż aut i broker. Transparentność, weryfikacja, negocjacje — zawsze po
                stronie kupującego.
              </FooterText>
              <Copy>© {new Date().getFullYear()} CarMentor</Copy>
            </FooterCard>

            <FooterCard>
              <FooterTitle>Sekcje</FooterTitle>
              <FooterLinks>
                <a href="#stock">Auta od ręki</a>
                <a href="#broker">Auto na zamówienie</a>
                <a href="#how">Jak działamy</a>
                <a href="#contact">Kontakt</a>
              </FooterLinks>
            </FooterCard>

            <FooterCard>
              <FooterTitle>Kontakt</FooterTitle>
              <Contact>
                <div>Telefon: +48 000 000 000</div>
                <div>Email: kontakt@carmentor.pl</div>
                <div>WhatsApp: +48 000 000 000</div>
              </Contact>
            </FooterCard>
          </FooterGrid>
        </Max>
      </Footer>
    </Page>
  );
}

