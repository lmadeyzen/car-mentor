import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: #0a0a0a;
    color: #ffffff;
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
  background: #0a0a0a;
`;

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 100;
`;

const NavInner = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 1.25rem 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 767px) {
    padding: 1rem 1.5rem;
  }
`;

const Logo = styled.div`
  font-size: 1.75rem;
  font-weight: 900;
  color: #00ff88;
  letter-spacing: -0.03em;
  text-transform: uppercase;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 3rem;
  align-items: center;

  @media (max-width: 1023px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: color 0.2s;

  &:hover {
    color: #00ff88;
  }
`;

const CTAButton = styled.button`
  background: #00ff88;
  color: #0a0a0a;
  border: none;
  padding: 0.85rem 2rem;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #00dd77;
    transform: translateY(-2px);
  }

  @media (max-width: 1023px) {
    padding: 0.75rem 1.5rem;
    font-size: 0.85rem;
  }
`;

const Hero = styled.section`
  position: relative;
  padding: 12rem 3rem 8rem;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at 20% 50%,
      rgba(0, 255, 136, 0.1) 0%,
      transparent 50%
    );
  }

  @media (max-width: 1023px) {
    padding: 9rem 2rem 6rem;
  }

  @media (max-width: 767px) {
    padding: 7rem 1.5rem 4rem;
  }
`;

const HeroInner = styled.div`
  position: relative;
  max-width: 1600px;
  margin: 0 auto;
`;

const HeroTitle = styled.h1`
  font-size: 6rem;
  font-weight: 900;
  line-height: 0.95;
  color: #ffffff;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: -0.04em;

  span {
    display: block;
    color: #00ff88;
  }

  @media (max-width: 1023px) {
    font-size: 4rem;
  }

  @media (max-width: 767px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.7);
  max-width: 650px;
  margin-bottom: 3rem;
  line-height: 1.7;

  @media (max-width: 767px) {
    font-size: 1.1rem;
    margin-bottom: 2.5rem;
  }
`;

const HeroCTAGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

const PrimaryButton = styled.button`
  background: #00ff88;
  color: #0a0a0a;
  border: none;
  padding: 1.25rem 3rem;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #00dd77;
    transform: translateY(-3px);
  }

  @media (max-width: 767px) {
    width: 100%;
    padding: 1.1rem 2.5rem;
  }
`;

const SecondaryButton = styled.button`
  background: transparent;
  color: #ffffff;
  border: 2px solid #ffffff;
  padding: 1.25rem 3rem;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #ffffff;
    color: #0a0a0a;
    transform: translateY(-3px);
  }

  @media (max-width: 767px) {
    width: 100%;
    padding: 1.1rem 2.5rem;
  }
`;

const Section = styled.section`
  padding: 6rem 3rem;

  @media (max-width: 767px) {
    padding: 4rem 1.5rem;
  }
`;

const SectionInner = styled.div`
  max-width: 1600px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  margin-bottom: 4rem;
`;

const SectionLabel = styled.div`
  color: #00ff88;
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
`;

const SectionTitle = styled.h2`
  font-size: 3.5rem;
  font-weight: 900;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: -0.03em;

  @media (max-width: 767px) {
    font-size: 2.25rem;
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
  }
`;

const CarCard = styled.div`
  background: #141414;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  transition: all 0.3s;
  position: relative;

  &:hover {
    transform: translateY(-10px);
    border-color: #00ff88;
  }
`;

const CarImage = styled.img`
  width: 100%;
  height: 260px;
  object-fit: cover;
  filter: grayscale(0.2);
  transition: filter 0.3s;

  ${CarCard}:hover & {
    filter: grayscale(0);
  }
`;

const CarContent = styled.div`
  padding: 1.75rem;
`;

const CarTag = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #00ff88;
  color: #0a0a0a;
  padding: 0.4rem 1rem;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const CarTitle = styled.h3`
  font-size: 1.35rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: -0.01em;
