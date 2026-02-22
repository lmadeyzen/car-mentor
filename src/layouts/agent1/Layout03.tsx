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
    font-family: 'Inter', -apple-system, 'Segoe UI', sans-serif;
    background: #f8f7f4;
    color: #0d1b2a;
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
  padding: 1.25rem 3rem;
  background: #0d1b2a;
  color: #fff;

  @media (max-width: 1023px) {
    padding: 1rem 2rem;
  }
  @media (max-width: 767px) {
    padding: 1rem 1.25rem;
  }
`;

const Logo = styled.div`
  font-size: 1.4rem;
  font-weight: 900;
  letter-spacing: -0.02em;
  color: #fff;
  span {
    color: #00e676;
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
    background: #0d1b2a;
    padding: 2rem;
    gap: 1.25rem;
  }
`;

const NavLink = styled.a`
  font-size: 0.85rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
  transition: color 0.2s;
  cursor: pointer;
  &:hover {
    color: #00e676;
  }
`;

const NavCta = styled.a`
  font-size: 0.85rem;
  font-weight: 700;
  padding: 0.6rem 1.5rem;
  background: #00e676;
  color: #0d1b2a;
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background: #00c853;
    transform: scale(1.03);
  }
`;

const Hamburger = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #fff;
  cursor: pointer;
  @media (max-width: 767px) {
    display: block;
  }
`;

const HeroSection = styled.section`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: #0d1b2a;
  overflow: hidden;

  @media (max-width: 1023px) {
    grid-template-columns: 1fr;
    min-height: auto;
  }
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 8rem 4rem 4rem;

  @media (max-width: 1023px) {
    padding: 7rem 2.5rem 3rem;
  }
  @media (max-width: 767px) {
    padding: 6rem 1.25rem 2.5rem;
  }
`;

const HeroBadge = styled.span`
  display: inline-block;
  width: fit-content;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 0.4rem 1rem;
  background: rgba(0, 230, 118, 0.1);
  color: #00e676;
  border-radius: 100px;
  border: 1px solid rgba(0, 230, 118, 0.2);
  margin-bottom: 2rem;
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  font-weight: 900;
  line-height: 1.05;
  color: #fff;
  letter-spacing: -0.03em;

  span {
    display: block;
    background: linear-gradient(135deg, #00e676, #69f0ae);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @media (max-width: 1023px) {
    font-size: 3rem;
  }
  @media (max-width: 767px) {
    font-size: 2.25rem;
  }
`;

const HeroSub = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.5);
  max-width: 420px;
  margin-top: 1.5rem;
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
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: #00e676;
  color: #0d1b2a;
  font-size: 0.95rem;
  font-weight: 700;
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.25s;
  &:hover {
    background: #00c853;
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0, 230, 118, 0.3);
  }
`;

const BtnSecondary = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border: 2px solid rgba(255, 255, 255, 0.15);
  color: #fff;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.25s;
  &:hover {
    border-color: rgba(255, 255, 255, 0.4);
    background: rgba(255, 255, 255, 0.05);
  }
`;

const HeroVisual = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0d1b2a, #1b2838);
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(0, 230, 118, 0.08) 0%, transparent 70%);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  @media (max-width: 1023px) {
    min-height: 300px;
  }
`;

const HeroStats = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  padding: 3rem;

  @media (max-width: 767px) {
    padding: 2rem;
    gap: 1rem;
  }
`;

const StatBox = styled.div`
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  text-align: center;
`;

const StatNum = styled.div`
  font-size: 2.5rem;
  font-weight: 900;
  color: #00e676;
  letter-spacing: -0.03em;

  @media (max-width: 767px) {
    font-size: 1.75rem;
  }
`;

const StatLabel = styled.div`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.4);
  margin-top: 0.25rem;
`;

const Section = styled.section`
  padding: 6rem 3rem;

  @media (max-width: 1023px) {
    padding: 5rem 2rem;
  }
  @media (max-width: 767px) {
    padding: 3.5rem 1.25rem;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  font-weight: 900;
  color: #0d1b2a;
  letter-spacing: -0.03em;
  line-height: 1.1;

  @media (max-width: 767px) {
    font-size: 2rem;
  }
`;

const SectionTag = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #00c853;
  padding: 0.4rem 1rem;
  background: rgba(0, 200, 83, 0.08);
  border-radius: 100px;
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
  }
`;

const CarCard = styled.div`
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 50px rgba(13, 27, 42, 0.12);
  }
`;

const CarImgWrap = styled.div`
  position: relative;
  overflow: hidden;
`;

const CarImg = styled.img`
  width: 100%;
  height: 210px;
  object-fit: cover;
  transition: transform 0.4s;
  ${CarCard}:hover & {
    transform: scale(1.05);
  }
`;

const CarTagBadge = styled.span`
  position: absolute;
  top: 1rem;
  left: 1rem;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.35rem 0.85rem;
  border-radius: 100px;
  background: ${({ children }) =>
    children === "Od ręki" ? "#00e676" : "#fff"};
  color: ${({ children }) =>
    children === "Od ręki" ? "#0d1b2a" : "#0d1b2a"};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

const CarBody = styled.div`
  padding: 1.25rem 1.5rem 1.5rem;
`;

const CarBrand = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #00c853;
`;

const CarModel = styled.h3`
  font-size: 1.15rem;
  font-weight: 800;
  color: #0d1b2a;
  margin-top: 0.25rem;
`;

const CarMeta = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: #999;
`;

const CarFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.25rem;
  padding-top: 1.25rem;
  border-top: 2px solid #f5f4f1;
`;

const CarPrice = styled.span`
  font-size: 1.3rem;
  font-weight: 900;
  color: #0d1b2a;
  letter-spacing: -0.02em;
