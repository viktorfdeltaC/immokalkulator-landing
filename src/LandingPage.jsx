import { useEffect } from 'react';
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
      { threshold: 0.08, rootMargin: '0px 0px -48px 0px' }
    );
    document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function LandingPage() {
  useReveal();

  return (
    <>
      {/* ── NAV ─────────────────────────────────── */}
      <nav className="nav">
        <div className="nav__inner">
          <a href="#" className="nav__logo">
            <span className="nav__logo-dot" />
            Immokalkulator
          </a>
          <ul className="nav__links">
            <li><a href="#features">Funktionen</a></li>
            <li><a href="#zielgruppen">Für wen</a></li>
            <li><a href="#pricing">Preise</a></li>
          </ul>
          <div className="nav__actions">
            <a href="#" className="btn-ghost">Anmelden</a>
            <a href="#cta" className="btn-primary btn--sm">Kostenlos testen</a>
          </div>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────── */}
      <section className="hero">
        <div className="hero__bg" aria-hidden="true" />
        <div className="hero__blob" aria-hidden="true" />

        <div className="hero__content">
          <div className="hero__badge" data-reveal>
            <span className="hero__badge-dot" />
            Für Makler &amp; Finanzierungsberater im DACH-Raum
          </div>
          <h1 className="hero__h1" data-reveal data-delay="1">
            Deine Kunden kaufen<br />
            schneller, wenn die<br />
            Zahlen für sich<br />
            <em>sprechen.</em>
          </h1>
          <p className="hero__sub" data-reveal data-delay="2">
            Cashflow, Rendite, Stresstest, KfW — alles in einem Tool.{' '}
            <strong>Professionelle Investitionsanalyse in unter 60 Sekunden.</strong>
          </p>
          <div className="hero__actions" data-reveal data-delay="3">
            <a href="#cta" className="btn-primary btn--lg">Jetzt kostenlos starten</a>
            <a href="#features" className="btn-outline btn--lg">Demo ansehen</a>
          </div>
          <div className="hero__trust" data-reveal data-delay="4">
            <div className="avatars">
              {[['MK', '1'], ['SR', '2'], ['JH', '3'], ['TL', '4'], ['BF', '5']].map(([init, n]) => (
                <span key={n} className={`avatar avatar--${n}`}>{init}</span>
              ))}
            </div>
            <div className="hero__trust-text">
              <div className="hero__stars">★★★★★</div>
              <span><strong>500+</strong> Makler &amp; Finanzierer vertrauen uns</span>
            </div>
          </div>
        </div>

        {/* Mockup */}
        <div className="mockup-wrap" data-reveal data-delay="2">
          <div className="mockup">
            <div className="mockup__bar">
              <div className="mockup__dots">
                <span /><span /><span />
              </div>
              <span className="mockup__title">Immokalkulator · Objekt Analyse · München Maxvorstadt</span>
            </div>
            <div className="mockup__body">
              <div className="mockup__card mockup__card--accent">
                <div className="mockup__label">NETTO-RENDITE P.A.</div>
                <div className="mockup__val">4,8 %</div>
                <div className="mockup__delta">↑ +0,3 % vs. Vormonat</div>
              </div>
              <div className="mockup__card">
                <div className="mockup__label">MONATL. CASHFLOW</div>
                <div className="mockup__val">+382 €</div>
                <span className="mockup__pill mockup__pill--green">↑ Positiv</span>
              </div>
              <div className="mockup__card">
                <div className="mockup__label">KFW-STATUS</div>
                <div className="mockup__val-sm">KfW 300</div>
                <span className="mockup__pill mockup__pill--green">✓ Aktiv</span>
              </div>
              <div className="mockup__card">
                <div className="mockup__label">STRESSTEST</div>
                <div className="mockup__val-sm">+2 % Zins</div>
                <span className="mockup__pill mockup__pill--green">✓ Tragbar</span>
              </div>
            </div>
            <div className="mockup__float">
              <span className="mockup__float-icon">⚡</span>
              <div>
                <div className="mockup__float-label">Analysezeit</div>
                <div className="mockup__float-val">unter 60 Sek.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LOGOS TICKER ────────────────────────── */}
      <div className="logos">
        <span className="logos__label">VERTRAUT VON</span>
        <div className="logos__track-wrap">
          <div className="logos__track">
            {[...Array(2)].flatMap((_, r) =>
              ['RE/MAX', 'Volksbank', 'Sparkasse', 'ING', 'Dr. Klein', 'Interhyp', 'Engel & Völkers', 'Von Poll', 'Postbank', 'Commerzbank'].map((l, i) => (
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
            {[
              { num: '3.200+', label: 'Analysen pro Monat' },
              { num: '€ 4,2 Mrd.', label: 'Analysiertes Investitionsvolumen' },
              { num: '60 %', label: 'Weniger Zeit pro Beratung' },
              { num: '500+', label: 'Aktive Makler & Finanzierer' },
            ].map((s, i) => (
              <div key={i} className="stat" data-reveal data-delay={i + 1}>
                <div className="stat__num">{s.num}</div>
                <div className="stat__label">{s.label}</div>
              </div>
            ))}
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
              { icon: '◎', tag: 'Kernfunktion', title: 'Cashflow-Kalkulator', desc: 'Vollständige Einnahmen-Ausgaben-Rechnung inkl. Instandhaltung, Verwaltung, Leerstandsrücklage und Steuerwirkung — auf den Cent genau.' },
              { icon: '↗', tag: 'Kernfunktion', title: 'Renditeanalyse', desc: 'Brutto- und Nettomietrendite, Eigenkapitalrendite und Gesamtrendite auf einen Blick — inkl. Wertsteigerungsprognose.' },
              { icon: '⚠', tag: 'Einzigartig', title: 'Stresstest & Risiko', desc: 'Simuliere Zinserhöhungen, Mietausfälle und Kostensteigerungen. Zeige echte Szenarien — nicht nur das Best-Case-Modell.' },
              { icon: '⬡', tag: 'Förderprogramme', title: 'KfW-Integration', desc: 'Automatische Prüfung der Förderungsmöglichkeiten inkl. Tilgungszuschüsse und Zinsvorteil-Berechnung — direkt im Kalkulator.' },
              { icon: '⇄', tag: 'Beratungs-Tool', title: 'Vergleichsmodus', desc: 'Zwei Objekte oder Szenarien nebeneinander. Perfekt für Kundenentscheidungen und A/B-Verhandlungen.' },
              { icon: '□', tag: 'Sofort einsetzbar', title: 'PDF-Export', desc: 'Professionelle, gebrandete Analyseberichte mit einem Klick — direkt für Kunden, Banken oder interne Dokumentation.' },
            ].map((f, i) => (
              <div key={i} className="feat-card" data-reveal data-delay={i % 3 + 1}>
                <div className="feat-card__icon">{f.icon}</div>
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
              <div className="aud-card__label">🏠 Makler &amp; Vertrieb</div>
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
                  <li key={i}><span className="check">✓</span>{item}</li>
                ))}
              </ul>
            </div>
            <div className="aud-card" data-reveal data-delay="2">
              <div className="aud-card__label">🏛 Finanzierungsberater</div>
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
                  <li key={i}><span className="check">✓</span>{item}</li>
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
              { quote: 'Ich präsentiere das Objekt, öffne Immokalkulator, und meine Kunden sehen in Echtzeit warum sich das rechnet. Abschlussrate deutlich gestiegen.', name: 'Markus K.', role: 'Immobilienmakler, München' },
              { quote: 'Der Stresstest-Modus ist Gold wert. Banken lieben die PDFs — vollständig, professionell, bankfähig. Spart mir jeden Tag eine Stunde.', name: 'Sandra R.', role: 'Finanzierungsberaterin, Hamburg' },
              { quote: 'Endlich kein Excel mehr. Alle Kollegen im Büro nutzen es jetzt. Das Vergleichs-Tool hat uns schon mehrfach den entscheidenden Vorteil gebracht.', name: 'Jonas H.', role: 'Teamleiter Vertrieb, Berlin' },
            ].map((t, i) => (
              <div key={i} className="testi" data-reveal data-delay={i + 1}>
                <div className="testi__stars">★★★★★</div>
                <blockquote>"{t.quote}"</blockquote>
                <div className="testi__author">
                  <div className="testi__avatar">
                    {t.name.split(' ').map((n) => n[0]).join('')}
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
              <div className="plan__price"><span>€</span><b>0</b></div>
              <div className="plan__billing">Dauerhaft kostenlos</div>
              <ul className="plan__feats">
                <li className="on"><span>✓</span> 5 Analysen pro Monat</li>
                <li className="on"><span>✓</span> Cashflow &amp; Rendite</li>
                <li className="on"><span>✓</span> PDF-Export (mit Wasserzeichen)</li>
                <li className="off"><span>—</span> Stresstest-Modul</li>
                <li className="off"><span>—</span> KfW-Integration</li>
                <li className="off"><span>—</span> Vergleichsmodus</li>
              </ul>
              <a href="#cta" className="btn-outline btn--block">Kostenlos starten</a>
            </div>
            {/* Pro */}
            <div className="plan plan--featured" data-reveal data-delay="2">
              <div className="plan__badge">Beliebteste Wahl</div>
              <div className="plan__name">Pro</div>
              <div className="plan__tagline">Für aktive Berater</div>
              <div className="plan__price"><span>€</span><b>49</b></div>
              <div className="plan__billing">pro Monat · zzgl. MwSt. · monatlich kündbar</div>
              <ul className="plan__feats">
                <li className="on"><span>✓</span> Unbegrenzte Analysen</li>
                <li className="on"><span>✓</span> Cashflow, Rendite &amp; mehr</li>
                <li className="on"><span>✓</span> PDF-Export ohne Wasserzeichen</li>
                <li className="on"><span>✓</span> Stresstest-Modul</li>
                <li className="on"><span>✓</span> KfW-Integration</li>
                <li className="on"><span>✓</span> Vergleichsmodus</li>
              </ul>
              <a href="#cta" className="btn-primary btn--block">Pro starten →</a>
            </div>
            {/* Team */}
            <div className="plan" data-reveal data-delay="3">
              <div className="plan__name">Team</div>
              <div className="plan__tagline">Für Büros &amp; Teams</div>
              <div className="plan__price"><span>€</span><b>39</b></div>
              <div className="plan__billing">pro Nutzer / Monat · ab 3 Nutzer · zzgl. MwSt.</div>
              <ul className="plan__feats">
                <li className="on"><span>✓</span> Alles aus Pro</li>
                <li className="on"><span>✓</span> Team-Verwaltung &amp; Rollen</li>
                <li className="on"><span>✓</span> Eigenes Branding im PDF</li>
                <li className="on"><span>✓</span> Prioritäts-Support</li>
                <li className="on"><span>✓</span> Onboarding-Call inklusive</li>
                <li className="on"><span>✓</span> Zentrales Dashboard</li>
              </ul>
              <a href="#cta" className="btn-outline btn--block">Team anfragen</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────── */}
      <section className="cta" id="cta">
        <div className="cta__inner">
          <div className="cta__left" data-reveal>
            <h2>
              Bereit für bessere<br />
              Beratung mit<br />
              <em>Immokalkulator?</em>
            </h2>
            <ul className="cta__trust">
              <li>✓ Keine Kreditkarte nötig</li>
              <li>✓ 5 Analysen kostenlos</li>
              <li>✓ Sofort loslegen</li>
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
            <button className="btn-primary btn--block">Jetzt kostenlos starten →</button>
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
            <span className="footer__dot" />
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
