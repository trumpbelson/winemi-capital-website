import { Link } from 'react-router-dom';
import { BRAND, SOCIAL_LINKS } from '../config';
import { Twitter, Instagram, Youtube, Facebook, MessageCircle, Send, Linkedin, Music2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-secondary border-t border-white/5" id="contact">
      {/* Main Footer */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="font-serif text-2xl font-semibold text-ivory mb-4">{BRAND.name}</h3>
            <p className="text-sm text-ivory/60 leading-relaxed mb-6">
              {BRAND.supporting}
            </p>
            <p className="text-xs tracking-[0.15em] uppercase text-accent/80">
              {BRAND.philosophy}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-medium tracking-[0.2em] uppercase text-ivory/40 mb-6">Navigation</h4>
            <ul className="space-y-3">
              {['About', 'Investments', 'Asset Management', 'Markets', 'Mentorship', 'Education', 'Insights'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-sm text-ivory/60 hover:text-accent-light transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-medium tracking-[0.2em] uppercase text-ivory/40 mb-6">Contact</h4>
            <ul className="space-y-3">
              <li className="text-sm text-ivory/60">{BRAND.location}</li>
              <li>
                <a href={`tel:${BRAND.phone}`} className="text-sm text-ivory/60 hover:text-accent-light transition-colors">
                  {BRAND.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${BRAND.email}`} className="text-sm text-ivory/60 hover:text-accent-light transition-colors">
                  {BRAND.email}
                </a>
              </li>
              <li>
                <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="text-sm text-ivory/60 hover:text-accent-light transition-colors">
                  WhatsApp: {BRAND.phone}
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs font-medium tracking-[0.2em] uppercase text-ivory/40 mb-6">Connect</h4>
            <div className="flex flex-wrap gap-3">
              <a href={SOCIAL_LINKS.x} target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="w-10 h-10 flex items-center justify-center border border-white/10 hover:border-accent/50 hover:bg-accent/10 transition-all rounded-sm">
                <Twitter size={16} className="text-ivory/70" />
              </a>
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 flex items-center justify-center border border-white/10 hover:border-accent/50 hover:bg-accent/10 transition-all rounded-sm">
                <Instagram size={16} className="text-ivory/70" />
              </a>
              <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-10 h-10 flex items-center justify-center border border-white/10 hover:border-accent/50 hover:bg-accent/10 transition-all rounded-sm">
                <Youtube size={16} className="text-ivory/70" />
              </a>
              <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 flex items-center justify-center border border-white/10 hover:border-accent/50 hover:bg-accent/10 transition-all rounded-sm">
                <Facebook size={16} className="text-ivory/70" />
              </a>
              <a href={SOCIAL_LINKS.discord} target="_blank" rel="noopener noreferrer" aria-label="Discord" className="w-10 h-10 flex items-center justify-center border border-white/10 hover:border-accent/50 hover:bg-accent/10 transition-all rounded-sm">
                <MessageCircle size={16} className="text-ivory/70" />
              </a>
              <a href={SOCIAL_LINKS.telegram} target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="w-10 h-10 flex items-center justify-center border border-white/10 hover:border-accent/50 hover:bg-accent/10 transition-all rounded-sm">
                <Send size={16} className="text-ivory/70" />
              </a>
              <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="w-10 h-10 flex items-center justify-center border border-white/10 hover:border-accent/50 hover:bg-accent/10 transition-all rounded-sm">
                <Music2 size={16} className="text-ivory/70" />
              </a>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 flex items-center justify-center border border-white/10 hover:border-accent/50 hover:bg-accent/10 transition-all rounded-sm">
                <Linkedin size={16} className="text-ivory/70" />
              </a>
              <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-10 h-10 flex items-center justify-center border border-white/10 hover:border-accent/50 hover:bg-accent/10 transition-all rounded-sm">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-ivory/70"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
            </div>
            <p className="mt-4 text-sm text-ivory/50">{BRAND.handle}</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ivory/40">
            © {new Date().getFullYear()} {BRAND.name} All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-xs text-ivory/40 hover:text-accent-light transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-xs text-ivory/40 hover:text-accent-light transition-colors">Terms of Service</Link>
            <Link to="/risk-disclosure" className="text-xs text-ivory/40 hover:text-accent-light transition-colors">Risk Disclosure</Link>
            <Link to="/disclaimer" className="text-xs text-ivory/40 hover:text-accent-light transition-colors">Disclaimer</Link>
          </div>
        </div>
      </div>

      {/* Risk Disclaimer */}
      <div className="border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-6">
          <p className="text-[10px] text-ivory/30 leading-relaxed max-w-4xl">
            <strong>RISK DISCLAIMER:</strong> Investment and trading activities involve substantial risk of loss and are not suitable for all investors. 
            Past performance is not indicative of future results. The content on this website is for educational and informational purposes only 
            and does not constitute financial advice. Please consult with a qualified financial advisor before making any investment decisions.
          </p>
        </div>
      </div>
    </footer>
  );
}
