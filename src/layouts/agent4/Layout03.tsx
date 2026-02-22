import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
    background: #f6f6f4;
    color: #0b0c10;
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
`;

const Shell = styled.div`
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 24px;

  @media (max-width: 767px) {
    padding: 0 18px;
  }
`;

const Frame = styled.div`
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  gap: 24px;
  padding: 22px 0 0;

  @media (max-width: 1023px) {
    grid-template-columns: 1fr;
    gap: 0;
    padding: 0;
  }
`;

const Sidebar = styled.aside`
  position: sticky;
  top: 18px;
  align-self: start;
  border: 1px solid rgba(11, 12, 16, 0.16);
  background: rgba(246, 246, 244, 0.65);
  border-radius: 22px;
  padding: 18px 16px;

  @media (max-width: 1023px) {
    position: sticky;
    top: 0;
    z-index: 20;
    border-radius: 0;
    border-left: none;
    border-right: none;
    padding: 16px 0;
    background: rgba(246, 246, 244, 0.82);
    backdrop-filter: blur(12px);
  }
`;

const SideInner = styled.div`
  display: grid;
  gap: 14px;
  @media (max-width: 1023px) {
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 12px;
  }
`;

const Brand = styled.a`
  font-weight: 900;
  letter-spacing: -0.04em;
  font-size: 20px;
  line-height: 1;

  @media (max-width: 1023px) {
    padding-left: 18px;
  }
`;

const SideLinks = styled.nav`
  display: grid;
  gap: 8px;
  font-size: 14px;
  color: rgba(11, 12, 16, 0.76);

  a {
    padding: 10px 12px;
    border-radius: 14px;
    border: 1px solid rgba(11, 12, 16, 0.14);
    background: rgba(255, 255, 255, 0.55);
    transition: background 140ms ease;
  }
  a:hover {
    background: rgba(255, 255, 255, 0.85);
  }

  @media (max-width: 1023px) {
    display: none;
  }
`;

const SideCtas = styled.div`
  display: grid;
  gap: 10px;
  margin-top: 4px;
  @media (max-width: 1023px) {
    margin-top: 0;
    padding-right: 18px;
    display: flex;
    gap: 10px;
    justify-content: flex-end;
  }
`;

const Cta = styled.a<{ $variant: "primary" | "secondary" }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 11px 12px;
  border-radius: 16px;
  font-size: 13px;
  font-weight: 850;
  letter-spacing: -0.01em;
  border: 1px solid rgba(11, 12, 16, 0.18);
  white-space: nowrap;

  ${(p) =>
    p.$variant === "primary"
      ? `
        background: #0b0c10;
        color: #f6f6f4;
      `
      : `
        background: rgba(255,255,255,0.6);
        color: rgba(11, 12, 16, 0.86);
      `}

  &:hover {
    background: ${(p) => (p.$variant === "primary" ? "#111219" : "rgba(255,255,255,0.9)")};
  }

  @media (max-width: 767px) {
    padding: 10px 11px;
  }
`;

const Burger = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 16px;
  border: 1px solid rgba(11, 12, 16, 0.18);
  background: rgba(255, 255, 255, 0.55);
  display: none;
  align-items: center;
  justify-content: center;

  @media (max-width: 1023px) {
    display: inline-flex;
    margin-right: 18px;
  }

  span {
    width: 18px;
    height: 2px;
    border-radius: 999px;
    background: rgba(11, 12, 16, 0.86);
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
    background: rgba(11, 12, 16, 0.86);
  }
  span::before {
    top: -6px;
  }
  span::after {
    top: 6px;
  }
`;

const SideTopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  @media (max-width: 1023px) {
    padding: 0 18px;
  }
`;

const Main = styled.main`
  padding-bottom: 48px;
`;

const Section = styled.section`
  border: 1px solid rgba(11, 12, 16, 0.16);
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.48);
  padding: 22px;
  margin-bottom: 16px;
  overflow: hidden;

  @media (max-width: 767px) {
    padding: 18px;
  }
`;

const Hero = styled(Section)`
  padding: 28px 22px;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: -40px;
    top: -40px;
    width: 220px;
    height: 220px;
    border-radius: 999px;
    border: 1px solid rgba(11, 12, 16, 0.22);
    opacity: 0.55;
  }
  &::after {
    content: "";
    position: absolute;
    right: -60px;
    bottom: -60px;
    width: 320px;
    height: 320px;
    border-radius: 999px;
    border: 1px solid rgba(11, 12, 16, 0.16);
    opacity: 0.45;
  }
`;

