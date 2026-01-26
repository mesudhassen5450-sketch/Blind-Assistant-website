import { Link } from 'react-router-dom';
import { Eye, Navigation, Smartphone, Type, ArrowRight } from 'lucide-react';

const CATEGORIES = [
  {
    id: 'screen-readers',
    title: 'Screen Readers',
    description: 'Software that reads screen content aloud, enabling navigation through audio feedback.',
    icon: Eye,
    color: 'from-amber-500/20 to-orange-500/20',
    link: '/top-apps?category=screen-readers',
  },
  {
    id: 'navigation',
    title: 'Navigation Tools',
    description: 'Apps that help you navigate physical spaces and describe your surroundings.',
    icon: Navigation,
    color: 'from-blue-500/20 to-cyan-500/20',
    link: '/top-apps?category=navigation',
  },
  {
    id: 'mobile',
    title: 'Mobile Accessibility',
    description: 'Built-in features and apps that make smartphones fully accessible.',
    icon: Smartphone,
    color: 'from-green-500/20 to-emerald-500/20',
    link: '/top-apps?category=mobile',
  },
  {
    id: 'braille',
    title: 'Braille Tools',
    description: 'Apps and devices that support Braille input, output, and learning.',
    icon: Type,
    color: 'from-purple-500/20 to-pink-500/20',
    link: '/top-apps?category=braille',
  },
];

export function CategoryCards() {
  return (
    <section className="py-20" aria-labelledby="categories-heading">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 id="categories-heading" className="text-accessible-3xl font-bold">
            Technology Categories
          </h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Explore accessibility tools organized by purpose
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((category, index) => (
            <Link
              key={category.id}
              to={category.link}
              className="group floating-card p-6 space-y-4 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon with gradient background */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <category.icon className="w-7 h-7 text-foreground" aria-hidden="true" />
              </div>

              {/* Content */}
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {category.title}
                </h3>
                <p className="text-muted-foreground text-accessible-base">
                  {category.description}
                </p>
              </div>

              {/* Arrow */}
              <div className="flex items-center text-primary font-medium group-hover:gap-2 transition-all">
                Explore
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