`;

const CarCta = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1.25rem;
  font-size: 0.78rem;
  font-weight: 700;
  background: #0d1b2a;
  color: #fff;
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background: #1b2838;
    transform: scale(1.04);
  }
`;

const StepsSection = styled.section`
  padding: 6rem 3rem;
  background: #0d1b2a;
  color: #fff;

  @media (max-width: 1023px) {
    padding: 5rem 2rem;
  }
  @media (max-width: 767px) {
    padding: 3.5rem 1.25rem;
  }
`;

const StepsTitle = styled.h2`
  font-size: 3rem;
  font-weight: 900;
  letter-spacing: -0.03em;
  text-align: center;
  margin-bottom: 1rem;

  span {
    color: #00e676;
  }

  @media (max-width: 767px) {
    font-size: 2rem;
  }
`;

const StepsSub = styled.p`
  text-align: center;
  font-size: 1.05rem;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 4rem;
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
  }
`;

const StepCard = styled.div`
  position: relative;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 20px;
  transition: all 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(0, 230, 118, 0.2);
  }
`;

const StepNum = styled.div`
  font-size: 4rem;
  font-weight: 900;
  color: rgba(0, 230, 118, 0.15);
  line-height: 1;
  margin-bottom: 1rem;
  letter-spacing: -0.05em;
`;

const StepTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
`;

const StepDesc = styled.p`
  font-size: 0.9rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.4);
`;

const FooterWrap = styled.footer`
  padding: 4rem 3rem 2rem;
  background: #0a1520;
  color: #fff;

  @media (max-width: 1023px) {
    padding: 3rem 2rem 2rem;
  }
  @media (max-width: 767px) {
    padding: 3rem 1.25rem 2rem;
  }
`;

const FooterTop = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 3rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FooterLogo = styled.div`
  font-size: 1.5rem;
  font-weight: 900;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
  span {
    color: #00e676;
  }
`;

const FooterDesc = styled.p`
  font-size: 0.9rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.35);
  max-width: 340px;
`;

const FooterHeading = styled.h4`
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #00e676;
  margin-bottom: 1.25rem;
`;

const FooterLink = styled.a`
  display: block;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 0.75rem;
  cursor: pointer;
  transition: color 0.2s;
  &:hover {
    color: #00e676;
  }
`;

const FooterBottom = styled.div`
  padding-top: 2rem;
  text-align: center;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.2);
`;

export default function Layout03() {
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
          <NavCta href="#contact">Napisz do nas</NavCta>
        </NavLinks>
        <Hamburger onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✕" : "☰"}
        </Hamburger>
      </Nav>

      <HeroSection>
        <HeroContent>
          <HeroBadge>Butikowa sprzedaż aut</HeroBadge>
          <HeroTitle>
            Twoje kolejne auto,
            <span>bez ryzyka.</span>
          </HeroTitle>
          <HeroSub>
            Stoimy po stronie kupującego. Weryfikujemy historię, sprawdzamy
            stan i odradzamy złe zakupy — transparentnie i bez kompromisów.
          </HeroSub>
          <HeroActions>
            <BtnPrimary href="#stock">Zobacz auta od ręki</BtnPrimary>
            <BtnSecondary href="#broker">Znajdź mi auto</BtnSecondary>
          </HeroActions>
        </HeroContent>
        <HeroVisual>
          <HeroStats>
            <StatBox>
              <StatNum>500+</StatNum>
              <StatLabel>Sprawdzonych aut</StatLabel>
            </StatBox>
            <StatBox>
              <StatNum>98%</StatNum>
              <StatLabel>Zadowolonych klientów</StatLabel>
            </StatBox>
            <StatBox>
              <StatNum>150+</StatNum>
              <StatLabel>Odradzonych zakupów</StatLabel>
            </StatBox>
            <StatBox>
              <StatNum>7 lat</StatNum>
              <StatLabel>Doświadczenia</StatLabel>
            </StatBox>
          </HeroStats>
        </HeroVisual>
      </HeroSection>

      <Section id="stock">
        <SectionHeader>
          <SectionTitle>
            Auta od ręki
          </SectionTitle>
          <SectionTag>W naszym stocku</SectionTag>
        </SectionHeader>
        <CarsGrid>
          {CARS.map((car) => (
            <CarCard key={car.id}>
              <CarImgWrap>
                <CarImg src={car.img} alt={`${car.brand} ${car.model}`} />
                <CarTagBadge>{car.tag}</CarTagBadge>
              </CarImgWrap>
              <CarBody>
                <CarBrand>{car.brand}</CarBrand>
                <CarModel>{car.model}</CarModel>
                <CarMeta>
                  <span>{car.year}</span>
                  <span>{car.mileage}</span>
                </CarMeta>
                <CarFooter>
                  <CarPrice>{car.price}</CarPrice>
                  <CarCta href="#contact">Zapytaj</CarCta>
                </CarFooter>
              </CarBody>
            </CarCard>
          ))}
        </CarsGrid>
      </Section>

      <StepsSection id="process">
        <StepsTitle>
          Jak <span>działamy</span>
        </StepsTitle>
        <StepsSub>Cztery proste kroki do Twojego wymarzonego auta.</StepsSub>
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
        <FooterTop>
          <div>
            <FooterLogo>
              Car<span>Mentor</span>
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
            <FooterLink href="mailto:kontakt@carmentor.pl">
              kontakt@carmentor.pl
            </FooterLink>
            <FooterLink href="https://wa.me/48123456789">WhatsApp</FooterLink>
          </div>
        </FooterTop>
        <FooterBottom>
          © {new Date().getFullYear()} CarMentor. Wszelkie prawa zastrzeżone.
        </FooterBottom>
      </FooterWrap>
    </>
  );
}