const Eyebrow = styled.div`
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(11, 12, 16, 0.62);
`;

const H1 = styled.h1`
  margin-top: 14px;
  font-size: 54px;
  font-weight: 950;
  letter-spacing: -0.06em;
  line-height: 0.98;
  max-width: 18ch;

  @media (max-width: 1023px) {
    font-size: 48px;
  }
  @media (max-width: 767px) {
    font-size: 38px;
  }
`;

const Lead = styled.p`
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.8;
  color: rgba(11, 12, 16, 0.74);
  max-width: 70ch;
`;

const HeroCtas = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 12px;
`;

const H2 = styled.h2`
  font-size: 20px;
  letter-spacing: -0.03em;
  font-weight: 950;
`;

const Sub = styled.p`
  font-size: 14px;
  line-height: 1.75;
  color: rgba(11, 12, 16, 0.7);
  max-width: 68ch;
`;

const CarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 12px;
`;

const CarCard = styled.article`
  grid-column: span 4;
  border: 1px solid rgba(11, 12, 16, 0.16);
  border-radius: 18px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.55);

  @media (max-width: 1023px) {
    grid-column: span 6;
  }
  @media (max-width: 767px) {
    grid-column: span 12;
  }
`;

const CarMedia = styled.div`
  position: relative;
  height: 170px;
  background: rgba(11, 12, 16, 0.06);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(1) contrast(1.05) brightness(1.02);
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.0) 0%, rgba(255, 255, 255, 0.35) 100%);
    pointer-events: none;
  }
`;

const Tag = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 7px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: -0.01em;
  border: 1px solid rgba(11, 12, 16, 0.22);
  background: rgba(246, 246, 244, 0.72);
`;

const CarBody = styled.div`
  padding: 14px;
`;

const CarTitle = styled.div`
  font-weight: 950;
  letter-spacing: -0.03em;
`;

const CarMeta = styled.div`
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 13px;
  color: rgba(11, 12, 16, 0.72);
`;

const Meta = styled.span`
  padding: 7px 10px;
  border: 1px solid rgba(11, 12, 16, 0.16);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.58);
`;

const CarFoot = styled.div`
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

const Price = styled.div`
  font-weight: 950;
  letter-spacing: -0.03em;
`;

const CardCta = styled.a`
  padding: 10px 12px;
  border-radius: 16px;
  border: 1px solid rgba(11, 12, 16, 0.18);
  background: rgba(246, 246, 244, 0.72);
  font-weight: 900;
  font-size: 13px;
  white-space: nowrap;
  &:hover {
    background: rgba(255, 255, 255, 0.92);
  }
`;

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const StepCard = styled.div`
  border: 1px solid rgba(11, 12, 16, 0.16);
  background: rgba(255, 255, 255, 0.55);
  border-radius: 18px;
  padding: 16px;
`;

const StepNum = styled.div`
  font-weight: 950;
  letter-spacing: -0.08em;
  font-size: 44px;
  line-height: 1;
`;

const StepTitle = styled.div`
  margin-top: 10px;
  font-weight: 950;
  letter-spacing: -0.03em;
`;

const StepDesc = styled.div`
  margin-top: 8px;
  font-size: 13px;
  line-height: 1.75;
  color: rgba(11, 12, 16, 0.72);
`;

const Footer = styled.footer`
  border: 1px solid rgba(11, 12, 16, 0.16);
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.48);
  padding: 22px;
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

const FooterTitle = styled.div`
  font-weight: 950;
  letter-spacing: -0.03em;
`;

const FooterText = styled.p`
  margin-top: 10px;
  color: rgba(11, 12, 16, 0.72);
  font-size: 14px;
  line-height: 1.8;
`;

const FooterLinks = styled.div`
  margin-top: 10px;
  display: grid;
  gap: 8px;
  color: rgba(11, 12, 16, 0.78);
  font-size: 14px;
`;

const Contact = styled.div`
  margin-top: 10px;
  display: grid;
  gap: 8px;
  color: rgba(11, 12, 16, 0.78);
  font-size: 14px;
`;

const Copy = styled.div`
  margin-top: 16px;
  font-size: 12px;
  color: rgba(11, 12, 16, 0.58);
