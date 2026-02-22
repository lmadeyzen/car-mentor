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
    font-family: "Space Grotesk", "Segoe UI", sans-serif;
    color: #0f0f13;
    background:
      radial-gradient(circle at 0% 0%, #ffe78f 0%, rgba(255, 231, 143, 0) 30%),
      radial-gradient(circle at 100% 10%, #c3f8ff 0%, rgba(195, 248, 255, 0) 28%),
      #f4f3ef;
  }
  a { text-decoration: none; color: inherit; }
  img { max-width: 100%; display: block; }
`;

const Page = styled.div`
  min-height: 100vh;
`;

const Shell = styled.div`
  width: min(1220px, calc(100% - 52px));
  margin: 0 auto;

  @media (max-width: 767px) {
    width: calc(100% - 28px);
  }
`;

const Nav = styled.nav`
  padding: 18px 0;
`;

const NavWrap = styled(Shell)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  background: #0f0f13;
  color: #ffffff;
  border-radius: 18px;
  padding: 12px 16px;
`;

const Logo = styled.p`
  font-size: 1.14rem;
  font-weight: 800;
  letter-spacing: 0.04em;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 22px;
  color: #d3d6de;
  font-size: 0.9rem;

  @media (max-width: 1023px) {
    gap: 12px;
    font-size: 0.84rem;
  }

  @media (max-width: 767px) {
    display: none;
  }
`;

const NavCta = styled.a`
  border-radius: 10px;
  background: linear-gradient(135deg, #7de4ff, #fefc94);
  color: #0f0f13;
  font-size: 0.84rem;
  font-weight: 800;
  padding: 10px 14px;
`;

const MobileMenu = styled.button`
  display: none;
  border: 1px solid #3e4457;
  background: transparent;
  color: #f5f5f5;
  border-radius: 10px;
  padding: 8px 11px;
  font-size: 0.85rem;

  @media (max-width: 767px) {
    display: inline-block;
  }
`;

const Hero = styled(Shell)`
  margin-top: 16px;
  margin-bottom: 64px;
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  gap: 16px;

  @media (max-width: 1023px) {
    grid-template-columns: 1fr;
  }
`;

const HeroLeft = styled.div`
  border-radius: 26px;
  padding: 34px;
  background: #11131c;
  color: #ffffff;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    width: 270px;
    height: 270px;
    background: radial-gradient(circle, rgba(125, 228, 255, 0.45), rgba(125, 228, 255, 0));
    right: -70px;
    top: -40px;
  }

  @media (max-width: 767px) {
    padding: 24px;
  }
`;

const HeroLabel = styled.p`
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #9ea7c4;
`;

const HeroTitle = styled.h1`
  margin-top: 14px;
  font-size: clamp(2rem, 4.2vw, 3.6rem);
  line-height: 1.02;
  letter-spacing: -0.03em;
  max-width: 13ch;
  position: relative;
  z-index: 1;
`;

const HeroText = styled.p`
  margin-top: 14px;
  color: #d9def1;
  line-height: 1.7;
  max-width: 56ch;
  position: relative;
  z-index: 1;
`;

const HeroActions = styled.div`
  margin-top: 24px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
`;

const Primary = styled.a`
  border-radius: 10px;
  padding: 11px 16px;
  font-size: 0.9rem;
  font-weight: 800;
  background: #ffffff;
  color: #0f0f13;
`;

const Secondary = styled(Primary)`
  background: transparent;
  border: 1px solid #5a6383;
  color: #edf0ff;
`;

const HeroRight = styled.div`
  border-radius: 26px;
  overflow: hidden;
  min-height: 320px;
  display: grid;
  grid-template-rows: 1fr auto;
  border: 1px solid #d7d8dc;
  background: #ffffff;
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  min-height: 280px;
  object-fit: cover;
`;

const HeroPill = styled.p`
  padding: 14px 16px;
  font-size: 0.9rem;
  color: #3c4052;
  border-top: 1px solid #e2e3e8;
`;

const StockSection = styled.section`
  margin-bottom: 68px;
`;

const SectionHead = styled(Shell)`
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 18px;
  margin-bottom: 20px;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.6rem, 2.6vw, 2.5rem);
  letter-spacing: -0.02em;
`;

const SectionText = styled.p`
  color: #5b6072;
  max-width: 56ch;
`;

const CarsGrid = styled(Shell)`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 1023px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.article`
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #dadbe1;
  box-shadow: 0 10px 28px rgba(27, 33, 67, 0.06);
`;

const CarImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const Body = styled.div`
  padding: 14px;
`;

const Tag = styled.span`
  display: inline-block;
  font-size: 0.74rem;
  font-weight: 700;
  color: #2d3554;
  background: #e9eefc;
  border-radius: 99px;
  padding: 5px 9px;
  margin-bottom: 9px;
`;

const Name = styled.h3`
  font-size: 1.02rem;
  margin-bottom: 8px;
`;

const Meta = styled.p`
  color: #5f6476;
  font-size: 0.88rem;
`;

const Price = styled.p`
  margin-top: 10px;
  margin-bottom: 12px;
  font-size: 1.13rem;
  font-weight: 800;
`;

const AskButton = styled.a`
  display: inline-flex;
  width: 100%;
  justify-content: center;
  border-radius: 10px;
  border: 1px solid #131722;
  padding: 10px 14px;
  font-size: 0.86rem;
  font-weight: 700;
`;

const BrokerAnchor = styled.div`
  height: 2px;
`;

const StepsSection = styled.section`
  margin-bottom: 76px;
`;

const StepsBoard = styled(Shell)`
  border-radius: 22px;
  overflow: hidden;
  border: 1px solid #181b28;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media (max-width: 1023px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const StepCard = styled.article`
  background: #0f1119;
  color: #ffffff;
  padding: 22px 18px;
  border-right: 1px solid #262b3f;

  &:nth-child(2n) {
    background: #15192a;
  }

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
    border-bottom: 1px solid #262b3f;

    &:last-child {
      border-bottom: 0;
    }
  }
