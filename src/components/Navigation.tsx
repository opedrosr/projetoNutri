import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Leaf, ArrowRight } from 'lucide-react';
import { useScrollProgress } from '@/hooks/useScrollAnimation';

const navLinks = [
  { label: 'Sobre',       href: '#sobre' },
  { label: 'Serviços',    href: '#como-funciona' },
  { label: 'Resultados',  href: '#resultados' },
  { label: 'Contato',     href: '#contato' },
];

export default function Navigation() {
  const [open,     setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progress = useScrollProgress();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 64);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {/* read-progress bar */}
      <div
        className="fixed top-0 left-0 z-[60] h-0.5 bg-lime transition-none"
        style={{ width: `${progress * 100}%` }}
      />

      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass-dark border-b border-[var(--border-dark)]'
            : 'bg-transparent'
        }`}
      >
        <div className="container-page flex h-16 items-center justify-between md:h-20">
          {/* logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-lime text-white transition-transform duration-300 group-hover:scale-110">
              <Leaf size={15} strokeWidth={1.8} />
            </span>
            <div className="flex flex-col leading-none">
              <span className="font-display text-lg font-medium text-cream">Marina</span>
              <span className="eyebrow text-sage" style={{ fontSize: '0.55rem' }}>Azevedo · Nutricionista</span>
            </div>
          </a>

          {/* desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="text-sm font-medium text-sage/80 transition-colors hover:text-cream"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a href="#contato" className="btn-primary py-2.5 px-5 text-xs gap-1.5">
              Agendar consulta
              <ArrowRight size={13} strokeWidth={2.5} />
            </a>
          </div>

          {/* mobile burger */}
          <button
            onClick={() => setOpen(true)}
            className="touch-target md:hidden flex items-center justify-center rounded-full border border-[var(--border-dark)] bg-forest-mid/60 text-cream backdrop-blur"
            aria-label="Abrir menu"
          >
            <Menu size={20} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {/* mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-forest/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="glass-dark absolute right-0 top-0 flex h-full w-[min(88vw,22rem)] flex-col rounded-l-[2rem] border-r-0 p-8 pt-6"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                onClick={() => setOpen(false)}
                className="touch-target mb-8 self-end flex items-center justify-center rounded-full border border-[var(--border-dark)] bg-forest-rim text-sage"
                aria-label="Fechar menu"
              >
                <X size={20} strokeWidth={1.5} />
              </button>

              <div className="mb-8 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-lime text-white">
                  <Leaf size={15} strokeWidth={1.5} />
                </span>
                <div>
                  <p className="font-display text-xl text-cream">Marina Azevedo</p>
                  <p className="eyebrow text-sage" style={{ fontSize: '0.55rem' }}>Nutricionista</p>
                </div>
              </div>

              <nav className="flex flex-col gap-1">
                {navLinks.map(({ label, href }) => (
                  <a
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="pressable rounded-xl px-4 py-3.5 text-base font-medium text-sage transition-colors hover:bg-forest-rim hover:text-cream"
                  >
                    {label}
                  </a>
                ))}
              </nav>

              <a
                href="#contato"
                onClick={() => setOpen(false)}
                className="btn-primary mt-auto"
              >
                Agendar consulta
                <ArrowRight size={14} />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
