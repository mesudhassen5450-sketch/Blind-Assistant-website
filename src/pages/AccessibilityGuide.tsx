import { ZoomIn, Contrast, Keyboard, Volume2, MousePointer, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAccessibility } from '@/contexts/AccessibilityContext';

const FEATURES = [
  {
    id: 'magnification',
    title: 'Text Magnification',
    icon: ZoomIn,
    description: 'Increase the size of all text on the website for better readability.',
    steps: [
      'Look for the zoom controls (+ and -) in the header',
      'Click the + button to increase text size',
      'Click the - button to decrease text size',
      'Your preference is saved automatically',
    ],
    keyboardShortcut: null,
  },
  {
    id: 'contrast',
    title: 'High Contrast Mode',
    icon: Contrast,
    description: 'Enable high contrast colors for maximum visibility.',
    steps: [
      'Find the contrast button in the header (circle icon)',
      'Click to toggle high contrast on or off',
      'High contrast uses black background with yellow text',
      'Your preference is saved automatically',
    ],
    keyboardShortcut: null,
  },
  {
    id: 'keyboard',
    title: 'Keyboard Navigation',
    icon: Keyboard,
    description: 'Navigate the entire website using only your keyboard.',
    steps: [
      'Press Tab to move forward between elements',
      'Press Shift + Tab to move backward',
      'Press Enter to activate links and buttons',
      'Press Escape to close dialogs and menus',
      'Press Space to toggle checkboxes and buttons',
    ],
    keyboardShortcut: 'Tab, Enter, Escape',
  },
  {
    id: 'screen-reader',
    title: 'Screen Reader Support',
    icon: Volume2,
    description: 'This website is fully compatible with popular screen readers.',
    steps: [
      'VoiceOver (iOS/macOS): Activate with Command + F5',
      'TalkBack (Android): Enable in Settings > Accessibility',
      'NVDA (Windows): Free download from nvaccess.org',
      'JAWS (Windows): Commercial screen reader',
      'All content includes proper headings and labels',
    ],
    keyboardShortcut: null,
  },
  {
    id: 'focus',
    title: 'Focus Indicators',
    icon: MousePointer,
    description: 'Clear visual indicators show which element is currently focused.',
    steps: [
      'A golden/yellow ring appears around focused elements',
      'The ring is 3 pixels wide for high visibility',
      'Focus moves logically through the page',
      'Skip links are available at the top of each page',
    ],
    keyboardShortcut: null,
  },
  {
    id: 'ai-assistant',
    title: 'AI Assistant',
    icon: Settings,
    description: 'Get voice and text guidance for navigating this website.',
    steps: [
      'Click the chat button in the bottom-right corner',
      'Type your question or click the microphone for voice input',
      'Enable voice output to hear responses spoken aloud',
      'Ask questions like "How do I find apps?" or "Navigate to contact"',
    ],
    keyboardShortcut: null,
  },
];

export default function AccessibilityGuide() {
  const { highContrast, toggleHighContrast, magnification, setMagnification } = useAccessibility();

  return (
    <main id="main-content" className="pt-20">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-b from-primary/5 to-transparent" aria-labelledby="accessibility-heading">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 id="accessibility-heading" className="text-accessible-4xl font-bold">
              Accessibility <span className="gradient-text">Guide</span>
            </h1>
            <p className="text-accessible-lg text-muted-foreground">
              Learn how to use this website comfortably with the accessibility features we've built for you.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Controls */}
      <section className="py-8 bg-secondary/30" aria-labelledby="quick-controls">
        <div className="container mx-auto px-4">
          <h2 id="quick-controls" className="text-xl font-semibold mb-4 text-center">Quick Controls</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 bg-card rounded-xl p-4 border border-border">
              <span className="text-muted-foreground">Text Size:</span>
              <div className="flex gap-1">
                {(['1x', '1.25x', '1.5x', '1.75x', '2x'] as const).map((level) => (
                  <Button
                    key={level}
                    variant={magnification === level ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setMagnification(level)}
                    aria-pressed={magnification === level}
                  >
                    {level}
                  </Button>
                ))}
              </div>
            </div>
            <Button
              variant={highContrast ? 'default' : 'outline'}
              onClick={toggleHighContrast}
              aria-pressed={highContrast}
              className="gap-2"
            >
              <Contrast className="w-5 h-5" aria-hidden="true" />
              High Contrast: {highContrast ? 'On' : 'Off'}
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12" aria-labelledby="features-heading">
        <div className="container mx-auto px-4">
          <h2 id="features-heading" className="sr-only">Accessibility Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {FEATURES.map((feature, index) => (
              <article
                key={feature.id}
                className="floating-card p-8 space-y-4 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <feature.icon className="w-7 h-7 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground mt-1">{feature.description}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">How to use:</h4>
                  <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                    {feature.steps.map((step, i) => (
                      <li key={i} className="text-accessible-base">{step}</li>
                    ))}
                  </ol>
                </div>

                {feature.keyboardShortcut && (
                  <div className="pt-2">
                    <span className="text-sm text-muted-foreground">Keyboard: </span>
                    <kbd className="px-2 py-1 bg-secondary rounded text-sm font-mono">
                      {feature.keyboardShortcut}
                    </kbd>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-12 bg-secondary/30" aria-labelledby="tips-heading">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 id="tips-heading" className="text-accessible-2xl font-bold text-center mb-8">
              Assistive Technology Tips
            </h2>
            <div className="floating-card p-8 space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">For VoiceOver Users (iOS/macOS)</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Use rotor to navigate by headings</li>
                  <li>Swipe left/right to move between elements</li>
                  <li>Double-tap to activate buttons and links</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">For TalkBack Users (Android)</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Use Reading Controls to navigate by headings</li>
                  <li>Swipe right to move forward, left to go back</li>
                  <li>Double-tap anywhere to activate focused item</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">For NVDA/JAWS Users (Windows)</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Press H to jump between headings</li>
                  <li>Press K to jump between links</li>
                  <li>Press B to jump between buttons</li>
                  <li>Press D to jump between landmarks</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
