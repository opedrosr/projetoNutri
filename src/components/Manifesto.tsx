import { ArrowRight } from 'lucide-react';
import { useInView } from '@/hooks/useScrollAnimation';
import { content } from '@/data/content';
import { images } from '@/data/images';

export default function Manifesto() {
  const { ref, inView } = useInView(0.15);

  return (
    <section className="relative overflow-hidden bg-forest section-padding">
      {/* decorative green glow */}
      <div className="pointer-events-none absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 translate-x-1/2 rounded-full bg-lime/8 blur-[100px]" />

      <div className="container-page relative z-10">
        <div ref={ref} className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* text */}
          <div>
            <span className={`eyebrow text-lime-light block mb-5 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {content.manifesto.eyebrow}
            </span>
            <h2 className={`font-display text-display-md text-warm-white transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {content.manifesto.headline}
            </h2>
            <div className={`my-7 h-px w-14 bg-lime transition-all duration-700 delay-200 origin-left ${inView ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`} />
            <p className={`text-body-lg text-sage-pale/75 max-w-md transition-all duration-700 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {content.manifesto.body}
            </p>
            <div className={`mt-9 transition-all duration-700 delay-400 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <a href="#como-funciona" className="btn-primary pressable">
                {content.manifesto.cta}
                <ArrowRight size={15} strokeWidth={2.5} />
              </a>
            </div>
          </div>

          {/* side image card */}
          <div className={`relative transition-all duration-1000 delay-200 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="overflow-hidden rounded-[2rem] shadow-[0_24px_80px_rgba(0,0,0,0.5)]" style={{ aspectRatio: '1 / 1.15' }}>
              <img
                src={images.food3}
                alt="Alimentação natural e equilibrada"
                loading="lazy"
                className="h-full w-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/50 to-transparent" />
            </div>
            {/* floating pill */}
            <div className="glass-lime absolute -bottom-5 left-8 rounded-2xl px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-lime-light">4 anos de experiência clínica</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
