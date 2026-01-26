import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedApps } from '@/components/home/FeaturedApps';
import { CategoryCards } from '@/components/home/CategoryCards';

const Index = () => {
  return (
    <main id="main-content" className="pt-20">
      <HeroSection />
      <FeaturedApps />
      <CategoryCards />
    </main>
  );
};

export default Index;
