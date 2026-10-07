// Project photo inventory. All photos are Final Touch Fencing's own project photos,
// published on their Yelp, Thumbtack and Angi profiles (source noted per photo).
// `lowres` photos are small Angi thumbnails: only display them at small sizes.

import deckSunset from '../assets/images/projects/wood-privacy-backyard-deck-sunset.jpg';
import panorama from '../assets/images/projects/wood-privacy-backyard-panorama.jpg';
import brickHouse from '../assets/images/projects/wood-privacy-brick-house.jpg';
import backyardTree from '../assets/images/projects/wood-privacy-backyard-tree.jpg';
import betweenHouses from '../assets/images/projects/wood-privacy-between-houses.jpg';
import doubleGate from '../assets/images/projects/wood-privacy-double-drive-gate.jpg';
import railSide from '../assets/images/projects/wood-privacy-rail-side-view.jpg';
import sideYardDog from '../assets/images/projects/wood-privacy-side-yard-with-dog.jpg';
import woodedSide from '../assets/images/projects/wood-privacy-wooded-side-yard.jpg';
import shadowCorner from '../assets/images/projects/wood-shadowbox-sidewalk-corner-lot.jpg';
import shadowLong from '../assets/images/projects/wood-shadowbox-sidewalk-long-run.jpg';
import shadowWide from '../assets/images/projects/wood-shadowbox-wide-angle.jpg';
import shadowGate from '../assets/images/projects/wood-shadowbox-with-gate.jpg';
import picket from '../assets/images/projects/wood-picket-french-gothic.jpg';
import splitRail from '../assets/images/projects/wood-split-rail-driveway-gate.jpg';
import aluWater from '../assets/images/projects-lowres/aluminum-black-waterfront-canal.jpg';
import aluYard from '../assets/images/projects-lowres/aluminum-black-backyard.jpg';
import vinylDouble from '../assets/images/projects-lowres/vinyl-white-double-gate.jpg';
import vinylSingle from '../assets/images/projects-lowres/vinyl-white-single-gate.jpg';
import stained from '../assets/images/projects-lowres/wood-stained-on-block-retaining-wall.jpg';

const p = (key, src, alt, tags, source, extra = {}) => ({ key, src, alt, tags, source, ...extra });

export const photos = {
  deckSunset: p('deckSunset', deckSunset, 'New wood privacy fence enclosing a backyard lawn beside a composite deck at sunset', ['wood', 'privacy'], 'Yelp'),
  panorama: p('panorama', panorama, 'Long run of new wood privacy fence along a backyard lawn and driveway, panoramic view', ['wood', 'privacy'], 'Thumbtack'),
  brickHouse: p('brickHouse', brickHouse, 'Wood privacy fence with a walk gate connecting to a brick house', ['wood', 'privacy', 'gates'], 'Thumbtack'),
  backyardTree: p('backyardTree', backyardTree, 'Wood privacy fence surrounding a backyard with a mature tree and gravel drive', ['wood', 'privacy'], 'Thumbtack'),
  betweenHouses: p('betweenHouses', betweenHouses, 'Wood privacy fence running between two neighboring homes', ['wood', 'privacy'], 'Yelp'),
  doubleGate: p('doubleGate', doubleGate, 'Wood privacy double gate with black hinges across a concrete walkway', ['wood', 'gates', 'privacy'], 'Yelp'),
  railSide: p('railSide', railSide, 'Rail side of a new wood privacy fence showing posts and horizontal rails', ['wood', 'privacy', 'process'], 'Yelp'),
  sideYardDog: p('sideYardDog', sideYardDog, 'Wood privacy fence along a side yard with the family dog in the foreground', ['wood', 'privacy', 'pets'], 'Yelp'),
  woodedSide: p('woodedSide', woodedSide, 'Wood privacy fence along a narrow, tree-lined side yard path', ['wood', 'privacy'], 'Yelp'),
  shadowCorner: p('shadowCorner', shadowCorner, 'Wood shadow box fence wrapping a corner-lot yard along the public sidewalk', ['wood', 'shadowbox', 'privacy', 'corner-lot'], 'Yelp'),
  shadowLong: p('shadowLong', shadowLong, 'Long stretch of new shadow box fence beside a sidewalk', ['wood', 'shadowbox', 'privacy'], 'Yelp'),
  shadowWide: p('shadowWide', shadowWide, 'Wide-angle view of a new wood shadow box privacy fence across a backyard', ['wood', 'shadowbox', 'privacy'], 'Yelp'),
  shadowGate: p('shadowGate', shadowGate, 'Shadow box fence with a matching walk gate and black strap hinges', ['wood', 'shadowbox', 'gates'], 'Thumbtack'),
  picket: p('picket', picket, 'Cedar picket fence with pointed French Gothic pickets along a yard', ['wood', 'picket', 'decorative'], 'Thumbtack'),
  splitRail: p('splitRail', splitRail, 'Wood split rail fence with a driveway gate in front of a ranch home', ['wood', 'split-rail', 'gates', 'decorative'], 'Yelp'),
  aluWater: p('aluWater', aluWater, 'Black aluminum fence along a waterfront canal lot', ['aluminum', 'waterfront', 'decorative'], 'Angi', { lowres: true }),
  aluYard: p('aluYard', aluYard, 'Black aluminum fence enclosing a backyard lawn', ['aluminum', 'decorative'], 'Angi', { lowres: true }),
  vinylDouble: p('vinylDouble', vinylDouble, 'White vinyl privacy double gate beside a house', ['vinyl', 'gates', 'privacy'], 'Angi', { lowres: true }),
  vinylSingle: p('vinylSingle', vinylSingle, 'White vinyl privacy fence with a single walk gate', ['vinyl', 'gates', 'privacy'], 'Angi', { lowres: true }),
  stained: p('stained', stained, 'Stained wood fence installed on top of a block retaining wall', ['wood', 'staining'], 'Angi', { lowres: true }),
};

export const allPhotos = Object.values(photos);
