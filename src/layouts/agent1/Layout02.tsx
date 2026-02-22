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
    font-family: -apple-system, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
    background: #ffffff;
    color: #1a1a2e;
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
  padding: 1rem 6rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid #f0f0f0;

  @media (max-width: 1023px) {
    padding: 1rem 2.5rem;
  }
  @media (max-width: 767px) {
    padding: 1rem 1.5rem;
  }
`;

const Logo = styled.div`
  font-size: 1.35rem;
  font-weight: 700;
  color: #1a1a2e;
  span {
    color: #4a7c59;
  }
`;

const NavLinks = styled.div<{ $open: boolean }>`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 767px) {
    display: ${({ $open }) => ($open ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #fff;
    padding: 1.5rem;
    gap: 1.25rem;
    border-bottom: 1px solid #f0f0f0;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
  }
`;

const NavLink = styled.a`
  font-size: 0.9rem;
  font-weight: 500;
  color: #666;
  transition: color 0.2s;
  cursor: pointer;
  &:hover {
    color: #1a1a2e;
  }
`;

const NavCta = styled.a`
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.6rem 1.5rem;
  background: #4a7c59;
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #3d6a4b;
  }
`;

const Hamburger = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #1a1a2e;
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
  padding: 8rem 6rem 6rem;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1023px) {
    padding: 7rem 2.5rem 4rem;
  }
  @media (max-width: 767px) {
    padding: 6rem 1.5rem 3rem;
    min-height: auto;
  }
`;

const HeroTitle = styled.h1`
  font-size: 4.5rem;
  font-weight: 800;
  line-height: 1.08;
  color: #1a1a2e;
  max-width: 700px;
  letter-spacing: -0.03em;

  span {
    color: #4a7c59;
  }

  @media (max-width: 1023px) {
    font-size: 3.25rem;
  }
  @media (max-width: 767px) {
    font-size: 2.25rem;
  }
`;

const HeroSub = styled.p`
  font-size: 1.2rem;
  line-height: 1.7;
  color: #666;
  max-width: 480px;
  margin-top: 1.5rem;

  @media (max-width: 767px) {
    font-size: 1.05rem;
  }
`;

const HeroActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2.5rem;
  flex-wrap: wrap;
`;

const BtnPrimary = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 0.9rem 2rem;
  background: #4a7c59;
  color: #fff;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background: #3d6a4b;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(74, 124, 89, 0.25);
  }
`;

const BtnSecondary = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 0.9rem 2rem;
  background: #f5f5f5;
  color: #1a1a2e;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background: #eee;
  }
`;

const Section = styled.section`
  padding: 5rem 6rem;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1023px) {
    padding: 4rem 2.5rem;
  }
  @media (max-width: 767px) {
    padding: 3rem 1.5rem;
  }
`;

const SectionHeader = styled.div`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  color: #1a1a2e;
  letter-spacing: -0.02em;

  @media (max-width: 767px) {
    font-size: 1.75rem;
  }
`;

const SectionSub = styled.p`
  font-size: 1.05rem;
  color: #888;
  margin-top: 0.5rem;
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
    gap: 1.25rem;
  }
`;

const CarCard = styled.div`
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #f0f0f0;
  transition: all 0.25s;
  &:hover {
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
    transform: translateY(-4px);
  }
`;

const CarImg = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CarBody = styled.div`
  padding: 1.25rem;
`;

const CarTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
`;

const CarName = styled.h3`
  font-size: 1.05rem;
  font-weight: 700;
  color: #1a1a2e;
`;

const CarTag = styled.span`
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.25rem 0.6rem;
  background: ${({ children }) =>
    children === "Od ręki" ? "#e8f5e9" : "#e3f2fd"};
  color: ${({ children }) =>
    children === "Od ręki" ? "#2e7d32" : "#1565c0"};
  border-radius: 6px;
  white-space: nowrap;
`;

const CarMeta = styled.p`
  font-size: 0.85rem;
  color: #999;
`;

const CarBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #f5f5f5;
`;

const CarPrice = styled.span`
  font-size: 1.2rem;
  font-weight: 800;
  color: #1a1a2e;
`;

const CarCta = styled.a`
  font-size: 0.8rem;
  font-weight: 600;
  color: #4a7c59;
  cursor: pointer;
  transition: opacity 0.2s;
  &:hover {
    opacity: 0.7;
  }
`;

const StepsSection = styled.section`
  padding: 5rem 6rem;
  background: #fafafa;

  @media (max-width: 1023px) {
    padding: 4rem 2.5rem;
  }
  @media (max-width: 767px) {
    padding: 3rem 1.5rem;
  }
