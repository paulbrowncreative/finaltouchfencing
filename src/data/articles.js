export const articles = [
  {
    slug: 'fence-permits-st-clair-shores-macomb-county',
    title: 'Fence Permit Rules in St. Clair Shores, Chesterfield, Macomb Twp., Harper Woods & Clay Twp.',
    navTitle: 'Fence permit rules by city',
    seoTitle: 'Fence Permit Rules by City: St. Clair Shores & Macomb County',
    description: 'Fence rules compared for St. Clair Shores, Chesterfield, Macomb Twp., Harper Woods and Clay Twp.: heights, front yards, waterfront lots and fees.',
    summary: 'Heights, front yards, waterfront and corner lots, fees and timelines, compared from each city’s own ordinance.',
    published: '2026-10-07',
  },
  {
    slug: 'wood-vs-vinyl-vs-aluminum-fence',
    title: 'Wood vs. Vinyl vs. Aluminum vs. Chain Link: Choosing a Fence in Michigan',
    navTitle: 'Choosing a fence material',
    seoTitle: 'Wood vs. Vinyl vs. Aluminum Fence: Choosing in Michigan',
    description: 'How wood, vinyl, aluminum and chain link fences compare on privacy, upkeep, cost and local rules for Macomb County and Metro Detroit homes.',
    summary: 'Privacy, upkeep, cost and where local rules point you to one material over another.',
    published: '2026-10-07',
  },
  {
    slug: 'preparing-for-fence-installation',
    title: 'How to Prepare for a Fence Installation: A Michigan Homeowner’s Checklist',
    navTitle: 'Preparing for installation',
    seoTitle: 'How to Prepare for Fence Installation: Michigan Checklist',
    description: 'Property lines, HOA approval, permits, MISS DIG 811, private utility lines and what to clear before your fence crew arrives.',
    summary: 'Property lines, HOA approval, permits, MISS DIG 811 and the private lines utilities don’t mark.',
    published: '2026-10-07',
  },
];
export const articleBySlug = Object.fromEntries(articles.map((a) => [a.slug, a]));
