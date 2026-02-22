import { useState } from "react";
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
  body {
    font-family: 'Georgia', 'Times New Roman', serif;
    background: #0a0a0a;
    color: #e8e4dd;
    -webkit-font-smoothing: antialiased;
  }
  a { text-decoration: none; color: inherit; }
  img { max-width: 100%; display: block; }
`;

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 4rem;
  background: rgba(10, 10, 10, 0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(196, 170, 109, 0.15);

  @media (max-width: 1023px) {
    padding: 1rem 2rem;
  }
  @media (max-width: 767px) {
    padding: 1rem 1.25rem;
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #c4aa6d;
  font-family: 'Georgia', serif;
`;

const NavLinks = styled.div<{ $open: boolean }>`
  display: flex;
  align-items: center;
  gap: 2.5rem;

  @media (max-width: 767px) {
    display: ${({ $open }) => ($open ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(10, 10, 10, 0.97);
    padding: 2rem;
    gap: 1.5rem;
    border-bottom: 1px solid rgba(196, 170, 109, 0.15);
  }
`;

const NavLink = styled.a`
  font-size: 0.85rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #a09888;
  transition: color 0.3s;
  cursor: pointer;
  &:hover {
    color: #c4aa6d;
  }
`;

const NavCta = styled.a`
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.65rem 1.8rem;
  border: 1px solid #c4aa6d;
  color: #c4aa6d;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    background: #c4aa6d;
    color: #0a0a0a;
  }
`;

const Hamburger = styled.button`
  display: none;
  background: none;
  border: none;
  color: #c4aa6d;
  font-size: 1.5rem;
  cursor: pointer;
  @media (max-width: 767px) {
    display: block;
  }
`;

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 8rem 2rem 4rem;
  background: linear-gradient(
    180deg,
    rgba(10, 10, 10, 1) 0%,
    rgba(20, 18, 14, 1) 50%,
    rgba(10, 10, 10, 1) 100%
  );
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(196, 170, 109, 0.06) 0%, transparent 70%);
    pointer-events: none;
  }
`;

const HeroEyebrow = styled.span`
  font-size: 0.75rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #c4aa6d;
  margin-bottom: 1.5rem;
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  font-weight: 400;
  line-height: 1.15;
  max-width: 800px;
  color: #f0ece4;

  @media (max-width: 1023px) {
    font-size: 3rem;
  }
  @media (max-width: 767px) {
    font-size: 2rem;
  }
`;

const HeroSub = styled.p`
  font-size: 1.15rem;
  line-height: 1.7;
  max-width: 560px;
  margin-top: 1.5rem;
  color: #a09888;
  font-family: 'Helvetica Neue', Arial, sans-serif;

  @media (max-width: 767px) {
    font-size: 1rem;
  }
`;

const HeroActions = styled.div`
  display: flex;
  gap: 1.25rem;
  margin-top: 3rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const BtnPrimary = styled.a`
  display: inline-block;
  padding: 1rem 2.5rem;
  background: #c4aa6d;
  color: #0a0a0a;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  &:hover {
    background: #d4be87;
  }
`;

const BtnSecondary = styled.a`
  display: inline-block;
  padding: 1rem 2.5rem;
  border: 1px solid rgba(196, 170, 109, 0.4);
  color: #c4aa6d;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  &:hover {
    border-color: #c4aa6d;
    background: rgba(196, 170, 109, 0.08);
  }
`;

const SectionWrapper = styled.section`
  padding: 6rem 4rem;

  @media (max-width: 1023px) {
    padding: 5rem 2rem;
  }
  @media (max-width: 767px) {
    padding: 4rem 1.25rem;
  }
`;

const SectionLabel = styled.span`
  display: block;
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #c4aa6d;
  margin-bottom: 0.75rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 400;
  color: #f0ece4;
  margin-bottom: 3rem;

  @media (max-width: 767px) {
    font-size: 1.75rem;
    margin-bottom: 2rem;
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
  background: #141210;
  border: 1px solid rgba(196, 170, 109, 0.1);
  overflow: hidden;
  transition: border-color 0.3s;
  &:hover {
    border-color: rgba(196, 170, 109, 0.35);
  }
`;

const CarImg = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
`;

const CarBody = styled.div`
  padding: 1.5rem;
`;

const CarTag = styled.span`
  display: inline-block;
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 0.3rem 0.75rem;
  border: 1px solid rgba(196, 170, 109, 0.3);
  color: #c4aa6d;
  margin-bottom: 1rem;
`;

const CarName = styled.h3`
  font-size: 1.15rem;
  font-weight: 400;
  color: #f0ece4;
  margin-bottom: 0.5rem;
`;

const CarDetails = styled.p`
  font-size: 0.85rem;
  color: #706858;
  font-family: 'Helvetica Neue', Arial, sans-serif;
`;

const CarPrice = styled.div`
  font-size: 1.25rem;
  color: #c4aa6d;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(196, 170, 109, 0.1);
`;

const CarCta = styled.a`
  display: block;
  text-align: center;
  margin-top: 1.25rem;
  padding: 0.75rem;
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border: 1px solid rgba(196, 170, 109, 0.25);
  color: #c4aa6d;
  cursor: pointer;
  transition: all 0.3s;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  &:hover {
    background: rgba(196, 170, 109, 0.08);
  }
`;

const StepsSection = styled(SectionWrapper)`
  background: #0e0d0b;
