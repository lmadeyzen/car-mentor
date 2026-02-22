import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
    background: radial-gradient(900px 600px at 20% -10%, rgba(79, 255, 214, 0.14), rgba(7, 10, 15, 0) 60%),
                radial-gradient(900px 600px at 110% 0%, rgba(132, 102, 255, 0.16), rgba(7, 10, 15, 0) 55%),
                #070a0f;
    color: #e9eef7;
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

const Max = styled.div`
  width: 100%;
  max-width: 1200px;
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
  background: rgba(7, 10, 15, 0.62);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(233, 238, 247, 0.08);
`;

const Nav = styled.nav`
  height: 76px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

const Brand = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-weight: 850;
  letter-spacing: -0.03em;
  font-size: 18px;
`;

const Glow = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: linear-gradient(135deg, #4fffd6, #8466ff);
  box-shadow: 0 0 0 6px rgba(79, 255, 214, 0.08), 0 0 0 12px rgba(132, 102, 255, 0.06);
`;

const Links = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px;
  border-radius: 999px;
  background: rgba(233, 238, 247, 0.05);
  border: 1px solid rgba(233, 238, 247, 0.1);

  a {
    padding: 10px 12px;
    border-radius: 999px;
    font-size: 13px;
    color: rgba(233, 238, 247, 0.78);
    transition: background 140ms ease, color 140ms ease;
    white-space: nowrap;
  }
  a:hover {
    background: rgba(233, 238, 247, 0.08);
    color: rgba(233, 238, 247, 0.96);
  }

  @media (max-width: 1023px) {
    display: none;
  }
`;

const Right = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
`;

const Pill = styled.a<{ $variant: "primary" | "secondary" }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 11px 14px;
  border-radius: 999px;
  font-weight: 750;
  letter-spacing: -0.01em;
  font-size: 13px;
  border: 1px solid rgba(233, 238, 247, 0.12);
  transition: transform 140ms ease, background 140ms ease, box-shadow 140ms ease;
  white-space: nowrap;

  ${(p) =>
    p.$variant === "primary"
      ? `
        background: linear-gradient(135deg, rgba(79,255,214,0.22), rgba(132,102,255,0.22));
        box-shadow: 0 16px 44px rgba(132, 102, 255, 0.12);
        color: rgba(233, 238, 247, 0.98);
      `
      : `
        background: rgba(233, 238, 247, 0.06);
        color: rgba(233, 238, 247, 0.86);
      `}

  &:hover {
    transform: translateY(-1px);
    background: rgba(233, 238, 247, 0.1);
  }
`;

const Burger = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 999px;
  border: 1px solid rgba(233, 238, 247, 0.12);
  background: rgba(233, 238, 247, 0.06);
  display: none;
  align-items: center;
  justify-content: center;

  span {
    width: 18px;
    height: 2px;
    border-radius: 999px;
    background: rgba(233, 238, 247, 0.86);
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
    background: rgba(233, 238, 247, 0.86);
  }
  span::before {
    top: -6px;
  }
  span::after {
    top: 6px;
  }

  @media (max-width: 1023px) {
    display: inline-flex;
  }
`;

const Hero = styled.section`
  padding: 58px 0 28px;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: -120px -40px auto auto;
    width: 520px;
    height: 520px;
    background: radial-gradient(circle at 30% 30%, rgba(79, 255, 214, 0.22), rgba(79, 255, 214, 0) 60%),
      radial-gradient(circle at 70% 70%, rgba(132, 102, 255, 0.22), rgba(132, 102, 255, 0) 60%);
    filter: blur(6px);
    transform: rotate(18deg);
    pointer-events: none;
  }

  @media (max-width: 767px) {
    padding: 42px 0 18px;
  }
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 18px;
  align-items: stretch;

  @media (max-width: 1023px) {
    grid-template-columns: 1fr;
  }
`;

const HeroPanel = styled.div`
  position: relative;
  border-radius: 28px;
  border: 1px solid rgba(233, 238, 247, 0.1);
  background: linear-gradient(180deg, rgba(233, 238, 247, 0.06), rgba(233, 238, 247, 0.03));
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, rgba(79, 255, 214, 0.08), rgba(132, 102, 255, 0.06));
    opacity: 0.8;
    pointer-events: none;
    mask: radial-gradient(220px 220px at 20% 20%, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0) 70%);
  }
