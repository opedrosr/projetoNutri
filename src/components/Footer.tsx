import { MessageCircle, Instagram, Mail } from 'lucide-react';
import { content } from '@/data/content';

const footerLinks = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Resultados', href: '#resultados' },
  { label: 'Contato', href: '#contato' },
];

export default function Footer() {
  const waUrl = `https://wa.me/${content.finalCta.whatsappNumber}?text=Ol%C3%A1%2C+Marina%21+Gostaria+de+agendar+uma+consulta.`;

  return (
    <footer className="bg-charcoal text-white/70">
      <div className="container-page py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 mb-12 pb-12 border-b border-white/10">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <span className="font-display text-2xl text-white font-medium">Marina</span>
              <br />
              <span className="eyebrow text-white/40">Azevedo · Nutricionista</span>
            </div>
            <p className="text-body-sm text-white/40 leading-relaxed max-w-xs">
              Nutrição esportiva e estética com estratégia, individualidade e consistência.
            </p>
          </div>

          {/* Links */}
          <div>
            <span className="eyebrow text-white/40 block mb-5">Navegação</span>
            <nav className="flex flex-col gap-3">
              {footerLinks.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  className="text-body-sm text-white/60 hover:text-white transition-colors duration-200"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <span className="eyebrow text-white/40 block mb-5">Contato</span>
            <div className="flex flex-col gap-3">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-body-sm text-white/60 hover:text-white transition-colors duration-200 group"
              >
                <MessageCircle size={15} strokeWidth={1.5} className="text-sage" />
                WhatsApp
              </a>
              <a
                href="#"
                className="flex items-center gap-3 text-body-sm text-white/60 hover:text-white transition-colors duration-200"
              >
                <Instagram size={15} strokeWidth={1.5} className="text-sage" />
                @marinaazevedo.nutri
              </a>
              <a
                href="mailto:contato@marinaazevedo.com.br"
                className="flex items-center gap-3 text-body-sm text-white/60 hover:text-white transition-colors duration-200"
              >
                <Mail size={15} strokeWidth={1.5} className="text-sage" />
                contato@marinaazevedo.com.br
              </a>
            </div>

            {/* Address */}
            <div className="mt-6 text-body-sm text-white/30 leading-relaxed">
              <p>{content.location.address}</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-[11px] text-white/30">
            © {new Date().getFullYear()} Marina Azevedo. Todos os direitos reservados.
          </p>
          <p className="text-[11px] text-white/20">
            CRN 00000 · Conteúdo demonstrativo
          </p>
        </div>
      </div>
    </footer>
  );
}
