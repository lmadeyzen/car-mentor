import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: #ffffff;
    color: #1a1a1a;
    line-height: 1.6;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  img {
    max-width: 100%;
    display: block;
  }
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

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #ffffff;
`;

const Nav = styled.nav`
  position: sticky;
  top: 0;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #e5e5e5;
  z-index: 100;
`;

const NavInner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 767px) {
    padding: 1rem 1.5rem;
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a;
  letter-spacing: -0.02em;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2.5rem;
  align-items: center;

  @media (max-width: 1023px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: #666;
  font-size: 0.95rem;
  transition: color 0.2s;

  &:hover {
    color: #1a1a1a;
  }
`;

const CTAButton = styled.button`
  background: #1a1a1a;
  color: #ffffff;
  border: none;
  padding: 0.75rem 1.75rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.2s, background 0.2s;

  &:hover {
    background: #333;
    transform: translateY(-1px);
  }

  @media (max-width: 1023px) {
    padding: 0.65rem 1.5rem;
    font-size: 0.9rem;
  }
`;

const Hero = styled.section`
  max-width: 1400px;
  margin: 0 auto;
  padding: 8rem 2rem;
  text-align: center;

  @media (max-width: 1023px) {
    padding: 5rem 2rem;
  }

  @media (max-width: 767px) {
    padding: 4rem 1.5rem;
  }
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  line-height: 1.1;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
  letter-spacing: -0.03em;

  @media (max-width: 1023px) {
    font-size: 3rem;
  }

  @media (max-width: 767px) {
    font-size: 2.25rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: #666;
  max-width: 700px;
  margin: 0 auto 3rem;
  line-height: 1.7;

  @media (max-width: 767px) {
    font-size: 1.1rem;
    margin-bottom: 2.5rem;
  }
`;

const HeroCTAGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const PrimaryButton = styled.button`
  background: #1a1a1a;
  color: #ffffff;
  border: none;
  padding: 1rem 2.5rem;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, background 0.2s;

  &:hover {
    background: #333;
    transform: translateY(-2px);
  }

  @media (max-width: 767px) {
    width: 100%;
    padding: 0.9rem 2rem;
  }
`;

const SecondaryButton = styled.button`
  background: transparent;
  color: #1a1a1a;
  border: 2px solid #1a1a1a;
  padding: 1rem 2.5rem;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #1a1a1a;
    color: #ffffff;
    transform: translateY(-2px);
  }

  @media (max-width: 767px) {
    width: 100%;
    padding: 0.9rem 2rem;
  }
`;

const Section = styled.section`
  max-width: 1400px;
  margin: 0 auto;
  padding: 6rem 2rem;

  @media (max-width: 767px) {
    padding: 4rem 1.5rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 4rem;
  color: #1a1a1a;
  letter-spacing: -0.02em;

  @media (max-width: 767px) {
    font-size: 2rem;
    margin-bottom: 3rem;
  }
`;

const CarsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const CarCard = styled.div`
  background: #fafafa;
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-8px);
  }
`;

const CarImage = styled.img`
  width: 100%;
  height: 240px;
  object-fit: cover;
`;

const CarContent = styled.div`
  padding: 1.5rem;
`;

const CarTag = styled.div`
  display: inline-block;
  background: #1a1a1a;
  color: #ffffff;
  padding: 0.35rem 0.9rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const CarTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
`;

const CarDetails = styled.div`
  display: flex;
  gap: 1rem;
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const CarPrice = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1.25rem;
`;

