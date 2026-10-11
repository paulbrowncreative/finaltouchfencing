// Verbatim excerpts of public Yelp reviews (as republished on Yahoo Local / MapQuest, Oct 2026).
// Text ends where the public excerpt ends — do not extend or paraphrase. Full text lives on Yelp.
// No rating markup is emitted for these: self-serving review markup on a LocalBusiness is not eligible.

export const reviews = [
  {
    name: 'Paul T.',
    date: '2025-06-20',
    platform: 'Yelp',
    rating: 5,
    text: 'I got estimates from four fencing companies. Final Touch Fencing had the best price. Robert and Marisa were very helpful throughout the entire process.',
    topic: 'price',
  },
  {
    name: 'Dustin B.',
    date: '2025-05-31',
    platform: 'Yelp',
    rating: 5,
    text: 'Beyond happy with Final Touch Fencing! They put in a brand-new shadow box privacy fence around our entire yard. They also put a gate across our driveway and a gate on the lawn.',
    topic: 'shadowbox',
  },
  {
    name: 'Maria W.',
    date: '2025-05-09',
    platform: 'Yelp',
    rating: 5,
    text: 'Final Touch Fencing installed my wooden fence, and I am extremely happy. I requested an estimate, and they came out promptly and provided an estimate the next day.',
    topic: 'speed',
  },
  {
    name: 'William B.',
    date: '2025-10-12',
    platform: 'Yelp',
    rating: 5,
    text: 'Great job. Answered the question call prompt. Reasonable quote. Great company to work with.',
    topic: 'communication',
  },
];

// Text is verbatim from Yelp. Yelp shares only the opening of each review outside its own site, so the
// three longer reviews end at their last complete sentence; each card links to the full review on Yelp.
export const reviewSummary = { platform: 'Yelp', count: 4, average: 5.0 };

export const formatReviewDate = (iso) =>
  new Date(iso + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
