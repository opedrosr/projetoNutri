import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Check, Leaf, Star } from 'lucide-react';
import { useRef, useState } from 'react';
import { content } from '@/data/content';
import { images } from '@/data/images';

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const bgY     = useTransform(scrollYProgress, [0, 1], [0, prefersReduced ? 0 : 120]);
  const personY = useTransform(scrollYProgress, [0, 1], [0, prefersReduced ? 0 : 60]);
  const textY   = useTransform(scrollYProgress, [0, 1], [0, prefersReduced ? 0 : 40]);

  const fadeUp = (delay = 0) => ({
    initial:    { opacity: 0, y: prefersReduced ? 0 : 28 },
    animate:    { opacity: 1, y: 0 },
    transition: { duration: 0.85, delay, ease },
  });

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col overflow-hidden bg-forest"
      aria-label="Seção principal"
    >
      {/* ── background texture: nature photograph ── */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 scale-110 will-change-transform"
        aria-hidden="true"
      >
        <img
          src={images.heroBg}
          alt=""
          fetchPriority="low"
          loading="lazy"
          className="h-full w-full object-cover opacity-30"
        />
        {/* layered gradients — darkens top & bottom, preserves middle */}
        <div className="absolute inset-0 bg-gradient-to-b from-forest via-forest/55 to-forest/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest/80 via-transparent to-forest/30" />
      </motion.div>

      {/* ── glow blob ── */}
      <div
        className="absolute left-1/2 top-1/3 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime/10 blur-[120px]"
        aria-hidden="true"
      />

      {/* ── main grid ── */}
      <div className="container-page relative z-10 flex flex-1 flex-col justify-center pb-14 pt-28 md:pb-24 md:pt-36">
        <div className="grid items-end gap-8 md:gap-12 lg:grid-cols-[1fr_auto] lg:items-center">

          {/* ── LEFT: text ── */}
          <motion.div style={{ y: textY }} className="lg:max-w-2xl">

            {/* pill badge */}
            <motion.div {...fadeUp(0.05)}>
              <span className="glass-lime mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-sage-pale">
                <Leaf size={11} strokeWidth={2} />
                Nutrição esportiva · Estética
              </span>
            </motion.div>

            {/* DISPLAY headline — reference style: huge, multiline, bold */}
            <motion.h1 {...fadeUp(0.14)} className="font-display text-display-xl font-light text-warm-white">
              Nutrição que<br />
              acompanha<br />
              <em className="font-light not-italic text-lime-light">a sua vida.</em>
            </motion.h1>

            <motion.p {...fadeUp(0.28)} className="mt-6 max-w-md text-body-lg text-sage-pale/80">
              {content.hero.body}
            </motion.p>

            {/* social proof strip */}
            <motion.div {...fadeUp(0.38)} className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
              {['Plano individualizado', 'Acompanhamento próximo', 'Sem extremismos'].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5 text-xs text-sage">
                  <Check size={12} className="text-lime-light" strokeWidth={2.5} />
                  {t}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div {...fadeUp(0.46)} className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#contato" className="btn-primary pressable shadow-lime/30">
                {content.hero.cta}
                <ArrowRight size={15} strokeWidth={2.5} />
              </a>
              <a href="#como-funciona" className="btn-ghost pressable">
                {content.hero.ctaSecondary}
              </a>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: hero photograph ── */}
          <motion.div
            {...fadeUp(0.2)}
            style={{ y: personY }}
            className="relative mx-auto w-full max-w-[360px] shrink-0 self-end md:max-w-[440px] lg:mr-[-2rem] lg:max-w-[420px] xl:max-w-[480px]"
          >
            {/* rounded photo card */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-forest-rim shadow-[0_32px_100px_rgba(0,0,0,0.55)]">
              <img
                src={images.hero}
                alt="Marina Azevedo — Nutricionista"
                fetchPriority="high"
                loading="eager"
                onLoad={() => setImgLoaded(true)}
                className={`w-full object-cover object-top transition-[filter,transform] duration-1000 ${
                  imgLoaded ? 'scale-100 blur-0' : 'scale-105 blur-md'
                }`}
                style={{ aspectRatio: '0.82' }}
              />
              {/* inner tint so person blends with dark bg */}
              <div className="absolute inset-0 bg-gradient-to-t from-forest/60 via-transparent to-forest/5" />
            </div>

            {/* ── floating badge: name card ── */}
            <motion.div
              {...fadeUp(0.55)}
              className="glass-dark absolute -bottom-4 -left-4 flex items-center gap-3 rounded-2xl p-3.5 md:-left-8"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime text-white">
                <Leaf size={16} strokeWidth={1.5} />
              </div>
              <div className="pr-2">
                <p className="font-display text-base font-medium leading-none text-cream">Marina Azevedo</p>
                <p className="mt-1 text-[0.6rem] uppercase tracking-[0.14em] text-sage">Nutricionista · CRN 00000</p>
              </div>
            </motion.div>

            {/* ── floating stat ── */}
            <motion.div
              {...fadeUp(0.65)}
              className="glass-lime absolute -right-3 top-8 rounded-2xl px-4 py-3 md:-right-8"
            >
              <p className="font-display text-3xl leading-none text-cream">+200</p>
              <p className="mt-1 text-[0.6rem] uppercase tracking-[0.14em] text-sage-pale">acompanhamentos</p>
            </motion.div>

            {/* ── floating review stars ── */}
            <motion.div
              {...fadeUp(0.72)}
              className="glass-dark absolute -right-2 bottom-16 flex items-center gap-1.5 rounded-xl px-3 py-2 md:-right-6"
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={11} fill="currentColor" className="text-gold" />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── bottom fade into next section ── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-forest to-transparent" aria-hidden="true" />
    </section>
  );
}
