import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { translations } from '@/lib/translations';

export function HeroSection() {
  const { language } = useAccessibility();
  const t = translations[language];

  return (
    <section
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10" aria-hidden="true" />

      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float-slow" aria-hidden="true" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" aria-hidden="true" />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" aria-hidden="true" />
            <span className="text-primary text-sm font-medium">Accessibility First • AI Powered</span>
          </div>

          {/* Main heading */}
          <h1
            id="hero-heading"
            className="text-accessible-4xl md:text-accessible-5xl font-bold tracking-tight animate-fade-in"
            style={{ animationDelay: '0.1s' }}
          >
            {t.hero.title.split('Everyone')[0]}
            <span className="gradient-text">Everyone</span>
          </h1>

          {/* Description */}
          <p
            className="text-accessible-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            {t.hero.subtitle}
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in"
            style={{ animationDelay: '0.3s' }}
          >
            <Button asChild size="lg" className="text-lg px-8 py-6 glow-hover">
              <Link to="/top-apps">
                {t.hero.cta}
                <ArrowRight className="ml-2 w-5 h-5 rtl:rotate-180" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
              <Link to="/about">
                {t.nav.about}
              </Link>
            </Button>
          </div>

          {/* Features preview */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 animate-fade-in"
            style={{ animationDelay: '0.4s' }}
          >
            {[
              { label: 'Top Apps', value: '50+' },
              { label: 'YouTube Channels', value: '30+' },
              { label: 'Languages', value: '3' },
              { label: 'AI Powered', value: '24/7' },
            ].map((stat) => (
              <div key={stat.label} className="floating-card p-4 text-center">
                <p className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
