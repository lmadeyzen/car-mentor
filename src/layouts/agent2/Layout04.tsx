import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: 'Courier New', 'Courier', monospace;
    background: #f8f8f0;
    color: #1a1a1a;
    line-height: 1.5;
    overflow-x: hidden;
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
  background: #f8f8f0;
  position: relative;

  &::before {
    content: "";
    position: fixed;
    top: 0;
    right: 0;
    width: 40%;
    height: 100%;
    background: #ff4444;
    z-index: 0;
    clip-path: polygon(15% 0, 100% 0, 100% 100%, 0% 100%);

    @media (max-width: 1023px) {
      width: 30%;
      clip-path: polygon(30% 0, 100% 0, 100% 100%, 0% 100%);
    }

    @media (max-width: 767px) {
      display: none;
    }
  }
`;

const Nav = styled.nav`
  position: relative;
  z-index: 10;
  background: transparent;
  border-bottom: 4px solid #1a1a1a;
`;

const NavInner = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  padding: 2rem 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 767px) {
    padding: 1.5rem 1.5rem;
    flex-direction: column;
    gap: 1.5rem;
    align-items: flex-start;
  }
`;

const Logo = styled.div`
  font-size: 2rem;
  font-weight: 900;
  color: #1a1a1a;
  letter-spacing: -0.05em;
  text-transform: uppercase;
  transform: rotate(-2deg);
  background: #ffff00;
  padding: 0.5rem 1.5rem;
  border: 3px solid #1a1a1a;
  box-shadow: 6px 6px 0 #1a1a1a;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 0;
  align-items: center;
  border: 3px solid #1a1a1a;
  background: #ffffff;

  @media (max-width: 1023px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: #1a1a1a;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  padding: 0.85rem 1.5rem;
  border-right: 3px solid #1a1a1a;
  transition: all 0.2s;

  &:last-child {
    border-right: none;
  }

  &:hover {
    background: #ffff00;
    transform: translateY(-3px);
  }
`;

const CTAButton = styled.button`
  background: #ff4444;
  color: #ffffff;
  border: 3px solid #1a1a1a;
  padding: 0.85rem 2rem;
  font-size: 0.9rem;
  font-weight: 900;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: 5px 5px 0 #1a1a1a;
  transition: all 0.1s;
  font-family: 'Courier New', 'Courier', monospace;

  &:hover {
    transform: translate(2px, 2px);
    box-shadow: 3px 3px 0 #1a1a1a;
  }

  &:active {
    transform: translate(5px, 5px);
    box-shadow: 0 0 0 #1a1a1a;
  }

  @media (max-width: 767px) {
    align-self: stretch;
  }
`;

const Hero = styled.section`
  position: relative;
  z-index: 1;
  padding: 4rem 2.5rem 6rem;
  max-width: 1500px;
  margin: 0 auto;

  @media (max-width: 767px) {
    padding: 3rem 1.5rem 4rem;
  }
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 3rem;
  align-items: center;

  @media (max-width: 1023px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const HeroContent = styled.div``;

const HeroLabel = styled.div`
  display: inline-block;
  background: #1a1a1a;
  color: #ffff00;
  padding: 0.5rem 1.5rem;
  font-size: 0.75rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 2rem;
  border: 3px solid #1a1a1a;
  transform: rotate(-1deg);
