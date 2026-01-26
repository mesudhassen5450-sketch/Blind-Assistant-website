import { useRef } from 'react';
import { ChevronLeft, ChevronRight, Download, ExternalLink, Smartphone, Eye, Navigation, Type } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FEATURED_APPS = [
  {
    id: 1,
    name: 'VoiceOver',
    category: 'Screen Reader',
    icon: Eye,
    description: 'Apple\'s built-in screen reader for iOS and macOS. Provides spoken descriptions of everything on screen.',
    platform: 'iOS/macOS',
    link: 'https://www.apple.com/accessibility/vision/',
  },
  {
    id: 2,
    name: 'TalkBack',
    category: 'Screen Reader',
    icon: Smartphone,
    description: 'Android\'s official screen reader with gesture-based navigation and Braille keyboard support.',
    platform: 'Android',
    link: 'https://support.google.com/accessibility/android/answer/6283677',
  },
  {
    id: 3,
    name: 'Seeing AI',
    category: 'Navigation',
    icon: Navigation,
    description: 'Microsoft\'s AI-powered app that describes people, text, and objects around you.',
    platform: 'iOS',
    link: 'https://www.microsoft.com/en-us/ai/seeing-ai',
  },
  {
    id: 4,
    name: 'Be My Eyes',
    category: 'Assistance',
    icon: Eye,
    description: 'Connect with sighted volunteers or AI for real-time visual assistance.',
    platform: 'iOS/Android',
    link: 'https://www.bemyeyes.com/',
  },
  {
    id: 5,
    name: 'NVDA',
    category: 'Screen Reader',
    icon: Type,
    description: 'Free, open-source screen reader for Windows with support for 50+ languages.',
    platform: 'Windows',
    link: 'https://www.nvaccess.org/',
  },
  {
    id: 6,
    name: 'Envision AI',
    category: 'Vision AI',
    icon: Eye,
    description: 'AI glasses and app that read text, recognize faces, and describe scenes.',
    platform: 'iOS/Android',
    link: 'https://www.letsenvision.com/',
  },
];

export function FeaturedApps() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-20 bg-secondary/30" aria-labelledby="featured-apps-heading">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 id="featured-apps-heading" className="text-accessible-3xl font-bold">
              Featured Apps
            </h2>
            <p className="text-muted-foreground mt-2">
              Top-rated accessibility apps chosen for you
            </p>
          </div>
          <div className="hidden md:flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className="h-12 w-12"
            >
              <ChevronLeft className="w-6 h-6" aria-hidden="true" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className="h-12 w-12"
            >
              <ChevronRight className="w-6 h-6" aria-hidden="true" />
            </Button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="carousel-container"
          role="region"
          aria-label="Featured apps carousel"
          tabIndex={0}
        >
          {FEATURED_APPS.map((app, index) => (
            <article
              key={app.id}
              className="carousel-item floating-card w-[300px] md:w-[320px] p-6 space-y-4 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* App icon */}
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <app.icon className="w-8 h-8 text-primary" aria-hidden="true" />
              </div>

              {/* App info */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-foreground">{app.name}</h3>
                  <span className="text-xs bg-secondary px-2 py-1 rounded-full text-muted-foreground">
                    {app.platform}
                  </span>
                </div>
                <span className="text-sm text-primary font-medium">{app.category}</span>
                <p className="text-muted-foreground text-accessible-base line-clamp-3">
                  {app.description}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button asChild className="flex-1">
                  <a href={app.link} target="_blank" rel="noopener noreferrer">
                    <Download className="w-4 h-4 mr-2" aria-hidden="true" />
                    Get App
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a href={app.link} target="_blank" rel="noopener noreferrer" aria-label={`Learn more about ${app.name}`}>
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  </a>
                </Button>
              </div>
            </article>
          ))}
        </div>

        {/* View all link */}
        <div className="text-center mt-8">
          <Button asChild variant="outline" size="lg">
            <a href="/top-apps">
              View All Apps
              <ChevronRight className="w-5 h-5 ml-2" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
