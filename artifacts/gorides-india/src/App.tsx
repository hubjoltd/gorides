import { type FormEvent, type ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import {
  ArrowDownRight,
  ArrowUpRight,
  BadgeCheck,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Headphones,
  IndianRupee,
  Instagram,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Plane,
  Route,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';
import NotFound from '@/pages/not-found';
import { Route as WouterRoute, Switch, useLocation, Router as WouterRouter } from 'wouter';
import sliderBackground from '@assets/132d4583-83ce-450e-827e-1966b44775e7_1790325260070.png';
import logoImage from '@assets/IMG-20260912-WA0004_1789884191965.jpg';
import goaImage from '@assets/Goa_1790325032169.jpg';
import hampiImage from '@assets/Hampi_1790325032248.jpg';
import ootyImage from '@assets/Ooty_1790325032280.jpg';
import chikmagalurImage from '@assets/Chikmagalur_1790325032310.jpg';
import mysuruImage from '@assets/Mysuru_1790325032336.jpg';
import coorgImage from '@assets/Coorg_1790325032362.jpg';
import airportImage from '@assets/IMG_20260925_140717_1790325492645.png';
import outstationImage from '@assets/IMG_20260925_140705_1790325492691.png';

const queryClient = new QueryClient();
const PHONE_DISPLAY = '+91 82170 26324';
const PHONE_LINK = '918217026324';
const EMAIL = 'Goridesindia@gmail.com';

type Enquiry = {
  name: string;
  phone: string;
  email: string;
  service: string;
  route: string;
  date: string;
  passengers: string;
  notes: string;
};

const emptyEnquiry: Enquiry = {
  name: '',
  phone: '',
  email: '',
  service: 'Outstation',
  route: '',
  date: '',
  passengers: '1–3 people',
  notes: '',
};

const popularRoutes = [
  { city: 'Mysuru', distance: '145 km', detail: 'Palaces, food, an easy weekend', image: mysuruImage },
  { city: 'Coorg', distance: '265 km', detail: 'Coffee country, unhurried', image: coorgImage },
  { city: 'Hampi', distance: '340 km', detail: 'History under wide skies', image: hampiImage },
  { city: 'Ooty', distance: '270 km', detail: 'Roads that climb into the clouds', image: ootyImage },
  { city: 'Chikmagalur', distance: '245 km', detail: 'Mist, estates, long lunches', image: chikmagalurImage },
  { city: 'Goa', distance: '590 km', detail: 'A holiday that starts at pickup', image: goaImage },
];

function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <a href="#top" data-testid="link-brand" className="focus-ring group inline-flex items-center">
      <img
        src={logoImage}
        alt="GoRides India — Outstation Trips"
        className={`h-12 w-[166px] rounded-[10px] object-cover object-center transition-transform duration-300 group-hover:scale-[1.02] sm:h-14 sm:w-[194px] ${inverse ? 'ring-1 ring-[#66d93f]/30' : 'shadow-[0_8px_18px_rgba(4,28,55,.12)]'}`}
      />
    </a>
  );
}

function ButtonArrow({ children, href = '#enquire', secondary = false }: { children: ReactNode; href?: string; secondary?: boolean }) {
  return (
    <a
      href={href}
      data-testid={`link-${String(children).toLowerCase().replace(/\s+/g, '-')}`}
      className={`focus-ring group inline-flex items-center justify-center gap-3 rounded-full px-5 py-3 text-[12px] font-extrabold tracking-[0.01em] transition-all duration-300 hover:-translate-y-0.5 ${secondary ? 'border border-[#d9d3c6] bg-[#fbf7ee]/55 text-[#23454c] hover:border-[#1c8061] hover:bg-[#fbf7ee]' : 'bg-[#f6bb4c] text-[#173b44] shadow-[0_10px_22px_rgba(246,187,76,.22)] hover:bg-[#ffd274] hover:shadow-[0_13px_26px_rgba(246,187,76,.3)]'}`}
    >
      {children}
      <span className="grid h-6 w-6 place-items-center rounded-full bg-[#173b44]/10 transition-transform duration-300 group-hover:translate-x-1">
        <ArrowUpRight size={14} strokeWidth={2.5} />
      </span>
    </a>
  );
}

function SectionLabel({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <div className={`mb-5 flex items-center gap-3 font-mono-ui text-[10px] font-medium uppercase tracking-[0.18em] ${light ? 'text-[#a9d4c5]' : 'text-[#1c8061]'}`}>
      <span className={`h-px w-8 ${light ? 'bg-[#a9d4c5]' : 'bg-[#1c8061]'}`} />
      {children}
    </div>
  );
}

