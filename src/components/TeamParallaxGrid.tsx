import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import TeamMemberCard from "@/components/TeamMemberCard";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
}

interface TeamParallaxGridProps {
  members: TeamMember[];
  className?: string;
}

export const TeamParallaxGrid = ({ members, className }: TeamParallaxGridProps) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: gridRef,
    offset: ["start start", "end start"],
  });

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const third = Math.ceil(members.length / 3);
  const firstPart = members.slice(0, third);
  const secondPart = members.slice(third, 2 * third);
  const thirdPart = members.slice(2 * third);

  return (
    <div
      ref={gridRef}
      className={cn(
        "h-[calc(100vh-200px)] overflow-y-auto scrollbar-hide",
        className
      )}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-8 px-4 max-w-7xl mx-auto">
        {/* First column */}
        <motion.div style={{ y: translateFirst }} className="flex flex-col gap-8">
          {firstPart.map((member, idx) => (
            <TeamMemberCard key={member.id} member={member} index={idx} />
          ))}
        </motion.div>

        {/* Second column - offset for stagger */}
        <motion.div style={{ y: translateSecond }} className="flex flex-col gap-8 mt-16">
          {secondPart.map((member, idx) => (
            <TeamMemberCard key={member.id} member={member} index={third + idx} />
          ))}
        </motion.div>

        {/* Third column */}
        <motion.div style={{ y: translateThird }} className="flex flex-col gap-8">
          {thirdPart.map((member, idx) => (
            <TeamMemberCard key={member.id} member={member} index={2 * third + idx} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};
