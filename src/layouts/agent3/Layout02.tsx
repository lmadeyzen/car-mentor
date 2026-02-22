import styled, { createGlobalStyle, css } from "styled-components";

type Car = {
  id: number;
  img: string;
  brand: string;
  model: string;
  year: number;
  mileage: string;
  price: string;
  tag: "Od ręki" | "Sprawdzone";
};

type Step = {
  num: string;
  title: string;
  desc: string;
};

const CARS: Car[] = [
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

const STEPS: Step[] = [
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

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: "IBM Plex Sans", "Segoe UI", sans-serif;
    color: #f7f7fb;
    background: radial-gradient(circle at 15% 10%, #1f2a44, #0a0f1c 50%, #090b12 100%);
  }
  a { text-decoration: none; color: inherit; }
  img { max-width: 100%; display: block; }
`;

const Wrapper = styled.div`
  min-height: 100vh;
`;

const Shell = styled.div`
  width: min(1240px, calc(100% - 48px));
  margin: 0 auto;

  @media (max-width: 767px) {
    width: calc(100% - 28px);
  }
`;

const glassStyles = css`
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 24px;
  backdrop-filter: blur(6px);
`;

const Nav = styled.nav`
  padding-top: 22px;
`;

const NavRow = styled(Shell)`
  ${glassStyles}
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
`;

const Logo = styled.div`
  font-weight: 800;
  letter-spacing: 0.06em;
  font-size: 1.02rem;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 24px;
  color: #d8dff5;
  font-size: 0.93rem;

  @media (max-width: 1023px) {
    gap: 12px;
    font-size: 0.86rem;
  }

  @media (max-width: 767px) {
    display: none;
  }
`;

const Action = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  padding: 10px 16px;
  font-size: 0.85rem;
  font-weight: 700;
  background: linear-gradient(135deg, #7f8df7, #65c7f7);
  color: #0d1325;
`;

const Hamburger = styled.button`
  display: none;
  background: transparent;
  color: #d8dff5;
  border: 1px solid rgba(255, 255, 255, 0.34);
  border-radius: 9px;
  padding: 8px 10px;
  font-weight: 700;

  @media (max-width: 767px) {
    display: block;
  }
`;

const Hero = styled(Shell)`
  margin-top: 30px;
  margin-bottom: 66px;
  ${glassStyles}
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 26px;
  padding: 30px;

  @media (max-width: 1023px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 767px) {
    padding: 20px;
  }
`;

const Badge = styled.span`
  display: inline-block;
  margin-bottom: 14px;
  color: #c1cbff;
  border: 1px solid rgba(193, 203, 255, 0.35);
  border-radius: 99px;
  padding: 6px 11px;
  font-size: 0.78rem;
  font-weight: 700;
`;

const HeroTitle = styled.h1`
  font-size: clamp(2rem, 3.8vw, 3.4rem);
  line-height: 1.02;
  letter-spacing: -0.03em;
  max-width: 14ch;
`;

const HeroText = styled.p`
  color: #d2d8eb;
  margin-top: 16px;
  line-height: 1.7;
  max-width: 60ch;
`;

const Buttons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 24px;
`;

const Secondary = styled(Action)`
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.28);
  color: #f0f4ff;
`;

const HeroImage = styled.img`
  border-radius: 18px;
  min-height: 300px;
  width: 100%;
  object-fit: cover;
`;

const Section = styled.section`
  margin-bottom: 64px;
`;

const SectionHeader = styled(Shell)`
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 22px;
  margin-bottom: 18px;
`;

const Title = styled.h2`
  font-size: clamp(1.5rem, 2.4vw, 2.1rem);
`;

const Caption = styled.p`
  color: #bac5e4;
  max-width: 54ch;
`;

const Cars = styled(Shell)`
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

const Card = styled.article`
  ${glassStyles}
  overflow: hidden;
`;

const CarImage = styled.img`
  height: 190px;
  width: 100%;
  object-fit: cover;
`;

const CardBody = styled.div`
  padding: 14px;
`;

const Tag = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  color: #a8b6ff;
`;

const Name = styled.h3`
  margin: 8px 0;
  font-size: 1.06rem;
`;

const Meta = styled.p`
  color: #c4cee9;
  font-size: 0.86rem;
`;

const Price = styled.p`
  margin-top: 9px;
  margin-bottom: 12px;
  font-size: 1.16rem;
  font-weight: 800;
`;

const Ask = styled.a`
  display: inline-flex;
  width: 100%;
  justify-content: center;
  border-radius: 10px;
  padding: 10px 14px;
  font-size: 0.88rem;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.09);
  border: 1px solid rgba(255, 255, 255, 0.24);
`;

const Steps = styled(Shell)`
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

const StepCard = styled.article`
  ${glassStyles}
  padding: 18px;
`;

