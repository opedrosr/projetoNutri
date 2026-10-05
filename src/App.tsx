import { useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  Navigation,
  Sparkles,
  X,
} from 'lucide-react';
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

/* =========================================================
   IMAGENS — PODE TROCAR AQUI QUANDO FOR PERSONALIZAR
========================================================= */
const img = {
  hero:
    'https://images.pexels.com/photos/12889997/pexels-photo-12889997.jpeg?auto=compress&cs=tinysrgb&w=1800',

  nutritionist:
    'https://images.pexels.com/photos/15319035/pexels-photo-15319035.jpeg?auto=compress&cs=tinysrgb&w=1400',

  consultation:
    'https://images.pexels.com/photos/8844553/pexels-photo-8844553.jpeg?auto=compress&cs=tinysrgb&w=1400',

  food:
    'https://images.pexels.com/photos/15319047/pexels-photo-15319047.jpeg?auto=compress&cs=tinysrgb&w=1200',

  salad:
    'https://images.pexels.com/photos/5622194/pexels-photo-5622194.jpeg?auto=compress&cs=tinysrgb&w=1200',

  fruit:
    'https://images.pexels.com/photos/15319047/pexels-photo-15319047.jpeg?auto=compress&cs=tinysrgb&w=1000',

  office:
    'https://images.pexels.com/photos/15319035/pexels-photo-15319035.jpeg?auto=compress&cs=tinysrgb&w=1400',

  detail:
    'https://images.pexels.com/photos/15319016/pexels-photo-15319016.jpeg?auto=compress&cs=tinysrgb&w=1200',
};

/* =========================================================
   PLACEHOLDERS DA PROFISSIONAL
========================================================= */
const clinicAddress =
  'Rua dos Aimorés, 2001 - Lourdes, Belo Horizonte - MG, 30140-074';

const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  clinicAddress
)}`;

const wazeUrl = `https://www.waze.com/ul?q=${encodeURIComponent(
  clinicAddress
)}&navigate=yes`;

const instagramUrl = 'https://instagram.com/marina.nutri';

const whatsappUrl =
  'https://wa.me/5531999999999?text=Ol%C3%A1%2C%20Marina!%20Quero%20saber%20mais%20sobre%20o%20acompanhamento%20nutricional.';

const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  clinicAddress
)}&output=embed`;

