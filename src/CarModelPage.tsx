import { useEffect, useRef, useState } from "react";
import DOMPurify from "dompurify";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  CARS_BY_SLUG,
  detailedDescriptionHtml,
  documentDownloadLabel,
  fetchCar,
  type CarOffer,
} from "./cars";
import { SiteFooter, SiteNavigation } from "./components/SiteChrome";
import { CarTag, ContactModal, Icon, PrimaryButton, SecondaryButton } from "./components/ui";
import {
  ACCENT_COLOR,
  ACCENT_COLOR_DARK,
  accent,
  accentSoft,
  border,
  cardShadow,
  surface,
  surfaceMuted,
  textBody,
  textMuted,
  textStrong,
  type ThemeProps,
} from "./theme";

const Page = styled.div`
  min-height: 100vh;
`;

const Wrap = styled.section`
  width: min(1280px, calc(100% - 48px));
  margin: 0 auto;
  padding: 28px 0 72px;

  @media (max-width: 767px) {
    width: calc(100% - 28px);
    padding-top: 18px;
    padding-bottom: 48px;
  }
`;

const BackLink = styled(Link)<ThemeProps>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  padding: 8px 14px 8px 10px;
  border-radius: 999px;
  border: 1px solid ${border};
  background: ${surface};
  color: ${textBody};
  font-size: 0.88rem;
  font-weight: 600;

  &:hover {
    color: ${accent};
  }
`;

const Header = styled.header`
  margin-bottom: 24px;
`;

const Title = styled.h1<ThemeProps>`
  font-size: clamp(1.8rem, 3.6vw, 3rem);
  line-height: 1.08;
  letter-spacing: -0.03em;
  font-weight: 800;
  color: ${textStrong};
  margin-bottom: 10px;
`;

const Subtitle = styled.p<ThemeProps>`
  color: ${textMuted};
  font-size: 1rem;
`;

const Showcase = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 380px;
  gap: 28px;
  align-items: start;

  @media (max-width: 1023px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const Gallery = styled.div`
  display: grid;
  gap: 12px;
  min-width: 0;
`;

const MainImageFrame = styled.button<ThemeProps>`
  position: relative;
  display: block;
  width: 100%;
  padding: 0;
  border: none;
  overflow: hidden;
  border-radius: 24px;
  aspect-ratio: 16 / 10;
  background: ${surfaceMuted};
  box-shadow: ${cardShadow};
  cursor: zoom-in;
  font: inherit;
  color: inherit;

  &::after {
    content: "";
    position: absolute;
    inset: auto 0 0;
    height: 32%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.45), transparent);
    pointer-events: none;
  }

  &:focus-visible {
    outline: 2px solid ${({ $isDark }) => ($isDark ? ACCENT_COLOR_DARK : ACCENT_COLOR)};
    outline-offset: 3px;
  }

  @media (max-width: 767px) {
    border-radius: 18px;
    aspect-ratio: 4 / 3;
  }
`;

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImageOverlay = styled.div`
  position: absolute;
  left: 18px;
  right: 18px;
  bottom: 16px;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  pointer-events: none;
`;

const PhotoCounter = styled.span`
  font-size: 0.8rem;
  font-weight: 700;
  color: #ffffff;
  padding: 6px 11px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(6px);
`;

const ExpandHint = styled.span`
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 12px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(6px);
  color: #ffffff;
  font-size: 0.78rem;
  font-weight: 700;
  pointer-events: none;
`;

const Lightbox = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  overflow: hidden;
  background: rgba(4, 8, 7, 0.94);
  color: #ffffff;
`;

const LightboxTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 22px;

  @media (max-width: 767px) {
    padding: 14px 16px;
  }
`;

const LightboxTitle = styled.p`
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: -0.01em;
`;

const LightboxClose = styled.button`
  border: 1px solid rgba(255, 255, 255, 0.28);
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
  border-radius: 999px;
  font: inherit;
  font-size: 0.85rem;
  font-weight: 700;
  padding: 8px 14px;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.16);
  }
`;

const LightboxStage = styled.div`
  position: relative;
  min-height: 0;
  overflow: hidden;
  display: grid;
  place-items: center;
  padding: 0 72px 12px;

  @media (max-width: 767px) {
    padding: 0 56px 8px;
  }
`;

const LightboxImage = styled.img`
  box-sizing: border-box;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 8px;
  user-select: none;
  pointer-events: none;
