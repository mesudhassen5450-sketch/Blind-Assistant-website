import { useState } from 'react';
import { Send, Mail, MessageSquare, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: 'Message Sent!',
      description: 'Thank you for your feedback. We will respond soon.',
    });

    // Reset form after showing success
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitted(false);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <main id="main-content" className="pt-20">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-b from-primary/5 to-transparent" aria-labelledby="contact-heading">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 id="contact-heading" className="text-accessible-4xl font-bold">
              Contact <span className="gradient-text">Us</span>
            </h1>
            <p className="text-accessible-lg text-muted-foreground">
              We value your feedback and questions. Let us know how we can help or improve.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-12" aria-labelledby="form-heading">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="floating-card p-8">
              {isSubmitted ? (
                <div className="text-center py-8 space-y-4 animate-scale-in">
                  <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-10 h-10 text-green-500" aria-hidden="true" />
                  </div>
                  <h2 className="text-2xl font-semibold">Thank You!</h2>
                  <p className="text-muted-foreground">
                    Your message has been sent successfully. We'll get back to you soon.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <h2 id="form-heading" className="text-xl font-semibold">Send us a message</h2>
                      <p className="text-sm text-muted-foreground">All fields are required</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-foreground font-medium">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-background border border-input rounded-lg px-4 py-3 text-accessible-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="Enter your name"
                        aria-describedby="name-hint"
                      />
                      <p id="name-hint" className="text-sm text-muted-foreground">
                        How should we address you?
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-foreground font-medium">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full bg-background border border-input rounded-lg pl-11 pr-4 py-3 text-accessible-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                          placeholder="your@email.com"
                          aria-describedby="email-hint"
                        />
                      </div>
                      <p id="email-hint" className="text-sm text-muted-foreground">
                        We'll use this to respond to you.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="block text-foreground font-medium">
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full bg-background border border-input rounded-lg px-4 py-3 text-accessible-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-y"
                        placeholder="Tell us what's on your mind..."
                        aria-describedby="message-hint"
                      />
                      <p id="message-hint" className="text-sm text-muted-foreground">
                        Share your feedback, questions, or suggestions.
                      </p>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full text-lg py-6"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>Sending...</>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" aria-hidden="true" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </>
              )}
            </div>

            {/* Additional Info */}
            <div className="mt-8 text-center space-y-4">
              <p className="text-muted-foreground">
                Need immediate assistance? Try our AI Assistant by clicking the chat button in the corner.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
