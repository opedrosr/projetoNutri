import { ArrowRight } from 'lucide-react';
import { useInView } from '@/hooks/useScrollAnimation';
import { content } from '@/data/content';

const accentColors = ['text-lime-light', 'text-gold', 'text-sage', 'text-lime'];

export default function ForWhom() {
  const { ref, inView } = useInView(0.08);

  return (
    <section className="relative overflow-hidden bg-forest-mid section-padding">
      <div className="container-page">
        <div ref={ref}>
          <span className={`eyebrow text-lime-light block mb-5 transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`}>
            {content.forWhom.eyebrow}
          </span>
          <h2 className={`font-display text-display-md text-warm-white mb-14 transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Talvez você não precise<br />
            <em className="not-italic text-lime-light">de mais uma dieta.</em>
          </h2>

          {/* cards: horizontal scroll mobile, 2-col grid desktop */}
          <div className="mobile-scroll -mx-4 flex gap-4 overflow-x-auto px-4 pb-3 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0">
            {content.forWhom.objectives.map((obj, i) => (
              <div
                key={obj.id}
                className={`card-white min-w-[82vw] shrink-0 p-7 transition-all duration-700 md:min-w-0 ${
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${150 + i * 90}ms` }}
              >
                <span className="font-display text-6xl font-light leading-none text-forest/10 block mb-4">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className={`font-display text-display-sm mb-3 ${accentColors[i]}`}
                  style={{ color: ['#5a9e3a','#c8965a','#a8bf8a','#7dc458'][i] }}>
                  {obj.title}
                </h3>
                <p className="text-body-md text-ink-mid leading-relaxed max-w-xs">{obj.body}</p>
              </div>
            ))}
          </div>

          <div className={`mt-10 transition-all duration-700 delay-500 ${inView ? 'opacity-100' : 'opacity-0'}`}>
            <a href="#contato" className="btn-primary pressable">
              {content.forWhom.cta}
              <ArrowRight size={15} strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