`;

const StepsInner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
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
  background: #fff;
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid #f0f0f0;
`;

const StepNum = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e8f5e9;
  color: #4a7c59;
  font-weight: 800;
  font-size: 1rem;
  border-radius: 12px;
  margin-bottom: 1.25rem;
`;

const StepTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 0.5rem;
`;

const StepDesc = styled.p`
  font-size: 0.9rem;
  line-height: 1.6;
  color: #888;
`;

const FooterWrap = styled.footer`
  background: #1a1a2e;
  color: #fff;
  padding: 4rem 6rem 2rem;

  @media (max-width: 1023px) {
    padding: 3rem 2.5rem 2rem;
  }
  @media (max-width: 767px) {
    padding: 3rem 1.5rem 2rem;
  }
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 3rem;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FooterLogo = styled.div`
  font-size: 1.35rem;
  font-weight: 700;
  margin-bottom: 1rem;
  span {
    color: #4a7c59;
  }
`;

const FooterDesc = styled.p`
  font-size: 0.9rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.5);
  max-width: 320px;
`;

const FooterHeading = styled.h4`
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 1.25rem;
`;

const FooterLink = styled.a`
  display: block;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 0.75rem;
  cursor: pointer;
  transition: color 0.2s;
  &:hover {
    color: #fff;
  }
`;

const FooterBottom = styled.div`
  max-width: 1400px;
  margin: 3rem auto 0;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  text-align: center;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.3);
`;

export default function Layout02() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <GlobalStyle />
      <Nav>
        <Logo>
          Car<span>Mentor</span>
        </Logo>
        <NavLinks $open={menuOpen}>
          <NavLink href="#stock">Auta od ręki</NavLink>
          <NavLink href="#broker">Auto na zamówienie</NavLink>
          <NavLink href="#process">Jak działamy</NavLink>
          <NavLink href="#contact">Kontakt</NavLink>
          <NavCta href="#contact">Porozmawiajmy</NavCta>
        </NavLinks>
        <Hamburger onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✕" : "☰"}
        </Hamburger>
      </Nav>

      <HeroSection>
        <HeroTitle>
          Kupujesz auto?
          <br />
          <span>My je sprawdzimy.</span>
        </HeroTitle>
        <HeroSub>
          Stoimy po stronie kupującego. Weryfikujemy historię, sprawdzamy stan
          i odradzamy złe zakupy. Bez kompromisów.
        </HeroSub>
        <HeroActions>
          <BtnPrimary href="#stock">Zobacz auta od ręki</BtnPrimary>
          <BtnSecondary href="#broker">Znajdź mi auto</BtnSecondary>
        </HeroActions>
      </HeroSection>

      <Section id="stock">
        <SectionHeader>
          <SectionTitle>Auta od ręki</SectionTitle>
          <SectionSub>
            Sprawdzone, gotowe do odbioru. Każde przeszło naszą weryfikację.
          </SectionSub>
        </SectionHeader>
        <CarsGrid>
          {CARS.map((car) => (
            <CarCard key={car.id}>
              <CarImg src={car.img} alt={`${car.brand} ${car.model}`} />
              <CarBody>
                <CarTop>
                  <CarName>
                    {car.brand} {car.model}
                  </CarName>
                  <CarTag>{car.tag}</CarTag>
                </CarTop>
                <CarMeta>
                  {car.year} · {car.mileage}
                </CarMeta>
                <CarBottom>
                  <CarPrice>{car.price}</CarPrice>
                  <CarCta href="#contact">Zapytaj o to auto →</CarCta>
                </CarBottom>
              </CarBody>
            </CarCard>
          ))}
        </CarsGrid>
      </Section>

      <StepsSection id="process">
        <StepsInner>
          <SectionHeader>
            <SectionTitle>Jak działamy</SectionTitle>
            <SectionSub>Prosty proces w czterech krokach.</SectionSub>
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
        </StepsInner>
      </StepsSection>

      <FooterWrap id="contact">
        <FooterGrid>
          <div>
            <FooterLogo>
              Car<span>Mentor</span>
            </FooterLogo>
            <FooterDesc>
              Butikowa marka sprzedaży aut i usług okołozakupowych.
              Stoimy po stronie kupującego.
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
            <FooterLink href="mailto:kontakt@carmentor.pl">
              kontakt@carmentor.pl
            </FooterLink>
            <FooterLink href="https://wa.me/48123456789">WhatsApp</FooterLink>
          </div>
        </FooterGrid>
        <FooterBottom>
          © {new Date().getFullYear()} CarMentor. Wszelkie prawa zastrzeżone.
        </FooterBottom>
      </FooterWrap>
    </>
  );
}
