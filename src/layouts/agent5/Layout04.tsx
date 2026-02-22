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
  body { font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif; color: #0a0a0a; background: #fff; }
  a { text-decoration: none; color: inherit; }
  img { max-width: 100%; display: block; }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 2rem;
  max-width: 1280px;
  margin: 0 auto;
  @media (max-width: 767px) {
    padding: 1rem;
    flex-wrap: wrap;
  }
`;

const Logo = styled.span`
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: -0.04em;
  color: #0a0a0a;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2.5rem;
  @media (max-width: 767px) {
    display: none;
  }
`;

const NavLink = styled.a`
  font-size: 0.9rem;
  font-weight: 500;
  color: #444;
  &:hover {
    color: #0066ff;
  }
`;

const CtaButton = styled.button`
  padding: 0.65rem 1.5rem;
  background: #0066ff;
  color: #fff;
  border: none;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  clip-path: polygon(
    8px 0,
    100% 0,
    100% calc(100% - 8px),
    calc(100% - 8px) 100%,
    0 100%,
    0 8px
  );
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
  cursor: pointer;
  padding: 0.25rem;
  @media (max-width: 767px) {
    display: block;
  }
`;

const Hero = styled.section`
  padding: 6rem 2rem;
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 4rem;
  @media (max-width: 1023px) {
    grid-template-columns: 1fr;
    text-align: center;
    padding: 4rem 1.5rem;
    gap: 2rem;
  }
  @media (max-width: 767px) {
    padding: 3rem 1rem;
  }
`;

const HeroContent = styled.div``;

const HeroTitle = styled.h1`
  font-size: clamp(2.5rem, 4vw, 3.5rem);
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1.1;
  margin-bottom: 1.25rem;
`;

const HeroSubtitle = styled.p`
  font-size: 1.1rem;
  color: #555;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  @media (max-width: 1023px) {
    justify-content: center;
  }
`;

const PrimaryBtn = styled.button`
  padding: 1rem 1.8rem;
  background: #0066ff;
  color: #fff;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  clip-path: polygon(
    10px 0,
    100% 0,
    100% calc(100% - 10px),
    calc(100% - 10px) 100%,
    0 100%,
    0 10px
  );
`;

const SecondaryBtn = styled.button`
  padding: 1rem 1.8rem;
  background: transparent;
  color: #0066ff;
  border: 2px solid #0066ff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  clip-path: polygon(
    10px 0,
    100% 0,
    100% calc(100% - 10px),
    calc(100% - 10px) 100%,
    0 100%,
    0 10px
  );
`;

const HeroVisual = styled.div`
  aspect-ratio: 4/3;
  background: linear-gradient(135deg, #0066ff 0%, #00ccff 100%);
  clip-path: polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%);
  @media (max-width: 1023px) {
    max-height: 280px;
  }
`;

const Section = styled.section`
  padding: 4rem 2rem;
  max-width: 1280px;
  margin: 0 auto;
  @media (max-width: 767px) {
    padding: 3rem 1rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 2rem;
  letter-spacing: -0.03em;
`;

const CarsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  @media (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const CarCard = styled.article`
  border: 2px solid #e0e0e0;
  overflow: hidden;
  transition: border-color 0.2s;
  &:hover {
    border-color: #0066ff;
  }
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
  padding: 1.25rem;
`;

const CarTag = styled.span`
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 700;
  color: #0066ff;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
`;

const CarName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const CarMeta = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.75rem;
`;

const CarPrice = styled.p`
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const CardCta = styled.button`
  width: 100%;
  padding: 0.65rem;
  background: #0066ff;
  color: #fff;
  border: none;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  clip-path: polygon(
    6px 0,
    100% 0,
    100% calc(100% - 6px),
    calc(100% - 6px) 100%,
    0 100%,
    0 6px
  );
`;

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  @media (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const StepCard = styled.div`
  padding: 2rem 1.5rem;
  border: 2px solid #e0e0e0;
  border-left: 4px solid #0066ff;
`;

const StepNum = styled.span`
  font-size: 0.85rem;
  font-weight: 700;
  color: #0066ff;
  letter-spacing: 0.05em;
  display: block;
  margin-bottom: 0.5rem;
`;

const StepTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const StepDesc = styled.p`
  font-size: 0.9rem;
  color: #555;
  line-height: 1.5;
`;

const Footer = styled.footer`
  background: #0a0a0a;
  color: #fff;
  padding: 3rem 2rem;
  margin-top: 4rem;
  @media (max-width: 767px) {
    padding: 2rem 1rem;
  }
`;

const FooterInner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 2rem;
`;

const FooterBrand = styled.div`
  max-width: 300px;
`;

const FooterLogo = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  display: block;
  margin-bottom: 0.5rem;
`;

const FooterDesc = styled.p`
  font-size: 0.9rem;
  color: #999;
  line-height: 1.5;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

const FooterContact = styled.div`
  font-size: 0.9rem;
  color: #999;
  line-height: 1.6;
`;

const Copyright = styled.p`
  width: 100%;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #333;
  font-size: 0.85rem;
  color: #666;
`;

export default function Layout04() {
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
        <HeroContent>
          <HeroTitle>Stoimy po stronie kupującego</HeroTitle>
          <HeroSubtitle>
            Sprawdzone auta od ręki lub auto na zamówienie. Weryfikujemy
            historię, stan i cenę — żebyś kupił mądrze.
          </HeroSubtitle>
          <HeroButtons>
            <PrimaryBtn>Zobacz auta od ręki</PrimaryBtn>
            <SecondaryBtn>Znajdź mi auto</SecondaryBtn>
          </HeroButtons>
        </HeroContent>
        <HeroVisual />
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
