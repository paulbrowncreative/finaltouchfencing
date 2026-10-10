// Project photo inventory. All `photos` are Final Touch Fencing's own project photos, published on their
// Yelp, Thumbtack and Angi profiles (source noted per photo). Angi originals were downloaded at full
// resolution; every file has been auto-rotated, resized to ≤2400px and stripped of EXIF/GPS metadata.

import deckSunset from '../assets/images/projects/wood-privacy-backyard-deck-sunset.jpg';
import panorama from '../assets/images/projects/wood-privacy-backyard-panorama.jpg';
import brickHouse from '../assets/images/projects/wood-privacy-brick-house.jpg';
import backyardTree from '../assets/images/projects/wood-privacy-backyard-tree.jpg';
import betweenHouses from '../assets/images/projects/wood-privacy-between-houses.jpg';
import doubleGate from '../assets/images/projects/wood-privacy-double-drive-gate.jpg';
import railSide from '../assets/images/projects/wood-privacy-rail-side-view.jpg';
import sideYardDog from '../assets/images/projects/wood-privacy-side-yard-with-dog.jpg';
import woodedSide from '../assets/images/projects/wood-privacy-wooded-side-yard.jpg';
import cornerSidewalk from '../assets/images/projects/wood-privacy-corner-sidewalk.jpg';
import maple from '../assets/images/projects/wood-privacy-side-yard-maple.jpg';
import largeLot from '../assets/images/projects/wood-privacy-backyard-large-lot.jpg';
import sloped from '../assets/images/projects/wood-privacy-sloped-sidewalk.jpg';
import shadowCorner from '../assets/images/projects/wood-shadowbox-sidewalk-corner-lot.jpg';
import shadowLong from '../assets/images/projects/wood-shadowbox-sidewalk-long-run.jpg';
import shadowWide from '../assets/images/projects/wood-shadowbox-wide-angle.jpg';
import shadowGate from '../assets/images/projects/wood-shadowbox-with-gate.jpg';
import shadowBrick from '../assets/images/projects/wood-shadowbox-side-yard-brick-home.jpg';
import picket from '../assets/images/projects/wood-picket-french-gothic.jpg';
import splitRail from '../assets/images/projects/wood-split-rail-driveway-gate.jpg';
import stained from '../assets/images/projects/wood-stained-on-block-retaining-wall.jpg';
import aluWater from '../assets/images/projects/aluminum-black-waterfront-canal.jpg';
import aluYard from '../assets/images/projects/aluminum-black-backyard.jpg';
import aluGate from '../assets/images/projects/aluminum-black-double-drive-gate.jpg';
import aluGateWide from '../assets/images/projects/aluminum-black-double-drive-gate-wide.jpg';
import vinylDouble from '../assets/images/projects/vinyl-white-double-gate.jpg';
import vinylSingle from '../assets/images/projects/vinyl-white-single-gate.jpg';
import crew from '../assets/images/projects/crew-installing-aluminum-fence.jpg';

const p = (key, src, alt, tags, source, extra = {}) => ({ key, src, alt, tags, source, ...extra });

