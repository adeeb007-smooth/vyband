import NeuralBackground from '@/components/ui/NeuralBackground';
import HeroSpotlight from '@/components/ui/HeroSpotlight';
import ProjectAccordion from '@/components/ui/ProjectAccordion'; // Using the Accordion you chose
import TeamSection from '@/components/ui/TeamSection';
import AboutSection from '@/components/ui/AboutSection';
import ReviewSection from '@/components/ui/ReviewSection';
// IMPORT NEW SECTION
import ContactSection from '@/components/ui/ContactSection';

export default function Home() {
  return (
    <main className="relative w-full min-h-screen overflow-x-hidden">
      
      {/* 1. BACKGROUND */}
      <NeuralBackground />

      {/* 2. HERO SECTION */}
      <section className="relative w-full h-screen flex items-center justify-center z-10">
        <div className="flex flex-col items-center w-full">
          <HeroSpotlight />
          <div className="flex flex-col items-center -mt-4">
            <div className="h-[2px] w-32 bg-cyan shadow-[0_0_20px_#00F0FF]" />
            <p className="mt-4 text-xs md:text-sm tracking-[0.5em] text-cyan-200 uppercase font-mono text-shadow-glow">
              System Online
            </p>
          </div>
        </div>
      </section>

      {/* 3. CONTENT STACK */}
      <div className="relative z-20">
        
        <AboutSection />
        
        <ProjectAccordion />

        <TeamSection />
        
        <ReviewSection />
        
        {/* 4. CONTACT FOOTER */}
        <ContactSection />
        
      </div>

    </main>
  );
}