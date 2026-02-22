import styled, { createGlobalStyle } from "styled-components";

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
    font-family: "Plus Jakarta Sans", "Segoe UI", sans-serif;
    color: #1f1f1f;
    background: #fbf8f2;
  }
  a { text-decoration: none; color: inherit; }
  img { max-width: 100%; display: block; }
`;

const Frame = styled.div`
  min-height: 100vh;
`;

const Container = styled.div`
  width: min(1180px, calc(100% - 52px));
  margin: 0 auto;

  @media (max-width: 767px) {
    width: calc(100% - 30px);
  }
`;

const Nav = styled.nav`
  border-bottom: 1px solid #e4dccd;
  background: #fbf8f2;
`;

const NavRow = styled(Container)`
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  align-items: center;
  gap: 22px;
  padding: 20px 0;

  @media (max-width: 767px) {
    grid-template-columns: auto auto;
    justify-content: space-between;
  }
`;

const Logo = styled.div`
  font-family: Georgia, "Times New Roman", serif;
  font-size: 1.4rem;
  letter-spacing: 0.02em;
`;

const Links = styled.div`
  display: flex;
  justify-content: center;
  gap: 26px;
  color: #4f4f4f;
  font-size: 0.93rem;

  @media (max-width: 1023px) {
    gap: 16px;
    font-size: 0.88rem;
  }

  @media (max-width: 767px) {
    display: none;
  }
`;

const NavButton = styled.a`
  border: 1px solid #262626;
  border-radius: 0;
  padding: 9px 14px;
  font-size: 0.84rem;
  font-weight: 700;
`;

const Hamburger = styled.button`
  display: none;
  border: 1px solid #272727;
  background: transparent;
  padding: 8px 10px;
  font-weight: 700;

  @media (max-width: 767px) {
    display: inline-block;
  }
`;

const Hero = styled(Container)`
  margin-top: 44px;
  margin-bottom: 70px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;

  @media (max-width: 1023px) {
    grid-template-columns: 1fr;
    margin-top: 28px;
  }
`;

const HeroIntro = styled.div`
  border-top: 2px solid #1f1f1f;
  padding-top: 20px;
`;

const Kicker = styled.p`
  font-size: 0.82rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #706857;
`;

const Headline = styled.h1`
  margin-top: 12px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(2.1rem, 3.8vw, 3.6rem);
  line-height: 1.02;
`;

const Lead = styled.p`
  margin-top: 18px;
  color: #524c40;
  line-height: 1.7;
  max-width: 54ch;
`;

const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 26px;
`;

const Primary = styled.a`
  border: 1px solid #1f1f1f;
  background: #1f1f1f;
  color: #fbf8f2;
  padding: 11px 16px;
  font-size: 0.9rem;
  font-weight: 700;
`;

const Secondary = styled(Primary)`
  background: transparent;
  color: #1f1f1f;
`;

const HeroVisual = styled.img`
  width: 100%;
  min-height: 320px;
  object-fit: cover;
  border: 1px solid #d5c9b2;
`;

const Section = styled.section`
  margin-bottom: 72px;
`;

const Header = styled(Container)`
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  gap: 14px;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const Title = styled.h2`
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(1.55rem, 2.5vw, 2.3rem);
`;

const Description = styled.p`
  color: #625b4f;
  max-width: 55ch;
`;

const CarsGrid = styled(Container)`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const Car = styled.article`
  border: 1px solid #dfd2bc;
  background: #fffdf8;
  display: grid;
  grid-template-columns: 210px 1fr;
  min-height: 170px;

  @media (max-width: 1023px) {
    grid-template-columns: 1fr;
  }
`;

const CarImage = styled.img`
  width: 100%;
  height: 100%;
  min-height: 170px;
  object-fit: cover;
`;

const CarBody = styled.div`
  padding: 14px;
`;

const Tag = styled.span`
  font-size: 0.76rem;
  color: #7a705d;
`;

const Name = styled.h3`
  margin-top: 4px;
  margin-bottom: 8px;
`;

const Meta = styled.p`
  color: #5f594b;
  font-size: 0.9rem;
`;

const Price = styled.p`
  margin-top: 10px;
  margin-bottom: 12px;
  font-size: 1.1rem;
  font-weight: 800;
`;

const Link = styled.a`
  font-size: 0.88rem;
  font-weight: 700;
  border-bottom: 1px solid #1f1f1f;
  padding-bottom: 2px;
`;

