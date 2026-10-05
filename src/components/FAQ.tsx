import { useState } from 'react';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import { useInView } from '@/hooks/useScrollAnimation';
import { content } from '@/data/content';

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const { ref, inView } = useInView(0.08);

  return (
    <section className="relative overflow-hidden bg-forest section-padding">
      <div className="container-page">
        <div ref={ref} className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
          {/* sticky sidebar */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <span className={`eyebrow text-lime-light block mb-4 transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`}>
              {content.faq.eyebrow}
            </span>
            <h2 className={`font-display text-display-sm text-warm-white mb-8 transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Perguntas<br />
              <em className="not-italic text-lime-light">frequentes.</em>
            </h2>
            <div className={`transition-all duration-700 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <p className="text-body-sm text-sage/70 mb-6">Ficou com alguma dúvida?</p>
              <a href="#contato" className="btn-primary pressable text-sm group">
                {content.faq.cta}
                <ArrowRight size={14} strokeWidth={2.5} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* accordion */}
          <div className="divide-y divide-[var(--border-dark)]">
            {content.faq.items.map((item, i) => (
              <div
                key={i}
                className={`transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${150 + i * 70}ms` }}
              >
                <button
                  onClick={() => setOpen(p => (p === i ? null : i))}
                  className="w-full flex items-start justify-between gap-4 py-6 text-left group"
                  aria-expanded={open === i}
                >
                  <span className="text-base font-medium text-cream group-hover:text-lime-light transition-colors duration-200 leading-snug md:text-lg">
                    {item.question}
                  </span>
                  <span className="touch-target shrink-0 flex items-center justify-center rounded-full border border-[var(--border-dark)] bg-forest-rim text-lime transition-all duration-200 group-hover:bg-lime group-hover:border-lime group-hover:text-white w-8 h-8">
                    {open === i
                      ? <Minus size={12} strokeWidth={2.5} />
                      : <Plus size={12} strokeWidth={2.5} />}
                  </span>
                </button>

                <div
                  className="overflow-hidden"
                  style={{
                    maxHeight: open === i ? '15rem' : '0',
                    opacity: open === i ? 1 : 0,
                    transition: 'max-height 0.42s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease',
                  }}
                >
                  <p className="text-body-md text-sage/75 leading-relaxed pb-6 max-w-lg">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
