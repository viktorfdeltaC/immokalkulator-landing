export default function LandingPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');
        :root {
          --green:#1DB974;--green-light:#E8F9F1;--green-mid:#C0EDDA;--green-dark:#0FA05F;
          --black:#0B0E13;--gray-900:#1A1F2E;--gray-700:#3D4459;--gray-500:#6B7491;
          --gray-300:#B8BDD0;--gray-200:#DEE1EC;--gray-100:#F2F4F9;--gray-50:#F8F9FC;--white:#FFFFFF;
          --display:'Syne',sans-serif;--body:'DM Sans',sans-serif;
          --radius:12px;--radius-lg:20px;
          --shadow:0 4px 16px rgba(11,14,19,0.08),0 1px 4px rgba(11,14,19,0.05);
          --shadow-lg:0 16px 48px rgba(11,14,19,0.12),0 4px 12px rgba(11,14,19,0.06);
          --shadow-green:0 8px 32px rgba(29,185,116,0.2);
        }
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{font-family:var(--body);background:var(--white);color:var(--gray-900);font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased;overflow-x:hidden}
        nav{position:fixed;top:0;left:0;right:0;z-index:100;background:rgba(255,255,255,0.92);backdrop-filter:blur(16px);border-bottom:1px solid var(--gray-200);height:68px;display:flex;align-items:center;padding:0 40px}
        .nav-inner{max-width:1200px;width:100%;margin:0 auto;display:flex;align-items:center;justify-content:space-between}
        .nav-logo{font-family:var(--display);font-size:20px;font-weight:800;color:var(--black);text-decoration:none;display:flex;align-items:center;gap:8px;letter-spacing:-0.02em}
        .logo-dot{width:8px;height:8px;border-radius:50%;background:var(--green);display:inline-block;animation:blink 2.5s ease-in-out infinite}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0.3}}
        .nav-links{display:flex;align-items:center;gap:32px;list-style:none}
        .nav-links a{font-size:14px;font-weight:500;color:var(--gray-700);text-decoration:none;transition:color 0.2s}
        .nav-links a:hover{color:var(--black)}
        .nav-actions{display:flex;align-items:center;gap:12px}
        .btn-ghost{font-family:var(--body);font-size:14px;font-weight:500;color:var(--gray-700);background:none;border:none;cursor:pointer;padding:8px 16px;border-radius:8px;text-decoration:none;transition:all 0.2s}
        .btn-ghost:hover{background:var(--gray-100);color:var(--black)}
        .btn-primary{font-family:var(--body);font-size:14px;font-weight:600;color:var(--white);background:var(--green);border:none;cursor:pointer;padding:10px 22px;border-radius:8px;text-decoration:none;transition:all 0.2s;display:inline-flex;align-items:center;gap:6px}
        .btn-primary:hover{background:var(--green-dark);transform:translateY(-1px);box-shadow:var(--shadow-green)}
        .btn-primary-lg{font-size:16px;font-weight:600;padding:14px 32px;border-radius:10px}
        .btn-outline-lg{font-family:var(--body);font-size:16px;font-weight:500;color:var(--gray-900);background:transparent;border:1.5px solid var(--gray-200);cursor:pointer;padding:13px 32px;border-radius:10px;text-decoration:none;transition:all 0.2s;display:inline-flex;align-items:center;gap:8px}
        .btn-outline-lg:hover{border-color:var(--gray-300);background:var(--gray-50)}
        .hero{padding-top:68px;background:var(--white);min-height:100vh;display:flex;flex-direction:column;position:relative;overflow:hidden}
        .hero-bg{position:absolute;inset:0;z-index:0;background:radial-gradient(ellipse 70% 50% at 60% 20%,rgba(29,185,116,0.07) 0%,transparent 70%),radial-gradient(ellipse 40% 60% at 90% 80%,rgba(29,185,116,0.05) 0%,transparent 60%)}
        .hero-grid-lines{position:absolute;inset:0;z-index:0;background-image:linear-gradient(var(--gray-200) 1px,transparent 1px),linear-gradient(90deg,var(--gray-200) 1px,transparent 1px);background-size:64px 64px;opacity:0.35;mask-image:radial-gradient(ellipse 80% 60% at 50% 0%,black 0%,transparent 70%)}
        .hero-content{position:relative;z-index:1;max-width:1200px;margin:0 auto;padding:80px 40px 60px;display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:64px;flex:1}
        .hero-badge{display:inline-flex;align-items:center;gap:8px;background:var(--green-light);border:1px solid var(--green-mid);padding:6px 14px;border-radius:100px;font-size:13px;font-weight:500;color:var(--green-dark);margin-bottom:24px;width:fit-content}
        .badge-dot{width:6px;height:6px;border-radius:50%;background:var(--green)}
        .hero h1{font-family:var(--display);font-size:clamp(36px,4.5vw,56px);font-weight:800;line-height:1.08;letter-spacing:-0.03em;color:var(--black);margin-bottom:20px}
        .hero h1 .highlight{color:var(--green)}
        .hero-sub{font-size:17px;color:var(--gray-500);line-height:1.65;max-width:480px;margin-bottom:36px}
        .hero-sub strong{color:var(--gray-700);font-weight:500}
        .hero-actions{display:flex;align-items:center;gap:14px;flex-wrap:wrap;margin-bottom:44px}
        .hero-trust{display:flex;align-items:center;gap:12px}
        .trust-avatars{display:flex}
        .trust-avatars span{width:32px;height:32px;border-radius:50%;border:2px solid var(--white);margin-left:-8px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;color:var(--white)}
        .trust-avatars span:first-child{margin-left:0}
        .trust-avatars span:nth-child(1){background:#3B82F6}
        .trust-avatars span:nth-child(2){background:#8B5CF6}
        .trust-avatars span:nth-child(3){background:#F59E0B}
        .trust-avatars span:nth-child(4){background:#EF4444}
        .trust-text{font-size:13px;color:var(--gray-500)}
        .trust-text strong{color:var(--gray-700);font-weight:600}
        .stars{color:#F59E0B;font-size:13px;margin-bottom:2px}
        .hero-visual{position:relative}
        .hero-mockup{background:var(--gray-50);border:1px solid var(--gray-200);border-radius:var(--radius-lg);box-shadow:var(--shadow-lg),0 0 0 1px rgba(255,255,255,0.8);overflow:hidden;aspect-ratio:4/3;display:flex;flex-direction:column;animation:float 6s ease-in-out infinite}
        @keyframes float{0%,100%{transform:translateY(0px)}50%{transform:translateY(-10px)}}
        .mockup-bar{background:var(--white);border-bottom:1px solid var(--gray-200);padding:12px 16px;display:flex;align-items:center;gap:8px}
        .mockup-dot{width:10px;height:10px;border-radius:50%}
        .mockup-dot.red{background:#FF5F57}.mockup-dot.yellow{background:#FFBD2E}.mockup-dot.green{background:#28CA42}
        .mockup-title{font-size:12px;color:var(--gray-500);margin-left:8px;font-weight:500}
        .mockup-body{flex:1;padding:20px;display:grid;grid-template-columns:1fr 1fr;gap:12px}
        .mockup-card{background:var(--white);border:1px solid var(--gray-200);border-radius:10px;padding:14px}
        .mockup-card.accent{background:var(--green);border-color:var(--green)}
        .mockup-label{font-size:10px;font-weight:500;color:var(--gray-500);letter-spacing:0.04em;text-transform:uppercase;margin-bottom:6px}
        .mockup-card.accent .mockup-label{color:rgba(255,255,255,0.7)}
        .mockup-value{font-family:var(--display);font-size:20px;font-weight:700;color:var(--black);letter-spacing:-0.02em}
        .mockup-card.accent .mockup-value{color:var(--white);font-size:22px}
        .mockup-delta{font-size:11px;font-weight:500;color:var(--green);display:flex;align-items:center;gap:3px;margin-top:4px}
        .mockup-card.accent .mockup-delta{color:rgba(255,255,255,0.8)}
        .mockup-bar-chart{display:flex;align-items:flex-end;gap:4px;height:40px;margin-top:8px}
        .bar-col{flex:1;border-radius:3px 3px 0 0;background:var(--gray-200)}
        .bar-col.active{background:var(--green)}
        .mockup-progress{height:4px;background:var(--gray-200);border-radius:4px;overflow:hidden}
        .mockup-progress-fill{height:100%;background:var(--green);border-radius:4px}
        .mockup-pill{display:inline-flex;align-items:center;gap:4px;background:var(--green-light);color:var(--green-dark);font-size:10px;font-weight:600;padding:3px 8px;border-radius:100px;margin-top:6px}
        .hero-float-1,.hero-float-2{position:absolute;background:var(--white);border:1px solid var(--gray-200);border-radius:var(--radius);padding:12px 16px;box-shadow:var(--shadow);display:flex;align-items:center;gap:10px;z-index:2}
        .hero-float-1{bottom:-20px;left:-40px}
        .hero-float-2{top:30px;right:-30px}
        .float-icon{width:36px;height:36px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:18px}
        .float-icon.green{background:var(--green-light)}.float-icon.amber{background:#FEF3C7}
        .float-text-label{font-size:11px;color:var(--gray-500)}
        .float-text-val{font-size:14px;font-weight:700;color:var(--black);font-family:var(--display);letter-spacing:-0.01em}
        .logos-bar{background:var(--gray-50);border-top:1px solid var(--gray-200);border-bottom:1px solid var(--gray-200);padding:20px 40px}
        .logos-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:12px}
        .logos-label{font-size:12px;font-weight:500;color:var(--gray-300);white-space:nowrap;letter-spacing:0.06em;text-transform:uppercase;flex-shrink:0}
        .logos-divider{width:1px;height:24px;background:var(--gray-200);flex-shrink:0}
        .logos-track{flex:1;overflow:hidden;mask-image:linear-gradient(90deg,transparent,black 10%,black 90%,transparent)}
        .logos-scroll{display:flex;align-items:center;gap:48px;animation:logos-move 20s linear infinite;width:max-content}
        @keyframes logos-move{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        .logo-item{font-family:var(--display);font-size:15px;font-weight:700;color:var(--gray-300);white-space:nowrap}
        .stats{padding:72px 40px;background:var(--white)}
        .stats-inner{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);border:1px solid var(--gray-200);border-radius:var(--radius-lg);overflow:hidden}
        .stat-item{padding:36px 32px;background:var(--white);border-right:1px solid var(--gray-200);transition:background 0.2s}
        .stat-item:last-child{border-right:none}
        .stat-item:hover{background:var(--gray-50)}
        .stat-num{font-family:var(--display);font-size:44px;font-weight:800;color:var(--black);letter-spacing:-0.04em;line-height:1;margin-bottom:8px}
        .stat-num .unit{font-size:28px}.stat-num .accent{color:var(--green)}
        .stat-label{font-size:14px;color:var(--gray-500);line-height:1.4}
        .section{padding:96px 40px}
        .section-inner{max-width:1200px;margin:0 auto}
        .section-tag{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--green);margin-bottom:16px}
        .section-tag::before{content:'';display:block;width:16px;height:2px;background:var(--green)}
        .section-heading{font-family:var(--display);font-size:clamp(28px,3vw,42px);font-weight:800;letter-spacing:-0.03em;color:var(--black);line-height:1.1;margin-bottom:16px}
        .section-sub{font-size:17px;color:var(--gray-500);max-width:560px;line-height:1.65}
        .features{background:var(--gray-50)}
        .features-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:56px}
        .feature-card{background:var(--white);border:1px solid var(--gray-200);border-radius:var(--radius-lg);padding:28px;transition:all 0.25s;position:relative;overflow:hidden}
        .feature-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:transparent;transition:background 0.25s}
        .feature-card:hover{border-color:var(--green-mid);box-shadow:var(--shadow);transform:translateY(-2px)}
        .feature-card:hover::before{background:var(--green)}
        .feature-icon{width:44px;height:44px;border-radius:10px;background:var(--green-light);display:flex;align-items:center;justify-content:center;font-size:20px;margin-bottom:18px}
        .feature-title{font-family:var(--display);font-size:18px;font-weight:700;color:var(--black);margin-bottom:10px;letter-spacing:-0.01em}
        .feature-desc{font-size:14px;color:var(--gray-500);line-height:1.65}
        .feature-tag{display:inline-block;margin-top:16px;font-size:11px;font-weight:600;color:var(--green-dark);background:var(--green-light);padding:3px 10px;border-radius:100px}
        .for-who{background:var(--white)}
        .for-who-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:56px}
        .for-card{border:1.5px solid var(--gray-200);border-radius:var(--radius-lg);padding:36px;position:relative;overflow:hidden;transition:all 0.25s}
        .for-card:hover{border-color:var(--green);box-shadow:0 8px 40px rgba(29,185,116,0.1)}
        .for-card-bg{position:absolute;bottom:-40px;right:-40px;font-size:120px;opacity:0.04;user-select:none;transition:opacity 0.25s}
        .for-card:hover .for-card-bg{opacity:0.07}
        .for-pill{display:inline-flex;align-items:center;gap:6px;background:var(--gray-100);font-size:12px;font-weight:600;color:var(--gray-700);padding:5px 12px;border-radius:100px;margin-bottom:20px}
        .for-title{font-family:var(--display);font-size:26px;font-weight:800;color:var(--black);letter-spacing:-0.02em;margin-bottom:12px}
        .for-desc{font-size:15px;color:var(--gray-500);line-height:1.65;margin-bottom:24px}
        .for-list{list-style:none;display:flex;flex-direction:column;gap:10px}
        .for-list li{font-size:14px;color:var(--gray-700);display:flex;align-items:flex-start;gap:10px;line-height:1.5}
        .for-list li::before{content:'✓';color:var(--green);font-weight:700;font-size:13px;flex-shrink:0;margin-top:2px}
        .pricing{background:var(--gray-50)}
        .pricing-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:56px;align-items:start}
        .pricing-card{background:var(--white);border:1.5px solid var(--gray-200);border-radius:var(--radius-lg);padding:32px;position:relative;transition:all 0.25s}
        .pricing-card:hover{box-shadow:var(--shadow)}
        .pricing-card.featured{border-color:var(--green);box-shadow:var(--shadow-green)}
        .featured-badge{position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:var(--green);color:var(--white);font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;padding:4px 14px;border-radius:100px;white-space:nowrap}
        .plan-name{font-family:var(--display);font-size:20px;font-weight:700;color:var(--black);margin-bottom:4px}
        .plan-desc{font-size:13px;color:var(--gray-500);margin-bottom:24px}
        .plan-price{display:flex;align-items:flex-end;gap:4px;margin-bottom:6px}
        .price-amount{font-family:var(--display);font-size:48px;font-weight:800;color:var(--black);letter-spacing:-0.04em;line-height:1}
        .price-currency{font-size:22px;font-weight:600;color:var(--gray-500);margin-bottom:6px}
        .price-period{font-size:13px;color:var(--gray-500)}
        .price-note{font-size:12px;color:var(--gray-300);margin-bottom:24px}
        .plan-divider{height:1px;background:var(--gray-100);margin-bottom:20px}
        .plan-features{list-style:none;display:flex;flex-direction:column;gap:10px;margin-bottom:28px}
        .plan-features li{font-size:14px;color:var(--gray-700);display:flex;align-items:center;gap:10px}
        .plan-features li .check{width:18px;height:18px;border-radius:50%;background:var(--green-light);color:var(--green);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0}
        .plan-features li .check.dim{background:var(--gray-100);color:var(--gray-300)}
        .btn-plan{width:100%;font-family:var(--body);font-size:15px;font-weight:600;padding:13px;border-radius:10px;border:none;cursor:pointer;transition:all 0.2s;text-align:center;text-decoration:none;display:block}
        .btn-plan.primary{background:var(--green);color:var(--white)}
        .btn-plan.primary:hover{background:var(--green-dark);box-shadow:var(--shadow-green);transform:translateY(-1px)}
        .btn-plan.outline{background:transparent;color:var(--gray-900);border:1.5px solid var(--gray-200)}
        .btn-plan.outline:hover{border-color:var(--gray-300);background:var(--gray-50)}
        .b2b-note{margin-top:24px;background:var(--white);border:1px solid var(--gray-200);border-radius:var(--radius);padding:20px 28px;display:flex;align-items:center;justify-content:space-between;gap:20px}
        .b2b-note-text{font-size:14px;color:var(--gray-700)}
        .b2b-note-text strong{color:var(--black);font-weight:600}
        .btn-b2b{font-family:var(--body);font-size:14px;font-weight:600;color:var(--green);background:var(--green-light);border:none;cursor:pointer;padding:10px 20px;border-radius:8px;white-space:nowrap;text-decoration:none;transition:all 0.2s;flex-shrink:0}
        .btn-b2b:hover{background:var(--green-mid)}
        .cta-section{padding:96px 40px;background:var(--black);position:relative;overflow:hidden}
        .cta-bg{position:absolute;inset:0;background:radial-gradient(ellipse 60% 80% at 80% 50%,rgba(29,185,116,0.12) 0%,transparent 70%)}
        .cta-inner{max-width:1200px;margin:0 auto;position:relative;z-index:1;display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:64px}
        .cta-heading{font-family:var(--display);font-size:clamp(32px,3.5vw,48px);font-weight:800;letter-spacing:-0.03em;color:var(--white);line-height:1.1;margin-bottom:16px}
        .cta-heading .green{color:var(--green)}
        .cta-sub{font-size:17px;color:rgba(255,255,255,0.5);line-height:1.65}
        .cta-form{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:var(--radius-lg);padding:36px}
        .cta-form-title{font-family:var(--display);font-size:22px;font-weight:700;color:var(--white);margin-bottom:6px}
        .cta-form-sub{font-size:14px;color:rgba(255,255,255,0.4);margin-bottom:24px}
        .form-row{display:flex;gap:12px;margin-bottom:12px}
        .form-input{flex:1;width:100%;font-family:var(--body);font-size:14px;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:var(--white);padding:12px 16px;outline:none;transition:border-color 0.2s}
        .form-input::placeholder{color:rgba(255,255,255,0.3)}
        .form-input:focus{border-color:var(--green)}
        .form-hint{font-size:12px;color:rgba(255,255,255,0.25);margin-top:10px;text-align:center}
        footer{background:var(--black);border-top:1px solid rgba(255,255,255,0.07);padding:48px 40px}
        .footer-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap}
        .footer-logo{font-family:var(--display);font-size:18px;font-weight:800;color:var(--white)}
        .footer-logo span{color:var(--green)}
        .footer-copy{font-size:13px;color:rgba(255,255,255,0.3)}
        .footer-links{display:flex;gap:24px;list-style:none}
        .footer-links a{font-size:13px;color:rgba(255,255,255,0.3);text-decoration:none;transition:color 0.2s}
        .footer-links a:hover{color:rgba(255,255,255,0.6)}
        @keyframes fade-up{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        .hero-left > *{animation:fade-up 0.6s ease both}
        .hero-left > *:nth-child(1){animation-delay:0.1s}
        .hero-left > *:nth-child(2){animation-delay:0.2s}
        .hero-left > *:nth-child(3){animation-delay:0.3s}
        .hero-left > *:nth-child(4){animation-delay:0.4s}
        .hero-left > *:nth-child(5){animation-delay:0.5s}
        .hero-visual{animation:fade-up 0.7s 0.4s ease both}
      `}</style>

      {/* NAV */}
      <nav>
        <div className="nav-inner">
          <a href="#" className="nav-logo"><span className="logo-dot"></span>Immokalkulator</a>
          <ul className="nav-links">
            <li><a href="#features">Funktionen</a></li>
            <li><a href="#for-who">Für wen</a></li>
            <li><a href="#pricing">Preise</a></li>
          </ul>
          <div className="nav-actions">
            <a href="#" className="btn-ghost">Anmelden</a>
            <a href="#cta" className="btn-primary">Kostenlos testen →</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="hero-grid-lines"></div>
        <div className="hero-content">
          <div className="hero-left">
            <div className="hero-badge"><span className="badge-dot"></span>Für Makler &amp; Finanzierungsberater</div>
            <h1>Schluss mit Excel.<br />Anfang mit <span className="highlight">besserer Beratung</span> zu schnelleren Abschlüssen.</h1>
            <p className="hero-sub">
              Cashflow, Rendite, Stresstest — alles in einem Tool.<br />
              <strong>Professionelle Investitionsanalyse für Makler und Finanzierer — in Sekunden.</strong>
            </p>
            <div className="hero-actions">
              <a href="#cta" className="btn-primary btn-primary-lg">Jetzt kostenlos starten →</a>
              <a href="#features" className="btn-outline-lg">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M6 5.5l4.5 2.5L6 10.5V5.5z" fill="currentColor"/>
                </svg>
                Demo ansehen
              </a>
            </div>
            <div className="hero-trust">
              <div className="trust-avatars"><span>MK</span><span>SR</span><span>JH</span><span>TL</span></div>
              <div>
                <div className="stars">★★★★★</div>
                <div className="trust-text"><strong>Bereits 500+</strong> Makler &amp; Finanzierer im Einsatz</div>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-mockup">
              <div className="mockup-bar">
                <div className="mockup-dot red"></div>
                <div className="mockup-dot yellow"></div>
                <div className="mockup-dot green"></div>
                <span className="mockup-title">Immokalkulator — Objekt Analyse</span>
              </div>
              <div className="mockup-body">
                <div className="mockup-card accent">
                  <div className="mockup-label">Netto-Rendite p.a.</div>
                  <div className="mockup-value">4,8 %</div>
                  <div className="mockup-delta">↑ +0,3% vs. Vorjahr</div>
                </div>
                <div className="mockup-card">
                  <div className="mockup-label">Monatl. Cashflow</div>
                  <div className="mockup-value">+382 €</div>
                  <div className="mockup-delta" style={{color:'var(--green)'}}>↑ Positiv</div>
                </div>
                <div className="mockup-card">
                  <div className="mockup-label">KfW-Integration</div>
                  <div className="mockup-value" style={{fontSize:'14px',marginTop:'4px'}}>KfW 300 aktiv</div>
                  <div className="mockup-pill">✓ Geprüft</div>
                  <div className="mockup-progress" style={{marginTop:'10px'}}>
                    <div className="mockup-progress-fill" style={{width:'78%'}}></div>
                  </div>
                </div>
                <div className="mockup-card">
                  <div className="mockup-label">Stresstest</div>
                  <div className="mockup-value" style={{fontSize:'14px',marginTop:'4px'}}>+2% Zins</div>
                  <div className="mockup-delta" style={{color:'var(--green)'}}>✓ Tragbar</div>
                  <div className="mockup-bar-chart">
                    <div className="bar-col" style={{height:'55%'}}></div>
                    <div className="bar-col" style={{height:'70%'}}></div>
                    <div className="bar-col active" style={{height:'85%'}}></div>
                    <div className="bar-col" style={{height:'60%'}}></div>
                    <div className="bar-col" style={{height:'45%'}}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hero-float-1">
              <div className="float-icon green">📄</div>
              <div><div className="float-text-label">PDF-Export</div><div className="float-text-val">Bereit in 1 Klick</div></div>
            </div>
            <div className="hero-float-2">
              <div className="float-icon amber">⚡</div>
              <div><div className="float-text-label">Analysezeit</div><div className="float-text-val">unter 60 Sek.</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* LOGOS */}
      <div className="logos-bar">
        <div className="logos-inner">
          <span className="logos-label">Vertraut von</span>
          <div className="logos-divider"></div>
          <div className="logos-track">
            <div className="logos-scroll">
              {['Engel & Völkers','Von Poll','RE/MAX','Volksbank','Sparkasse','ING','Dr. Klein','Interhyp',
                'Engel & Völkers','Von Poll','RE/MAX','Volksbank','Sparkasse','ING','Dr. Klein','Interhyp'].map((n,i)=>(
                <span className="logo-item" key={i}>{n}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* STATS */}
      <section className="stats">
        <div className="stats-inner">
          {[{num:'3.200',unit:'+',label:'Analysen pro Monat'},{num:'€ 4,2',unit:' Mrd.',label:'Analysiertes Investitionsvolumen'},{num:'60',unit:'%',label:'Weniger Zeit pro Beratung'},{num:'500',unit:'+',label:'Makler & Finanzierer aktiv'}].map((s,i)=>(
            <div className="stat-item" key={i}>
              <div className="stat-num"><span className="accent">{s.num}</span><span className="unit">{s.unit}</span></div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="section features" id="features">
        <div className="section-inner">
          <div className="section-tag">Funktionen</div>
          <h2 className="section-heading">Alles was du für eine<br />professionelle Beratung brauchst.</h2>
          <p className="section-sub">Von der ersten Kalkulation bis zum fertigen PDF — in einem einzigen Tool, ohne Excel, ohne Nachrechnen.</p>
          <div className="features-grid">
            {[
              {icon:'📊',title:'Cashflow-Kalkulator',desc:'Vollständige Einnahmen-Ausgaben-Rechnung inkl. Instandhaltung, Verwaltung, Leerstandsrücklage und Steuerwirkung — auf den Cent genau.',tag:'Kernfunktion'},
              {icon:'📈',title:'Renditeanalyse',desc:'Brutto- und Nettomietrendite, Eigenkapitalrendite und Gesamtrendite auf einen Blick — inkl. Wertsteigerungsprognose.',tag:'Kernfunktion'},
              {icon:'🔥',title:'Stresstest & Risiko',desc:'Simuliere Zinserhöhungen, Mietausfälle und Kostensteigerungen. Zeige deinem Kunden echte Szenarien — nicht nur das Best-Case-Modell.',tag:'Einzigartig'},
              {icon:'🏦',title:'KfW-Integration',desc:'Automatische Prüfung der KfW-Förderungsmöglichkeiten inkl. Tilgungszuschüsse und Zinsvorteil-Berechnung — direkt im Kalkulator.',tag:'Förderprogramme'},
              {icon:'🔄',title:'Vergleichsmodus',desc:'Vergleiche zwei Objekte oder Finanzierungsszenarien nebeneinander. Perfekt für Kundenentscheidungen und A/B-Verhandlungen.',tag:'Beratungs-Tool'},
              {icon:'📄',title:'PDF-Export',desc:'Professionelle, gebrandete Analyseberichte mit einem Klick — direkt für Kunden, Banken oder interne Dokumentation.',tag:'Sofort einsetzbar'},
            ].map((f,i)=>(
              <div className="feature-card" key={i}>
                <div className="feature-icon">{f.icon}</div>
                <div className="feature-title">{f.title}</div>
                <div className="feature-desc">{f.desc}</div>
                <span className="feature-tag">{f.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOR WHO */}
      <section className="section for-who" id="for-who">
        <div className="section-inner">
          <div className="section-tag">Zielgruppen</div>
          <h2 className="section-heading">Gebaut für die, die täglich<br />mit Immobilienzahlen arbeiten.</h2>
          <p className="section-sub">Zwei Berufsgruppen. Dieselben Zahlen. Ein Tool das für beide funktioniert.</p>
          <div className="for-who-grid">
            <div className="for-card">
              <span className="for-card-bg">🏠</span>
              <div className="for-pill">🏠 Für Makler &amp; Vertrieb</div>
              <div className="for-title">Der unfaire Vorteil im Kundengespräch.</div>
              <div className="for-desc">Zeige deinen Kunden live, was ein Objekt wirklich wert ist — mit Zahlen die überzeugen, nicht mit Bauchgefühl.</div>
              <ul className="for-list">
                <li>Vollständige Investitionsanalyse in unter 60 Sekunden</li>
                <li>Professionelle PDFs die Vertrauen schaffen</li>
                <li>Stresstest-Szenarien die Einwände entkräften</li>
                <li>Rendite- und Cashflow-Vergleich mehrerer Objekte</li>
                <li>KfW-Förderpotenzial direkt ausweisen</li>
              </ul>
            </div>
            <div className="for-card">
              <span className="for-card-bg">🏦</span>
              <div className="for-pill">🏦 Für Finanzierungsberater</div>
              <div className="for-title">Tragbarkeit auf einen Blick.</div>
              <div className="for-desc">Von der ersten Anfrage bis zur Entscheidungsvorlage — liefere bankfähige Analysen die Kreditprüfungen überstehen.</div>
              <ul className="for-list">
                <li>Beleihungsauslauf und Eigenkapitalquote automatisch</li>
                <li>Stresstest bei +1%, +2%, +3% Zinsen</li>
                <li>Cashflow-Nachweis für Banken als PDF-Export</li>
                <li>KfW 300 / Bundesförderung direkt integriert</li>
                <li>Mehrere Finanzierungsszenarien im Vergleich</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="section pricing" id="pricing">
        <div className="section-inner">
          <div className="section-tag">Preise</div>
          <h2 className="section-heading">Transparent. Skalierbar.<br />Kein Kleingedrucktes.</h2>
          <p className="section-sub">Starte kostenlos und skaliere wenn du bereit bist.</p>
          <div className="pricing-grid">
            <div className="pricing-card">
              <div className="plan-name">Starter</div>
              <div className="plan-desc">Für den Einstieg</div>
              <div className="plan-price"><span className="price-currency">€</span><span className="price-amount">0</span></div>
              <div className="price-period">Dauerhaft kostenlos</div>
              <div className="price-note">&nbsp;</div>
              <div className="plan-divider"></div>
              <ul className="plan-features">
                <li><span className="check">✓</span>5 Analysen pro Monat</li>
                <li><span className="check">✓</span>Cashflow &amp; Rendite</li>
                <li><span className="check">✓</span>PDF-Export (mit Wasserzeichen)</li>
                <li><span className="check dim">✗</span><span style={{color:'var(--gray-300)'}}>Stresstest-Modul</span></li>
                <li><span className="check dim">✗</span><span style={{color:'var(--gray-300)'}}>KfW-Integration</span></li>
                <li><span className="check dim">✗</span><span style={{color:'var(--gray-300)'}}>Vergleichsmodus</span></li>
              </ul>
              <a href="#" className="btn-plan outline">Kostenlos starten</a>
            </div>
            <div className="pricing-card featured">
              <div className="featured-badge">Beliebteste Wahl</div>
              <div className="plan-name">Pro</div>
              <div className="plan-desc">Für aktive Berater</div>
              <div className="plan-price"><span className="price-currency">€</span><span className="price-amount">XX</span></div>
              <div className="price-period">pro Monat</div>
              <div className="price-note">zzgl. MwSt. · monatlich kündbar</div>
              <div className="plan-divider"></div>
              <ul className="plan-features">
                <li><span className="check">✓</span>Unbegrenzte Analysen</li>
                <li><span className="check">✓</span>Cashflow, Rendite &amp; mehr</li>
                <li><span className="check">✓</span>PDF-Export ohne Wasserzeichen</li>
                <li><span className="check">✓</span>Stresstest-Modul</li>
                <li><span className="check">✓</span>KfW-Integration</li>
                <li><span className="check">✓</span>Vergleichsmodus</li>
              </ul>
              <a href="#" className="btn-plan primary">Pro starten →</a>
            </div>
            <div className="pricing-card">
              <div className="plan-name">Team</div>
              <div className="plan-desc">Für Büros &amp; Teams</div>
              <div className="plan-price"><span className="price-currency">€</span><span className="price-amount">XX</span></div>
              <div className="price-period">pro Nutzer / Monat</div>
              <div className="price-note">ab 3 Nutzer · zzgl. MwSt.</div>
              <div className="plan-divider"></div>
              <ul className="plan-features">
                <li><span className="check">✓</span>Alles aus Pro</li>
                <li><span className="check">✓</span>Team-Verwaltung</li>
                <li><span className="check">✓</span>Eigenes Branding im PDF</li>
                <li><span className="check">✓</span>Nutzerverwaltung &amp; Rollen</li>
                <li><span className="check">✓</span>Prioritäts-Support</li>
                <li><span className="check">✓</span>Onboarding-Call inklusive</li>
              </ul>
              <a href="#" className="btn-plan outline">Team anfragen</a>
            </div>
          </div>
          <div className="b2b-note">
            <div className="b2b-note-text">
              <strong>B2B-Lizenz für Vertriebsorganisationen &amp; Franchisesysteme?</strong>{' '}
              Wir bieten maßgeschneiderte Pakete für größere Teams, Brokerage-Netzwerke und Finanzierungsverbünde — inkl. White-Label und API-Zugang.
            </div>
            <a href="#cta" className="btn-b2b">Lizenz anfragen →</a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id="cta">
        <div className="cta-bg"></div>
        <div className="cta-inner">
          <div>
            <h2 className="cta-heading">Bereit für bessere<br />Beratung mit <span className="green">Immokalkulator</span>?</h2>
            <p className="cta-sub">Erstelle deine erste professionelle Investitionsanalyse — kostenlos, ohne Kreditkarte, in unter 2 Minuten.</p>
          </div>
          <div className="cta-form">
            <div className="cta-form-title">Kostenlos registrieren</div>
            <div className="cta-form-sub">Starter-Plan · Keine Kreditkarte nötig</div>
            <div className="form-row">
              <input type="text" className="form-input" placeholder="Vorname" />
              <input type="text" className="form-input" placeholder="Nachname" />
            </div>
            <input type="email" className="form-input" placeholder="E-Mail-Adresse" style={{marginBottom:'12px'}} />
            <a href="#" className="btn-primary btn-primary-lg" style={{width:'100%',justifyContent:'center',display:'flex'}}>
              Jetzt kostenlos starten →
            </a>
            <div className="form-hint">Mit der Registrierung stimmst du unseren AGB und Datenschutzbestimmungen zu.</div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div className="footer-logo">Immo<span>kalkulator</span></div>
          <ul className="footer-links">
            <li><a href="#">Impressum</a></li>
            <li><a href="#">Datenschutz</a></li>
            <li><a href="#">AGB</a></li>
            <li><a href="#">Kontakt</a></li>
          </ul>
          <div className="footer-copy">© 2026 Immokalkulator. Alle Rechte vorbehalten.</div>
        </div>
      </footer>
    </>
  );
}