const StepsGrid = styled(Container)`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border-top: 1px solid #dcccaf;
  border-bottom: 1px solid #dcccaf;

  @media (max-width: 1023px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const StepCard = styled.article`
  padding: 20px 16px;
  border-right: 1px solid #e2d6c1;

  &:last-child {
    border-right: 0;
  }

  @media (max-width: 1023px) {
    &:nth-child(2n) {
      border-right: 0;
    }
  }

  @media (max-width: 767px) {
    border-right: 0;
    border-bottom: 1px solid #e2d6c1;

    &:last-child {
      border-bottom: 0;
    }
  }
`;

const Num = styled.p`
  font-size: 0.8rem;
  color: #7e735f;
  margin-bottom: 8px;
  font-weight: 700;
`;

const StepTitle = styled.h3`
  margin-bottom: 8px;
`;

const StepDesc = styled.p`
  color: #5f584b;
  line-height: 1.55;
`;

const Footer = styled.footer`
  border-top: 1px solid #e2d6c1;
  background: #f8f2e6;
  padding: 30px 0;
`;

const FooterGrid = styled(Container)`
  display: grid;
  grid-template-columns: 1.3fr 1fr 1fr;
  gap: 16px;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const FooterTitle = styled.p`
  font-weight: 800;
  margin-bottom: 8px;
`;

const FooterText = styled.p`
  color: #584f40;
  line-height: 1.6;
`;

const FooterList = styled.ul`
  list-style: none;
  display: grid;
  gap: 7px;
  color: #4e4639;
`;

const Copy = styled.p`
  margin-top: 14px;
  color: #766b58;
  font-size: 0.82rem;
`;

export default function Layout03() {
  return (
    <Frame>
      <GlobalStyle />
      <Nav>
        <NavRow>
          <Logo>CarMentor</Logo>
          <Links>
            <a href="#stock">Auta od ręki</a>
            <a href="#broker">Auto na zamówienie</a>
            <a href="#how">Jak działamy</a>
            <a href="#contact">Kontakt</a>
          </Links>
          <NavButton href="#contact">Porozmawiaj z doradcą</NavButton>
          <Hamburger>Menu</Hamburger>
        </NavRow>
      </Nav>

      <Hero>
        <HeroIntro>
          <Kicker>CarMentor</Kicker>
          <Headline>Zakup auta z partnerem, który stoi po Twojej stronie.</Headline>
          <Lead>
            Od pierwszego zapytania do finalnej umowy. Pokazujemy fakty, weryfikujemy
            historię i prowadzimy klienta przez stock oraz broker bez presji sprzedażowej.
          </Lead>
          <HeroActions>
            <Primary href="#stock">Zobacz auta od ręki</Primary>
            <Secondary href="#broker">Znajdź mi auto</Secondary>
          </HeroActions>
        </HeroIntro>
        <HeroVisual
          src="https://images.unsplash.com/photo-1493238792000-8113da705763?w=900&h=700&fit=crop"
          alt="Auto klasy premium"
        />
      </Hero>

      <Section id="stock">
        <Header>
          <Title>Top Picks</Title>
          <Description>
            Te same dane ofertowe we wszystkich koncepcjach, aby porównać estetykę i
            hierarchię treści, a nie sam content.
          </Description>
        </Header>
        <CarsGrid>
          {CARS.map((car) => (
            <Car key={car.id}>
              <CarImage src={car.img} alt={`${car.brand} ${car.model}`} />
              <CarBody>
                <Tag>{car.tag}</Tag>
                <Name>
                  {car.brand} {car.model}
                </Name>
                <Meta>
                  {car.year} • {car.mileage}
                </Meta>
                <Price>{car.price}</Price>
                <Link href="#contact">Zapytaj o to auto</Link>
              </CarBody>
            </Car>
          ))}
        </CarsGrid>
      </Section>

      <div id="broker" />
      <Section id="how">
        <Header>
          <Title>Jak działamy</Title>
          <Description>
            Cztery kroki, dzięki którym klient unika kosztownych pomyłek i kupuje auto
            pewnie, niezależnie od modelu współpracy.
          </Description>
        </Header>
        <StepsGrid>
          {STEPS.map((step) => (
            <StepCard key={step.num}>
              <Num>{step.num}</Num>
              <StepTitle>{step.title}</StepTitle>
              <StepDesc>{step.desc}</StepDesc>
            </StepCard>
          ))}
        </StepsGrid>
      </Section>

      <Footer id="contact">
        <FooterGrid>
          <div>
            <FooterTitle>CarMentor</FooterTitle>
            <FooterText>
              Butikowa marka wsparcia zakupowego dla klientów, którzy oczekują jakości i
              transparentności.
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
    </Frame>
  );
}
