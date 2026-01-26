import { ExternalLink, Youtube, Send, Globe, GraduationCap, Accessibility, Music, Film, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const YOUTUBE_CATEGORIES = [
  {
    id: 'educational',
    title: 'Educational Channels',
    description: 'Learning, digital skills, and independence',
    icon: GraduationCap,
    color: 'from-blue-500/20 to-cyan-500/20',
    channels: [
      { name: 'The Blind Life', description: 'Screen reader tutorials and tech tips', link: 'https://youtube.com/@theblindlife' },
      { name: 'Blind Abilities', description: 'Phone and computer accessibility guides', link: 'https://youtube.com/@blindabilities' },
      { name: 'AppleVis', description: 'Apple accessibility learning resources', link: 'https://youtube.com/@applevis' },
    ],
  },
  {
    id: 'tech',
    title: 'Technology & Accessibility',
    description: 'App reviews and assistive technology updates',
    icon: Accessibility,
    color: 'from-green-500/20 to-emerald-500/20',
    channels: [
      { name: 'Steven Scott', description: 'Comprehensive accessibility app reviews', link: 'https://youtube.com/@stevenscott' },
      { name: 'Perkins School', description: 'Assistive technology education', link: 'https://youtube.com/@perkins' },
      { name: 'AFB Tech', description: 'American Foundation for the Blind tech updates', link: 'https://youtube.com/@afbtech' },
    ],
  },
  {
    id: 'entertainment',
    title: 'Entertainment',
    description: 'Podcasts, music, and audio-based content',
    icon: Music,
    color: 'from-purple-500/20 to-pink-500/20',
    channels: [
      { name: 'Blind Spot Podcast', description: 'Stories and discussions from blind community', link: 'https://youtube.com/@blindspotpodcast' },
      { name: 'Eyes Free Gaming', description: 'Accessible gaming content', link: 'https://youtube.com/@eyesfreegaming' },
    ],
  },
  {
    id: 'documentary',
    title: 'Documentaries & Awareness',
    description: 'Social awareness and disability documentaries',
    icon: Film,
    color: 'from-amber-500/20 to-orange-500/20',
    channels: [
      { name: 'Tommy Edison', description: 'Entertaining blind experience videos', link: 'https://youtube.com/@TommyEdisonXP' },
      { name: 'Molly Burke', description: 'Disability awareness and lifestyle', link: 'https://youtube.com/@mollyburke' },
    ],
  },
  {
    id: 'community',
    title: 'Blind Community & Life',
    description: 'Personal stories, challenges, and success journeys',
    icon: Users,
    color: 'from-rose-500/20 to-red-500/20',
    channels: [
      { name: 'James Rath', description: 'Daily life as a legally blind person', link: 'https://youtube.com/@jamesrath' },
      { name: 'Lucy Edwards', description: 'Blind fashion and lifestyle vlogging', link: 'https://youtube.com/@lucyedwards' },
      { name: 'Sam Seavey', description: 'The Blind Life - tips and experiences', link: 'https://youtube.com/@theblindlife' },
    ],
  },
];

const TELEGRAM_CHANNELS = [
  {
    name: 'Teknology for Kizishan',
    description: 'Technology news and resources for the blind community in Amharic and English.',
    link: 'https://t.me/teknology4kizishan',
  },
];

const USEFUL_WEBSITES = [
  {
    name: 'American Foundation for the Blind',
    description: 'Comprehensive resources, research, and advocacy for blind Americans.',
    link: 'https://www.afb.org/',
  },
  {
    name: 'Be My Eyes',
    description: 'Free app connecting blind users with sighted volunteers and AI assistance.',
    link: 'https://www.bemyeyes.com/',
  },
  {
    name: 'National Federation of the Blind',
    description: 'Largest organization of blind people in the US with resources and advocacy.',
    link: 'https://nfb.org/',
  },
  {
    name: 'RNIB',
    description: 'Royal National Institute of Blind People - UK\'s leading sight loss charity.',
    link: 'https://www.rnib.org.uk/',
  },
  {
    name: 'Hadley',
    description: 'Free distance education for people who are blind or visually impaired.',
    link: 'https://hadley.edu/',
  },
  {
    name: 'Bookshare',
    description: 'World\'s largest accessible ebook library for people with reading barriers.',
    link: 'https://www.bookshare.org/',
  },
];

export default function UsefulLinks() {
  return (
    <main id="main-content" className="pt-20">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-b from-primary/5 to-transparent" aria-labelledby="links-heading">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 id="links-heading" className="text-accessible-4xl font-bold">
              Useful <span className="gradient-text">Resources</span>
            </h1>
            <p className="text-accessible-lg text-muted-foreground">
              Curated YouTube channels, Telegram groups, and websites organized by purpose for easy discovery.
            </p>
          </div>
        </div>
      </section>

      {/* YouTube Section */}
      <section className="py-12" aria-labelledby="youtube-heading">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
              <Youtube className="w-6 h-6 text-red-500" aria-hidden="true" />
            </div>
            <div>
              <h2 id="youtube-heading" className="text-accessible-2xl font-bold">YouTube Channels</h2>
              <p className="text-muted-foreground">Classified by purpose for blind users</p>
            </div>
          </div>

          <div className="space-y-8">
            {YOUTUBE_CATEGORIES.map((category, catIndex) => (
              <div key={category.id} className="animate-fade-in" style={{ animationDelay: `${catIndex * 0.1}s` }}>
                <div className={`floating-card p-6 bg-gradient-to-br ${category.color}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <category.icon className="w-6 h-6 text-foreground" aria-hidden="true" />
                    <div>
                      <h3 className="text-xl font-semibold">{category.title}</h3>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.channels.map((channel) => (
                      <a
                        key={channel.name}
                        href={channel.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-4 bg-background/50 rounded-xl hover:bg-background/80 transition-colors group"
                      >
                        <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {channel.name}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">{channel.description}</p>
                        <div className="flex items-center gap-1 text-primary text-sm mt-2">
                          Watch <ExternalLink className="w-3 h-3" aria-hidden="true" />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Telegram Section */}
      <section className="py-12 bg-secondary/30" aria-labelledby="telegram-heading">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <Send className="w-6 h-6 text-blue-500" aria-hidden="true" />
            </div>
            <div>
              <h2 id="telegram-heading" className="text-accessible-2xl font-bold">Telegram Channels</h2>
              <p className="text-muted-foreground">Community channels for updates and discussions</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TELEGRAM_CHANNELS.map((channel, index) => (
              <article
                key={channel.name}
                className="floating-card p-6 space-y-4 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="text-xl font-semibold">{channel.name}</h3>
                <p className="text-muted-foreground text-accessible-base">{channel.description}</p>
                <Button asChild className="w-full">
                  <a href={channel.link} target="_blank" rel="noopener noreferrer">
                    <Send className="w-4 h-4 mr-2" aria-hidden="true" />
                    Join Channel
                  </a>
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Websites Section */}
      <section className="py-12" aria-labelledby="websites-heading">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Globe className="w-6 h-6 text-primary" aria-hidden="true" />
            </div>
            <div>
              <h2 id="websites-heading" className="text-accessible-2xl font-bold">Useful Websites</h2>
              <p className="text-muted-foreground">Trusted resources and organizations</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {USEFUL_WEBSITES.map((site, index) => (
              <article
                key={site.name}
                className="floating-card p-6 space-y-4 animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <h3 className="text-xl font-semibold">{site.name}</h3>
                <p className="text-muted-foreground text-accessible-base">{site.description}</p>
                <Button asChild variant="outline" className="w-full">
                  <a href={site.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" aria-hidden="true" />
                    Visit Website
                  </a>
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
