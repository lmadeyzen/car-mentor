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
    font-family: Inter, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #161616;
    background: #f5f5f5;
  }
  a { text-decoration: none; color: inherit; }
  img { max-width: 100%; display: block; }
`;

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

const Nav = styled.nav`
  position: sticky;
  top: 0;
  z-index: 20;
  background: rgba(245, 245, 245, 0.94);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid #dedede;
`;

const NavInner = styled(Section)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 0;
`;

const Logo = styled.div`
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: 0.03em;
`;

const Links = styled.div`
  display: flex;
  gap: 30px;
  color: #3a3a3a;
  font-weight: 500;

  @media (max-width: 1023px) {
    gap: 18px;
    font-size: 0.95rem;
  }

  @media (max-width: 767px) {
    display: none;
  }
`;

const MobileMenu = styled.button`
  display: none;
  border: 1px solid #cbcbcb;
  background: white;
  border-radius: 10px;
  padding: 8px 12px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #212121;

  @media (max-width: 767px) {
    display: block;
  }
`;

const PrimaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  padding: 11px 18px;
  font-size: 0.9rem;
  font-weight: 700;
  background: #161616;
  color: white;
  border: 1px solid #161616;
`;

const Hero = styled(Section)`
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

const HeroCard = styled.div`
  background: white;
  border: 1px solid #d8d8d8;
  border-radius: 28px;
  padding: 42px;

  @media (max-width: 767px) {
    padding: 30px 22px;
    border-radius: 20px;
  }
`;

const HeroTitle = styled.h1`
  font-size: clamp(2rem, 3.6vw, 3.5rem);
  line-height: 1.05;
  letter-spacing: -0.03em;
  margin-bottom: 16px;
`;

const HeroText = styled.p`
  color: #515151;
  font-size: 1.06rem;
  line-height: 1.6;
  max-width: 56ch;
`;

const CtaRow = styled.div`
  margin-top: 30px;
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
`;

const SecondaryButton = styled(PrimaryButton)`
  background: white;
  color: #1e1e1e;
  border-color: #c8c8c8;
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 28px;
  min-height: 320px;
`;

const SectionHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 20px;
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.5rem, 2.4vw, 2.2rem);
  letter-spacing: -0.02em;
`;

const SectionDesc = styled.p`
  color: #5e5e5e;
  max-width: 48ch;
`;

const CarsSection = styled(Section)`
  margin-bottom: 78px;
`;

const CarsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;

  @media (max-width: 1023px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const CarCard = styled.article`
  background: white;
  border: 1px solid #dcdcdc;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const CarImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const CarBody = styled.div`
  padding: 16px;
`;

const Tag = styled.span`
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 99px;
  padding: 6px 10px;
  background: #ebebeb;
  margin-bottom: 10px;
`;

const CarName = styled.h3`
  font-size: 1.07rem;
  margin-bottom: 10px;
`;

const Meta = styled.p`
  color: #666;
  font-size: 0.88rem;
`;

const Price = styled.p`
  margin-top: 12px;
  margin-bottom: 16px;
  font-size: 1.17rem;
  font-weight: 800;
`;

const CardButton = styled.a`
  display: inline-flex;
  width: 100%;
  justify-content: center;
  border: 1px solid #1f1f1f;
  border-radius: 11px;
  padding: 10px 14px;
  font-size: 0.9rem;
  font-weight: 700;
`;

const StepsSection = styled(Section)`
  margin-bottom: 90px;
`;

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 1023px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const StepCard = styled.article`
  background: white;
  border: 1px solid #dadada;
  border-radius: 16px;
  padding: 22px;
`;

const StepNum = styled.p`
  color: #787878;
  font-size: 0.8rem;
  margin-bottom: 12px;
  font-weight: 700;
`;

const StepTitle = styled.h3`
  margin-bottom: 8px;
`;

const StepDesc = styled.p`
  color: #5b5b5b;
  line-height: 1.55;
`;

const Footer = styled.footer`
  border-top: 1px solid #d4d4d4;
  background: #f0f0f0;
  padding: 38px 0;
`;

const FooterGrid = styled(Section)`
  display: grid;
  grid-template-columns: 1.25fr 1fr 1fr;
  gap: 24px;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const FooterTitle = styled.p`
  font-weight: 800;
  margin-bottom: 10px;
`;

