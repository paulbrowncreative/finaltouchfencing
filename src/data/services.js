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
    heading: 'Fence Installation',
    noun: 'fence installation',
    short: 'New fences built from the posts up in wood, vinyl, composite and aluminum.',
    title: 'Fence Installation in St. Clair Shores & Macomb | Final Touch',
    description:
      'New fence installation in St. Clair Shores, Harper Woods, Chesterfield and nearby. Wood, vinyl, composite and aluminum. Free estimates: (810) 614-4181.',
    h1: 'Fence Installation',
    lede:
      'A new fence is a few days of work and decades of looking at it. We measure on site, price it in writing and build it straight, plumb and set deep enough to stay that way.',
    hero: 'panorama',
    gallery: ['deckSunset', 'crew', 'vinylSide', 'aluSlope', 'woodGateNew', 'brickHouse'],
    sections: [
      {
        h2: 'What We Install',
        html: `<p>Final Touch Fencing installs new residential fences from our base in St. Clair Shores, across Macomb County and in Harper Woods and Detroit’s east side.</p>
<p>We install residential fences in every common material, plus the gates that go with them:</p>
<ul class="link-list">
<li><a href="/services/wood-fencing/">Wood fences</a> — privacy, shadow box, picket and split rail</li>
<li><a href="/services/vinyl-fencing/">Vinyl fences</a> — low-maintenance privacy panels and gates</li>
<li><a href="/services/composite-fencing/">Composite fences</a> — modern horizontal privacy panels with no staining</li>
<li><a href="/services/aluminum-fencing/">Aluminum fences</a> — open, decorative and well suited to waterfront lots</li>
<li><a href="/services/gates/">Gates</a> — walk gates, double drive gates and driveway gates</li>
</ul>`,
      },
      {
        h2: 'How a Fence Installation Works',
        html: `<ol class="steps">
<li><strong>Quote request.</strong> Call <a href="tel:+18106144181" data-track="phone">(810) 614-4181</a> or send the <a href="/contact/">quote form</a>. Tell us roughly where the fence goes and what you have in mind.</li>
<li><strong>On-site estimate.</strong> We walk the property, measure the run, note grade changes, gates, trees and any existing fence, and give you a written price. Reviewers mention getting their estimate the next day.</li>
<li><strong>Permit and utility marking.</strong> Most communities we serve require a fence permit before work starts. Michigan law also requires utility lines to be marked through MISS DIG 811 at least three business days before anyone digs. We handle the permit for you, and when a city adds a step, such as a post-hole inspection before concrete, we build it into the schedule. “They handled all permits and were great about keeping me updated,” Paul T. wrote on Yelp. See our <a href="/blog/fence-permit-rules-macomb-county/">fence permit guide</a>.</li>
<li><strong>Build.</strong> Posts go in first, then rails, boards or panels, then gates and hardware. We keep to the schedule: when hard, compacted ground slowed the digging on one job, the crew came out on a Saturday to finish on time.</li>
<li><strong>Walkthrough.</strong> We check gate swing and latch, clean up and go over the finished fence with you. If your city requires a final inspection, it happens after the build.</li>
</ol>`,
      },
      {
        h2: 'Details That Decide How Long a Fence Lasts',
        html: `<p>Most fence problems trace back to the posts. Michigan frost heaves shallow posts out of the ground and leaves fences leaning within a few winters. St. Clair Shores, for example, requires posts set at least 42 inches below grade in concrete or an accepted equivalent. We set posts to the depth your city requires and keep lines straight across uneven yards. Read more in <a href="/blog/why-fence-posts-lean/">why fence posts lean</a>.</p>
<p>We also watch the details neighbors notice: the finished side facing out where the ordinance requires it, a consistent gap at the bottom and gates that close on their own weight without dragging.</p>`,
      },
      {
        h2: 'Replacing an Old Fence',
        html: `<p>If an existing fence is coming out, say so in your quote request so we can price the removal. We take the old fence out and haul it away, and we clear the fence line carefully, saving shrubs and plantings where we can. One customer wrote that we preserved several bushes “that otherwise may have been removed,” and worked around the tree company clearing the same yard. Before you tear out a fence on a property line, confirm it’s yours. St. Clair Shores asks on its permit application whether ownership of an existing fence has been determined, and the city won’t decide it for you. Our guide to <a href="/blog/fence-on-property-line/">fences on the property line</a> covers the details.</p>`,
      },
    ],
    faqs: [
      { q: 'How Long Does a Fence Installation Take?', a: 'Once the permit is issued and utilities are marked, most backyard fences take one to a few days of work. Customers on Yelp describe one job finished in a day and another in less than two. Length, material, gates and ground conditions set the schedule, and we give you one with your estimate.' },
      { q: 'I Share the Fence Line With Neighbors. Can You Help Split the Cost?', a: 'Yes. Ask us to break out each neighbor’s share in the estimate. One customer who shares a fence line with three neighbors said the breakdown “made approaching my neighbors so much easier.” See <a href="/blog/fence-on-property-line/">building a fence on the property line</a>.' },
      { q: 'Can I Change the Plan Before the Fence Goes In?', a: 'Usually, yes. Tell us as early as you can. One customer added a small separate fence and an eight-foot gate just before the start date, and wrote that the changes “did not delay the project.”' },
      { q: 'Do I Need a Permit?', a: 'In most of the communities we serve, yes. St. Clair Shores, Chesterfield Township, Macomb Township and Clay Township all require a fence or zoning permit. Our <a href="/blog/fence-permit-rules-macomb-county/">fence permit guide</a> covers the details by city.' },
      { q: 'Is the Estimate Free?', a: 'Yes. Estimates are free and come with no obligation.' },
      { q: 'How Do I Pay?', a: 'We accept cash, check, credit card, Venmo and Cash App.' },
    ],
  },
  {
    slug: 'wood-fencing',
    name: 'Wood Fencing',
    heading: 'Wood Fencing',
    noun: 'wood fence',
    short: 'Privacy, shadow box, picket and split rail fences built from wood.',
    title: 'Wood Fence Installation: Privacy, Shadow Box & Picket',
    description:
      'Wood privacy, shadow box, picket and split rail fences in St. Clair Shores, Harper Woods and Macomb County. See real projects and get a free estimate.',
    h1: 'Wood Fence Installation',
    lede:
      'Wood is most of what we build. It’s affordable, it can be cut to fit any yard, and it can be stained to match your home or left to weather naturally.',
    hero: 'shadowCorner',
    gallery: ['shadowWide', 'woodGateNew', 'shadowBrick', 'picket', 'splitRail', 'woodGateBrick'],
    sections: [
      {
        h2: 'Wood Fence Styles We Build',
        html: `<p>We build wood privacy, shadow box, picket and split rail fences for homes in St. Clair Shores, Harper Woods, Chesterfield Township, Macomb Township, Clay Township and Detroit.</p>
<dl class="defs">
<dt>Privacy Fence</dt><dd>Boards butted tight for full screening. The standard choice for backyards, pools and dogs.</dd>
<dt>Shadow Box Fence</dt><dd>Boards alternate on each side of the rails, so the fence looks finished from both sides and lets some air through. A good choice when the fence faces a street or a neighbor.</dd>
<dt>Picket Fence</dt><dd>Spaced pickets, including pointed French Gothic tops, for front yards and gardens where you want definition rather than screening.</dd>
<dt>Split Rail Fence</dt><dd>Open post-and-rail fencing. It marks a boundary or frames a driveway without blocking the view, and it’s often the only style allowed in a front yard.</dd>
</dl>`,
      },
      {
        h2: 'Custom Tops and Tricky Grades',
        html: `<p>Wood can be built to fit the yard and the neighborhood. We’ve matched a custom top to a neighbor’s existing fence and worked out a clean, good-looking transition where a planting box and retaining wall changed the grade. On one shadow box job, the crew built the fence board by board instead of using premade panels, which the customer said “just shows their skills even more.”</p>`,
      },
      {
        h2: 'Privacy Fence vs. Shadow Box Fence',
        html: `<p>Both give you a 6-foot screen. A solid privacy fence blocks every sightline but takes the full force of the wind, and one side shows the posts and rails. A shadow box fence costs more in material but looks good from both sides. That matters in places like <a href="/service-areas/harper-woods/">Harper Woods</a> and <a href="/service-areas/macomb-township/">Macomb Township</a>, where the ordinance requires the finished side to face the neighbor or the street. Our <a href="/blog/shadow-box-vs-privacy-fence/">shadow box vs. privacy fence guide</a> goes deeper.</p>`,
      },
      {
        h2: 'Staining and Upkeep',
        html: `<p>New pressure-treated lumber needs time to dry before it takes stain well. After that, a cleaning and a fresh coat of stain every few years keep the color even and slow checking and graying. We handle that too. See <a href="/services/fence-staining/">fence staining and power washing</a> and our guide on <a href="/blog/when-to-stain-a-wood-fence/">when to stain a wood fence</a>.</p>`,
      },
    ],
    faqs: [
      { q: 'How Tall Can a Wood Privacy Fence Be?', a: 'Most of our communities cap side and rear yard fences at 6 feet. St. Clair Shores allows privacy fences up to 6 feet 6 inches overall, with panels no taller than 6 feet. Front yards are far more restricted. See <a href="/blog/how-tall-can-a-fence-be/">how tall a fence can be</a> in each city.' },
      { q: 'Which Side of the Fence Faces My Neighbor?', a: 'Most local ordinances require the finished side to face out toward neighbors and streets. A shadow box fence avoids the question because both sides look the same. If a neighbor wants a finished look on their side too, we can add pickets to that side.' },
      { q: 'Can a Wood Fence Go on a Waterfront or Canal Lot?', a: 'Often not as a privacy fence. St. Clair Shores prohibits privacy fences on waterfront and canal lots, and Chesterfield Township prohibits them outside the building envelope. Open styles such as <a href="/services/aluminum-fencing/">aluminum</a> are the usual answer.' },
    ],
  },
  {
    slug: 'privacy-fencing',
    name: 'Privacy Fencing',
    heading: 'Privacy Fencing',
    noun: 'privacy fence',
    short: '6-foot wood, vinyl and composite privacy fences that are tall, tight and built to code.',
    title: 'Privacy Fence Installation: Wood, Vinyl & Composite',
    description:
      'Wood, vinyl and composite privacy fences built to local height and placement rules in St. Clair Shores, Harper Woods and Chesterfield. Free estimates.',
    h1: 'Privacy Fence Installation',
    lede:
      'A privacy fence has one job: block the view and keep the yard yours. We build them in wood, vinyl and composite, up to the height your city allows, with gates that latch every time.',
    hero: 'deckSunset',
    gallery: ['cornerSidewalk', 'panelBackyard', 'woodLongRun', 'vinylSide', 'panelPrivacy', 'maple'],
    sections: [
      {
        h2: 'Wood, Vinyl or Composite Privacy Fence?',
        html: `<p>Our privacy fences screen backyards and side yards in St. Clair Shores, Harper Woods and across Macomb County, built to each city’s height and placement rules.</p>
<p><a href="/services/wood-fencing/">Wood privacy fences</a> cost less up front, can follow any grade and can be stained. <a href="/services/vinyl-fencing/">Vinyl privacy fences</a> cost more but never need stain or paint, and a hose rinse keeps them clean. If the fence will be seen from the street, consider a wood shadow box fence, which looks finished from both sides. Compare all four materials in our <a href="/blog/wood-vs-vinyl-vs-aluminum-fence/">fence material guide</a>. For a modern look, <a href="/services/composite-fencing/">composite privacy fences</a> pair horizontal wood-tone panels with black posts and need no stain.</p>`,
      },
      {
        h2: 'Height and Placement Rules',
        html: `<p>Local ordinances regulate privacy fences more closely than any other fence type:</p>
<ul>
<li><strong>Height.</strong> Usually 6 feet in side and rear yards. St. Clair Shores allows 6 feet 6 inches overall.</li>
<li><strong>Front yards.</strong> Solid fences generally aren’t allowed in front of the house. Corner lots have their own step-down and sight-line rules. See <a href="/blog/corner-lot-fence-rules/">corner lot fence rules</a>.</li>
<li><strong>Waterfront lots.</strong> <a href="/service-areas/st-clair-shores/">St. Clair Shores</a> prohibits privacy fences on waterfront and canal lots, and <a href="/service-areas/chesterfield-township/">Chesterfield Township</a> prohibits them outside the building envelope.</li>
</ul>
<p>We plan the layout around these rules at the estimate, so the fence you approve is one the city will approve.</p>`,
      },
      {
        h2: 'Privacy Fences for Dogs',
        html: `<p>A solid fence also keeps dogs calmer, because they can’t see what’s passing by. We keep the bottom gap tight (St. Clair Shores caps it at 3 inches) and add self-closing gate hardware on request. More in <a href="/blog/best-fence-for-dogs/">the best fence for dogs</a>.</p>`,
      },
    ],
    faqs: [
      { q: 'Can I Put a Privacy Fence in My Front Yard?', a: 'Generally no. Front-yard fences in our area are limited to low, decorative, see-through styles, and the limits vary by city: 3 feet and ornamental in Harper Woods, or split rail 24–42 inches in Chesterfield Township.' },
      { q: 'I Live on a Canal. Can I Get a Privacy Fence?', a: 'Not in St. Clair Shores, where the ordinance prohibits privacy fences on waterfront and canal lots. In Chesterfield Township, they aren’t allowed outside the building envelope. Open aluminum fencing is the usual alternative.' },
      { q: 'Do Privacy Fences Need a Permit?', a: 'In most of the communities we serve, yes. Check the <a href="/blog/fence-permit-rules-macomb-county/">fence permit guide</a> for your city.' },
    ],
  },
  {
    slug: 'vinyl-fencing',
    name: 'Vinyl Fencing',
    heading: 'Vinyl Fencing',
    noun: 'vinyl fence',
    short: 'Clean white vinyl privacy fence and gates with no staining or painting.',
    title: 'Vinyl Fence Installation in St. Clair Shores, MI | Final Touch',
    description:
      'Vinyl privacy fence and gate installation for homes in St. Clair Shores, Harper Woods, Chesterfield and nearby. No painting, no staining. Free estimates.',
    h1: 'Vinyl Fence Installation',
    lede: 'Vinyl is the low-maintenance choice. There’s nothing to stain or seal, it holds its color, and a hose rinse cleans it up.',
    hero: 'vinylDouble',
    gallery: ['vinylSide', 'vinylSingle', 'vinylDouble'],
    sections: [
      {
        h2: 'Why Homeowners Choose Vinyl',
        html: `<p>We install vinyl privacy fences and gates for homeowners in St. Clair Shores, Harper Woods and across Macomb County who want privacy without the staining.</p>
<ul>
<li><strong>No refinishing.</strong> Vinyl never needs stain, sealer or paint.</li>
<li><strong>Clean lines.</strong> Panels and posts are uniform, so long runs look consistent.</li>
<li><strong>Finished on both sides.</strong> Most vinyl privacy panels look the same from either side, which helps with ordinances that require the finished side to face the neighbor.</li>
</ul>`,
      },
      {
        h2: 'Vinyl Gates',
        html: `<p>We install matching vinyl walk gates and double gates wide enough for mowers and trailers. Gates on a vinyl fence need reinforced posts and hardware rated for the gate’s weight, and we size both to the opening. See <a href="/services/gates/">gate installation</a> and our <a href="/blog/choosing-a-fence-gate/">gate buying guide</a>.</p>`,
      },
      {
        h2: 'Where Vinyl Fits',
        html: `<p>A vinyl privacy fence works in backyards and side yards anywhere a solid fence is allowed. On waterfront and canal lots where privacy fences are restricted, choose <a href="/services/aluminum-fencing/">aluminum</a> instead.</p>`,
      },
    ],
    faqs: [
      { q: 'Does a Vinyl Fence Need Maintenance?', a: 'Very little. An occasional wash with a hose or mild soap removes dirt and mildew. There’s no staining or painting.' },
      { q: 'Will You Install Vinyl Fencing I Already Bought?', a: 'Often, yes. Tell us what you have, and we’ll look at it during the estimate. One customer had already bought vinyl privacy fencing that no other company would install. We installed it in a day, met the city’s post-hole inspection and bottom-clearance requirements along the way, and the customer called the result “beautiful.” <a href="/reviews/">Read the review</a>.' },
      { q: 'Is Vinyl More Expensive Than Wood?', a: 'Usually, up front. It saves the cost of staining and refinishing over the years. We can price both so you can compare.' },
    ],
  },
  {
    slug: 'composite-fencing',
    name: 'Composite Fencing',
    heading: 'Composite Fencing',
    noun: 'composite fence',
    short: 'Horizontal composite privacy panels framed in black for a clean, modern look.',
    title: 'Composite Fence Installation in St. Clair Shores, MI',
    description:
      'Horizontal composite privacy fence installation in St. Clair Shores, Harper Woods and Macomb County. Wood-tone panels, black posts. Free estimates.',
    h1: 'Composite Fence Installation',
    lede: 'Composite gives you the warm look of wood in a modern horizontal layout, with no staining. Wood-tone panels set in black posts and trim make a solid privacy fence with clean, straight lines.',
    hero: 'panelBackyard',
    gallery: ['panelBackyard', 'panelPrivacy'],
    sections: [
      {
        h2: 'Why Homeowners Choose Composite',
        html: `<p>We install composite privacy fences for homes in St. Clair Shores, Harper Woods and across Macomb County.</p>
<ul>
<li><strong>The look of wood without the upkeep.</strong> Composite panels come in wood tones and don’t need stain, sealer or paint.</li>
<li><strong>A modern horizontal design.</strong> Long horizontal boards framed in black posts and trim give the yard a contemporary, finished look that suits newer homes and updated older ones.</li>
<li><strong>Full privacy.</strong> The panels are solid from top to bottom, so they screen patios, hot tubs and side yards completely.</li>
</ul>`,
      },
      {
        h2: 'Composite vs. Wood vs. Vinyl',
        html: `<p>All three make a solid privacy fence. <a href="/services/wood-fencing/">Wood</a> usually costs the least up front but needs stain every few years. <a href="/services/vinyl-fencing/">Vinyl</a> is low-maintenance and typically comes in white. Composite sits between them in look: the warmth of wood in a modern, low-maintenance panel. It generally costs more up front than wood. Compare all of them in our <a href="/blog/wood-vs-vinyl-vs-aluminum-fence/">fence material guide</a>, and we’ll gladly price more than one option on the same layout.</p>`,
      },
      {
        h2: 'Where a Composite Fence Fits',
        html: `<p>A composite fence follows the same rules as any solid privacy fence. It works in backyards and side yards where a privacy fence is allowed, typically up to 6 feet. Front yards, corner lots and waterfront lots have tighter limits, so check <a href="/blog/how-tall-can-a-fence-be/">how tall a fence can be</a> and our <a href="/blog/fence-permit-rules-macomb-county/">fence permit guide</a>, or let us check your lot at the estimate.</p>`,
      },
    ],
    faqs: [
      { q: 'Does a Composite Fence Need Staining?', a: 'No. Composite panels don’t need stain, sealer or paint. An occasional rinse keeps them clean.' },
      { q: 'Is Composite More Expensive Than Wood?', a: 'Usually, up front. You skip the cost and work of staining over the years. We can price composite and wood on the same layout so you can compare.' },
      { q: 'Can a Composite Fence Go on a Waterfront Lot?', a: 'It depends on your city and where the fence goes. St. Clair Shores doesn’t allow privacy fences on waterfront and canal lots, and Chesterfield Township limits fences on the water side. See our <a href="/blog/waterfront-canal-fence-rules/">waterfront fence guide</a>.' },
    ],
  },
  {
    slug: 'aluminum-fencing',
    name: 'Aluminum Fencing',
    heading: 'Aluminum Fencing',
    noun: 'aluminum fence',
    short: 'Black ornamental aluminum that’s open, rust-free and right for waterfront lots.',
    title: 'Aluminum Fence Installation & Waterfront Fencing | Final Touch',
    description:
      'Black aluminum fences for yards, pools and waterfront lots in St. Clair Shores and Chesterfield Township. Local waterfront rules and free quotes.',
    h1: 'Aluminum Fence Installation',
    lede:
      'Aluminum gives you the look of wrought iron without the rust. It’s open, so it keeps the view, and it’s often the one fence type allowed on a waterfront lot.',
    hero: 'aluWater',
    gallery: ['aluSlope', 'aluGate', 'aluGateWide', 'aluYard', 'crew'],
    sections: [
      {
        h2: 'Built for Waterfront Properties',
        html: `<p>Lake St. Clair, Anchor Bay and the canals that feed them shape the fence rules here. <a href="/service-areas/st-clair-shores/">St. Clair Shores</a> doesn’t allow privacy fences on waterfront or canal lots. <a href="/service-areas/chesterfield-township/">Chesterfield Township</a> allows only see-through decorative aluminum or wrought iron, no taller than 48 inches, in the water-side front yard of lots on Anchor Bay and the Salt River. Aluminum meets those rules and keeps your view of the water. Read our full guide to <a href="/blog/waterfront-canal-fence-rules/">waterfront and canal fence rules</a>.</p>`,
      },
      {
        h2: 'Where Else Aluminum Works',
        html: `<ul>
<li><strong>Front yards.</strong> Where a city allows a low decorative fence in front of the house, black aluminum is a clean option. Check your city’s height limit first.</li>
<li><strong>Pools.</strong> Pool barriers are governed by the building code, not the fence ordinance. Tell us the fence is for a pool, and we’ll plan the height and gate hardware around it.</li>
<li><strong>Pets.</strong> Picket spacing keeps most medium and large dogs in while leaving the yard open to view.</li>
</ul>`,
      },
    ],
    faqs: [
      { q: 'Will an Aluminum Fence Rust?', a: 'No. Aluminum doesn’t rust the way steel or iron does, which is why it holds up well near the water.' },
      { q: 'Can I Fence the Water Side of My Lot?', a: 'It depends on your city. In Chesterfield Township, only see-through decorative aluminum or wrought iron up to 48 inches is allowed in the water-side front yard on Anchor Bay and the Salt River. Call us with your address, and we’ll check the rules for your lot.' },
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
    h1: 'Gate Installation',
    lede: 'You use the gate more than any other part of the fence. It has to swing freely, latch every time and stay square for years.',
    hero: 'doubleGate',
    gallery: ['woodGateNew', 'woodGateBrick', 'aluGate', 'shadowGate', 'splitRail', 'vinylDouble'],
    sections: [
      {
        h2: 'Gates We Install',
        html: `<p>We build and install gates for homes in St. Clair Shores, Harper Woods, Macomb County and Detroit, on new fences and existing ones.</p>
<ul>
<li><strong>Walk gates</strong> for side yards and garden access, in wood, vinyl or aluminum to match the fence.</li>
<li><strong>Double drive gates</strong> wide enough for a mower, trailer or car.</li>
<li><strong>Driveway gates</strong> on split rail and other open fences.</li>
</ul>
<p>One customer had us put a gate across the driveway and another on the lawn as part of a full-yard shadow box fence. <a href="/reviews/">Read the review</a>.</p>`,
      },
      {
        h2: 'Why Gates Sag and How We Prevent It',
        html: `<p>A gate sags when its hinge post moves or the frame racks. We set gate posts solidly, brace wood gates diagonally against the direction they want to drop and use heavy strap hinges sized to the gate. On wide openings, a double gate splits the weight between two posts. See our <a href="/blog/choosing-a-fence-gate/">guide to choosing a fence gate</a>.</p>`,
      },
      {
        h2: 'Repairing an Existing Gate',
        html: `<p>A dragging or unlatching gate can often be fixed without replacing the fence. We can rehang it, add bracing, replace the hardware or reset the post. See <a href="/services/fence-repair/">fence repair</a>.</p>`,
      },
    ],
    faqs: [
      { q: 'How Wide Should a Gate Be?', a: 'Wide enough for the widest thing you’ll move through it. Measure your mower, wheelbarrow or trailer. For anything wider than a single gate handles well, a double gate is the better build.' },
      { q: 'Can You Add a Gate to My Existing Fence?', a: 'Usually, yes. Tell us the fence material and where you want the opening.' },
    ],
  },
  {
    slug: 'fence-repair',
    name: 'Fence Repair',
    heading: 'Fence Repair',
    noun: 'fence repair',
    short: 'Leaning posts, broken boards, storm damage and sagging gates fixed right.',
    title: 'Fence Repair in St. Clair Shores & Macomb | Final Touch Fencing',
    description:
      'Fence repair in St. Clair Shores and Macomb County: leaning posts, broken boards, sagging gates and storm damage. Call (810) 614-4181.',
    h1: 'Fence Repair',
    lede: 'Not every problem means a new fence. A leaning section, a few broken boards or a gate that won’t latch can usually be fixed for a fraction of the cost of replacement.',
    hero: 'railSide',
    gallery: ['sloped', 'largeLot'],
    sections: [
      {
        h2: 'Common Fence Repairs',
        html: `<p>We repair leaning, broken and sagging fences in St. Clair Shores, Harper Woods and across Macomb County, including fences we didn’t build.</p>
<ul>
<li><strong>Leaning or heaved posts.</strong> We reset or replace the post and re-plumb the section.</li>
<li><strong>Broken boards, pickets and rails.</strong> We replace them to match as closely as the existing material allows.</li>
<li><strong>Sagging or dragging gates.</strong> We rehang, brace or replace hinges and latches.</li>
<li><strong>Storm and impact damage</strong> from wind, falling limbs or vehicles.</li>
</ul>`,
      },
      {
        h2: 'Repair or Replace?',
        html: `<p>If the damage is limited to a few sections and the rest of the posts are sound, repair is the better value. If many posts have rotted at the ground line or the whole fence leans, patching only moves the problem down the line, and replacement makes more sense. We’ll tell you which one you’re looking at. Our <a href="/blog/repair-or-replace-fence/">repair-or-replace guide</a> lists the signs.</p>`,
      },
      {
        h2: 'Repairs and Local Rules',
        html: `<p>Repairs still have to follow local rules. St. Clair Shores lists damaged or unstable fences that endanger the public as a prohibited condition, and any fence work involving electrical components needs its own permit and inspection there. If a repair turns into a rebuild, the new fence must meet current height and placement rules.</p>`,
      },
    ],
    faqs: [
      { q: 'Can You Match My Existing Fence?', a: 'In most cases, we can match the style. New wood looks brighter than weathered boards until it ages or is stained. Staining the whole run evens it out.' },
      { q: 'Do You Repair Fences You Didn’t Install?', a: 'Yes. Send photos with your quote request, and we can usually tell you what’s involved.' },
    ],
  },
  {
    slug: 'fence-staining',
    name: 'Fence Staining and Power Washing',
    heading: 'Fence Staining and Power Washing',
    noun: 'fence staining',
    short: 'Clean, restore and protect wood fences with power washing and stain.',
    title: 'Fence Staining & Power Washing in Macomb County | Final Touch',
    description:
      'Wood fence power washing, staining and maintenance in St. Clair Shores, Harper Woods, Chesterfield and nearby. Restore the color and protect the wood.',
    h1: 'Fence Staining and Power Washing',
    lede: 'Gray, blotchy wood isn’t ruined. A careful cleaning and a quality stain bring the color back and help protect the boards through Michigan winters.',
    hero: 'stained',
    gallery: ['shadowStained', 'stained'],
    sections: [
      {
        h2: 'What’s Included',
        html: `<p>We power wash and stain wood fences in St. Clair Shores, Harper Woods and across Macomb County.</p>
<ol class="steps">
<li><strong>Power washing.</strong> Removes dirt, mildew and the gray layer of weathered fiber at a pressure that cleans without furring the wood.</li>
<li><strong>Dry time.</strong> Stain needs dry wood to soak in, so we let the fence dry before staining.</li>
<li><strong>Staining.</strong> Applied evenly across boards, rails and posts, with nearby surfaces protected.</li>
</ol>`,
      },
      {
        h2: 'Staining a New Fence',
        html: `<p>Freshly installed pressure-treated lumber holds moisture and won’t take stain evenly right away. Plan to stain after it has had time to dry out. We can schedule that when we build your <a href="/services/wood-fencing/">wood fence</a>. Read <a href="/blog/when-to-stain-a-wood-fence/">when to stain a wood fence</a> for the details.</p>`,
      },
      {
        h2: 'General Fence Maintenance',
        html: `<p>While we’re there, we can tighten loose boards, adjust gates and point out posts that are starting to move before they turn into a <a href="/services/fence-repair/">repair</a>.</p>`,
      },
    ],
    faqs: [
      { q: 'How Often Should a Wood Fence Be Stained?', a: 'Every few years, depending on sun exposure and the stain used. When water stops beading on the surface and the color has faded, it’s time.' },
      { q: 'Do You Stain Fences You Didn’t Build?', a: 'Yes. We stain and power wash any wood fence.' },
    ],
  },
];

export const serviceBySlug = Object.fromEntries(services.map((s) => [s.slug, s]));
