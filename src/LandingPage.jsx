import { useEffect, useState } from 'react';
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
      { threshold: 0.06, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function useCountUp(target, duration = 1800) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return value;
}

function StatCounter({ num, label, prefix = '', suffix = '' }) {
  const [started, setStarted] = useState(false);
  const ref = (el) => {
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } }, { threshold: 0.5 });
    obs.observe(el);
  };
  const display = useCountUp(started ? num : 0, 1600);
  return (
    <div className="stat" ref={ref}>
      <div className="stat__num">{prefix}{display.toLocaleString('de-DE')}{suffix}</div>
      <div className="stat__label">{label}</div>
    </div>
  );
}

export default function LandingPage() {
  useReveal();

  return (
    <>
      {/* ── NAV ─────────────────────────────────── */}
      <nav className="nav">
        <div className="nav__inner">
          <a href="#" className="nav__logo">
            <svg className="nav__logo-icon" viewBox="0 0 28 28" fill="none">
              <rect x="2" y="14" width="6" height="12" rx="1.5" fill="currentColor" opacity=".5"/>
              <rect x="11" y="9" width="6" height="17" rx="1.5" fill="currentColor" opacity=".75"/>
              <rect x="20" y="2" width="6" height="24" rx="1.5" fill="currentColor"/>
            </svg>
            Immokalkulator
          </a>
          <ul className="nav__links">
            <li><a href="#features">Funktionen</a></li>
            <li><a href="#zielgruppen">Für wen</a></li>
            <li><a href="#pricing">Preise</a></li>
          </ul>
          <div className="nav__actions">
            <a href="#" className="btn-ghost">Anmelden</a>
            <a href="#cta" className="btn-primary btn--sm">Kostenlos testen →</a>
          </div>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────── */}
      <section className="hero">
        <div className="hero__glow" aria-hidden="true" />
        <div className="hero__grid" aria-hidden="true" />

        <div className="hero__content">
          <div className="hero__badge" data-reveal>
            <span className="hero__badge-pulse" />
            Für Makler &amp; Finanzierungsberater im DACH-Raum
          </div>

          <h1 className="hero__h1" data-reveal data-delay="1">
            Professionelle<br />
            Immobilien&shy;analyse<br />
            in <em>60 Sekunden.</em>
          </h1>

          <p className="hero__sub" data-reveal data-delay="2">
            Cashflow, Rendite, Stresstest &amp; KfW — alles in einem Tool.
            Überzeuge Kunden mit Zahlen, nicht mit Bauchgefühl.
          </p>

          <div className="hero__actions" data-reveal data-delay="3">
            <a href="#cta" className="btn-primary btn--lg">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
              Jetzt kostenlos starten
            </a>
            <a href="#features" className="btn-ghost-light btn--lg">Demo ansehen</a>
          </div>

          <div className="hero__social" data-reveal data-delay="4">
            <div className="hero__avatars">
              {['MK','SR','JH','TL','BF'].map((init, i) => (
                <span key={i} className={`hero__avatar hero__avatar--${i+1}`}>{init}</span>
              ))}
            </div>
            <div className="hero__social-text">
              <span className="hero__stars">★★★★★</span>
              <span><strong>500+</strong> Makler &amp; Finanzierer vertrauen uns</span>
            </div>
          </div>
        </div>

        {/* ── DASHBOARD MOCKUP ── */}
        <div className="dash-wrap" data-reveal data-delay="2">
          <div className="dash">
            {/* titlebar */}
            <div className="dash__bar">
              <div className="dash__dots"><span/><span/><span/></div>
              <span className="dash__url">immokalkulator.de · Objekt-Analyse · München Maxvorstadt</span>
            </div>

            {/* sidebar */}
            <div className="dash__layout">
              <aside className="dash__sidebar">
                <div className="dash__sidebar-logo">IK</div>
                {['◈','⊞','◎','⬡','↗','□'].map((ic, i) => (
                  <div key={i} className={`dash__sidebar-item${i === 1 ? ' active' : ''}`}>{ic}</div>
                ))}
              </aside>

              {/* main */}
              <div className="dash__main">
                <div className="dash__header-row">
                  <div>
                    <div className="dash__property-title">Maxvorstadt 14B — 3 Zimmer, 78 m²</div>
                    <div className="dash__property-sub">Kaufpreis: 620.000 € · Baujahr 1998 · Energieklasse C</div>
                  </div>
                  <div className="dash__status-pill">
                    <span className="dash__status-dot" />
                    Live-Analyse
                  </div>
                </div>

                {/* KPI row */}
                <div className="dash__kpis">
                  <div className="dash__kpi dash__kpi--highlight">
                    <div className="dash__kpi-label">Netto-Rendite p.a.</div>
                    <div className="dash__kpi-val">4,8 <span>%</span></div>
                    <div className="dash__kpi-delta dash__kpi-delta--up">↑ +0,3 % vs. Vormonat</div>
                  </div>
                  <div className="dash__kpi">
                    <div className="dash__kpi-label">Monatl. Cashflow</div>
                    <div className="dash__kpi-val">+382 <span>€</span></div>
                    <div className="dash__kpi-badge dash__kpi-badge--green">Positiv</div>
                  </div>
                  <div className="dash__kpi">
                    <div className="dash__kpi-label">Eigenkapitalrendite</div>
                    <div className="dash__kpi-val">11,2 <span>%</span></div>
                    <div className="dash__kpi-badge dash__kpi-badge--green">Stark</div>
                  </div>
                  <div className="dash__kpi">
                    <div className="dash__kpi-label">Stresstest +2 %</div>
                    <div className="dash__kpi-val-sm">Tragbar</div>
                    <div className="dash__kpi-badge dash__kpi-badge--green">✓ Bestanden</div>
                  </div>
                </div>

                {/* chart bar */}
                <div className="dash__chart-area">
                  <div className="dash__chart-label">Cashflow-Entwicklung (12 Monate)</div>
                  <div className="dash__bars">
                    {[62, 68, 72, 65, 80, 75, 88, 82, 91, 86, 95, 100].map((h, i) => (
                      <div key={i} className="dash__bar-col">
                        <div className="dash__bar-fill" style={{ height: `${h}%` }} />
                        <div className="dash__bar-label">{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* KfW badge */}
                <div className="dash__tags">
                  <span className="dash__tag dash__tag--gold">⬡ KfW 300 · aktiv</span>
                  <span className="dash__tag">PDF bereit</span>
                  <span className="dash__tag">Vergleich: 2 Objekte</span>
                </div>
              </div>
            </div>
          </div>

          {/* floating badges */}
          <div className="dash__float dash__float--tl">
            <span className="dash__float-icon">⚡</span>
            <div>
              <div className="dash__float-label">Analysezeit</div>
              <div className="dash__float-val">47 Sek.</div>
            </div>
          </div>
          <div className="dash__float dash__float--br">
            <span className="dash__float-icon">✓</span>
            <div>
              <div className="dash__float-label">PDF-Export</div>
              <div className="dash__float-val">Bankfertig</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LOGO TICKER ─────────────────────────── */}
      <div className="logos">
        <span className="logos__label">VERTRAUT VON</span>
        <div className="logos__track-wrap">
          <div className="logos__track">
            {[...Array(2)].flatMap((_, r) =>
              ['RE/MAX','Volksbank','Sparkasse','ING','Dr. Klein','Interhyp','Engel &amp; Völkers','Von Poll','Postbank','Commerzbank'].map((l, i) => (
                <span key={`${r}-${i}`} className="logos__item" dangerouslySetInnerHTML={{ __html: l }} />
              ))
            )}
          </div>
        </div>
      </div>

      {/* ── STATS ───────────────────────────────── */}
      <section className="stats">
        <div className="container">
          <div className="stats__grid">
            <StatCounter num={3200} suffix="+" label="Analysen pro Monat" />
            <StatCounter num={4200} prefix="€ " suffix=" Mrd." label="Analysiertes Investitionsvolumen" />
            <StatCounter num={60} suffix=" %" label="Weniger Zeit pro Beratung" />
            <StatCounter num={500} suffix="+" label="Aktive Makler & Finanzierer" />
          </div>
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────── */}
      <section className="features" id="features">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="label-tag">Funktionen</span>
            <h2>Alles für eine professionelle<br /><span className="g">Immobilienberatung.</span></h2>
            <p>Von der Kalkulation bis zum fertigen PDF — ohne Excel, ohne Nachrechnen.</p>
          </div>
          <div className="features__grid">
            {[
              {
                svg: <svg viewBox="0 0 48 48" fill="none"><rect x="6" y="28" width="8" height="14" rx="2" fill="currentColor" opacity=".3"/><rect x="20" y="20" width="8" height="22" rx="2" fill="currentColor" opacity=".6"/><rect x="34" y="10" width="8" height="32" rx="2" fill="currentColor"/><path d="M8 22l12-8 10 6 12-10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
                tag: 'Kernfunktion', title: 'Cashflow-Kalkulator',
                desc: 'Vollständige Einnahmen-Ausgaben-Rechnung inkl. Instandhaltung, Verwaltung, Leerstandsrücklage und Steuerwirkung — auf den Cent genau.'
              },
              {
                svg: <svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2.5" opacity=".25"/><path d="M24 6c9.941 0 18 8.059 18 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/><path d="M24 24l10-10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/><circle cx="24" cy="24" r="3" fill="currentColor"/></svg>,
                tag: 'Kernfunktion', title: 'Renditeanalyse',
                desc: 'Brutto- und Nettomietrendite, Eigenkapitalrendite und Gesamtrendite auf einen Blick — inkl. Wertsteigerungsprognose.'
              },
              {
                svg: <svg viewBox="0 0 48 48" fill="none"><path d="M24 6l18 32H6L24 6z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" opacity=".3"/><path d="M24 10l14 26H10L24 10z" fill="currentColor" opacity=".1"/><line x1="24" y1="20" x2="24" y2="30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/><circle cx="24" cy="34" r="1.5" fill="currentColor"/></svg>,
                tag: 'Einzigartig', title: 'Stresstest & Risiko',
                desc: 'Simuliere Zinserhöhungen, Mietausfälle und Kostensteigerungen. Zeige echte Szenarien — nicht nur das Best-Case-Modell.'
              },
              {
                svg: <svg viewBox="0 0 48 48" fill="none"><path d="M24 8l4 8 9 1.5-6.5 6.5 1.5 9L24 28.5l-8 4.5 1.5-9L11 17.5l9-1.5z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/><path d="M24 14l2.5 5 5.5 1-4 4 1 5.5L24 27l-5 2.5 1-5.5-4-4 5.5-1z" fill="currentColor" opacity=".25"/></svg>,
                tag: 'Förderprogramme', title: 'KfW-Integration',
                desc: 'Automatische Prüfung der Förderungsmöglichkeiten inkl. Tilgungszuschüsse und Zinsvorteil-Berechnung — direkt im Kalkulator.'
              },
              {
                svg: <svg viewBox="0 0 48 48" fill="none"><rect x="6" y="10" width="16" height="28" rx="3" stroke="currentColor" strokeWidth="2.5" opacity=".4"/><rect x="26" y="10" width="16" height="28" rx="3" stroke="currentColor" strokeWidth="2.5"/><line x1="22" y1="24" x2="26" y2="24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>,
                tag: 'Beratungs-Tool', title: 'Vergleichsmodus',
                desc: 'Zwei Objekte oder Szenarien nebeneinander. Perfekt für Kundenentscheidungen und A/B-Verhandlungen.'
              },
              {
                svg: <svg viewBox="0 0 48 48" fill="none"><rect x="10" y="6" width="28" height="36" rx="3" stroke="currentColor" strokeWidth="2.5"/><line x1="17" y1="16" x2="31" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity=".5"/><line x1="17" y1="22" x2="31" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity=".5"/><line x1="17" y1="28" x2="25" y2="28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity=".5"/><path d="M28 32l4 4 7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
                tag: 'Sofort einsetzbar', title: 'PDF-Export',
                desc: 'Professionelle, gebrandete Analyseberichte mit einem Klick — direkt für Kunden, Banken oder interne Dokumentation.'
              },
            ].map((f, i) => (
              <div key={i} className="feat-card" data-reveal data-delay={i % 3 + 1}>
                <div className="feat-card__icon">{f.svg}</div>
                <span className="feat-card__tag">{f.tag}</span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
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
            <h2>Gebaut für die, die täglich<br />mit <span className="g">Immobilienzahlen</span> arbeiten.</h2>
            <p>Zwei Berufsgruppen. Ein Tool. Dieselbe Qualität.</p>
          </div>
          <div className="audience__grid">
            <div className="aud-card aud-card--featured" data-reveal data-delay="1">
              <div className="aud-card__eyebrow">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                Makler &amp; Vertrieb
              </div>
              <h3>Der unfaire Vorteil<br />im Kundengespräch.</h3>
              <p>Zeige live, was ein Objekt wirklich wert ist — mit Zahlen die überzeugen, nicht mit Bauchgefühl.</p>
              <ul className="checklist">
                {[
                  'Investitionsanalyse in unter 60 Sekunden',
                  'Professionelle PDFs die Vertrauen und Käufe schaffen',
                  'Stresstest-Szenarien die Einwände entkräften',
                  'Rendite- und Cashflow-Vergleich mehrerer Objekte',
                  'KfW-Förderpotenzial direkt ausweisen',
                ].map((item, i) => (
                  <li key={i}>
                    <span className="check-icon">
                      <svg viewBox="0 0 16 16" fill="none"><path d="M3 8l4 4 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="aud-card" data-reveal data-delay="2">
              <div className="aud-card__eyebrow">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                Finanzierungsberater
              </div>
              <h3>Tragbarkeit auf<br />einen Blick.</h3>
              <p>Von der ersten Anfrage bis zur Entscheidungsvorlage — liefere bankfähige Analysen die Kreditprüfungen überstehen.</p>
              <ul className="checklist">
                {[
                  'Beleihungsauslauf und Eigenkapitalquote automatisch',
                  'Stresstest bei +1%, +2%, +3% Zinsen',
                  'Cashflow-Nachweis für Banken als PDF-Export',
                  'KfW 300 / Bundesförderung direkt integriert',
                  'Mehrere Finanzierungsszenarien im Vergleich',
                ].map((item, i) => (
                  <li key={i}>
                    <span className="check-icon">
                      <svg viewBox="0 0 16 16" fill="none"><path d="M3 8l4 4 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    {item}
                  </li>
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
            <h2>Was unsere Nutzer <span className="g">sagen.</span></h2>
          </div>
          <div className="testi__grid">
            {[
              { quote: 'Ich präsentiere das Objekt, öffne Immokalkulator, und meine Kunden sehen in Echtzeit warum sich das rechnet. Abschlussrate deutlich gestiegen.', name: 'Markus K.', role: 'Immobilienmakler, München', rating: 5 },
              { quote: 'Der Stresstest-Modus ist Gold wert. Banken lieben die PDFs — vollständig, professionell, bankfähig. Spart mir jeden Tag eine Stunde.', name: 'Sandra R.', role: 'Finanzierungsberaterin, Hamburg', rating: 5 },
              { quote: 'Endlich kein Excel mehr. Alle Kollegen im Büro nutzen es jetzt. Das Vergleichs-Tool hat uns schon mehrfach den entscheidenden Vorteil gebracht.', name: 'Jonas H.', role: 'Teamleiter Vertrieb, Berlin', rating: 5 },
            ].map((t, i) => (
              <div key={i} className="testi" data-reveal data-delay={i + 1}>
                <div className="testi__stars">{'★'.repeat(t.rating)}</div>
                <blockquote>„{t.quote}"</blockquote>
                <div className="testi__author">
                  <div className="testi__avatar">
                    {t.name.split(' ').map(n => n[0]).join('')}
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
            <h2><span className="g">Transparent.</span> Skalierbar.<br />Kein Kleingedrucktes.</h2>
            <p>Starte kostenlos und skaliere wenn du bereit bist.</p>
          </div>
          <div className="pricing__grid">
            {/* Starter */}
            <div className="plan" data-reveal data-delay="1">
              <div className="plan__name">Starter</div>
              <div className="plan__tagline">Für den Einstieg</div>
              <div className="plan__price"><span className="plan__currency">€</span><b>0</b></div>
              <div className="plan__billing">Dauerhaft kostenlos</div>
              <ul className="plan__feats">
                {[
                  [true, '5 Analysen pro Monat'],
                  [true, 'Cashflow & Rendite'],
                  [true, 'PDF-Export (mit Wasserzeichen)'],
                  [false, 'Stresstest-Modul'],
                  [false, 'KfW-Integration'],
                  [false, 'Vergleichsmodus'],
                ].map(([on, text], i) => (
                  <li key={i} className={on ? 'on' : 'off'}>
                    <span className="plan__feat-icon">{on ? '✓' : '—'}</span>
                    {text}
                  </li>
                ))}
              </ul>
              <a href="#cta" className="btn-outline btn--block">Kostenlos starten</a>
            </div>

            {/* Pro */}
            <div className="plan plan--featured" data-reveal data-delay="2">
              <div className="plan__badge">⭐ Beliebteste Wahl</div>
              <div className="plan__name">Pro</div>
              <div className="plan__tagline">Für aktive Berater</div>
              <div className="plan__price"><span className="plan__currency">€</span><b>49</b></div>
              <div className="plan__billing">pro Monat · zzgl. MwSt. · monatlich kündbar</div>
              <ul className="plan__feats">
                {[
                  [true, 'Unbegrenzte Analysen'],
                  [true, 'Cashflow, Rendite & mehr'],
                  [true, 'PDF-Export ohne Wasserzeichen'],
                  [true, 'Stresstest-Modul'],
                  [true, 'KfW-Integration'],
                  [true, 'Vergleichsmodus'],
                ].map(([on, text], i) => (
                  <li key={i} className={on ? 'on' : 'off'}>
                    <span className="plan__feat-icon">{on ? '✓' : '—'}</span>
                    {text}
                  </li>
                ))}
              </ul>
              <a href="#cta" className="btn-primary btn--block">Pro starten →</a>
            </div>

            {/* Team */}
            <div className="plan" data-reveal data-delay="3">
              <div className="plan__name">Team</div>
              <div className="plan__tagline">Für Büros &amp; Teams</div>
              <div className="plan__price"><span className="plan__currency">€</span><b>39</b></div>
              <div className="plan__billing">pro Nutzer / Monat · ab 3 Nutzer · zzgl. MwSt.</div>
              <ul className="plan__feats">
                {[
                  [true, 'Alles aus Pro'],
                  [true, 'Team-Verwaltung & Rollen'],
                  [true, 'Eigenes Branding im PDF'],
                  [true, 'Prioritäts-Support'],
                  [true, 'Onboarding-Call inklusive'],
                  [true, 'Zentrales Dashboard'],
                ].map(([on, text], i) => (
                  <li key={i} className={on ? 'on' : 'off'}>
                    <span className="plan__feat-icon">{on ? '✓' : '—'}</span>
                    {text}
                  </li>
                ))}
              </ul>
              <a href="#cta" className="btn-outline btn--block">Team anfragen</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────── */}
      <section className="cta" id="cta">
        <div className="cta__glow" aria-hidden="true" />
        <div className="cta__inner">
          <div className="cta__left" data-reveal>
            <h2>
              Bereit für bessere<br />
              Beratung mit<br />
              <em>Immokalkulator?</em>
            </h2>
            <ul className="cta__bullets">
              {['Keine Kreditkarte nötig', '5 Analysen kostenlos', 'Sofort loslegen — in 2 Minuten'].map((b, i) => (
                <li key={i}>
                  <svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" opacity=".3"/><path d="M6 10l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="cta__form" data-reveal data-delay="2">
            <div className="cta__form-title">Kostenlos registrieren</div>
            <div className="cta__form-sub">Starter-Plan · Keine Kreditkarte nötig</div>
            <div className="form-row">
              <input type="text" placeholder="Vorname" className="form-input" />
              <input type="text" placeholder="Nachname" className="form-input" />
            </div>
            <input type="email" placeholder="E-Mail-Adresse" className="form-input form-input--full" />
            <button className="btn-primary btn--block btn--lg">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
              Jetzt kostenlos starten
            </button>
            <p className="form-legal">
              Mit der Registrierung stimmst du unseren AGB und Datenschutzbestimmungen zu.
            </p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────── */}
      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__logo">
            <svg width="18" height="18" viewBox="0 0 28 28" fill="none">
              <rect x="2" y="14" width="6" height="12" rx="1.5" fill="currentColor" opacity=".5"/>
              <rect x="11" y="9" width="6" height="17" rx="1.5" fill="currentColor" opacity=".75"/>
              <rect x="20" y="2" width="6" height="24" rx="1.5" fill="currentColor"/>
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