const FooterText = styled.p`
  color: #595959;
  line-height: 1.6;
`;

const List = styled.ul`
  list-style: none;
  display: grid;
  gap: 8px;
  color: #3f3f3f;
`;

const Copyright = styled.p`
  margin-top: 26px;
  color: #696969;
  font-size: 0.84rem;
`;

export default function Layout01() {
  return (
    <Page>
      <GlobalStyle />
      <Nav>
        <NavInner>
          <Logo>CarMentor</Logo>
          <Links>
            <a href="#stock">Auta od ręki</a>
            <a href="#broker">Auto na zamówienie</a>
            <a href="#how">Jak działamy</a>
            <a href="#contact">Kontakt</a>
          </Links>
          <PrimaryButton href="#contact">Umów rozmowę</PrimaryButton>
          <MobileMenu>Menu</MobileMenu>
        </NavInner>
      </Nav>

      <Hero>
        <HeroCard>
          <HeroTitle>Stoimy po stronie kupującego, nie sprzedającego.</HeroTitle>
          <HeroText>
            CarMentor łączy ofertę sprawdzonych aut od ręki z usługą wyszukania auta
            na zamówienie. Transparentnie pokazujemy fakty, odradzamy złe wybory i
            prowadzimy cały proces zakupu.
          </HeroText>
          <CtaRow>
            <PrimaryButton href="#stock">Zobacz auta od ręki</PrimaryButton>
            <SecondaryButton href="#broker">Znajdź mi auto</SecondaryButton>
          </CtaRow>
        </HeroCard>
        <HeroImage
          src="https://images.unsplash.com/photo-1502877338535-766e1452684a?w=900&h=700&fit=crop"
          alt="Nowoczesny samochód"
        />
      </Hero>

      <CarsSection id="stock">
        <SectionHead>
          <SectionTitle>Top Picks</SectionTitle>
          <SectionDesc>
            Wyselekcjonowane samochody po naszej weryfikacji. Każdy z pełną historią i
            jasną rekomendacją.
          </SectionDesc>
        </SectionHead>
        <CarsGrid>
          {CARS.map((car) => (
            <CarCard key={car.id}>
              <CarImage src={car.img} alt={`${car.brand} ${car.model}`} />
              <CarBody>
                <Tag>{car.tag}</Tag>
                <CarName>
                  {car.brand} {car.model}
                </CarName>
                <Meta>
                  {car.year} • {car.mileage}
                </Meta>
                <Price>{car.price}</Price>
                <CardButton href="#contact">Zapytaj o to auto</CardButton>
              </CarBody>
            </CarCard>
          ))}
        </CarsGrid>
      </CarsSection>

      <div id="broker" />
      <StepsSection id="how">
        <SectionHead>
          <SectionTitle>Jak działamy</SectionTitle>
          <SectionDesc>
            Jeden proces niezależnie od tego, czy kupujesz auto ze stocku, czy szukasz
            modelu na zamówienie.
          </SectionDesc>
        </SectionHead>
        <StepsGrid>
          {STEPS.map((step) => (
            <StepCard key={step.num}>
              <StepNum>{step.num}</StepNum>
              <StepTitle>{step.title}</StepTitle>
              <StepDesc>{step.desc}</StepDesc>
            </StepCard>
          ))}
        </StepsGrid>
      </StepsSection>

      <Footer id="contact">
        <FooterGrid>
          <div>
            <FooterTitle>CarMentor</FooterTitle>
            <FooterText>
              Butikowe doradztwo zakupowe dla osób, które chcą kupić auto spokojnie i
              świadomie.
            </FooterText>
            <Copyright>© 2026 CarMentor. Wszelkie prawa zastrzeżone.</Copyright>
          </div>
          <div>
            <FooterTitle>Sekcje</FooterTitle>
            <List>
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
            </List>
          </div>
          <div>
            <FooterTitle>Kontakt</FooterTitle>
            <List>
              <li>+48 600 123 456</li>
              <li>kontakt@carmentor.pl</li>
              <li>WhatsApp: +48 600 123 456</li>
            </List>
          </div>
        </FooterGrid>
      </Footer>
    </Page>
  );
}
