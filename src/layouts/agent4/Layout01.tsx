import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
    background: radial-gradient(1200px 600px at 20% -10%, rgba(196, 167, 110, 0.24), rgba(255, 255, 255, 0) 55%),
                radial-gradient(900px 500px at 90% 10%, rgba(24, 83, 153, 0.14), rgba(255, 255, 255, 0) 55%),
                #fbfbfc;
    color: #101114;
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
  z-index: 10;
  background: rgba(251, 251, 252, 0.76);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(16, 17, 20, 0.06);
`;

const Nav = styled.nav`
  height: 72px;
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
  align-items: baseline;
  gap: 10px;
  font-weight: 750;
  letter-spacing: -0.02em;
  font-size: 18px;

  span {
    font-family: ui-serif, Georgia, "Times New Roman", Times, serif;
    letter-spacing: -0.03em;
    font-size: 22px;
  }
`;

const NavLinks = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 18px;
  justify-content: center;
  color: rgba(16, 17, 20, 0.82);
  font-size: 14px;

  a {
    padding: 10px 8px;
    border-radius: 10px;
    transition: background 140ms ease, color 140ms ease;
  }
  a:hover {
    background: rgba(16, 17, 20, 0.06);
    color: rgba(16, 17, 20, 0.92);
  }

  @media (max-width: 1023px) {
    display: none;
  }
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
`;

const GhostLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: rgba(16, 17, 20, 0.76);
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid rgba(16, 17, 20, 0.12);
  background: rgba(255, 255, 255, 0.6);
  transition: transform 140ms ease, background 140ms ease;
  white-space: nowrap;
  &:hover {
    transform: translateY(-1px);
    background: rgba(255, 255, 255, 0.9);
  }

  @media (max-width: 767px) {
    display: none;
  }
`;

const PrimaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 11px 14px;
  border-radius: 14px;
  background: linear-gradient(135deg, #141517, #1f2540);
  color: #ffffff;
  font-weight: 650;
  font-size: 14px;
  box-shadow: 0 10px 30px rgba(16, 17, 20, 0.16);
  transition: transform 140ms ease, box-shadow 140ms ease;
  white-space: nowrap;
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 14px 34px rgba(16, 17, 20, 0.22);
  }
`;

const Burger = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 14px;
  border: 1px solid rgba(16, 17, 20, 0.12);
  background: rgba(255, 255, 255, 0.6);
  display: none;
  align-items: center;
  justify-content: center;

  @media (max-width: 1023px) {
    display: inline-flex;
  }

  span {
    width: 18px;
    height: 2px;
    background: rgba(16, 17, 20, 0.78);
    position: relative;
    border-radius: 999px;
  }
  span::before,
  span::after {
    content: "";
    position: absolute;
    left: 0;
    width: 18px;
    height: 2px;
    background: rgba(16, 17, 20, 0.78);
    border-radius: 999px;
  }
  span::before {
    top: -6px;
  }
  span::after {
    top: 6px;
  }
`;

const Hero = styled.section`
  padding: 56px 0 28px;

  @media (max-width: 767px) {
    padding: 40px 0 18px;
  }
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1.25fr 0.85fr;
  gap: 24px;
  align-items: stretch;

  @media (max-width: 1023px) {
    grid-template-columns: 1fr;
  }
`;

const HeroCard = styled.div`
  border-radius: 24px;
  border: 1px solid rgba(16, 17, 20, 0.08);
  background: rgba(255, 255, 255, 0.62);
  box-shadow: 0 30px 80px rgba(16, 17, 20, 0.08);
  overflow: hidden;
`;

const HeroCopy = styled.div`
  padding: 34px 32px;

  @media (max-width: 767px) {
    padding: 26px 20px;
  }
`;

const Eyebrow = styled.div`
  display: inline-flex;
  gap: 10px;
  align-items: center;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(16, 17, 20, 0.64);
  margin-bottom: 14px;
`;

const Dot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: linear-gradient(135deg, rgba(196, 167, 110, 1), rgba(24, 83, 153, 1));
`;

