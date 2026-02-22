import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: 'Playfair Display', 'Georgia', serif;
    background: #fdfcfa;
    color: #2c2c2c;
    line-height: 1.7;
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
  background: linear-gradient(180deg, #fdfcfa 0%, #f5f3f0 100%);
`;

const Nav = styled.nav`
  position: sticky;
  top: 0;
  background: rgba(253, 252, 250, 0.97);
  backdrop-filter: blur(15px);
  border-bottom: 1px solid rgba(147, 112, 78, 0.15);
  z-index: 100;
`;

const NavInner = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 1.75rem 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 767px) {
    padding: 1.25rem 1.5rem;
  }
`;

const Logo = styled.div`
  font-size: 1.65rem;
  font-weight: 400;
  color: #2c2c2c;
  letter-spacing: 0.02em;
  font-style: italic;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 3rem;
  align-items: center;
  font-family: 'Lato', sans-serif;

  @media (max-width: 1023px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: #5c5c5c;
  font-size: 0.9rem;
  font-weight: 400;
  letter-spacing: 0.03em;
  transition: color 0.3s;

  &:hover {
    color: #93704e;
  }
`;

const CTAButton = styled.button`
  background: linear-gradient(135deg, #93704e 0%, #7a5d3f 100%);
  color: #fdfcfa;
  border: none;
  padding: 0.85rem 2rem;
  border-radius: 30px;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.03em;
  cursor: pointer;
  font-family: 'Lato', sans-serif;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(147, 112, 78, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(147, 112, 78, 0.3);
  }

  @media (max-width: 1023px) {
    padding: 0.75rem 1.75rem;
    font-size: 0.85rem;
  }
`;

const Hero = styled.section`
  position: relative;
  padding: 8rem 2.5rem 6rem;
  text-align: center;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 600px;
    height: 600px;
    background: radial-gradient(
      circle,
      rgba(147, 112, 78, 0.08) 0%,
      transparent 70%
    );
    pointer-events: none;
  }

  @media (max-width: 1023px) {
    padding: 6rem 2rem 4.5rem;
  }

  @media (max-width: 767px) {
    padding: 5rem 1.5rem 3.5rem;
  }
`;

const HeroInner = styled.div`
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
`;

const HeroLabel = styled.div`
  display: inline-block;
  color: #93704e;
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 2rem;
  font-family: 'Lato', sans-serif;
  border-bottom: 1px solid #93704e;
  padding-bottom: 0.5rem;
`;

const HeroTitle = styled.h1`
  font-size: 4.5rem;
  font-weight: 400;
  line-height: 1.15;
  color: #2c2c2c;
  margin-bottom: 2rem;
  letter-spacing: -0.01em;
  font-style: italic;

  @media (max-width: 1023px) {
    font-size: 3.25rem;
  }

  @media (max-width: 767px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.15rem;
  color: #5c5c5c;
  max-width: 700px;
  margin: 0 auto 3.5rem;
  line-height: 1.8;
  font-family: 'Lato', sans-serif;
  font-weight: 300;

  @media (max-width: 767px) {
    font-size: 1.05rem;
    margin-bottom: 3rem;
  }
`;

const HeroCTAGroup = styled.div`
  display: flex;
  gap: 1.25rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const PrimaryButton = styled.button`
  background: linear-gradient(135deg, #93704e 0%, #7a5d3f 100%);
  color: #fdfcfa;
  border: none;
  padding: 1.1rem 3rem;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.03em;
  cursor: pointer;
  font-family: 'Lato', sans-serif;
  transition: all 0.3s;
  box-shadow: 0 8px 25px rgba(147, 112, 78, 0.25);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(147, 112, 78, 0.35);
  }

  @media (max-width: 767px) {
    width: 100%;
    padding: 1rem 2.5rem;
  }
`;

const SecondaryButton = styled.button`
  background: transparent;
  color: #93704e;
  border: 2px solid #93704e;
  padding: 1.1rem 3rem;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.03em;
  cursor: pointer;
  font-family: 'Lato', sans-serif;
  transition: all 0.3s;

  &:hover {
    background: #93704e;
    color: #fdfcfa;
    transform: translateY(-3px);
  }

  @media (max-width: 767px) {
    width: 100%;
    padding: 1rem 2.5rem;
  }
`;

const Section = styled.section`
  padding: 6rem 2.5rem;

  @media (max-width: 767px) {
    padding: 4rem 1.5rem;
  }
`;

const SectionInner = styled.div`
  max-width: 1300px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 5rem;

  @media (max-width: 767px) {
    margin-bottom: 3.5rem;
  }
`;

const SectionLabel = styled.div`
  color: #93704e;
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
  font-family: 'Lato', sans-serif;
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  font-weight: 400;
  color: #2c2c2c;
  font-style: italic;
  letter-spacing: -0.01em;

  @media (max-width: 767px) {
    font-size: 2.25rem;
  }
`;

const CarsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;

  @media (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const CarCard = styled.div`
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  transition: all 0.4s;

  &:hover {
    transform: translateY(-12px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
  }
`;

const CarImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  height: 240px;
`;

const CarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;

  ${CarCard}:hover & {
    transform: scale(1.08);
  }
`;

const CarTag = styled.div`
  position: absolute;
  top: 1.25rem;
  left: 1.25rem;
  background: rgba(253, 252, 250, 0.95);
  color: #93704e;
  padding: 0.5rem 1.25rem;
  border-radius: 25px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-family: 'Lato', sans-serif;
  backdrop-filter: blur(10px);
`;

const CarContent = styled.div`
  padding: 2rem;
`;

const CarTitle = styled.h3`
  font-size: 1.35rem;
  font-weight: 400;
  color: #2c2c2c;
  margin-bottom: 0.75rem;
  font-style: italic;
`;

const CarDetails = styled.div`
  display: flex;
  gap: 1rem;
  color: #8c8c8c;
  font-size: 0.85rem;
  margin-bottom: 1.5rem;
  font-family: 'Lato', sans-serif;
  font-weight: 400;
`;

const CarPrice = styled.div`
  font-size: 1.85rem;
  font-weight: 400;
  color: #93704e;
  margin-bottom: 1.75rem;
  font-style: italic;
`;

const CarButton = styled.button`
  width: 100%;
  background: transparent;
  color: #93704e;
  border: 1px solid rgba(147, 112, 78, 0.3);
  padding: 0.95rem;
  border-radius: 30px;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.03em;
  cursor: pointer;
  font-family: 'Lato', sans-serif;
  transition: all 0.3s;

  &:hover {
    background: #93704e;
    color: #fdfcfa;
    border-color: #93704e;
  }
`;

const ProcessSection = styled(Section)`
  background: #ffffff;
  box-shadow: 0 -1px 0 rgba(147, 112, 78, 0.1), 0 1px 0 rgba(147, 112, 78, 0.1);
`;

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3.5rem;

  @media (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem;
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const StepCard = styled.div`
  text-align: center;
  position: relative;
  padding-top: 2rem;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 1px;
    background: linear-gradient(90deg, transparent, #93704e, transparent);
  }
`;

const StepNumber = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #93704e;
  margin-bottom: 1.5rem;
  letter-spacing: 0.1em;
  font-family: 'Lato', sans-serif;
`;

const StepTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 400;
  color: #2c2c2c;
  margin-bottom: 1rem;
  font-style: italic;
`;

const StepDesc = styled.p`
  color: #6c6c6c;
  font-size: 0.95rem;
  line-height: 1.7;
  font-family: 'Lato', sans-serif;
  font-weight: 300;
`;

const Footer = styled.footer`
  background: #2c2c2c;
  color: #fdfcfa;
`;

const FooterInner = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 5rem 2.5rem 2.5rem;

  @media (max-width: 767px) {
    padding: 4rem 1.5rem 2rem;
  }
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 4rem;
  margin-bottom: 4rem;

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
  font-size: 1.65rem;
  font-weight: 400;
  color: #93704e;
  margin-bottom: 1.25rem;
  letter-spacing: 0.02em;
  font-style: italic;
`;

const FooterDesc = styled.p`
  color: rgba(253, 252, 250, 0.6);
  font-size: 0.9rem;
  line-height: 1.8;
  font-family: 'Lato', sans-serif;
  font-weight: 300;
`;

const FooterTitle = styled.h4`
  font-size: 0.85rem;
  font-weight: 600;
  color: #93704e;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-family: 'Lato', sans-serif;
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FooterLink = styled.a`
  color: rgba(253, 252, 250, 0.7);
  font-size: 0.9rem;
  transition: color 0.3s;
  font-family: 'Lato', sans-serif;
  font-weight: 300;

  &:hover {
    color: #93704e;
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 2.5rem;
  border-top: 1px solid rgba(253, 252, 250, 0.1);
  color: rgba(253, 252, 250, 0.5);
  font-size: 0.85rem;
  font-family: 'Lato', sans-serif;
  font-weight: 300;
  letter-spacing: 0.03em;
`;

export default function Layout03() {
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
        <HeroInner>
          <HeroLabel>Premium Car Advisory</HeroLabel>
          <HeroTitle>Stoimy po stronie kupującego</HeroTitle>
          <HeroSubtitle>
            Transparentność, dokładna weryfikacja i pełne wsparcie w zakupie
            samochodu. Nie sprzedajemy — doradzamy i dbamy o Twoje interesy.
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
            <SectionTitle>Wybrane auta</SectionTitle>
          </SectionHeader>
          <CarsGrid>
            {CARS.map((car) => (
              <CarCard key={car.id}>
                <CarImageWrapper>
                  <CarTag>{car.tag}</CarTag>
                  <CarImage src={car.img} alt={`${car.brand} ${car.model}`} />
                </CarImageWrapper>
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
          <Copyright>© 2024 CarMentor. Wszystkie prawa zastrzeżone.</Copyright>
        </FooterInner>
      </Footer>
    </Container>
  );
}
