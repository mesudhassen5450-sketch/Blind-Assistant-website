import { Link } from 'react-router-dom';
import { Eye, Heart } from 'lucide-react';

const footerLinks = [
  {
    title: 'Navigation',
    links: [
      { href: '/', label: 'Home' },
      { href: '/about', label: 'About' },
      { href: '/top-apps', label: 'Top Apps' },
      { href: '/useful-links', label: 'Useful Links' },
    ],
  },
  {
    title: 'Support',
    links: [
      { href: '/accessibility', label: 'Accessibility Guide' },
      { href: '/contact', label: 'Contact Us' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto" role="contentinfo">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3" aria-label="Blind Tech Hub - Home">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Eye className="w-6 h-6 text-primary-foreground" aria-hidden="true" />
              </div>
              <span className="text-xl font-bold text-foreground">
                Blind<span className="text-primary">Tech</span>Hub
              </span>
            </Link>
            <p className="text-muted-foreground text-accessible-base max-w-xs">
              Empowering blind and partially sighted users with accessible technology resources and guidance.
            </p>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <nav key={section.title} aria-labelledby={`footer-${section.title.toLowerCase()}`}>
              <h2 id={`footer-${section.title.toLowerCase()}`} className="font-semibold text-foreground mb-4">
                {section.title}
              </h2>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-accessible-base"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Accessibility Statement */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm text-center md:text-left">
              This website is designed with accessibility as a priority. All content is keyboard navigable and screen reader compatible.
            </p>
            <p className="text-muted-foreground text-sm flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-primary" aria-label="love" /> for accessibility
            </p>
          </div>
          <p className="text-center text-muted-foreground text-sm mt-4">
            © {new Date().getFullYear()} BlindTechHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