export const photos = {
  deckSunset: p('deckSunset', deckSunset, 'New wood privacy fence enclosing a backyard lawn beside a composite deck at sunset', ['wood', 'privacy'], 'Angi'),
  panorama: p('panorama', panorama, 'Long run of new wood privacy fence along a backyard lawn and driveway, panoramic view', ['wood', 'privacy'], 'Thumbtack'),
  brickHouse: p('brickHouse', brickHouse, 'Wood privacy fence with a walk gate connecting to a brick house', ['wood', 'privacy', 'gates'], 'Thumbtack'),
  backyardTree: p('backyardTree', backyardTree, 'Wood privacy fence surrounding a backyard with a mature tree and gravel drive', ['wood', 'privacy'], 'Angi'),
  betweenHouses: p('betweenHouses', betweenHouses, 'Wood privacy fence running between two neighboring homes', ['wood', 'privacy'], 'Yelp'),
  doubleGate: p('doubleGate', doubleGate, 'Wood privacy double gate with black hinges across a concrete walkway', ['wood', 'gates', 'privacy'], 'Yelp'),
  railSide: p('railSide', railSide, 'Rail side of a new wood privacy fence showing posts and horizontal rails', ['wood', 'privacy', 'process'], 'Yelp'),
  sideYardDog: p('sideYardDog', sideYardDog, 'Wood privacy fence along a side yard with the family dog in the foreground', ['wood', 'privacy', 'pets'], 'Yelp'),
  woodedSide: p('woodedSide', woodedSide, 'Wood privacy fence along a narrow, tree-lined side yard path', ['wood', 'privacy'], 'Yelp'),
  cornerSidewalk: p('cornerSidewalk', cornerSidewalk, 'New wood privacy fence turning the corner along a public sidewalk', ['wood', 'privacy', 'corner-lot'], 'Angi'),
  maple: p('maple', maple, 'Wood privacy fence along a side yard beside a red Japanese maple', ['wood', 'privacy'], 'Angi'),
  largeLot: p('largeLot', largeLot, 'Wood privacy fence enclosing a large backyard lawn with a mature tree', ['wood', 'privacy'], 'Thumbtack'),
  sloped: p('sloped', sloped, 'Wood privacy fence stepping down a sloped sidewalk', ['wood', 'privacy'], 'Thumbtack'),
  shadowCorner: p('shadowCorner', shadowCorner, 'Wood shadow box fence wrapping a corner-lot yard along the public sidewalk', ['wood', 'shadowbox', 'privacy', 'corner-lot'], 'Yelp'),
  shadowLong: p('shadowLong', shadowLong, 'Long stretch of new shadow box fence beside a sidewalk', ['wood', 'shadowbox', 'privacy'], 'Yelp'),
  shadowWide: p('shadowWide', shadowWide, 'Wide-angle view of a new wood shadow box privacy fence across a backyard', ['wood', 'shadowbox', 'privacy'], 'Yelp'),
  shadowGate: p('shadowGate', shadowGate, 'Shadow box fence with a matching walk gate and black strap hinges', ['wood', 'shadowbox', 'gates'], 'Thumbtack'),
  shadowBrick: p('shadowBrick', shadowBrick, 'Wood shadow box fence closing off a side yard next to a brick home', ['wood', 'shadowbox', 'privacy'], 'Thumbtack'),
  picket: p('picket', picket, 'Cedar picket fence with pointed French Gothic pickets along a yard', ['wood', 'picket', 'decorative'], 'Thumbtack'),
  splitRail: p('splitRail', splitRail, 'Wood split rail fence with a driveway gate in front of a ranch home', ['wood', 'split-rail', 'gates', 'decorative'], 'Yelp'),
  stained: p('stained', stained, 'Stained wood fence installed on top of a block retaining wall', ['wood', 'staining'], 'Angi'),
  aluWater: p('aluWater', aluWater, 'Black aluminum fence along a waterfront canal lot', ['aluminum', 'waterfront', 'decorative'], 'Angi'),
  aluYard: p('aluYard', aluYard, 'Black aluminum fence enclosing a backyard lawn', ['aluminum', 'decorative'], 'Angi'),
  aluGate: p('aluGate', aluGate, 'Black aluminum double drive gate across a driveway between two brick homes', ['aluminum', 'gates'], 'Thumbtack'),
  aluGateWide: p('aluGateWide', aluGateWide, 'Black aluminum fence and double drive gate leading to a detached garage', ['aluminum', 'gates'], 'Thumbtack'),
  vinylDouble: p('vinylDouble', vinylDouble, 'White vinyl privacy double gate beside a house', ['vinyl', 'gates', 'privacy'], 'Angi'),
  vinylSingle: p('vinylSingle', vinylSingle, 'White vinyl privacy fence with a single walk gate', ['vinyl', 'gates', 'privacy'], 'Angi'),
  crew: p('crew', crew, 'Two Final Touch Fencing crew members in red shirts installing a black aluminum fence', ['aluminum', 'crew', 'process'], 'Angi'),
};

export const allPhotos = Object.values(photos);
