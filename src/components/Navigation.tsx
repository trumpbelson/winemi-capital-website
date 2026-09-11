import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NAV_ITEMS, BRAND, SOCIAL_LINKS } from '../config';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'nav-glass py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="flex flex-col">
              <span className="font-serif text-xl lg:text-2xl font-semibold tracking-wide text-ivory">
                {BRAND.name}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setActiveMenu(item.label)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button
                  className="px-3 py-2 text-[11px] font-medium tracking-[0.15em] text-ivory/80 hover:text-accent-light transition-colors duration-300 flex items-center gap-1"
                  onClick={() => item.href ? window.location.hash = item.href.replace('#', '') : null}
                >
                  {item.label}
                  {item.submenu && <ChevronDown size={10} className="opacity-50" />}
                </button>

                {/* Mega Menu */}
                {item.submenu && activeMenu === item.label && (
                  <div className="absolute top-full left-0 pt-2">
                    <div className="bg-secondary/95 backdrop-blur-xl border border-white/5 rounded-sm p-6 min-w-[240px] shadow-2xl">
                      {item.submenu.map((sub) => (
                        <a
                          key={sub.label}
                          href={sub.href}
                          className="block py-2 px-3 text-sm text-ivory/70 hover:text-accent-light hover:bg-white/5 transition-all duration-200 rounded-sm"
                          onClick={() => setActiveMenu(null)}
                        >
                          {sub.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden xl:flex items-center gap-4">
            <Link
              to="/login"
              className="px-5 py-2 text-[11px] font-medium tracking-[0.15em] border border-accent/40 text-accent-light hover:bg-accent/10 transition-all duration-300 rounded-sm"
            >
              CLIENT LOGIN
            </Link>
            <a
              href="#contact"
              className="px-5 py-2 text-[11px] font-medium tracking-[0.15em] bg-accent/90 text-primary hover:bg-accent transition-all duration-300 rounded-sm"
            >
              CONTACT
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="xl:hidden p-2 text-ivory"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-primary/98 backdrop-blur-xl pt-20 overflow-y-auto">
          <div className="px-6 py-8 space-y-6">
            {NAV_ITEMS.map((item) => (
              <div key={item.label}>
                <button
                  className="w-full text-left py-3 text-sm font-medium tracking-[0.1em] text-ivory/90 border-b border-white/5 flex items-center justify-between"
                  onClick={() => {
                    if (item.href) {
                      window.location.hash = item.href.replace('#', '');
                      setMobileOpen(false);
                    }
                  }}
                >
                  {item.label}
                  {item.submenu && <ChevronDown size={14} className="opacity-50" />}
                </button>
                {item.submenu && (
                  <div className="pl-4 mt-2 space-y-1">
                    {item.submenu.map((sub) => (
                      <a
                        key={sub.label}
                        href={sub.href}
                        className="block py-2 text-sm text-ivory/60 hover:text-accent-light"
                        onClick={() => setMobileOpen(false)}
                      >
                        {sub.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-6 space-y-3 border-t border-white/10">
              <Link
                to="/login"
                className="block w-full text-center px-5 py-3 text-sm font-medium tracking-[0.1em] border border-accent/40 text-accent-light"
                onClick={() => setMobileOpen(false)}
              >
                CLIENT LOGIN
              </Link>
              <a
                href="#contact"
                className="block w-full text-center px-5 py-3 text-sm font-medium tracking-[0.1em] bg-accent text-primary"
                onClick={() => setMobileOpen(false)}
              >
                CONTACT
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