`;

const LightboxNav = styled.button<{ $side: "left" | "right" }>`
  position: absolute;
  top: 50%;
  ${({ $side }) => ($side === "left" ? "left: 16px;" : "right: 16px;")}
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.28);
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
  display: grid;
  place-items: center;
  cursor: pointer;
  z-index: 1;

  &:hover {
    background: rgba(255, 255, 255, 0.16);
  }

  @media (max-width: 767px) {
    ${({ $side }) => ($side === "left" ? "left: 8px;" : "right: 8px;")}
    width: 40px;
    height: 40px;
    background: rgba(0, 0, 0, 0.45);
  }
`;

const LightboxBottom = styled.div`
  position: relative;
  z-index: 2;
  display: grid;
  gap: 12px;
  justify-items: center;
  padding: 8px 22px 22px;
  background: rgba(4, 8, 7, 0.94);

  @media (max-width: 767px) {
    padding: 4px 14px 16px;
  }
`;

const LightboxCounter = styled.span`
  font-size: 0.82rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.78);
`;

const LightboxThumbs = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 72px;
  gap: 10px;
  max-width: min(920px, 100%);
  overflow-x: auto;
  padding: 4px;
  scrollbar-width: thin;
  scroll-behavior: smooth;

  @media (max-width: 767px) {
    grid-auto-columns: 64px;
  }
`;

const LightboxThumb = styled.button<{ $active: boolean }>`
  padding: 0;
  border: 2px solid ${({ $active }) => ($active ? "#ffffff" : "transparent")};
  border-radius: 12px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.06);
  cursor: pointer;
  opacity: ${({ $active }) => ($active ? 1 : 0.55)};
  transition: opacity 0.2s ease, border-color 0.2s ease;

  &:hover {
    opacity: 1;
  }
`;

const LightboxThumbImage = styled.img`
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  display: block;
  vertical-align: middle;
`;

const ThumbGrid = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(96px, 1fr);
  gap: 10px;
  overflow-x: auto;
  padding: 2px;
  scrollbar-width: thin;
  scroll-behavior: smooth;

  @media (max-width: 767px) {
    grid-auto-columns: 84px;
  }
`;

const ThumbButton = styled.button<ThemeProps & { $active: boolean }>`
  position: relative;
  padding: 0;
  border-radius: 14px;
  overflow: hidden;
  border: none;
  background: transparent;
  cursor: pointer;
  outline: 2px solid ${({ $active, $isDark }) =>
    $active ? ($isDark ? ACCENT_COLOR_DARK : ACCENT_COLOR) : "transparent"};
  outline-offset: 2px;
  opacity: ${({ $active }) => ($active ? 1 : 0.62)};
  transition: opacity 0.2s ease, outline-color 0.2s ease;

  &:hover {
    opacity: 1;
  }
`;

const ThumbImage = styled.img`
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
`;

const SummaryCard = styled.aside<ThemeProps>`
  position: sticky;
  top: 104px;
  display: grid;
  gap: 20px;
  padding: 26px;
  border-radius: 24px;
  border: 1px solid ${border};
  background: ${surface};
  box-shadow: ${cardShadow};

  @media (max-width: 1023px) {
    position: static;
  }

  @media (max-width: 767px) {
    padding: 20px;
    border-radius: 18px;
  }
`;

const SummaryHead = styled.div`
  display: grid;
  gap: 6px;
`;

const Brand = styled.span<ThemeProps>`
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${accent};
`;

const CarName = styled.h2<ThemeProps>`
  font-size: 1.4rem;
  line-height: 1.25;
  letter-spacing: -0.015em;
  color: ${textStrong};
`;

const Meta = styled.p<ThemeProps>`
  color: ${textMuted};
  font-size: 0.92rem;
`;

const SpecsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
`;

const SpecItem = styled.div<ThemeProps>`
  display: grid;
  gap: 8px;
  border-radius: 16px;
  background: ${surfaceMuted};
  padding: 14px;
`;

const SpecItemWide = styled(SpecItem)`
  grid-column: 1 / -1;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 12px;
`;

const SpecIcon = styled.span<ThemeProps>`
  display: inline-flex;
  width: 30px;
  height: 30px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  color: ${accent};
  background: ${accentSoft};
`;

const SpecLabel = styled.p<ThemeProps>`
  font-size: 0.74rem;
  color: ${textMuted};
`;

