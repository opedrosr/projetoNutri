import { ArrowRight } from 'lucide-react';
import { useInView } from '@/hooks/useScrollAnimation';
import { content } from '@/data/content';
import { images } from '@/data/images';

export default function HowItWorks() {
  const { ref, inView } = useInView(0.08);

  return (
    <section id="como-funciona" className="relative overflow-hidden bg-forest section-padding">
      {/* background greenery */}
      <div className="absolute inset-0 opacity-15">
        <img src={images.greenBg} alt="" aria-hidden="true" loading="lazy" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-forest/75" />
      </div>

      <div className="container-page relative z-10">
        <div ref={ref} className="flex flex-col gap-5 mb-14 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="eyebrow text-lime-light block mb-4">{content.howItWorks.eyebrow}</span>
            <h2 className="font-display text-display-md text-warm-white">{content.howItWorks.headline}</h2>
          </div>
          <div className={`transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <a href="#contato" className="btn-primary pressable">
              {content.howItWorks.cta}
              <ArrowRight size={15} strokeWidth={2.5} />
            </a>
          </div>
        </div>

        {/* steps */}
        <div className="divide-y divide-[var(--border-dark)]">
          {content.howItWorks.steps.map((step, i) => (
            <div
              key={step.number}
              className={`grid grid-cols-1 gap-4 py-8 transition-all duration-700 md:grid-cols-[5.5rem_1fr_1fr] md:gap-8 md:py-10 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${180 + i * 120}ms` }}
            >
              {/* number */}
              <span className="font-display text-5xl font-light leading-none text-white/12 md:text-6xl">
                {step.number}
              </span>
              {/* title */}
              <div className="md:border-l md:border-[var(--border-dark)] md:pl-8">
                <h3 className="font-display text-2xl text-warm-white md:text-3xl">{step.title}</h3>
              </div>
              {/* body */}
              <p className="text-body-md text-sage/80 max-w-sm leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
