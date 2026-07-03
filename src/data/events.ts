export interface EventItem {
  id: string;
  name: string;
  category: string;
  short: string;
  desc: string;
  prize: string;
  duration: string;
  team: string;
  date: string;
  venue: string;
  tags: string[];
  badge?: string | null;
}

export const events: EventItem[] = [
  {
    id: 'nebula-hack',
    name: 'Nebula Hack',
    category: 'HACKATHON',
    short: '36-hour interstellar coding marathon.',
    desc: 'Build solutions that could work in zero gravity. Language-agnostic. Speed and precision are your only tools when plotting orbital trajectories in this intense coding marathon.',
    prize: '₹75,000',
    duration: '36 Hours',
    team: 'Teams of 4',
    date: 'Oct 17–18',
    venue: 'Lab Block 3',
    tags: ['React', 'Node.js', 'Python', 'Open Theme'],
  },
  {
    id: 'satellite-systems',
    name: 'Satellite Systems 101',
    category: 'WORKSHOP',
    short: 'Hands-on with real telemetry data.',
    desc: 'Learn orbital mechanics, satellite communication protocols, and simulation tools used by real space agencies. Includes a live demo with ISRO telemetry datasets.',
    prize: 'Free Entry',
    duration: '3 Hours',
    team: 'Individual',
    date: 'Oct 17',
    venue: 'Seminar Hall A',
    tags: ['Telemetry', 'Python', 'Space Science'],
  },
  {
    id: 'pale-blue-dot',
    name: 'Pale Blue Dot Talks',
    category: 'TALK',
    short: 'TED-style sessions from space industry leaders.',
    desc: 'Eight sessions from ISRO scientists, aerospace startup founders, and AI researchers pushing humanity\'s boundaries. Includes a live Q&A panel.',
    prize: 'Open to All',
    duration: 'Full Day',
    team: 'Individual',
    date: 'Oct 17–18',
    venue: 'Main Auditorium',
    tags: ['Keynote', 'AI', 'Space', 'Startups'],
  },
  {
    id: 'project-cosmos',
    name: 'Project Cosmos',
    category: 'SHOWCASE',
    short: 'Showcase your project to industry veterans.',
    desc: 'Demonstrate your semester project or personal build to a panel of engineers, VCs, and researchers. Categories: hardware, software, research, and open innovation.',
    prize: '₹30,000',
    duration: 'Day 2',
    team: 'Solo / Team',
    date: 'Oct 18',
    venue: 'Exhibition Hall',
    tags: ['All Domains', 'Prototype', 'Research'],
  },
  {
    id: 'mission-control-ai',
    name: 'Mission Control: AI',
    category: 'WORKSHOP',
    short: 'Deploy ML models in resource-constrained environments.',
    desc: 'Think less cloud, more edge — like a Mars rover AI system. Hands-on with TensorFlow Lite, ONNX, and real hardware inference on embedded systems.',
    prize: 'Free Entry',
    duration: '4 Hours',
    team: 'Individual',
    date: 'Oct 18',
    venue: 'Lab Block 1',
    tags: ['TensorFlow', 'Edge AI', 'Python', 'Raspberry Pi'],
  },
  {
    id: 'zero-g-arena',
    name: 'Zero-G Arena',
    category: 'GAMING',
    short: 'Esports meets the final frontier.',
    desc: 'Compete in BGMI, Valorant, and a custom-built zero-gravity space sim tournament. Knockout format, spectator live stream, and winner-takes-all prize pool.',
    prize: '₹20,000',
    duration: 'Day 3',
    team: 'Teams of 5',
    date: 'Oct 19',
    venue: 'Gaming Zone',
    tags: ['BGMI', 'Valorant', 'Space Sim', 'Esports'],
  },
];

