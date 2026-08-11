/**
 * THE CONTRACT.
 *
 * Every skin renders this one object. Nothing else. To reuse a skin on a real
 * project you replace the `content` export below and touch nothing in
 * `src/skins/` except the theme tokens.
 *
 * Rules for skins:
 *  - Read from `content`. Never hard-code copy inside a skin.
 *  - Use only the fields you need. A skin may skip sections it has no use for
 *    (Aesop ignores `pricing.plans[].features`, Linear ignores `guarantee`).
 *  - Never add a field here for one skin only. If a skin needs bespoke content,
 *    it belongs in that skin's own `extras` block at the bottom.
 */

export interface Link {
  label: string;
  href: string;
}

/** A photograph that ships with the repo. Nothing here is hotlinked. */
export interface Photo {
  /** Path under /img. Every file is committed and optimised. No CDN, ever: a
   *  template people copy into their own projects must not hotlink someone
   *  else's bandwidth. */
  src: string;
  alt: string;
  /** Mean colour of the image. Paint it behind a lazy image so the layout never
   *  flashes white and never shifts. */
  tint: string;
  /** Pexels photographer. The license does not require credit. Give it anyway. */
  credit: string;
  href: string;
  w: number;
  h: number;
}

export interface SiteContent {
  brand: {
    name: string;
    /** Short mark for the nav. 1 to 2 characters. */
    mark: string;
    tagline: string;
    domain: string;
  };
  nav: {
    links: Link[];
    cta: Link;
  };
  hero: {
    eyebrow: string;
    headline: string;
    /** Optional second line the skin may render in an accent or serif. */
    headlineAccent: string;
    sub: string;
    ctaPrimary: Link;
    ctaSecondary: Link;
    note: string;
  };
  logos: {
    label: string;
    items: string[];
  };
  problem: {
    eyebrow: string;
    headline: string;
    body: string;
    points: { title: string; body: string }[];
  };
  features: {
    eyebrow: string;
    headline: string;
    sub: string;
    items: { title: string; body: string; glyph: string }[];
  };
  showcase: {
    eyebrow: string;
    headline: string;
    body: string;
    bullets: string[];
  };
  stats: { value: string; label: string }[];
  /** Heading for the testimonials section. */
  proof: {
    eyebrow: string;
    headline: string;
  };
  testimonials: {
    quote: string;
    name: string;
    role: string;
    company: string;
  }[];
  /** Heading for the FAQ section. Separate from `faq`, which is the questions. */
  faqHead: {
    eyebrow: string;
    headline: string;
  };
  pricing: {
    eyebrow: string;
    headline: string;
    sub: string;
    plans: {
      name: string;
      price: string;
      period: string;
      blurb: string;
      features: string[];
      cta: string;
      featured: boolean;
    }[];
  };
  guarantee: {
    headline: string;
    body: string;
  };
  faq: { q: string; a: string }[];
  cta: {
    headline: string;
    sub: string;
    button: Link;
    note: string;
  };
  footer: {
    columns: { title: string; links: Link[] }[];
    legal: string;
  };

  /** Photography. Used by the image led skins. The other eleven ignore it. */
  images: {
    /** The single full bleed opener. */
    hero: Photo;
    /** Wide plates for full width bands. */
    bands: Photo[];
    /** Gallery tiles. Mixed subjects on purpose, a grid wants variety. */
    gallery: Photo[];
    creditLabel: string;
  };
}

