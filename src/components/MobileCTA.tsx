import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function MobileCTA() {
  const [visible, setVisible] = useState(false);
  const [nearCTA, setNearCTA] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      // Show after first viewport
      setVisible(scrollY > vh * 0.6);

      // Hide near hero and final CTA sections
      const finalSection = document.getElementById('contato');
      if (finalSection) {
        const rect = finalSection.getBoundingClientRect();
        setNearCTA(rect.top < vh * 0.8);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const shouldShow = visible && !nearCTA;

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-40 transition-all duration-400 ${
        shouldShow ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="glass-dark rounded-t-[1.5rem] border-x-0 border-b-0 px-4 py-3 shadow-[0_-12px_40px_rgba(61,79,46,0.18)]">
        <a
          href="#contato"
          className="pressable flex min-h-[48px] w-full items-center justify-center gap-2.5 rounded-full bg-white text-sm font-medium tracking-wide text-olive-deep shadow-md shadow-black/10 transition-all duration-200"
        >
          Agendar consulta
          <ArrowRight size={15} strokeWidth={2} />
        </a>
      </div>
    </div>
  );
}
