import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Eye, ZoomIn, ZoomOut, Palette, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { translations } from '@/lib/translations';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const {
    theme,
    setTheme,
    language,
    setLanguage,
    magnification,
    increaseMagnification,
    decreaseMagnification
  } = useAccessibility();

  const t = translations[language];

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/about', label: t.nav.about },
    { href: '/top-apps', label: t.nav.apps },
    { href: '/useful-links', label: t.nav.links },
    { href: '/accessibility', label: t.nav.accessibility },
    { href: '/contact', label: t.nav.contact },
  ];

  const cycleTheme = () => {
    if (theme === 'dark') setTheme('light');
    else if (theme === 'light') setTheme('high-contrast');
    else setTheme('dark');
  };

  const cycleLanguage = () => {
    if (language === 'en') setLanguage('am');
    else if (language === 'am') setLanguage('om');
    else setLanguage('en');
  };

  const getLanguageLabel = () => {
    if (language === 'en') return 'Amharic';
    if (language === 'am') return 'Afaan Oromo';
    return 'English';
  };

  const getThemeLabel = () => {
    if (theme === 'dark') return t.controls.dark;
    if (theme === 'light') return t.controls.light;
    return t.controls.contrast;
  };

  return (
    <>
      {/* Skip to content link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-3 group"
              aria-label="Blind Tech Hub - Home"
            >
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center group-hover:scale-105 transition-transform">
                <Eye className="w-6 h-6 text-primary-foreground" aria-hidden="true" />
              </div>
              <span className="text-xl font-bold text-foreground">
                Blind<span className="text-primary">Tech</span>Hub
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-4 py-2 rounded-lg text-accessible-base font-medium transition-colors ${location.pathname === link.href
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                    }`}
                  aria-current={location.pathname === link.href ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Accessibility Controls */}
            <div className="hidden md:flex items-center gap-2">
              <div className="flex items-center gap-1 bg-secondary rounded-lg p-1" role="group" aria-label={t.controls.textSize}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={decreaseMagnification}
                  aria-label={t.controls.decrease}
                  className="h-9 w-9"
                  disabled={magnification === '1x'}
                >
                  <ZoomOut className="w-4 h-4" aria-hidden="true" />
                </Button>
                <span className="px-2 text-sm font-medium min-w-[3rem] text-center" aria-live="polite">
                  {magnification}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={increaseMagnification}
                  aria-label={t.controls.increase}
                  className="h-9 w-9"
                  disabled={magnification === '2x'}
                >
                  <ZoomIn className="w-4 h-4" aria-hidden="true" />
                </Button>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={cycleTheme}
                aria-label={t.controls.theme}
                className="h-10 px-3 flex items-center gap-2"
              >
                <Palette className="w-4 h-4" aria-hidden="true" />
                <span className="text-xs font-semibold uppercase">{getThemeLabel()}</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={cycleLanguage}
                aria-label={t.controls.language}
                className="h-10 px-3 flex items-center gap-2"
              >
                <Languages className="w-4 h-4" aria-hidden="true" />
                <span className="text-xs font-semibold uppercase">{getLanguageLabel()}</span>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-12 w-12"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav
            id="mobile-menu"
            className="lg:hidden bg-background border-t border-border"
            aria-label="Mobile navigation"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`block px-4 py-3 rounded-lg text-accessible-lg font-medium transition-colors ${location.pathname === link.href
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                    }`}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={location.pathname === link.href ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Accessibility Controls */}
              <div className="pt-4 border-t border-border space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t.controls.textSize}</span>
                  <div className="flex items-center gap-2 bg-secondary rounded-lg p-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={decreaseMagnification}
                      aria-label={t.controls.decrease}
                      className="h-10 w-10"
                      disabled={magnification === '1x'}
                    >
                      <ZoomOut className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <span className="px-2 font-medium min-w-[3rem] text-center">{magnification}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={increaseMagnification}
                      aria-label={t.controls.increase}
                      className="h-10 w-10"
                      disabled={magnification === '2x'}
                    >
                      <ZoomIn className="w-5 h-5" aria-hidden="true" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t.controls.theme}</span>
                  <Button
                    variant="outline"
                    onClick={cycleTheme}
                    className="min-w-[120px] flex items-center gap-2"
                  >
                    <Palette className="w-4 h-4" />
                    {getThemeLabel()}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t.controls.language}</span>
                  <Button
                    variant="outline"
                    onClick={cycleLanguage}
                    className="min-w-[120px] flex items-center gap-2"
                  >
                    <Languages className="w-4 h-4" />
                    {getLanguageLabel()}
                  </Button>
                </div>
              </div>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