export const content: SiteContent = {
  brand: {
    name: 'Meridian',
    mark: 'M',
    tagline: 'Client operations, one system.',
    domain: 'meridian.example',
  },

  nav: {
    links: [
      { label: 'Product', href: '#features' },
      { label: 'How it works', href: '#showcase' },
      { label: 'Customers', href: '#proof' },
      { label: 'Pricing', href: '#pricing' },
    ],
    cta: { label: 'Start free', href: '#cta' },
  },

  hero: {
    eyebrow: 'Now in open beta',
    headline: 'Every client, every deadline,',
    headlineAccent: 'in one place.',
    sub: 'Meridian pulls your projects, approvals, invoices and client updates into a single view, so nothing waits on someone remembering to check a thread.',
    ctaPrimary: { label: 'Start free', href: '#cta' },
    ctaSecondary: { label: 'See a live demo', href: '#showcase' },
    note: 'Free for 14 days. No card. Set up in about nine minutes.',
  },

  logos: {
    label: 'Running the day at',
    items: ['Northline', 'Fielder & Co', 'Halcyon', 'Brightpath', 'Sable Studio', 'Ostrom'],
  },

  problem: {
    eyebrow: 'The real cost',
    headline: 'The work is fine. The coordination is what kills the margin.',
    body: 'A team of eight loses roughly a day a week to status chasing. Not to the work itself, to finding out where the work stands.',
    points: [
      {
        title: 'Status lives in six places',
        body: 'A spreadsheet, a chat thread, a shared drive, someone’s inbox, a call nobody took notes on, and one person’s memory.',
      },
      {
        title: 'Clients ask because they cannot see',
        body: 'Every "quick check-in" email is a symptom. Give people a live view and the emails stop arriving.',
      },
      {
        title: 'Invoices go out late',
        body: 'Work finishes on Tuesday and bills on the following month because nobody closed the loop between delivery and billing.',
      },
    ],
  },

  features: {
    eyebrow: 'What you get',
    headline: 'Built for the parts nobody wants to own',
    sub: 'Five surfaces that replace the spreadsheet, the reminder, and the follow-up email.',
    items: [
      {
        title: 'Live client portal',
        body: 'Each client gets a read-only view of their projects, approvals and files. Branded, no login friction, always current.',
        glyph: '01',
      },
      {
        title: 'Approvals that expire',
        body: 'Send work for sign-off with a deadline attached. Silence becomes an automatic nudge instead of a stalled project.',
        glyph: '02',
      },
      {
        title: 'Billing on delivery',
        body: 'When a milestone closes, the invoice drafts itself against the scope you agreed. You review, you send.',
        glyph: '03',
      },
      {
        title: 'Capacity you can see',
        body: 'Hours committed against hours available, per person, per week. Know before you sign the next contract.',
        glyph: '04',
      },
      {
        title: 'Recaps that write themselves',
        body: 'Every Friday each client gets what moved, what is waiting on them, and what lands next week.',
        glyph: '05',
      },
      {
        title: 'One search across everything',
        body: 'Contracts, briefs, threads, files and notes. Find the decision, not the folder it might be in.',
        glyph: '06',
      },
    ],
  },

  showcase: {
    eyebrow: 'How it works',
    headline: 'Connect your tools on Monday. Run the week from one screen.',
    body: 'Meridian sits on top of the stack you already pay for. It reads from your calendar, your files and your invoicing, and gives every project a single source of truth that both sides can see.',
    bullets: [
      'Two-way sync with Google Workspace, Slack and Stripe',
      'Import an existing project in under a minute',
      'Client-side view needs no account and no password',
      'Export everything, any time, in open formats',
    ],
  },

  stats: [
    { value: '9 min', label: 'Median setup time' },
    { value: '6.5 hrs', label: 'Saved per person, per week' },
    { value: '31%', label: 'Faster time to invoice' },
    { value: '1,400+', label: 'Teams onboarded' },
  ],

  proof: {
    eyebrow: 'Customers',
    headline: 'Teams that stopped chasing status',
  },

  testimonials: [
    {
      quote:
        'We stopped having the "where are we on this" meeting. That meeting was four people, forty minutes, every week. It just does not exist anymore.',
      name: 'Dana Whitfield',
      role: 'Operations Director',
      company: 'Northline',
    },
    {
      quote:
        'The client portal did something I did not expect. Our clients started answering faster, because they could finally see what they were holding up.',
      name: 'Marcus Ilori',
      role: 'Founder',
      company: 'Fielder & Co',
    },
    {
      quote:
        'We cut twenty-two days off our average time to invoice in one quarter. That paid for the tool about nine times over.',
      name: 'Priya Raman',
      role: 'Head of Delivery',
      company: 'Halcyon',
    },
  ],

  pricing: {
    eyebrow: 'Pricing',
    headline: 'Priced per seat. Clients are free, forever.',
    sub: 'You pay for the people doing the work. Everyone you serve gets access at no cost.',
    plans: [
      {
        name: 'Solo',
        price: '$0',
        period: 'forever',
        blurb: 'For one person running their own book of clients.',
        features: ['1 seat', 'Up to 3 active clients', 'Client portal', 'Weekly recaps', 'Community support'],
        cta: 'Start free',
        featured: false,
      },
      {
        name: 'Team',
        price: '$29',
        period: 'per seat / month',
        blurb: 'For teams of three to fifty who bill for their time.',
        features: [
          'Unlimited clients and projects',
          'Approvals with deadlines',
          'Billing on delivery',
          'Capacity planning',
          'Slack, Google and Stripe sync',
          'Priority support',
        ],
        cta: 'Start 14-day trial',
        featured: true,
      },
      {
        name: 'Scale',
        price: 'Custom',
        period: 'annual',
        blurb: 'For firms with compliance, SSO and audit requirements.',
        features: [
          'Everything in Team',
          'SSO and SCIM',
          'Audit log and data residency',
          'Custom contract terms',
          'Named onboarding lead',
        ],
        cta: 'Talk to us',
        featured: false,
      },
    ],
  },

  guarantee: {
    headline: 'Sixty days. Full refund. No conversation required.',
    body: 'Run Meridian on real client work for two months. If your team is not spending less time chasing status, click refund in your billing settings and the money is back the same day. You keep every export.',
  },

  faqHead: {
    eyebrow: 'FAQ',
    headline: 'Questions people ask first',
  },

  faq: [
    {
      q: 'How long does setup actually take?',
      a: 'The median is nine minutes to a working workspace with one client imported. A full migration of an existing book of twenty clients usually takes an afternoon, and we do it with you on a call if you want.',
    },
    {
      q: 'Do my clients have to create an account?',
      a: 'No. Client views open from a signed link. Nothing to install, no password to reset, and you control what each link can see.',
    },
    {
      q: 'What happens to my data if we leave?',
      a: 'Everything exports in CSV and JSON, including files and message history, on demand and without asking us. We do not hold your data hostage as a retention strategy.',
    },
    {
      q: 'Does this replace our project tool?',
      a: 'For most teams, yes. For teams deep in a tool they like, Meridian sits on top and syncs both ways rather than forcing a migration.',
    },
    {
      q: 'Is there a contract?',
      a: 'Monthly plans are month to month and cancel in the app. Annual plans get two months free and the same sixty-day refund window.',
    },
  ],

  cta: {
    headline: 'Get the week back.',
    sub: 'Start free, import one client, and see the difference by Friday.',
    button: { label: 'Start free', href: '#' },
    note: 'No card required. Cancel in one click.',
  },

  footer: {
    columns: [
      {
        title: 'Product',
        links: [
          { label: 'Features', href: '#features' },
          { label: 'Pricing', href: '#pricing' },
          { label: 'Changelog', href: '#' },
          { label: 'Status', href: '#' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About', href: '#' },
          { label: 'Customers', href: '#proof' },
          { label: 'Careers', href: '#' },
          { label: 'Contact', href: '#' },
        ],
      },
      {
        title: 'Legal',
        links: [
          { label: 'Privacy', href: '#' },
          { label: 'Terms', href: '#' },
          { label: 'Security', href: '#' },
          { label: 'DPA', href: '#' },
        ],
      },
    ],
    legal: 'Demo content. Every word on this page comes from src/lib/content.ts.',
  },

  images: {
    hero: {
        src: '/img/hall.webp',
        alt: 'Explore the symmetry and simplicity of a modern concrete hallway in black and white.',
        tint: '#626262',
        credit: 'IAN',
        href: 'https://www.pexels.com/photo/corner-of-hallway-15663488/',
        w: 1800,
        h: 1200,
      },
    bands: [
      {
        src: '/img/curve.webp',
        alt: 'Bright modern hallway with curved walls and soft lighting, showcasing minimalist interior design.',
        tint: '#bcb0a6',
        credit: 'DOAN THANH BINH',
        href: 'https://www.pexels.com/photo/modern-minimalist-interior-hallway-with-soft-lighting-36887535/',
        w: 1400,
        h: 933,
      },
      {
        src: '/img/spiral.webp',
        alt: 'Abstract view of a modern spiral staircase, showcasing geometric curves and light dynamics.',
        tint: '#6d6d6d',
        credit: 'Masood Aslami',
        href: 'https://www.pexels.com/photo/a-black-and-white-photo-of-a-spiral-staircase-27781606/',
        w: 1400,
        h: 933,
      },
      {
        src: '/img/maker.webp',
        alt: 'A focused architect working on a design at home with ambient daylight.',
        tint: '#5a4e45',
        credit: 'Ron Lach',
        href: 'https://www.pexels.com/photo/architect-working-at-desk-in-home-9618112/',
        w: 1400,
        h: 933,
      },
      {
        src: '/img/corridor.webp',
        alt: 'Perspective view of empty hallway with entrance door and illuminated ceiling in contemporary workplace',
        tint: '#878682',
        credit: 'Max Vakhtbovych',
        href: 'https://www.pexels.com/photo/long-corridor-in-modern-office-7534167/',
        w: 1400,
        h: 935,
      },
    ],
    gallery: [
      {
        src: '/img/atelier.webp',
        alt: 'Fashion designers working together in a modern atelier with sewing machines and patterns.',
        tint: '#7d6d5e',
        credit: 'Ron Lach',
        href: 'https://www.pexels.com/photo/people-working-in-an-atelier-9850083/',
        w: 900,
        h: 600,
      },
      {
        src: '/img/drafting.webp',
        alt: 'A creative architect working at home, reviewing blueprints with coffee.',
        tint: '#5b5149',
        credit: 'Ron Lach',
        href: 'https://www.pexels.com/photo/architect-working-at-home-at-desk-9618104/',
        w: 900,
        h: 600,
      },
      {
        src: '/img/sketch.webp',
        alt: 'From above of sketchbook with sketches of new collection of clothes placed on white table in modern light professional studio with various folders',
        tint: '#807e7a',
        credit: 'Anete Lusina',
        href: 'https://www.pexels.com/photo/sketchbook-with-design-of-clothes-7256861/',
        w: 900,
        h: 601,
      },
      {
        src: '/img/blueprint.webp',
        alt: 'A creative workspace with architectural tools, blueprints, and sketches for design projects.',
        tint: '#75726d',
        credit: 'Tima Miroshnichenko',
        href: 'https://www.pexels.com/photo/floor-plans-on-white-table-6615036/',
        w: 900,
        h: 600,
      },
      {
        src: '/img/meeting.webp',
        alt: 'A diverse team gathered for a meeting in a modern office with creative decor, discussing plans.',
        tint: '#968a7a',
        credit: 'RDNE Stock project',
        href: 'https://www.pexels.com/photo/business-people-having-a-meeting-7889241/',
        w: 900,
        h: 600,
      },
      {
        src: '/img/loft.webp',
        alt: 'Bright minimalist interior space with white walls and modern equipment cart.',
        tint: '#d3d4d3',
        credit: 'The Juggle Studio',
        href: 'https://www.pexels.com/photo/a-cart-with-an-equipment-in-a-white-apartment-20314949/',
        w: 900,
        h: 600,
      },
      {
        src: '/img/facade.webp',
        alt: 'A modern concrete building facade with repetitive windows creating a minimalistic architectural pattern.',
        tint: '#747a6d',
        credit: 'David Yu',
        href: 'https://www.pexels.com/photo/a-brown-concrete-building-with-glass-windows-and-stained-wall-9473066/',
        w: 900,
        h: 601,
      },
      {
        src: '/img/workshop.webp',
        alt: 'A diverse group of professionals in a creative workspace discussing ideas and planning on a whiteboard.',
        tint: '#ac9a72',
        credit: 'Moe Magners',
        href: 'https://www.pexels.com/photo/men-presenting-using-a-whiteboard-7495605/',
        w: 900,
        h: 600,
      },
      {
        src: '/img/glass.webp',
        alt: 'Modern architectural detail showcasing a bridge with glass facade and sleek design.',
        tint: '#6d7577',
        credit: 'Mathias Reding',
        href: 'https://www.pexels.com/photo/low-angle-view-of-overpass-bridge-joining-buildings-9845176/',
        w: 900,
        h: 600,
      },
    ],
    creditLabel: 'Photography from Pexels',
  },
};
