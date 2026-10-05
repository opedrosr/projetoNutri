import { ArrowRight } from 'lucide-react';
import { useInView } from '@/hooks/useScrollAnimation';
import { content } from '@/data/content';

export default function Approach() {
  const { ref, inView } = useInView(0.08);

  return (
    <section className="relative overflow-hidden bg-forest-mid section-padding">
      <div className="container-page">
        <div ref={ref} className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24">
          {/* left */}
          <div>
            <span className={`eyebrow text-lime-light block mb-5 transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`}>
              {content.approach.eyebrow}
            </span>
            <h2 className={`font-display text-display-md text-warm-white transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {content.approach.headline}
            </h2>
            <p className={`mt-6 text-body-lg text-sage/75 max-w-md transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {content.approach.body}
            </p>
            <div className={`mt-9 transition-all duration-700 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <a href="#como-funciona" className="btn-primary pressable">
                {content.approach.cta}
                <ArrowRight size={15} strokeWidth={2.5} />
              </a>
            </div>
          </div>

          {/* right: principles as white cards */}
          <div className="flex flex-col gap-4">
            {content.approach.principles.map((p, i) => (
              <div
                key={p.title}
                className={`card-white p-6 transition-all duration-700 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
                style={{ transitionDelay: `${280 + i * 120}ms` }}
              >
                <div className="flex items-baseline gap-4 mb-3">
                  <span className="font-display text-lg text-leaf/40 w-7 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-2xl text-ink">{p.title}</h3>
                </div>
                <p className="text-body-md text-ink-mid/80 leading-relaxed pl-11">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
