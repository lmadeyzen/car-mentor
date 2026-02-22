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
  body { font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace; color: #fff; background: #0a0a0a; }
  a { text-decoration: none; color: inherit; }
  img { max-width: 100%; display: block; }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-bottom: 3px solid #00ff41;
  @media (max-width: 767px) {
    padding: 0.75rem 1rem;
    flex-wrap: wrap;
  }
`;

const Logo = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  color: #00ff41;
  letter-spacing: 0.2em;
  text-transform: uppercase;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  @media (max-width: 767px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: #666;
  &:hover {
    color: #00ff41;
  }
`;

const CtaButton = styled.button`
  padding: 0.5rem 1rem;
  background: #00ff41;
  color: #0a0a0a;
  border: none;
  font-size: 0.8rem;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  @media (max-width: 767px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.75rem;
  }
`;

const Hamburger = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #00ff41;
  cursor: pointer;
  padding: 0.25rem;
  font-family: inherit;
  @media (max-width: 767px) {
    display: block;
  }
`;

const Hero = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 70vh;
  @media (max-width: 1023px) {
    grid-template-columns: 1fr;
    min-height: auto;
  }
`;

const HeroLeft = styled.div`
  padding: 4rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-right: 3px solid #00ff41;
  @media (max-width: 1023px) {
    border-right: none;
    border-bottom: 3px solid #00ff41;
    padding: 3rem 2rem;
  }
  @media (max-width: 767px) {
    padding: 2rem 1rem;
  }
`;

const HeroLabel = styled.span`
  font-size: 0.75rem;
  color: #00ff41;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  margin-bottom: 1rem;
`;

const HeroTitle = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.02em;
  margin-bottom: 1.5rem;
  color: #fff;
`;

const HeroSubtitle = styled.p`
  font-size: 0.95rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 2rem;
  max-width: 400px;
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const PrimaryBtn = styled.button`
  padding: 0.75rem 1.5rem;
  background: #00ff41;
  color: #0a0a0a;
  border: none;
  font-size: 0.85rem;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const SecondaryBtn = styled.button`
  padding: 0.75rem 1.5rem;
  background: transparent;
  color: #00ff41;
  border: 2px solid #00ff41;
  font-size: 0.85rem;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const HeroRight = styled.div`
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 255, 65, 0.03) 2px,
    rgba(0, 255, 65, 0.03) 4px
  );
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  @media (max-width: 1023px) {
    min-height: 200px;
  }
`;

const HeroVisual = styled.div`
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 700;
  color: #00ff41;
  opacity: 0.3;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const Section = styled.section`
  padding: 4rem 2rem;
  border-top: 3px solid #222;
  @media (max-width: 767px) {
    padding: 3rem 1rem;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: baseline;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const SectionTitle = styled.h2`
  font-size: 1rem;
  font-weight: 700;
  color: #00ff41;
  letter-spacing: 0.2em;
  text-transform: uppercase;
`;

const SectionNum = styled.span`
  font-size: 0.8rem;
  color: #333;
`;

const CarsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  border: 2px solid #222;
  @media (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const CarCard = styled.article`
  border: 1px solid #222;
  overflow: hidden;
  background: #0a0a0a;
`;

const CarImage = styled.div`
  aspect-ratio: 16/10;
  overflow: hidden;
  border-bottom: 2px solid #222;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(30%);
  }
`;

const CarContent = styled.div`
  padding: 1.25rem;
`;

const CarTag = styled.span`
  display: inline-block;
  font-size: 0.65rem;
  font-weight: 700;
  color: #00ff41;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
`;

const CarName = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  color: #fff;
`;

const CarMeta = styled.p`
  font-size: 0.8rem;
  color: #555;
  margin-bottom: 0.75rem;
`;

const CarPrice = styled.p`
  font-size: 1rem;
  font-weight: 700;
  color: #00ff41;
  margin-bottom: 1rem;
`;

const CardCta = styled.button`
  width: 100%;
  padding: 0.6rem;
  background: transparent;
  color: #00ff41;
  border: 2px solid #00ff41;
  font-size: 0.75rem;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  border: 2px solid #222;
  @media (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const StepCard = styled.div`
  padding: 2rem 1.5rem;
  border: 1px solid #222;
  border-left: 4px solid #00ff41;
`;

const StepNum = styled.span`
  font-size: 0.7rem;
  font-weight: 700;
  color: #00ff41;
  letter-spacing: 0.1em;
  display: block;
  margin-bottom: 0.75rem;
`;

const StepTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #fff;
`;

const StepDesc = styled.p`
  font-size: 0.85rem;
  color: #666;
  line-height: 1.5;
`;

const Footer = styled.footer`
  border-top: 3px solid #00ff41;
  padding: 3rem 2rem;
  margin-top: 0;
  background: #050505;
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
  font-size: 1rem;
  font-weight: 700;
  color: #00ff41;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  display: block;
  margin-bottom: 0.5rem;
`;

const FooterDesc = styled.p`
  font-size: 0.85rem;
  color: #555;
  line-height: 1.5;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const FooterContact = styled.div`
  font-size: 0.85rem;
  color: #555;
  line-height: 1.6;
`;

const Copyright = styled.p`
  width: 100%;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #222;
  font-size: 0.75rem;
  color: #333;
  letter-spacing: 0.05em;
`;

export default function Layout05() {
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
        <Hamburger aria-label="Menu">≡</Hamburger>
      </Nav>

      <Hero>
        <HeroLeft>
          <HeroLabel>// obietnica</HeroLabel>
          <HeroTitle>Stoimy po stronie kupującego</HeroTitle>
          <HeroSubtitle>
            Sprawdzone auta od ręki lub auto na zamówienie. Weryfikujemy
            historię, stan i cenę — żebyś kupił mądrze.
          </HeroSubtitle>
          <HeroButtons>
            <PrimaryBtn>Zobacz auta od ręki</PrimaryBtn>
            <SecondaryBtn>Znajdź mi auto</SecondaryBtn>
          </HeroButtons>
        </HeroLeft>
        <HeroRight>
          <HeroVisual>CAR</HeroVisual>
        </HeroRight>
      </Hero>

      <Section>
        <SectionHeader>
          <SectionTitle>Top Picks</SectionTitle>
          <SectionNum>[06 pojazdów]</SectionNum>
        </SectionHeader>
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
        <SectionHeader>
          <SectionTitle>Jak działamy</SectionTitle>
          <SectionNum>[04 kroki]</SectionNum>
        </SectionHeader>
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