`;

const HeroTitle = styled.h1`
  font-size: 5rem;
  font-weight: 900;
  line-height: 0.9;
  color: #1a1a1a;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: -0.05em;
  text-shadow: 4px 4px 0 rgba(255, 255, 0, 0.5);

  @media (max-width: 1023px) {
    font-size: 3.5rem;
  }

  @media (max-width: 767px) {
    font-size: 2.5rem;
    text-shadow: 3px 3px 0 rgba(255, 255, 0, 0.5);
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.1rem;
  color: #1a1a1a;
  margin-bottom: 3rem;
  line-height: 1.7;
  max-width: 600px;
  font-weight: 700;

  @media (max-width: 767px) {
    font-size: 1rem;
  }
`;

const HeroCTAGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

const PrimaryButton = styled.button`
  background: #1a1a1a;
  color: #ffff00;
  border: 3px solid #1a1a1a;
  padding: 1.25rem 2.5rem;
  font-size: 1rem;
  font-weight: 900;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: 6px 6px 0 #ff4444;
  transition: all 0.1s;
  font-family: 'Courier New', 'Courier', monospace;

  &:hover {
    transform: translate(2px, 2px);
    box-shadow: 4px 4px 0 #ff4444;
  }

  @media (max-width: 767px) {
    width: 100%;
  }
`;

const SecondaryButton = styled.button`
  background: #ffffff;
  color: #1a1a1a;
  border: 3px solid #1a1a1a;
  padding: 1.25rem 2.5rem;
  font-size: 1rem;
  font-weight: 900;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: 6px 6px 0 #1a1a1a;
  transition: all 0.1s;
  font-family: 'Courier New', 'Courier', monospace;

  &:hover {
    transform: translate(2px, 2px);
    box-shadow: 4px 4px 0 #1a1a1a;
  }

  @media (max-width: 767px) {
    width: 100%;
  }
`;

const HeroVisual = styled.div`
  position: relative;

  @media (max-width: 1023px) {
    order: -1;
  }
`;

const HeroBox = styled.div`
  background: #ffffff;
  border: 4px solid #1a1a1a;
  padding: 2rem;
  transform: rotate(2deg);
  box-shadow: 10px 10px 0 #1a1a1a;

  @media (max-width: 767px) {
    padding: 1.5rem;
  }
`;

const HeroBoxText = styled.div`
  font-size: 1.5rem;
  font-weight: 900;
  text-transform: uppercase;
  line-height: 1.2;
  color: #1a1a1a;
  transform: rotate(-2deg);

  span {
    background: #ffff00;
    padding: 0.25rem 0.5rem;
    display: inline-block;
    margin: 0.25rem 0;
  }

  @media (max-width: 767px) {
    font-size: 1.25rem;
  }
`;

const Section = styled.section`
  position: relative;
  z-index: 1;
  padding: 5rem 2.5rem;
  background: #ffffff;
  border-top: 6px solid #1a1a1a;
  border-bottom: 6px solid #1a1a1a;

  @media (max-width: 767px) {
    padding: 3.5rem 1.5rem;
  }
`;

const SectionInner = styled.div`
  max-width: 1500px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  margin-bottom: 4rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;

  @media (max-width: 767px) {
    margin-bottom: 3rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 4rem;
  font-weight: 900;
  color: #1a1a1a;
  text-transform: uppercase;
  letter-spacing: -0.05em;
  line-height: 0.9;

  @media (max-width: 767px) {
    font-size: 2.5rem;
  }
`;

const SectionDecoration = styled.div`
  flex-grow: 1;
  height: 4px;
  background: repeating-linear-gradient(
    90deg,
    #1a1a1a 0px,
    #1a1a1a 20px,
    transparent 20px,
    transparent 40px
  );
  min-width: 100px;
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
  background: #f8f8f0;
  border: 4px solid #1a1a1a;
  overflow: hidden;
  transition: all 0.2s;
  transform: rotate(${() => (Math.random() - 0.5) * 2}deg);

  &:hover {
    transform: rotate(0deg) scale(1.05);
    box-shadow: 12px 12px 0 #1a1a1a;
  }
`;

const CarImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  border-bottom: 4px solid #1a1a1a;
`;

const CarImage = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
  filter: contrast(1.2) saturate(1.1);
  transition: transform 0.3s;

  ${CarCard}:hover & {
    transform: scale(1.1) rotate(-2deg);
  }
`;

const CarTag = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #ff4444;
  color: #ffffff;
  padding: 0.5rem 1.25rem;
  font-size: 0.7rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: 3px solid #1a1a1a;
  transform: rotate(-5deg);
  box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.3);
`;

const CarContent = styled.div`
  padding: 1.75rem;
  background: #ffffff;
`;

const CarTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 900;
  color: #1a1a1a;
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: -0.02em;
`;

const CarDetails = styled.div`
  display: flex;
  gap: 1rem;
  color: #666;
  font-size: 0.8rem;
  margin-bottom: 1.25rem;
  font-weight: 700;
  text-transform: uppercase;
`;

const CarPrice = styled.div`
  font-size: 1.75rem;
  font-weight: 900;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
  background: #ffff00;
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border: 3px solid #1a1a1a;
  transform: rotate(-1deg);
`;

const CarButton = styled.button`
  width: 100%;
  background: #1a1a1a;
  color: #ffffff;
  border: 3px solid #1a1a1a;
  padding: 0.9rem;
  font-size: 0.85rem;
  font-weight: 900;
  text-transform: uppercase;
  cursor: pointer;
  font-family: 'Courier New', 'Courier', monospace;
  transition: all 0.1s;

  &:hover {
    background: #ff4444;
  }
`;

const ProcessSection = styled.section`
  position: relative;
  z-index: 1;
  padding: 5rem 2.5rem;
  background: #1a1a1a;

  @media (max-width: 767px) {
    padding: 3.5rem 1.5rem;
  }
`;

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2.5rem;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const StepCard = styled.div`
  background: ${() => {
    const colors = ["#ffff00", "#ff4444", "#00ff88", "#ffffff"];
    return colors[Math.floor(Math.random() * colors.length)];
  }};
  border: 4px solid #000000;
  padding: 2.5rem;
  transform: rotate(${() => (Math.random() - 0.5) * 3}deg);
  box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.5);
  transition: transform 0.2s;

  &:hover {
    transform: rotate(0deg) scale(1.03);
  }

  @media (max-width: 767px) {
    padding: 2rem;
  }
`;

const StepNumber = styled.div`
  font-size: 3rem;
  font-weight: 900;
  color: #1a1a1a;
  margin-bottom: 1rem;
  letter-spacing: -0.05em;
  text-shadow: 3px 3px 0 rgba(255, 255, 255, 0.5);
`;

const StepTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 900;
  color: #1a1a1a;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: -0.02em;
`;

const StepDesc = styled.p`
  color: #1a1a1a;
  font-size: 0.95rem;
  line-height: 1.6;
  font-weight: 700;
`;

const Footer = styled.footer`
  position: relative;
  z-index: 1;
  background: #f8f8f0;
  border-top: 6px solid #1a1a1a;
`;

const FooterInner = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  padding: 4rem 2.5rem 2rem;

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
    gap: 2.5rem;
  }
