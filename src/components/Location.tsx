import { MapPin, Monitor, Clock, ArrowUpRight } from 'lucide-react';
import { useInView } from '@/hooks/useScrollAnimation';
import { content } from '@/data/content';
import { images } from '@/data/images';

export default function Location() {
  const { ref, inView } = useInView(0.08);

  return (
    <section className="relative overflow-hidden bg-forest-mid section-padding">
      <div className="container-page">
        <div ref={ref} className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* text */}
          <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="eyebrow text-lime-light block mb-4">{content.location.eyebrow}</span>
            <h2 className="font-display text-display-sm text-warm-white mb-8">
              Presencial ou online,<br />
              <em className="not-italic text-lime-light">onde você estiver.</em>
            </h2>

            {/* modality cards */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { Icon: MapPin, label: 'Presencial', detail: content.location.modalities[0].detail },
                { Icon: Monitor, label: 'Online',     detail: content.location.modalities[1].detail },
              ].map(({ Icon, label, detail }) => (
                <div key={label} className="card-white p-5 group hover:-translate-y-1 transition-transform duration-300">
                  <Icon size={18} strokeWidth={1.5} className="text-leaf mb-3" />
                  <p className="text-sm font-semibold text-ink mb-1">{label}</p>
                  <p className="text-body-sm text-ink-mid/70">{detail}</p>
                </div>
              ))}
            </div>

            {/* address */}
            <div className="border-l-2 border-lime/50 pl-4 mb-8">
              <p className="text-body-sm text-sage/80">{content.location.address}</p>
              <p className="mt-1 text-[0.7rem] italic text-sage/40">{content.location.addressNote}</p>
            </div>

            {/* hours */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <Clock size={14} strokeWidth={1.5} className="text-lime-light" />
                <span className="eyebrow text-lime-light" style={{ fontSize: '0.6rem' }}>Horários de atendimento</span>
              </div>
              {content.location.hours.map((h, i) => (
                <div key={i} className="flex justify-between py-2 border-b border-[var(--border-dark)] last:border-0">
                  <span className="text-body-sm text-sage/70">{h.day}</span>
                  <span className="text-body-sm font-semibold text-cream">{h.time}</span>
                </div>
              ))}
            </div>

            <a href="#" className="btn-ghost pressable text-sm">
              {content.location.cta}
              <ArrowUpRight size={14} strokeWidth={2} />
            </a>
          </div>

          {/* image */}
          <div className={`relative overflow-hidden rounded-[2rem] min-h-[300px] md:min-h-[400px] lg:min-h-[480px] shadow-[0_24px_80px_rgba(0,0,0,0.5)] transition-all duration-1000 delay-200 ${inView ? 'clip-reveal visible' : 'clip-reveal'}`}>
            <img
              src={images.office}
              alt="Consultório Marina Azevedo"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/60 to-transparent" />
            {/* floating card */}
            <div className="glass-dark absolute bottom-6 left-6 right-6 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <MapPin size={16} strokeWidth={1.5} className="text-lime shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-cream">Marina Azevedo — Nutricionista</p>
                  <p className="text-body-sm text-sage/70">{content.location.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
