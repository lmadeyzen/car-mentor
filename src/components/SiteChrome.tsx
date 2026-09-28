import { useState, useCallback, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import logo from "../assets/logo.png";
import {
  ACCENT_COLOR_DARK,
  accent,
  accentSoft,
  border,
  borderStrong,
  pick,
  surfaceMuted,
  textBody,
  textStrong,
  type ThemeProps,
} from "../theme";
import { Icon } from "./ui";

const NAV_LINKS = [
  { to: "/#stock", label: "Oferta", match: "/samochod" },
  { to: "/jak-dzialamy", label: "Jak działamy", match: "/jak-dzialamy" },
  { to: "/kontakt", label: "Kontakt", match: "/kontakt" },
];

const Nav = styled.nav<ThemeProps>`
  position: sticky;
  top: 0;
  z-index: 20;
  background: ${pick("rgba(11, 17, 15, 0.78)", "rgba(243, 245, 244, 0.8)")};
  backdrop-filter: saturate(160%) blur(14px);
  border-bottom: 1px solid ${border};
`;

const NavInner = styled.section`
  width: min(1280px, calc(100% - 48px));
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 0;

  @media (max-width: 767px) {
    width: calc(100% - 28px);
    padding: 12px 0;
  }
`;

const LogoImage = styled.img`
  display: block;
  width: 180px;
  height: auto;

  @media (max-width: 900px) {
    width: 150px;
  }

  @media (max-width: 400px) {
    width: 124px;
  }
`;

const NavLinks = styled.div<ThemeProps>`
  display: flex;
  gap: 4px;
  padding: 4px;
  border-radius: 999px;
  border: 1px solid ${border};
  background: ${pick("rgba(255, 255, 255, 0.03)", "rgba(255, 255, 255, 0.7)")};

  @media (max-width: 767px) {
    display: none;
  }
`;

const NavLink = styled(Link)<ThemeProps & { $active: boolean }>`
  padding: 9px 18px;
  border-radius: 999px;
  font-size: 0.93rem;
  font-weight: 600;
  color: ${({ $active, $isDark }) => ($active ? accent({ $isDark }) : textBody({ $isDark }))};
  background: ${({ $active, $isDark }) => ($active ? accentSoft({ $isDark }) : "transparent")};

  &:hover {
    color: ${textStrong};
  }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`;

const ThemeButton = styled.button<ThemeProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 42px;
  border-radius: 999px;
  padding: 0 16px;
  font: inherit;
  font-size: 0.86rem;
  font-weight: 700;
  border: 1px solid ${borderStrong};
  color: ${textStrong};
  background: transparent;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: ${surfaceMuted};
  }

  @media (max-width: 767px) {
    width: 42px;
    padding: 0;

    span {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip: rect(0 0 0 0);
    }
  }
`;

const MobileMenuButton = styled.button<ThemeProps>`
  display: none;
  align-items: center;
  gap: 8px;
  min-height: 42px;
  border: none;
  background: ${accent};
  color: ${pick("#08130f", "#ffffff")};
  border-radius: 999px;
  padding: 0 16px;
  font: inherit;
  font-size: 0.86rem;
  font-weight: 700;
  cursor: pointer;

  @media (max-width: 767px) {
    display: inline-flex;
  }
`;

const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
`;

const MobileMenuOverlay = styled.div<ThemeProps>`
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
    padding: 10px 14px 18px;
    background: ${pick("rgba(11, 17, 15, 0.97)", "rgba(243, 245, 244, 0.98)")};
    border-bottom: 1px solid ${border};
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.12);
    animation: ${slideDown} 0.2s ease-out;

    a {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 18px;
      border-radius: 14px;
      font-size: 1.05rem;
      font-weight: 700;
      color: ${textStrong};
      transition: background 0.15s;

      &::after {
        content: "→";
        color: ${accent};
      }

      &:hover,
      &:active {
        background: ${surfaceMuted};
      }
    }
  }
`;

const Footer = styled.footer<ThemeProps>`
  margin-top: 40px;
  background: ${pick("#0f1714", "#062a20")};
  color: #d7e4df;
  padding: 64px 0 32px;
`;

const FooterGrid = styled.section`
  width: min(1280px, calc(100% - 48px));
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr;
  gap: 40px;

  @media (max-width: 767px) {
    width: calc(100% - 28px);
    grid-template-columns: 1fr;
    gap: 28px;
  }
`;

const FooterBrand = styled.p`
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #ffffff;
  margin-bottom: 14px;
`;

const FooterTitle = styled.p`
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin-bottom: 16px;
  color: ${ACCENT_COLOR_DARK};
`;

const FooterText = styled.p`
  color: rgba(215, 228, 223, 0.72);
  line-height: 1.7;
  max-width: 52ch;
`;

const FooterList = styled.ul`
  list-style: none;
  display: grid;
  gap: 12px;
  color: #e4eeea;

  li {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  svg {
    color: ${ACCENT_COLOR_DARK};
  }

  a:hover {
    color: ${ACCENT_COLOR_DARK};
  }
`;

const FooterBottom = styled.div`
  width: min(1280px, calc(100% - 48px));
  margin: 48px auto 0;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 767px) {
    width: calc(100% - 28px);
  }
`;

const Copyright = styled.p`
  color: rgba(215, 228, 223, 0.55);
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
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              $isDark={isDarkMode}
              $active={location.pathname.startsWith(link.match)}
            >
              {link.label}
            </NavLink>
          ))}
        </NavLinks>
        <NavActions>
          <ThemeButton
            type="button"
            $isDark={isDarkMode}
            onClick={onToggleTheme}
          >
            {isDarkMode ? (
              <Icon size={16}>
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </Icon>
            ) : (
              <Icon size={16}>
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
              </Icon>
            )}
            <span>{isDarkMode ? "Tryb jasny" : "Tryb ciemny"}</span>
          </ThemeButton>
          <MobileMenuButton $isDark={isDarkMode} onClick={toggle}>
            <Icon size={16}>
              {mobileOpen ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </Icon>
            {mobileOpen ? "Zamknij" : "Menu"}
          </MobileMenuButton>
        </NavActions>
      </NavInner>
      {mobileOpen && (
        <MobileMenuOverlay $isDark={isDarkMode}>
          {NAV_LINKS.map((link) => (
            <Link key={link.to} to={link.to}>
              {link.label}
            </Link>
          ))}
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
          <FooterBrand>CarMentor</FooterBrand>
          <FooterText>
            Stawiamy na bezpieczeństwo zakupu i przejrzyste zasady. Weryfikujemy
            samochód, pokazujemy fakty i jasno mówimy, czy to dobry wybór.
            CarMentor Prowadzimy Cię przez cały proces - od wyboru po
            finalizację, spokojnie i bez ryzyka.
          </FooterText>
        </div>
        <div>
          <FooterTitle>Sekcje</FooterTitle>
          <FooterList>
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </FooterList>
        </div>
        <div>
          <FooterTitle>Kontakt</FooterTitle>
          <FooterList>
            <li>
              <Icon size={16}>
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
              </Icon>
              +48 660 488 900
            </li>
            <li>
              <Icon size={16}>
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </Icon>
              kontakt@carmentor.pl
            </li>
            <li>
              <Icon size={16}>
                <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.4A8.4 8.4 0 1 1 21 11.5z" />
              </Icon>
              WhatsApp: +48 660 488 900
            </li>
          </FooterList>
        </div>
      </FooterGrid>
      <FooterBottom>
        <Copyright>© 2026 CarMentor. Wszelkie prawa zastrzeżone.</Copyright>
      </FooterBottom>
    </Footer>
  );
}