`;

export default function Layout03() {
  return (
    <Page>
      <GlobalStyle />
      <Shell>
        <Frame>
          <Sidebar>
            <SideInner>
              <SideTopRow>
                <Brand href="#top" aria-label="CarMentor — strona główna">
                  CarMentor
                </Brand>
                <Burger aria-label="Menu (mobile)">
                  <span />
                </Burger>
              </SideTopRow>

              <SideLinks aria-label="Główna nawigacja">
                <a href="#stock">Auta od ręki</a>
                <a href="#broker">Auto na zamówienie</a>
                <a href="#how">Jak działamy</a>
                <a href="#contact">Kontakt</a>
              </SideLinks>

              <SideCtas>
                <Cta href="#stock" $variant="secondary">
                  Zobacz auta od ręki
                </Cta>
                <Cta href="#broker" $variant="primary">
                  Znajdź mi auto
                </Cta>
              </SideCtas>
            </SideInner>
          </Sidebar>

          <Main id="top">
            <Hero>
              <Eyebrow>Stoimy po stronie kupującego</Eyebrow>
              <H1>Zakup bez domysłów.</H1>
              <Lead>
                Butikowy stock i broker — transparentna weryfikacja, inspekcja i negocjacje. W
                CarMentor proces jest prosty: wiemy, co sprawdzić i kiedy powiedzieć „nie”.
              </Lead>
              <HeroCtas>
                <Cta href="#stock" $variant="primary">
                  Zobacz stock
                </Cta>
                <Cta href="#contact" $variant="secondary">
                  Kontakt
                </Cta>
              </HeroCtas>
            </Hero>

            <Section id="stock">
              <TitleRow>
                <div>
                  <H2>Top Picks</H2>
                  <Sub>6 kart w typograficznym gridzie — nacisk na dane, nie ozdobniki.</Sub>
                </div>
              </TitleRow>

              <CarGrid>
                {CARS.map((car) => (
                  <CarCard key={car.id}>
                    <CarMedia>
                      <img src={car.img} alt={`${car.brand} ${car.model}`} loading="lazy" />
                      <Tag>{car.tag}</Tag>
                    </CarMedia>
                    <CarBody>
                      <CarTitle>
                        {car.brand} {car.model}
                      </CarTitle>
                      <CarMeta>
                        <Meta>{car.year}</Meta>
                        <Meta>{car.mileage}</Meta>
                      </CarMeta>
                      <CarFoot>
                        <Price>{car.price}</Price>
                        <CardCta href="#contact">Zapytaj o to auto</CardCta>
                      </CarFoot>
                    </CarBody>
                  </CarCard>
                ))}
              </CarGrid>
            </Section>

            <Section id="broker">
              <TitleRow>
                <div>
                  <H2>Auto na zamówienie</H2>
                  <Sub>Wyślij wymagania — my zajmiemy się selekcją, weryfikacją i negocjacją.</Sub>
                </div>
                <Cta href="#contact" $variant="primary">
                  Wyślij wymagania
                </Cta>
              </TitleRow>
            </Section>

            <Section id="how">
              <TitleRow>
                <div>
                  <H2>Jak działamy</H2>
                  <Sub>4 kroki — czysto, konkretnie, przewidywalnie.</Sub>
                </div>
              </TitleRow>

              <StepsGrid>
                {STEPS.map((s) => (
                  <StepCard key={s.num}>
                    <StepNum>{s.num}</StepNum>
                    <StepTitle>{s.title}</StepTitle>
                    <StepDesc>{s.desc}</StepDesc>
                  </StepCard>
                ))}
              </StepsGrid>
            </Section>

            <Footer id="contact">
              <FooterGrid>
                <div>
                  <FooterTitle>CarMentor</FooterTitle>
                  <FooterText>
                    Butikowa sprzedaż aut i broker. Stoimy po stronie kupującego: weryfikujemy, a gdy
                    trzeba — odradzamy zakup.
                  </FooterText>
                  <Copy>© {new Date().getFullYear()} CarMentor</Copy>
                </div>

                <div>
                  <FooterTitle>Sekcje</FooterTitle>
                  <FooterLinks>
                    <a href="#stock">Auta od ręki</a>
                    <a href="#broker">Auto na zamówienie</a>
                    <a href="#how">Jak działamy</a>
                    <a href="#contact">Kontakt</a>
                  </FooterLinks>
                </div>

                <div>
                  <FooterTitle>Kontakt</FooterTitle>
                  <Contact>
                    <div>Telefon: +48 000 000 000</div>
                    <div>Email: kontakt@carmentor.pl</div>
                    <div>WhatsApp: +48 000 000 000</div>
                  </Contact>
                </div>
              </FooterGrid>
            </Footer>
          </Main>
        </Frame>
      </Shell>
    </Page>
  );
}

