// Single source of truth for business facts (NAP, hours, profiles).
// Every value here is sourced from the business's own listings — see research/online-presence-audit.md.
// Items marked CONFIRM conflict across listings and should be verified with the owner before launch.

export const site = {
  name: 'Final Touch Fencing',
  legalName: 'Final Touch Fencing LLC',
  url: 'https://www.finaltouchfencing.com', // CONFIRM: domain not yet registered
  phone: '(810) 614-4181',
  phoneHref: 'tel:+18106144181',
  phoneE164: '+18106144181',
  email: 'finaltouchfencing@gmail.com',
  // Street address is listed publicly on Yelp/Angi but appears to be a residence.
  // Shown site-wide as city-level only until the owner decides (service-area business).
  address: {
    street: '22028 Fresard St', // CONFIRM before publishing
    showStreet: false,
    city: 'St. Clair Shores',
    region: 'MI',
    postalCode: '48080',
    country: 'US',
  },
  // Majority of listings (Yelp, Yahoo, MapQuest). Angi says 9–5; Thumbtack says 7 days 8–6. CONFIRM.
  hours: [{ days: 'Monday – Friday', open: '8:00 AM', close: '5:00 PM' }],
  hoursSchema: [{ days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '17:00' }],
  paymentMethods: ['Cash', 'Check', 'Credit card', 'Venmo', 'Cash App'],
  owners: 'Robert and Marisa',
  profiles: {
    yelp: 'https://www.yelp.com/biz/final-touch-fencing-saint-clair-shores',
    facebook: 'https://www.facebook.com/61575176697905/',
    thumbtack: 'https://www.thumbtack.com/mi/algonac/fences/final-touch-fencing-llc/service/552851054992007177',
    angi: 'https://www.angi.com/companylist/us/mi/algonac/final-touch-fencing-llc-reviews-154055872.htm',
    homeadvisor: 'https://www.homeadvisor.com/rated.FinalTouchFencingLLC.154055872.html',
  },
};

export const nav = [
  { label: 'Services', href: '/services/' },
  { label: 'Service Areas', href: '/service-areas/' },
  { label: 'Our Work', href: '/our-work/' },
  { label: 'Reviews', href: '/reviews/' },
  { label: 'About', href: '/about/' },
  { label: 'Resources', href: '/resources/' },
];
