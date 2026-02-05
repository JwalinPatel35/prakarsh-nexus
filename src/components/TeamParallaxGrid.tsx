 "use client";
 import { useScroll, useTransform, motion } from "framer-motion";
 import { useRef } from "react";
 import { cn } from "@/lib/utils";
 import { DraggableCardBody, DraggableCardContainer } from "@/components/ui/draggable-card";
 
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
 
 const TeamCard = ({ member }: { member: TeamMember }) => {
   return (
     <DraggableCardContainer className="mb-6">
       <DraggableCardBody className="group">
         {/* Corner decorations */}
         <div className="corner-decoration corner-tl" />
         <div className="corner-decoration corner-tr" />
         <div className="corner-decoration corner-bl" />
         <div className="corner-decoration corner-br" />
         
         {/* Image placeholder with HUD styling */}
         <div className="relative aspect-square w-full overflow-hidden rounded-md border border-border/30 bg-muted/50 mb-4">
           <div className="absolute inset-0 flex items-center justify-center">
             <div className="text-6xl font-display text-primary/30">
               {member.name.charAt(0)}
             </div>
           </div>
           
           {/* Scan line effect */}
           <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <motion.div
               className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"
               animate={{ top: ["0%", "100%"] }}
               transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
             />
           </div>
           
           {/* HUD overlay */}
           <div className="absolute inset-0 border border-primary/20 rounded-md" />
           <div className="absolute top-2 left-2 text-[8px] font-display text-primary/60 tracking-wider">
             ID:{member.id}
           </div>
           <div className="absolute bottom-2 right-2 text-[8px] font-display text-accent/60 tracking-wider">
             ACTIVE
           </div>
         </div>
         
         {/* Member info */}
         <div className="space-y-2">
           <h3 className="font-display text-lg text-foreground tracking-wide">
             {member.name}
           </h3>
           <div className="h-px bg-gradient-to-r from-primary/50 via-accent/50 to-transparent" />
           <p className="text-sm text-muted-foreground font-body">
             {member.role}
           </p>
         </div>
         
         {/* Glow effect on hover */}
         <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-lg glow-primary" />
       </DraggableCardBody>
     </DraggableCardContainer>
   );
 };
 
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
         <motion.div style={{ y: translateFirst }} className="flex flex-col items-center gap-6">
           {firstPart.map((member) => (
             <TeamCard key={member.id} member={member} />
           ))}
         </motion.div>
 
         {/* Second column */}
         <motion.div style={{ y: translateSecond }} className="flex flex-col items-center gap-6 mt-20">
           {secondPart.map((member) => (
             <TeamCard key={member.id} member={member} />
           ))}
         </motion.div>
 
         {/* Third column */}
         <motion.div style={{ y: translateThird }} className="flex flex-col items-center gap-6">
           {thirdPart.map((member) => (
             <TeamCard key={member.id} member={member} />
           ))}
         </motion.div>
       </div>
     </div>
   );
 };