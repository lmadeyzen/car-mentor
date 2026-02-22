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
    font-family: 'Courier New', 'Courier', monospace;
    background: #fffbe6;
    color: #1a1a1a;
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
  padding: 1rem 2.5rem;
  background: #fffbe6;
  border-bottom: 3px solid #1a1a1a;

  @media (max-width: 767px) {
    padding: 0.75rem 1rem;
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 900;
  font-family: 'Georgia', serif;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  span {
    background: #ff5733;
    color: #fffbe6;
    padding: 0 0.3rem;
    transform: rotate(-2deg);
    display: inline-block;
  }
`;

const NavLinks = styled.div<{ $open: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 767px) {
    display: ${({ $open }) => ($open ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    top: calc(100% + 3px);
    left: 0;
    right: 0;
    background: #fffbe6;
    padding: 1rem;
    gap: 0.5rem;
    border-bottom: 3px solid #1a1a1a;
  }
`;

const NavLink = styled.a`
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 0.4rem 0.75rem;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.15s;
  &:hover {
    border-color: #1a1a1a;
    background: #1a1a1a;
    color: #fffbe6;
  }

  @media (max-width: 767px) {
    width: 100%;
    text-align: center;
  }
`;

const NavCta = styled.a`
  font-size: 0.8rem;
  font-weight: 900;
  text-transform: uppercase;
  padding: 0.5rem 1rem;
  background: #ff5733;
  color: #fffbe6;
  border: 3px solid #1a1a1a;
  box-shadow: 4px 4px 0 #1a1a1a;
  cursor: pointer;
  transition: all 0.1s;
  &:hover {
    box-shadow: 2px 2px 0 #1a1a1a;
    transform: translate(2px, 2px);
  }
  &:active {
    box-shadow: 0 0 0 #1a1a1a;
    transform: translate(4px, 4px);
  }
`;

const Hamburger = styled.button`
  display: none;
  background: #1a1a1a;
  border: 2px solid #1a1a1a;
  color: #fffbe6;
  font-size: 1.25rem;
  width: 40px;
  height: 40px;
  cursor: pointer;
  font-weight: 900;
  @media (max-width: 767px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 8rem 2.5rem 4rem;
  border-bottom: 3px solid #1a1a1a;
  position: relative;
  overflow: hidden;

  @media (max-width: 767px) {
    padding: 6rem 1rem 3rem;
    min-height: auto;
  }
`;

const HeroMarquee = styled.div`
  position: absolute;
  top: 5.5rem;
  left: 0;
  right: 0;
  padding: 0.5rem 0;
  background: #1a1a1a;
  color: #fffbe6;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;

  span {
    display: inline-block;
    animation: marquee 20s linear infinite;
    padding-right: 2rem;
  }

  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
`;

const HeroTitle = styled.h1`
  font-family: 'Georgia', serif;
  font-size: 7rem;
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.04em;
  text-transform: uppercase;
  max-width: 900px;
  margin-top: 2rem;

  span {
    display: inline;
    background: #ff5733;
    color: #fffbe6;
    padding: 0 0.15em;
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
  }

  @media (max-width: 1023px) {
    font-size: 4.5rem;
  }
  @media (max-width: 767px) {
    font-size: 2.75rem;
  }
`;

const HeroSub = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  max-width: 480px;
  margin-top: 2rem;
  padding: 1rem;
  border-left: 4px solid #1a1a1a;

  @media (max-width: 767px) {
    font-size: 0.95rem;
  }
`;

const HeroActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2.5rem;
  flex-wrap: wrap;
`;

const BtnPrimary = styled.a`
  display: inline-block;
  padding: 1rem 2rem;
  background: #1a1a1a;
  color: #fffbe6;
  font-size: 0.9rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: 3px solid #1a1a1a;
  box-shadow: 6px 6px 0 #ff5733;
  cursor: pointer;
  transition: all 0.1s;
  font-family: 'Courier New', monospace;
  &:hover {
    box-shadow: 3px 3px 0 #ff5733;
    transform: translate(3px, 3px);
  }
`;

const BtnSecondary = styled.a`
  display: inline-block;
  padding: 1rem 2rem;
  background: #fffbe6;
  color: #1a1a1a;
  font-size: 0.9rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: 3px solid #1a1a1a;
  box-shadow: 6px 6px 0 #1a1a1a;
  cursor: pointer;
  transition: all 0.1s;
  font-family: 'Courier New', monospace;
  &:hover {
    box-shadow: 3px 3px 0 #1a1a1a;
    transform: translate(3px, 3px);
  }
`;

const SectionDivider = styled.div`
  padding: 0.5rem 2.5rem;
  background: #ff5733;
  color: #fffbe6;
  font-size: 0.7rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  border-bottom: 3px solid #1a1a1a;

  @media (max-width: 767px) {
    padding: 0.5rem 1rem;
  }
`;

const Section = styled.section`
  padding: 4rem 2.5rem;
  border-bottom: 3px solid #1a1a1a;

  @media (max-width: 767px) {
    padding: 2.5rem 1rem;
  }
`;

const SectionTitle = styled.h2`
  font-family: 'Georgia', serif;
  font-size: 3.5rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.03em;
  margin-bottom: 2.5rem;
  line-height: 1;

  span {
    font-family: 'Courier New', monospace;
    font-size: 1rem;
    font-weight: 400;
    text-transform: none;
    letter-spacing: 0;
    display: block;
    margin-top: 0.5rem;
    color: #666;
  }

  @media (max-width: 767px) {
    font-size: 2.25rem;
  }
`;

const CarsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  border: 3px solid #1a1a1a;

  @media (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const CarCard = styled.div`
  border-right: 3px solid #1a1a1a;
  border-bottom: 3px solid #1a1a1a;
  background: #fffbe6;
  overflow: hidden;
  transition: background 0.2s;

  &:nth-child(3n) {
    border-right: none;
  }
  &:nth-child(n + 4) {
    border-bottom: none;
  }

  @media (max-width: 1023px) {
    &:nth-child(3n) { border-right: 3px solid #1a1a1a; }
    &:nth-child(2n) { border-right: none; }
    &:nth-child(n + 4) { border-bottom: 3px solid #1a1a1a; }
    &:nth-child(n + 5) { border-bottom: none; }
  }

  @media (max-width: 767px) {
    border-right: none !important;
    border-bottom: 3px solid #1a1a1a !important;
    &:last-child { border-bottom: none !important; }
  }

  &:hover {
    background: #fff4b8;
  }
`;

const CarImg = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 3px solid #1a1a1a;
  filter: grayscale(30%) contrast(1.1);
  transition: filter 0.3s;
  ${CarCard}:hover & {
    filter: grayscale(0%) contrast(1);
  }
`;

const CarBody = styled.div`
  padding: 1.25rem;
`;

const CarTag = styled.span`
  display: inline-block;
  font-size: 0.65rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 0.25rem 0.6rem;
  background: ${({ children }) =>
    children === "Od ręki" ? "#ff5733" : "#1a1a1a"};
  color: #fffbe6;
  margin-bottom: 0.75rem;
`;

const CarBrand = styled.span`
  display: block;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #888;
`;

const CarModel = styled.h3`
  font-family: 'Georgia', serif;
  font-size: 1.25rem;
  font-weight: 900;
  text-transform: uppercase;
  line-height: 1.1;
  margin-top: 0.2rem;
`;

const CarMeta = styled.div`
  font-size: 0.8rem;
  color: #666;
  margin-top: 0.5rem;
`;

const CarPrice = styled.div`
  font-size: 1.4rem;
  font-weight: 900;
  font-family: 'Georgia', serif;
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 2px dashed #1a1a1a;
`;

const CarCta = styled.a`
  display: block;
  text-align: center;
  margin-top: 1rem;
  padding: 0.6rem;
  font-size: 0.75rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  background: #1a1a1a;
  color: #fffbe6;
  border: 2px solid #1a1a1a;
  cursor: pointer;
  transition: all 0.1s;
  font-family: 'Courier New', monospace;
  &:hover {
    background: #ff5733;
    border-color: #ff5733;
  }
`;

const StepsSection = styled.section`
  padding: 4rem 2.5rem;
  background: #1a1a1a;
  color: #fffbe6;
  border-bottom: 3px solid #1a1a1a;

  @media (max-width: 767px) {
    padding: 2.5rem 1rem;
  }
`;

const StepsTitle = styled.h2`
  font-family: 'Georgia', serif;
  font-size: 3.5rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.03em;
  margin-bottom: 3rem;
  line-height: 1;

  span {
    color: #ff5733;
  }

  @media (max-width: 767px) {
    font-size: 2.25rem;
    margin-bottom: 2rem;
  }
`;

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  border: 3px solid #fffbe6;

  @media (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const StepCard = styled.div`
  padding: 2rem;
  border-right: 3px solid #fffbe6;
  position: relative;

  &:last-child {
    border-right: none;
  }

  @media (max-width: 1023px) {
    &:nth-child(2n) { border-right: none; }
    &:nth-child(-n+2) { border-bottom: 3px solid #fffbe6; }
  }
  @media (max-width: 767px) {
    border-right: none !important;
    border-bottom: 3px solid #fffbe6;
    &:last-child { border-bottom: none; }
  }
`;

const StepNum = styled.div`
  font-family: 'Georgia', serif;
  font-size: 5rem;
  font-weight: 900;
  color: #ff5733;
  line-height: 1;
  margin-bottom: 0.75rem;
  letter-spacing: -0.05em;

  @media (max-width: 767px) {
    font-size: 3.5rem;
  }
`;

const StepTitle = styled.h3`
  font-size: 1rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
`;

const StepDesc = styled.p`
  font-size: 0.85rem;
  line-height: 1.6;
  color: rgba(255, 251, 230, 0.5);
`;

const FooterWrap = styled.footer`
  padding: 3rem 2.5rem;
  background: #fffbe6;
  border-bottom: 3px solid #1a1a1a;

  @media (max-width: 767px) {
    padding: 2rem 1rem;
  }
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 2rem;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const FooterLogo = styled.div`
  font-family: 'Georgia', serif;
  font-size: 1.5rem;
  font-weight: 900;
  text-transform: uppercase;
  margin-bottom: 1rem;
  span {
    background: #ff5733;
    color: #fffbe6;
    padding: 0 0.2rem;
  }
`;

const FooterDesc = styled.p`
  font-size: 0.85rem;
  line-height: 1.7;
  color: #666;
  max-width: 320px;
`;

const FooterHeading = styled.h4`
  font-size: 0.7rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #1a1a1a;
`;

const FooterLink = styled.a`
  display: block;
  font-size: 0.85rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.6rem;
  cursor: pointer;
  transition: color 0.15s;
  &:hover {
    color: #ff5733;
  }
`;

const FooterBottom = styled.div`
  padding: 1rem 2.5rem;
  background: #1a1a1a;
  color: #fffbe6;
  text-align: center;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;

  @media (max-width: 767px) {
    padding: 1rem;
  }
`;

const marqueeText =
  "STOIMY PO STRONIE KUPUJĄCEGO \u00B7 WERYFIKACJA \u00B7 TRANSPARENTNOŚĆ \u00B7 BEZ KOMPROMISÓW \u00B7 ";

export default function Layout04() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <GlobalStyle />
      <Nav>
        <Logo>
          CAR<span>MENTOR</span>
        </Logo>
        <NavLinks $open={menuOpen}>
          <NavLink href="#stock">Auta od ręki</NavLink>
          <NavLink href="#broker">Na zamówienie</NavLink>
          <NavLink href="#process">Proces</NavLink>
          <NavLink href="#contact">Kontakt</NavLink>
          <NavCta href="#contact">Zadzwoń</NavCta>
        </NavLinks>
        <Hamburger onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "×" : "="}
        </Hamburger>
      </Nav>

      <HeroSection>
        <HeroMarquee>
          <span>
            {marqueeText.repeat(6)}
          </span>
        </HeroMarquee>
        <HeroTitle>
          Kupujesz auto? <span>My je sprawdzimy.</span>
        </HeroTitle>
        <HeroSub>
          Butikowa marka sprzedaży aut. Weryfikujemy, odradzamy złe zakupy
          i pomagamy znaleźć auto, które naprawdę warto kupić.
        </HeroSub>
        <HeroActions>
          <BtnPrimary href="#stock">Zobacz auta od ręki</BtnPrimary>
          <BtnSecondary href="#broker">Znajdź mi auto</BtnSecondary>
        </HeroActions>
      </HeroSection>

      <SectionDivider>Sekcja / Stock / Auta gotowe do odbioru</SectionDivider>

      <Section id="stock">
        <SectionTitle>
          TOP PICKS
          <span>— 6 sprawdzonych aut gotowych do odbioru od ręki</span>
        </SectionTitle>
        <CarsGrid>
          {CARS.map((car) => (
            <CarCard key={car.id}>
              <CarImg src={car.img} alt={`${car.brand} ${car.model}`} />
              <CarBody>
                <CarTag>{car.tag}</CarTag>
                <CarBrand>{car.brand}</CarBrand>
                <CarModel>{car.model}</CarModel>
                <CarMeta>
                  {car.year} / {car.mileage}
                </CarMeta>
                <CarPrice>{car.price}</CarPrice>
                <CarCta href="#contact">Zapytaj o to auto →</CarCta>
              </CarBody>
            </CarCard>
          ))}
        </CarsGrid>
      </Section>

      <SectionDivider>Sekcja / Proces / Jak to działa</SectionDivider>

      <StepsSection id="process">
        <StepsTitle>
          JAK <span>DZIAŁAMY</span>
        </StepsTitle>
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

      <FooterWrap id="contact">
        <FooterGrid>
          <div>
            <FooterLogo>
              CAR<span>MENTOR</span>
            </FooterLogo>
            <FooterDesc>
              Butikowa marka sprzedaży aut i usług okołozakupowych.
              Stoimy po stronie kupującego — transparentnie i bez kompromisów.
            </FooterDesc>
          </div>
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
        </FooterGrid>
      </FooterWrap>

      <FooterBottom>
        © {new Date().getFullYear()} CARMENTOR. WSZELKIE PRAWA ZASTRZEŻONE.
      </FooterBottom>
    </>
  );
}