const H1 = styled.h1`
  font-family: ui-serif, Georgia, "Times New Roman", Times, serif;
  font-weight: 750;
  letter-spacing: -0.04em;
  font-size: 54px;
  line-height: 1.03;

  @media (max-width: 1023px) {
    font-size: 46px;
  }

  @media (max-width: 767px) {
    font-size: 38px;
  }
`;

const Lead = styled.p`
  margin-top: 14px;
  font-size: 16px;
  line-height: 1.6;
  color: rgba(16, 17, 20, 0.74);
  max-width: 58ch;
`;

const HeroCtas = styled.div`
  margin-top: 22px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const SecondaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 11px 14px;
  border-radius: 14px;
  background: rgba(16, 17, 20, 0.06);
  border: 1px solid rgba(16, 17, 20, 0.12);
  color: rgba(16, 17, 20, 0.86);
  font-weight: 650;
  font-size: 14px;
  transition: transform 140ms ease, background 140ms ease;
  &:hover {
    transform: translateY(-1px);
    background: rgba(16, 17, 20, 0.09);
  }
`;

const HeroAside = styled(HeroCard)`
  display: grid;
  grid-template-rows: 1fr auto;
`;

const Photo = styled.div`
  position: relative;
  height: 100%;
  min-height: 260px;
  background: #f2f3f6;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(251, 251, 252, 0) 0%,
      rgba(251, 251, 252, 0) 52%,
      rgba(251, 251, 252, 0.95) 100%
    );
    pointer-events: none;
  }
`;

const AsideMeta = styled.div`
  padding: 16px 18px 18px;
  display: grid;
  gap: 10px;
`;

const MetaRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

const MetaTile = styled.div`
  border-radius: 16px;
  background: rgba(16, 17, 20, 0.04);
  border: 1px solid rgba(16, 17, 20, 0.08);
  padding: 12px;
`;

const MetaK = styled.div`
  font-size: 12px;
  color: rgba(16, 17, 20, 0.62);
  letter-spacing: 0.02em;
`;

const MetaV = styled.div`
  margin-top: 6px;
  font-weight: 700;
  letter-spacing: -0.02em;
`;

const Section = styled.section`
  padding: 34px 0;

  @media (max-width: 767px) {
    padding: 26px 0;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
`;

const H2 = styled.h2`
  font-family: ui-serif, Georgia, "Times New Roman", Times, serif;
  font-weight: 750;
  letter-spacing: -0.03em;
  font-size: 30px;
`;

const Sub = styled.p`
  color: rgba(16, 17, 20, 0.66);
  font-size: 14px;
  line-height: 1.6;
  max-width: 50ch;
`;

const CarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 1023px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const CarCard = styled.article`
  border-radius: 22px;
  border: 1px solid rgba(16, 17, 20, 0.08);
  background: rgba(255, 255, 255, 0.72);
  overflow: hidden;
  box-shadow: 0 24px 60px rgba(16, 17, 20, 0.08);
  transition: transform 160ms ease, box-shadow 160ms ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 30px 70px rgba(16, 17, 20, 0.12);
  }
`;

const CarMedia = styled.div`
  position: relative;
  height: 178px;
  background: #f2f3f6;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

const Tag = styled.div`
  position: absolute;
  left: 12px;
  top: 12px;
  padding: 7px 10px;
  border-radius: 999px;
  background: rgba(16, 17, 20, 0.78);
  color: rgba(255, 255, 255, 0.96);
  font-size: 12px;
  font-weight: 650;
  letter-spacing: 0.01em;
`;

const CarBody = styled.div`
  padding: 16px 16px 14px;
`;

const CarTitle = styled.div`
  font-weight: 750;
  letter-spacing: -0.02em;
  font-size: 16px;
`;

const CarSpec = styled.div`
  margin-top: 8px;
  color: rgba(16, 17, 20, 0.68);
  font-size: 13px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const SpecPill = styled.span`
  padding: 7px 10px;
  border-radius: 999px;
  border: 1px solid rgba(16, 17, 20, 0.1);
  background: rgba(16, 17, 20, 0.03);
`;

const CarFooter = styled.div`
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

const Price = styled.div`
  font-weight: 800;
  letter-spacing: -0.03em;
