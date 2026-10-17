export type CmsRecord = Record<string, string> & { id: string };

export type CmsContent = {
  galleryCategories: string[];
  galleryItems: CmsRecord[];
  events: CmsRecord[];
  departments: CmsRecord[];
  aurathonEditions: CmsRecord[];
  team: CmsRecord[];
  about: Record<string, string>;
};

export const defaultCmsContent: CmsContent = {
  galleryCategories: [
    "Orientation",
    "DSA War Room",
    "Marathon",
    "AURATHON",
    "Workshops",
    "Events",
    "Posters",
    "Banners",
    "Team",
  ],
  galleryItems: [
    { id: "media-1", title: "Orientation Program", category: "Orientation", meta: "AURA • 2025", image: "" },
    { id: "media-2", title: "DSA War Room", category: "DSA War Room", meta: "Coding challenge • 70+ students", image: "" },
    { id: "media-3", title: "AURATHON 2025", category: "AURATHON", meta: "Ideathon • National finals", image: "" },
    { id: "media-4", title: "Generative AI Workshop", category: "Workshops", meta: "LLMs • RAG • Chatbots", image: "" },
    { id: "media-5", title: "Event Banner", category: "Banners", meta: "Campaign • Visual identity", image: "" },
    { id: "media-6", title: "Poster Campaign", category: "Posters", meta: "Campus outreach • 2025", image: "" },
    { id: "media-7", title: "Speaker Session", category: "Events", meta: "AI market trends • 2026", image: "" },
    { id: "media-8", title: "Leadership Team", category: "Team", meta: "AURA board • GTBIT", image: "" },
  ],
  events: [
    {
      id: "event-1",
      title: "AURA Orientation Program",
      date: "28 August 2025",
      location: "Edusat Lab, second floor, opposite Room 26",
      summary: "Introduced freshers to AURA’s mission, research domains, collaboration opportunities, and the culture of technical learning.",
    },
    {
      id: "event-2",
      title: "DSA War Room",
      date: "12 September 2025",
      location: "GTBIT",
      summary: "A competitive coding challenge focused on Data Structures and Algorithms, analytical thinking, coding efficiency, and problem-solving under pressure.",
    },
    {
      id: "event-3",
      title: "AURATHON 2025 — An Innovative Ideathon",
      date: "National-level event",
      location: "Department of Computer Science and Engineering, GTBIT",
      summary: "AURATHON 2025 saw 120+ colleges across 22 states, with 278 teams and approximately 779 participants registering and 20 teams shortlisted for the final round.",
    },
    {
      id: "event-4",
      title: "Internal GitHub Session",
      date: "Session-based workshop",
      location: "AURA internal circle",
      summary: "Members focused on repository workflows, commits, branching strategies, version control, and collaborative development practices.",
    },
    {
      id: "event-5",
      title: "Internal DSA Guidance Session",
      date: "Session-based guidance",
      location: "AURA internal circle",
      summary: "A structured practice-oriented session on consistency, logical thinking, coding efficiency, and structured problem solving.",
    },
    {
      id: "event-6",
      title: "30-Day Generative AI Workshop",
      date: "Workshop series",
      location: "AURA technology hub",
      summary: "Members explored LLMs, RAG pipelines, chatbot development, and practical applications of generative AI.",
    },
    {
      id: "event-7",
      title: "Brainstorming and Guidance Session",
      date: "Ongoing academic support",
      location: "AURA internal mentoring",
      summary: "Personal, academic, and professional development conversations focused on growth, planning, and motivation.",
    },
    {
      id: "event-8",
      title: "Generative AI Speaker Session",
      date: "2 March 2026",
      location: "GTBIT",
      summary: "An expert session featuring Dr. Sarabjot Singh on the changing market and corporate trends driven by AI and the power of Generative AI.",
    },
  ],
  departments: [
    {
      id: "department-1",
      name: "Artificial Intelligence and Machine Learning",
      description: "Explore LLMs, generative AI, computer vision, data-driven applications and applied research in AI.",
      focus: "LLMs and model reasoning\nRAG pipelines\nApplied ML systems\nResearch-driven experimentation",
    },
    {
      id: "department-2",
      name: "Cybersecurity",
      description: "Develop awareness around digital safety, secure systems, ethical hacking, and resilient technical design.",
      focus: "Network analysis\nThreat modeling\nSecurity tools\nSecure development practices",
    },
    {
      id: "department-3",
      name: "Data Science",
      description: "Study real-world data analysis, insight generation, predictive modeling, and data communication.",
      focus: "Analytics and dashboards\nData storytelling\nPredictive models\nExperiment design",
    },
    {
      id: "department-4",
      name: "Research and Innovation",
      description: "Support project ideation, prototype development, interdisciplinary experiments and collaborative problem solving.",
      focus: "Ideation sprints\nPrototype building\nInterdisciplinary projects\nKnowledge sharing",
    },
  ],
  aurathonEditions: [
    {
      id: "aurathon-2025",
      year: "2025",
      title: "AURATHON 2025",
      subtitle: "Build what the future needs.",
      description: "AURATHON is AURA’s flagship ideathon, bringing together bright minds, engineers, and future innovators to solve meaningful problems through technology and bold ideas.",
      stats: "120+ | colleges\n22 | states\n278 | teams\n20 | shortlisted finalists",
      tracks: "AI & ML Solutions\nCybersecurity & Privacy\nData Products & Analytics\nSocietal Impact & Social Innovation\nWeb & App Prototypes",
      sponsors: "Unstop\n.XYZ\nLegal Terminus\nInterview Buddy\nBrightPath",
      winners: "1st | Team Meta\n2nd | Team Zod\n3rd | Team Code Sutra",
      faqs: "Who can participate? | AURATHON is open to students from recognized institutions, with teams encouraged to field creative and technically grounded ideas.\nWhat are the tracks? | The event covers multiple technology and impact domains, including AI/ML, cybersecurity, data-driven products, and socially relevant solutions.\nHow does the finalist journey work? | Registrations are followed by review, shortlist selection, and a final round in which shortlisted teams pitch and present their ideas.",
      history: "A national-level ideathon bringing students from 120+ colleges and 22 states across India. 278 teams and approximately 779 participants registered, with 20 teams shortlisted for the final round.",
      image: "",
    },
  ],
  team: [
    { id: "team-1", name: "President", role: "Society leadership", detail: "Driving vision, strategy, and growth across the society.", image: "" },
    { id: "team-2", name: "Vice President", role: "Operations", detail: "Coordinating initiatives, partner engagement, and strategic execution.", image: "" },
    { id: "team-3", name: "General Secretary", role: "Community management", detail: "Ensuring smooth internal coordination, communication, and operations.", image: "" },
    { id: "team-4", name: "AI/ML Lead", role: "Department leadership", detail: "Guiding research, projects, and technical learning within AI and ML.", image: "" },
    { id: "team-5", name: "Cybersecurity Lead", role: "Department leadership", detail: "Mentoring security-focused learning and research initiatives.", image: "" },
    { id: "team-6", name: "Data Science Lead", role: "Department leadership", detail: "Supporting analytical and applied data science thinking across events and projects.", image: "" },
  ],
  about: {
    headline: "Building the next generation of builders.",
    description: "AURA — Association for Unleashing Research and Advancement — is committed to empowering students with a platform to explore, develop, and apply technical knowledge beyond the classroom.",
    objective: "The objective of AURA is to provide students with a platform to explore, develop, and apply their technical knowledge beyond the classroom. The society promotes innovation, research, problem-solving, and collaboration through workshops, competitions, projects, and knowledge-sharing sessions.",
    vision: "To create a student-first ecosystem where research, innovation, and collaborative learning become a habit, not a one-off opportunity.",
    values: "Curiosity, creativity, leadership, accountability, inclusivity, and the courage to turn ideas into action.",
    teamIntro: "The team combines research-minded leadership, project coordination, mentoring, and event execution to ensure the society remains active, inclusive, and ambitious.",
  },
};

export function isCmsContent(value: unknown): value is CmsContent {
  if (!value || typeof value !== "object") return false;

  const content = value as Partial<CmsContent>;
  const isRecordList = (records: unknown): records is CmsRecord[] =>
    Array.isArray(records) &&
    records.every((record) =>
      Boolean(
        record &&
          typeof record === "object" &&
          typeof record.id === "string" &&
          Object.values(record).every((field) => typeof field === "string"),
      ),
    );

  return (
    Array.isArray(content.galleryCategories) &&
    content.galleryCategories.every((category) => typeof category === "string") &&
    isRecordList(content.galleryItems) &&
    isRecordList(content.events) &&
    isRecordList(content.departments) &&
    isRecordList(content.aurathonEditions) &&
    isRecordList(content.team) &&
    Boolean(
      content.about &&
        typeof content.about === "object" &&
        Object.values(content.about).every((field) => typeof field === "string"),
    )
  );
}