export const competitions: EventItem[] = [
  {
    id: 'orbital-debug',
    name: 'Orbital Debug',
    category: 'CODING',
    short: 'The ultimate competitive programming showdown.',
    desc: '5 problems, 3 hours, zero mercy. Language-agnostic. Points awarded for speed and accuracy. Live leaderboard displayed on main screen throughout the event.',
    prize: '₹60,000',
    duration: '3 Hours',
    team: 'Solo / Pair',
    date: 'Oct 18',
    venue: 'Lab Block 2',
    tags: ['C++', 'Python', 'Java', 'Algorithms'],
    badge: 'FLAGSHIP',
  },
  {
    id: 'rover-wars',
    name: 'Rover Wars',
    category: 'ROBOTICS',
    short: 'Build an autonomous Mars rover.',
    desc: 'Navigate a simulated Martian terrain — avoid craters, collect sample nodes, return to base. Judged on speed, accuracy, and autonomy. Hardware provided on request.',
    prize: '₹80,000',
    duration: '2 Hours (run)',
    team: 'Teams of 3',
    date: 'Oct 17–18',
    venue: 'Ground Arena',
    tags: ['Arduino', 'Raspberry Pi', 'Robotics', 'Autonomy'],
    badge: 'FLAGSHIP',
  },
  {
    id: 'dark-matter-design',
    name: 'Dark Matter Design',
    category: 'DESIGN',
    short: 'UI/UX sprint for a mission control dashboard.',
    desc: 'Redesign a futuristic NASA mission control interface in 4 hours. Judged on usability under pressure, information hierarchy, and visual innovation. Figma required.',
    prize: '₹40,000',
    duration: '4 Hours',
    team: 'Solo',
    date: 'Oct 18',
    venue: 'Seminar Hall B',
    tags: ['Figma', 'UI/UX', 'Prototyping'],
    badge: null,
  },
  {
    id: 'signal-lost',
    name: 'Signal: Lost',
    category: 'CTF',
    short: 'Decode transmissions from a lost probe.',
    desc: 'Cryptography meets space exploration. Decode transmissions using steganography, reverse engineering, and logic puzzles spread across 24 hours. Clues drop on a schedule.',
    prize: '₹50,000',
    duration: '24 Hours',
    team: 'Teams of 2',
    date: 'Oct 17–18',
    venue: 'Online + On-site',
    tags: ['CTF', 'Cryptography', 'Steganography', 'Reverse Eng'],
    badge: 'NEW ✦',
  },
];

export interface StatsItem {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
}

export const stats: StatsItem[] = [
  { value: 1000, label: 'PARTICIPANTS', suffix: '+' },
  { value: 20, label: 'EVENTS', suffix: '+' },
  { value: 5, label: 'PRIZES', prefix: '₹', suffix: 'L+' },
  { value: 3, label: 'DAYS' },
];

export interface ScheduleEventItem {
  id: string;
  time: string;
  name: string;
  description: string;
  venue: string;
  type: string;
  day: 1 | 2 | 3;
}

export const schedule: ScheduleEventItem[] = [
  // Day 1
  { id: 'event-1', time: '09:00 AM', name: 'Opening Ceremony', description: 'Inauguration and keynote address', venue: 'Main Auditorium', type: 'ceremony', day: 1 },
  { id: 'event-2', time: '10:00 AM', name: 'AI Summit Workshop', description: 'Hands-on AI development session', venue: 'Seminar Hall A', type: 'workshop', day: 1 },
  { id: 'event-3', time: '11:00 AM', name: 'Blockchain Bootcamp', description: 'Smart contract development', venue: 'Lab 301', type: 'workshop', day: 1 },
  { id: 'event-4', time: '12:00 PM', name: 'Algorithm Arena', description: 'Competitive programming contest', venue: 'Computing Lab 2', type: 'competition', day: 1 },
  { id: 'event-5', time: '02:00 PM', name: 'Web3 Workshop', description: 'NFT and DeFi fundamentals', venue: 'Seminar Hall B', type: 'workshop', day: 1 },
  { id: 'event-6', time: '03:00 PM', name: 'Cloud Computing Workshop', description: 'AWS hands-on lab', venue: 'Lab 205', type: 'workshop', day: 1 },
  { id: 'event-7', time: '06:00 PM', name: 'Galactic Game Jam Kickoff', description: '48-hour game dev begins', venue: 'Cafeteria Hall', type: 'hackathon', day: 1 },
  // Day 2
  { id: 'event-8', time: '09:00 AM', name: 'Code Orbit Begins', description: '24-hour hackathon start', venue: 'Main Auditorium', type: 'hackathon', day: 2 },
  { id: 'event-9', time: '10:00 AM', name: 'IoT Innovation Lab', description: 'Build smart devices', venue: 'Electronics Lab', type: 'workshop', day: 2 },
  { id: 'event-10', time: '01:00 PM', name: 'Tech Trivia Quest', description: 'Multi-round tech quiz', venue: 'Seminar Hall C', type: 'competition', day: 2 },
  { id: 'event-11', time: '02:00 PM', name: 'Drone Wars', description: 'Drone racing competition', venue: 'Open Ground', type: 'competition', day: 2 },
  { id: 'event-12', time: '04:00 PM', name: 'Startup Showdown', description: 'Pitch to investors', venue: 'Conference Hall', type: 'competition', day: 2 },
  { id: 'event-13', time: '07:00 PM', name: 'Cultural Night', description: 'Music and performances', venue: 'Open Air Theater', type: 'ceremony', day: 2 },
  // Day 3
  { id: 'event-14', time: '09:00 AM', name: 'Code Orbit Finals', description: 'Hackathon presentations', venue: 'Main Auditorium', type: 'hackathon', day: 3 },
  { id: 'event-15', time: '11:00 AM', name: 'Cyber Nexus CTF', description: 'Capture the flag finals', venue: 'CS Lab Block', type: 'competition', day: 3 },
  { id: 'event-16', time: '12:00 PM', name: 'ML Challenge Results', description: 'ML competition finale', venue: 'Computing Lab', type: 'competition', day: 3 },
  { id: 'event-17', time: '03:00 PM', name: 'Design Sprint Finals', description: 'UI/UX competition finale', venue: 'Design Studio', type: 'competition', day: 3 },
  { id: 'event-18', time: '04:00 PM', name: 'Game Jam Presentations', description: 'Game showcase', venue: 'Cafeteria Hall', type: 'hackathon', day: 3 },
  { id: 'event-19', time: '05:00 PM', name: 'Esports Finals', description: 'Valorant and BGMI finals', venue: 'Gaming Zone', type: 'gaming', day: 3 },
  { id: 'event-20', time: '07:00 PM', name: 'Closing Ceremony', description: 'Awards and valediction', venue: 'Main Auditorium', type: 'ceremony', day: 3 },
];