`;

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2.5rem;

  @media (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const StepCard = styled.div`
  padding: 2rem 0;
  border-top: 1px solid rgba(196, 170, 109, 0.2);
`;

const StepNum = styled.span`
  font-size: 3rem;
  font-weight: 300;
  color: rgba(196, 170, 109, 0.25);
  display: block;
  margin-bottom: 1rem;
`;

const StepTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 400;
  color: #f0ece4;
  margin-bottom: 0.75rem;
`;

const StepDesc = styled.p`
  font-size: 0.9rem;
  line-height: 1.7;
  color: #706858;
  font-family: 'Helvetica Neue', Arial, sans-serif;
`;

const Footer = styled.footer`
  padding: 4rem;
  border-top: 1px solid rgba(196, 170, 109, 0.1);
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 3rem;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    padding: 3rem 1.25rem;
    gap: 2rem;
  }
`;

const FooterBrand = styled.div``;

const FooterLogo = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #c4aa6d;
  margin-bottom: 1rem;
`;

const FooterDesc = styled.p`
  font-size: 0.9rem;
  line-height: 1.7;
  color: #706858;
  max-width: 360px;
  font-family: 'Helvetica Neue', Arial, sans-serif;
`;

const FooterHeading = styled.h4`
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #c4aa6d;
  margin-bottom: 1.25rem;
`;

const FooterLink = styled.a`
  display: block;
  font-size: 0.9rem;
  color: #706858;
  margin-bottom: 0.75rem;
  cursor: pointer;
  transition: color 0.3s;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  &:hover {
    color: #c4aa6d;
  }
`;

const Copyright = styled.div`
  padding: 2rem 4rem;
  text-align: center;
  font-size: 0.75rem;
  color: #3a352e;
  border-top: 1px solid rgba(196, 170, 109, 0.06);
  font-family: 'Helvetica Neue', Arial, sans-serif;

  @media (max-width: 767px) {
    padding: 2rem 1.25rem;
  }
`;

export default function Layout01() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <GlobalStyle />
      <Nav>
        <Logo>CarMentor</Logo>
        <NavLinks $open={menuOpen}>
          <NavLink href="#stock">Auta od ręki</NavLink>
          <NavLink href="#broker">Auto na zamówienie</NavLink>
          <NavLink href="#process">Jak działamy</NavLink>
          <NavLink href="#contact">Kontakt</NavLink>
          <NavCta href="#contact">Umów rozmowę</NavCta>
        </NavLinks>
        <Hamburger onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✕" : "☰"}
        </Hamburger>
      </Nav>

      <HeroSection>
        <HeroEyebrow>Car Mentor — Butikowa sprzedaż aut</HeroEyebrow>
        <HeroTitle>Stoimy po stronie kupującego</HeroTitle>
        <HeroSub>
          Weryfikujemy, odradzamy złe zakupy i pomagamy znaleźć auto,
          które naprawdę warto kupić. Transparentnie i bez kompromisów.
        </HeroSub>
        <HeroActions>
          <BtnPrimary href="#stock">Zobacz auta od ręki</BtnPrimary>
          <BtnSecondary href="#broker">Znajdź mi auto</BtnSecondary>
        </HeroActions>
      </HeroSection>

      <SectionWrapper id="stock">
        <SectionLabel>W naszym stocku</SectionLabel>
        <SectionTitle>Sprawdzone auta od ręki</SectionTitle>
        <CarsGrid>
          {CARS.map((car) => (
            <CarCard key={car.id}>
              <CarImg src={car.img} alt={`${car.brand} ${car.model}`} />
              <CarBody>
                <CarTag>{car.tag}</CarTag>
                <CarName>
                  {car.brand} {car.model}
                </CarName>
                <CarDetails>
                  {car.year} · {car.mileage}
                </CarDetails>
                <CarPrice>{car.price}</CarPrice>
                <CarCta href="#contact">Zapytaj o to auto</CarCta>
              </CarBody>
            </CarCard>
          ))}
        </CarsGrid>
      </SectionWrapper>

      <StepsSection id="process">
        <SectionLabel>Proces</SectionLabel>
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
      </StepsSection>

      <Footer id="contact">
        <FooterBrand>
          <FooterLogo>CarMentor</FooterLogo>
          <FooterDesc>
            Butikowa marka sprzedaży aut i usług okołozakupowych.
            Stoimy po stronie kupującego — transparentnie i bez kompromisów.
          </FooterDesc>
        </FooterBrand>
        <div>
          <FooterHeading>Nawigacja</FooterHeading>
          <FooterLink href="#stock">Auta od ręki</FooterLink>
          <FooterLink href="#broker">Auto na zamówienie</FooterLink>
          <FooterLink href="#process">Jak działamy</FooterLink>
          <FooterLink href="#contact">Kontakt</FooterLink>
        </div>
        <div>
          <FooterHeading>Kontakt</FooterHeading>
          <FooterLink href="tel:+48123456789">+48 123 456 789</FooterLink>
          <FooterLink href="mailto:kontakt@carmentor.pl">kontakt@carmentor.pl</FooterLink>
          <FooterLink href="https://wa.me/48123456789">WhatsApp</FooterLink>
        </div>
      </Footer>

      <Copyright>© {new Date().getFullYear()} CarMentor. Wszelkie prawa zastrzeżone.</Copyright>
    </>
  );
}
