import { ArrowRight } from 'lucide-react';
import { useInView } from '@/hooks/useScrollAnimation';
import { content } from '@/data/content';
import { images } from '@/data/images';

export default function Results() {
  const { ref, inView } = useInView(0.08);

  return (
    <section id="resultados" className="relative overflow-hidden bg-forest section-padding">
      <div className="container-page">
        {/* header */}
        <div ref={ref} className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="eyebrow text-lime-light block mb-4">{content.results.eyebrow}</span>
            <h2 className="font-display text-display-md text-warm-white">
              Resultados que fazem sentido<br />
              <em className="not-italic text-lime-light">para a vida real.</em>
            </h2>
          </div>
          <div className={`transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <a href="#contato" className="btn-primary pressable">
              {content.results.cta}
              <ArrowRight size={14} strokeWidth={2.5} />
            </a>
          </div>
        </div>

        {/* stats row — white cards on dark bg, reference style */}
        <div className={`mb-14 grid grid-cols-3 gap-3 md:gap-5 transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {content.results.stats.map((stat, i) => (
            <div key={i} className="card-white flex flex-col items-center px-4 py-6 text-center">
              <span className="font-display text-display-sm text-leaf font-light">{stat.value}</span>
              <p className="mt-2 text-[0.75rem] text-ink-mid leading-snug max-w-[120px]">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* editorial grid */}
        <div className="grid grid-cols-1 gap-0 overflow-hidden rounded-3xl border border-[var(--border-dark)] md:grid-cols-2 lg:grid-cols-3">
          {/* large image cell */}
          <div className="relative min-h-[300px] md:col-span-1 lg:min-h-[440px]">
            <img
              src={images.active}
              alt="Resultado de acompanhamento"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="eyebrow text-sage block mb-2">Composição corporal</span>
              <p className="font-display text-xl text-cream leading-snug">Resultado real, na rotina real.</p>
            </div>
          </div>

          {/* testimonials column */}
          <div className="divide-y divide-[var(--border-dark)] md:col-span-1 lg:col-span-2">
            {content.results.testimonials.map((t, i) => (
              <div
                key={i}
                className={`bg-forest-mid p-6 md:p-8 transition-all duration-700 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
                style={{ transitionDelay: `${200 + i * 120}ms` }}
              >
                <span className="font-display text-4xl text-lime/60 leading-none block mb-3">"</span>
                <blockquote className="text-body-lg text-cream/85 font-light leading-relaxed mb-4">{t.quote}</blockquote>
                <div className="flex items-center gap-3">
                  <div className="h-px w-8 bg-lime/50" />
                  <span className="text-body-sm font-medium text-cream">{t.name}</span>
                  <span className="text-body-sm text-sage"> · {t.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* mobile horizontal scroll / desktop grid photo strip */}
        <div className="mobile-scroll -mx-4 mt-5 flex gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0">
          {[images.food1, images.food2, images.consultation].map((src, i) => (
            <div key={i} className="min-w-[78vw] overflow-hidden rounded-2xl md:min-w-0 aspect-[4/3] shrink-0">
              <img src={src} alt="" loading="lazy" className="h-full w-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
