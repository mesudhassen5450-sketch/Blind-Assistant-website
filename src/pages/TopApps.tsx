import { useState } from 'react';
import { Download, ExternalLink, Filter, Eye, Navigation, Smartphone, Type, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CATEGORIES = [
  { id: 'all', label: 'All Apps', icon: Star },
  { id: 'screen-readers', label: 'Screen Readers', icon: Eye },
  { id: 'navigation', label: 'Navigation', icon: Navigation },
  { id: 'mobile', label: 'Mobile', icon: Smartphone },
  { id: 'braille', label: 'Braille', icon: Type },
];

const ALL_APPS = [
  {
    id: 1,
    name: 'VoiceOver',
    category: 'screen-readers',
    description: 'Apple\'s built-in screen reader for iOS and macOS. Provides spoken descriptions of everything on screen with gesture-based navigation.',
    platform: 'iOS/macOS',
    rating: 5,
    link: 'https://www.apple.com/accessibility/vision/',
  },
  {
    id: 2,
    name: 'TalkBack',
    category: 'screen-readers',
    description: 'Android\'s official screen reader with gesture-based navigation, Braille keyboard support, and comprehensive accessibility features.',
    platform: 'Android',
    rating: 5,
    link: 'https://support.google.com/accessibility/android/answer/6283677',
  },
  {
    id: 3,
    name: 'NVDA',
    category: 'screen-readers',
    description: 'Free, open-source screen reader for Windows. Supports 50+ languages and works with all major browsers and applications.',
    platform: 'Windows',
    rating: 5,
    link: 'https://www.nvaccess.org/',
  },
  {
    id: 4,
    name: 'JAWS',
    category: 'screen-readers',
    description: 'Professional screen reader for Windows with advanced features, Braille support, and customizable settings.',
    platform: 'Windows',
    rating: 5,
    link: 'https://www.freedomscientific.com/products/software/jaws/',
  },
  {
    id: 5,
    name: 'Seeing AI',
    category: 'navigation',
    description: 'Microsoft\'s free AI app that narrates the world. Reads text, describes people, identifies products, and more.',
    platform: 'iOS',
    rating: 5,
    link: 'https://www.microsoft.com/en-us/ai/seeing-ai',
  },
  {
    id: 6,
    name: 'Be My Eyes',
    category: 'navigation',
    description: 'Connect with sighted volunteers worldwide or use AI for visual assistance. Free and available 24/7.',
    platform: 'iOS/Android',
    rating: 5,
    link: 'https://www.bemyeyes.com/',
  },
  {
    id: 7,
    name: 'Lazarillo GPS',
    category: 'navigation',
    description: 'GPS app designed for blind users. Announces nearby places, intersections, and provides turn-by-turn navigation.',
    platform: 'iOS/Android',
    rating: 4,
    link: 'https://www.lazarillo.app/',
  },
  {
    id: 8,
    name: 'Envision AI',
    category: 'navigation',
    description: 'AI-powered glasses and app that reads text, describes scenes, and recognizes faces in real-time.',
    platform: 'iOS/Android',
    rating: 5,
    link: 'https://www.letsenvision.com/',
  },
  {
    id: 9,
    name: 'Voice Dream Reader',
    category: 'mobile',
    description: 'Premium text-to-speech app that reads PDFs, web pages, ebooks, and documents with high-quality voices.',
    platform: 'iOS/Android',
    rating: 5,
    link: 'https://www.voicedream.com/',
  },
  {
    id: 10,
    name: 'Supersense',
    category: 'mobile',
    description: 'AI assistant for blind users. Detects objects, reads text, finds people, and describes surroundings.',
    platform: 'iOS',
    rating: 4,
    link: 'https://www.supersense.app/',
  },
  {
    id: 11,
    name: 'BrailleBack',
    category: 'braille',
    description: 'Android accessibility service that connects Braille displays to your device via Bluetooth.',
    platform: 'Android',
    rating: 4,
    link: 'https://support.google.com/accessibility/android/answer/3535226',
  },
  {
    id: 12,
    name: 'BARD Mobile',
    category: 'braille',
    description: 'Access the National Library Service\'s collection of Braille and audio books directly on your device.',
    platform: 'iOS/Android',
    rating: 5,
    link: 'https://www.loc.gov/nls/braille-audio-reading-download/',
  },
];

export default function TopApps() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredApps = activeCategory === 'all' 
    ? ALL_APPS 
    : ALL_APPS.filter(app => app.category === activeCategory);

  return (
    <main id="main-content" className="pt-20">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-b from-primary/5 to-transparent" aria-labelledby="apps-heading">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 id="apps-heading" className="text-accessible-4xl font-bold">
              Top <span className="gradient-text">Accessibility Apps</span>
            </h1>
            <p className="text-accessible-lg text-muted-foreground">
              Carefully selected apps to enhance your digital experience. All apps are tested and recommended by the blind community.
            </p>
          </div>
        </div>
      </section>

      {/* Filter & Apps */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
              <span className="text-muted-foreground font-medium">Filter by category:</span>
            </div>
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="App categories">
              {CATEGORIES.map((cat) => (
                <Button
                  key={cat.id}
                  variant={activeCategory === cat.id ? 'default' : 'outline'}
                  onClick={() => setActiveCategory(cat.id)}
                  role="tab"
                  aria-selected={activeCategory === cat.id}
                  aria-controls="apps-grid"
                  className="gap-2"
                >
                  <cat.icon className="w-4 h-4" aria-hidden="true" />
                  {cat.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Apps Grid */}
          <div 
            id="apps-grid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            role="tabpanel"
            aria-label={`${CATEGORIES.find(c => c.id === activeCategory)?.label} apps`}
          >
            {filteredApps.map((app, index) => (
              <article
                key={app.id}
                className="floating-card p-6 space-y-4 animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">{app.name}</h2>
                    <span className="text-sm text-primary font-medium capitalize">
                      {app.category.replace('-', ' ')}
                    </span>
                  </div>
                  <span className="text-xs bg-secondary px-3 py-1 rounded-full text-muted-foreground">
                    {app.platform}
                  </span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1" aria-label={`Rating: ${app.rating} out of 5 stars`}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < app.rating ? 'text-primary fill-primary' : 'text-muted'}`}
                      aria-hidden="true"
                    />
                  ))}
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-accessible-base">
                  {app.description}
                </p>

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

          {filteredApps.length === 0 && (
            <p className="text-center text-muted-foreground py-12">
              No apps found in this category.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
