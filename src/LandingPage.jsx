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
      { threshold: 0.05, rootMargin: '0px 0px -32px 0px' }
    );
    document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
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

function StatCounter({ num, label, prefix = '', suffix = '' }) {
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
      <div className="stat__num">{prefix}{display.toLocaleString('de-DE')}{suffix}</div>
      <div className="stat__label">{label}</div>
    </div>
  );
}

const featureList = [
  {
    num: '01', tag: 'Kernfunktion', title: 'Cashflow-Kalkulator',
    desc: 'Vollständige Einnahmen-Ausgaben-Rechnung inkl. Instandhaltung, Verwaltung, Leerstandsrücklage und Steuerwirkung — auf den Cent genau.',
    svg: <svg viewBox="0 0 40 40" fill="none"><rect x="4" y="24" width="6" height="12" rx="1.5" fill="currentColor" opacity=".3"/><rect x="17" y="16" width="6" height="20" rx="1.5" fill="currentColor" opacity=".6"/><rect x="30" y="6" width="6" height="30" rx="1.5" fill="currentColor"/><path d="M6 18l11-7 8 5 11-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  },
  {
    num: '02', tag: 'Kernfunktion', title: 'Renditeanalyse',
    desc: 'Brutto- und Nettomietrendite, Eigenkapitalrendite und Gesamtrendite auf einen Blick — inkl. Wertsteigerungsprognose.',
    svg: <svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="15" stroke="currentColor" strokeWidth="2" opacity=".2"/><path d="M20 5a15 15 0 0115 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/><path d="M20 20l9-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="20" cy="20" r="3" fill="currentColor"/></svg>
  },
  {
    num: '03', tag: 'Einzigartig', title: 'Stresstest & Risiko',
    desc: 'Simuliere Zinserhöhungen, Mietausfälle und Kostensteigerungen. Zeige echte Szenarien — nicht nur das Best-Case-Modell.',
    svg: <svg viewBox="0 0 40 40" fill="none"><path d="M20 4l16 28H4L20 4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" opacity=".25"/><path d="M20 4l16 28H4L20 4z" fill="currentColor" opacity=".07"/><line x1="20" y1="16" x2="20" y2="25" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/><circle cx="20" cy="29" r="1.5" fill="currentColor"/></svg>
  },
  {
    num: '04', tag: 'Förderprogramme', title: 'KfW-Integration',
    desc: 'Automatische Prüfung der Förderungsmöglichkeiten inkl. Tilgungszuschüsse und Zinsvorteil-Berechnung — direkt im Kalkulator.',
    svg: <svg viewBox="0 0 40 40" fill="none"><path d="M20 6l3.5 7 7.5 1.1-5.5 5.3 1.3 7.6L20 23.5l-6.8 3.5 1.3-7.6-5.5-5.3 7.5-1.1z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><path d="M20 10l2.5 5 5.5.8-4 3.8.9 5.4L20 22.5l-4.9 2.5.9-5.4-4-3.8 5.5-.8z" fill="currentColor" opacity=".2"/></svg>
  },
  {
    num: '05', tag: 'Beratungs-Tool', title: 'Vergleichsmodus',
    desc: 'Zwei Objekte oder Szenarien nebeneinander. Perfekt für Kundenentscheidungen und A/B-Verhandlungen.',
    svg: <svg viewBox="0 0 40 40" fill="none"><rect x="4" y="8" width="14" height="24" rx="2.5" stroke="currentColor" strokeWidth="2" opacity=".4"/><rect x="22" y="8" width="14" height="24" rx="2.5" stroke="currentColor" strokeWidth="2"/><line x1="18" y1="20" x2="22" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
  },
  {
    num: '06', tag: 'Sofort einsetzbar', title: 'PDF-Export',
    desc: 'Professionelle, gebrandete Analyseberichte mit einem Klick — direkt für Kunden, Banken oder interne Dokumentation.',
    svg: <svg viewBox="0 0 40 40" fill="none"><rect x="8" y="4" width="24" height="32" rx="2.5" stroke="currentColor" strokeWidth="2"/><line x1="14" y1="13" x2="26" y2="13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity=".5"/><line x1="14" y1="19" x2="26" y2="19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity=".5"/><line x1="14" y1="25" x2="20" y2="25" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity=".5"/><path d="M22 27l3.5 3.5 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  },
];

export default function LandingPage() {
  useReveal();

  return (
    <>
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
        <div className="hero__content">
          <div className="hero__badge" data-reveal>
            <span className="hero__badge-dot" />
            DACH-Raum · Makler &amp; Finanzierungsberater
          </div>

          <h1 className="hero__h1" data-reveal data-delay="1">
            Deine Kunden<br />
            kaufen schneller,<br />
            wenn die Zahlen<br />
            <em>für sich sprechen.</em>
          </h1>

          <p className="hero__sub" data-reveal data-delay="2">
            Cashflow, Rendite, Stresstest &amp; KfW — alles in einem Tool.
            Professionelle Investitionsanalyse in unter 60 Sekunden.
          </p>

          <div className="hero__actions" data-reveal data-delay="3">
            <a href="#cta" className="btn-primary btn--lg">
              Jetzt kostenlos starten
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
              <div className="hero__social-text"><strong>500+</strong> aktive Berater</div>
            </div>
          </div>
        </div>

        {/* Dashboard — rechte Spalte */}
        <div className="hero__visual" data-reveal data-delay="2">
          <div className="dash">
            <div className="dash__bar">
              <div className="dash__dots"><span/><span/><span/></div>
              <span className="dash__url">immokalkulator.de · München Maxvorstadt</span>
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
                    <div className="dash__kpi-val">4,8<span>%</span></div>
                    <div className="dash__kpi-delta up">↑ +0,3 %</div>
                  </div>
                  <div className="dash__kpi">
                    <div className="dash__kpi-label">Monatl. Cashflow</div>
                    <div className="dash__kpi-val">+382<span>€</span></div>
                    <span className="dash__badge green">Positiv</span>
                  </div>
                  <div className="dash__kpi">
                    <div className="dash__kpi-label">EK-Rendite</div>
                    <div className="dash__kpi-val">11,2<span>%</span></div>
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
                        <div className="dash__bar-fill" style={{height:`${h}%`}}/>
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

      {/* ── LOGOS TICKER ────────────────────────── */}
      <div className="logos">
        <span className="logos__label">Vertraut von</span>
        <div className="logos__track-wrap">
          <div className="logos__track">
            {[...Array(2)].flatMap((_,r) =>
              ['RE/MAX','Volksbank','Sparkasse','ING','Dr. Klein','Interhyp','Engel & Völkers','Von Poll','Postbank','Commerzbank'].map((l,i)=>(
                <span key={`${r}-${i}`} className="logos__item">{l}</span>
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
            <h2>Alles, was eine professionelle<br /><em>Immobilienberatung</em> braucht.</h2>
            <p>Von der Kalkulation bis zum fertigen PDF — ohne Excel, ohne Nachrechnen.</p>
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
                  <li key={i}><span className="check-icon"><svg viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></span>{item}</li>
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
                  <li key={i}><span className="check-icon"><svg viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></span>{item}</li>
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
            <h2>Was unsere Nutzer<br /><em>sagen.</em></h2>
          </div>
          <div className="testi__grid">
            {[
              { quote: 'Ich präsentiere das Objekt, öffne Immokalkulator, und meine Kunden sehen in Echtzeit warum sich das rechnet. Abschlussrate deutlich gestiegen.', name: 'Markus K.', role: 'Immobilienmakler, München' },
              { quote: 'Der Stresstest-Modus ist Gold wert. Banken lieben die PDFs — vollständig, professionell, bankfähig. Spart mir jeden Tag eine Stunde.', name: 'Sandra R.', role: 'Finanzierungsberaterin, Hamburg' },
              { quote: 'Endlich kein Excel mehr. Alle Kollegen nutzen es jetzt. Das Vergleichs-Tool hat uns schon mehrfach den entscheidenden Vorteil gebracht.', name: 'Jonas H.', role: 'Teamleiter Vertrieb, Berlin' },
            ].map((t, i) => (
              <div key={i} className="testi" data-reveal data-delay={i+1}>
                <div className="testi__mark">"</div>
                <div className="testi__stars">★★★★★</div>
                <blockquote>„{t.quote}"</blockquote>
                <div className="testi__author">
                  <div className="testi__avatar">{t.name.split(' ').map(n=>n[0]).join('')}</div>
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
            <h2><em>Transparent.</em> Skalierbar.<br />Kein Kleingedrucktes.</h2>
            <p>Starte kostenlos und skaliere wenn du bereit bist.</p>
          </div>
          <div className="pricing__grid">
            {[
              {
                name: 'Starter', tagline: 'Für den Einstieg', price: '0', billing: 'Dauerhaft kostenlos', featured: false,
                feats: [[true,'5 Analysen pro Monat'],[true,'Cashflow & Rendite'],[true,'PDF (mit Wasserzeichen'],[false,'Stresstest-Modul'],[false,'KfW-Integration'],[false,'Vergleichsmodus']],
                cta: 'Kostenlos starten', ctaClass: 'btn-outline-dark'
              },
              {
                name: 'Pro', tagline: 'Für aktive Berater', price: '49', billing: 'pro Monat · zzgl. MwSt. · kündbar', featured: true,
                feats: [[true,'Unbegrenzte Analysen'],[true,'Cashflow, Rendite & mehr'],[true,'PDF ohne Wasserzeichen'],[true,'Stresstest-Modul'],[true,'KfW-Integration'],[true,'Vergleichsmodus']],
                cta: 'Pro starten →', ctaClass: 'btn-primary'
              },
              {
                name: 'Team', tagline: 'Für Büros & Teams', price: '39', billing: 'pro Nutzer / Monat · ab 3 Nutzer', featured: false,
                feats: [[true,'Alles aus Pro'],[true,'Team-Verwaltung & Rollen'],[true,'Eigenes Branding im PDF'],[true,'Prioritäts-Support'],[true,'Onboarding-Call inkl.'],[true,'Zentrales Dashboard']],
                cta: 'Team anfragen', ctaClass: 'btn-outline-dark'
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
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────── */}
      <section className="cta" id="cta">
        <div className="cta__inner">
          <div className="cta__left" data-reveal>
            <h2>Bereit für bessere<br />Beratung mit<br /><em>Immokalkulator?</em></h2>
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
            <div className="form-row">
              <input type="text" placeholder="Vorname" className="form-input" />
              <input type="text" placeholder="Nachname" className="form-input" />
            </div>
            <input type="email" placeholder="E-Mail-Adresse" className="form-input form-input--full" />
            <button className="btn-primary btn--block btn--lg">Jetzt kostenlos starten →</button>
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
