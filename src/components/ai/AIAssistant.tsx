import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, X, Send, Mic, MicOff, Volume2, VolumeX, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { translations } from '@/lib/translations';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const INITIAL_MESSAGES: Record<string, string> = {
  en: "Hello! I'm your AI guide for BlindTechHub. I can help you navigate this website, find apps, or answer questions. How can I assist you today?",
  am: "ጤና ይስጥልኝ! የBlindTechHub ረዳት ነኝ። ድህረ ገጹን እንዲጎበኙ፣ መተግበሪያዎችን እንዲያገኙ ወይም ጥያቄዎችን እንዲመልሱ እረዳዎታለሁ። ዛሬ እንዴት ልረዳዎ እችላለሁ?",
  om: "Akkam! Gargaaraa AI BlindTechHub dha. Weebsaayitii kana sakatta'uu, appiiwwan arguuf ykn gaaffii deebisuuf isin gargaaruu nan danda'a. Har'a akkamittin isin gargaaru danda'a?"
};

// Backend API URL
const API_URL = '/api/chat';

// Language codes for Speech API
const SPEECH_LANGS: Record<string, string> = {
  en: 'en-US',
  am: 'am-ET',
  om: 'om-ET'
};

export function AIAssistant() {
  const navigate = useNavigate();
  const { language } = useAccessibility();
  const t = translations[language];
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: INITIAL_MESSAGES[language] }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: currentInput,
          page: window.location.pathname,
          language,
          pageContent: document.body.innerText.substring(0, 5000) // Send up to 5000 chars of page content
        }),
      });

      const data = await response.json();
      let aiResponse = data.response;

      // Handle navigation command
      if (aiResponse.includes('NAVIGATE:')) {
        const path = aiResponse.split('NAVIGATE:')[1].trim();
        aiResponse = aiResponse.split('NAVIGATE:')[0].trim();
        setTimeout(() => navigate(path), 1500);
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Auto-speak if the user initiated with voice or if we want to default to speaking
      // The user requested "Browser speaks", implying auto-speech.
      if ('speechSynthesis' in window) {
        // Cancel any current speech
        speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(aiResponse);
        utterance.lang = SPEECH_LANGS[language];

        // Handle speech end to update state
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        setIsSpeaking(true);
        speechSynthesis.speak(utterance);
      }
    } catch (error) {
      console.error('Chat Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice input is not supported in your browser.');
      return;
    }

    setIsListening(!isListening);

    if (!isListening) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = SPEECH_LANGS[language];

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognition.start();
    }
  };

  const toggleSpeech = () => {
    setIsSpeaking(!isSpeaking);
    if (isSpeaking) {
      speechSynthesis.cancel();
    }
  };

  return (
    <>
      {/* Floating AI Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full shadow-2xl animate-pulse-glow glow-primary"
        size="icon"
        aria-label="Open AI Assistant"
        aria-haspopup="dialog"
      >
        <MessageCircle className="w-7 h-7" aria-hidden="true" />
      </Button>

      {/* AI Chat Panel */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="ai-assistant-title"
          className="fixed bottom-6 right-6 z-50 w-[95vw] max-w-md h-[70vh] max-h-[600px] bg-card rounded-2xl shadow-2xl border border-border flex flex-col overflow-hidden animate-scale-in"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-secondary/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center animate-float">
                <MessageCircle className="w-5 h-5 text-primary-foreground" aria-hidden="true" />
              </div>
              <div>
                <h2 id="ai-assistant-title" className="font-semibold text-foreground">AI Assistant</h2>
                <p className="text-sm text-muted-foreground">Here to help you navigate</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSpeech}
                aria-label={isSpeaking ? 'Disable voice output' : 'Enable voice output'}
                aria-pressed={isSpeaking}
              >
                {isSpeaking ? (
                  <Volume2 className="w-5 h-5 text-primary" aria-hidden="true" />
                ) : (
                  <VolumeX className="w-5 h-5" aria-hidden="true" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                aria-label="Close AI Assistant"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4" role="log" aria-live="polite" aria-label="Chat messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-4 rounded-2xl ${message.role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-md'
                    : 'bg-secondary text-secondary-foreground rounded-bl-md'
                    }`}
                >
                  <p className="text-accessible-base">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-secondary text-secondary-foreground p-4 rounded-2xl rounded-bl-md">
                  <Loader2 className="w-5 h-5 animate-spin" aria-label="Loading response" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border bg-secondary/30">
            <div className="flex items-center gap-2">
              <Button
                variant={isListening ? 'default' : 'outline'}
                size="icon"
                onClick={toggleVoiceInput}
                aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
                aria-pressed={isListening}
                className="shrink-0"
              >
                {isListening ? (
                  <MicOff className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <Mic className="w-5 h-5" aria-hidden="true" />
                )}
              </Button>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message or use voice..."
                className="flex-1 bg-background border border-input rounded-lg px-4 py-3 text-accessible-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                aria-label="Message input"
              />
              <Button
                onClick={handleSend}
                disabled={!inputValue.trim() || isLoading}
                aria-label="Send message"
                className="shrink-0"
              >
                <Send className="w-5 h-5" aria-hidden="true" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Try asking: "What apps do you recommend?" or "How do I navigate?"
            </p>
          </div>
        </div>
      )}
    </>
  );
}