`;

const Number = styled.p`
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  color: #86cbff;
  margin-bottom: 10px;
  font-weight: 800;
`;

const StepTitle = styled.h3`
  margin-bottom: 8px;
  font-size: 1.08rem;
`;

const StepDesc = styled.p`
  color: #c3cceb;
  line-height: 1.6;
`;

const Footer = styled.footer`
  margin-bottom: 22px;
`;

const FooterWrap = styled(Shell)`
  border-radius: 18px;
  padding: 24px;
  background: #0f0f13;
  color: #f2f4f9;
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr;
  gap: 20px;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const FooterTitle = styled.p`
  font-weight: 700;
  margin-bottom: 9px;
`;

const FooterText = styled.p`
  color: #bec5dd;
  line-height: 1.6;
`;

const FooterList = styled.ul`
  list-style: none;
  display: grid;
  gap: 7px;
  color: #d3d9ec;
`;

const Copy = styled.p`
  margin-top: 14px;
  color: #8f98b7;
  font-size: 0.82rem;
`;

export default function Layout04() {
  return (
    <Page>
      <GlobalStyle />
      <Nav>
        <NavWrap>
          <Logo>CarMentor</Logo>
          <NavLinks>
            <a href="#stock">Auta od ręki</a>
            <a href="#broker">Auto na zamówienie</a>
            <a href="#how">Jak działamy</a>
            <a href="#contact">Kontakt</a>
          </NavLinks>
          <NavCta href="#contact">Umów konsultację</NavCta>
          <MobileMenu>Menu</MobileMenu>
        </NavWrap>
      </Nav>

      <Hero>
        <HeroLeft>
          <HeroLabel>Stoimy po stronie kupującego</HeroLabel>
          <HeroTitle>Serwis zakupowy, który odradza złe auta.</HeroTitle>
          <HeroText>
            Ten layout celowo łączy mocny kontrast, odważne kształty i asymetryczny układ.
            CarMentor prowadzi klienta przez stock i broker, opierając decyzje na danych,
            nie na presji sprzedażowej.
          </HeroText>
          <HeroActions>
            <Primary href="#stock">Zobacz auta od ręki</Primary>
            <Secondary href="#broker">Znajdź mi auto</Secondary>
          </HeroActions>
        </HeroLeft>
        <HeroRight>
          <HeroImage
            src="https://images.unsplash.com/photo-1493238792000-8113da705763?w=900&h=700&fit=crop"
            alt="Auto premium"
          />
          <HeroPill>Butikowa obsługa z pełną weryfikacją i transparentnością.</HeroPill>
        </HeroRight>
      </Hero>

      <StockSection id="stock">
        <SectionHead>
          <SectionTitle>Top Picks</SectionTitle>
          <SectionText>
            Te same dane we wszystkich layoutach, żeby porównać sam design. Tu postawiliśmy
            na dynamiczny, “magazynowy” charakter i mocne CTA.
          </SectionText>
        </SectionHead>
        <CarsGrid>
          {CARS.map((car) => (
            <Card key={car.id}>
              <CarImage src={car.img} alt={`${car.brand} ${car.model}`} />
              <Body>
                <Tag>{car.tag}</Tag>
                <Name>
                  {car.brand} {car.model}
                </Name>
                <Meta>
                  {car.year} • {car.mileage}
                </Meta>
                <Price>{car.price}</Price>
                <AskButton href="#contact">Zapytaj o to auto</AskButton>
              </Body>
            </Card>
          ))}
        </CarsGrid>
      </StockSection>

      <BrokerAnchor id="broker" />

      <StepsSection id="how">
        <SectionHead>
          <SectionTitle>Jak działamy</SectionTitle>
          <SectionText>
            Każdy etap zakupu ma jasny cel: minimalizacja ryzyka i maksymalna kontrola po
            stronie kupującego.
          </SectionText>
        </SectionHead>
        <StepsBoard>
          {STEPS.map((step) => (
            <StepCard key={step.num}>
              <Number>{step.num}</Number>
              <StepTitle>{step.title}</StepTitle>
              <StepDesc>{step.desc}</StepDesc>
            </StepCard>
          ))}
        </StepsBoard>
      </StepsSection>

      <Footer id="contact">
        <FooterWrap>
          <div>
            <FooterTitle>CarMentor</FooterTitle>
            <FooterText>
              Zakup auta bez chaosu i bez ukrytych niespodzianek. Weryfikujemy, doradzamy i
              przeprowadzamy przez cały proces.
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
        </FooterWrap>
      </Footer>
    </Page>
  );
}
