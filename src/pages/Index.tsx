import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import EventsSection from "@/components/EventsSection";
import Footer from "@/components/Footer";
import GeometricPattern from "@/components/GeometricPattern";

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <GeometricPattern />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <EventsSection />
        <Footer />
      </main>
    </div>
  );
};

export default Index;