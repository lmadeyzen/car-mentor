import styled, { createGlobalStyle } from "styled-components";

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

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Georgia', 'Times New Roman', serif; color: #2c2416; background: #f5f0e8; }
  a { text-decoration: none; color: inherit; }
  img { max-width: 100%; display: block; }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  border-bottom: 1px solid #d4c4a8;
  @media (max-width: 767px) {
    padding: 1rem;
    flex-wrap: wrap;
  }
`;

const Logo = styled.span`
  font-size: 1.5rem;
  font-weight: 400;
  font-family: "Georgia", serif;
  color: #5c4a32;
  letter-spacing: 0.02em;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 0.95rem;
  @media (max-width: 767px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: #5c4a32;
  &:hover {
    color: #8b6914;
    text-decoration: underline;
  }
`;

const CtaButton = styled.button`
  padding: 0.6rem 1.4rem;
  background: #5c4a32;
  color: #f5f0e8;
  border: none;
  font-size: 0.9rem;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  cursor: pointer;
  @media (max-width: 767px) {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }
`;

const Hamburger = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #5c4a32;
  cursor: pointer;
  padding: 0.25rem;
  @media (max-width: 767px) {
    display: block;
  }
`;

const Hero = styled.section`
  padding: 7rem 2rem;
  text-align: center;
  max-width: 720px;
  margin: 0 auto;
  background: linear-gradient(180deg, #fdfbf7 0%, #f5f0e8 100%);
  @media (max-width: 767px) {
    padding: 4rem 1.5rem;
  }
`;

const HeroTitle = styled.h1`
  font-size: clamp(2.4rem, 5vw, 3.4rem);
  font-weight: 400;
  font-family: "Georgia", serif;
  line-height: 1.25;
  margin-bottom: 1.25rem;
  color: #2c2416;
`;

const HeroSubtitle = styled.p`
  font-size: 1.15rem;
  color: #5c4a32;
  line-height: 1.7;
  margin-bottom: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const PrimaryBtn = styled.button`
  padding: 0.9rem 1.8rem;
  background: #5c4a32;
  color: #f5f0e8;
  border: none;
  font-size: 1rem;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 500;
  cursor: pointer;
`;

const SecondaryBtn = styled.button`
  padding: 0.9rem 1.8rem;
  background: transparent;
  color: #5c4a32;
  border: 2px solid #5c4a32;
  font-size: 1rem;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 500;
  cursor: pointer;
`;

const Section = styled.section`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  @media (max-width: 767px) {
    padding: 3rem 1rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.9rem;
  font-weight: 400;
  font-family: "Georgia", serif;
  margin-bottom: 2rem;
  color: #2c2416;
  text-align: center;
`;

const CarsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.75rem;
  @media (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
`;

const CarCard = styled.article`
  background: #fdfbf7;
  border: 1px solid #d4c4a8;
  overflow: hidden;
`;

const CarImage = styled.div`
  aspect-ratio: 3/2;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CarContent = styled.div`
  padding: 1.5rem;
`;

const CarTag = styled.span`
  display: inline-block;
  font-size: 0.75rem;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 500;
  color: #8b6914;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
`;

const CarName = styled.h3`
  font-size: 1.2rem;
  font-weight: 400;
  font-family: "Georgia", serif;
  margin-bottom: 0.35rem;
  color: #2c2416;
`;

const CarMeta = styled.p`
  font-size: 0.9rem;
  color: #5c4a32;
  margin-bottom: 0.75rem;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
`;

const CarPrice = styled.p`
  font-size: 1.15rem;
  font-weight: 600;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  color: #5c4a32;
  margin-bottom: 1rem;
`;

const CardCta = styled.button`
  width: 100%;
  padding: 0.65rem;
  background: #5c4a32;
  color: #f5f0e8;
  border: none;
  font-size: 0.9rem;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  cursor: pointer;
`;

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  @media (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const StepCard = styled.div`
  padding: 2rem 1.5rem;
  background: #fdfbf7;
  border: 1px solid #d4c4a8;
  text-align: center;
`;

const StepNum = styled.span`
  font-size: 2rem;
  font-weight: 400;
  font-family: "Georgia", serif;
  color: #d4c4a8;
  display: block;
  margin-bottom: 0.75rem;
`;

const StepTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 400;
  font-family: "Georgia", serif;
  margin-bottom: 0.5rem;
  color: #2c2416;
`;

const StepDesc = styled.p`
  font-size: 0.9rem;
  color: #5c4a32;
  line-height: 1.5;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
`;

const Footer = styled.footer`
  background: #2c2416;
  color: #f5f0e8;
  padding: 3rem 2rem;
  margin-top: 4rem;
  @media (max-width: 767px) {
    padding: 2rem 1rem;
  }
`;

const FooterInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 2rem;
`;

const FooterBrand = styled.div`
  max-width: 280px;
`;

const FooterLogo = styled.span`
  font-size: 1.35rem;
  font-weight: 400;
  font-family: "Georgia", serif;
  display: block;
  margin-bottom: 0.5rem;
`;

const FooterDesc = styled.p`
  font-size: 0.9rem;
  color: #d4c4a8;
  line-height: 1.5;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
`;

const FooterContact = styled.div`
  font-size: 0.9rem;
  color: #d4c4a8;
  line-height: 1.6;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
`;

const Copyright = styled.p`
  width: 100%;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #5c4a32;
  font-size: 0.85rem;
  color: #8b7355;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
`;

export default function Layout03() {
  return (
    <>
      <GlobalStyle />
      <Nav>
        <Logo>CarMentor</Logo>
        <NavLinks>
          <NavLink href="#auta">Auta od ręki</NavLink>
          <NavLink href="#zamowienie">Auto na zamówienie</NavLink>
          <NavLink href="#jak">Jak działamy</NavLink>
          <NavLink href="#kontakt">Kontakt</NavLink>
        </NavLinks>
        <CtaButton>Skontaktuj się</CtaButton>
        <Hamburger aria-label="Menu">☰</Hamburger>
      </Nav>

      <Hero>
        <HeroTitle>Stoimy po stronie kupującego</HeroTitle>
        <HeroSubtitle>
          Sprawdzone auta od ręki lub auto na zamówienie. Weryfikujemy historię,
          stan i cenę — żebyś kupił mądrze.
        </HeroSubtitle>
        <HeroButtons>
          <PrimaryBtn>Zobacz auta od ręki</PrimaryBtn>
          <SecondaryBtn>Znajdź mi auto</SecondaryBtn>
        </HeroButtons>
      </Hero>

      <Section>
        <SectionTitle>Top Picks</SectionTitle>
        <CarsGrid>
          {CARS.map((car) => (
            <CarCard key={car.id}>
              <CarImage>
                <img src={car.img} alt={car.brand} />
              </CarImage>
              <CarContent>
                <CarTag>{car.tag}</CarTag>
                <CarName>
                  {car.brand} {car.model}
                </CarName>
                <CarMeta>
                  {car.year} • {car.mileage}
                </CarMeta>
                <CarPrice>{car.price}</CarPrice>
                <CardCta>Zapytaj o to auto</CardCta>
              </CarContent>
            </CarCard>
          ))}
        </CarsGrid>
      </Section>

      <Section>
        <SectionTitle>Jak działamy</SectionTitle>
        <StepsGrid>
          {STEPS.map((step) => (
            <StepCard key={step.num}>
              <StepNum>{step.num}</StepNum>
              <StepTitle>{step.title}</StepTitle>
              <StepDesc>{step.desc}</StepDesc>
            </StepCard>
          ))}
        </StepsGrid>
      </Section>

      <Footer>
        <FooterInner>
          <FooterBrand>
            <FooterLogo>CarMentor</FooterLogo>
            <FooterDesc>
              Butikowa marka sprzedaży aut. Stoimy po stronie kupującego.
            </FooterDesc>
          </FooterBrand>
          <FooterLinks>
            <NavLink href="#auta">Auta od ręki</NavLink>
            <NavLink href="#zamowienie">Auto na zamówienie</NavLink>
            <NavLink href="#jak">Jak działamy</NavLink>
            <NavLink href="#kontakt">Kontakt</NavLink>
          </FooterLinks>
          <FooterContact>
            +48 123 456 789
            <br />
            kontakt@carmentor.pl
            <br />
            WhatsApp
          </FooterContact>
          <Copyright>
            © {new Date().getFullYear()} CarMentor. Wszystkie prawa zastrzeżone.
          </Copyright>
        </FooterInner>
      </Footer>
    </>
  );
}