const CarButton = styled.button`
  width: 100%;
  background: #1a1a1a;
  color: #ffffff;
  border: none;
  padding: 0.85rem;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #333;
  }
`;

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2.5rem;

  @media (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const StepCard = styled.div`
  text-align: center;
`;

const StepNumber = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: #e5e5e5;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
`;

const StepTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.75rem;
`;

const StepDesc = styled.p`
  color: #666;
  font-size: 0.95rem;
  line-height: 1.6;
`;

const Footer = styled.footer`
  background: #fafafa;
  border-top: 1px solid #e5e5e5;
`;

const FooterInner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 4rem 2rem 2rem;

  @media (max-width: 767px) {
    padding: 3rem 1.5rem 2rem;
  }
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;

  @media (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FooterSection = styled.div``;

const FooterLogo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
`;

const FooterDesc = styled.p`
  color: #666;
  font-size: 0.9rem;
  line-height: 1.6;
`;

const FooterTitle = styled.h4`
  font-size: 1rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1rem;
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const FooterLink = styled.a`
  color: #666;
  font-size: 0.9rem;
  transition: color 0.2s;

  &:hover {
    color: #1a1a1a;
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid #e5e5e5;
  color: #666;
  font-size: 0.9rem;
`;

export default function Layout01() {
  return (
    <Container>
      <GlobalStyle />
      <Nav>
        <NavInner>
          <Logo>CarMentor</Logo>
          <NavLinks>
            <NavLink href="#stock">Auta od ręki</NavLink>
            <NavLink href="#broker">Auto na zamówienie</NavLink>
            <NavLink href="#process">Jak działamy</NavLink>
            <NavLink href="#contact">Kontakt</NavLink>
          </NavLinks>
          <CTAButton>Umów konsultację</CTAButton>
        </NavInner>
      </Nav>

      <Hero>
        <HeroTitle>Stoimy po stronie kupującego</HeroTitle>
        <HeroSubtitle>
          Transparentność, dokładna weryfikacja i pełne wsparcie w zakupie
          samochodu. Nie sprzedajemy — doradzamy.
        </HeroSubtitle>
        <HeroCTAGroup>
          <PrimaryButton>Zobacz auta od ręki</PrimaryButton>
          <SecondaryButton>Znajdź mi auto</SecondaryButton>
        </HeroCTAGroup>
      </Hero>

      <Section>
        <SectionTitle>Wybrane auta</SectionTitle>
        <CarsGrid>
          {CARS.map((car) => (
            <CarCard key={car.id}>
              <CarImage src={car.img} alt={`${car.brand} ${car.model}`} />
              <CarContent>
                <CarTag>{car.tag}</CarTag>
                <CarTitle>
                  {car.brand} {car.model}
                </CarTitle>
                <CarDetails>
                  <span>{car.year}</span>
                  <span>•</span>
                  <span>{car.mileage}</span>
                </CarDetails>
                <CarPrice>{car.price}</CarPrice>
                <CarButton>Zapytaj o to auto</CarButton>
              </CarContent>
            </CarCard>
          ))}
        </CarsGrid>
      </Section>

      <Section style={{ background: "#fafafa" }}>
        <SectionTitle>Jak działamy</SectionTitle>
        <StepsGrid>
          {STEPS.map((step) => (
            <StepCard key={step.num}>
              <StepNumber>{step.num}</StepNumber>
              <StepTitle>{step.title}</StepTitle>
              <StepDesc>{step.desc}</StepDesc>
            </StepCard>
          ))}
        </StepsGrid>
      </Section>

      <Footer>
        <FooterInner>
          <FooterContent>
            <FooterSection>
              <FooterLogo>CarMentor</FooterLogo>
              <FooterDesc>
                Butikowa marka sprzedaży aut i usług okołozakupowych. Stoimy po
                stronie kupującego.
              </FooterDesc>
            </FooterSection>
            <FooterSection>
              <FooterTitle>Oferta</FooterTitle>
              <FooterLinks>
                <FooterLink href="#stock">Auta od ręki</FooterLink>
                <FooterLink href="#broker">Auto na zamówienie</FooterLink>
                <FooterLink href="#process">Jak działamy</FooterLink>
              </FooterLinks>
            </FooterSection>
            <FooterSection>
              <FooterTitle>Firma</FooterTitle>
              <FooterLinks>
                <FooterLink href="#about">O nas</FooterLink>
                <FooterLink href="#blog">Blog</FooterLink>
                <FooterLink href="#careers">Kariera</FooterLink>
              </FooterLinks>
            </FooterSection>
            <FooterSection>
              <FooterTitle>Kontakt</FooterTitle>
              <FooterLinks>
                <FooterLink href="tel:+48123456789">+48 123 456 789</FooterLink>
                <FooterLink href="mailto:hello@carmentor.pl">
                  hello@carmentor.pl
                </FooterLink>
                <FooterLink href="https://wa.me/48123456789">WhatsApp</FooterLink>
              </FooterLinks>
            </FooterSection>
          </FooterContent>
          <Copyright>© 2024 CarMentor. Wszystkie prawa zastrzeżone.</Copyright>
        </FooterInner>
      </Footer>
    </Container>
  );
}
