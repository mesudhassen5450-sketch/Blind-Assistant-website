import { Target, Eye, Users, Globe, Heart, Lightbulb } from 'lucide-react';

const MISSION_POINTS = [
  {
    icon: Users,
    title: 'Support Blind Users',
    description: 'Provide comprehensive technology resources tailored for blind and partially sighted individuals.',
  },
  {
    icon: Lightbulb,
    title: 'Share Knowledge',
    description: 'Curate and deliver accessible technology knowledge in easy-to-understand formats.',
  },
  {
    icon: Heart,
    title: 'Promote Independence',
    description: 'Empower users to navigate technology independently with confidence.',
  },
];

const VISION_POINTS = [
  {
    icon: Globe,
    title: 'Universal Access',
    description: 'A future where blind users can access any technology independently.',
  },
  {
    icon: Eye,
    title: 'AI-Guided Experience',
    description: 'Intelligent assistance that adapts to individual needs and preferences.',
  },
  {
    icon: Target,
    title: 'Inclusive Digital Spaces',
    description: 'Multilingual, accessible platforms that welcome everyone.',
  },
];

export default function About() {
  return (
    <main id="main-content" className="pt-20">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden" aria-labelledby="about-heading">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" aria-hidden="true" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 id="about-heading" className="text-accessible-4xl font-bold">
              About <span className="gradient-text">BlindTechHub</span>
            </h1>
            <p className="text-accessible-xl text-muted-foreground">
              We believe technology should be accessible to everyone. Our mission is to empower 
              blind and partially sighted users with the knowledge and tools they need to thrive 
              in the digital world.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-secondary/30" aria-labelledby="mission-heading">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 id="mission-heading" className="text-accessible-3xl font-bold flex items-center justify-center gap-3">
              <Target className="w-8 h-8 text-primary" aria-hidden="true" />
              Our Mission
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {MISSION_POINTS.map((point, index) => (
              <article
                key={point.title}
                className="floating-card p-8 text-center space-y-4 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                  <point.icon className="w-8 h-8 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold">{point.title}</h3>
                <p className="text-muted-foreground text-accessible-base">{point.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16" aria-labelledby="vision-heading">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 id="vision-heading" className="text-accessible-3xl font-bold flex items-center justify-center gap-3">
              <Eye className="w-8 h-8 text-primary" aria-hidden="true" />
              Our Vision
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {VISION_POINTS.map((point, index) => (
              <article
                key={point.title}
                className="floating-card p-8 text-center space-y-4 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                  <point.icon className="w-8 h-8 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold">{point.title}</h3>
                <p className="text-muted-foreground text-accessible-base">{point.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section className="py-16 bg-secondary/30" aria-labelledby="languages-heading">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 id="languages-heading" className="text-accessible-3xl font-bold">
              Multilingual Support
            </h2>
            <p className="text-muted-foreground text-accessible-lg">
              We are committed to reaching as many users as possible. Our content and AI assistant 
              support multiple languages to serve diverse communities.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {['English', 'Amharic (አማርኛ)', 'Afaan Oromo'].map((lang) => (
                <span
                  key={lang}
                  className="px-6 py-3 bg-card border border-border rounded-xl text-lg font-medium"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
