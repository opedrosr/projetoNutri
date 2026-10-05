import { ArrowRight, MessageCircle } from 'lucide-react';
import { useInView } from '@/hooks/useScrollAnimation';
import { content } from '@/data/content';
import { images } from '@/data/images';

export default function FinalCTA() {
  const { ref, inView } = useInView(0.12);
  const waUrl = `https://wa.me/${content.finalCta.whatsappNumber}?text=Ol%C3%A1%2C+Marina%21+Gostaria+de+agendar+uma+consulta.`;

  return (
    <section id="contato" className="relative overflow-hidden bg-forest">
      {/* full-bleed background */}
      <div className="absolute inset-0">
        <img src={images.consultation} alt="" aria-hidden="true" loading="lazy" className="h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-br from-forest/95 via-forest/85 to-forest-rim/80" />
      </div>

      {/* glow */}
      <div className="absolute left-1/2 top-1/2 h-[50rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime/8 blur-[140px]" aria-hidden="true" />

      <div className="relative z-10 section-padding">
        <div className="container-page">
          <div ref={ref} className="max-w-3xl">
            <span className={`eyebrow text-lime-light block mb-5 transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`}>
              {content.finalCta.eyebrow}
            </span>
            <h2 className={`font-display text-display-lg text-warm-white mb-5 transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Seu próximo passo<br />
              <em className="not-italic text-lime-light">pode começar aqui.</em>
            </h2>
            <p className={`text-body-lg text-sage/75 mb-12 max-w-md leading-relaxed transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              {content.finalCta.body}
            </p>

            <div className={`flex flex-col gap-4 sm:flex-row transition-all duration-700 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <a href="#" className="btn-primary pressable text-base px-8 py-4 shadow-lime/30">
                {content.finalCta.cta}
                <ArrowRight size={16} strokeWidth={2.5} />
              </a>
              <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost pressable text-base px-8 py-4">
                <MessageCircle size={16} strokeWidth={1.5} />
                {content.finalCta.whatsapp}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
