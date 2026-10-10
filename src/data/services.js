// Service pages. Only services the business lists on its own profiles (Angi, Yelp, Thumbtack) are included.
// Body copy is HTML (rendered with set:html) so it can carry contextual internal links.
// Copy follows docs/brand-voice.md.
//   name    – Title Case label for navigation, footer and link lists
//   heading – sentence-case label for headings
//   noun    – singular phrase for templated copy ("Free {noun} estimate", "Recent {noun} projects")

export const services = [
  {
    slug: 'fence-installation',
    name: 'Fence Installation',
    heading: 'Fence installation',
    noun: 'fence installation',
    short: 'New fences built from the posts up in wood, vinyl and aluminum.',
    title: 'Fence Installation in St. Clair Shores & Macomb | Final Touch',
    description:
      'New fence installation in St. Clair Shores, Harper Woods, Chesterfield and nearby. Wood, vinyl and aluminum fences. Free estimates: (810) 614-4181.',
    h1: 'Fence installation',
    lede:
      'A new fence is a few days of work and decades of looking at it. We measure on site, price it in writing and build it straight, plumb and set deep enough to stay that way.',
    hero: 'panorama',
    gallery: ['deckSunset', 'crew', 'shadowGate', 'aluGate', 'brickHouse', 'backyardTree'],
    sections: [
      {
        h2: 'What we install',
        html: `<p>We install residential fences in every common material, plus the gates that go with them:</p>
<ul class="link-list">
<li><a href="/services/wood-fencing/">Wood fences</a> — privacy, shadow box, picket and split rail</li>
<li><a href="/services/vinyl-fencing/">Vinyl fences</a> — low-maintenance privacy panels and gates</li>
<li><a href="/services/aluminum-fencing/">Aluminum fences</a> — open, decorative and well suited to waterfront lots</li>
<li><a href="/services/gates/">Gates</a> — walk gates, double drive gates and driveway gates</li>
</ul>`,
      },
      {
        h2: 'How a fence installation works',
        html: `<ol class="steps">
<li><strong>Quote request.</strong> Call <a href="tel:+18106144181" data-track="phone">(810) 614-4181</a> or send the <a href="/contact/">quote form</a>. Tell us roughly where the fence goes and what you have in mind.</li>
<li><strong>On-site estimate.</strong> We walk the property, measure the run, note grade changes, gates, trees and any existing fence, and give you a written price. Reviewers mention getting their estimate the next day.</li>
<li><strong>Permit and utility marking.</strong> Most communities we serve require a fence permit before work starts. Michigan law also requires utility lines to be marked through MISS DIG 811 at least three business days before anyone digs. See our <a href="/blog/fence-permit-rules-macomb-county/">fence permit guide</a>.</li>
<li><strong>Build.</strong> Posts go in first, then rails, boards or panels, then gates and hardware.</li>
<li><strong>Walkthrough.</strong> We check gate swing and latch, clean up and go over the finished fence with you. If your city requires a final inspection, it happens after the build.</li>
</ol>`,
      },
      {
        h2: 'Details that decide how long a fence lasts',
        html: `<p>Most fence problems trace back to the posts. Michigan frost heaves shallow posts out of the ground and leaves fences leaning within a few winters. St. Clair Shores, for example, requires posts set at least 42 inches below grade in concrete or an accepted equivalent. We set posts to the depth your city requires and keep lines straight across uneven yards. Read more in <a href="/blog/why-fence-posts-lean/">why fence posts lean</a>.</p>
<p>We also watch the details neighbors notice: the finished side facing out where the ordinance requires it, a consistent gap at the bottom and gates that close on their own weight without dragging.</p>`,
      },
      {
        h2: 'Replacing an old fence',
        html: `<p>If an existing fence is coming out, say so in your quote request so we can price the removal. Before you tear out a fence on a property line, confirm it’s yours. St. Clair Shores asks on its permit application whether ownership of an existing fence has been determined, and the city won’t decide it for you. Our guide to <a href="/blog/fence-on-property-line/">fences on the property line</a> covers the details.</p>`,
      },
    ],
    faqs: [
      { q: 'How long does a fence installation take?', a: 'It depends on length, material and gates. A typical backyard takes a few days of work once the permit is issued and utilities are marked. We give you a schedule with your estimate.' },
      { q: 'Do I need a permit?', a: 'In most of the communities we serve, yes. St. Clair Shores, Chesterfield Township, Macomb Township and Clay Township all require a fence or zoning permit. Our <a href="/blog/fence-permit-rules-macomb-county/">fence permit guide</a> covers the details by city.' },
      { q: 'Is the estimate free?', a: 'Yes. Estimates are free and come with no obligation.' },
      { q: 'How do I pay?', a: 'We accept cash, check, credit card, Venmo and Cash App.' },
    ],
  },
  {
    slug: 'wood-fencing',
    name: 'Wood Fencing',
    heading: 'Wood fencing',
    noun: 'wood fence',
    short: 'Privacy, shadow box, picket and split rail fences built from wood.',
    title: 'Wood Fence Installation: Privacy, Shadow Box & Picket | Final Touch',
    description:
      'Wood privacy, shadow box, picket and split rail fences in St. Clair Shores, Harper Woods and Macomb County. See real projects and get a free estimate.',
    h1: 'Wood fence installation',
    lede:
      'Wood is most of what we build. It’s affordable, it can be cut to fit any yard, and it can be stained to match your home or left to weather naturally.',
    hero: 'shadowCorner',
    gallery: ['shadowWide', 'shadowBrick', 'picket', 'splitRail', 'betweenHouses', 'sideYardDog'],
    sections: [
      {
        h2: 'Wood fence styles we build',
        html: `<dl class="defs">
<dt>Privacy fence</dt><dd>Boards butted tight for full screening. The standard choice for backyards, pools and dogs.</dd>
<dt>Shadow box fence</dt><dd>Boards alternate on each side of the rails, so the fence looks finished from both sides and lets some air through. A good choice when the fence faces a street or a neighbor.</dd>
<dt>Picket fence</dt><dd>Spaced pickets, including pointed French Gothic tops, for front yards and gardens where you want definition rather than screening.</dd>
<dt>Split rail fence</dt><dd>Open post-and-rail fencing. It marks a boundary or frames a driveway without blocking the view, and it’s often the only style allowed in a front yard.</dd>
</dl>`,
      },
      {
        h2: 'Privacy fence vs. shadow box fence',
        html: `<p>Both give you a 6-foot screen. A solid privacy fence blocks every sightline but takes the full force of the wind, and one side shows the posts and rails. A shadow box fence costs more in material but looks good from both sides. That matters in places like <a href="/service-areas/harper-woods/">Harper Woods</a> and <a href="/service-areas/macomb-township/">Macomb Township</a>, where the ordinance requires the finished side to face the neighbor or the street. Our <a href="/blog/shadow-box-vs-privacy-fence/">shadow box vs. privacy fence guide</a> goes deeper.</p>`,
      },
      {
        h2: 'Staining and upkeep',
        html: `<p>New pressure-treated lumber needs time to dry before it takes stain well. After that, a cleaning and a fresh coat of stain every few years keep the color even and slow checking and graying. We handle that too. See <a href="/services/fence-staining/">fence staining and power washing</a> and our guide on <a href="/blog/when-to-stain-a-wood-fence/">when to stain a wood fence</a>.</p>`,
      },
    ],
    faqs: [
      { q: 'How tall can a wood privacy fence be?', a: 'Most of our communities cap side and rear yard fences at 6 feet. St. Clair Shores allows privacy fences up to 6 feet 6 inches overall, with panels no taller than 6 feet. Front yards are far more restricted. See <a href="/blog/how-tall-can-a-fence-be/">how tall a fence can be</a> in each city.' },
      { q: 'Which side of the fence faces my neighbor?', a: 'Most local ordinances require the finished side to face out toward neighbors and streets. A shadow box fence avoids the question because both sides look the same.' },
      { q: 'Can a wood fence go on a waterfront or canal lot?', a: 'Often not as a privacy fence. St. Clair Shores prohibits privacy fences on waterfront and canal lots, and Chesterfield Township prohibits them outside the building envelope. Open styles such as <a href="/services/aluminum-fencing/">aluminum</a> are the usual answer.' },
    ],
  },
  {
    slug: 'privacy-fencing',
    name: 'Privacy Fencing',
    heading: 'Privacy fencing',
    noun: 'privacy fence',
    short: '6-foot wood and vinyl privacy fences that are tall, tight and built to code.',
    title: 'Privacy Fence Installation: Wood & Vinyl | Final Touch Fencing',
    description:
      'Wood and vinyl privacy fences built to local height and placement rules in St. Clair Shores, Harper Woods and Chesterfield. Free estimates.',
    h1: 'Privacy fence installation',
    lede:
      'A privacy fence has one job: block the view and keep the yard yours. We build them in wood and vinyl, up to the height your city allows, with gates that latch every time.',
    hero: 'deckSunset',
    gallery: ['cornerSidewalk', 'maple', 'brickHouse', 'woodedSide', 'doubleGate', 'vinylSingle'],
    sections: [
      {
        h2: 'Wood or vinyl privacy fence?',
        html: `<p><a href="/services/wood-fencing/">Wood privacy fences</a> cost less up front, can follow any grade and can be stained. <a href="/services/vinyl-fencing/">Vinyl privacy fences</a> cost more but never need stain or paint, and a hose rinse keeps them clean. If the fence will be seen from the street, consider a wood shadow box fence, which looks finished from both sides. Compare all four materials in our <a href="/blog/wood-vs-vinyl-vs-aluminum-fence/">fence material guide</a>.</p>`,
      },
      {
        h2: 'Height and placement rules',
        html: `<p>Local ordinances regulate privacy fences more closely than any other fence type:</p>
<ul>
<li><strong>Height.</strong> Usually 6 feet in side and rear yards. St. Clair Shores allows 6 feet 6 inches overall.</li>
<li><strong>Front yards.</strong> Solid fences generally aren’t allowed in front of the house. Corner lots have their own step-down and sight-line rules. See <a href="/blog/corner-lot-fence-rules/">corner lot fence rules</a>.</li>
<li><strong>Waterfront lots.</strong> <a href="/service-areas/st-clair-shores/">St. Clair Shores</a> prohibits privacy fences on waterfront and canal lots, and <a href="/service-areas/chesterfield-township/">Chesterfield Township</a> prohibits them outside the building envelope.</li>
</ul>
<p>We plan the layout around these rules at the estimate, so the fence you approve is one the city will approve.</p>`,
      },
      {
        h2: 'Privacy fences for dogs',
        html: `<p>A solid fence also keeps dogs calmer, because they can’t see what’s passing by. We keep the bottom gap tight (St. Clair Shores caps it at 3 inches) and add self-closing gate hardware on request. More in <a href="/blog/best-fence-for-dogs/">the best fence for dogs</a>.</p>`,
      },
    ],
    faqs: [
      { q: 'Can I put a privacy fence in my front yard?', a: 'Generally no. Front-yard fences in our area are limited to low, decorative, see-through styles, and the limits vary by city: 3 feet and ornamental in Harper Woods, or split rail 24–42 inches in Chesterfield Township.' },
      { q: 'I live on a canal. Can I get a privacy fence?', a: 'Not in St. Clair Shores, where the ordinance prohibits privacy fences on waterfront and canal lots. In Chesterfield Township, they aren’t allowed outside the building envelope. Open aluminum fencing is the usual alternative.' },
      { q: 'Do privacy fences need a permit?', a: 'In most of the communities we serve, yes. Check the <a href="/blog/fence-permit-rules-macomb-county/">fence permit guide</a> for your city.' },
    ],
  },
  {
    slug: 'vinyl-fencing',
    name: 'Vinyl Fencing',
    heading: 'Vinyl fencing',
    noun: 'vinyl fence',
    short: 'Clean white vinyl privacy fence and gates with no staining or painting.',
    title: 'Vinyl Fence Installation in St. Clair Shores, MI | Final Touch',
    description:
      'Vinyl privacy fence and gate installation for homes in St. Clair Shores, Harper Woods, Chesterfield and nearby. No painting, no staining. Free estimates.',
    h1: 'Vinyl fence installation',
    lede: 'Vinyl is the low-maintenance choice. There’s nothing to stain or seal, it holds its color, and a hose rinse cleans it up.',
    hero: 'vinylDouble',
    gallery: ['vinylSingle', 'vinylDouble'],
    sections: [
      {
        h2: 'Why homeowners choose vinyl',
        html: `<ul>
<li><strong>No refinishing.</strong> Vinyl never needs stain, sealer or paint.</li>
<li><strong>Clean lines.</strong> Panels and posts are uniform, so long runs look consistent.</li>
<li><strong>Finished on both sides.</strong> Most vinyl privacy panels look the same from either side, which helps with ordinances that require the finished side to face the neighbor.</li>
</ul>`,
      },
      {
        h2: 'Vinyl gates',
        html: `<p>We install matching vinyl walk gates and double gates wide enough for mowers and trailers. Gates on a vinyl fence need reinforced posts and hardware rated for the gate’s weight, and we size both to the opening. See <a href="/services/gates/">gate installation</a> and our <a href="/blog/choosing-a-fence-gate/">gate buying guide</a>.</p>`,
      },
      {
        h2: 'Where vinyl fits',
        html: `<p>A vinyl privacy fence works in backyards and side yards anywhere a solid fence is allowed. On waterfront and canal lots where privacy fences are restricted, choose <a href="/services/aluminum-fencing/">aluminum</a> instead.</p>`,
      },
    ],
    faqs: [
      { q: 'Does a vinyl fence need maintenance?', a: 'Very little. An occasional wash with a hose or mild soap removes dirt and mildew. There’s no staining or painting.' },
      { q: 'Is vinyl more expensive than wood?', a: 'Usually, up front. It saves the cost of staining and refinishing over the years. We can price both so you can compare.' },
    ],
  },
  {
    slug: 'aluminum-fencing',
    name: 'Aluminum Fencing',
    heading: 'Aluminum fencing',
    noun: 'aluminum fence',
    short: 'Black ornamental aluminum that’s open, rust-free and right for waterfront lots.',
    title: 'Aluminum Fence Installation & Waterfront Fencing | Final Touch',
    description:
      'Black aluminum fences for yards, pools and waterfront lots in St. Clair Shores and Chesterfield Township. Local waterfront rules and free quotes.',
    h1: 'Aluminum fence installation',
    lede:
      'Aluminum gives you the look of wrought iron without the rust. It’s open, so it keeps the view, and it’s often the one fence type allowed on a waterfront lot.',
    hero: 'aluWater',
    gallery: ['aluGate', 'aluGateWide', 'aluYard', 'crew'],
    sections: [
      {
        h2: 'Built for waterfront properties',
        html: `<p>Lake St. Clair, Anchor Bay and the canals that feed them shape the fence rules here. <a href="/service-areas/st-clair-shores/">St. Clair Shores</a> doesn’t allow privacy fences on waterfront or canal lots. <a href="/service-areas/chesterfield-township/">Chesterfield Township</a> allows only see-through decorative aluminum or wrought iron, no taller than 48 inches, in the water-side front yard of lots on Anchor Bay and the Salt River. Aluminum meets those rules and keeps your view of the water. Read our full guide to <a href="/blog/waterfront-canal-fence-rules/">waterfront and canal fence rules</a>.</p>`,
      },
      {
        h2: 'Where else aluminum works',
        html: `<ul>
<li><strong>Front yards.</strong> Where a city allows a low decorative fence in front of the house, black aluminum is a clean option. Check your city’s height limit first.</li>
<li><strong>Pools.</strong> Pool barriers are governed by the building code, not the fence ordinance. Tell us the fence is for a pool, and we’ll plan the height and gate hardware around it.</li>
<li><strong>Pets.</strong> Picket spacing keeps most medium and large dogs in while leaving the yard open to view.</li>
</ul>`,
      },
    ],
    faqs: [
      { q: 'Will an aluminum fence rust?', a: 'No. Aluminum doesn’t rust the way steel or iron does, which is why it holds up well near the water.' },
      { q: 'Can I fence the water side of my lot?', a: 'It depends on your city. In Chesterfield Township, only see-through decorative aluminum or wrought iron up to 48 inches is allowed in the water-side front yard on Anchor Bay and the Salt River. Call us with your address, and we’ll check the rules for your lot.' },
    ],
  },
  {
    slug: 'gates',
    name: 'Gates',
    heading: 'Gates',
    noun: 'gate',
    short: 'Walk gates, double drive gates and driveway gates that swing true and latch.',
    title: 'Gate Installation: Walk, Double & Driveway Gates | Final Touch',
    description:
      'Wood, vinyl and aluminum gate installation: walk gates, double drive gates and driveway gates in St. Clair Shores, Harper Woods and Macomb County.',
    h1: 'Gate installation',
    lede: 'You use the gate more than any other part of the fence. It has to swing freely, latch every time and stay square for years.',
    hero: 'doubleGate',
    gallery: ['aluGate', 'shadowGate', 'splitRail', 'vinylDouble', 'brickHouse'],
    sections: [
      {
        h2: 'Gates we install',
        html: `<ul>
<li><strong>Walk gates</strong> for side yards and garden access, in wood, vinyl or aluminum to match the fence.</li>
<li><strong>Double drive gates</strong> wide enough for a mower, trailer or car.</li>
<li><strong>Driveway gates</strong> on split rail and other open fences.</li>
</ul>
<p>One customer had us put a gate across the driveway and another on the lawn as part of a full-yard shadow box fence. <a href="/reviews/">Read the review</a>.</p>`,
      },
      {
        h2: 'Why gates sag and how we prevent it',
        html: `<p>A gate sags when its hinge post moves or the frame racks. We set gate posts solidly, brace wood gates diagonally against the direction they want to drop and use heavy strap hinges sized to the gate. On wide openings, a double gate splits the weight between two posts. See our <a href="/blog/choosing-a-fence-gate/">guide to choosing a fence gate</a>.</p>`,
      },
      {
        h2: 'Repairing an existing gate',
        html: `<p>A dragging or unlatching gate can often be fixed without replacing the fence. We can rehang it, add bracing, replace the hardware or reset the post. See <a href="/services/fence-repair/">fence repair</a>.</p>`,
      },
    ],
    faqs: [
      { q: 'How wide should a gate be?', a: 'Wide enough for the widest thing you’ll move through it. Measure your mower, wheelbarrow or trailer. For anything wider than a single gate handles well, a double gate is the better build.' },
      { q: 'Can you add a gate to my existing fence?', a: 'Usually, yes. Tell us the fence material and where you want the opening.' },
    ],
  },
  {
    slug: 'fence-repair',
    name: 'Fence Repair',
    heading: 'Fence repair',
    noun: 'fence repair',
    short: 'Leaning posts, broken boards, storm damage and sagging gates fixed right.',
    title: 'Fence Repair in St. Clair Shores & Macomb | Final Touch Fencing',
    description:
      'Fence repair in St. Clair Shores and Macomb County: leaning posts, broken boards, sagging gates and storm damage. Call (810) 614-4181.',
    h1: 'Fence repair',
    lede: 'Not every problem means a new fence. A leaning section, a few broken boards or a gate that won’t latch can usually be fixed for a fraction of the cost of replacement.',
    hero: 'railSide',
    gallery: ['sloped', 'largeLot'],
    sections: [
      {
        h2: 'Common fence repairs',
        html: `<ul>
<li><strong>Leaning or heaved posts.</strong> We reset or replace the post and re-plumb the section.</li>
<li><strong>Broken boards, pickets and rails.</strong> We replace them to match as closely as the existing material allows.</li>
<li><strong>Sagging or dragging gates.</strong> We rehang, brace or replace hinges and latches.</li>
<li><strong>Storm and impact damage</strong> from wind, falling limbs or vehicles.</li>
</ul>`,
      },
      {
        h2: 'Repair or replace?',
        html: `<p>If the damage is limited to a few sections and the rest of the posts are sound, repair is the better value. If many posts have rotted at the ground line or the whole fence leans, patching only moves the problem down the line, and replacement makes more sense. We’ll tell you which one you’re looking at. Our <a href="/blog/repair-or-replace-fence/">repair-or-replace guide</a> lists the signs.</p>`,
      },
      {
        h2: 'Repairs and local rules',
        html: `<p>Repairs still have to follow local rules. St. Clair Shores lists damaged or unstable fences that endanger the public as a prohibited condition, and any fence work involving electrical components needs its own permit and inspection there. If a repair turns into a rebuild, the new fence must meet current height and placement rules.</p>`,
      },
    ],
    faqs: [
      { q: 'Can you match my existing fence?', a: 'In most cases, we can match the style. New wood looks brighter than weathered boards until it ages or is stained. Staining the whole run evens it out.' },
      { q: 'Do you repair fences you didn’t install?', a: 'Yes. Send photos with your quote request, and we can usually tell you what’s involved.' },
    ],
  },
  {
    slug: 'fence-staining',
    name: 'Fence Staining and Power Washing',
    heading: 'Fence staining and power washing',
    noun: 'fence staining',
    short: 'Clean, restore and protect wood fences with power washing and stain.',
    title: 'Fence Staining & Power Washing in Macomb County | Final Touch',
    description:
      'Wood fence power washing, staining and maintenance in St. Clair Shores, Harper Woods, Chesterfield and nearby. Restore the color and protect the wood.',
    h1: 'Fence staining and power washing',
    lede: 'Gray, blotchy wood isn’t ruined. A careful cleaning and a quality stain bring the color back and help protect the boards through Michigan winters.',
    hero: 'stained',
    gallery: ['stained'],
    sections: [
      {
        h2: 'What’s included',
        html: `<ol class="steps">
<li><strong>Power washing.</strong> Removes dirt, mildew and the gray layer of weathered fiber at a pressure that cleans without furring the wood.</li>
<li><strong>Dry time.</strong> Stain needs dry wood to soak in, so we let the fence dry before staining.</li>
<li><strong>Staining.</strong> Applied evenly across boards, rails and posts, with nearby surfaces protected.</li>
</ol>`,
      },
      {
        h2: 'Staining a new fence',
        html: `<p>Freshly installed pressure-treated lumber holds moisture and won’t take stain evenly right away. Plan to stain after it has had time to dry out. We can schedule that when we build your <a href="/services/wood-fencing/">wood fence</a>. Read <a href="/blog/when-to-stain-a-wood-fence/">when to stain a wood fence</a> for the details.</p>`,
      },
      {
        h2: 'General fence maintenance',
        html: `<p>While we’re there, we can tighten loose boards, adjust gates and point out posts that are starting to move before they turn into a <a href="/services/fence-repair/">repair</a>.</p>`,
      },
    ],
    faqs: [
      { q: 'How often should a wood fence be stained?', a: 'Every few years, depending on sun exposure and the stain used. When water stops beading on the surface and the color has faded, it’s time.' },
      { q: 'Do you stain fences you didn’t build?', a: 'Yes. We stain and power wash any wood fence.' },
    ],
  },
];

export const serviceBySlug = Object.fromEntries(services.map((s) => [s.slug, s]));
