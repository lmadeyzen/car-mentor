import { useState, useCallback, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import logo from "../assets/logo.png";

const ACCENT_COLOR = "#00573F";
const ACCENT_COLOR_DARK = "#33c39b";

const Nav = styled.nav<{ $isDark: boolean }>`
  position: sticky;
  top: 0;
  z-index: 20;
  background: ${({ $isDark }) =>
    $isDark ? "rgba(16, 24, 21, 0.94)" : "rgba(245, 245, 245, 0.94)"};
  backdrop-filter: blur(8px);
  border-bottom: 1px solid ${({ $isDark }) => ($isDark ? "#2d3a36" : "#dedede")};
`;

const NavInner = styled.section`
  width: min(1200px, calc(100% - 48px));
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 0;

  @media (max-width: 767px) {
    width: calc(100% - 28px);
  }
`;

const LogoImage = styled.img`
  display: block;
  width: 210px;
  height: auto;

  @media (max-width: 1400px) {
    width: 180px;
  }

  @media (max-width: 900px) {
    width: 155px;
  }

  @media (max-width: 400px) {
    width: 130px;
  }
`;

const NavLinks = styled.div<{ $isDark: boolean }>`
  display: flex;
  gap: 30px;
  color: ${({ $isDark }) => ($isDark ? "#c5d0cc" : "#3a3a3a")};
  font-weight: 500;

  a:hover {
    color: ${({ $isDark }) => ($isDark ? ACCENT_COLOR_DARK : ACCENT_COLOR)};
  }

  @media (max-width: 1023px) {
    gap: 18px;
    font-size: 0.95rem;
  }

  @media (max-width: 767px) {
    display: none;
  }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;

  @media (max-width: 767px) {
    gap: 8px;
  }
`;

const ThemeButton = styled.button<{ $isDark: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  padding: 11px 14px;
  font-size: 0.85rem;
  font-weight: 700;
  border: 1px solid
    ${({ $isDark }) => ($isDark ? ACCENT_COLOR_DARK : ACCENT_COLOR)};
  color: ${({ $isDark }) => ($isDark ? ACCENT_COLOR_DARK : ACCENT_COLOR)};
  background: ${({ $isDark }) => ($isDark ? "#14211d" : "#eaf6f2")};
  cursor: pointer;
  white-space: nowrap;

  @media (max-width: 767px) {
    padding: 8px 10px;
    font-size: 0.78rem;
    border-radius: 10px;
  }
`;

const MobileMenuButton = styled.button<{ $isDark: boolean }>`
  display: none;
  border: 1px solid ${({ $isDark }) => ($isDark ? "#375149" : "#cbcbcb")};
  background: ${({ $isDark }) => ($isDark ? "#18231f" : "white")};
  border-radius: 10px;
  padding: 8px 12px;
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ $isDark }) => ($isDark ? ACCENT_COLOR_DARK : ACCENT_COLOR)};
  cursor: pointer;

  @media (max-width: 767px) {
    display: block;
  }
`;

const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
`;

const MobileMenuOverlay = styled.div<{ $isDark: boolean }>`
  display: none;

  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
    gap: 4px;
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
    z-index: 30;
    padding: 8px 14px 18px;
    background: ${({ $isDark }) =>
      $isDark ? "rgba(16, 24, 21, 0.97)" : "rgba(245, 245, 245, 0.97)"};
    border-bottom: 1px solid
      ${({ $isDark }) => ($isDark ? "#2d3a36" : "#dedede")};
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    animation: ${slideDown} 0.2s ease-out;

    a {
      display: block;
      padding: 14px 16px;
      border-radius: 10px;
      font-size: 1rem;
      font-weight: 600;
      color: ${({ $isDark }) => ($isDark ? "#c5d0cc" : "#3a3a3a")};
      transition: background 0.15s;

      &:hover,
      &:active {
        background: ${({ $isDark }) => ($isDark ? "#1e2e28" : "#e8e8e8")};
        color: ${({ $isDark }) => ($isDark ? ACCENT_COLOR_DARK : ACCENT_COLOR)};
      }
    }
  }
`;

const Footer = styled.footer<{ $isDark: boolean }>`
  border-top: 1px solid ${({ $isDark }) => ($isDark ? "#2f3f39" : "#d4d4d4")};
  background: ${({ $isDark }) => ($isDark ? "#131a17" : "#f0f0f0")};
  padding: 38px 0;
`;

