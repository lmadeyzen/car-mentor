import { Link } from "react-router-dom";
import styled from "styled-components";
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
  width: clamp(155px, 13vw, 210px);
  height: auto;
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
`;

const ThemeButton = styled.button<{ $isDark: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  padding: 11px 14px;
  font-size: 0.85rem;
  font-weight: 700;
  border: 1px solid ${({ $isDark }) => ($isDark ? ACCENT_COLOR_DARK : ACCENT_COLOR)};
  color: ${({ $isDark }) => ($isDark ? ACCENT_COLOR_DARK : ACCENT_COLOR)};
  background: ${({ $isDark }) => ($isDark ? "#14211d" : "#eaf6f2")};
  cursor: pointer;
`;

const MobileMenu = styled.button<{ $isDark: boolean }>`
  display: none;
  border: 1px solid ${({ $isDark }) => ($isDark ? "#375149" : "#cbcbcb")};
  background: ${({ $isDark }) => ($isDark ? "#18231f" : "white")};
  border-radius: 10px;
  padding: 8px 12px;
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ $isDark }) => ($isDark ? ACCENT_COLOR_DARK : ACCENT_COLOR)};

  @media (max-width: 767px) {
    display: block;
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
          <ThemeButton type="button" $isDark={isDarkMode} onClick={onToggleTheme}>
            {isDarkMode ? "Tryb jasny" : "Tryb ciemny"}
          </ThemeButton>
          <MobileMenu $isDark={isDarkMode}>Menu</MobileMenu>
        </NavActions>
      </NavInner>
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
            Butikowe doradztwo zakupowe dla osób, które chcą kupić auto spokojnie i świadomie.
          </FooterText>
          <Copyright $isDark={isDarkMode}>© 2026 CarMentor. Wszelkie prawa zastrzeżone.</Copyright>
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
            <li>+48 600 123 456</li>
            <li>kontakt@carmentor.pl</li>
            <li>WhatsApp: +48 600 123 456</li>
          </FooterList>
        </div>
      </FooterGrid>
    </Footer>
  );
}
