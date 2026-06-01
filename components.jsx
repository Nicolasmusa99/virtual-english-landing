// Virtual English — section components
const { useState: _useState, useEffect: _useEffect } = React;
const WAPP_URL = 'https://wa.me/5491130713390?text=Hola%2C%20quiero%20solicitar%20una%20evaluaci%C3%B3n%20sin%20cargo.';

function Nav() {
  const y = useScrollY();
  const scrolled = y > 12;
  const links = [
    { href: '#metodo', label: 'El método' },
    { href: '#precios', label: 'Precios' },
    { href: '#teachers', label: 'For teachers' },
    { href: '#faq', label: 'Contacto' },
  ];
  const [active, setActive] = _useState('#hero');
  _useEffect(() => {
    const ids = ['hero', ...links.map((l) => l.href.slice(1))];
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive('#' + id);
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      io.observe(el);
      return io;
    });
    return () => observers.forEach((o) => o && o.disconnect());
  }, []);
  const handleNav = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' });
  };
  return (
    <nav className={'nav ' + (scrolled ? 'scrolled' : '')}>
      <div className="nav-inner">
        <a href="#hero" className="nav-logo" onClick={(e) => handleNav(e, '#hero')}>
          Virtual <b>English</b>
        </a>
        <div className="nav-links">
          {links.map((l) => (
            <a key={l.href} href={l.href} className={'nav-link ' + (active === l.href ? 'active' : '')} onClick={(e) => handleNav(e, l.href)}>{l.label}</a>
          ))}
          <a href={WAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-cta" style={{ padding: '11px 22px', fontSize: 14 }}>
            Solicitar evaluación <span style={{ marginLeft: 8 }}>→</span>
          </a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="hero" className="bg-cream section hero">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-left">
            <Reveal delay={0}>
              <img
                src="logo.jpg"
                alt="Virtual English"
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 8,
                  display: 'block',
                  marginBottom: 20,
                  boxShadow: '0 4px 16px rgba(31,53,86,0.12)'
                }}
              />
            </Reveal>
            <Reveal delay={60}><div className="eyebrow">Clases en vivo · 100% online</div></Reveal>
            <Reveal delay={100}>
              <h1 className="h-display">Dejá de traducir.<br/>Pensá en inglés.</h1>
            </Reveal>
            <Reveal delay={220}>
              <p className="lede" style={{ maxWidth: 540 }}>
                Escenas reales de cine para entrenar respuesta en tiempo real. No se estudia. Se entrena.
              </p>
            </Reveal>
            <Reveal delay={320}>
              <p className="tiny-italic">Sistema desarrollado desde 1996.</p>
            </Reveal>
            <Reveal delay={420}>
              <div className="hero-credentials">
                <div className="cred">
                  <div className="cred-num">1 a 1</div>
                  <div className="cred-label">Clases en vivo, individuales</div>
                </div>
                <div className="cred-divider"/>
                <div className="cred">
                  <div className="cred-num">60 min</div>
                  <div className="cred-label">Duración por sesión</div>
                </div>
                <div className="cred-divider"/>
                <div className="cred">
                  <div className="cred-num">2×/sem</div>
                  <div className="cred-label">Cadencia recomendada</div>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={520}>
            <CtaBox/>
          </Reveal>
        </div>

        <Reveal delay={680}>
          <div className="kpi-strip">
            <KpiItem target={1996} label="Año de inicio" raw/>
            <KpiItem target={98} label="Satisfacción" suffix="%"/>
            <KpiItem target={2400} label="Alumnos" suffix="+"/>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function KpiItem({ target, label, suffix = '', raw = false }) {
  const [ref, val] = useCountUp(target, { suffix, duration: 1700 });
  // For year (1996) we don't want thousand separators
  const display = raw ? Math.round(parseFloat(String(val).replace(/[^\d]/g, '')) || 0).toString() : val;
  return (
    <div>
      <div className="kpi-num" ref={ref}>{display}</div>
      <div className="kpi-label">{label}</div>
    </div>
  );
}