export interface SpeakerItem {
  id: string;
  name: string;
  role: string;
  company: string;
  photo: string;
  bio: string;
  talkTitle: string;
  talkTime: string;
  socials: {
    linkedin?: string;
    twitter?: string;
  };
}

export const speakers: SpeakerItem[] = [
  {
    id: 'speaker-1',
    name: 'Dr. Priya Sharma',
    role: 'AI Research Lead',
    company: 'Google DeepMind',
    photo: 'https://images.pexels.com/photos/3764119/pexels-photo-3764119.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Dr. Sharma leads AI research initiatives focused on natural language understanding and multi-modal learning systems.',
    talkTitle: 'The Future of General AI',
    talkTime: 'Day 1, 10:00 AM',
    socials: { linkedin: '#', twitter: '#' },
  },
  {
    id: 'speaker-2',
    name: 'Arjun Mehta',
    role: 'CTO',
    company: 'TechNova Solutions',
    photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Tech visionary with 15+ years building scalable systems for Fortune 500 companies.',
    talkTitle: 'Scaling to Millions: Engineering at Scale',
    talkTime: 'Day 1, 2:00 PM',
    socials: { linkedin: '#' },
  },
  {
    id: 'speaker-3',
    name: 'Kavya Nair',
    role: 'Blockchain Architect',
    company: 'Polygon',
    photo: 'https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Expert in Layer 2 scaling solutions and smart contract security.',
    talkTitle: 'Building the Decentralized Future',
    talkTime: 'Day 2, 11:00 AM',
    socials: { linkedin: '#', twitter: '#' },
  },
  {
    id: 'speaker-4',
    name: 'Vikram Singh',
    role: 'VP of Engineering',
    company: 'Microsoft',
    photo: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Leading engineering teams building next-generation cloud infrastructure.',
    talkTitle: 'Cloud Native: The New Standard',
    talkTime: 'Day 2, 3:00 PM',
    socials: { linkedin: '#' },
  },
  {
    id: 'speaker-5',
    name: 'Dr. Maya Krishnan',
    role: 'Principal Scientist',
    company: 'IBM Research',
    photo: 'https://images.pexels.com/photos/3766111/pexels-photo-3766111.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Pioneering research in quantum computing applications for industry.',
    talkTitle: 'Quantum Computing: Beyond Classical Limits',
    talkTime: 'Day 3, 10:00 AM',
    socials: { linkedin: '#', twitter: '#' },
  },
  {
    id: 'speaker-6',
    name: 'Rahul Thomas',
    role: 'Founder & CEO',
    company: 'StartupFoundry',
    photo: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Serial entrepreneur with multiple successful exits in fintech and edtech.',
    talkTitle: 'From Idea to IPO: A Founder\'s Journey',
    talkTime: 'Day 3, 2:00 PM',
    socials: { linkedin: '#' },
  },
  {
    id: 'speaker-7',
    name: 'Ananya Reddy',
    role: 'Product Director',
    company: 'Apple',
    photo: 'https://images.pexels.com/photos/3756165/pexels-photo-3756165.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Shaping product strategy for consumer applications used by billions.',
    talkTitle: 'Designing for Delight: Product Philosophy',
    talkTime: 'Day 1, 4:00 PM',
    socials: { linkedin: '#', twitter: '#' },
  },
  {
    id: 'speaker-8',
    name: 'Karthik Venkatesh',
    role: 'Head of Security',
    company: 'Cloudflare',
    photo: 'https://images.pexels.com/photos/2379762/pexels-photo-2379762.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Cybersecurity expert with experience protecting critical infrastructure.',
    talkTitle: 'Zero Trust: Security in a Borderless World',
    talkTime: 'Day 2, 12:00 PM',
    socials: { linkedin: '#' },
  },
];
