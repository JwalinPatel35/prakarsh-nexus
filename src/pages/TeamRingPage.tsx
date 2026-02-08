import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TeamRing from "@/components/TeamRing";
import PrakarshBackground from "@/components/PrakarshBackground";

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

const TeamRingPage = () => {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "#0C0618" }}>
      {/* Full animated background */}
      <PrakarshBackground />

      <Navbar />

      <main className="relative z-10 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div
              className="text-xs font-semibold tracking-[0.4em] mb-3"
              style={{ color: "#D4A574" }}
            >
              PRAKARSH '26 — PERSONNEL DATABASE
            </div>
            <h1
              className="text-4xl md:text-6xl font-extrabold tracking-[0.05em] uppercase"
              style={{
                background: "linear-gradient(135deg, #FFFFFF 0%, #F1B5A2 50%, #E84FAA 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              THE TEAM
            </h1>

            <p
              className="max-w-md mx-auto text-sm mt-3"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Drag to rotate the ring. Meet the visionaries behind Prakarsh&apos;26.
            </p>

            <div className="flex items-center justify-center gap-4 mt-4">
              <div
                className="h-px w-20"
                style={{ background: "linear-gradient(90deg, transparent, #E84FAA60)" }}
              />
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  background: "linear-gradient(135deg, #E84FAA, #6CB4EE)",
                  boxShadow: "0 0 8px #E84FAA80",
                }}
              />
              <div
                className="h-px w-20"
                style={{ background: "linear-gradient(90deg, #6CB4EE60, transparent)" }}
              />
            </div>
          </motion.div>

          {/* Ring */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <TeamRing members={teamMembers} />
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TeamRingPage;
