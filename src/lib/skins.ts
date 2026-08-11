export interface SkinMeta {
  id: string;
  name: string;
  archetype: string;
  /** Slug of the source ref in the swipe library (swipe.neilb.app). */
  swipeRef: string;
  /** One line: when to reach for this skin. */
  useFor: string;
  /** Three-swatch preview for the gallery card, dark-to-light order is fine. */
  swatches: [string, string, string];
  /** Card background + text so the gallery previews the mood, not just swatches. */
  cardBg: string;
  cardFg: string;
  cardMuted: string;
  cardAccent: string;
  /** Font stack used on the gallery card title. */
  cardFont: string;
  cardWeight: string;
  cardTracking: string;
}

export const skins: SkinMeta[] = [
  {
    id: 'linear',
    name: 'Linear Dark',
    archetype: 'Dark SaaS',
    swipeRef: 'linear-dark',
    useFor: 'App and product launches. The default for anything with a UI.',
    swatches: ['#08090A', '#5E6AD2', '#F7F8F8'],
    cardBg: '#08090A',
    cardFg: '#F7F8F8',
    cardMuted: '#8A8F98',
    cardAccent: '#7C74F6',
    cardFont: "'Inter', system-ui, sans-serif",
    cardWeight: '600',
    cardTracking: '-0.03em',
  },
  {
    id: 'stripe',
    name: 'Stripe Corporate',
    archetype: 'Clean Corporate',
    swipeRef: 'stripe-corporate',
    useFor: 'B2B services, client sites, anything that has to look trustworthy.',
    swatches: ['#635BFF', '#00D4FF', '#0A2540'],
    cardBg: '#FFFFFF',
    cardFg: '#0A2540',
    cardMuted: '#425466',
    cardAccent: '#635BFF',
    cardFont: "'Inter', system-ui, sans-serif",
    cardWeight: '700',
    cardTracking: '-0.02em',
  },
  {
    id: 'aesop',
    name: 'Aesop Editorial',
    archetype: 'Editorial Luxury',
    swipeRef: 'aesop-editorial',
    useFor: 'Personal brand, high ticket, luxury. Calm and expensive.',
    swatches: ['#F3F0EA', '#5A5F4A', '#1A1815'],
    cardBg: '#F3F0EA',
    cardFg: '#1A1815',
    cardMuted: '#6B6559',
    cardAccent: '#5A5F4A',
    cardFont: "'EB Garamond', Georgia, serif",
    cardWeight: '400',
    cardTracking: '-0.01em',
  },
  {
    id: 'gumroad',
    name: 'Gumroad Bold',
    archetype: 'Bold Type-Driven',
    swipeRef: 'gumroad-bold-type',
    useFor: 'Offers, productized services, anything that should shout.',
    swatches: ['#FF90E8', '#FFC900', '#000000'],
    cardBg: '#FFFFFF',
    cardFg: '#000000',
    cardMuted: '#3D3D3D',
    cardAccent: '#FF90E8',
    cardFont: "'Archivo', system-ui, sans-serif",
    cardWeight: '900',
    cardTracking: '-0.04em',
  },
  {
    id: 'longform',
    name: 'AG1 Longform',
    archetype: 'Long-Form Sales',
    swipeRef: 'ag1-longform',
    useFor: 'Long-form sales and VSL pages. Quiz entry, proof stack, sticky CTA.',
    swatches: ['#EFE9DE', '#1E3A2B', '#B08D3F'],
    cardBg: '#EFE9DE',
    cardFg: '#1B1A17',
    cardMuted: '#6A6558',
    cardAccent: '#1E3A2B',
    cardFont: "'Fraunces', Georgia, serif",
    cardWeight: '600',
    cardTracking: '-0.02em',
  },
  {
    id: 'aurora',
    name: 'Aurora',
    archetype: 'Glass Bento',
    swipeRef: '',
    useFor: 'AI and modern SaaS. The Framer template look, on an asymmetric bento grid.',
    swatches: ['#07070C', '#A78BFA', '#22D3EE'],
    cardBg: '#07070C',
    cardFg: '#F4F4F7',
    cardMuted: '#8B8C99',
    cardAccent: '#A78BFA',
    cardFont: "'Instrument Sans', system-ui, sans-serif",
    cardWeight: '500',
    cardTracking: '-0.045em',
  },
  {
    id: 'studio',
    name: 'Studio',
    archetype: 'Horizontal Agency',
    swipeRef: '',
    useFor: 'Agency, portfolio, creative studio. Features pin and scroll sideways.',
    swatches: ['#F2F0EB', '#FF4A1C', '#0D0D0D'],
    cardBg: '#F2F0EB',
    cardFg: '#0D0D0D',
    cardMuted: '#5F5C56',
    cardAccent: '#FF4A1C',
    cardFont: "'Bricolage Grotesque', system-ui, sans-serif",
    cardWeight: '800',
    cardTracking: '-0.055em',
  },
  {
    id: 'canvas',
    name: 'Canvas',
    archetype: 'Sticky Scrollytelling',
    swipeRef: '',
    useFor: 'Product stories told in order. A sticky stage that changes with every step.',
    swatches: ['#FBFBFD', '#3B5BFF', '#0B0F1A'],
    cardBg: '#FBFBFD',
    cardFg: '#0B0F1A',
    cardMuted: '#646B7D',
    cardAccent: '#3B5BFF',
    cardFont: "'Sora', system-ui, sans-serif",
    cardWeight: '700',
    cardTracking: '-0.05em',
  },
  {
    id: 'prism',
    name: 'Prism',
    archetype: 'Stacking Cards',
    swipeRef: '',
    useFor: 'Launch pages with energy. Feature cards stack, shrink and dim on scroll.',
    swatches: ['#0B0616', '#F43F8E', '#38BDF8'],
    cardBg: '#0B0616',
    cardFg: '#F6F3FF',
    cardMuted: '#9086AB',
    cardAccent: '#F43F8E',
    cardFont: "'Space Grotesk', system-ui, sans-serif",
    cardWeight: '700',
    cardTracking: '-0.055em',
  },
  {
    id: 'wire',
    name: 'Wireframe',
    archetype: 'Structure Only',
    swipeRef: '',
    useFor: 'Drop copy in, see the skeleton. Decide the look after the structure works.',
    swatches: ['#FFFFFF', '#D4D4D4', '#171717'],
    cardBg: '#FAFAFA',
    cardFg: '#171717',
    cardMuted: '#8A8A8A',
    cardAccent: '#171717',
    cardFont: "'JetBrains Mono', ui-monospace, monospace",
    cardWeight: '500',
    cardTracking: '-0.02em',
  },
];

export const skinById = (id: string) => skins.find((s) => s.id === id);
