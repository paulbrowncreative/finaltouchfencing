// Verbatim excerpts of public Yelp reviews (as republished on Yahoo Local / MapQuest, Oct 2026).
// Text ends where the public excerpt ends — do not extend or paraphrase. Full text lives on Yelp.
// No rating markup is emitted for these: self-serving review markup on a LocalBusiness is not eligible.

export const reviews = [
  {
    name: 'Paul T.',
    date: '2025-06-20',
    platform: 'Yelp',
    rating: 5,
    text: 'I got estimates from four fencing companies. Final Touch Fencing had the best price. Robert and Marisa were very helpful throughout the entire process. They answered all my questions and…',
    topic: 'price',
  },
  {
    name: 'Dustin B.',
    date: '2025-05-31',
    platform: 'Yelp',
    rating: 5,
    text: 'beyond happy with Final Touch fencing! they put in a brand new shadow box privacy fence around our entire yard, the also put a gate across our driveway and a gate on the lawn. they DIDN’T use…',
    topic: 'shadowbox',
  },
  {
    name: 'Maria W.',
    date: '2025-05-09',
    platform: 'Yelp',
    rating: 5,
    text: 'Final Touch Fencing installed my wooden fence and I am extremely happy. I requested an estimate and they came out promptly and provided an estimate the next day and they offered a very reasonable…',
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

export const reviewSummary = { platform: 'Yelp', count: 4, average: 5.0 };

export const formatReviewDate = (iso) =>
  new Date(iso + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
