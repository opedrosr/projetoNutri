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
    'https://images.pexels.com/photos/8554941/pexels-photo-8554941.jpeg?auto=compress&cs=tinysrgb&w=1800',

  lashArtist:
    'https://images.pexels.com/photos/34930095/pexels-photo-34930095.jpeg?auto=compress&cs=tinysrgb&w=1400',

  application:
    'https://images.pexels.com/photos/36930354/pexels-photo-36930354.jpeg?auto=compress&cs=tinysrgb&w=1400',

  detail:
    'https://images.pexels.com/photos/5128235/pexels-photo-5128235.jpeg?auto=compress&cs=tinysrgb&w=1200',

  resultOne:
    'https://images.pexels.com/photos/7446922/pexels-photo-7446922.jpeg?auto=compress&cs=tinysrgb&w=1200',

  resultTwo:
    'https://images.pexels.com/photos/29391092/pexels-photo-29391092.jpeg?auto=compress&cs=tinysrgb&w=1000',

  resultThree:
    'https://images.pexels.com/photos/33723106/pexels-photo-33723106.jpeg?auto=compress&cs=tinysrgb&w=1200',
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

const instagramUrl = 'https://instagram.com/lua.lash';
const whatsappUrl =
  'https://wa.me/5531999999999?text=Ol%C3%A1%2C%20L%C3%BAa!%20Quero%20agendar%20meu%20hor%C3%A1rio.';

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
  const [showStickyCta, setShowStickyCta] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

  const goals = [
    {
      id: 'natural',
      title: 'Natural',
      text: 'Leve, definido e discreto para valorizar o olhar sem pesar.',
    },
    {
      id: 'elongated',
      title: 'Alongado',
      text: 'Mais presença e definição para quem gosta de um olhar marcante.',
    },
    {
      id: 'volume',
      title: 'Volume',
      text: 'Volume construído respeitando a estrutura e a resistência dos seus fios.',
    },
    {
      id: 'custom',
      title: 'Personalizado',
      text: 'Mapeamento personalizado para encontrar o efeito que realmente combina com você.',
    },
  ];

  const faqs = [
    [
      'Quanto tempo dura o procedimento?',
      'Em média, entre 1h30 e 2h30, dependendo da técnica escolhida e da quantidade de fios.',
    ],
    [
      'Como escolher o efeito ideal?',
      'Durante o atendimento, avaliamos seus olhos, fios e preferência para indicar a curvatura e o volume mais adequados.',
    ],
    [
      'Preciso fazer manutenção?',
      'Sim. A manutenção mantém o resultado bonito e acompanha o ciclo natural dos seus cílios.',
    ],
    [
      'Como agendo meu horário?',
      'O botão de agendamento leva você direto para o WhatsApp da Lúa para confirmar disponibilidade e escolher o melhor horário.',
    ],
  ];

  const selectedGoal = goals.find((item) => item.id === goal);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyCta(!entry.isIntersecting),
      { threshold: 0.08 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <motion.div
        className="reading-progress"
        style={{ scaleX: progress }}
      />

      <header className="site-nav">
        <a href="#inicio" className="brand" onClick={closeMenu}>
          <span className="brand-mark">L</span>

          <span>
            <strong>LÚA</strong>
            <small>Lash designer</small>
          </span>
        </a>

        <nav className="desktop-nav">
          <a href="#metodo">O processo</a>
          <a href="#resultados">Trabalhos</a>
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
              Agendar horário
              <ArrowRight size={17} />
            </a>

            <div className="mobile-menu-footer">
              <span>LÚA · LASH DESIGNER</span>
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
              alt="Aplicação de extensão de cílios"
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
                Lash designer · Belo Horizonte
              </SectionLabel>

              <h1>
                Seu olhar não precisa de <em>excesso.</em>
                <span>Precisa da técnica certa.</span>
              </h1>

              <p>
                Extensão de cílios pensada para o formato dos seus olhos, sua rotina e o resultado que você procura.
              </p>

              <div className="hero-buttons">
                <MagneticButton>Agendar meu horário</MagneticButton>

                <a href="#metodo" className="text-link light-link">
                  Conhecer o processo
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
                <strong>Atendimento personalizado</strong>
                <small>Mapeamento pensado para os seus fios.</small>
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
                Um olhar pensado antes de cada fio
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
                Você não precisa seguir um efeito que não combina com você.
                <em>O melhor resultado começa quando a técnica respeita o seu olhar.</em>
              </p>

              <MagneticButton light href="#metodo">
                Como funciona
              </MagneticButton>
            </motion.div>
          </div>
        </section>

        {/* GOALS */}
        <section className="goal-section">
          <div className="page-width">
            <div className="goal-header">
              <SectionLabel dark>Escolha seu estilo</SectionLabel>

              <h2>
                Qual efeito combina com você?
              </h2>

              <p>
                Escolha o resultado que mais combina com você. A experiência é ajustada ao formato dos seus olhos e aos seus fios.
              </p>
            </div>

            <div className="goal-layout">
              <div className="goal-list">
                {goals.map((item, index) => (
                  <motion.button
                    type="button"
                    key={item.id}
                    className={`goal-item ${goal === item.id ? 'active' : ''}`}
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
                  src={goal ? img.detail : img.resultOne}
                  alt="Lash designer preparando o atendimento"
                  loading="lazy"
                  decoding="async"
                />

                <div className="goal-preview-overlay" />
                <AnimateGoal goal={selectedGoal} />
              </motion.div>
            </div>

            <div className="section-cta-row dark-row">
              <span>Já sabe qual efeito você quer?</span>
              <MagneticButton href="#contato">Agendar meu horário</MagneticButton>
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
            <SectionLabel>O processo</SectionLabel>

            <div>
              <h2>
                Menos fórmula pronta.
                <br />
                Mais personalização.
              </h2>

              <p>
                O procedimento começa antes da aplicação. Primeiro entendemos seus fios, seu formato de olho e o efeito que você quer alcançar.
              </p>
            </div>
          </div>

          <div className="process-story page-width">
            <div className="process-image-wrap">
              <motion.div style={{ y: processY }} className="process-image">
                <img
                  src={img.application}
                  alt="Lash designer realizando aplicação de extensão de cílios"
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>

              <div className="process-stamp">
                LÚA
                <br />
                <span>lash design</span>
              </div>

              <div className="image-glass-note">
                <span>
                  <Sparkles size={13} />
                </span>

                <div>
                  <strong>Personalização</strong>
                  <small>Cada aplicação parte do seu olhar.</small>
                </div>
              </div>
            </div>

            <div className="process-steps">
              {[
                [
                  '01',
                  'Avaliar',
                  'Formato dos olhos, curvatura, espessura dos fios e o efeito que você deseja.',
                ],
                [
                  '02',
                  'Mapear',
                  'Definimos comprimento, curvatura e distribuição para criar um resultado equilibrado.',
                ],
                [
                  '03',
                  'Aplicar',
                  'Cada fio é aplicado com precisão, respeitando a estrutura natural dos seus cílios.',
                ],
                [
                  '04',
                  'Finalizar',
                  'Você sai com o efeito definido e orientações simples para manter o resultado bonito.',
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
                  Um processo pensado para entregar um resultado bonito também depois do procedimento.
                </span>

                <a href="#contato">
                  Conhecer o atendimento
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
              <SectionLabel dark>O resultado</SectionLabel>

              <h2>
                O resultado está nos <em>detalhes.</em>
              </h2>

              <p>
                Um bom trabalho aparece no acabamento: leveza, simetria, definição e um efeito que conversa com o seu rosto.
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
                  src={img.resultOne}
                  alt="Cliente após procedimento de extensão de cílios"
                  loading="lazy"
                  decoding="async"
                />

                <div className="gallery-glass-tag">Mapeamento</div>

                <figcaption>
                  <span>01</span>
                  Naturalidade sem perder definição.
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
                  src={img.resultTwo}
                  alt="Detalhe do resultado de lash"
                  loading="lazy"
                  decoding="async"
                />

                <figcaption>
                  <span>02</span>
                  Curvatura que valoriza o olhar.
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
                  src={img.resultThree}
                  alt="Aplicação de extensão de cílios"
                  loading="lazy"
                  decoding="async"
                />

                <figcaption>
                  <span>03</span>
                  Acabamento feito fio a fio.
                </figcaption>
              </motion.figure>
            </div>

            <div className="results-cta">
              <div>
                <span>
                  O próximo resultado começa antes da primeira aplicação.
                </span>
              </div>

              <MagneticButton href="#contato">Agendar meu horário</MagneticButton>
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
                src={img.lashArtist}
                alt="Lúa Lash Designer em ambiente profissional"
                loading="lazy"
                decoding="async"
              />

              <div className="about-caption">
                <span>LÚA</span>
                <small>Lash Designer · Belo Horizonte</small>
              </div>
            </div>

            <div className="about-copy">
              <SectionLabel>Sobre a profissional</SectionLabel>

              <h2>
                Por trás de cada olhar, existe <em>técnica, precisão</em> e cuidado.
              </h2>

              <p>
                Eu sou a Lúa, lash designer especializada em criar extensões personalizadas para valorizar o olhar sem apagar a identidade de cada cliente. Cada atendimento começa com uma análise individual dos seus olhos e da condição dos seus fios.
              </p>

              <p>
                Acredito que extensão de cílios não precisa seguir um padrão. O efeito, a curvatura e o volume são escolhidos de acordo com você, sua rotina e o resultado que deseja.
              </p>

              <div className="about-facts">
                <div>
                  <strong>Especialidade</strong>
                  <span>Extensão de cílios</span>
                </div>

                <div>
                  <strong>Atendimento</strong>
                  <span>Com hora marcada</span>
                </div>

                <div>
                  <strong>Técnicas</strong>
                  <span>Clássico · Volume · Híbrido</span>
                </div>
              </div>

              <a href="#contato" className="text-link">
                Falar com a Lúa
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
              alt="Lash designer realizando procedimento"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="experience-panel">
            <SectionLabel dark>Uma experiência pensada para você</SectionLabel>

            <h2>
              Você não recebe um efeito pronto.
              <em>Seu olhar é construído para você.</em>
            </h2>

            <div className="experience-list">
              {[
                'Mapeamento personalizado',
                'Aplicação cuidadosa',
                'Orientação para manutenção',
              ].map((item, i) => (
                <motion.div key={item} whileHover={{ x: 5 }}>
                  <span>0{i + 1}</span>
                  <p>{item}</p>
                  <Check size={16} />
                </motion.div>
              ))}
            </div>

            <MagneticButton>Quero meu horário</MagneticButton>
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
                  Seu atendimento começa no caminho até <em>aqui.</em>
                </h2>

                <p>
                  Um espaço pensado para você chegar, desacelerar e aproveitar o atendimento. Veja o endereço e escolha a melhor forma de chegar.
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
                  title="Localização do studio"
                  src={mapEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                <div className="location-map-overlay">
                  <div className="location-pin">
                    <MapPin size={17} />
                  </div>

                  <div>
                    <strong>LÚA · Lash Designer</strong>
                    <span>Belo Horizonte · MG</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="location-info"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <span className="location-eyebrow">
                  <MapPin size={14} />
                  Endereço
                </span>

                <h3>
                  {clinicAddress}
                </h3>

                <p>
                  Atendimento com hora marcada. Reserve seu horário e venha com calma para o seu atendimento.
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
                      <small>Navegar até o studio</small>
                    </span>

                    <ArrowUpRight size={17} />
                  </a>
                </div>

                <a href="#contato" className="location-contact-link">
                  Prefere confirmar antes?
                  <span>Falar com a Lúa</span>
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
              <SectionLabel>Antes de agendar</SectionLabel>

              <h2>
                Antes de <em>agendar.</em>
              </h2>

              <p>
                Algumas respostas para deixar seu primeiro agendamento mais simples.
              </p>
            </div>

            <div className="faq-list">
              {faqs.map(([question, answer], index) => (
                <motion.div
                  className={`faq-item ${openFaq === index ? 'open' : ''}`}
                  key={question}
                  layout
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenFaq(openFaq === index ? null : index)
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
                      height: openFaq === index ? 'auto' : 0,
                      opacity: openFaq === index ? 1 : 0,
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
              Falar com a Lúa
              <ArrowRight size={15} />
            </a>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contato" className="contact-section">
          <div className="contact-bg">
            <img src={img.hero} alt="" loading="lazy" />
          </div>

          <div className="contact-overlay" />

          <div className="page-width contact-content">
            <SectionLabel dark>Seu próximo passo</SectionLabel>

            <h2>
              Vamos encontrar o efeito certo para o seu olhar?
            </h2>

            <p>
              Agende seu horário e descubra como funciona o atendimento.
            </p>

            <div className="contact-actions">
              <MagneticButton href={whatsappUrl}>
                Agendar horário
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
                @lua.lash
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="page-width footer-inner">
          <div className="brand footer-brand">
            <span className="brand-mark">L</span>

            <span>
              <strong>LÚA</strong>
              <small>Lash designer</small>
            </span>
          </div>

          <span>© 2026 LÚA</span>

          <a href="#inicio">Voltar ao topo ↑</a>
        </div>
      </footer>

      <AnimatePresence>
        {showStickyCta && (
          <motion.a
            href="#contato"
            className="mobile-sticky-cta"
            initial={{ y: 90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 90, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            whileTap={{ scale: 0.97 }}
          >
            <span>Agendar horário</span>
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
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="goal-content"
    >
      <span>{goal ? 'Seu ponto de partida' : 'Uma escolha possível'}</span>

      <h3>
        {goal?.title ?? 'Um efeito que combina com você.'}
      </h3>

      <p>
        {goal?.text ??
          'Escolha um estilo ao lado e veja como a experiência pode começar a partir do resultado que você procura.'}
      </p>

      <a href="#contato">
        Quero agendar
        <ArrowRight size={15} />
      </a>
    </motion.div>
  );
}