function HeroRouteSketch() {
  return (
    <div className="relative mx-auto h-[390px] w-full max-w-[530px] overflow-hidden rounded-[32px] border border-[#5e8a85]/35 bg-[#18444c] shadow-[0_30px_75px_rgba(13,47,56,.3)] md:h-[440px]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        aria-hidden="true"
        style={{ backgroundImage: `url(${sliderBackground})`, backgroundPosition: 'center 58%' }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(150deg,rgba(4,40,74,.2)_0%,rgba(4,40,74,.46)_52%,rgba(4,27,50,.82)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(28deg,transparent_42%,rgba(255,255,255,.12)_42.2%,transparent_42.4%),linear-gradient(155deg,transparent_63%,rgba(255,255,255,.1)_63.2%,transparent_63.4%)] opacity-30 [background-size:65px_65px,90px_90px]" />
      <div className="absolute left-7 top-7 flex items-center gap-2 font-mono-ui text-[9px] uppercase tracking-[0.18em] text-[#c8e4d9]">
        <span className="h-2 w-2 rounded-full bg-[#f6bb4c] shadow-[0_0_0_5px_rgba(246,187,76,.14)]" /> Bengaluru, Karnataka
      </div>
      <div className="absolute right-7 top-7 rounded-full border border-[#b3d8ca]/30 px-3 py-1.5 font-mono-ui text-[9px] text-[#c8e4d9]">ROUTE 01 / INDIA</div>
      <svg viewBox="0 0 520 400" className="absolute inset-0 h-full w-full" fill="none" aria-label="Illustration of a road route from Bengaluru">
        <path d="M90 340 C115 275 183 284 197 235 C214 176 180 161 243 132 C285 112 351 136 374 92 C393 56 430 66 454 40" stroke="#9acdbb" strokeWidth="2" strokeDasharray="6 12" className="road-dash" />
        <circle cx="90" cy="340" r="8" fill="#f6bb4c" />
        <circle cx="90" cy="340" r="16" stroke="#f6bb4c" strokeOpacity=".35" />
        <circle cx="454" cy="40" r="7" fill="#f6bb4c" />
        <circle cx="454" cy="40" r="14" stroke="#f6bb4c" strokeOpacity=".35" />
        <path d="M77 348 l13 -24 13 24z" fill="#f6bb4c" />
        <path d="M445 48 l9 -20 9 20z" fill="#f6bb4c" />
      </svg>
      <div className="absolute bottom-6 left-6 right-6 rounded-[22px] border border-[#b3d8ca]/25 bg-[#0f2e39]/70 p-4 backdrop-blur-md">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-mono-ui text-[9px] uppercase tracking-[0.18em] text-[#9ccbbb]">A good trip begins here</p>
            <p className="mt-2 font-display text-[30px] leading-none text-[#fff8e9]">Bengaluru <i className="text-[#f6bb4c]">→</i> somewhere lovely</p>
          </div>
          <div className="drift hidden shrink-0 rounded-[15px] bg-[#f6bb4c] p-3 text-[#173b44] sm:block">
            <Route size={25} strokeWidth={1.8} />
          </div>
        </div>
        <div className="mt-5 flex items-center gap-2 border-t border-[#b3d8ca]/20 pt-3 text-[10px] text-[#c8e4d9]">
          <Clock3 size={13} /> Plans made around your time, not ours
        </div>
      </div>
    </div>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [enquiry, setEnquiry] = useState<Enquiry>(emptyEnquiry);
  const [errors, setErrors] = useState<Partial<Record<keyof Enquiry, string>>>({});
  const [submitted, setSubmitted] = useState<Enquiry | null>(null);

  const updateField = (field: keyof Enquiry, value: string) => {
    setEnquiry((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const pickService = (service: string) => {
    updateField('service', service);
    document.querySelector('#enquire')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Partial<Record<keyof Enquiry, string>> = {};
    if (!enquiry.name.trim()) nextErrors.name = 'Tell us your name';
    if (!/^[+()\d\s-]{8,}$/.test(enquiry.phone.trim())) nextErrors.phone = 'Add a reachable phone number';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiry.email.trim())) nextErrors.email = 'Add a valid email address';
    if (!enquiry.route.trim()) nextErrors.route = 'Where are you headed?';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setSubmitted({ ...enquiry });
    window.setTimeout(() => document.querySelector('#confirmation')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50);
  };

  const enquiryText = submitted
    ? `Hello GoRides India, I’d like to enquire about ${submitted.service.toLowerCase()}.\n\nName: ${submitted.name}\nPhone: ${submitted.phone}\nEmail: ${submitted.email}\nRoute: Bengaluru to ${submitted.route}\nTravel date: ${submitted.date || 'Flexible'}\nTravellers: ${submitted.passengers}\nNotes: ${submitted.notes || 'None'}`
    : '';
  const gmailHref = submitted
    ? `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${encodeURIComponent(`GoRides enquiry — ${submitted.route}`)}&body=${encodeURIComponent(enquiryText)}`
    : '#';
  const whatsappHref = submitted ? `https://wa.me/${PHONE_LINK}?text=${encodeURIComponent(enquiryText)}` : `https://wa.me/${PHONE_LINK}`;

  return (
    <div id="top" className="noise min-h-[100dvh] overflow-hidden bg-[#f7f3ea]">
      <header className="absolute inset-x-0 top-0 z-40">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-5 md:px-8 lg:py-7">
          <Logo />
          <nav className="hidden items-center gap-8 rounded-full border border-[#d5d4c9]/70 bg-[#f9f5eb]/70 px-6 py-3 backdrop-blur-sm lg:flex" aria-label="Primary navigation">
            <a href="#services" data-testid="link-nav-services" className="focus-ring text-[11px] font-bold text-[#51706d] transition-colors hover:text-[#1c8061]">Services</a>
            <a href="#routes" data-testid="link-nav-routes" className="focus-ring text-[11px] font-bold text-[#51706d] transition-colors hover:text-[#1c8061]">Routes</a>
            <a href="#why-us" data-testid="link-nav-why" className="focus-ring text-[11px] font-bold text-[#51706d] transition-colors hover:text-[#1c8061]">Why GoRides</a>
            <a href="#enquire" data-testid="link-nav-enquire" className="focus-ring text-[11px] font-bold text-[#51706d] transition-colors hover:text-[#1c8061]">Contact</a>
          </nav>
          <div className="hidden items-center gap-4 lg:flex">
            <a href={`tel:${PHONE_LINK}`} data-testid="link-header-phone" className="focus-ring flex items-center gap-2 text-[11px] font-bold text-[#23454c]">
              <Phone size={14} className="text-[#1c8061]" /> {PHONE_DISPLAY}
            </a>
            <ButtonArrow href="#enquire">Plan a journey</ButtonArrow>
          </div>
          <button type="button" data-testid="button-mobile-menu" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen((open) => !open)} className="focus-ring grid h-11 w-11 place-items-center rounded-full border border-[#c9cfc5] bg-[#f9f5eb]/80 text-[#173b44] lg:hidden">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menuOpen && (
          <nav className="mx-5 rounded-[22px] border border-[#d8d3c6] bg-[#fbf7ee] p-3 shadow-[0_18px_40px_rgba(19,45,53,.12)] lg:hidden" aria-label="Mobile navigation">
            {['services', 'routes', 'why-us', 'enquire'].map((item) => (
              <a key={item} href={`#${item}`} data-testid={`link-mobile-${item}`} onClick={() => setMenuOpen(false)} className="focus-ring block rounded-[14px] px-4 py-3 text-sm font-bold capitalize text-[#23454c] hover:bg-[#e8eee6]">{item.replace('-', ' ')}</a>
            ))}
            <a href={`tel:${PHONE_LINK}`} data-testid="link-mobile-phone" onClick={() => setMenuOpen(false)} className="mt-2 flex items-center gap-2 border-t border-[#ded8ca] px-4 pt-4 text-sm font-bold text-[#1c8061]"><Phone size={15} /> {PHONE_DISPLAY}</a>
          </nav>
        )}
      </header>

      <main>
        <section
          className="relative isolate flex min-h-[700px] items-center overflow-hidden bg-[#f7f3ea] bg-cover bg-center px-5 pb-16 pt-32 md:min-h-[760px] md:px-8 md:pb-24 md:pt-40 lg:pb-28 lg:pt-44"
          style={{ backgroundImage: `url(${sliderBackground})`, backgroundPosition: 'center 54%' }}
        >
          <div className="absolute inset-0" aria-hidden="true" style={{ background: 'linear-gradient(90deg, rgba(247,243,234,.98) 0%, rgba(247,243,234,.9) 38%, rgba(247,243,234,.5) 70%, rgba(247,243,234,.16) 100%), linear-gradient(0deg, rgba(247,243,234,.55), rgba(247,243,234,.12))' }} />
          <div className="absolute -right-44 top-20 h-[480px] w-[480px] rounded-full bg-[#e4ede2] blur-3xl" />
          <div className="relative z-10 mx-auto w-full max-w-[1240px]">
            <div className="min-w-0 max-w-[680px]">
              <div className="reveal inline-flex items-center gap-2 rounded-full border border-[#ccd9cd] bg-[#eef4eb] px-3 py-2 font-mono-ui text-[10px] uppercase tracking-[0.15em] text-[#1c8061]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#f0a936]" /> Bengaluru’s thoughtful travel partner
              </div>
              <h1 className="reveal reveal-delay-1 mt-7 max-w-[680px] text-[clamp(3.5rem,8vw,7rem)] font-medium leading-[.9] tracking-[-0.065em] text-[#173b44]">
                Go farther.<br /><span className="font-display italic text-[#1c8061]">Feel looked after.</span>
              </h1>
              <p className="reveal reveal-delay-2 mt-7 max-w-[520px] text-[15px] leading-7 text-[#5b6d6b] md:text-[17px]">
                Dependable airport transfers and unhurried outstation journeys, planned by people who know Bengaluru — and the roads beyond it.
              </p>
              <div className="reveal reveal-delay-3 mt-8 flex flex-wrap items-center gap-3">
                <ButtonArrow href="#enquire">Tell us your plans</ButtonArrow>
                <ButtonArrow href="#services" secondary>See our services</ButtonArrow>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[#ded8ca] pt-5">
                <div className="flex items-center gap-2 text-[11px] font-bold text-[#526766]"><ShieldCheck size={16} className="text-[#1c8061]" /> Trained drivers</div>
                <div className="flex items-center gap-2 text-[11px] font-bold text-[#526766]"><Clock3 size={16} className="text-[#1c8061]" /> Always on time</div>
                <div className="flex items-center gap-2 text-[11px] font-bold text-[#526766]"><IndianRupee size={16} className="text-[#1c8061]" /> Clear quotes</div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#d9d4c8] bg-[#eee9de] px-5 py-5 md:px-8">
          <div className="mx-auto grid max-w-[1240px] gap-5 sm:grid-cols-3 lg:grid-cols-5 lg:gap-0">
            {[
              ['01', 'Made in Bengaluru', 'Local knowledge, not guesswork'],
              ['02', 'No booking friction', 'One clear conversation'],
              ['03', 'Vehicles we trust', 'Clean, checked, comfortable'],
              ['04', 'Human support', 'Before, during, after'],
              ['05', 'India is open', 'Let’s find your next road'],
            ].map(([number, title, detail], index) => (
              <div key={title} className={`flex items-start gap-3 ${index > 0 ? 'lg:border-l lg:border-[#d0cabe] lg:pl-6' : ''} ${index > 0 ? 'lg:ml-6' : ''}`}>
                <span className="font-mono-ui text-[10px] text-[#1c8061]">{number}</span>
                <div><p className="text-[11px] font-extrabold text-[#23454c]">{title}</p><p className="mt-1 text-[10px] leading-4 text-[#7a8580]">{detail}</p></div>
              </div>
            ))}
          </div>
        </section>

        <section id="route-planner" className="scroll-mt-8 bg-[#173b44] px-5 py-20 text-[#f8f2e5] md:px-8 md:py-28">
          <div className="mx-auto grid max-w-[1240px] items-center gap-12 lg:grid-cols-[.78fr_1.22fr] lg:gap-24">
            <div>
              <SectionLabel light>A route worth taking</SectionLabel>
              <h2 className="max-w-[480px] text-[clamp(2.8rem,5vw,5rem)] leading-[.91] tracking-[-0.06em]">Bengaluru <span className="font-display italic text-[#f6bb4c]">→</span><br />somewhere lovely.</h2>
              <p className="mt-7 max-w-[390px] text-sm leading-7 text-[#b7cfca]">Your trip starts with a simple conversation. Tell us where you want to go, and we’ll shape the road around your time.</p>
              <a href="#enquire" data-testid="link-route-planner-enquire" className="focus-ring mt-8 inline-flex items-center gap-2 border-b border-[#f6bb4c] pb-2 text-[12px] font-bold text-[#f6bb4c] transition-colors hover:text-[#ffdb89]">Plan this journey <ArrowUpRight size={15} /></a>
            </div>
            <div className="relative">
              <HeroRouteSketch />
              <div className="absolute -bottom-5 -left-4 flex max-w-[190px] items-center gap-3 rounded-[18px] border border-[#d8d3c6] bg-[#fbf7ee] p-3 shadow-[0_15px_35px_rgba(19,45,53,.13)] sm:-left-8">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#e9efe7] text-[#1c8061]"><BadgeCheck size={19} /></span>
                <span className="text-[10px] font-bold leading-4 text-[#23454c]">The same friendly face, from booking to drop-off.</span>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="scroll-mt-8 bg-[#f7f3ea] px-5 py-24 md:px-8 md:py-32">
          <div className="mx-auto max-w-[1240px]">
            <div className="grid items-end gap-8 md:grid-cols-[1fr_auto]">
              <div>
                <SectionLabel>Two ways to travel well</SectionLabel>
                <h2 className="max-w-[580px] text-[clamp(2.7rem,5vw,5rem)] leading-[.92] tracking-[-0.06em] text-[#173b44]">Just what you need.<br /><span className="font-display italic text-[#1c8061]">Nothing you don’t.</span></h2>
              </div>
              <p className="max-w-[320px] text-sm leading-6 text-[#687873] md:pb-2">A small, focused service means a better experience. We do airport and outstation journeys — properly.</p>
            </div>
            <div className="mt-14 grid gap-5 lg:grid-cols-[1.12fr_.88fr]">
              <button type="button" data-testid="button-service-outstation" onClick={() => pickService('Outstation')} className="focus-ring group relative min-h-[370px] overflow-hidden rounded-[28px] bg-[#1a4e54] p-7 text-left transition-transform duration-500 hover:-translate-y-1 md:p-10">
                 <img src={outstationImage} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-35 mix-blend-screen transition duration-700 group-hover:scale-105 group-hover:opacity-45" style={{ objectPosition: 'center 54%' }} />
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a4e54]/90 via-[#1a4e54]/85 to-[#102f39]/90" />
                <div className="absolute -right-20 -top-28 h-80 w-80 rounded-full border-[38px] border-[#37766d]/50 transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute bottom-[-80px] right-[-30px] h-64 w-[430px] -rotate-[17deg] rounded-[50%] border-t-[2px] border-[#8cc6ac]/60" />
                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#f6bb4c] text-[#173b44]"><Route size={23} /></span>
                    <ArrowUpRight size={21} className="text-[#c4dfd1] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                  <div className="mt-24">
                    <p className="font-mono-ui text-[10px] uppercase tracking-[0.16em] text-[#9ed2bf]">01 / Outstation</p>
                    <h3 className="mt-3 text-[clamp(2.2rem,4vw,4rem)] leading-[.9] tracking-[-0.05em] text-[#fff9ec]">The long way<br /><span className="font-display italic text-[#f6bb4c]">can be the best way.</span></h3>
                    <p className="mt-5 max-w-[390px] text-sm leading-6 text-[#c3d8d0]">Private cars for weekend escapes, family visits, business travel and the in-between places worth stopping for.</p>
                  </div>
                </div>
              </button>
              <button type="button" data-testid="button-service-airport" onClick={() => pickService('Airport Services')} className="focus-ring group relative min-h-[370px] overflow-hidden rounded-[28px] border border-[#d8d3c6] bg-[#eee9de] p-7 text-left transition-transform duration-500 hover:-translate-y-1 md:p-10">
                 <img src={airportImage} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-55 transition duration-700 group-hover:scale-105 group-hover:opacity-65" style={{ objectPosition: 'center 48%' }} />
                 <div className="absolute inset-0 bg-gradient-to-br from-[#f7f3ea]/90 via-[#eee9de]/60 to-[#dce9e2]/75" />
                <div className="absolute -right-8 top-10 h-52 w-52 rounded-full border border-[#b3c5b6] opacity-70" />
                <div className="absolute -right-2 top-16 h-40 w-40 rounded-full border border-[#b3c5b6] opacity-45" />
                <div className="absolute bottom-8 right-9 text-[#1c8061]/80"><Plane size={108} strokeWidth={.7} className="-rotate-12 transition-transform duration-500 group-hover:rotate-0" /></div>
                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#1c8061] text-[#f8f2e5]"><Plane size={22} /></span>
                    <ArrowUpRight size={21} className="text-[#1c8061] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                  <div className="mt-24 max-w-[390px]">
                    <p className="font-mono-ui text-[10px] uppercase tracking-[0.16em] text-[#1c8061]">02 / Airport services</p>
                    <h3 className="mt-3 text-[clamp(2.2rem,4vw,4rem)] leading-[.9] tracking-[-0.05em] text-[#173b44]">Land easy.<br /><span className="font-display italic text-[#1c8061]">We’ll take it from here.</span></h3>
                    <p className="mt-5 max-w-[390px] text-sm leading-6 text-[#687873]">On-time pickups to and from Bengaluru airport, with flight-aware timing and a driver who knows where to wait.</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </section>

        <section id="why-us" className="scroll-mt-8 bg-[#173b44] px-5 py-24 text-[#f8f2e5] md:px-8 md:py-32">
          <div className="mx-auto grid max-w-[1240px] gap-14 lg:grid-cols-[.85fr_1.15fr] lg:gap-24">
            <div>
              <SectionLabel light>Why people call GoRides</SectionLabel>
              <h2 className="max-w-[460px] text-[clamp(2.8rem,5vw,5rem)] leading-[.91] tracking-[-0.06em]">Travel that feels <span className="font-display italic text-[#f6bb4c]">sorted.</span></h2>
              <p className="mt-7 max-w-[390px] text-sm leading-7 text-[#b7cfca]">The details are small until they’re the only thing you notice. We take care of those.</p>
              <a href="#enquire" data-testid="link-why-enquire" className="focus-ring mt-8 inline-flex items-center gap-2 border-b border-[#f6bb4c] pb-2 text-[12px] font-bold text-[#f6bb4c] transition-colors hover:text-[#ffdb89]">Start a conversation <ArrowUpRight size={15} /></a>
            </div>
            <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
              {[
                { icon: Clock3, title: 'We respect your clock', copy: 'Early flight, late arrival, tight connection — we build the trip around your actual day.' },
                { icon: ShieldCheck, title: 'Comfort is not a luxury', copy: 'Clean vehicles, sensible stops and drivers who know when to talk and when to let you rest.' },
                { icon: IndianRupee, title: 'A quote you can trust', copy: 'No surprise tolls, vague add-ons or awkward end-of-trip math. We say what it costs.' },
                { icon: Headphones, title: 'A human on the other end', copy: 'Message us before you book, while you travel or when you are planning the next one.' },
              ].map(({ icon: Icon, title, copy }, index) => (
                <div key={title} className="border-t border-[#52706f] pt-5">
                  <div className="flex items-start justify-between">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#28545a] text-[#f6bb4c]"><Icon size={19} /></span>
                    <span className="font-mono-ui text-[10px] text-[#86b4a8]">0{index + 1}</span>
                  </div>
                  <h3 className="mt-5 text-base font-extrabold">{title}</h3>
                  <p className="mt-3 text-[13px] leading-6 text-[#b7cfca]">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="routes" className="scroll-mt-8 bg-[#f7f3ea] px-5 py-24 md:px-8 md:py-32">
          <div className="mx-auto max-w-[1240px]">
            <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
              <div>
                <SectionLabel>The roads we know</SectionLabel>
                <h2 className="max-w-[580px] text-[clamp(2.8rem,5vw,5rem)] leading-[.92] tracking-[-0.06em] text-[#173b44]">From Bengaluru,<br /><span className="font-display italic text-[#1c8061]">across India.</span></h2>
              </div>
              <div className="max-w-[280px] text-sm leading-6 text-[#687873]">Have a different destination in mind? Good. <a href="#enquire" data-testid="link-routes-enquire" className="font-bold text-[#1c8061] underline decoration-[#f6bb4c] decoration-2 underline-offset-4">Tell us where.</a></div>
            </div>
            <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {popularRoutes.map((route, index) => (
                  <button type="button" key={route.city} data-testid={`button-route-${route.city.toLowerCase()}`} onClick={() => { updateField('route', route.city); document.querySelector('#enquire')?.scrollIntoView({ behavior: 'smooth' }); }} className="focus-ring group relative min-h-[230px] overflow-hidden rounded-[20px] border border-[#ddd7ca] bg-[#173b44] text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#99bca8] hover:shadow-[0_12px_28px_rgba(19,45,53,.16)]">
                    <img src={route.image} alt={`${route.city} destination`} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#06284a]/95 via-[#06284a]/35 to-[#06284a]/5" />
                    <span className="absolute left-5 top-5 font-mono-ui text-[10px] text-[#f0f7e8]">0{index + 1}</span>
                    <span className="absolute right-5 top-5 rounded-full border border-white/35 bg-[#06284a]/25 px-2.5 py-1 font-mono-ui text-[10px] text-[#f0f7e8] backdrop-blur-sm">{route.distance}</span>
                    <span className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
                      <span>
                        <span className="block text-xl font-extrabold tracking-[-0.03em] text-[#fff9ec]">{route.city}</span>
                        <span className="mt-1 block text-[11px] leading-4 text-[#e0ebe2]">{route.detail}</span>
                      </span>
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#b7f21d] text-[#06284a]">
                        <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </span>
                  </button>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f0eadd] px-5 py-20 md:px-8 md:py-24">
          <div className="mx-auto max-w-[1240px]">
            <SectionLabel>How it works</SectionLabel>
            <div className="grid gap-8 md:grid-cols-3 md:gap-12">
              {[
                ['01', 'Share the sketch', 'A WhatsApp note, a quick call or the form below. Tell us the route, date and who’s coming.'],
                ['02', 'We make it clear', 'We’ll recommend the right vehicle, share one honest quote and confirm the small details.'],
                ['03', 'You just go', 'Your driver arrives ready. We stay close enough to help, and out of the way enough to let you travel.'],
              ].map(([number, title, copy]) => (
                <div key={number} className="relative border-t border-[#cfc7b8] pt-5">
                  <span className="font-mono-ui text-[11px] text-[#1c8061]">{number}</span>
                  <h3 className="mt-6 text-xl font-extrabold tracking-[-0.03em] text-[#173b44]">{title}</h3>
                  <p className="mt-3 max-w-[290px] text-[13px] leading-6 text-[#687873]">{copy}</p>
                  {number !== '03' && <ArrowDownRight className="absolute right-2 top-6 hidden text-[#a3b9a7] md:block" size={24} />}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="enquire" className="scroll-mt-8 bg-[#173b44] px-5 py-20 md:px-8 md:py-28">
          <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[.75fr_1.25fr] lg:gap-24">
            <div className="text-[#f8f2e5]">
              <SectionLabel light>Let’s get you moving</SectionLabel>
              <h2 className="max-w-[440px] text-[clamp(3rem,5vw,5.5rem)] leading-[.88] tracking-[-0.06em]">Your next good road starts with a <span className="font-display italic text-[#f6bb4c]">hello.</span></h2>
              <p className="mt-7 max-w-[370px] text-sm leading-7 text-[#b7cfca]">Share a few details. We’ll come back with a sensible plan, the right vehicle and a clear quote.</p>
              <div className="mt-10 space-y-4 border-t border-[#52706f] pt-6">
                <a href={`tel:${PHONE_LINK}`} data-testid="link-enquiry-phone" className="focus-ring flex items-center gap-3 text-[13px] font-bold text-[#f8f2e5] hover:text-[#f6bb4c]"><Phone size={17} className="text-[#f6bb4c]" /> {PHONE_DISPLAY}</a>
                <a href={`mailto:${EMAIL}`} data-testid="link-enquiry-email" className="focus-ring flex items-center gap-3 text-[13px] font-bold text-[#f8f2e5] hover:text-[#f6bb4c]"><Mail size={17} className="text-[#f6bb4c]" /> {EMAIL}</a>
                <p className="flex items-center gap-3 text-[12px] text-[#9ebcb3]"><MapPin size={17} className="text-[#f6bb4c]" /> Based in Bengaluru, going everywhere</p>
              </div>
            </div>
            <div className="rounded-[28px] bg-[#fbf7ee] p-5 shadow-[0_20px_60px_rgba(5,33,40,.2)] md:p-8">
              {!submitted ? (
                <form onSubmit={handleSubmit} noValidate data-testid="form-enquiry">
                  <div className="mb-7 flex items-center justify-between border-b border-[#ded8ca] pb-5">
                    <div><p className="font-mono-ui text-[10px] uppercase tracking-[0.16em] text-[#1c8061]">Quick enquiry</p><h3 className="mt-2 text-2xl font-extrabold tracking-[-0.04em] text-[#173b44]">Tell us the shape of your trip.</h3></div>
                    <Sparkles className="hidden text-[#e9a536] sm:block" size={25} />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block"><span className="mb-2 block text-[11px] font-extrabold text-[#526766]">Your name</span><input data-testid="input-name" value={enquiry.name} onChange={(event) => updateField('name', event.target.value)} placeholder="What should we call you?" className="focus-ring h-12 w-full rounded-[13px] border border-[#d8d3c6] bg-[#f8f3e9] px-4 text-sm text-[#173b44] placeholder:text-[#9aa39e]" />{errors.name && <span className="mt-1 block text-[10px] text-[#b84b3d]">{errors.name}</span>}</label>
                    <label className="block"><span className="mb-2 block text-[11px] font-extrabold text-[#526766]">Phone number</span><input data-testid="input-phone" value={enquiry.phone} onChange={(event) => updateField('phone', event.target.value)} placeholder="+91 ..." type="tel" className="focus-ring h-12 w-full rounded-[13px] border border-[#d8d3c6] bg-[#f8f3e9] px-4 text-sm text-[#173b44] placeholder:text-[#9aa39e]" />{errors.phone && <span className="mt-1 block text-[10px] text-[#b84b3d]">{errors.phone}</span>}</label>
                    <label className="block"><span className="mb-2 block text-[11px] font-extrabold text-[#526766]">Email address</span><input data-testid="input-email" value={enquiry.email} onChange={(event) => updateField('email', event.target.value)} placeholder="you@example.com" type="email" className="focus-ring h-12 w-full rounded-[13px] border border-[#d8d3c6] bg-[#f8f3e9] px-4 text-sm text-[#173b44] placeholder:text-[#9aa39e]" />{errors.email && <span className="mt-1 block text-[10px] text-[#b84b3d]">{errors.email}</span>}</label>
                    <label className="block"><span className="mb-2 block text-[11px] font-extrabold text-[#526766]">I need</span><span className="relative block"><select data-testid="select-service" value={enquiry.service} onChange={(event) => updateField('service', event.target.value)} className="focus-ring h-12 w-full appearance-none rounded-[13px] border border-[#d8d3c6] bg-[#f8f3e9] px-4 pr-10 text-sm text-[#173b44]"><option>Outstation</option><option>Airport Services</option></select><ChevronDown className="pointer-events-none absolute right-4 top-4 text-[#1c8061]" size={16} /></span></label>
                    <label className="block"><span className="mb-2 block text-[11px] font-extrabold text-[#526766]">Route / destination</span><input data-testid="input-route" value={enquiry.route} onChange={(event) => updateField('route', event.target.value)} placeholder="Bengaluru to ..." className="focus-ring h-12 w-full rounded-[13px] border border-[#d8d3c6] bg-[#f8f3e9] px-4 text-sm text-[#173b44] placeholder:text-[#9aa39e]" />{errors.route && <span className="mt-1 block text-[10px] text-[#b84b3d]">{errors.route}</span>}</label>
                    <label className="block"><span className="mb-2 block text-[11px] font-extrabold text-[#526766]">Travel date <span className="font-normal text-[#9aa39e]">(optional)</span></span><span className="relative block"><input data-testid="input-date" type="date" value={enquiry.date} onChange={(event) => updateField('date', event.target.value)} className="focus-ring h-12 w-full rounded-[13px] border border-[#d8d3c6] bg-[#f8f3e9] px-4 text-sm text-[#173b44]" /><CalendarDays className="pointer-events-none absolute right-4 top-4 text-[#1c8061]" size={16} /></span></label>
                    <label className="block"><span className="mb-2 block text-[11px] font-extrabold text-[#526766]">Travellers</span><span className="relative block"><select data-testid="select-passengers" value={enquiry.passengers} onChange={(event) => updateField('passengers', event.target.value)} className="focus-ring h-12 w-full appearance-none rounded-[13px] border border-[#d8d3c6] bg-[#f8f3e9] px-4 pr-10 text-sm text-[#173b44]"><option>1–3 people</option><option>4–6 people</option><option>7–16 people</option><option>17+ people</option></select><ChevronDown className="pointer-events-none absolute right-4 top-4 text-[#1c8061]" size={16} /></span></label>
                    <label className="block"><span className="mb-2 block text-[11px] font-extrabold text-[#526766]">Anything we should know? <span className="font-normal text-[#9aa39e]">(optional)</span></span><input data-testid="input-notes" value={enquiry.notes} onChange={(event) => updateField('notes', event.target.value)} placeholder="Flight number, extra stop, special request..." className="focus-ring h-12 w-full rounded-[13px] border border-[#d8d3c6] bg-[#f8f3e9] px-4 text-sm text-[#173b44] placeholder:text-[#9aa39e]" /></label>
                  </div>
                  <button type="submit" data-testid="button-submit-enquiry" className="focus-ring mt-7 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#1c8061] px-5 py-4 text-[12px] font-extrabold text-[#f8f2e5] shadow-[0_12px_24px_rgba(28,128,97,.2)] transition-all hover:-translate-y-0.5 hover:bg-[#246f58]">Create my enquiry <ArrowUpRight size={16} /></button>
                  <p className="mt-4 text-center text-[10px] leading-4 text-[#8b948f]">No backend form here — we’ll prepare your message so you can send it by Gmail or WhatsApp.</p>
                </form>
              ) : (
                <div id="confirmation" data-testid="status-enquiry-confirmation" className="py-5">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#dceee0] text-[#1c8061]"><Check size={28} strokeWidth={2.5} /></div>
                  <p className="mt-7 font-mono-ui text-[10px] uppercase tracking-[0.16em] text-[#1c8061]">Your trip sketch is ready</p>
                  <h3 className="mt-3 text-3xl leading-tight tracking-[-0.05em] text-[#173b44]">Thanks, {submitted.name.split(' ')[0] || 'there'}.</h3>
                  <p className="mt-4 max-w-[480px] text-sm leading-6 text-[#687873]">We’ve shaped your enquiry for {submitted.service.toLowerCase()} from Bengaluru to {submitted.route}. Choose where you’d like to send it — we’ll take it from there.</p>
                  <div className="mt-7 grid gap-3 sm:grid-cols-2">
                    <a href={gmailHref} target="_blank" rel="noreferrer" data-testid="link-send-gmail" className="focus-ring flex items-center justify-center gap-2 rounded-full bg-[#1c8061] px-4 py-3 text-[12px] font-extrabold text-[#f8f2e5] transition-colors hover:bg-[#246f58]"><Mail size={16} /> Open Gmail draft</a>
                    <a href={whatsappHref} target="_blank" rel="noreferrer" data-testid="link-send-whatsapp" className="focus-ring flex items-center justify-center gap-2 rounded-full bg-[#e0f0e0] px-4 py-3 text-[12px] font-extrabold text-[#1c8061] transition-colors hover:bg-[#cce6d0]"><MessageCircle size={16} /> Send on WhatsApp</a>
                  </div>
                  <button type="button" data-testid="button-reset-enquiry" onClick={() => { setSubmitted(null); setEnquiry(emptyEnquiry); }} className="focus-ring mt-6 inline-flex items-center gap-2 text-[11px] font-bold text-[#687873] underline decoration-[#f6bb4c] decoration-2 underline-offset-4">Start another enquiry <ArrowUpRight size={14} /></button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#102f39] px-5 py-10 text-[#d9e5dc] md:px-8">
        <div className="mx-auto max-w-[1240px]">
          <div className="flex flex-col justify-between gap-8 border-b border-[#496563] pb-9 md:flex-row md:items-end">
            <div><Logo inverse /><p className="mt-5 max-w-[270px] text-[12px] leading-5 text-[#9ebcb3]">Airport days, outstation stories and the road in between. Bengaluru-based, India-bound.</p></div>
            <div className="flex flex-wrap gap-x-7 gap-y-3 text-[11px] font-bold text-[#c5d7d0]">
              <a href="#services" data-testid="link-footer-services" className="focus-ring hover:text-[#f6bb4c]">Services</a><a href="#routes" data-testid="link-footer-routes" className="focus-ring hover:text-[#f6bb4c]">Routes</a><a href="#why-us" data-testid="link-footer-why" className="focus-ring hover:text-[#f6bb4c]">Why GoRides</a><a href="#enquire" data-testid="link-footer-contact" className="focus-ring hover:text-[#f6bb4c]">Contact</a>
              <a href="https://www.instagram.com/invites/contact/?utm_source=ig_contact_invite&utm_medium=copy_link&utm_content=eeioubv" target="_blank" rel="noreferrer" data-testid="link-footer-instagram" aria-label="GoRides India on Instagram" className="focus-ring inline-flex items-center gap-1.5 hover:text-[#f6bb4c]"><Instagram size={13} /> Instagram</a>
              <a href="https://share.google/sQzCSCORYqydjOlAH" target="_blank" rel="noreferrer" data-testid="link-footer-google" aria-label="GoRides India on Google" className="focus-ring inline-flex items-center gap-1.5 hover:text-[#f6bb4c]"><MapPin size={13} /> Google</a>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-3 pt-6 text-[10px] text-[#88a9a0] sm:flex-row sm:items-center">
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5">
              <span>© 2025 GoRides India. Travel well.</span>
              <span className="inline-flex items-start gap-1.5 leading-4"><MapPin size={12} className="mt-0.5 shrink-0 text-[#f6bb4c]" /> 927, New Friends Colony, S T Bed Layout, Koramangala, Bengaluru, Karnataka 560047</span>
            </div>
            <span className="font-mono-ui tracking-[0.12em]">BENGALURU / INDIA</span>
          </div>
        </div>
      </footer>
      <a href={whatsappHref} target="_blank" rel="noreferrer" data-testid="link-floating-whatsapp" aria-label="Message GoRides on WhatsApp" className="whatsapp-blink focus-ring fixed bottom-5 right-5 z-30 inline-flex h-14 w-14 items-center justify-center gap-2 rounded-full bg-[#f6bb4c] text-[#173b44] shadow-[0_10px_24px_rgba(19,45,53,.22)] transition-transform hover:scale-105 sm:w-auto sm:px-4"><MessageCircle size={23} /><span className="hidden text-[11px] font-extrabold sm:inline">WhatsApp us</span></a>
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <WouterRoute path="/" component={Home} />
        <WouterRoute component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;