`;

const CardCta = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 12px;
  border-radius: 14px;
  border: 1px solid rgba(16, 17, 20, 0.12);
  background: rgba(255, 255, 255, 0.7);
  font-weight: 650;
  font-size: 13px;
  transition: transform 140ms ease, background 140ms ease;
  white-space: nowrap;
  &:hover {
    transform: translateY(-1px);
    background: rgba(255, 255, 255, 0.95);
  }
`;

const StepsWrap = styled.div`
  border-radius: 26px;
  border: 1px solid rgba(16, 17, 20, 0.08);
  background: rgba(255, 255, 255, 0.66);
  box-shadow: 0 30px 80px rgba(16, 17, 20, 0.08);
  overflow: hidden;
`;

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media (max-width: 1023px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const Step = styled.div`
  padding: 18px 18px 20px;
  border-right: 1px solid rgba(16, 17, 20, 0.08);

  @media (max-width: 1023px) {
    &:nth-child(2n) {
      border-right: none;
    }
  }

  @media (max-width: 767px) {
    border-right: none;
    border-bottom: 1px solid rgba(16, 17, 20, 0.08);
    &:last-child {
      border-bottom: none;
    }
  }
`;

const StepNum = styled.div`
  font-family: ui-serif, Georgia, "Times New Roman", Times, serif;
  font-size: 28px;
  letter-spacing: -0.04em;
  font-weight: 800;
`;

const StepTitle = styled.div`
  margin-top: 10px;
  font-weight: 750;
  letter-spacing: -0.02em;
`;

const StepDesc = styled.div`
  margin-top: 8px;
  font-size: 13px;
  line-height: 1.6;
  color: rgba(16, 17, 20, 0.68);
`;

const Footer = styled.footer`
  padding: 36px 0 44px;
  border-top: 1px solid rgba(16, 17, 20, 0.08);
  background: rgba(255, 255, 255, 0.42);
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr;
  gap: 18px;

  @media (max-width: 1023px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const FooterCard = styled.div`
  border-radius: 20px;
  border: 1px solid rgba(16, 17, 20, 0.08);
  background: rgba(255, 255, 255, 0.62);
  padding: 16px;
`;

const FooterTitle = styled.div`
  font-weight: 800;
  letter-spacing: -0.02em;
`;

const FooterText = styled.p`
  margin-top: 10px;
  font-size: 14px;
  line-height: 1.65;
  color: rgba(16, 17, 20, 0.7);
`;

const FooterLinks = styled.div`
  margin-top: 10px;
  display: grid;
  gap: 8px;
  font-size: 14px;
  color: rgba(16, 17, 20, 0.78);
`;

const ContactList = styled.div`
  margin-top: 10px;
  display: grid;
  gap: 8px;
  font-size: 14px;
  color: rgba(16, 17, 20, 0.78);
`;

const Copyright = styled.div`
  margin-top: 18px;
  font-size: 12px;
  color: rgba(16, 17, 20, 0.58);
`;

export default function Layout01() {
  return (
    <Page>
      <GlobalStyle />
      <Header>
        <Max>
          <Nav>
            <Brand href="#top" aria-label="CarMentor — strona główna">
              <span>CarMentor</span>
            </Brand>

            <NavLinks aria-label="Główna nawigacja">
              <a href="#stock">Auta od ręki</a>
              <a href="#broker">Auto na zamówienie</a>
              <a href="#how">Jak działamy</a>
              <a href="#contact">Kontakt</a>
            </NavLinks>

            <NavRight>
              <GhostLink href="#broker">Znajdź mi auto</GhostLink>
              <PrimaryButton href="#contact">Umów rozmowę</PrimaryButton>
              <Burger aria-label="Menu (mobile)">
                <span />
              </Burger>
            </NavRight>
          </Nav>
        </Max>
      </Header>

      <main id="top">
        <Hero>
          <Max>
            <HeroGrid>
              <HeroCard>
                <HeroCopy>
                  <Eyebrow>
                    <Dot />
                    Stoimy po stronie kupującego
                  </Eyebrow>
                  <H1>Elegancki zakup auta. Bez ryzyka.</H1>
                  <Lead>
                    Pomagamy kupować mądrze: weryfikujemy historię, stan i realną wartość auta. Jeśli
                    coś jest nie tak — odradzimy.
                  </Lead>
                  <HeroCtas>
                    <PrimaryButton href="#stock">Zobacz auta od ręki</PrimaryButton>
                    <SecondaryButton href="#broker">Znajdź mi auto</SecondaryButton>
                  </HeroCtas>
                </HeroCopy>
              </HeroCard>

              <HeroAside>
                <Photo>
                  <img src={CARS[4].img} alt={`${CARS[4].brand} ${CARS[4].model}`} />
                </Photo>
                <AsideMeta>
                  <MetaRow>
                    <MetaTile>
                      <MetaK>Tryb</MetaK>
                      <MetaV>Stock &amp; Broker</MetaV>
                    </MetaTile>
                    <MetaTile>
                      <MetaK>Model pracy</MetaK>
                      <MetaV>Transparentnie</MetaV>
                    </MetaTile>
                  </MetaRow>
                  <MetaRow>
                    <MetaTile>
                      <MetaK>Weryfikacja</MetaK>
                      <MetaV>VIN • historia • stan</MetaV>
                    </MetaTile>
                    <MetaTile>
                      <MetaK>Cel</MetaK>
                      <MetaV>Lead • rozmowa</MetaV>
                    </MetaTile>
                  </MetaRow>
                </AsideMeta>
              </HeroAside>
            </HeroGrid>
          </Max>
        </Hero>

        <Section id="stock">
          <Max>
            <SectionHeader>
              <div>
                <H2>Top picks</H2>
                <Sub>6 sprawdzonych propozycji — gotowych „od ręki” lub po pełnej weryfikacji.</Sub>
              </div>
              <SecondaryButton href="#contact">Zapytaj o dostępność</SecondaryButton>
            </SectionHeader>

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
                    <CarSpec>
                      <SpecPill>{car.year}</SpecPill>
                      <SpecPill>{car.mileage}</SpecPill>
                    </CarSpec>
                    <CarFooter>
                      <Price>{car.price}</Price>
                      <CardCta href="#contact">Zapytaj o to auto</CardCta>
                    </CarFooter>
                  </CarBody>
                </CarCard>
              ))}
            </CarGrid>
          </Max>
        </Section>

        <Section id="broker">
          <Max>
            <SectionHeader>
              <div>
                <H2>Auto na zamówienie</H2>
                <Sub>Opisz wymagania, a my wyszukamy, sprawdzimy i przeprowadzimy Cię przez zakup.</Sub>
              </div>
              <PrimaryButton href="#contact">Wyślij wymagania</PrimaryButton>
            </SectionHeader>
          </Max>
        </Section>

        <Section id="how">
          <Max>
            <SectionHeader>
              <div>
                <H2>Jak działamy</H2>
                <Sub>4 kroki, które zamieniają zakup auta w kontrolowany proces.</Sub>
              </div>
            </SectionHeader>

            <StepsWrap>
              <StepsGrid>
                {STEPS.map((s) => (
                  <Step key={s.num}>
                    <StepNum>{s.num}</StepNum>
                    <StepTitle>{s.title}</StepTitle>
                    <StepDesc>{s.desc}</StepDesc>
                  </Step>
                ))}
              </StepsGrid>
            </StepsWrap>
          </Max>
        </Section>
      </main>

      <Footer id="contact">
        <Max>
          <FooterGrid>
            <FooterCard>
              <FooterTitle>CarMentor</FooterTitle>
              <FooterText>
                Butikowa sprzedaż aut i broker. Weryfikujemy, negocjujemy i — gdy trzeba — odradzamy
                zakup.
              </FooterText>
              <Copyright>© {new Date().getFullYear()} CarMentor</Copyright>
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
              <ContactList>
                <div>Telefon: +48 000 000 000</div>
                <div>Email: kontakt@carmentor.pl</div>
                <div>WhatsApp: +48 000 000 000</div>
              </ContactList>
            </FooterCard>
          </FooterGrid>
        </Max>
      </Footer>
    </Page>
  );
}