function VideoCard() {
  const lines = [
    { s: 'WOMAN', t: "I wasn't expecting to see you here." },
    { s: 'MAN',   t: "It's not what you said. It's how you said it." },
    { s: 'WOMAN', t: "We don't have to figure this out tonight." },
    { s: 'MAN',   t: "Do you ever stop to think about it?" },
    { s: 'WOMAN', t: "I keep meaning to call her." },
  ];
  const [idx, setIdx] = _useState(0);
  const [visible, setVisible] = _useState(true);
  const [tc, setTc] = _useState(42);
  _useEffect(() => {
    let cancelled = false;
    const cycle = () => {
      setVisible(false);
      setTimeout(() => {
        if (cancelled) return;
        setIdx((i) => (i + 1) % lines.length);
        setVisible(true);
      }, 550);
    };
    const interval = setInterval(cycle, 3400);
    return () => { cancelled = true; clearInterval(interval); };
  }, []);
  _useEffect(() => {
    const tick = setInterval(() => setTc((s) => (s + 1) % 600), 1000);
    return () => clearInterval(tick);
  }, []);
  const mins = String(Math.floor(tc / 60)).padStart(2, '0');
  const secs = String(tc % 60).padStart(2, '0');
  const line = lines[idx];
  return (
    <div className="video-shell" role="img" aria-label="Escena de práctica - diálogo en tiempo real">
      <svg className="video-grain" xmlns="http://www.w3.org/2000/svg">
        <filter id="vgrain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"/>
          <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#vgrain)"/>
      </svg>
      <div className="video-vignette"/>
      <div className="scene-slug">Escena · Int. Café — Night</div>
      <div className="scene-time">00:{mins.slice(1)}:{secs}</div>
      <div className="subtitle-stage" aria-live="polite">
        <div className={'subtitle ' + (visible ? 'show' : '')} key={idx}>
          <span className="speaker">{line.s}</span>
          {line.t}
        </div>
      </div>
      <div className="video-caption">ESCENA REAL · ENTRENAMIENTO EN TIEMPO REAL</div>
    </div>
  );
}