const fade = {
  hidden: {
    opacity: 0,
    y: 34,
  },

  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

const reveal = {
  hidden: {
    opacity: 0,
    y: 45,
    clipPath: 'inset(12% 0 12% 0)',
  },

  show: {
    opacity: 1,
    y: 0,
    clipPath: 'inset(0 0 0 0)',
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

function SectionLabel({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <div className={`section-label ${dark ? 'section-label-dark' : ''}`}>
      <span className="section-dot" />
      <span>{children}</span>
    </div>
  );
}

function MagneticButton({
  children,
  href = '#contato',
  light = false,
}: {
  children: React.ReactNode;
  href?: string;
  light?: boolean;
}) {
  const external = href.startsWith('http');

  return (
    <motion.a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
      className={`magnetic-btn ${light ? 'magnetic-btn-light' : ''}`}
    >
      <span>{children}</span>

      <span className="button-arrow">
        <ArrowRight size={16} />
      </span>
    </motion.a>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [goal, setGoal] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  /*
    Controla o CTA fixo mobile.

    false = usuário ainda está na Hero
    true  = usuário saiu da Hero
  */
  const [showStickyCta, setShowStickyCta] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const processRef = useRef<HTMLElement>(null);
  const locationRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll();

  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const heroProgress = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  }).scrollYProgress;

  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.08]);
  const heroY = useTransform(heroProgress, [0, 1], ['0%', '12%']);

  const processProgress = useScroll({
    target: processRef,
    offset: ['start end', 'end start'],
  }).scrollYProgress;

  const processY = useTransform(
    processProgress,
    [0, 1],
    ['-3%', '8%']
  );

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  /*
    CTA FIXO MOBILE

    Enquanto a Hero estiver visível:
      → CTA fica escondido.

    Assim que o usuário sair da Hero:
      → CTA aparece subindo pela parte inferior.

    Ao voltar para a Hero:
      → CTA desaparece novamente.
  */
  useEffect(() => {
    const hero = heroRef.current;

    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyCta(!entry.isIntersecting);
      },
      {
        threshold: 0.05,
      }
    );

    observer.observe(hero);

    return () => {
      observer.disconnect();
    };
  }, []);

  const goals = [
    {
      id: 'performance',
      title: 'Performance',
      text: 'Comer melhor para treinar, recuperar e render mais.',
    },
    {
      id: 'body',
      title: 'Composição corporal',
      text: 'Estratégia para mudar o corpo sem transformar a rotina em castigo.',
    },
    {
      id: 'routine',
      title: 'Rotina',
      text: 'Organizar a alimentação para uma vida real, com trabalho, viagens e imprevistos.',
    },
    {
      id: 'relationship',
      title: 'Relação com a comida',
      text: 'Mais clareza e autonomia para fazer escolhas sem viver em extremos.',
    },
  ];

  const faqs = [
    [
      'A consulta é presencial ou online?',
      'As duas opções podem existir. No demo, você pode adaptar essa informação para a realidade da profissional.',
    ],
    [
      'Preciso seguir uma dieta rígida?',
      'A proposta da página é comunicar uma abordagem individualizada. O plano é construído considerando rotina, preferências e objetivo.',
    ],
    [
      'Como funciona o acompanhamento?',
      'Depois da primeira consulta, a profissional acompanha a evolução e faz ajustes conforme a resposta e a rotina do paciente.',
    ],
    [
      'Como agendo?',
      'O botão de agendamento leva diretamente para o WhatsApp da profissional, facilitando o primeiro contato.',
    ],
  ];

  const selectedGoal = goals.find((item) => item.id === goal);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <motion.div
        className="reading-progress"
        style={{ scaleX: progress }}
      />

      <header className="site-nav">
        <a href="#inicio" className="brand" onClick={closeMenu}>
          <span className="brand-mark">M</span>

          <span>
            <strong>MARINA</strong>
            <small>Nutrição & performance</small>
          </span>
        </a>

        <nav className="desktop-nav">
          <a href="#metodo">Método</a>
          <a href="#resultados">Resultados</a>
          <a href="#sobre">Sobre</a>
          <a href="#localizacao">Localização</a>
        </nav>

        <div className="nav-actions">
          <motion.a
            href="#contato"
            className="nav-cta"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
          >
            Agendar
            <ArrowRight size={14} />
          </motion.a>

          <motion.button
            type="button"
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            whileTap={{ scale: 0.92 }}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </motion.button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            className="mobile-menu"
          >
            <span className="mobile-menu-label">Navegação</span>

            <a href="#metodo" onClick={closeMenu}>
              Método
              <ArrowRight size={17} />
            </a>

            <a href="#resultados" onClick={closeMenu}>
              Resultados
              <ArrowRight size={17} />
            </a>

            <a href="#sobre" onClick={closeMenu}>
              Sobre
              <ArrowRight size={17} />
            </a>

            <a href="#localizacao" onClick={closeMenu}>
              Localização
              <ArrowRight size={17} />
            </a>

            <a href="#contato" onClick={closeMenu}>
              Agendar consulta
              <ArrowRight size={17} />
            </a>

            <div className="mobile-menu-footer">
              <span>MARINA · NUTRIÇÃO & PERFORMANCE</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* HERO */}
        <section ref={heroRef} id="inicio" className="hero">
          <motion.div
            className="hero-image"
            style={{ scale: heroScale, y: heroY }}
          >
            <img
              src={img.hero}
              alt="Nutricionista em ambiente profissional"
              fetchPriority="high"
              decoding="async"
            />
          </motion.div>

          <div className="hero-overlay" />
          <div className="hero-grain" />

          <div className="hero-content page-width">
            <motion.div
              variants={fade}
              initial="hidden"
              animate="show"
              className="hero-copy"
            >
              <SectionLabel dark>
                Nutrição esportiva & estética
              </SectionLabel>

              <h1>
                Seu corpo não precisa de <em>mais uma dieta.</em>
                <span>Precisa de uma estratégia.</span>
              </h1>

              <p>
                Uma abordagem individual para transformar alimentação em uma
                parte possível — e sustentável — da sua rotina.
              </p>

              <div className="hero-buttons">
                <MagneticButton>Quero começar</MagneticButton>

                <a href="#metodo" className="text-link light-link">
                  Conhecer o método
                  <ArrowDown size={15} />
                </a>
              </div>
            </motion.div>

            <motion.div
              variants={fade}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.22 }}
              className="hero-floating-card"
              whileHover={{ y: -4 }}
            >
              <span className="floating-icon">
                <Sparkles size={16} />
              </span>

              <div>
                <strong>Atendimento individual</strong>
                <small>Plano construído para a sua rotina.</small>
              </div>
            </motion.div>
          </div>

          <div className="hero-bottom page-width">
            <span>Arraste para explorar</span>

            <div className="hero-line">
              <span />
            </div>

            <span>01 — 09</span>
          </div>
        </section>

        {/* INTRO */}
        <section className="intro section-light">
          <div className="page-width intro-grid">
            <motion.div
              variants={fade}
              whileInView="show"
              initial="hidden"
              viewport={{ once: true, amount: 0.35 }}
            >
              <SectionLabel>
                Uma nutrição que começa antes do prato
              </SectionLabel>
            </motion.div>

            <motion.div
              variants={reveal}
              whileInView="show"
              initial="hidden"
              viewport={{ once: true, amount: 0.25 }}
              className="intro-statement"
            >
              <p className="giant-copy">
                Você não precisa aprender a viver de dieta.
                <em>
                  Precisa aprender a comer dentro da vida que já existe.
                </em>
              </p>

              <MagneticButton light href="#metodo">
                Como eu trabalho
              </MagneticButton>
            </motion.div>
          </div>
        </section>

        {/* GOALS */}
        <section className="goal-section">
          <div className="page-width">
            <div className="goal-header">
              <SectionLabel dark>Comece por aqui</SectionLabel>

              <h2>
                O que você quer <em>mudar?</em>
              </h2>

              <p>
                Escolha o ponto que mais se aproxima do seu momento. A
                experiência muda conforme a sua resposta.
              </p>
            </div>

            <div className="goal-layout">
              <div className="goal-list">
                {goals.map((item, index) => (
                  <motion.button
                    type="button"
                    key={item.id}
                    className={`goal-item ${
                      goal === item.id ? 'active' : ''
                    }`}
                    onClick={() => setGoal(item.id)}
                    whileHover={{ x: 7 }}
                    whileTap={{ scale: 0.985 }}
                    aria-pressed={goal === item.id}
                  >
                    <span className="goal-number">0{index + 1}</span>
                    <span className="goal-title">{item.title}</span>
                    <ChevronRight size={18} />
                  </motion.button>
                ))}
              </div>

              <motion.div layout className="goal-preview">
                <img
                  src={goal ? img.detail : img.food}
                  alt="Nutricionista trabalhando com planejamento alimentar"
                  loading="lazy"
                  decoding="async"
                />

                <div className="goal-preview-overlay" />

                <AnimateGoal goal={selectedGoal} />
              </motion.div>
            </div>

            <div className="section-cta-row dark-row">
              <span>Já sabe qual é o seu objetivo?</span>

              <MagneticButton href="#contato">
                Quero começar
              </MagneticButton>
            </div>
          </div>
        </section>

        {/* METHOD */}
        <section
          ref={processRef}
          id="metodo"
          className="process-section section-light"
        >
          <div className="page-width process-intro">
            <SectionLabel>O método</SectionLabel>

            <div>
              <h2>
                Menos <em>prescrição.</em>
                <br />
                Mais estratégia.
              </h2>

              <p>
                A consulta não termina quando você recebe um plano. Ela começa
                quando entendemos como fazer esse plano funcionar na sua vida.
              </p>
            </div>
          </div>

          <div className="process-story page-width">
            <div className="process-image-wrap">
              <motion.div
                style={{ y: processY }}
                className="process-image"
              >
                <img
                  src={img.consultation}
                  alt="Nutricionista conversando com paciente durante consulta"
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>

              <div className="process-stamp">
                MARINA
                <br />
                <span>nutrição</span>
              </div>

              <div className="image-glass-note">
                <span>
                  <Sparkles size={13} />
                </span>

                <div>
                  <strong>Individualidade</strong>
                  <small>Cada estratégia parte de uma rotina real.</small>
                </div>
              </div>
            </div>

            <div className="process-steps">
              {[
                [
                  '01',
                  'Entender',
                  'Sua rotina, seus hábitos, seu histórico e aquilo que realmente importa para você.',
                ],
                [
                  '02',
                  'Estruturar',
                  'Uma estratégia alimentar que faça sentido para seus horários, preferências e objetivo.',
                ],
                [
                  '03',
                  'Acompanhar',
                  'Observar o que funciona, o que trava e ajustar sem transformar cada deslize em fracasso.',
                ],
                [
                  '04',
                  'Evoluir',
                  'Construir autonomia para que você não dependa de uma dieta nova a cada fase da vida.',
                ],
              ].map(([number, title, text], index) => (
                <motion.div
                  key={number}
                  variants={fade}
                  whileInView="show"
                  initial="hidden"
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ delay: index * 0.08 }}
                  className="process-step"
                >
                  <span>{number}</span>

                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </motion.div>
              ))}

              <div className="process-inline-cta">
                <span>
                  Um processo pensado para continuar funcionando depois da
                  consulta.
                </span>

                <a href="#contato">
                  Conhecer a experiência
                  <ArrowRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* RESULTS */}
        <section id="resultados" className="results-section">
          <div className="page-width">
            <div className="results-top">
              <SectionLabel dark>O que muda</SectionLabel>

              <h2>
                Resultado não é só <em>número.</em>
              </h2>

              <p>
                Uma boa estratégia também aparece na rotina: mais clareza,
                mais consistência e mais segurança para fazer escolhas.
              </p>
            </div>

            <div className="editorial-gallery">
              <motion.figure
                variants={reveal}
                whileInView="show"
                initial="hidden"
                viewport={{ once: true, amount: 0.2 }}
                className="gallery-large"
              >
                <img
                  src={img.salad}
                  alt="Mulher em contexto de alimentação saudável"
                  loading="lazy"
                  decoding="async"
                />

                <div className="gallery-glass-tag">
                  Estratégia
                </div>

                <figcaption>
                  <span>01</span>
                  Comer bem sem transformar a alimentação em uma prisão.
                </figcaption>
              </motion.figure>

              <motion.figure
                variants={reveal}
                whileInView="show"
                initial="hidden"
                viewport={{ once: true, amount: 0.25 }}
                className="gallery-small gallery-up"
              >
                <img
                  src={img.fruit}
                  alt="Nutricionista em atendimento"
                  loading="lazy"
                  decoding="async"
                />

                <figcaption>
                  <span>02</span>
                  Escolhas mais simples.
                </figcaption>
              </motion.figure>

              <motion.figure
                variants={reveal}
                whileInView="show"
                initial="hidden"
                viewport={{ once: true, amount: 0.25 }}
                className="gallery-small gallery-down"
              >
                <img
                  src={img.office}
                  alt="Nutricionista em ambiente profissional"
                  loading="lazy"
                  decoding="async"
                />

                <figcaption>
                  <span>03</span>
                  Acompanhamento de perto.
                </figcaption>
              </motion.figure>
            </div>

            <div className="results-cta">
              <div>
                <span>
                  O próximo resultado começa antes da primeira consulta.
                </span>
              </div>

              <MagneticButton href="#contato">
                Quero começar
              </MagneticButton>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="sobre" className="about-section section-light">
          <div className="page-width about-grid">
            <div className="about-photo">
              <motion.img
                variants={reveal}
                whileInView="show"
                initial="hidden"
                viewport={{ once: true, amount: 0.25 }}
                src={img.nutritionist}
                alt="Nutricionista Marina Azevedo em ambiente profissional"
                loading="lazy"
                decoding="async"
              />

              <div className="about-caption">
                <span>Marina Azevedo</span>
                <small>Nutricionista · CRN 00000</small>
              </div>
            </div>

            <div className="about-copy">
              <SectionLabel>Quem está por trás</SectionLabel>

              <h2>
                Nutrição com <em>ciência, contexto</em> e proximidade.
              </h2>

              <p>
                Meu trabalho é ajudar você a construir uma alimentação que
                tenha lógica no papel e, principalmente, que consiga existir
                na segunda-feira, no trabalho, na viagem e nos dias corridos.
              </p>

              <p>
                Sem transformar comida em culpa. Sem prometer atalhos. Com
                estratégia, acompanhamento e ajustes ao longo do caminho.
              </p>

              <div className="about-facts">
                <div>
                  <strong>CRN</strong>
                  <span>00000</span>
                </div>

                <div>
                  <strong>Atendimento</strong>
                  <span>Online + presencial</span>
                </div>

                <div>
                  <strong>Foco</strong>
                  <span>Esportivo · Estética</span>
                </div>
              </div>

              <a href="#contato" className="text-link">
                Conversar com a Marina
                <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="experience-section">
          <div className="experience-image">
            <img
              src={img.detail}
              alt="Nutricionista trabalhando em planejamento alimentar"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="experience-panel">
            <SectionLabel dark>
              Uma experiência diferente
            </SectionLabel>

            <h2>
              Você não recebe um plano.
              <em>Você aprende a construir o seu.</em>
            </h2>

            <div className="experience-list">
              {[
                'Estratégia personalizada',
                'Acompanhamento próximo',
                'Ajustes ao longo do processo',
              ].map((item, i) => (
                <motion.div
                  key={item}
                  whileHover={{ x: 5 }}
                >
                  <span>0{i + 1}</span>
                  <p>{item}</p>
                  <Check size={16} />
                </motion.div>
              ))}
            </div>

            <MagneticButton>
              Quero minha consulta
            </MagneticButton>
          </div>
        </section>

        {/* LOCALIZAÇÃO */}
        <section
          ref={locationRef}
          id="localizacao"
          className="location-section section-light"
        >
          <div className="page-width">
            <div className="location-heading">
              <SectionLabel>Onde nos encontramos</SectionLabel>

              <div>
                <h2>
                  Sua consulta começa no caminho até <em>aqui.</em>
                </h2>

                <p>
                  Um espaço pensado para receber você com calma. Veja o
                  endereço e escolha a melhor forma de chegar.
                </p>
              </div>
            </div>

            <div className="location-layout">
              <motion.div
                className="location-map"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8 }}
              >
                <iframe
                  title="Localização do consultório"
                  src={mapEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                <div className="location-map-overlay">
                  <div className="location-pin">
                    <MapPin size={17} />
                  </div>

                  <div>
                    <strong>
                      Marina · Nutrição & performance
                    </strong>
                    <span>Belo Horizonte · MG</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="location-info"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.8,
                  delay: 0.1,
                }}
              >
                <span className="location-eyebrow">
                  <MapPin size={14} />
                  Endereço
                </span>

                <h3>
                  {clinicAddress}
                </h3>

                <p>
                  Atendimento presencial com hora marcada. Para atendimento
                  online, não é necessário se deslocar.
                </p>

                <div className="location-actions">
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="route-card route-google"
                  >
                    <span className="route-icon">
                      <MapPin size={17} />
                    </span>

                    <span>
                      <strong>Google Maps</strong>
                      <small>Abrir rota</small>
                    </span>

                    <ArrowUpRight size={17} />
                  </a>

                  <a
                    href={wazeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="route-card route-waze"
                  >
                    <span className="route-icon">
                      <Navigation size={17} />
                    </span>

                    <span>
                      <strong>Waze</strong>
                      <small>Navegar até o consultório</small>
                    </span>

                    <ArrowUpRight size={17} />
                  </a>
                </div>

                <a
                  href="#contato"
                  className="location-contact-link"
                >
                  Prefere confirmar antes?
                  <span>Falar com a Marina</span>
                  <ArrowRight size={15} />
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="faq-section section-light">
          <div className="page-width faq-grid">
            <div>
              <SectionLabel>Dúvidas</SectionLabel>

              <h2>
                Antes de <em>começar.</em>
              </h2>

              <p>
                Algumas respostas para deixar o primeiro passo mais simples.
              </p>
            </div>

            <div className="faq-list">
              {faqs.map(([question, answer], index) => (
                <motion.div
                  className={`faq-item ${
                    openFaq === index ? 'open' : ''
                  }`}
                  key={question}
                  layout
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenFaq(
                        openFaq === index ? null : index
                      )
                    }
                    aria-expanded={openFaq === index}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span>{question}</span>

                    <span className="faq-icon">
                      <ChevronDown size={18} />
                    </span>
                  </button>

                  <motion.div
                    id={`faq-answer-${index}`}
                    initial={false}
                    animate={{
                      height:
                        openFaq === index ? 'auto' : 0,
                      opacity:
                        openFaq === index ? 1 : 0,
                    }}
                    className="faq-answer"
                  >
                    <p>{answer}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="page-width faq-bottom-cta">
            <span>Ainda ficou alguma dúvida?</span>

            <a href="#contato">
              Falar com a Marina
              <ArrowRight size={15} />
            </a>
          </div>
        </section>

        {/* CONTACT */}
        <section
          id="contato"
          className="contact-section"
        >
          <div className="contact-bg">
            <img
              src={img.hero}
              alt=""
              loading="lazy"
            />
          </div>

          <div className="contact-overlay" />

          <div className="page-width contact-content">
            <SectionLabel dark>
              Seu próximo passo
            </SectionLabel>

            <h2>
              Vamos construir uma relação mais leve com a sua alimentação?
            </h2>

            <p>
              Agende uma conversa inicial e descubra como funciona o
              acompanhamento.
            </p>

            <div className="contact-actions">
              <MagneticButton href={whatsappUrl}>
                Agendar consulta
              </MagneticButton>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="contact-whatsapp"
              >
                <MessageCircle size={17} />
                WhatsApp
              </a>
            </div>

            <div className="contact-meta">
              <span>
                <CalendarDays size={15} />
                Seg–Sáb · 09h–19h
              </span>

              <span>
                <MapPin size={15} />
                Belo Horizonte · MG
              </span>

              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
              >
                <Instagram size={15} />
                @marina.nutri
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="page-width footer-inner">
          <div className="brand footer-brand">
            <span className="brand-mark">M</span>

            <span>
              <strong>MARINA</strong>
              <small>Nutrição & performance</small>
            </span>
          </div>

          <span>
            © 2026 Marina Azevedo
          </span>

          <a href="#inicio">
            Voltar ao topo ↑
          </a>
        </div>
      </footer>

      {/* =====================================================
          CTA MOBILE FIXO

          O CTA só existe depois que o usuário sai da Hero.

          Hero:
          → escondido

          Próxima seção em diante:
          → sobe pela parte inferior
          → permanece fixo

          Voltou para Hero:
          → desce e desaparece
      ===================================================== */}
      <AnimatePresence>
        {showStickyCta && (
          <motion.a
            href="#contato"
            className="mobile-sticky-cta"
            initial={{
              y: 100,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: 100,
              opacity: 0,
            }}
            transition={{
              duration: 0.55,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileTap={{
              scale: 0.97,
            }}
          >
            <span>Agendar consulta</span>

            <ArrowRight size={17} />
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  );
}

function AnimateGoal({
  goal,
}: {
  goal?: {
    title: string;
    text: string;
  };
}) {
  return (
    <motion.div
      key={goal?.title ?? 'default'}
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.45,
      }}
      className="goal-content"
    >
      <span>
        {goal
          ? 'Seu ponto de partida'
          : 'Uma abordagem possível'}
      </span>

      <h3>
        {goal?.title ??
          'Alimentação que cabe na vida real.'}
      </h3>

      <p>
        {goal?.text ??
          'Escolha uma direção ao lado e veja como a experiência pode começar a partir do que você realmente precisa.'}
      </p>

      <a href="#contato">
        Quero conversar
        <ArrowRight size={15} />
      </a>
    </motion.div>
  );
}