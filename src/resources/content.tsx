import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Anita",
  lastName: "Liu",
  name: `Anita Liu`,
  role: "Growth & Product Operations",
  avatar: "/images/avatar-anita.jpg",
  email: "anitaliu0818@gmail.com",
  location: "Asia/Shanghai", // IANA time zone identifier
  languages: ["English", "Chinese"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>Notes on cross-border growth and AI-native operations.</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/anita-liu-9a6417362/",
    essential: true,
  },
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/anitaships",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name} — ${person.role}`,
  description: `Personal site of ${person.name}, a growth & product operator in cross-border AI-native e-commerce.`,
  headline: <>Where others see chaos, I build order</>,
  featured: {
    display: false,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Featured</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured work
        </Text>
      </Row>
    ),
    href: "/work",
  },
  subline: (
    <>
      I walk into early-stage chaos and leave behind systems that run themselves —
      community, growth, content, and the AI tools that tie them together.{" "}
      <strong>One person, the output of a whole team.</strong>
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Hi, I'm Anita — the person you bring in when there's no playbook yet. At an
        AI-native cross-border SaaS, I joined a company with no SOPs, no SEO, no
        social presence, and no growth motion, and built all of it solo: SEO,
        content, channel partnerships, seed-user interviews, and community. I move
        the same way every time — find the order hiding inside the chaos, then build
        the system that keeps it there. I work in English and ship AI-native.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "AI-Native Cross-border E-commerce SaaS",
        timeframe: "2025.06 – Present",
        role: "User Growth & Product Operations",
        achievements: [
          <>
            Grew an overseas TikTok-seller community on Discord from{" "}
            <strong>0 to 335 members in 11 months</strong>, with 4 automated SOPs
            (onboarding, daily intel push, member stats).
          </>,
          <>
            Owned an education-channel partnership end to end (BD → launch):{" "}
            <strong>275 signups / 240 paid / $20K ARR at an 87% conversion rate</strong>.
          </>,
          <>
            Built a KOL CRM in Python (89 creators across 5 platforms), replacing a
            $140/mo SaaS stack; ran email outreach at a{" "}
            <strong>30–50% open rate</strong> (vs. 20–25% industry average).
          </>,
          <>
            Shipped <strong>43 internal AI-Skill tools</strong> (2nd-highest git
            contributions on the team, after the CTO); 1:1 onboarded 10+ seed users
            and interviewed sellers across 10+ countries in English.
          </>,
        ],
        images: [],
      },
      {
        company: "Senfeng Vacuum Coating",
        timeframe: "2023.06 – 2025.04",
        role: "Marketing & Events Specialist",
        achievements: [
          <>
            Led an <strong>1,800-person annual gala</strong> end to end — budget,
            run-of-show, and on-site execution.
          </>,
          <>
            Built the company's WeChat and Douyin presence from scratch, with
            standardized content production and review.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Education",
    institutions: [
      {
        name: "Chengdu Ginkgo Hospitality Management College",
        description: (
          <>
            B.A. in Cultural Industry Management, minor in Business English (2019–2023).
            GPA 4.1/5 (top 1%). National Scholarship; 2nd prize, FLTRP National English
            Writing Contest.
          </>
        ),
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Skills",
    skills: [
      {
        title: "Growth & User Operations",
        description: (
          <>
            Full-funnel growth across SEO, content, email, channel partnerships, and
            community — from first users to retention. Built a 335-member overseas
            community and a $20K-ARR channel from zero.
          </>
        ),
        tags: [
          {
            name: "Discord",
            icon: "discord",
          },
        ],
        images: [],
      },
      {
        title: "Data-Driven Decisions",
        description: (
          <>
            PostHog product analytics, funnel and retention analysis, and lightweight
            Python automation to find drop-off points and act on them.
          </>
        ),
        tags: [
          {
            name: "Python",
            icon: "python",
          },
        ],
        images: [],
      },
      {
        title: "AI-Native Workflow",
        description: (
          <>
            Daily Claude Code power user. Built a 43-tool internal AI-Skill chain that
            turns repetitive ops into automated workflows — 2nd-highest git contributor
            on the team.
          </>
        ),
        tags: [
          {
            name: "OpenAI",
            icon: "openai",
          },
          {
            name: "GitHub",
            icon: "github",
          },
        ],
        images: [],
      },
    ],
  },
};

// Home showcase: capabilities + resources + proof (edit text here)
const showcase = {
  identity: (
    <>
      A growth & product operator who plans, executes, and ships — using AI as
      leverage, with an eye for design and the judgment to know what actually moves
      the needle.
    </>
  ),
  chips: ["Strategy", "Execution", "AI-native", "Design eye", "Judgment"],
  capabilities: {
    title: "What I do",
    items: [
      {
        title: "Growth from zero",
        description:
          "Build the whole motion — community, channels, content — from nothing. One channel hit 87% conversion.",
      },
      {
        title: "Community & retention",
        description:
          "Grew an overseas community 0 → 335 and turned it into a steady product-feedback loop.",
      },
      {
        title: "AI-native operator",
        description:
          "Built a 43-tool AI workflow with Claude Code — 2nd-highest git contributor on the team, as a non-engineer.",
      },
      {
        title: "Data-driven decisions",
        description:
          "PostHog funnels and lightweight Python automation to find drop-off and act on it.",
      },
    ],
  },
  resources: {
    title: "What I bring",
    subtitle: "Assets I carry on day one — not just hours.",
    items: [
      {
        emoji: "🌐",
        title: "A 5,000+ creator network",
        description:
          "5,000+ creators across platforms — managed in a CRM I built, ready to activate.",
      },
      {
        emoji: "🤝",
        title: "Channel & BD playbook",
        description:
          "Closed an education channel to $20K ARR at 87% conversion; a 40+ partner ecosystem.",
      },
      {
        emoji: "🛠️",
        title: "A portable AI toolchain",
        description: "43 internal tools — a productivity multiplier I take between roles.",
      },
      {
        emoji: "📋",
        title: "Repeatable 0 → 1 playbooks",
        description: "Community SOPs and a multi-platform content engine (5-person team).",
      },
      {
        emoji: "🗣️",
        title: "First-hand user insight",
        description: "Seller interviews across 10+ countries, fed straight to product.",
      },
    ],
  },
  proof: ["87% conversion", "2× email open rate", "#2 git contributor", "5 platforms", "10+ countries"],
  stats: [
    { value: 87, prefix: "", suffix: "%", label: "channel conversion" },
    { value: 5000, prefix: "", suffix: "+", label: "creator network" },
    { value: 335, prefix: "", suffix: "", label: "community, from zero" },
    { value: 43, prefix: "", suffix: "", label: "AI tools shipped" },
  ],
};

// Creator-forward About: the human + creator behind the work (no résumé — that's on Work).
const creator = {
  photo: "/images/life/life-portrait.jpg",
  handle: "Anita Aqing",
  identity: "Gen-Z · liberal-arts grad · forever exploring",
  tagline: "I use AI to do the work of 3–5 people — every day.",
  intro: (
    <>
      The résumé lives on my Work page. Here's the part it can't capture: I don't
      just do growth and content for work — I do it because I love it. Give me an
      empty channel, a blank page, or a quiet room, and I'll fill it: an audience,
      a story, a song. I'm a creator who happens to be really good at the
      operator's side too.
    </>
  ),
  channels: {
    title: "My content channels",
    subtitle: "I build audiences in my own life, not just at work — proof I practice what I preach.",
    note: "Overseas platforms (Instagram / X) — coming next.",
    items: [
      {
        platform: "Xiaohongshu (RED)",
        handle: "Anita Aqing",
        stat: "1,383 followers · 13K likes & saves",
        href: "https://xhslink.com/m/FErtFnAjER",
      },
      {
        platform: "Douyin",
        handle: "Anita Aqing",
        stat: "1,219 followers",
        href: "https://v.douyin.com/AxS2bl_0VaY/",
      },
      {
        platform: "WeChat Official Account",
        handle: "Anita Aqing",
        stat: "1,400 followers · 75 original posts",
        href: "",
      },
      {
        platform: "LinkedIn",
        handle: "Anita Liu",
        stat: "Professional profile",
        href: "https://www.linkedin.com/in/anita-liu-9a6417362/",
      },
    ],
  },
  building: {
    title: "Building in public",
    subtitle: "I'm always building something. Right now:",
    items: [
      "This site — my own personal-brand website, built end-to-end with Claude Code.",
      "A personal time-management tool I'm designing for the way I actually work.",
      "Building toward a one-person company (OPC) — one person, the output of a team.",
      "Writing as a growth blogger — documenting real work, side projects, and going global.",
    ],
    featured: {
      label: "agency-of-one",
      tagline: "One person, a whole org chart.",
      description:
        "An open AI skill library — 16 tools across 7 \"departments\", each doing the job of a role you'd otherwise hire. Built AI-native, as a non-engineer.",
      cta: "See it on GitHub ↗",
      href: "https://github.com/anitaships/agency-of-one",
    },
  },
  interests: {
    title: "Off the clock",
    subtitle:
      "The through-line: I'm a creator everywhere — it's why I have an eye for design and genuinely get content and creators.",
    items: [
      { emoji: "📷", label: "Photography" },
      { emoji: "💃", label: "Dance" },
      { emoji: "✍️", label: "Writing" },
      { emoji: "🎤", label: "Singing" },
    ],
    photos: ["/images/life/life-1.jpg", "/images/life/life-2.jpg"],
  },
};

// Work timeline (reverse chronological). The current role's deep dives are the case studies.
const timeline = [
  {
    period: "2025 — Now",
    org: "AI-Native Cross-border E-commerce SaaS",
    role: "Growth & Product Operations",
    summary:
      "Walked into a company with no playbook — no SOPs, no SEO, no community, no growth motion — and built the engine from zero, solo. Deep dives below.",
    outputs: [] as string[],
    cases: true,
  },
  {
    period: "2023 — 2025",
    org: "Senfeng Vacuum Coating",
    role: "Marketing & Events Specialist · Chengdu",
    summary: "Owned brand presence and flagship events for a manufacturing company.",
    outputs: [
      "Led an 1,800-person annual gala end to end — budget, run-of-show, and on-site execution.",
      "Built the company's WeChat and Douyin presence from scratch, with a standardized content and review process.",
    ],
    cases: false,
  },
  {
    period: "2019 — 2023",
    org: "B.A. Cultural Industry Management",
    role: "Minor in Business English · Chengdu",
    summary: "Foundations in content, communication, and English — graduated in the top 1%.",
    outputs: [
      "GPA 4.1/5 (top 1%); National Scholarship.",
      "2nd prize, FLTRP National English Writing Contest.",
    ],
    cases: false,
  },
];

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Notes on growth & AI-native ops",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Work – ${person.name}`,
  description: `A reverse-chronological log of what ${person.name} has built`,
  // Create new project pages by adding a new .mdx file to app/work/projects
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  images: [],
};

export { person, social, newsletter, home, about, blog, work, gallery, showcase, timeline, creator };