const SpecValue = styled.p<ThemeProps>`
  font-size: 0.98rem;
  font-weight: 700;
  color: ${textStrong};
`;

const PriceBlock = styled.div<ThemeProps>`
  padding-top: 18px;
  border-top: 1px solid ${border};
`;

const PriceLabel = styled.p<ThemeProps>`
  font-size: 0.78rem;
  color: ${textMuted};
  margin-bottom: 4px;
`;

const Price = styled.p<ThemeProps>`
  font-size: 2rem;
  line-height: 1.1;
  letter-spacing: -0.02em;
  font-weight: 800;
  color: ${textStrong};
`;

const ButtonsRow = styled.div`
  display: grid;
  gap: 10px;
`;

const CardButton = styled(PrimaryButton)`
  min-height: 54px;
`;

const OtomotoLink = styled(SecondaryButton)`
  min-height: 54px;
`;

const DetailsGrid = styled.div<{ $hasSidebar: boolean }>`
  display: grid;
  grid-template-columns: ${({ $hasSidebar }) =>
    $hasSidebar ? "minmax(260px, 1fr) minmax(0, 2fr)" : "1fr"};
  gap: 20px;
  margin-top: 28px;
  align-items: start;

  @media (max-width: 1023px) {
    grid-template-columns: 1fr;
  }
`;

const SectionCard = styled.article<ThemeProps>`
  background: ${surface};
  border: 1px solid ${border};
  border-radius: 24px;
  padding: 28px;
  box-shadow: ${cardShadow};

  @media (max-width: 767px) {
    padding: 20px;
    border-radius: 18px;
  }
`;

const SectionHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 18px;
`;

const SectionTitleRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
`;

const SectionIcon = styled.span<ThemeProps>`
  display: inline-flex;
  width: 34px;
  height: 34px;
  border-radius: 11px;
  align-items: center;
  justify-content: center;
  color: ${accent};
  background: ${accentSoft};
`;

const SectionTitle = styled.h3<ThemeProps>`
  font-size: 1.2rem;
  letter-spacing: -0.01em;
  color: ${textStrong};
`;

const DescriptionBody = styled.div<ThemeProps>`
  max-width: none;
  color: ${textBody};
  font-size: 1rem;
  line-height: 1.75;

  p,
  ul,
  ol,
  blockquote,
  h2,
  h3 {
    margin: 0 0 14px;
  }

  p:last-child,
  ul:last-child,
  ol:last-child,
  blockquote:last-child,
  h2:last-child,
  h3:last-child {
    margin-bottom: 0;
  }

  h2,
  h3 {
    color: ${textStrong};
    line-height: 1.35;
    letter-spacing: -0.02em;
  }

  h2 {
    font-size: 1.2rem;
  }

  h3 {
    font-size: 1.08rem;
  }

  ul,
  ol {
    padding-left: 1.25em;
  }

  li {
    margin-bottom: 6px;
  }

  li:last-child {
    margin-bottom: 0;
  }

  a {
    color: ${accent};
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  blockquote {
    padding: 4px 0 4px 14px;
    border-left: 3px solid ${accent};
    color: ${textMuted};
  }

  strong,
  b {
    color: ${textStrong};
    font-weight: 700;
  }
`;

const ExtraInfoBody = styled.div`
  display: grid;
  gap: 18px;
`;

const StatusChipRow = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const StatusChip = styled.li<ThemeProps>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 999px;
  background: ${accentSoft};
  color: ${textStrong};
  font-size: 0.88rem;
  font-weight: 700;

  &::before {
    content: "";
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${accent};
    flex-shrink: 0;
  }
`;

const InfoGrid = styled.dl`
  margin: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
`;

const InfoTile = styled.div<ThemeProps>`
  display: grid;
  gap: 4px;
  padding: 12px 14px;
  border-radius: 14px;
  background: ${surfaceMuted};
`;

const InfoLabel = styled.dt<ThemeProps>`
  font-size: 0.74rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  color: ${textMuted};
`;

const InfoValue = styled.dd<ThemeProps>`
  margin: 0;
  font-size: 0.98rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  color: ${textStrong};
  word-break: break-word;