const Number = styled.p`
  color: #8ea0ef;
  font-size: 0.78rem;
  font-weight: 700;
  margin-bottom: 8px;
`;

const StepTitle = styled.h3`
  margin-bottom: 8px;
`;

const StepDesc = styled.p`
  color: #c0cae7;
  line-height: 1.6;
`;

const Footer = styled.footer`
  margin-bottom: 24px;
`;

const FooterGrid = styled(Shell)`
  ${glassStyles}
  padding: 28px;
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr;
  gap: 18px;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const FooterTitle = styled.p`
  font-weight: 700;
  margin-bottom: 8px;
`;

const FooterText = styled.p`
  color: #ccd5ef;
  line-height: 1.6;
`;

const FooterList = styled.ul`
  list-style: none;
  display: grid;
  gap: 7px;
  color: #d4dcf6;
`;

const Copy = styled.p`
  margin-top: 14px;
  color: #9fadd9;
  font-size: 0.82rem;
`;

export default function Layout02() {
  return (
    <Wrapper>
      <GlobalStyle />
      <Nav>
        <NavRow>
          <Logo>CarMentor</Logo>
          <NavLinks>
            <a href="#stock">Auta od ręki</a>
            <a href="#broker">Auto na zamówienie</a>
            <a href="#how">Jak działamy</a>
            <a href="#contact">Kontakt</a>
          </NavLinks>
          <Action href="#contact">Darmowa konsultacja</Action>
          <Hamburger>Menu</Hamburger>
        </NavRow>
      </Nav>

      <Hero>
        <div>
          <Badge>Butikowe doradztwo zakupowe</Badge>
          <HeroTitle>Zakup auta bez ryzyka i bez zgadywania.</HeroTitle>
          <HeroText>
            Działamy po stronie kupującego: weryfikujemy stan, historię i realną wartość
            auta. Wybierasz stock lub usługę broker i przechodzisz proces z pełnym
            wsparciem.
          </HeroText>
          <Buttons>
            <Action href="#stock">Zobacz auta od ręki</Action>
            <Secondary href="#broker">Znajdź mi auto</Secondary>
          </Buttons>
        </div>
        <HeroImage
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=900&h=700&fit=crop"
          alt="Sportowe auto"
        />
      </Hero>

      <Section id="stock">
        <SectionHeader>
          <Title>Top Picks</Title>
          <Caption>
            6 przykładowych samochodów z aktualnej selekcji. Te same dane i transparentne
            parametry, żeby decyzja była merytoryczna.
          </Caption>
        </SectionHeader>
        <Cars>
          {CARS.map((car) => (
            <Card key={car.id}>
              <CarImage src={car.img} alt={`${car.brand} ${car.model}`} />
              <CardBody>
                <Tag>{car.tag}</Tag>
                <Name>
                  {car.brand} {car.model}
                </Name>
                <Meta>
                  {car.year} • {car.mileage}
                </Meta>
                <Price>{car.price}</Price>
                <Ask href="#contact">Zapytaj o to auto</Ask>
              </CardBody>
            </Card>
          ))}
        </Cars>
      </Section>

      <div id="broker" />
      <Section id="how">
        <SectionHeader>
          <Title>Jak działamy</Title>
          <Caption>
            Niezależnie od ścieżki stock albo broker, przechodzisz przez ten sam proces
            jakości i bezpieczeństwa zakupu.
          </Caption>
        </SectionHeader>
        <Steps>
          {STEPS.map((step) => (
            <StepCard key={step.num}>
              <Number>{step.num}</Number>
              <StepTitle>{step.title}</StepTitle>
              <StepDesc>{step.desc}</StepDesc>
            </StepCard>
          ))}
        </Steps>
      </Section>

      <Footer id="contact">
        <FooterGrid>
          <div>
            <FooterTitle>CarMentor</FooterTitle>
            <FooterText>
              Eksperckie wsparcie w zakupie auta premium i rodzinnego. Spokojna decyzja
              dzięki faktom, nie emocjom.
            </FooterText>
            <Copy>© 2026 CarMentor. Wszelkie prawa zastrzeżone.</Copy>
          </div>
          <div>
            <FooterTitle>Sekcje</FooterTitle>
            <FooterList>
              <li>
                <a href="#stock">Auta od ręki</a>
              </li>
              <li>
                <a href="#broker">Auto na zamówienie</a>
              </li>
              <li>
                <a href="#how">Jak działamy</a>
              </li>
              <li>
                <a href="#contact">Kontakt</a>
              </li>
            </FooterList>
          </div>
          <div>
            <FooterTitle>Kontakt</FooterTitle>
            <FooterList>
              <li>+48 600 123 456</li>
              <li>kontakt@carmentor.pl</li>
              <li>WhatsApp: +48 600 123 456</li>
            </FooterList>
          </div>
        </FooterGrid>
      </Footer>
    </Wrapper>
  );
}
