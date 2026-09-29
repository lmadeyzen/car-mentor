import { useEffect, type ReactNode } from "react";
import styled, { css } from "styled-components";
import {
  ACCENT_COLOR,
  accent,
  accentHover,
  accentSoft,
  border,
  borderStrong,
  cardShadow,
  onAccent,
  pick,
  surface,
  surfaceMuted,
  textBody,
  textMuted,
  textStrong,
  type ThemeProps,
} from "../theme";

export const Container = styled.section`
  width: min(1280px, calc(100% - 48px));
  margin: 0 auto;

  @media (max-width: 767px) {
    width: calc(100% - 28px);
  }
`;

export const Card = styled.article<ThemeProps>`
  background: ${surface};
  border: 1px solid ${border};
  border-radius: 24px;
  box-shadow: ${cardShadow};
  padding: 28px;

  @media (max-width: 767px) {
    padding: 20px;
    border-radius: 18px;
  }
`;

export const SectionHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 24px;
  margin-bottom: 28px;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 20px;
  }
`;

export const SectionTitle = styled.h2<ThemeProps>`
  font-size: clamp(1.6rem, 2.8vw, 2.5rem);
  line-height: 1.1;
  letter-spacing: -0.03em;
  font-weight: 800;
  color: ${textStrong};
`;

export const SectionDesc = styled.p<ThemeProps>`
  color: ${textMuted};
  line-height: 1.6;
  max-width: 48ch;
`;

export const Eyebrow = styled.span<ThemeProps>`
  display: inline-block;
  margin-bottom: 10px;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${accent};
`;

const buttonBase = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 50px;
  padding: 12px 22px;
  border-radius: 14px;
  font: inherit;
  font-size: 0.96rem;
  font-weight: 700;
  white-space: nowrap;
  cursor: pointer;
  text-decoration: none;
`;

export const PrimaryButton = styled.button<ThemeProps>`
  ${buttonBase}
  border: none;
  color: ${onAccent};
  background: ${accent};
  box-shadow: 0 8px 20px
    ${pick("rgba(51, 195, 155, 0.22)", "rgba(0, 87, 63, 0.22)")};

  &:hover {
    background: ${accentHover};
  }
`;

export const SecondaryButton = styled.button<ThemeProps>`
  ${buttonBase}
  border: 1px solid ${borderStrong};
  color: ${textStrong};
  background: transparent;

  &:hover {
    background: ${surfaceMuted};
  }
`;

export const CarTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  border-radius: 999px;
  padding: 7px 12px;
  color: #ffffff;
  background: ${ACCENT_COLOR};
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);

  &::before {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 999px;
    background: #7ff0cd;
  }
`;

export const IconBadge = styled.span<ThemeProps>`
  display: inline-flex;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  color: ${accent};
  background: ${accentSoft};
`;

export function Icon({
  children,
  size = 18,
}: {
  children: ReactNode;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const IntroGrid = styled(Container)`
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  align-items: center;
  gap: 56px;
  padding: 64px 0 80px;

  @media (max-width: 1023px) {
    grid-template-columns: 1fr;
    gap: 28px;
    padding: 36px 0 56px;
  }
`;

const IntroTitle = styled.h1<ThemeProps>`
  font-size: clamp(2.4rem, 5vw, 4.2rem);
  line-height: 1.02;
  letter-spacing: -0.04em;
  font-weight: 800;
  color: ${textStrong};
  margin-bottom: 20px;
`;

const IntroText = styled.p<ThemeProps>`
  color: ${textBody};
  font-size: 1.1rem;
  line-height: 1.65;
  max-width: 56ch;
`;

const IntroImage = styled.img<ThemeProps>`
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: 28px;
  box-shadow: ${cardShadow};

  @media (max-width: 767px) {
    border-radius: 20px;
  }
`;

type PageIntroProps = {
  isDarkMode: boolean;
  title: string;
  image: string;
  imageAlt: string;
  children: ReactNode;
};

export function PageIntro({
  isDarkMode,
  title,
  image,
  imageAlt,
  children,
}: PageIntroProps) {
  return (
    <IntroGrid>
      <div>
        <Eyebrow $isDark={isDarkMode}>CarMentor</Eyebrow>
        <IntroTitle $isDark={isDarkMode}>{title}</IntroTitle>
        <IntroText $isDark={isDarkMode}>{children}</IntroText>
      </div>
      <IntroImage $isDark={isDarkMode} src={image} alt={imageAlt} />
    </IntroGrid>
  );
}

const ModalOverlay = styled.div<ThemeProps>`
  position: fixed;
  inset: 0;
  z-index: 40;
  display: grid;
  place-items: center;
  padding: 20px;
  background: ${pick("rgba(4, 8, 7, 0.72)", "rgba(10, 20, 16, 0.45)")};
  backdrop-filter: blur(6px);
`;

const ModalCard = styled.div<ThemeProps>`
  width: min(520px, 100%);
  border-radius: 24px;
  border: 1px solid ${border};
  background: ${surface};
  color: ${textStrong};
  padding: 26px;
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.3);
`;

const ModalHead = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 12px;
`;

const ModalTitle = styled.h3`
  font-size: 1.3rem;
  letter-spacing: -0.01em;
`;

const CloseButton = styled.button<ThemeProps>`
  border: 1px solid ${borderStrong};
  background: transparent;
  color: ${textStrong};
  border-radius: 999px;
  font: inherit;
  font-size: 0.85rem;
  font-weight: 700;
  padding: 8px 14px;
  cursor: pointer;

  &:hover {
    background: ${surfaceMuted};
  }
`;

const ModalText = styled.p<ThemeProps>`
  margin-top: 12px;
  margin-bottom: 20px;
  color: ${textBody};
  line-height: 1.55;
`;

const ContactActions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const ContactLink = styled.a<ThemeProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 52px;
  border-radius: 14px;
  background: ${surfaceMuted};
  color: ${accent};
  font-weight: 700;

  &:hover {
    background: ${pick("rgba(51, 195, 155, 0.16)", "rgba(0, 87, 63, 0.1)")};
  }
`;

type ContactModalProps = {
  isDarkMode: boolean;
  carName: string;
  onClose: () => void;
};

export function ContactModal({
  isDarkMode,
  carName,
  onClose,
}: ContactModalProps) {
  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [onClose]);

  const emailSubject = encodeURIComponent(`Zapytanie o auto: ${carName}`);

  return (
    <ModalOverlay $isDark={isDarkMode} onClick={onClose}>
      <ModalCard
        $isDark={isDarkMode}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <ModalHead>
          <ModalTitle id="contact-modal-title">
            Skontaktuj się z nami
          </ModalTitle>
          <CloseButton type="button" $isDark={isDarkMode} onClick={onClose}>
            Zamknij
          </CloseButton>
        </ModalHead>
        <ModalText $isDark={isDarkMode}>
          Wybierz preferowaną formę kontaktu dla auta:{" "}
          <strong>{carName}</strong>
        </ModalText>
        <ContactActions>
          <ContactLink
            $isDark={isDarkMode}
            href={`mailto:biuro@carmentor.pl?subject=${emailSubject}`}
          >
            biuro@carmentor.pl
          </ContactLink>
          <ContactLink $isDark={isDarkMode} href="tel:+48660488900">
            +48 660 488 900
          </ContactLink>
        </ContactActions>
      </ModalCard>
    </ModalOverlay>
  );
}
