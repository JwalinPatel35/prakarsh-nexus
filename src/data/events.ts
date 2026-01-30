export type EventCategory = "technical" | "non-technical" | "workshop" | "esports";

export interface Event {
  id: string;
  name: string;
  tagline: string;
  description: string[];
  posterElements: string[];
  keywords: string[];
  colors: string;
  neonColor: "lavender" | "pink" | "peach" | "purple";
  icon: string;
  category: EventCategory;
}

export const categoryInfo: Record<EventCategory, { label: string; description: string; neonColor: Event["neonColor"] }> = {
  technical: {
    label: "Technical Events",
    description: "Dive into coding challenges, hackathons, and tech-driven competitions that push your skills to the limit.",
    neonColor: "lavender",
  },
  "non-technical": {
    label: "Non-Technical Events",
    description: "Showcase your creativity, strategic thinking, and presentation skills in these engaging challenges.",
    neonColor: "pink",
  },
  workshop: {
    label: "Workshops",
    description: "Hands-on learning experiences led by industry experts. Build, learn, and create something real.",
    neonColor: "purple",
  },
  esports: {
    label: "Esports",
    description: "Compete in high-energy gaming tournaments and immersive virtual reality experiences.",
    neonColor: "peach",
  },
};

export const events: Event[] = [
  {
    id: "urban-genesis",
    name: "Urban Genesis",
    tagline: "Build a city where every decision can make or break your future.",
    description: [
      "Urban Genesis is an intense offline strategy simulation where teams face market crashes, surprise audits, tech limits, and ethical dilemmas in real time.",
      "There are no retries, no reversals, only consequences.",
      "If your city survives the pressure, you truly earned it."
    ],
    posterElements: [
      "ZoCity skyline under stress (cracks, warning signs, alerts)",
      "News tickers, audit stamps, and market crash visuals",
      "Blueprint-style layouts with locked decision icons",
      "Tech upgrade paths with restriction symbols"
    ],
    keywords: ["Decide", "Lock", "Survive", "Endure"],
    colors: "dark urban tones (charcoal, steel grey) with peach accent",
    neonColor: "peach",
    icon: "🏙️",
    category: "technical"
  },
  {
    id: "designx",
    name: "DesignX",
    tagline: "Think fast. Design smart. Pitch like a pro.",
    description: [
      "DesignX is a multi-round design showdown testing your creativity, design fundamentals, and presentation skills.",
      "From spotting design flaws to building and pitching your own visuals, this is where real designers rise.",
      "If design is your language — DesignX is your battlefield."
    ],
    posterElements: [
      "Split visuals: flawed design ❌ vs clean design ✅",
      "UI/UX elements, posters, app screens, grids & typography samples",
      "Tools icons: Figma, Canva",
      "Stopwatch / lightning icon for rapid-fire rounds",
      "Presentation / pitch visuals"
    ],
    keywords: ["Analyze", "Create", "Pitch", "Win"],
    colors: "modern neutrals with bold accent colors",
    neonColor: "pink",
    icon: "🎨",
    category: "technical"
  },
  {
    id: "evolution-of-tech",
    name: "Evolution of Tech",
    tagline: "From the earliest inventions to future-defining innovations.",
    description: [
      "Evolution of Tech is an engaging, fast-paced team event where participants arrange timelines, explain concepts on the spot, and creatively pitch unconventional technologies.",
      "Designed for everyone, no coding required, just logic, communication, and creativity.",
      "Think smart, speak confidently, and experience technology like never before."
    ],
    posterElements: [
      "Timeline visuals: old tech → modern tech → futuristic tech",
      "Tech cards, arrows, relay-style motion graphics",
      "Mic/speaker icons for rapid explanations",
      "Fun elements: buzzer, timer, warning symbols ⚠️",
      "Silly/futuristic gadgets"
    ],
    keywords: ["Think", "Explain", "Pitch", "Perform"],
    colors: "vibrant, playful tech palette (lavender, pink accents)",
    neonColor: "lavender",
    icon: "⚡",
    category: "non-technical"
  },
  {
    id: "techtrash",
    name: "TechTrash",
    tagline: "Don't discard technology, reimagine it.",
    description: [
      "TechTrash is a fun yet impactful event where participants transform waste and discarded tech materials into innovative models that address real environmental problems.",
      "Blending creativity, teamwork, and sustainability, this event proves that innovation doesn't always start from scratch; sometimes, it starts from trash.",
      "Think green. Build smart. Create responsibly."
    ],
    posterElements: [
      "E-waste and scrap materials transforming into tech models",
      "Recycling symbols combined with circuits/gears",
      "Hands building prototypes from discarded materials",
      "Icons for sustainability, innovation, and teamwork"
    ],
    keywords: ["Recycle", "Innovate", "Sustain", "Create"],
    colors: "peach tones with tech accents",
    neonColor: "peach",
    icon: "♻️",
    category: "non-technical"
  },
  {
    id: "data-vault",
    name: "Data Vault",
    tagline: "Step into a locked command center and play your way through a tech mystery.",
    description: [
      "Data-Vault: The Evolution Lockdown is a fun, beginner-friendly event where teams clean simple data, scan QR clues around campus, and explore how technology has evolved over time.",
      "No heavy tech skills required, just curiosity, quick thinking, and teamwork.",
      "Unlock the files, crack the codes, and enjoy the mission."
    ],
    posterElements: [
      "Command center / computer lab visuals with locked files and warning alerts",
      "Excel sheets, graphs, pivot tables, and data icons",
      "QR codes and campus map markers",
      "Timeline or data flow visuals showing tech evolution"
    ],
    keywords: ["Clean", "Decode", "Analyze", "Predict"],
    colors: "dark tech theme (navy/black) with lavender accents",
    neonColor: "lavender",
    icon: "🔐",
    category: "technical"
  },
  {
    id: "cryptocourtroom",
    name: "CryptoCourtRoom",
    tagline: "Is crypto the future… or a courtroom disaster waiting to happen?",
    description: [
      "CryptoCourtRoom throws you into dramatic crypto trials where scams, regulations, and ethical dilemmas are argued live in a mock courtroom.",
      "Play powerful roles, question bold claims, and watch real crypto stories unfold like a legal drama.",
      "No crypto background needed, just step in, speak up, and let the case decide."
    ],
    posterElements: [
      "Courtroom visuals blended with crypto elements (gavel + Bitcoin/blockchain icons)",
      "Role icons: Founder, Investor, Regulator, Judge",
      "Debate / discussion visuals (speech bubbles, arguments, scales of justice)",
      "Simple Web3 symbols (chains, locks, digital coins)"
    ],
    keywords: ["Debate", "Decide", "Defend", "Decode"],
    colors: "professional yet fun — dark blue, gold accents",
    neonColor: "purple",
    icon: "⚖️",
    category: "non-technical"
  },
  {
    id: "stealscape",
    name: "Stealscape",
    tagline: "THINK · STEAL · ESCAPE",
    description: [
      "Gear up for a high-octane tech heist! Steal the Black Box, navigate a digital maze, and crack AI-powered escape challenges.",
      "Combine brains, strategy, and speed to outsmart competitors and escape first in this 3-round tech thriller.",
      "Are you fast, clever, and lucky enough to escape?"
    ],
    posterElements: [
      "Futuristic digital heist vibe with neon highlights",
      "Icons representing puzzles, QR codes, AI, and escape rooms",
      "Visual progression: Robbery → Digital Hunt → AI Escape",
      "Countdown timers or digital lock graphics for urgency"
    ],
    keywords: ["Think", "Steal", "Escape", "Win"],
    colors: "pink highlights on dark background",
    neonColor: "pink",
    icon: "🎯",
    category: "technical"
  },
  {
    id: "ghostbusters",
    name: "GhostBusters",
    tagline: "Track the invisible. Crack the signal. Catch the ghost.",
    description: [
      "The Ghost Signal is a hands-on cybersecurity challenge where participants hunt a hidden Wi-Fi beacon using ESP32 microcontrollers.",
      "Code your own signal radar, analyze live RSSI data, and physically track a moving 'ghost' signal in real time.",
      "No brute-force hacking, just pure tech instincts and smart signal hunting."
    ],
    posterElements: [
      "Dark cyber + radio-wave aesthetic (green/blue signal pulses)",
      "ESP32 board visuals, antennas, serial graphs, Wi-Fi icons",
      "Human silhouette with 'hidden signal' glow",
      "Cybersecurity · Wireless Hacking · Signal Tracking"
    ],
    keywords: ["Track", "Hack", "Hunt", "Capture"],
    colors: "dark cyber with lavender/pink signal pulses",
    neonColor: "lavender",
    icon: "👻",
    category: "technical"
  },
  {
    id: "feud-exe",
    name: "Feud.exe",
    tagline: "Think fast or get feuded.",
    description: [
      "Feud.exe throws teams into intense one-on-one showdowns powered by real student survey data.",
      "Buzz in, predict the crowd's mind, and eliminate opponents in a game where speed, strategy, and teamwork decide who survives.",
      "By Praxis Club"
    ],
    posterElements: [
      "Game-show vibe with buzzers, scoreboards, and face-off visuals",
      "Digital/glitch aesthetic to match the '.exe' theme",
      "Pop-culture character team names",
      "High-energy gameplay emphasis"
    ],
    keywords: ["Survey", "Battle", "Eliminate", "Win"],
    colors: "glitch aesthetic with neon accents",
    neonColor: "pink",
    icon: "🎮",
    category: "esports"
  },
  {
    id: "protocol-0",
    name: "Protocol 0",
    tagline: "Every choice matters. Every mistake costs.",
    description: [
      "Protocol 0 is a team-based, story-driven decision game where participants navigate a live interactive storyline.",
      "Each decision unlocks a new path, some lead forward, others trigger traps.",
      "With only one hidden 'true ending,' teams must think fast, reason deeply, and adapt to survive. By AIM Club."
    ],
    posterElements: [
      "Dark, minimal, thriller-style visuals",
      "Decision trees, branching paths, warning symbols",
      "Glitch or system-override aesthetics",
      "Visual cue for multiple paths, one true ending"
    ],
    keywords: ["Choose", "Survive", "Think", "Escape"],
    colors: "dark minimal thriller with glitch effects",
    neonColor: "purple",
    icon: "🔀",
    category: "technical"
  },
  {
    id: "hydrothrust",
    name: "Hydrothrust",
    tagline: "Build it. Fuel it. Launch it.",
    description: [
      "The Hydrothrust Workshop is a hands-on learning experience where participants design, fabricate, and launch their own water-powered rockets.",
      "Learn the basics of rocket propulsion using water thrust, test your design in real launches, and compete to achieve the longest distance.",
      "Engineering, physics, and fun, blasting off together."
    ],
    posterElements: [
      "Water rocket launch visuals with splash and motion trails",
      "DIY engineering elements: PVC pipes, bottles, fins, tools",
      "Step-based flow: Learn → Build → Launch → Compete",
      "Outdoor, high-energy, STEM workshop vibe"
    ],
    keywords: ["Learn", "Build", "Launch", "Compete"],
    colors: "lavender with peach accents",
    neonColor: "lavender",
    icon: "🚀",
    category: "workshop"
  },
  {
    id: "ctf",
    name: "CTF",
    tagline: "Capture the Flag – Powered by The Hackers Meetup",
    description: [
      "Capture the Flag (CTF) is a competitive cybersecurity challenge where participants hunt for hidden digital 'flags' by solving real-world security problems.",
      "Hosted in collaboration with The Hackers Meetup (THM), this event introduces participants to web security, cryptography, reverse engineering, and digital forensics.",
      "Whether you're a beginner or a seasoned hacker, this is your gateway into the cybersecurity world."
    ],
    posterElements: [
      "Cybersecurity visuals: terminals, flags, locks, networks, code snippets",
      "Strong branding: Hosted by The Hackers Meetup (THM)",
      "Icons representing domains: web security, cryptography, forensics",
      "Competitive vibe: leaderboards, timers, challenge grids"
    ],
    keywords: ["Hack", "Capture", "Solve", "Win"],
    colors: "lavender on dark terminal background",
    neonColor: "lavender",
    icon: "🚩",
    category: "technical"
  },
  {
    id: "p2p",
    name: "P2P",
    tagline: "Prompt to Product – Turn prompts into products.",
    description: [
      "P2P challenges participants to build a real, working digital solution using only Generative AI tools—no manual coding allowed.",
      "From defining the idea to designing, building, and pitching, every step relies on prompt logic, creativity, and speed.",
      "The smartest prompts win, not the fastest fingers."
    ],
    posterElements: [
      "Clean, futuristic AI visuals (chat bubbles transforming into UI screens)",
      "Clear flow graphic: Idea → Prompt → Build → Pitch",
      "Icons representing GenAI tools",
      "Timer / countdown graphics for time pressure"
    ],
    keywords: ["Prompt", "Build", "Ship", "Pitch"],
    colors: "AI purple with clean futuristic tones",
    neonColor: "purple",
    icon: "🤖",
    category: "technical"
  },
  {
    id: "dreamflow",
    name: "Dreamflow",
    tagline: "Build Apps at the Speed of Thought",
    description: [
      "Dreamflow is an AI-first mobile app building experience that lets you turn ideas into production-ready Flutter apps using natural language prompts.",
      "Powered by the FlutterFlow Vadodara community, this session introduces a next-gen workflow where AI agents, visual tools, and real code work together.",
      "No installation, no lock-in, just pure creation. Build faster, smarter, and the way modern engineers do."
    ],
    posterElements: [
      "Clean, modern UI visuals (chat prompt → app screens → Flutter code)",
      "Strong branding: FlutterFlow Vadodara Community",
      "Flow graphic: Idea → Prompt → Visual Build → Code → App",
      "AI-first · No Install · Production Ready"
    ],
    keywords: ["Dream", "Build", "Ship", "Deploy"],
    colors: "lavender with modern UI accents",
    neonColor: "lavender",
    icon: "💭",
    category: "workshop"
  },
  {
    id: "tradex",
    name: "TradeX 2.0",
    tagline: "Think like an investor, not just a quizzer.",
    description: [
      "TradeX 2.0 is a dynamic stock market simulation where teams trade virtual shares based on quiz outcomes.",
      "Company prices rise and fall with collective knowledge, market news, and risk-taking decisions.",
      "Strategy, prediction, and timing matter more than speed—build the strongest portfolio and finish with the highest net worth to win."
    ],
    posterElements: [
      "Stock market visuals: graphs, candlesticks, arrows, trading screens",
      "Quiz + finance fusion icons",
      "Strategy · Risk · Market Simulation emphasis",
      "Portfolio and net-worth highlights"
    ],
    keywords: ["Trade", "Invest", "Strategize", "Win"],
    colors: "peach with stock market aesthetics",
    neonColor: "peach",
    icon: "📈",
    category: "non-technical"
  },
  {
    id: "ar-vr-experience",
    name: "VR Arena",
    tagline: "Step beyond the screen and into another dimension.",
    description: [
      "VR Arena is an immersive AR-VR experience where participants dive into virtual worlds, interactive realms, and high-energy games using VR headsets and consoles.",
      "Explore, play, and experience tech that blurs the line between reality and imagination.",
      "No learning curve, just pure immersion and fun."
    ],
    posterElements: [
      "Futuristic visuals with VR headsets, neon grids, and virtual worlds",
      "Silhouettes wearing VR headsets interacting with digital realms",
      "Icons for VR, AR, motion controllers, and gaming consoles",
      "Immersive · Interactive · Next-Gen Tech"
    ],
    keywords: ["Immerse", "Play", "Experience", "Explore"],
    colors: "virtual reality purple with neon grid aesthetics",
    neonColor: "purple",
    icon: "🥽",
    category: "esports"
  }
];

export const getEventById = (id: string): Event | undefined => {
  return events.find(event => event.id === id);
};

export const getEventsByCategory = (category: EventCategory): Event[] => {
  return events.filter(event => event.category === category);
};
