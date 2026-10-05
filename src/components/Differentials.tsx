import { useInView } from '@/hooks/useScrollAnimation';
import { content } from '@/data/content';

export default function Differentials() {
  const { ref, inView } = useInView(0.08);

  return (
    <section className="relative overflow-hidden bg-forest-mid section-padding">
      <div className="container-page">
        <div ref={ref}>
          <span className={`eyebrow text-lime-light block mb-5 transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`}>
            {content.differentials.eyebrow}
          </span>
          <h2 className={`font-display text-display-md text-warm-white mb-14 transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Uma experiência<br />
            <em className="not-italic text-lime-light">pensada para você.</em>
          </h2>

          {/* 2-col grid on white cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {content.differentials.items.map((item, i) => (
              <div
                key={i}
                className={`card-white group p-8 transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_16px_60px_rgba(16,33,16,0.25)] ${
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${150 + i * 90}ms` }}
              >
                <span className="block font-display text-5xl font-light leading-none text-forest/8 mb-5">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-2xl text-ink mb-3">{item.title}</h3>
                <p className="text-body-md text-ink-mid/75 leading-relaxed max-w-xs">{item.body}</p>
                <div className="mt-6 h-px w-0 bg-leaf transition-all duration-500 group-hover:w-12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
