import { useEffect, useState, useRef } from 'react';
import './LandingPage.css';

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.05, rootMargin: '0px 0px -32px 0px' }
    );
    document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
    document.querySelectorAll('[data-reveal-line]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function useCountUp(target, duration = 2000) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 4);
      setValue(Math.floor(ease * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return value;
}

function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      setPct(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div className="scroll-progress" style={{ width: `${pct}%` }} aria-hidden="true" />;
}

function StickyBar() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const heroH = document.querySelector('.hero')?.offsetHeight || 600;
      const ctaEl = document.querySelector('#cta');
      const ctaTop = ctaEl ? ctaEl.getBoundingClientRect().top : 9999;
      setVisible(window.scrollY > heroH - 80 && ctaTop > 80);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className={`sticky-bar${visible ? ' sticky-bar--visible' : ''}`} aria-hidden={!visible}>
      <div className="sticky-bar__inner">
        <div className="sticky-bar__left">
          <div className="sticky-bar__logo">IK</div>
          <div>
            <div className="sticky-bar__title">Immokalkulator</div>
            <div className="sticky-bar__sub">140+ aktive Berater · ★★★★★</div>
          </div>
        </div>
        <div className="sticky-bar__right">
          <span className="sticky-bar__proof">Kostenlos · Keine Kreditkarte</span>
          <a href="#cta" className="btn-primary btn--sm">5 Analysen gratis →</a>
        </div>
      </div>
    </div>
  );
}

/* ── TYPEWRITER HOOK ──────────────────────────────── */
function useTypewriter(text, charDelay = 60, startDelay = 800) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const prefersReduced = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (prefersReduced) { setDisplayed(text); setDone(true); return; }
    let i = 0;
    const start = setTimeout(() => {
      const tick = () => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i < text.length) setTimeout(tick, charDelay);
        else setDone(true);
      };
      tick();
    }, startDelay);
    return () => clearTimeout(start);
  }, [text, charDelay, startDelay, prefersReduced]);

  return { displayed, done };
}

/* ── FAQ ACCORDION ────────────────────────────────── */
const faqItems = [
  {
    q: 'Was passiert nach den 5 kostenlosen Analysen?',
    a: 'Du wechselst einfach in den Pro-Plan — oder nutzt den Starter weiter. 5 Analysen pro Monat bleiben dauerhaft gratis. Keine automatische Abbuchung, kein Verstecken hinter Paywalls.'
  },
  {
    q: 'Kann ich meinen eigenen Briefkopf im PDF verwenden?',
    a: 'Im Team-Plan ist eigenes Branding inklusive: Logo, Firmenfarben, Kontaktdaten. Im Pro-Plan erscheint ein Immokalkulator-Logo im PDF.'
  },
  {
    q: 'Sind meine Kundendaten DSGVO-konform gesichert?',
    a: 'Ja. Alle Daten werden auf deutschen Servern gespeichert, verschlüsselt übertragen (TLS) und nicht an Dritte weitergegeben. Volle DSGVO-Konformität.'
  },
  {
    q: 'Brauche ich eine Einschulung oder technisches Wissen?',
    a: 'Nein. Die meisten Nutzer machen ihre erste vollständige Analyse innerhalb von 5 Minuten — ohne Anleitung. Einfach Objekt eingeben, fertig.'
  },
  {
    q: 'Funktioniert Immokalkulator auch auf dem Tablet im Kundengespräch?',
    a: 'Ja, vollständig responsive. Viele Makler nutzen es täglich direkt auf dem iPad beim Kunden — das macht den stärksten Eindruck.'
  },
  {
    q: 'Wie kündige ich?',
    a: 'Jederzeit, mit einem Klick im Account-Bereich. Keine Kündigungsfrist, keine langen Formulare, keine versteckten Hürden.'
  },
];