function CtaBox() {
  return (
    <aside className="cta-box" aria-label="Llamado a la acción">
      <h3>Primera sesión de evaluación, gratis.</h3>
      <div className="flex col gap-16" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {[
          'Escenas reales de cine',
          'Sin reglas de libro',
          'Respuesta en tiempo real',
        ].map((t) => (
          <div key={t} className="check-row">
            <span className="check-circle"><Icon.Check size={14}/></span>
            <span>{t}</span>
          </div>
        ))}
      </div>
      <a href={WAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-cta btn-cta--wide">
        Quiero mi primera sesión <span style={{ marginLeft: 8 }}>→</span>
      </a>
      <p className="tiny-italic center" style={{ textAlign: 'center' }}>
        Evaluación gratuita. Sin compromiso.
      </p>
    </aside>
  );
}

function Problem() {
  return (
    <section id="problema" className="bg-dark section">
      <div className="container--narrow center" style={{ textAlign: 'center' }}>
        <Reveal><div className="eyebrow eyebrow--dark">Por qué no podés hablar inglés</div></Reveal>
        <Reveal delay={120}>
          <h2 className="h-section h-section--italic" style={{ marginTop: 22, color: '#fff' }}>
            El problema no sos vos. Es cómo te enseñaron.
          </h2>
        </Reveal>
        <Reveal delay={260}>
          <p className="on-dark" style={{ marginTop: 40, fontSize: 17, lineHeight: 1.7 }}>
            La mayoría de las personas que estudia inglés sigue haciendo lo mismo: escucha → traduce → arma la respuesta → habla tarde y forzado. Ese no es el problema del alumno. Es el problema del modelo.
          </p>
        </Reveal>
        <Reveal delay={360}><div className="problem-rule"/></Reveal>
        <Reveal delay={420}>
          <p className="problem-emphasis">Agregar más estudio no lo resuelve. El modelo está roto.</p>
        </Reveal>
        <Reveal delay={520}><div className="problem-rule"/></Reveal>
        <Reveal delay={580}>
          <p className="on-dark" style={{ fontSize: 17, lineHeight: 1.7 }}>
            Virtual English cambia el eje: no enseña el idioma como contenido, sino que entrena su uso en tiempo real.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: '01', t: 'Diagnóstico real', d: 'Una conversación para detectar dónde se rompe tu fluidez. No un test. Una escena.' },
    { n: '02', t: 'Material auténtico', d: 'Películas, diálogos reales, situaciones de uso. Cero libro de texto.' },
    { n: '03', t: 'Respuesta en tiempo real', d: 'Entrenás reacción, no construcción. El idioma sale antes de pensar.' },
    { n: '04', t: 'Activación progresiva', d: 'El inglés empieza a salir con menos esfuerzo. No es magia, es entrenamiento.' },
  ];
  return (
    <section id="metodo" className="bg-cream section">
      <div className="container">
        <div className="how-header">
          <Reveal>
            <h2 className="h-section">Dejá de estudiar inglés.<br/>Empezá a usarlo.</h2>
          </Reveal>
          <Reveal delay={140}>
            <p style={{ fontSize: 17, color: 'var(--muted-dark)' }}>
              El método tiene una secuencia clara. No es ortodoxia ni innovación performática: es lo que funciona, depurado durante casi treinta años con alumnos reales.
            </p>
          </Reveal>
        </div>
        <div className="step-grid">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={100 + i * 100}>
              <div className={'step-card ' + (i % 2 === 1 ? 'alt' : '')}>
                <div className="step-bignum">{s.n}</div>
                <div className="eyebrow">Paso {s.n}</div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={500}>
          <div style={{ textAlign: 'center', marginTop: 56 }}>
            <a href={WAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-cta">
              Solicitar evaluación sin cargo <span style={{ marginLeft: 8 }}>→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Validation() {
  const [ref1, v1] = useCountUp(2400, { suffix: '+' });
  const [ref2, v2] = useCountUp(25, { suffix: '+' });
  const [ref3, v3] = useCountUp(98, { suffix: '%' });
  return (
    <section id="validacion" className="bg-dark section">
      <div className="container">
        <Reveal>
          <div className="eyebrow eyebrow--dark center" style={{ textAlign: 'center', marginBottom: 56 }}>La evidencia, en escala</div>
        </Reveal>
        <Reveal delay={120}>
          <div className="val-grid">
            <div className="val-cell"><div className="val-num" ref={ref1}>{v1}</div><div className="val-label">Alumnos por el sistema</div></div>
            <div className="val-divider"/>
            <div className="val-cell"><div className="val-num" ref={ref2}>{v2}</div><div className="val-label">Años desarrollando el método</div></div>
            <div className="val-divider"/>
            <div className="val-cell"><div className="val-num" ref={ref3}>{v3}</div><div className="val-label">De satisfacción post-cursada</div></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Pricing() {
  // 'USD' default. 'ARS' only if user opts in via geolocation or manual toggle.
  const [region, setRegion] = _useState('USD');
  // idle | requesting | confirmed-ar | confirmed-intl | denied
  const [geoStatus, setGeoStatus] = _useState('idle');

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setGeoStatus('denied');
      return;
    }
    setGeoStatus('requesting');
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            'https://nominatim.openstreetmap.org/reverse?lat=' + latitude + '&lon=' + longitude + '&format=json'
          );
          const data = await response.json();
          const countryCode = (data.address && data.address.country_code || '').toUpperCase();
          if (countryCode === 'AR') {
            setRegion('ARS');
            setGeoStatus('confirmed-ar');
          } else {
            setRegion('USD');
            setGeoStatus('confirmed-intl');
          }
        } catch (e) {
          setGeoStatus('denied');
        }
      },
      () => setGeoStatus('denied'),
      { timeout: 8000, maximumAge: 600000 }
    );
  };

  const toggleRegion = () => {
    setRegion(region === 'USD' ? 'ARS' : 'USD');
    setGeoStatus('idle');
  };

  const isARS = region === 'ARS';
  const amount = isARS ? '$50.000' : '$60';
  const unit = isARS ? 'ARS / por hora' : 'USD / por hora';
  const monthly = isARS
    ? '≈ $400.000 ARS / mes con 2 clases semanales'
    : '≈ USD 480 / mes con 2 clases semanales';

  return (
    <section id="precios" className="bg-cream section">
      <div className="container" style={{ textAlign: 'center' }}>
        <Reveal><div className="eyebrow">Precios</div></Reveal>
        <Reveal delay={120}>
          <h2 className="h-section" style={{ marginTop: 18 }}>Una sola decisión.</h2>
        </Reveal>
        <Reveal delay={220}>
          <p className="lede" style={{ marginTop: 18, maxWidth: 520, marginLeft: 'auto', marginRight: 'auto' }}>
            Sin niveles, sin paquetes, sin upsells. Un precio. Una clase.
          </p>
        </Reveal>

        <Reveal delay={320}>
          <div className="price-card" style={{ marginTop: 56, textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div className="eyebrow">Clase individual</div>
              <span style={{
                fontStyle: 'italic', fontSize: 11, color: 'var(--cta)',
                background: 'rgba(61,111,182,0.08)', padding: '4px 10px', borderRadius: 4
              }}>
                Cupos limitados
              </span>
            </div>

            <div key={region} className="price-row" style={{ animation: 'priceFade 0.4s cubic-bezier(0.16,1,0.3,1)' }}>
              <div className="price-amount" style={{ fontSize: isARS ? 68 : 88 }}>{amount}</div>
              <div className="price-unit">{unit}</div>
            </div>
            <div className="price-ars" style={{ marginTop: -8, marginBottom: 4, fontStyle: 'italic' }}>
              {monthly}
            </div>

            <div className="price-divider"/>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div className="feature-row">Clases 1 a 1, en vivo, 60 minutos.</div>
              <div className="feature-row">Material auténtico provisto por el sistema.</div>
              <div className="feature-row">Pagás solo las clases que tomás.</div>
              <div className="feature-row">Cancelás cuando quieras.</div>
            </div>
            <p className="tiny-italic">Se recomienda cursar 2 veces por semana para mejores resultados.</p>
            <a href={WAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-cta btn-cta--wide">
              Solicitar evaluación sin cargo <span style={{ marginLeft: 8 }}>→</span>
            </a>

            {/* Region detection / manual toggle */}
            <div style={{ textAlign: 'center', marginTop: 4, minHeight: 22 }}>
              {geoStatus === 'idle' && region === 'USD' && (
                <button
                  onClick={detectLocation}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                    fontFamily: 'inherit', fontStyle: 'italic', fontSize: 12,
                    color: 'var(--muted-light)', display: 'inline-flex', alignItems: 'center', gap: 6,
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--cta)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--muted-light)'; }}
                >
                  📍 ¿Estás en Argentina? Detectar mi ubicación
                </button>
              )}
              {geoStatus === 'requesting' && (
                <span style={{ fontStyle: 'italic', fontSize: 12, color: 'var(--muted-light)' }}>
                  Detectando ubicación...
                </span>
              )}
              {geoStatus === 'confirmed-ar' && isARS && (
                <span style={{ fontStyle: 'italic', fontSize: 12, color: 'var(--cta)' }}>
                  📍 Mostrando precio en Argentina.
                </span>
              )}
              {geoStatus === 'confirmed-intl' && (
                <span style={{ fontStyle: 'italic', fontSize: 12, color: 'var(--cta)' }}>
                  📍 Mostrando precio internacional.
                </span>
              )}
              {geoStatus === 'denied' && (
                <button
                  onClick={toggleRegion}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                    fontFamily: 'inherit', fontStyle: 'italic', fontSize: 12,
                    color: 'var(--muted-light)', transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--cta)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--muted-light)'; }}
                >
                  {region === 'USD' ? '¿Estás en Argentina? Ver precio en pesos' : 'Ver precio en USD'}
                </button>
              )}
              {geoStatus === 'idle' && region === 'ARS' && (
                <button
                  onClick={toggleRegion}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                    fontFamily: 'inherit', fontStyle: 'italic', fontSize: 12,
                    color: 'var(--muted-light)', transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--cta)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--muted-light)'; }}
                >
                  Ver precio en USD
                </button>
              )}
            </div>
          </div>
        </Reveal>
        <Reveal delay={420}>
          <p style={{ marginTop: 32, fontSize: 14 }}>
            ¿Sos empresa o equipo? <a href={WAPP_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cta)', borderBottom: '1px solid currentColor', paddingBottom: 1 }}>Consultanos por WhatsApp.</a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function WhyItWorks() {
  const cards = [
    { l: 'Sin reglas', t: 'No enseñamos gramática', d: 'Trabajamos con el idioma como aparece en la realidad: incompleto, dinámico, cargado de intención.' },
    { l: 'Sin traducción', t: 'Eliminamos el paso intermedio', d: 'Reaccionás en inglés, no construís frases. El idioma se procesa, no se arma.' },
    { l: 'Material real', t: 'Películas, diálogos auténticos', d: 'No existe el inglés de libro acá. Lo que entrenás es lo que vas a escuchar afuera.' },
    { l: 'Naturalidad primero', t: 'No corregimos para aprobar', d: 'Entrenamos para que el idioma te pase por el cuerpo, no para que apruebes un nivel.' },
    { l: 'Horarios flexibles', t: 'Mañana, tarde y noche', d: 'El sistema se adapta a tu vida. Pero la cadencia la marca el método.' },
    { l: 'El TOEIC viene solo', t: 'El test es una formalidad', d: 'Nuestros alumnos rinden el TOEIC sin haberlo estudiado puntualmente. Dominás el idioma; el test lo refleja.' },
  ];
  return (
    <section id="por-que-funciona" className="bg-dark section">
      <div className="container">
        <div style={{ maxWidth: 760 }}>
          <Reveal><div className="eyebrow eyebrow--dark">Por qué funciona</div></Reveal>
          <Reveal delay={120}>
            <h2 className="h-section" style={{ marginTop: 18, color: '#fff' }}>
              El idioma real no se explica.<br/>Se entrena.
            </h2>
          </Reveal>
        </div>
        <div className="why-grid">
          {cards.map((c, i) => (
            <Reveal key={c.l} delay={100 + (i % 3) * 80}>
              <div className="why-card">
                <div className="eyebrow">{c.l}</div>
                <h3>{c.t}</h3>
                <p>{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    ['¿El método incluye gramática?', 'Sí, pero como herramienta, no como contenido central. Trabajamos lo que necesitás cuando lo necesitás.'],
    ['¿Funciona si ya estudié años y no lo logré?', 'Sí. Este sistema fue diseñado exactamente para ese perfil. El problema no fue tu esfuerzo, fue el modelo.'],
    ['¿Cuánto tiempo lleva notar diferencias?', 'La mayoría nota un cambio en cómo procesa el idioma dentro de las primeras semanas. El cambio real, sin embargo, lleva al menos 6 meses de entrenamiento sostenido.'],
    ['¿Las clases son grabadas o en vivo?', 'En vivo. La reacción en tiempo real no se puede entrenar con contenido grabado.'],
    ['¿Sirve para el TOEIC o TOEFL?', 'Sí, de forma indirecta. Cuando dominás el inglés real, el examen es una formalidad.'],
  ];
  const [open, setOpen] = _useState(0);
  return (
    <section id="faq" className="bg-cream section">
      <div className="container--narrow">
        <Reveal><div className="eyebrow">FAQ</div></Reveal>
        <Reveal delay={120}>
          <h2 className="h-section" style={{ marginTop: 18, textAlign: 'left' }}>Lo que suelen preguntar.</h2>
        </Reveal>
        <div style={{ marginTop: 40 }}>
          {items.map(([q, a], i) => (
            <Reveal key={q} delay={100 + i * 70}>
              <div className={'faq-item ' + (open === i ? 'open' : '')}>
                <button
                  className="faq-q"
                  aria-expanded={open === i}
                  onClick={() => setOpen(open === i ? -1 : i)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(open === i ? -1 : i); } }}
                >
                  <span>{q}</span>
                  <span className="faq-toggle" aria-hidden="true">+</span>
                </button>
                <div className="faq-a"><div className="faq-a-inner"><p>{a}</p></div></div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={500}>
          <div className="wapp-band">
            <h4>¿Tenés más preguntas?</h4>
            <a href={WAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-cta btn-cta--wapp" style={{ padding: '13px 22px' }}>
              <Icon.WhatsApp size={20}/> <span style={{ marginLeft: 10 }}>Escribinos por WhatsApp</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Teachers() {
  const principles = [
    ['Language is not applied', 'It is activated.'],
    ['Authentic sources', 'Not textbooks.'],
    ['Intervention', 'Not explanation.'],
    ['Reaction', 'Not translation.'],
    ['Replicable quality', 'Not scale at all costs.'],
    ['Professionals with depth', 'Not certifications.'],
  ];
  return (
    <section id="teachers" className="bg-teacher section">
      <div className="container">
        <div className="teachers-header">
          <Reveal><h2 className="teachers-title">For English Teachers</h2></Reveal>
          <Reveal delay={140}>
            <p className="teachers-sub">A different way to teach. A transferable system.</p>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="teachers-panel">
            <div className="teachers-left">
              <h2>Most students don't have a problem with English. They have a problem with how they were taught.</h2>
              <p>The conventional model treats English as information to be accumulated. Virtual English trains it as a reaction to be activated.</p>
              <p>This is not a teaching method. It is an intervention framework — designed to dismantle translation as a processing step and build response capacity in seconds.</p>
              <p>It is replicable — but not by everyone. What can be replicated is the framework, not the depth. It requires teachers who can operate with criteria, not formulas.</p>
              <p>And that can be transmitted.</p>
            </div>
            <div className="teachers-right">
              <p className="pull-quote">"I'm not looking for instructors. I'm interested in working with teachers who want to operate at that level."</p>
              <p>This is a one-line expression. Not a recruitment campaign.</p>
              <p>I am not interested in volume. I am interested in replicating quality with people who already understand what it means to teach with real criteria.</p>
              <p>If you see the problem, you'll recognize the opportunity.</p>
            </div>
          </div>
        </Reveal>

        <div className="principle-grid">
          {principles.map(([h, p], i) => (
            <Reveal key={h} delay={100 + i * 60}>
              <div className="principle-card">
                <div className="eyebrow">{h}</div>
                <p>{p}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={140}>
          <div className="teachers-dark">
            <h2>If you see the problem, you'll recognize the opportunity.</h2>
            <p className="muted-on-dark" style={{ marginTop: 16, fontSize: 16, maxWidth: 720 }}>
              Virtual English was built to scale a system that most teaching is unable to deliver: real-time response, not retention. Authentic material, not adapted material.
            </p>
            <div className="teachers-cta-row">
              <div className="teacher-cta-card">
                <h4>WhatsApp</h4>
                <p>Direct line. Argentina-based, replies same day.</p>
                <a href={WAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-wapp-solid">
                  <Icon.WhatsApp size={18}/> Contact via WhatsApp
                </a>
              </div>
              <div className="teacher-cta-card">
                <h4>Email</h4>
                <p>For longer messages and portfolios.</p>
                <button
                  className="btn-outline"
                  type="button"
                  onClick={() => {
                    const email = 'virtualito.english@gmail.com';
                    const subject = encodeURIComponent('Inquiry about Virtual English');
                    const body = encodeURIComponent("Hello,\n\nI'm a teacher interested in Virtual English.\n\n");

                    // Always copy email to clipboard first as universal fallback
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(email).catch(() => {});
                    }

                    // Try mailto: first (for users with a mail client configured)
                    const mailtoLink = 'mailto:' + email + '?subject=' + subject + '&body=' + body;

                    // Detect if mailto opens anything: use a hidden iframe approach
                    const start = Date.now();
                    const wasVisible = document.visibilityState;

                    // Open mailto in current tab (browser will only navigate if handler exists)
                    window.location.href = mailtoLink;

                    // If after 800ms nothing happened (no mail client), open Gmail web as fallback
                    setTimeout(() => {
                      if (document.visibilityState === wasVisible && Date.now() - start < 1500) {
                        // No mail client opened — fallback to Gmail web compose
                        window.open(
                          'https://mail.google.com/mail/?view=cm&fs=1&to=' + email + '&su=' + subject + '&body=' + body,
                          '_blank',
                          'noopener,noreferrer'
                        );
                      }
                    }, 800);
                  }}
                  title="Abre tu cliente de email o Gmail en el navegador. El email se copia al portapapeles."
                  style={{ cursor: 'pointer' }}
                >
                  <Icon.Mail size={16}/> Send email
                </button>
              </div>
            </div>
            <div className="dark-accent-row">
              <div className="dark-accent-card"><h5>Not mass training</h5><p>Selective onboarding. Criteria-first.</p></div>
              <div className="dark-accent-card"><h5>Not standardized delivery</h5><p>Replicable framework, individual depth.</p></div>
              <div className="dark-accent-card"><h5>Replicable quality</h5><p>The system transfers. The depth is yours.</p></div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <div className="footer-logo">Virtual <b>English</b></div>
          <p style={{ color: '#B6C6D8', fontSize: 14, fontStyle: 'italic', maxWidth: 360 }}>One teacher. One institute.</p>
          <p style={{ color: '#6F8AA3', fontSize: 13, marginTop: 18 }}>© 1996 – {new Date().getFullYear()} Virtual English. Sistema autoral.</p>
        </div>
        <div>
          <h5>Navegación</h5>
          <a href="#metodo">El método</a>
          <a href="#precios">Precios</a>
          <a href="#teachers">For teachers</a>
          <a href="#faq">FAQ</a>
        </div>
        <div>
          <h5>Contacto</h5>
          <a href={WAPP_URL} target="_blank" rel="noopener noreferrer">WhatsApp · +54 9 11 3071-3390</a>
          <a href="mailto:virtualito.english@gmail.com">virtualito.english@gmail.com</a>
          <p style={{ color: '#6F8AA3', fontSize: 13, marginTop: 10 }}>Argentina · Operación 100% online</p>
        </div>
      </div>
      <div className="footer-bar">
        <span>Hecho con criterio. Sistema desarrollado desde 1996.</span>
        <span>Términos · Privacidad</span>
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  const y = useScrollY();
  return (
    <div className={'fab-wrap ' + (y > 300 ? 'show' : '')}>
      <span className="fab-tooltip">Escribinos por WhatsApp</span>
      <a
        href={WAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribinos por WhatsApp"
        className="fab"
      >
        <Icon.WhatsApp size={28}/>
      </a>
    </div>
  );
}

function ScrollProgress() {
  const [w, setW] = _useState(0);
  _useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setW(total > 0 ? (h.scrollTop / total) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, []);
  return <div className="scroll-progress" style={{ width: w + '%' }} aria-hidden="true"/>;
}

Object.assign(window, { Nav, Hero, Problem, HowItWorks, Validation, Pricing, WhyItWorks, FAQ, Teachers, Footer, FloatingWhatsApp, ScrollProgress });
