// Service-area pages. Only communities tied to the business by its own listings are included:
// St. Clair Shores (current base), Harper Woods (Facebook project post), Chesterfield Twp (Yelp "serves Chesterfield"),
// Macomb Twp (Facebook location), Clay Twp (former base), Detroit (Angi gallery "Wood install Detroit").
// Local rules come from official municipal documents — see research/local-regulations.md.

export const areas = [
  {
    slug: 'st-clair-shores',
    name: 'St. Clair Shores',
    county: 'Macomb County',
    title: 'Fence Company in St. Clair Shores, MI | Final Touch Fencing',
    description:
      'St. Clair Shores fence installation and repair from a local family-owned company. Canal-lot rules and the city permit process explained.',
    h1: 'Fence Installation in St. Clair Shores',
    lede: 'St. Clair Shores is home base. We know the city’s fence ordinance, the canal-lot rules and the inspection schedule, because these are the jobs we do most.',
    hero: 'shadowCorner',
    gallery: ['deckSunset', 'shadowLong', 'doubleGate'],
    services: ['wood-fencing', 'privacy-fencing', 'aluminum-fencing', 'vinyl-fencing', 'gates', 'fence-repair'],
    nearby: ['harper-woods', 'chesterfield-township', 'macomb-township'],
    sections: [
      {
        h2: 'What St. Clair Shores requires',
        html: `<p>Every fence in the city needs a permit from the Community Development Department (27600 Jefferson Ave, 586-447-3340). The application asks for a plan showing the fence location, existing fences and easements. As of the February 2026 application, the fee is $100 for residential and $150 for commercial. Two inspections are required: one at the post holes and a final.</p>
<ul>
<li><strong>Post depth:</strong> at least 42 inches below grade, set in concrete or by another accepted method.</li>
<li><strong>Privacy fences:</strong> 6 feet 6 inches maximum, with individual panels no taller than 6 feet and no more than 3 inches of gap at grade.</li>
<li><strong>Finished side:</strong> if one side looks different, the "bad side" faces the installer’s own property.</li>
<li><strong>Front yards:</strong> no fence beyond the face of the house without consent from the Board of Fence Arbitration.</li>
</ul>
<p class="source">Source: <a href="https://www.scsmi.net/DocumentCenter/View/443/Fence-Permit-Application-PDF" rel="noopener" target="_blank">City of St. Clair Shores Fence Permit Application &amp; Code Secs. 8-249–8-253</a>. Rules change, so confirm with the city before you build.</p>`,
      },
      {
        h2: 'Canal and lakefront lots',
        html: `<p>This is the rule that catches people by surprise: <strong>privacy fences are not permitted on any waterfront or canal lot</strong> in St. Clair Shores. The permit application asks directly whether your property borders a lake, canal or river. If it does, we’ll plan an open fence instead, usually black <a href="/services/aluminum-fencing/">aluminum</a>, which keeps the view and holds up near the water.</p>`,
      },
      {
        h2: 'Corner lots',
        html: `<p>The city’s grid of residential streets means plenty of corner lots, and they follow a step-down rule. Along the side street the fence can be 6 feet 6 inches from the rear lot line to the front of the house. It then drops to 4 feet 6 inches and slopes down to no more than 2 feet 6 inches at the front lot line, using a material that doesn’t block drivers’ or pedestrians’ view. A <a href="/services/wood-fencing/">shadow box fence</a> like the one pictured above looks finished from the sidewalk side.</p>`,
      },
      {
        h2: 'Replacing an old fence',
        html: `<p>The permit application asks whether you’re removing an existing fence, and on how many sides. The city does not decide who owns a fence on a shared line, so settle that with your neighbor before removal is priced in.</p>`,
      },
    ],
    faqs: [
      { q: 'How much is a fence permit in St. Clair Shores?', a: 'As of the February 2026 application, $100 for residential, $150 for commercial, plus $30 for plan review if applicable. Confirm the current fee with Community Development.' },
      { q: 'Can I put a privacy fence on my canal lot?', a: 'No. The city ordinance (Sec. 8-253) prohibits privacy fences on any waterfront or canal lot. An open aluminum fence is the common alternative.' },
      { q: 'Do I need to be home for the inspection?', a: 'According to the city, you do not need to be home for the final inspection.' },
    ],
  },
  {
    slug: 'harper-woods',
    name: 'Harper Woods',
    county: 'Wayne County',
    title: 'Fence Installation in Harper Woods, MI | Final Touch Fencing',
    description:
      'Fence installation and repair in Harper Woods: 6-ft privacy fences, ornamental front-yard fencing and the city’s lot-line consent rule.',
    h1: 'Fence Installation in Harper Woods',
    lede:
      'Harper Woods is a few minutes from our base in St. Clair Shores, and we’ve completed projects here. Its fence ordinance differs from its neighbors’ in a few ways worth knowing before you plan.',
    hero: 'betweenHouses',
    gallery: ['brickHouse', 'shadowGate', 'picket'],
    services: ['privacy-fencing', 'wood-fencing', 'vinyl-fencing', 'gates', 'fence-repair', 'fence-staining'],
    nearby: ['st-clair-shores', 'detroit'],
    sections: [
      {
        h2: 'Harper Woods fence rules at a glance',
        html: `<ul>
<li><strong>Rear and side yards:</strong> up to 6 feet.</li>
<li><strong>In front of the house:</strong> no more than 3 feet, and it must be ornamental in design.</li>
<li><strong>Side yard placement:</strong> behind the front foundation wall, using whichever wall is farther from the street, yours or your neighbor’s.</li>
<li><strong>Corner lots:</strong> up to 6 feet along the street-side lot line, extending to the front building line. Inside the corner visibility triangle, nothing over 30 inches above the curb.</li>
<li><strong>Driveways:</strong> fences can’t block visibility from a driveway, and front-yard fences next to a neighbor’s driveway are set back 2 feet.</li>
</ul>
<p class="source">Source: <a href="https://harperwoodscity.org/wp-content/uploads/2024/09/ZoningOrdi.pdf" rel="noopener" target="_blank">City of Harper Woods Zoning Ordinance, Sec. 10-228 Fences and Walls</a>. Confirm current requirements with the city.</p>`,
      },
      {
        h2: 'Building on the lot line takes neighbor consent',
        html: `<p>Harper Woods allows a fence in the side or rear yard to sit right on the lot line only with the <strong>written consent of all adjacent property owners</strong>. Without it, the fence goes inside your line. Have that conversation early. It’s also a good time to agree on style, since the ordinance requires a single finished side to face outward toward neighbors and the street.</p>`,
      },
      {
        h2: 'Every fence on its own posts',
        html: `<p>The ordinance requires each fence to be freestanding on its own posts, so two separate fences can’t share posts. If a neighbor’s fence already runs along your line, a new fence needs its own post line. We’ll lay that out at the estimate.</p>`,
      },
    ],
    faqs: [
      { q: 'How tall can a fence be in Harper Woods?', a: 'Up to 6 feet in rear and side yards, and 3 feet (ornamental) in front of the house, per Sec. 10-228 of the zoning ordinance.' },
      { q: 'Can my fence go right on the property line?', a: 'Only with written consent of all adjacent property owners. Otherwise it is set inside your line.' },
    ],
  },
  {
    slug: 'chesterfield-township',
    name: 'Chesterfield Township',
    county: 'Macomb County',
    title: 'Fence Company in Chesterfield Township, MI | Final Touch Fencing',
    description:
      'Fence installation in Chesterfield Township: privacy, split rail and waterfront aluminum on Anchor Bay and the Salt River. Township rules explained.',
    h1: 'Fence Installation in Chesterfield Township',
    lede:
      'Between Anchor Bay, the Salt River, canal subdivisions and newer neighborhoods, Chesterfield Township has more variety in its fence rules than most places we work.',
    hero: 'splitRail',
    gallery: ['aluWater', 'panorama', 'shadowWide'],
    services: ['aluminum-fencing', 'wood-fencing', 'privacy-fencing', 'chain-link-fencing', 'gates'],
    nearby: ['macomb-township', 'st-clair-shores', 'clay-township'],
    sections: [
      {
        h2: 'Township fence rules',
        html: `<ul>
<li><strong>Side and rear yards:</strong> between 3 and 6 feet above mean grade.</li>
<li><strong>Front yards:</strong> only decorative, non-obscuring <a href="/services/wood-fencing/">split rail</a>, 24 to 42 inches high.</li>
<li><strong>Street-side yards:</strong> set back at least 5 feet from the side-street right-of-way, and kept out of a 15-foot clear-vision triangle at roads and driveways.</li>
<li><strong>Not allowed:</strong> barbed wire, sharp or pointed objects, or electrified fences.</li>
</ul>
<p>Permits are $65, and since January 2024 the township accepts applications only electronically. You’ll need a mortgage survey or plot plan, the fence size and material, a driver’s license copy and the signed ordinance.</p>
<p class="source">Source: <a href="https://www.chesterfieldtwp.org/DocumentCenter/View/2633/Fence-Application" rel="noopener" target="_blank">Chesterfield Township Fence Application &amp; Ordinance</a>. Confirm with the Building Department (586-949-0400).</p>`,
      },
      {
        h2: 'Anchor Bay, the Salt River and canal lots',
        html: `<p>Waterfront lots have stricter rules. On lots abutting Anchor Bay and the Salt River (south of Callens Road), the only fence allowed in the water-side front yard is non-obscuring decorative aluminum or wrought iron no taller than 48 inches. Walls, hedges, chain link and solid fences aren’t allowed there. On any waterfront or canal lot, privacy fences aren’t allowed outside the building envelope.</p>
<p>That makes <a href="/services/aluminum-fencing/">black aluminum</a> the default waterfront fence here. It keeps pets and kids in and keeps the view open.</p>`,
      },
      {
        h2: 'Replacing a fence on a corner lot',
        html: `<p>The township ordinance points corner-lot replacements to a September 2016 Zoning Board of Appeals interpretation, so an existing corner fence doesn’t automatically get rebuilt as-is. Ask about it at your estimate and confirm with the Building Department.</p>`,
      },
    ],
    faqs: [
      { q: 'Can I have a front yard fence in Chesterfield Township?', a: 'Only a decorative, non-obscuring split rail fence between 24 and 42 inches, except on the water side of Anchor Bay and Salt River lots, where decorative aluminum or wrought iron up to 48 inches is allowed.' },
      { q: 'How do I apply for a fence permit?', a: 'Online or by email to the Building Department. Paper applications haven’t been accepted since January 1, 2024. The fee is $65.' },
    ],
  },
  {
    slug: 'macomb-township',
    name: 'Macomb Township',
    county: 'Macomb County',
    title: 'Fence Installation in Macomb Township, MI | Final Touch Fencing',
    description:
      'Fence installation in Macomb Township subdivisions: privacy, vinyl and aluminum. Grade checks, HOA restrictions and permit timing explained.',
    h1: 'Fence Installation in Macomb Township',
    lede: 'Most Macomb Township homes are in subdivisions, so a fence project here usually has two sets of rules: the township’s and your HOA’s.',
    hero: 'backyardTree',
    gallery: ['deckSunset', 'vinylSingle', 'aluYard'],
    services: ['privacy-fencing', 'vinyl-fencing', 'aluminum-fencing', 'wood-fencing', 'gates'],
    nearby: ['chesterfield-township', 'st-clair-shores'],
    sections: [
      {
        h2: 'Check your subdivision restrictions first',
        html: `<p>Macomb Township says plainly that it has no jurisdiction over subdivision restrictions. If your fence meets the ordinance, you’ll get a permit, but your HOA can still limit the style, height or location, and some subdivisions don’t allow fences at all. Get HOA approval before you schedule.</p>`,
      },
      {
        h2: 'The permit process and timeline',
        html: `<ol class="steps">
<li><strong>Application</strong> with a copy of your driver’s license and two copies of a plot plan showing each fence segment’s length, the total length, type and height. Note whether the fence serves as a pool barrier.</li>
<li><strong>Grade check</strong> by the township Water Department, about 2–3 days, to confirm nothing is built in easements and the grade hasn’t been changed.</li>
<li><strong>Permit issued</strong> in roughly 7–10 working days. The fee is $75.</li>
<li><strong>Final inspection</strong> after the fence is built.</li>
</ol>
<p>Altogether, plan on about two weeks between applying and breaking ground.</p>
<p class="source">Source: <a href="https://www.macomb-mi.gov/DocumentCenter/View/7260/Fence-Requirements" rel="noopener" target="_blank">Macomb Township Fence Permit Requirements</a> (rev. 10/2022). Full rules are in Chapter 14, Article II of the township code.</p>`,
      },
      {
        h2: 'Township design rules',
        html: `<ul>
<li><strong>No double fencing:</strong> a new fence must be at least 3½ feet from any other fence. If a neighbor already has one on the line, plan around it.</li>
<li><strong>No spiked or pointed tops.</strong> That rules out pointed pickets like French gothic here, so choose flat or rounded tops.</li>
<li><strong>Finished side out</strong> toward the neighbor or street. Vinyl and shadow box wood look the same from both sides.</li>
</ul>`,
      },
    ],
    faqs: [
      { q: 'How long does a Macomb Township fence permit take?', a: 'The township lists about 2–3 days for the grade check, then 7–10 working days to process the permit.' },
      { q: 'My HOA has fence rules. Does the township enforce them?', a: 'No. The township issues permits based on its ordinance only. Your HOA restrictions still apply and are enforced by the association.' },
    ],
  },
  {
    slug: 'clay-township',
    name: 'Clay Township & Algonac',
    county: 'St. Clair County',
    title: 'Fence Installation, Clay Township & Algonac MI | Final Touch',
    description:
      'Fence installation in Clay Township and Algonac, where Final Touch Fencing got its start. Zoning permits, finished-side rules and waterfront fences.',
    h1: 'Fence Installation in Clay Township & Algonac',
    lede:
      'Final Touch Fencing started out in Clay Township before moving to St. Clair Shores, so the north end of Anchor Bay is familiar ground.',
    hero: 'picket',
    gallery: ['aluWater', 'woodedSide', 'panorama'],
    services: ['aluminum-fencing', 'wood-fencing', 'privacy-fencing', 'chain-link-fencing', 'fence-staining'],
    nearby: ['chesterfield-township', 'st-clair-shores'],
    sections: [
      {
        h2: 'Clay Township fence rules',
        html: `<p>Every fence in Clay Township needs a <strong>Zoning Compliance Permit</strong> from the Building Department (810-794-9320). Under Section 3.08 of the township zoning ordinance:</p>
<ul>
<li><strong>Side and rear yards:</strong> up to 6 feet, measured from average grade.</li>
<li><strong>In front of the house or in the required front yard:</strong> no more than 4 feet, and no obscuring fence. Decorative, see-through fencing up to 4 feet is allowed, but chain link doesn’t count as decorative.</li>
<li><strong>Finished side:</strong> at least one side must be finished (stained or painted wood, painted metal) and face the neighboring properties.</li>
<li><strong>Materials:</strong> treated wood, plastic, aluminum, galvanized metal or similar. Chicken wire and snow fencing can’t be used as permanent fencing.</li>
</ul>
<p class="source">Sources: <a href="https://claytwpmi.gov/buildingdept" rel="noopener" target="_blank">Clay Township Building Department</a>; <a href="https://cms2.revize.com/revize/claytownship/documents/docs/Clay_Township_Zoning_Ordinance_2007_july.pdf" rel="noopener" target="_blank">Zoning Ordinance #126, Sec. 3.08</a> (2007, as posted). Amendments may apply, so confirm with the township.</p>`,
      },
      {
        h2: 'The "finished" requirement favors stain',
        html: `<p>Clay Township defines "finished" as covering the raw material to protect it from the weather, for example by staining or painting wood. If you’re building in wood here, plan on <a href="/services/fence-staining/">staining</a> the side that faces your neighbors. Or choose <a href="/services/vinyl-fencing/">vinyl</a> or <a href="/services/aluminum-fencing/">aluminum</a>, which come finished.</p>`,
      },
      {
        h2: 'Waterfront and canal properties',
        html: `<p>Canal homes and riverfront lots are common around Algonac and Clay Township. An open aluminum fence keeps a dog or kids in without blocking the water view, and it holds up in a damp environment. For a canal-side fence, we’ll check the township setback chart and any other approvals your lot needs before we price it.</p>`,
      },
    ],
    faqs: [
      { q: 'Do I need a permit for a fence in Clay Township?', a: 'Yes. Fences require a Zoning Compliance Permit from the Clay Township Building Department.' },
      { q: 'Can I use chain link in my front yard?', a: 'Not as decorative front-yard fencing. The ordinance says non-obscuring decorative fencing does not include chain link.' },
    ],
  },
  {
    slug: 'detroit',
    name: 'Detroit',
    county: 'Wayne County',
    title: 'Fence Installation in Detroit, MI (East Side) | Final Touch Fencing',
    description:
      'Wood, vinyl, aluminum and chain link fence installation in Detroit, especially the east side near Harper Woods. Permits, historic district review and free estimates.',
    h1: 'Fence Installation in Detroit',
    lede:
      'We’ve built wood fences in Detroit, and the city’s east side is a short drive from our St. Clair Shores base. Detroit permits work differently from the suburbs, especially in historic districts.',
    hero: 'brickHouse',
    gallery: ['betweenHouses', 'doubleGate', 'shadowGate'],
    services: ['wood-fencing', 'chain-link-fencing', 'aluminum-fencing', 'privacy-fencing', 'gates', 'fence-repair'],
    nearby: ['harper-woods', 'st-clair-shores'],
    sections: [
      {
        h2: 'Permits through BSEED',
        html: `<p>In Detroit, fence permits come from the Buildings, Safety Engineering &amp; Environmental Department (BSEED). Height and placement limits come from the city zoning ordinance and vary by district and lot type, so we confirm the rules for your address before building.</p>`,
      },
      {
        h2: 'Historic districts add a review',
        html: `<p>If your home is in one of Detroit’s local historic districts, the Historic District Commission reviews fence applications before BSEED issues a permit, and its guidelines are specific:</p>
<ul>
<li><strong>Stockade fencing is not allowed.</strong></li>
<li>Other wood fencing, chain link, wrought iron, and aluminum that replicates wrought iron are acceptable materials.</li>
<li>Front-yard fencing is generally not allowed except on corner lots.</li>
</ul>
<p class="source">Source: <a href="https://detroitmi.gov/government/commissions/historic-district-commission/historic-district-commission-general-scope-work-guidelines/hdc-site-improvements-fences-paving-and-landscaping" rel="noopener" target="_blank">Detroit Historic District Commission: Fences, Paving &amp; Landscaping guidelines</a>.</p>`,
      },
      {
        h2: 'Fences for city lots',
        html: `<p>Detroit lots are often narrow, with a side drive and a detached garage at the back. That usually means a privacy fence along the rear and sides, plus a <a href="/services/gates/">double gate</a> across the drive. If you’ve bought the vacant lot next door, <a href="/services/chain-link-fencing/">chain link</a> or <a href="/services/aluminum-fencing/">aluminum</a> is a cost-effective way to secure it.</p>`,
      },
    ],
    faqs: [
      { q: 'Do I need a fence permit in Detroit?', a: 'Fence permits are issued by BSEED. Requirements depend on your fence and lot, so confirm with BSEED. In local historic districts, the Historic District Commission reviews the application too.' },
      { q: 'Can I build a stockade fence in a historic district?', a: 'No. Detroit’s Historic District Commission guidelines do not allow stockade fencing.' },
    ],
  },
];

export const areaBySlug = Object.fromEntries(areas.map((a) => [a.slug, a]));