`;

const CarDetails = styled.div`
  display: flex;
  gap: 1.25rem;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.85rem;
  margin-bottom: 1.25rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const CarPrice = styled.div`
  font-size: 1.75rem;
  font-weight: 900;
  color: #00ff88;
  margin-bottom: 1.5rem;
`;

const CarButton = styled.button`
  width: 100%;
  background: transparent;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.9rem;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #00ff88;
    color: #0a0a0a;
    border-color: #00ff88;
  }
`;

const ProcessSection = styled(Section)`
  background: #141414;
`;

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem;

  @media (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem;
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const StepCard = styled.div`
  position: relative;
  padding-left: 2rem;
  border-left: 3px solid #00ff88;
`;

const StepNumber = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: #00ff88;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const StepTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: -0.01em;
`;

const StepDesc = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.95rem;
  line-height: 1.7;
`;

const Footer = styled.footer`
  background: #000000;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const FooterInner = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 4rem 3rem 2rem;

  @media (max-width: 767px) {
    padding: 3rem 1.5rem 2rem;
  }
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 4rem;
  margin-bottom: 3rem;

  @media (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const FooterSection = styled.div``;

const FooterLogo = styled.div`
  font-size: 1.75rem;
  font-weight: 900;
  color: #00ff88;
  margin-bottom: 1.25rem;
  letter-spacing: -0.03em;
  text-transform: uppercase;
`;

const FooterDesc = styled.p`
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
  line-height: 1.7;
`;

const FooterTitle = styled.h4`
  font-size: 0.9rem;
  font-weight: 700;
  color: #00ff88;
  margin-bottom: 1.25rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FooterLink = styled.a`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  transition: color 0.2s;

  &:hover {
    color: #00ff88;
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export default function Layout02() {
  return (
    <Container>
      <GlobalStyle />
      <Nav>
        <NavInner>
          <Logo>CarMentor</Logo>
          <NavLinks>
            <NavLink href="#stock">Stock</NavLink>
            <NavLink href="#broker">Broker</NavLink>
            <NavLink href="#process">Process</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </NavLinks>
          <CTAButton>Start Now</CTAButton>
        </NavInner>
      </Nav>

      <Hero>
        <HeroInner>
          <HeroTitle>
            Stoimy po <span>stronie kupującego</span>
          </HeroTitle>
          <HeroSubtitle>
            Transparentność, weryfikacja i wsparcie na każdym etapie. Nie
            sprzedajemy — doradzamy i chronimy Twoje interesy.
          </HeroSubtitle>
          <HeroCTAGroup>
            <PrimaryButton>Zobacz auta od ręki</PrimaryButton>
            <SecondaryButton>Znajdź mi auto</SecondaryButton>
          </HeroCTAGroup>
        </HeroInner>
      </Hero>

      <Section>
        <SectionInner>
          <SectionHeader>
            <SectionLabel>Top Picks</SectionLabel>
            <SectionTitle>Wybrane Auta</SectionTitle>
          </SectionHeader>
          <CarsGrid>
            {CARS.map((car) => (
              <CarCard key={car.id}>
                <CarTag>{car.tag}</CarTag>
                <CarImage src={car.img} alt={`${car.brand} ${car.model}`} />
                <CarContent>
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
        </SectionInner>
      </Section>

      <ProcessSection>
        <SectionInner>
          <SectionHeader>
            <SectionLabel>Process</SectionLabel>
            <SectionTitle>Jak działamy</SectionTitle>
          </SectionHeader>
          <StepsGrid>
            {STEPS.map((step) => (
              <StepCard key={step.num}>
                <StepNumber>{step.num}</StepNumber>
                <StepTitle>{step.title}</StepTitle>
                <StepDesc>{step.desc}</StepDesc>
              </StepCard>
            ))}
          </StepsGrid>
        </SectionInner>
      </ProcessSection>

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
          <Copyright>© 2024 CarMentor. All rights reserved.</Copyright>
        </FooterInner>
      </Footer>
    </Container>
  );
}
