import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GeometricPattern from "@/components/GeometricPattern";
import HUDFrame from "@/components/HUDFrame";
import TeamSlider from "@/components/TeamSlider";

const teamMembers = [
  { id: "001", name: "Alex Chen", role: "Lead Developer" },
  { id: "002", name: "Maya Patel", role: "UI/UX Designer" },
  { id: "003", name: "Jordan Lee", role: "Backend Engineer" },
  { id: "004", name: "Sam Wilson", role: "Project Manager" },
  { id: "005", name: "Riley Kim", role: "DevOps Specialist" },
  { id: "006", name: "Casey Morgan", role: "Frontend Developer" },
  { id: "007", name: "Taylor Brooks", role: "Data Analyst" },
  { id: "008", name: "Jamie Reed", role: "Security Expert" },
  { id: "009", name: "Drew Parker", role: "QA Engineer" },
  { id: "010", name: "Morgan Ellis", role: "Technical Writer" },
].map((m) => ({ ...m, image: "" }));

const TeamSliderPage = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <GeometricPattern />
      <div className="hex-grid fixed inset-0 pointer-events-none opacity-30" />

      <Navbar />

      <main className="relative z-10 pt-24 pb-16 flex flex-col items-center min-h-[calc(100vh-200px)]">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <HUDFrame className="inline-block px-8 py-6 mb-4">
              <div className="text-xs font-display text-primary tracking-[0.3em] mb-2">
                PRAKARSH '26 // PERSONNEL DATABASE
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-gradient-primary">
                THE TEAM
              </h1>
            </HUDFrame>

            <p className="text-muted-foreground max-w-md mx-auto font-body text-sm">
              Navigate through our team. Use arrows or click to explore.
            </p>

            <div className="flex items-center justify-center gap-4 mt-4">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-primary" />
              <div className="pulse-dot" />
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-accent" />
            </div>
          </motion.div>

          {/* Slider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <TeamSlider members={teamMembers} />
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TeamSliderPage;
