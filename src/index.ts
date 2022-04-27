import selectComponents from "./lib/selection";

import loopThroughComponents from "./lib/loop";


figma.skipInvisibleInstanceChildren = true;

const components = selectComponents();

loopThroughComponents(components);

figma.closePlugin();