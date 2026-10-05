import { ArrowRight } from 'lucide-react';
import { useInView } from '@/hooks/useScrollAnimation';
import { content } from '@/data/content';
import { images } from '@/data/images';

export default function About() {
  const { ref, inView } = useInView(0.08);

  return (
    <section id="sobre" className="relative overflow-hidden bg-forest section-padding">
      <div className="container-page">
        <div ref={ref} className="grid grid-cols-1 gap-0 overflow-hidden rounded-[2.5rem] shadow-[0_32px_100px_rgba(0,0,0,0.5)] lg:grid-cols-2">
          {/* image */}
          <div
            className={`clip-reveal relative min-h-[380px] md:min-h-[520px] lg:min-h-0 ${inView ? 'visible' : ''}`}
          >
            <img
              src={images.about}
              alt="Marina Azevedo — Nutricionista"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/50 via-transparent to-transparent" />
          </div>

          {/* text */}
          <div
            className={`bg-forest-mid flex flex-col justify-center p-8 md:p-12 lg:p-16 transition-all duration-1000 delay-300 ${
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <span className="eyebrow text-lime-light block mb-5">{content.about.eyebrow}</span>
            <h2 className="font-display text-display-sm text-warm-white mb-2">
              Por trás da estratégia,
            </h2>
            <h2 className="font-display text-display-sm text-lime-light mb-7">
              existe uma pessoa.
            </h2>
            <h3 className="font-display text-2xl text-cream mb-5">{content.about.name}</h3>
            <p className="text-body-md text-sage/75 leading-relaxed mb-8 max-w-md">{content.about.body}</p>

            {/* credentials — pill badges */}
            <div className="flex flex-wrap gap-2 mb-10">
              {content.about.credentials.map((c, i) => (
                <span key={i} className="glass-lime rounded-full px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-lime-light">
                  {c}
                </span>
              ))}
            </div>

            <a href="#contato" className="btn-primary pressable self-start">
              {content.about.cta}
              <ArrowRight size={14} strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