`;

const FooterSection = styled.div``;

const FooterLogo = styled.div`
  font-size: 2rem;
  font-weight: 900;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
  letter-spacing: -0.05em;
  text-transform: uppercase;
  background: #ffff00;
  display: inline-block;
  padding: 0.5rem 1.5rem;
  border: 3px solid #1a1a1a;
  transform: rotate(-2deg);
`;

const FooterDesc = styled.p`
  color: #1a1a1a;
  font-size: 0.85rem;
  line-height: 1.7;
  font-weight: 700;
  max-width: 300px;
`;

const FooterTitle = styled.h4`
  font-size: 1rem;
  font-weight: 900;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  background: #ffffff;
  display: inline-block;
  padding: 0.5rem 1rem;
  border: 3px solid #1a1a1a;
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FooterLink = styled.a`
  color: #1a1a1a;
  font-size: 0.85rem;
  font-weight: 700;
  transition: all 0.2s;
  display: inline-block;
  padding: 0.35rem 0;

  &:hover {
    transform: translateX(8px);
    color: #ff4444;
  }

  &::before {
    content: "→ ";
    font-weight: 900;
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 2rem;
  border-top: 4px dashed #1a1a1a;
  color: #1a1a1a;
  font-size: 0.85rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export default function Layout04() {
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
          <CTAButton>Kontakt!</CTAButton>
        </NavInner>
      </Nav>

      <Hero>
        <HeroGrid>
          <HeroContent>
            <HeroLabel>★ Twój Ally ★</HeroLabel>
            <HeroTitle>
              Stoimy po stronie kupującego
            </HeroTitle>
            <HeroSubtitle>
              Transparentność, weryfikacja i pełne wsparcie. Nie sprzedajemy —
              doradzamy i chronimy Twoje interesy na każdym etapie zakupu.
            </HeroSubtitle>
            <HeroCTAGroup>
              <PrimaryButton>Zobacz auta →</PrimaryButton>
              <SecondaryButton>Znajdź mi auto</SecondaryButton>
            </HeroCTAGroup>
          </HeroContent>
          <HeroVisual>
            <HeroBox>
              <HeroBoxText>
                <span>100%</span> <span>Verified</span> <span>Cars</span>
              </HeroBoxText>
            </HeroBox>
          </HeroVisual>
        </HeroGrid>
      </Hero>

      <Section>
        <SectionInner>
          <SectionHeader>
            <SectionTitle>Top Picks</SectionTitle>
            <SectionDecoration />
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
                    <span>//</span>
                    <span>{car.mileage}</span>
                  </CarDetails>
                  <CarPrice>{car.price}</CarPrice>
                  <CarButton>Zapytaj teraz!</CarButton>
                </CarContent>
              </CarCard>
            ))}
          </CarsGrid>
        </SectionInner>
      </Section>

      <ProcessSection>
        <SectionInner>
          <SectionHeader>
            <SectionTitle style={{ color: "#ffffff" }}>
              Jak to działa?
            </SectionTitle>
            <SectionDecoration
              style={{
                background: `repeating-linear-gradient(
                  90deg,
                  #ffffff 0px,
                  #ffffff 20px,
                  transparent 20px,
                  transparent 40px
                )`,
              }}
            />
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
          <Copyright>© 2024 CarMentor ★ All Rights Reserved</Copyright>
        </FooterInner>
      </Footer>
    </Container>
  );
}