const FooterGrid = styled.section`
  width: min(1200px, calc(100% - 48px));
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.25fr 1fr 1fr;
  gap: 24px;

  @media (max-width: 767px) {
    width: calc(100% - 28px);
    grid-template-columns: 1fr;
  }
`;

const FooterTitle = styled.p<{ $isDark: boolean }>`
  font-weight: 800;
  margin-bottom: 10px;
  color: ${({ $isDark }) => ($isDark ? ACCENT_COLOR_DARK : ACCENT_COLOR)};
`;

const FooterText = styled.p<{ $isDark: boolean }>`
  color: ${({ $isDark }) => ($isDark ? "#afbab6" : "#595959")};
  line-height: 1.6;
`;

const FooterList = styled.ul<{ $isDark: boolean }>`
  list-style: none;
  display: grid;
  gap: 8px;
  color: ${({ $isDark }) => ($isDark ? "#c2cdc9" : "#3f3f3f")};
`;

const Copyright = styled.p<{ $isDark: boolean }>`
  margin-top: 26px;
  color: ${({ $isDark }) => ($isDark ? "#96a3a0" : "#696969")};
  font-size: 0.84rem;
`;

type ChromeProps = {
  isDarkMode: boolean;
  onToggleTheme: () => void;
};

export function SiteNavigation({ isDarkMode, onToggleTheme }: ChromeProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const toggle = useCallback(() => setMobileOpen((v) => !v), []);

  return (
    <Nav $isDark={isDarkMode}>
      <NavInner>
        <Link to="/">
          <LogoImage src={logo} alt="Car Mentor" />
        </Link>
        <NavLinks $isDark={isDarkMode}>
          <Link to="/#stock">Oferta</Link>
          <Link to="/jak-dzialamy">Jak działamy</Link>
          <Link to="/kontakt">Kontakt</Link>
        </NavLinks>
        <NavActions>
          <ThemeButton
            type="button"
            $isDark={isDarkMode}
            onClick={onToggleTheme}
          >
            {isDarkMode ? "Tryb jasny" : "Tryb ciemny"}
          </ThemeButton>
          <MobileMenuButton $isDark={isDarkMode} onClick={toggle}>
            {mobileOpen ? "Zamknij" : "Menu"}
          </MobileMenuButton>
        </NavActions>
      </NavInner>
      {mobileOpen && (
        <MobileMenuOverlay $isDark={isDarkMode}>
          <Link to="/#stock">Oferta</Link>
          <Link to="/jak-dzialamy">Jak działamy</Link>
          <Link to="/kontakt">Kontakt</Link>
        </MobileMenuOverlay>
      )}
    </Nav>
  );
}

export function SiteFooter({ isDarkMode }: Pick<ChromeProps, "isDarkMode">) {
  return (
    <Footer id="contact" $isDark={isDarkMode}>
      <FooterGrid>
        <div>
          <FooterTitle $isDark={isDarkMode}>CarMentor</FooterTitle>
          <FooterText $isDark={isDarkMode}>
            tawiamy na bezpieczeństwo zakupu i przejrzyste zasady. Weryfikujemy
            samochód, pokazujemy fakty i jasno mówimy, czy to dobry wybór.
            CarMentor Prowadzimy Cię przez cały proces - od wyboru po
            finalizację, spokojnie i bez ryzyka.
          </FooterText>
          <Copyright $isDark={isDarkMode}>
            © 2026 CarMentor. Wszelkie prawa zastrzeżone.
          </Copyright>
        </div>
        <div>
          <FooterTitle $isDark={isDarkMode}>Sekcje</FooterTitle>
          <FooterList $isDark={isDarkMode}>
            <li>
              <Link to="/#stock">Oferta</Link>
            </li>
            <li>
              <Link to="/jak-dzialamy">Jak działamy</Link>
            </li>
            <li>
              <Link to="/kontakt">Kontakt</Link>
            </li>
          </FooterList>
        </div>
        <div>
          <FooterTitle $isDark={isDarkMode}>Kontakt</FooterTitle>
          <FooterList $isDark={isDarkMode}>
            <li>+48 660 488 900</li>
            <li>kontakt@carmentor.pl</li>
            <li>WhatsApp: +48 660 488 900</li>
          </FooterList>
        </div>
      </FooterGrid>
    </Footer>
  );
}