`;

const SPEC_ICONS = {
  engine: (
    <Icon size={16}>
      <path d="M4 10h2V8h4V6h4v2h3l2 3v5h-2v2h-4l-2-2H8v-2H6v2H4z" />
    </Icon>
  ),
  power: (
    <Icon size={16}>
      <path d="M13 3 5 14h6l-1 7 8-11h-6z" />
    </Icon>
  ),
  mileage: (
    <Icon size={16}>
      <path d="M4 17a8 8 0 1 1 16 0" />
      <path d="m12 17 4-5" />
    </Icon>
  ),
  gearbox: (
    <Icon size={16}>
      <circle cx="6" cy="6" r="2" />
      <circle cx="12" cy="6" r="2" />
      <circle cx="18" cy="6" r="2" />
      <path d="M6 8v10M12 8v10M18 8v4H6" />
    </Icon>
  ),
  fuel: (
    <Icon size={16}>
      <path d="M4 20V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v14z" />
      <path d="M14 10h2.5a2.5 2.5 0 0 1 2.5 2.5V18a2 2 0 0 0 2 2" />
      <path d="M7 8h4M7 12h4" />
    </Icon>
  ),
  drive: (
    <Icon size={16}>
      <circle cx="7" cy="12" r="3" />
      <circle cx="17" cy="12" r="3" />
      <path d="M10 12h4" />
    </Icon>
  ),
  saleForm: (
    <Icon size={16}>
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <path d="M8 13h8M8 17h5" />
    </Icon>
  ),
};

type CarModelPageProps = {
  isDarkMode: boolean;
  onToggleTheme: () => void;
};

export default function CarModelPage({ isDarkMode, onToggleTheme }: CarModelPageProps) {
  const { carSlug } = useParams<{ carSlug: string }>();
  const [car, setCar] = useState<CarOffer | null>(null);
  const [loadedSlug, setLoadedSlug] = useState<string | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [contactCar, setContactCar] = useState<string | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [gallerySlug, setGallerySlug] = useState<string | null>(null);
  const pageThumbsRef = useRef<HTMLDivElement>(null);
  const lightboxThumbsRef = useRef<HTMLDivElement>(null);

  if (carSlug && carSlug !== gallerySlug) {
    setGallerySlug(carSlug);
    setActivePhotoIndex(0);
    setIsGalleryOpen(false);
  }

  useEffect(() => {
    if (!carSlug) {
      return;
    }

    let cancelled = false;
    fetchCar(carSlug)
      .then((found) => found ?? CARS_BY_SLUG[carSlug] ?? null)
      .catch(() => CARS_BY_SLUG[carSlug] ?? null)
      .then((next) => {
        if (cancelled) {
          return;
        }
        setCar(next);
        setLoadedSlug(carSlug);
      });

    return () => {
      cancelled = true;
    };
  }, [carSlug]);

  const galleryLength = car?.gallery.length ?? 0;

  useEffect(() => {
    if (!isGalleryOpen || galleryLength === 0) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsGalleryOpen(false);
        return;
      }
      if (galleryLength < 2) {
        return;
      }
      if (event.key === "ArrowRight") {
        setActivePhotoIndex((current) => (current + 1) % galleryLength);
      }
      if (event.key === "ArrowLeft") {
        setActivePhotoIndex((current) => (current - 1 + galleryLength) % galleryLength);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isGalleryOpen, galleryLength]);

  useEffect(() => {
    const scrollActiveThumbIntoView = (container: HTMLDivElement | null) => {
      if (!container) {
        return;
      }
      const activeThumb = container.querySelector<HTMLElement>('[data-active="true"]');
      if (!activeThumb) {
        return;
      }
      const containerRect = container.getBoundingClientRect();
      const thumbRect = activeThumb.getBoundingClientRect();
      const offset =
        thumbRect.left - containerRect.left - (container.clientWidth - thumbRect.width) / 2;
      container.scrollBy({ left: offset, behavior: "smooth" });
    };

    scrollActiveThumbIntoView(pageThumbsRef.current);
    if (isGalleryOpen) {
      scrollActiveThumbIntoView(lightboxThumbsRef.current);
    }
  }, [activePhotoIndex, isGalleryOpen, loadedSlug]);

  const isLoading = Boolean(carSlug) && loadedSlug !== carSlug;

  if (!carSlug) {
    return (
      <Page>
        <Wrap>
          <p>Nie znaleziono samochodu.</p>
          <p>
            <Link to="/">Wróć do strony głównej</Link>
          </p>
        </Wrap>
      </Page>
    );
  }

  if (isLoading) {
    return (
      <Page>
        <Wrap>
          <p>Ładowanie oferty...</p>
        </Wrap>
      </Page>
    );
  }

  if (!car) {
    return (
      <Page>
        <Wrap>
          <p>Nie znaleziono samochodu.</p>
          <p>
            <Link to="/">Wróć do strony głównej</Link>
          </p>
        </Wrap>
      </Page>
    );
  }

  const safePhotoIndex =
    car.gallery.length === 0 ? 0 : Math.min(activePhotoIndex, car.gallery.length - 1);
  const activePhoto = car.gallery[safePhotoIndex] ?? "";
  const openGalleryAt = (index: number) => {
    setActivePhotoIndex(index);
    setIsGalleryOpen(true);
  };
  const showPreviousPhoto = () => {
    if (car.gallery.length < 2) {
      return;
    }
    setActivePhotoIndex((current) => (current - 1 + car.gallery.length) % car.gallery.length);
  };
  const showNextPhoto = () => {
    if (car.gallery.length < 2) {
      return;
    }
    setActivePhotoIndex((current) => (current + 1) % car.gallery.length);
  };
  const specs = [
    { key: "engine" as const, label: "Pojemność silnika", value: car.engine },
    { key: "power" as const, label: "Moc", value: car.power },
    { key: "mileage" as const, label: "Przebieg", value: car.mileage },
    { key: "gearbox" as const, label: "Skrzynia biegów", value: car.gearbox },
    { key: "fuel" as const, label: "Rodzaj paliwa", value: car.fuel },
    { key: "drive" as const, label: "Napęd", value: car.drive },
  ]
    .map((spec) => ({ ...spec, value: spec.value?.trim() || "—" }))
    .filter((spec) => {
      // Hide legacy empty core specs; always keep fuel/drive tiles.
      if (spec.key === "fuel" || spec.key === "drive") {
        return true;
      }
      return spec.value !== "—";
    });

  type ExtraInfoPair = { key: string; label: string; value: string };
  type ExtraInfoStatus = { key: string; label: string };

  const extraInfoPairs: ExtraInfoPair[] = [];
  const extraInfoStatuses: ExtraInfoStatus[] = [];
  const pushPair = (key: string, label: string, value: string | undefined) => {
    const trimmed = value?.trim();
    if (!trimmed) {
      return;
    }
    extraInfoPairs.push({ key, label, value: trimmed });
  };

  pushPair("originCountry", "Kraj pochodzenia", car.originCountry);
  pushPair("offerFrom", "Oferta od", car.offerFrom);
  pushPair("registrationNumber", "Numer rejestracyjny", car.registrationNumber);
  pushPair("firstRegistrationDate", "Data pierwszej rejestracji", car.firstRegistrationDate);
  pushPair("history", "Historia", car.history);
  pushPair("servicing", "Serwisowanie", car.servicing);
  pushPair("vin", "VIN", car.vin);
  if (car.registeredInPoland) {
    extraInfoStatuses.push({ key: "registeredInPoland", label: "Zarejestrowany w Polsce" });
  }
  if (car.firstOwner) {
    extraInfoStatuses.push({ key: "firstOwner", label: "Pierwszy właściciel (od nowości)" });
  }
  const hasExtraInfo = extraInfoPairs.length > 0 || extraInfoStatuses.length > 0;

  return (
    <Page>
      <SiteNavigation
        isDarkMode={isDarkMode}
        onToggleTheme={onToggleTheme}
      />
      <Wrap>
        <BackLink to="/" $isDark={isDarkMode}>
          ← Wróć do oferty
        </BackLink>
        <Header>
          <Title $isDark={isDarkMode}>
            {car.brand} {car.model}
          </Title>
          <Subtitle $isDark={isDarkMode}>
            Szczegółowa karta pojazdu. Możesz spokojnie przejrzeć zdjęcia i specyfikację.
          </Subtitle>
        </Header>
        <Showcase id="gallery">
          <Gallery>
            <MainImageFrame
              type="button"
              $isDark={isDarkMode}
              onClick={() => openGalleryAt(safePhotoIndex)}
              aria-label={`Otwórz galerię ${car.brand} ${car.model}`}
            >
              {activePhoto ? (
                <MainImage key={car.slug} src={activePhoto} alt={`${car.brand} ${car.model}`} />
              ) : null}
              <ExpandHint>
                <Icon size={14}>
                  <path d="M9 3H3v6M15 3h6v6M9 21H3v-6M15 21h6v-6" />
                </Icon>
                Galeria
              </ExpandHint>
              <ImageOverlay>
                <CarTag>{car.tag}</CarTag>
                {car.gallery.length > 1 ? (
                  <PhotoCounter>
                    {safePhotoIndex + 1} / {car.gallery.length}
                  </PhotoCounter>
                ) : null}
              </ImageOverlay>
            </MainImageFrame>
            <ThumbGrid ref={pageThumbsRef}>
              {car.gallery.map((photoSrc, index) => (
                <ThumbButton
                  key={`${car.slug}-${index}`}
                  type="button"
                  $isDark={isDarkMode}
                  $active={safePhotoIndex === index}
                  data-active={safePhotoIndex === index ? "true" : undefined}
                  onClick={() => setActivePhotoIndex(index)}
                  aria-label={`Zdjęcie ${index + 1} ${car.brand} ${car.model}`}
                >
                  <ThumbImage src={photoSrc} alt={`${car.brand} ${car.model} zdjęcie ${index + 1}`} />
                </ThumbButton>
              ))}
            </ThumbGrid>
          </Gallery>
          <SummaryCard $isDark={isDarkMode}>
            <SummaryHead>
              <Brand $isDark={isDarkMode}>{car.brand}</Brand>
              <CarName $isDark={isDarkMode}>{car.model}</CarName>
              <Meta $isDark={isDarkMode}>Rok produkcji: {car.year}</Meta>
            </SummaryHead>
            <SpecsGrid>
              {car.saleForm?.trim() ? (
                <SpecItemWide $isDark={isDarkMode}>
                  <SpecIcon $isDark={isDarkMode}>{SPEC_ICONS.saleForm}</SpecIcon>
                  <div>
                    <SpecLabel $isDark={isDarkMode}>Forma sprzedaży</SpecLabel>
                    <SpecValue $isDark={isDarkMode}>{car.saleForm.trim()}</SpecValue>
                  </div>
                </SpecItemWide>
              ) : null}
              {specs.map((spec) => (
                <SpecItem key={spec.key} $isDark={isDarkMode}>
                  <SpecIcon $isDark={isDarkMode}>{SPEC_ICONS[spec.key]}</SpecIcon>
                  <div>
                    <SpecLabel $isDark={isDarkMode}>{spec.label}</SpecLabel>
                    <SpecValue $isDark={isDarkMode}>{spec.value}</SpecValue>
                  </div>
                </SpecItem>
              ))}
            </SpecsGrid>
            <PriceBlock $isDark={isDarkMode}>
              <PriceLabel $isDark={isDarkMode}>Cena</PriceLabel>
              <Price $isDark={isDarkMode}>{car.price}</Price>
            </PriceBlock>
            <ButtonsRow>
              <CardButton
                id="contact"
                type="button"
                $isDark={isDarkMode}
                onClick={() => setContactCar(`${car.brand} ${car.model}`)}
              >
                Zapytaj o to auto
              </CardButton>
              {car.documentPdf?.trim() ? (
                <OtomotoLink
                  as="a"
                  $isDark={isDarkMode}
                  href={car.documentPdf}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {documentDownloadLabel(car.documentType)}
                </OtomotoLink>
              ) : null}
              {car.otomotoUrl && (
                <OtomotoLink
                  as="a"
                  $isDark={isDarkMode}
                  href={car.otomotoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Zobacz na Otomoto
                </OtomotoLink>
              )}
            </ButtonsRow>
          </SummaryCard>
        </Showcase>
        <DetailsGrid $hasSidebar={hasExtraInfo}>
          {hasExtraInfo ? (
            <SectionCard $isDark={isDarkMode}>
              <SectionHead>
                <SectionTitleRow>
                  <SectionIcon $isDark={isDarkMode}>
                    <Icon size={16}>
                      <path d="M4 5h16v14H4z" />
                      <path d="M8 9h8M8 13h5" />
                    </Icon>
                  </SectionIcon>
                  <SectionTitle $isDark={isDarkMode}>Informacje dodatkowe</SectionTitle>
                </SectionTitleRow>
              </SectionHead>
              <ExtraInfoBody>
                {extraInfoStatuses.length > 0 ? (
                  <StatusChipRow>
                    {extraInfoStatuses.map((item) => (
                      <StatusChip key={item.key} $isDark={isDarkMode}>
                        {item.label}
                      </StatusChip>
                    ))}
                  </StatusChipRow>
                ) : null}
                {extraInfoPairs.length > 0 ? (
                  <InfoGrid>
                    {extraInfoPairs.map((item) => (
                      <InfoTile key={item.key} $isDark={isDarkMode}>
                        <InfoLabel $isDark={isDarkMode}>{item.label}</InfoLabel>
                        <InfoValue $isDark={isDarkMode}>{item.value}</InfoValue>
                      </InfoTile>
                    ))}
                  </InfoGrid>
                ) : null}
              </ExtraInfoBody>
            </SectionCard>
          ) : null}
          <SectionCard $isDark={isDarkMode}>
            <SectionHead>
              <SectionTitleRow>
                <SectionIcon $isDark={isDarkMode}>
                  <Icon size={16}>
                    <path d="M6 3h9l4 4v14H6z" />
                    <path d="M9 12h7M9 16h5" />
                  </Icon>
                </SectionIcon>
                <SectionTitle $isDark={isDarkMode}>Opis pojazdu</SectionTitle>
              </SectionTitleRow>
            </SectionHead>
            <DescriptionBody
              $isDark={isDarkMode}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  detailedDescriptionHtml(car.detailedDescription),
                  {
                    ALLOWED_TAGS: [
                      "p",
                      "br",
                      "strong",
                      "b",
                      "em",
                      "i",
                      "u",
                      "s",
                      "ul",
                      "ol",
                      "li",
                      "h2",
                      "h3",
                      "a",
                      "blockquote",
                    ],
                    ALLOWED_ATTR: ["href", "title", "target", "rel"],
                  },
                ),
              }}
            />
          </SectionCard>
        </DetailsGrid>
      </Wrap>
      <SiteFooter isDarkMode={isDarkMode} />
      {contactCar ? (
        <ContactModal
          isDarkMode={isDarkMode}
          carName={contactCar}
          onClose={() => setContactCar(null)}
        />
      ) : null}
      {isGalleryOpen ? (
        <Lightbox
          role="dialog"
          aria-modal="true"
          aria-label={`Galeria ${car.brand} ${car.model}`}
        >
          <LightboxTop>
            <LightboxTitle>
              {car.brand} {car.model}
            </LightboxTitle>
            <LightboxClose type="button" onClick={() => setIsGalleryOpen(false)}>
              Zamknij
            </LightboxClose>
          </LightboxTop>
          <LightboxStage>
            {car.gallery.length > 1 ? (
              <>
                <LightboxNav
                  type="button"
                  $side="left"
                  onClick={showPreviousPhoto}
                  aria-label="Poprzednie zdjęcie"
                >
                  <Icon size={20}>
                    <path d="m14 6-6 6 6 6" />
                  </Icon>
                </LightboxNav>
                <LightboxNav
                  type="button"
                  $side="right"
                  onClick={showNextPhoto}
                  aria-label="Następne zdjęcie"
                >
                  <Icon size={20}>
                    <path d="m10 6 6 6-6 6" />
                  </Icon>
                </LightboxNav>
              </>
            ) : null}
            {activePhoto ? (
              <LightboxImage
                key={car.slug}
                src={activePhoto}
                alt={`${car.brand} ${car.model} zdjęcie ${safePhotoIndex + 1}`}
              />
            ) : null}
          </LightboxStage>
          <LightboxBottom>
            {car.gallery.length > 1 ? (
              <LightboxCounter>
                {safePhotoIndex + 1} / {car.gallery.length}
              </LightboxCounter>
            ) : null}
            <LightboxThumbs ref={lightboxThumbsRef}>
              {car.gallery.map((photoSrc, index) => (
                <LightboxThumb
                  key={`${car.slug}-${index}`}
                  type="button"
                  $active={safePhotoIndex === index}
                  data-active={safePhotoIndex === index ? "true" : undefined}
                  onClick={() => setActivePhotoIndex(index)}
                  aria-label={`Pokaż zdjęcie ${index + 1}`}
                >
                  <LightboxThumbImage
                    src={photoSrc}
                    alt={`${car.brand} ${car.model} miniaturka ${index + 1}`}
                  />
                </LightboxThumb>
              ))}
            </LightboxThumbs>
          </LightboxBottom>
        </Lightbox>
      ) : null}
    </Page>
  );
}