function FaqAccordion() {
  const [open, setOpen] = useState(null);
  return (
    <div className="faq__list" data-reveal>
      {faqItems.map((item, i) => (
        <div key={i} className={`faq__item${open === i ? ' faq__item--open' : ''}`} style={{ transitionDelay: `${i * 0.06}s` }}>
          <button className="faq__q" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
            <span>{item.q}</span>
            <span className="faq__icon" aria-hidden="true">{open === i ? '×' : '+'}</span>
          </button>
          <div className="faq__a" aria-hidden={open !== i}>
            <div className="faq__a-inner">{item.a}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── ANIMATED HERO DASHBOARD ──────────────────────── */
function HeroDashboard() {
  const [started, setStarted] = useState(false);
  const [rendite, setRendite] = useState(0);
  const [cashflow, setCashflow] = useState(0);
  const [ekRendite, setEkRendite] = useState(0);
  const dashRef = useRef(null);

  useEffect(() => {
    if (!dashRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(dashRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    function countTo(setter, target, delay) {
      const timer = setTimeout(() => {
        let t0 = null;
        const dur = 1600;
        const step = (ts) => {
          if (!t0) t0 = ts;
          const p = Math.min((ts - t0) / dur, 1);
          const ease = 1 - Math.pow(1 - p, 4);
          setter(ease * target);
          if (p < 1) requestAnimationFrame(step);
          else setter(target);
        };
        requestAnimationFrame(step);
      }, delay);
      return timer;
    }
    const t1 = countTo(setRendite,  4.8,  300);
    const t2 = countTo(setCashflow, 382,  480);
    const t3 = countTo(setEkRendite,11.2, 640);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [started]);

  const fmt1 = (v) => v.toFixed(1).replace('.', ',');
  const fmt0 = (v) => Math.round(v);

  return (
    <div className="dash" ref={dashRef}>
      <div className="dash__bar">
        <div className="dash__dots"><span/><span/><span/></div>
        <span className="dash__url">
          immokalkulator.de · München Maxvorstadt
          {started && <span className="dash__cursor" aria-hidden="true">|</span>}
        </span>
      </div>
      <div className="dash__layout">
        <aside className="dash__sidebar">
          <div className="dash__sidebar-logo">IK</div>
          {['◈','⊞','◎','⬡','↗','□'].map((ic, i) => (
            <div key={i} className={`dash__sidebar-item${i===1?' active':''}`}>{ic}</div>
          ))}
        </aside>
        <div className="dash__main">
          <div className="dash__header-row">
            <div>
              <div className="dash__prop-title">Maxvorstadt 14B — 3 Zi., 78 m²</div>
              <div className="dash__prop-sub">Kaufpreis: 620.000 € · EK: 20 %</div>
            </div>
            <div className="dash__live"><span className="dash__live-dot"/>Live</div>
          </div>
          <div className="dash__kpis">
            <div className="dash__kpi dash__kpi--hl">
              <div className="dash__kpi-label">Netto-Rendite</div>
              <div className="dash__kpi-val">{fmt1(rendite)}<span>%</span></div>
              <div className="dash__kpi-delta up">↑ +0,3 %</div>
            </div>
            <div className="dash__kpi">
              <div className="dash__kpi-label">Monatl. Cashflow</div>
              <div className="dash__kpi-val">+{fmt0(cashflow)}<span>€</span></div>
              <span className="dash__badge green">Positiv</span>
            </div>
            <div className="dash__kpi">
              <div className="dash__kpi-label">EK-Rendite</div>
              <div className="dash__kpi-val">{fmt1(ekRendite)}<span>%</span></div>
              <span className="dash__badge green">Stark</span>
            </div>
            <div className="dash__kpi">
              <div className="dash__kpi-label">Stresstest +2%</div>
              <div className="dash__kpi-val-sm">Tragbar</div>
              <span className="dash__badge green">✓</span>
            </div>
          </div>
          <div className="dash__bars-wrap">
            <div className="dash__bars-label">Cashflow 12 Monate</div>
            <div className="dash__bars">
              {[62,68,72,65,80,75,88,82,91,86,95,100].map((h,i)=>(
                <div key={i} className="dash__bar-col">
                  <div className="dash__bar-fill" style={{
                    height: `${h}%`,
                    animation: started
                      ? `bar-grow 0.7s cubic-bezier(0.16,1,0.3,1) ${0.35 + i * 0.045}s both`
                      : 'none',
                    transform: started ? undefined : 'scaleY(0)',
                    transformOrigin: 'bottom',
                  }}/>
                  <span className="dash__bar-lbl">{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="dash__tags">
            <span className="dash__tag dash__tag--gold">⬡ KfW 300</span>
            <span className="dash__tag">PDF bereit</span>
            <span className="dash__tag">2 Objekte</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCounter({ num, label, sublabel, prefix = '', suffix = '', qualifier = '' }) {
  const [started, setStarted] = useState(false);
  const elRef = (el) => {
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.4 }
    );
    obs.observe(el);
  };
  const display = useCountUp(started ? num : 0, 2000);
  return (
    <div className="stat" ref={elRef}>
      {qualifier && <div className="stat__qualifier">{qualifier}</div>}
      <div className="stat__num">{prefix}{display.toLocaleString('de-DE')}{suffix}</div>
      <div className="stat__label">{label}</div>
      {sublabel && <div className="stat__sublabel">{sublabel}</div>}
    </div>
  );
}

/* Wrap key numbers/phrases in testimonials with gold highlight span */
function hilite(text) {
  const re = /(\b\d+\s*%|\b\d+\s*Kollegen\b|zwei Wochen|eine Stunde)/g;
  const parts = [];
  let last = 0, m;
  re.lastIndex = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push(<span key={m.index} className="testi__hl">{m[0]}</span>);
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

const featureList = [
  {
    num: '01', tag: 'Kernfunktion', title: 'Cashflow-Kalkulator',
    desc: 'Weißt sofort, ob sich das Investment lohnt. Vollständige Ein- und Ausgabenrechnung inkl. Steuer, Instandhaltung und Leerstand — auf den Cent genau.',
    svg: <svg viewBox="0 0 40 40" fill="none"><rect x="4" y="24" width="6" height="12" rx="1.5" fill="currentColor" opacity=".3"/><rect x="17" y="16" width="6" height="20" rx="1.5" fill="currentColor" opacity=".6"/><rect x="30" y="6" width="6" height="30" rx="1.5" fill="currentColor"/><path d="M6 18l11-7 8 5 11-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  },
  {
    num: '02', tag: 'Kernfunktion', title: 'Renditeanalyse',
    desc: 'Brutto, Netto, Eigenkapital — alle Renditekennzahlen auf einen Blick. Inkl. Wertsteigerungsprognose, damit dein Kunde die Gesamtchance sieht.',
    svg: <svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="15" stroke="currentColor" strokeWidth="2" opacity=".2"/><path d="M20 5a15 15 0 0115 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/><path d="M20 20l9-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="20" cy="20" r="3" fill="currentColor"/></svg>
  },
  {
    num: '03', tag: 'Einzigartig', title: 'Stresstest & Risiko',
    desc: 'Entkräfte jeden Einwand. Zeige deinem Kunden schwarz auf weiß, was im Worst Case passiert — und warum es trotzdem trägt.',
    svg: <svg viewBox="0 0 40 40" fill="none"><path d="M20 4l16 28H4L20 4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" opacity=".25"/><path d="M20 4l16 28H4L20 4z" fill="currentColor" opacity=".07"/><line x1="20" y1="16" x2="20" y2="25" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/><circle cx="20" cy="29" r="1.5" fill="currentColor"/></svg>
  },
  {
    num: '04', tag: 'Förderprogramme', title: 'KfW-Integration',
    desc: 'Förderpotenzial, das kein Konkurrent auf dem Schirm hat. KfW-Zuschüsse automatisch berechnet — direkt im Gespräch.',
    svg: <svg viewBox="0 0 40 40" fill="none"><path d="M20 6l3.5 7 7.5 1.1-5.5 5.3 1.3 7.6L20 23.5l-6.8 3.5 1.3-7.6-5.5-5.3 7.5-1.1z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><path d="M20 10l2.5 5 5.5.8-4 3.8.9 5.4L20 22.5l-4.9 2.5.9-5.4-4-3.8 5.5-.8z" fill="currentColor" opacity=".2"/></svg>
  },
  {
    num: '05', tag: 'Beratungs-Tool', title: 'Vergleichsmodus',
    desc: 'Dein Kunde zögert zwischen zwei Objekten? Zeige den direkten Vergleich live — und triff gemeinsam die richtige Entscheidung.',
    svg: <svg viewBox="0 0 40 40" fill="none"><rect x="4" y="8" width="14" height="24" rx="2.5" stroke="currentColor" strokeWidth="2" opacity=".4"/><rect x="22" y="8" width="14" height="24" rx="2.5" stroke="currentColor" strokeWidth="2"/><line x1="18" y1="20" x2="22" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
  },
  {
    num: '06', tag: 'Sofort einsetzbar', title: 'PDF-Export',
    desc: 'Ein Klick. Ein bankfertiger Bericht. Kein Nacharbeiten, kein Excel, kein Warten.',
    svg: <svg viewBox="0 0 40 40" fill="none"><rect x="8" y="4" width="24" height="32" rx="2.5" stroke="currentColor" strokeWidth="2"/><line x1="14" y1="13" x2="26" y2="13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity=".5"/><line x1="14" y1="19" x2="26" y2="19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity=".5"/><line x1="14" y1="25" x2="20" y2="25" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity=".5"/><path d="M22 27l3.5 3.5 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  },
];

/* ── HERO HEADLINE mit Typewriter ─────────────────── */
function HeroHeadline() {
  const { displayed, done } = useTypewriter('analysiert.', 58, 900);
  return (
    <h1 className="hero__h1" data-reveal data-delay="1">
      Mehr Abschlüsse.<br />
      In 60 Sekunden<br />
      <em>
        {displayed}
        {!done && <span className="hero__cursor" aria-hidden="true">|</span>}
      </em>
    </h1>
  );
}

/* ── Animated toggle sequence for Card 2 ────────────── */
function AnimatedToggles() {
  const ref = useRef(null);
  const [phase, setPhase] = useState(0); // 0=all off, 1=first on, 2=both on

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) { setPhase(2); return; }
    const el = ref.current;
    if (!el) return;
    let t1, t2;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        t1 = setTimeout(() => setPhase(1), 420);
        t2 = setTimeout(() => setPhase(2), 740);
        obs.disconnect();
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => { obs.disconnect(); clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div ref={ref} className="howto__preview howto__preview--toggles">
      <div className="hwp__field">
        <span className="hwp__label">Stresstest +2 %</span>
        <span className={`hwp__switch${phase >= 1 ? ' hwp__switch--on' : ''}`} aria-hidden="true" />
      </div>
      <div className="hwp__field">
        <span className="hwp__label">KfW 300</span>
        <span className={`hwp__switch${phase >= 2 ? ' hwp__switch--on' : ''}`} aria-hidden="true" />
      </div>
      <div className="hwp__field hwp__field--last">
        <span className="hwp__label">Vergleichsmodus</span>
        <span className="hwp__switch" aria-hidden="true" />
      </div>
    </div>
  );
}

export default function LandingPage() {
  useReveal();

  // ── Mouse parallax on hero visual ───────────────
  useEffect(() => {
    const hero = document.querySelector('.hero');
    const visual = document.querySelector('.hero__visual');
    if (!visual) return;
    let tX = 0, tY = 0, cX = 0, cY = 0, raf;
    const onMove = (e) => {
      const rect = hero?.getBoundingClientRect() || { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };
      tX = ((e.clientX - rect.left) / rect.width  - 0.5) * -10;
      tY = ((e.clientY - rect.top)  / rect.height - 0.5) * -7;
    };
    const loop = () => {
      cX += (tX - cX) * 0.055;
      cY += (tY - cY) * 0.055;
      if (visual.classList.contains('visible')) {
        visual.style.transform = `translate(${cX.toFixed(2)}px, ${cY.toFixed(2)}px)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, []);

  // ── Active nav section ────────────────────────────
  const [activeSection, setActiveSection] = useState('');
  useEffect(() => {
    const ids = ['features', 'zielgruppen', 'pricing', 'cta'];
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { threshold: 0.25, rootMargin: '-15% 0px -60% 0px' }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  // ── Form state ────────────────────────────────────
  const [formState, setFormState] = useState('idle'); // idle | loading | success
  const [emailError, setEmailError] = useState(false);
  const emailRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current?.value || '';
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError(true);
      setTimeout(() => setEmailError(false), 600);
      return;
    }
    setFormState('loading');
    setTimeout(() => setFormState('success'), 1800);
  };

  return (
    <>
      <ScrollProgress />
      <StickyBar />
      {/* Film grain overlay */}
      <div className="grain" aria-hidden="true" />

      {/* ── NAV ─────────────────────────────────── */}
      <nav className="nav">
        <div className="nav__inner">
          <a href="#" className="nav__logo">
            <svg className="nav__logo-icon" viewBox="0 0 24 24" fill="none">
              <rect x="1" y="13" width="5" height="9" rx="1" fill="currentColor" opacity=".4"/>
              <rect x="9.5" y="8" width="5" height="14" rx="1" fill="currentColor" opacity=".7"/>
              <rect x="18" y="2" width="5" height="20" rx="1" fill="currentColor"/>
            </svg>
            Immokalkulator
          </a>
          <ul className="nav__links">
            <li><a href="#features" className={activeSection === 'features' ? 'nav__link--active' : ''}>Funktionen</a></li>
            <li><a href="#zielgruppen" className={activeSection === 'zielgruppen' ? 'nav__link--active' : ''}>Für wen</a></li>
            <li><a href="#pricing" className={activeSection === 'pricing' ? 'nav__link--active' : ''}>Preise</a></li>
          </ul>
          <div className="nav__actions">
            <a href="#" className="btn-ghost">Anmelden</a>
            <a href="#cta" className="btn-primary btn--sm">Kostenlos testen →</a>
          </div>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────── */}
      <section className="hero">
        <div className="hero__content">
          <div className="hero__badge" data-reveal>
            <span className="hero__badge-dot" />
            Makler &amp; Finanzierungsberater
          </div>

          <HeroHeadline />

          <p className="hero__sub" data-reveal data-delay="2">
            Zeige deinen Kunden live, warum sich ein Objekt rechnet — mit Zahlen statt Bauchgefühl. Fertige PDF-Berichte inklusive.
          </p>

          <div className="hero__actions" data-reveal data-delay="3">
            <a href="#cta" className="btn-primary btn--lg">
              5 Analysen gratis — jetzt starten
            </a>
            <a href="#features" className="btn-outline-light btn--lg">Demo ansehen</a>
          </div>

          <div className="hero__social" data-reveal data-delay="4">
            <div className="hero__avatars">
              {['MK','SR','JH','TL','BF'].map((init, i) => (
                <span key={i} className={`hero__avatar hero__avatar--${i+1}`}>{init}</span>
              ))}
            </div>
            <div>
              <div className="hero__stars">★★★★★</div>
              <div className="hero__social-text"><strong>140+</strong> aktive Berater</div>
            </div>
          </div>
        </div>

        {/* Dashboard — rechte Spalte */}
        <div className="hero__visual" data-reveal data-delay="2">
          <HeroDashboard />
          {/* floating cards */}
          <div className="hero__float hero__float--tl">
            <span>⚡</span>
            <div><div className="hf-label">Analysezeit</div><div className="hf-val">47 Sek.</div></div>
          </div>
          <div className="hero__float hero__float--br">
            <span>✓</span>
            <div><div className="hf-label">PDF-Export</div><div className="hf-val">Bankfertig</div></div>
          </div>
        </div>
      </section>

      {/* ── TICKER ──────────────────────────────── */}
      <div className="logos logos--dual">
        <span className="logos__label">Täglich genutzt von</span>
        <div className="logos__tracks">
          <div className="logos__track-wrap">
            <div className="logos__track">
              {[...Array(2)].flatMap((_,r) =>
                ['Immobilienmakler','Finanzierungsberater','Kapitalanlageberater','Baufinanzierungsexperten','Vermögensberater','Investmentberater','Immobilienverwalter','Kreditvermittler'].map((l,i)=>(
                  <span key={`a-${r}-${i}`} className="logos__item">{l}</span>
                ))
              )}
            </div>
          </div>
          <div className="logos__track-wrap">
            <div className="logos__track logos__track--features">
              {[...Array(2)].flatMap((_,r) =>
                ['Cashflow-Kalkulator','Renditeanalyse','Stresstest & Risiko','KfW-Integration','PDF-Export','Vergleichsmodus','Steuerberechnung','Wertsteigerungsprognose'].map((l,i)=>(
                  <span key={`b-${r}-${i}`} className="logos__item logos__item--feat">{l}</span>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── HOW IT WORKS ────────────────────────── */}
      <section className="howto">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="label-tag">So einfach</span>
            <h2>In 3 Schritten<br /><em>zum Abschluss.</em></h2>
          </div>
          <div className="howto__grid">

            {/* STEP 1 */}
            <div className="howto__card" data-reveal data-delay="1">
              <div className="howto__card-head">
                <span className="howto__card-num">01</span>
                <span className="howto__card-tag">60 Sekunden</span>
              </div>
              <div className="howto__preview howto__preview--form">
                <div className="hwp__field">
                  <span className="hwp__label">Adresse</span>
                  <span className="hwp__leader" aria-hidden="true" />
                  <span className="hwp__val">Maxvorstadt 14B</span>
                </div>
                <div className="hwp__field">
                  <span className="hwp__label">Kaufpreis</span>
                  <span className="hwp__leader" aria-hidden="true" />
                  <span className="hwp__val">620.000 €</span>
                </div>
                <div className="hwp__field hwp__field--last">
                  <span className="hwp__label">Eigenkapital</span>
                  <span className="hwp__leader" aria-hidden="true" />
                  <span className="hwp__val hwp__val--gold">20 %</span>
                </div>
              </div>
              <div className="howto__card-body">
                <span className="howto__step-label">Schritt 01</span>
                <h3 className="howto__card-title">Objekt eingeben</h3>
                <p className="howto__card-desc">Adresse, Kaufpreis und Eigenkapital — fertig. Dauert unter 60 Sekunden.</p>
              </div>
            </div>

            <div className="howto__arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>

            {/* STEP 2 */}
            <div className="howto__card" data-reveal data-delay="2">
              <div className="howto__card-head">
                <span className="howto__card-num">02</span>
                <span className="howto__card-tag">Live-Vorschau</span>
              </div>
              <AnimatedToggles />
              <div className="howto__card-body">
                <span className="howto__step-label">Schritt 02</span>
                <h3 className="howto__card-title">Analyse anpassen</h3>
                <p className="howto__card-desc">Stresstest, KfW-Förderung, Szenarien — ein Klick je Einstellung. Sofort live.</p>
              </div>
            </div>

            <div className="howto__arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>

            {/* STEP 3 */}
            <div className="howto__card howto__card--finale" data-reveal data-delay="3">
              <div className="howto__card-head">
                <span className="howto__card-num howto__card-num--gold">03</span>
                <span className="howto__card-tag howto__card-tag--gold">Bankfertig</span>
              </div>
              <div className="howto__preview howto__preview--pdf">
                <div className="hwp__stamp" aria-hidden="true">✓</div>
                <div className="hwp__doc-preview">
                  <div className="hwp__doc-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" strokeWidth="1.6"/><polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="1.6"/></svg>
                  </div>
                  <div className="hwp__doc-lines">
                    <span className="hwp__line hwp__line--wide" />
                    <span className="hwp__line" />
                    <span className="hwp__line hwp__line--mid" />
                  </div>
                </div>
                <div className="hwp__doc-info">
                  <div className="hwp__pdf-name">Analyse_Maxvorstadt.pdf</div>
                  <div className="hwp__pdf-badge">
                    <span className="hwp__badge-dot" />
                    Bankfertig · 2,4 MB
                  </div>
                </div>
              </div>
              <div className="howto__card-body">
                <span className="howto__step-label">Schritt 03</span>
                <h3 className="howto__card-title">PDF exportieren &amp; abschließen</h3>
                <p className="howto__card-desc">Bankfertiger Bericht, sofort überzeugend. Kein Nacharbeiten, kein Warten.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── STATS ───────────────────────────────── */}
      <section className="stats">
        <div className="container">
          <div className="stats__grid">
            <StatCounter num={1200} suffix="+" label="Analysen — jeden Monat" sublabel="Berater nutzen es täglich" />
            <StatCounter num={180} prefix="€ " suffix=" Mio." label="Investitionsvolumen analysiert" sublabel="Vertrauen von Profi-Beratern" />
            <StatCounter num={60} suffix=" %" label="weniger Zeit pro Beratung" sublabel="Mehr Kunden, gleiche Stunden" />
            <StatCounter num={140} suffix="+" label="Aktive Makler & Finanzierer" sublabel="Deutschlandweit im Einsatz" />
          </div>
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────── */}
      <section className="features" id="features">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="label-tag">Funktionen</span>
            <h2>Vom ersten Gespräch zum<br /><em>signierten Vertrag</em> — alles in einem Tool.</h2>
            <p>Kalkulation, Stresstest, PDF — ohne Excel, ohne Nachrechnen, ohne Wartezeit.</p>
          </div>
          <div className="features__list">
            {featureList.map((f, i) => (
              <div key={i} className="feat-row" data-reveal>
                <span className="feat-row__num">{f.num}</span>
                <div className="feat-row__icon">{f.svg}</div>
                <div className="feat-row__body">
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
                <span className="feat-row__tag">{f.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ZIELGRUPPEN ─────────────────────────── */}
      <section className="audience" id="zielgruppen">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="label-tag">Zielgruppen</span>
            <h2>Gebaut für die,<br />die täglich mit<br /><em>Immobilienzahlen</em> arbeiten.</h2>
          </div>
          <div className="audience__grid">
            <div className="aud-card aud-card--featured" data-reveal data-delay="1">
              <div className="aud-card__eyebrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                Makler &amp; Vertrieb
              </div>
              <h3>Der unfaire Vorteil<br />im Kundengespräch.</h3>
              <p>Zeige live, was ein Objekt wirklich wert ist — mit Zahlen die überzeugen, nicht mit Bauchgefühl.</p>
              <ul className="checklist">
                {['Investitionsanalyse in unter 60 Sekunden','Professionelle PDFs die Vertrauen schaffen','Stresstest-Szenarien die Einwände entkräften','Rendite- und Cashflow-Vergleich','KfW-Förderpotenzial direkt ausweisen'].map((item,i)=>(
                  <li key={i} style={{ transitionDelay: `${0.2 + i * 0.06}s` }}><span className="check-icon"><svg viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></span>{item}</li>
                ))}
              </ul>
            </div>
            <div className="aud-card" data-reveal data-delay="2">
              <div className="aud-card__eyebrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                Finanzierungsberater
              </div>
              <h3>Tragbarkeit auf<br />einen Blick.</h3>
              <p>Von der ersten Anfrage bis zur Entscheidungsvorlage — bankfähige Analysen die Kreditprüfungen überstehen.</p>
              <ul className="checklist">
                {['Beleihungsauslauf und EK-Quote automatisch','Stresstest bei +1%, +2%, +3% Zinsen','Cashflow-Nachweis als PDF-Export','KfW 300 / Bundesförderung integriert','Mehrere Finanzierungsszenarien im Vergleich'].map((item,i)=>(
                  <li key={i} style={{ transitionDelay: `${0.3 + i * 0.06}s` }}><span className="check-icon"><svg viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></span>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────── */}
      <section className="testimonials">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="label-tag">Kundenstimmen</span>
            <h2>Deutsche Berater<br /><em>schließen damit mehr ab.</em></h2>
          </div>
          <div className="testi__grid">
            {[
              { quote: 'Ich präsentiere das Objekt, öffne Immokalkulator, und meine Kunden sehen in Echtzeit warum sich das rechnet. Abschlussrate um 30% gestiegen.', name: 'Markus K.', role: 'Immobilienmakler, München', avatar: '/Markus.jpg' },
              { quote: 'Die Bank hat meinen Kreditantrag zum ersten Mal nicht nachgefragt. Vollständig, professionell, bankfähig. Spart mir jeden Tag eine Stunde.', name: 'Sandra R.', role: 'Finanzierungsberaterin, Hamburg', avatar: '/Sandra.jpg' },
              { quote: 'Endlich kein Excel mehr. Innerhalb von zwei Wochen hatten alle 8 Kollegen es im Einsatz. Das Vergleichs-Tool gibt uns jeden Tag den entscheidenden Vorteil.', name: 'Jonas H.', role: 'Teamleiter Vertrieb, Berlin', avatar: '/Jonas.jpg' },
            ].map((t, i) => (
              <div key={i} className="testi" data-reveal data-delay={i+1}>
                <div className="testi__mark">"</div>
                <div className="testi__stars">★★★★★</div>
                <blockquote>„{hilite(t.quote)}"</blockquote>
                <div className="testi__author">
                  <div className="testi__avatar">
                    {t.avatar
                      ? <img src={t.avatar} alt={t.name} className="testi__avatar-img" />
                      : t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="testi__name">{t.name}</div>
                    <div className="testi__role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ─────────────────────────────── */}
      <section className="pricing" id="pricing">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="label-tag">Preise</span>
            <h2><em>Starte gratis.</em> Skaliere wenn<br />du bereit bist.</h2>
            <p>Keine versteckten Kosten. Kein Abo-Trick. Kündbar jederzeit.</p>
          </div>
          <div className="pricing__grid">
            {[
              {
                name: 'Starter', tagline: 'Zum Kennenlernen', price: '0', billing: 'Dauerhaft kostenlos', featured: false,
                feats: [[true,'5 Analysen pro Monat'],[true,'Cashflow & Rendite'],[true,'PDF (mit Wasserzeichen'],[false,'Stresstest-Modul'],[false,'KfW-Integration'],[false,'Vergleichsmodus']],
                cta: 'Gratis loslegen', ctaClass: 'btn-outline-dark'
              },
              {
                name: 'Pro', tagline: 'Für aktive Berater', price: '79', billing: 'pro Monat · zzgl. MwSt. · kündbar', featured: true,
                feats: [[true,'Unbegrenzte Analysen'],[true,'Cashflow, Rendite & mehr'],[true,'PDF ohne Wasserzeichen'],[true,'Stresstest-Modul'],[true,'KfW-Integration'],[true,'Vergleichsmodus']],
                cta: 'Pro jetzt aktivieren →', ctaClass: 'btn-primary'
              },
              {
                name: 'Team', tagline: 'Für das ganze Büro', price: '59', billing: 'pro Nutzer / Monat · ab 3 Nutzer', featured: false,
                feats: [[true,'Alles aus Pro'],[true,'Team-Verwaltung & Rollen'],[true,'Eigenes Branding im PDF'],[true,'Prioritäts-Support'],[true,'Onboarding-Call inkl.'],[true,'Zentrales Dashboard']],
                cta: 'Für mein Team starten', ctaClass: 'btn-outline-dark'
              },
            ].map((plan, i) => (
              <div key={i} className={`plan${plan.featured?' plan--featured':''}`} data-reveal data-delay={i+1}>
                {plan.featured && <div className="plan__badge">Beliebteste Wahl</div>}
                <div className="plan__name">{plan.name}</div>
                <div className="plan__tagline">{plan.tagline}</div>
                <div className="plan__price"><span>€</span><b>{plan.price}</b></div>
                <div className="plan__billing">{plan.billing}</div>
                <ul className="plan__feats">
                  {plan.feats.map(([on, text], j) => (
                    <li key={j} className={on?'on':'off'}>
                      <span>{on?'✓':'—'}</span>{text}
                    </li>
                  ))}
                </ul>
                <a href="#cta" className={`${plan.ctaClass} btn--block`}>{plan.cta}</a>
              </div>
            ))}
          </div>
          <div className="pricing__urgency" data-reveal>
            <span className="pricing__urgency-dot" aria-hidden="true"/>
            Heute haben <strong>8 Berater</strong> mit dem Pro-Plan gestartet.
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────── */}
      <section className="faq">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="label-tag">Häufige Fragen</span>
            <h2>Alles was du<br /><em>wissen musst.</em></h2>
          </div>
          <FaqAccordion />
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────── */}
      <section className="cta" id="cta">
        <div className="cta__inner">
          <div className="cta__left" data-reveal>
            <h2>Starte kostenlos.<br />Überzeuge deinen nächsten<br /><em>Kunden in 60 Sekunden.</em></h2>
            <ul className="cta__bullets">
              {['Keine Kreditkarte nötig','5 Analysen kostenlos','Sofort loslegen — in 2 Minuten'].map((b,i)=>(
                <li key={i}>
                  <svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" opacity=".35"/><path d="M6 10l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="cta__form" data-reveal data-delay="2">
            <div className="cta__form-title">Kostenlos registrieren</div>
            <div className="cta__form-sub">Starter-Plan · Keine Kreditkarte nötig</div>
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <input type="text" placeholder="Vorname" className="form-input" disabled={formState !== 'idle'} />
                <input type="text" placeholder="Nachname" className="form-input" disabled={formState !== 'idle'} />
              </div>
              <input
                ref={emailRef}
                type="email"
                placeholder="E-Mail-Adresse"
                className={`form-input form-input--full${emailError ? ' form-input--error' : ''}`}
                disabled={formState !== 'idle'}
              />
              <div className="form-trust">
                <div className="form-trust__avatars">
                  {['MK','SR','JH','TL','BF'].map((init, i) => (
                    <span key={i} className={`form-trust__av form-trust__av--${i+1}`}>{init}</span>
                  ))}
                </div>
                <span className="form-trust__text"><strong>23 Berater</strong> haben sich diese Woche angemeldet</span>
              </div>
              <button
                type="submit"
                className={`btn-primary btn--block btn--lg form-btn--${formState}`}
                disabled={formState !== 'idle'}
              >
                {formState === 'idle' && 'Account erstellen →'}
                {formState === 'loading' && (
                  <span className="form-btn__loading">
                    <svg className="form-spinner" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="40" strokeDashoffset="15" strokeLinecap="round"/>
                    </svg>
                    Wird verarbeitet…
                  </span>
                )}
                {formState === 'success' && (
                  <span className="form-btn__success">
                    <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
                      <circle cx="12" cy="12" r="10" fill="rgba(0,0,0,.15)"/>
                      <path d="M7 12l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="form-check"/>
                    </svg>
                    Erfolgreich registriert!
                  </span>
                )}
              </button>
            </form>
            <p className="form-legal">Mit der Registrierung stimmst du unseren AGB und Datenschutzbestimmungen zu.</p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────── */}
      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__logo">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="1" y="13" width="5" height="9" rx="1" fill="currentColor" opacity=".4"/>
              <rect x="9.5" y="8" width="5" height="14" rx="1" fill="currentColor" opacity=".7"/>
              <rect x="18" y="2" width="5" height="20" rx="1" fill="currentColor"/>
            </svg>
            Immokalkulator
          </div>
          <nav className="footer__links">
            <a href="#">Impressum</a>
            <a href="#">Datenschutz</a>
            <a href="#">AGB</a>
            <a href="#">Kontakt</a>
          </nav>
          <p className="footer__copy">© 2025 Immokalkulator. Alle Rechte vorbehalten.</p>
        </div>
      </footer>
    </>
  );
}
