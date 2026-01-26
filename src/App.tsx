import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AIAssistant } from "@/components/ai/AIAssistant";
import Index from "./pages/Index";
import About from "./pages/About";
import TopApps from "./pages/TopApps";
import UsefulLinks from "./pages/UsefulLinks";
import AccessibilityGuide from "./pages/AccessibilityGuide";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AccessibilityProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Header />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/top-apps" element={<TopApps />} />
              <Route path="/useful-links" element={<UsefulLinks />} />
              <Route path="/accessibility" element={<AccessibilityGuide />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
            <AIAssistant />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AccessibilityProvider>
  </QueryClientProvider>
);

export default App;