`;

const HeroCopy = styled.div`
  padding: 34px 30px;
  position: relative;
  z-index: 1;

  @media (max-width: 767px) {
    padding: 26px 20px;
  }
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid rgba(233, 238, 247, 0.12);
  background: rgba(233, 238, 247, 0.05);
  font-size: 12px;
  color: rgba(233, 238, 247, 0.78);
`;

const H1 = styled.h1`
  margin-top: 14px;
  font-size: 54px;
  letter-spacing: -0.05em;
  line-height: 1.02;
  font-weight: 900;

  span {
    background: linear-gradient(135deg, #4fffd6, #8466ff);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  @media (max-width: 1023px) {
    font-size: 48px;
  }
  @media (max-width: 767px) {
    font-size: 38px;
  }
`;

const Lead = styled.p`
  margin-top: 14px;
  max-width: 62ch;
  color: rgba(233, 238, 247, 0.74);
  font-size: 15px;
  line-height: 1.7;
`;

const HeroCtas = styled.div`
  margin-top: 22px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const HeroSide = styled(HeroPanel)`
  display: grid;
  grid-template-rows: auto 1fr;
`;

const SideTop = styled.div`
  padding: 18px 18px 0;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  position: relative;
  z-index: 1;
`;

const SideTitle = styled.div`
  font-weight: 850;
  letter-spacing: -0.03em;
`;

const SideMeta = styled.div`
  margin-top: 4px;
  font-size: 12px;
  color: rgba(233, 238, 247, 0.66);
`;

const SideTag = styled.div`
  padding: 8px 10px;
  border-radius: 999px;
  background: rgba(79, 255, 214, 0.14);
  border: 1px solid rgba(79, 255, 214, 0.22);
  color: rgba(233, 238, 247, 0.92);
  font-weight: 750;
  font-size: 12px;
  white-space: nowrap;
`;

const SidePhoto = styled.div`
  margin: 14px 18px 18px;
  border-radius: 22px;
  overflow: hidden;
  border: 1px solid rgba(233, 238, 247, 0.1);
  background: rgba(233, 238, 247, 0.04);
  position: relative;

  img {
    width: 100%;
    height: 100%;
    min-height: 240px;
    object-fit: cover;
    filter: saturate(1.05) contrast(1.02);
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(7, 10, 15, 0.0) 0%, rgba(7, 10, 15, 0.35) 100%);
    pointer-events: none;
  }
`;

const Section = styled.section`
  padding: 32px 0;
  @media (max-width: 767px) {
    padding: 26px 0;
  }
`;

const SectionHead = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 14px;
  flex-wrap: wrap;
`;

const H2 = styled.h2`
  font-size: 22px;
  letter-spacing: -0.03em;
  font-weight: 900;
`;

const Sub = styled.p`
  color: rgba(233, 238, 247, 0.7);
  font-size: 14px;
  line-height: 1.7;
  max-width: 60ch;
`;

const PicksRail = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 1023px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 767px) {
    grid-auto-flow: column;
    grid-auto-columns: 82%;
    grid-template-columns: unset;
    overflow-x: auto;
    padding-bottom: 8px;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
  }
`;

const Card = styled.article`
  border-radius: 22px;
  border: 1px solid rgba(233, 238, 247, 0.12);
  background: rgba(233, 238, 247, 0.04);
  overflow: hidden;
  position: relative;
  scroll-snap-align: start;

  &:hover {
    border-color: rgba(79, 255, 214, 0.22);
  }
`;

const CardMedia = styled.div`
  position: relative;
  height: 170px;
  background: rgba(233, 238, 247, 0.03);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(7, 10, 15, 0.05) 0%, rgba(7, 10, 15, 0.52) 100%);
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
  font-weight: 800;
  letter-spacing: -0.01em;
  background: rgba(7, 10, 15, 0.6);
  border: 1px solid rgba(233, 238, 247, 0.14);
  color: rgba(233, 238, 247, 0.92);
  backdrop-filter: blur(10px);
`;

const CardBody = styled.div`
  padding: 14px 14px 16px;
`;

const Title = styled.div`
  font-weight: 900;
  letter-spacing: -0.02em;
`;

const Specs = styled.div`
  margin-top: 8px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  color: rgba(233, 238, 247, 0.76);
  font-size: 13px;
`;

const Chip = styled.span`
  padding: 7px 10px;
  border-radius: 999px;
  border: 1px solid rgba(233, 238, 247, 0.12);
  background: rgba(233, 238, 247, 0.04);
`;

const CardFoot = styled.div`
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
  border-radius: 999px;
  border: 1px solid rgba(233, 238, 247, 0.12);
  background: rgba(233, 238, 247, 0.06);
  font-weight: 800;
  font-size: 13px;
  transition: transform 140ms ease, background 140ms ease;
  white-space: nowrap;
  &:hover {
    transform: translateY(-1px);
    background: rgba(233, 238, 247, 0.1);
  }
`;

const StepsShell = styled.div`
  border-radius: 26px;
  border: 1px solid rgba(233, 238, 247, 0.12);
  background: rgba(233, 238, 247, 0.03);
  padding: 18px;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 18px;
    bottom: 18px;
    left: 24px;
    width: 2px;
    background: linear-gradient(180deg, rgba(79, 255, 214, 0.0), rgba(79, 255, 214, 0.35), rgba(132, 102, 255, 0.35), rgba(132, 102, 255, 0.0));
    opacity: 0.9;
  }
`;

const Step = styled.div`
  display: grid;
  grid-template-columns: 42px 1fr;
  gap: 14px;
  padding: 14px 10px 14px 10px;
  border-radius: 18px;
  position: relative;

  &:hover {
    background: rgba(233, 238, 247, 0.04);
  }
`;

const StepNum = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 950;
  letter-spacing: -0.03em;
  background: rgba(233, 238, 247, 0.05);
  border: 1px solid rgba(233, 238, 247, 0.12);
  box-shadow: 0 0 0 6px rgba(79, 255, 214, 0.03);
`;

const StepTitle = styled.div`
  font-weight: 900;
  letter-spacing: -0.02em;
`;

const StepDesc = styled.div`
  margin-top: 6px;
  color: rgba(233, 238, 247, 0.72);
  font-size: 13px;
  line-height: 1.7;
`;

const Footer = styled.footer`
  padding: 36px 0 46px;
  border-top: 1px solid rgba(233, 238, 247, 0.1);
  background: rgba(7, 10, 15, 0.55);
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr;
  gap: 14px;

  @media (max-width: 1023px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const FooterCard = styled.div`
  border-radius: 22px;
  border: 1px solid rgba(233, 238, 247, 0.12);
  background: rgba(233, 238, 247, 0.03);
  padding: 16px;
`;

const FooterTitle = styled.div`
  font-weight: 950;
  letter-spacing: -0.03em;
`;

const FooterText = styled.p`
  margin-top: 10px;
  color: rgba(233, 238, 247, 0.72);
  font-size: 14px;
  line-height: 1.75;
`;

const FooterLinks = styled.div`
  margin-top: 10px;
  display: grid;
  gap: 8px;
  color: rgba(233, 238, 247, 0.78);
  font-size: 14px;
`;

const Contact = styled.div`
  margin-top: 10px;
  display: grid;
  gap: 8px;
  color: rgba(233, 238, 247, 0.78);
  font-size: 14px;
`;

const Copy = styled.div`
  margin-top: 16px;
  font-size: 12px;
  color: rgba(233, 238, 247, 0.56);
`;

export default function Layout02() {
  return (
    <Page>
      <GlobalStyle />

      <Header>
        <Max>
          <Nav>
            <Brand href="#top" aria-label="CarMentor — strona główna">
              <Glow />
              CarMentor
            </Brand>

            <Links aria-label="Główna nawigacja">
              <a href="#stock">Auta od ręki</a>
              <a href="#broker">Auto na zamówienie</a>
              <a href="#how">Jak działamy</a>
              <a href="#contact">Kontakt</a>
            </Links>

            <Right>
              <Pill href="#stock" $variant="secondary">
                Zobacz stock
              </Pill>
              <Pill href="#contact" $variant="primary">
                Umów rozmowę
              </Pill>
              <Burger aria-label="Menu (mobile)">
                <span />
              </Burger>
            </Right>
          </Nav>
        </Max>
      </Header>

      <main id="top">
        <Hero>
          <Max>
            <HeroGrid>
              <HeroPanel>
                <HeroCopy>
                  <Badge>
                    <Glow />
                    Stoimy po stronie kupującego
                  </Badge>
                  <H1>
                    Zakup auta z <span>kontrolą</span>.
                  </H1>
                  <Lead>
                    CarMentor to butikowy stock oraz broker — weryfikujemy, inspekcjonujemy i
                    negocjujemy, żebyś kupił dobrze albo… wcale.
                  </Lead>
                  <HeroCtas>
                    <Pill href="#stock" $variant="primary">
                      Zobacz auta od ręki
                    </Pill>
                    <Pill href="#broker" $variant="secondary">
                      Znajdź mi auto
                    </Pill>
                  </HeroCtas>
                </HeroCopy>
              </HeroPanel>

              <HeroSide>
                <SideTop>
                  <div>
                    <SideTitle>Wybrane dziś</SideTitle>
                    <SideMeta>{CARS[0].brand + " " + CARS[0].model}</SideMeta>
                  </div>
                  <SideTag>{CARS[0].tag}</SideTag>
                </SideTop>
                <SidePhoto>
                  <img src={CARS[0].img} alt={`${CARS[0].brand} ${CARS[0].model}`} />
                </SidePhoto>
              </HeroSide>
            </HeroGrid>
          </Max>
        </Hero>

        <Section id="stock">
          <Max>
            <SectionHead>
              <div>
                <H2>Top Picks (6)</H2>
                <Sub>
                  Te same dane — inna prezentacja. Na mobile: przewijany „rail”, na desktop: grid.
                </Sub>
              </div>
              <Pill href="#contact" $variant="secondary">
                Zapytaj o dostępność
              </Pill>
            </SectionHead>

            <PicksRail>
              {CARS.map((car) => (
                <Card key={car.id}>
                  <CardMedia>
                    <img src={car.img} alt={`${car.brand} ${car.model}`} loading="lazy" />
                    <Tag>{car.tag}</Tag>
                  </CardMedia>
                  <CardBody>
                    <Title>
                      {car.brand} {car.model}
                    </Title>
                    <Specs>
                      <Chip>{car.year}</Chip>
                      <Chip>{car.mileage}</Chip>
                    </Specs>
                    <CardFoot>
                      <Price>{car.price}</Price>
                      <CardCta href="#contact">Zapytaj o to auto</CardCta>
                    </CardFoot>
                  </CardBody>
                </Card>
              ))}
            </PicksRail>
          </Max>
        </Section>

        <Section id="broker">
          <Max>
            <SectionHead>
              <div>
                <H2>Broker — auto na zamówienie</H2>
                <Sub>Opisz wymagania, a my zajmiemy się resztą: od selekcji po negocjacje.</Sub>
              </div>
              <Pill href="#contact" $variant="primary">
                Znajdź mi auto
              </Pill>
            </SectionHead>
          </Max>
        </Section>

        <Section id="how">
          <Max>
            <SectionHead>
              <div>
                <H2>Jak działamy</H2>
                <Sub>Timeline procesu — z naciskiem na weryfikację i kontrolę ryzyka.</Sub>
              </div>
            </SectionHead>

            <StepsShell>
              {STEPS.map((s) => (
                <Step key={s.num}>
                  <StepNum>{s.num}</StepNum>
                  <div>
                    <StepTitle>{s.title}</StepTitle>
                    <StepDesc>{s.desc}</StepDesc>
                  </div>
                </Step>
              ))}
            </StepsShell>
          </Max>
        </Section>
      </main>

      <Footer id="contact">
        <Max>
          <FooterGrid>
            <FooterCard>
              <FooterTitle>CarMentor</FooterTitle>
              <FooterText>
                Butikowa marka sprzedaży aut i broker. Transparentność, inspekcja, negocjacje — po
                stronie kupującego.
              </FooterText>
              <Copy>© {new Date().getFullYear()} CarMentor</Copy>
            </FooterCard>

            <FooterCard>
              <FooterTitle>Linki</FooterTitle>
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

