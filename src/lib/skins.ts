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
    archetype: 'Acid Bento',
    swipeRef: '',
    useFor: 'Modern SaaS with an edge. Type wall hero, then an asymmetric bento grid.',
    swatches: ['#0E1012', '#D4FF3D', '#F2F3EF'],
    cardBg: '#0E1012',
    cardFg: '#F2F3EF',
    cardMuted: '#7C837C',
    cardAccent: '#D4FF3D',
    cardFont: "'Geist', system-ui, sans-serif",
    cardWeight: '600',
    cardTracking: '-0.055em',
  },
  {
    id: 'studio',
    name: 'Studio',
    archetype: 'Horizontal Editorial',
    swipeRef: '',
    useFor: 'Agency, portfolio, creative studio. Features pin and scroll sideways.',
    swatches: ['#E5E2DA', '#E8391B', '#14140F'],
    cardBg: '#E5E2DA',
    cardFg: '#14140F',
    cardMuted: '#62604F',
    cardAccent: '#E8391B',
    cardFont: "'Bricolage Grotesque', system-ui, sans-serif",
    cardWeight: '800',
    cardTracking: '-0.055em',
  },
  {
    id: 'canvas',
    name: 'Canvas',
    archetype: 'Diagonal Scrollytelling',
    swipeRef: '',
    useFor: 'Product stories told in order. A sticky stage that changes with every step.',
    swatches: ['#EFE8DA', '#A64B28', '#16261C'],
    cardBg: '#EFE8DA',
    cardFg: '#16261C',
    cardMuted: '#5C6B60',
    cardAccent: '#A64B28',
    cardFont: "'Schibsted Grotesk', system-ui, sans-serif",
    cardWeight: '700',
    cardTracking: '-0.055em',
  },
  {
    id: 'prism',
    name: 'Prism',
    archetype: 'Slab Stack',
    swipeRef: '',
    useFor: 'Launch pages with weight. Feature slabs stack, shrink and dim on scroll.',
    swatches: ['#4A0E1A', '#E0A458', '#EFE7DA'],
    cardBg: '#4A0E1A',
    cardFg: '#EFE7DA',
    cardMuted: '#B0A096',
    cardAccent: '#E0A458',
    cardFont: "'Darker Grotesque', system-ui, sans-serif",
    cardWeight: '800',
    cardTracking: '-0.04em',
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
