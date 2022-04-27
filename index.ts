type Variant = ComponentNode;

type VariantProperties = { [key: string]: string };

type Hash = string;

type HashedVariants = { [key: Hash]: Variant };

type StateTrigger = { type: string, source: string, target: string };

type CompleteState = { properties: string[], triggers: StateTrigger[] };

figma.skipInvisibleInstanceChildren = true;

let count = 0;

const components = getComponents();


loopThroughComponents(components);

figma.closePlugin();


function getComponents(): ComponentSetNode[] {

  let selection = figma.currentPage.selection;

  return selection.length ?

    <ComponentSetNode[]>selection.filter(({ type }) => type === "COMPONENT_SET") :

    figma.currentPage.findAllWithCriteria({ types: ['COMPONENT_SET'] });
}


function loopThroughComponents(components: ComponentSetNode[]): void {

  for (let i = 0; i < components.length; i++) {

    const properties = components[i].variantGroupProperties["État"].values;

    const completeState = getCompleteState(properties);

    const variants = <Variant[]>components[i].children;

    loopThroughVariants(variants, completeState);
  }
}


function getCompleteState(properties: string[]): CompleteState {

  const possibleTriggers: StateTrigger[] = [
    { type: "ON_HOVER", source: "Défaut", target: "Survol" },
    { type: "ON_CLICK", source: "Focus", target: "Cliqué" },
    { type: "ON_PRESS", source: "Survol", target: "Focus" },
  ];

  const triggers = possibleTriggers.filter(({ source, target }) => {

    return properties.includes(source) && properties.includes(target)
  });

  return { properties, triggers };
}


function loopThroughVariants(variants: Variant[], completeState: CompleteState): void {

  const hashTable = createHashTable();

  count += variants.length;

  for (let j = 0; j < variants.length; j++) {

    if (!variants[j].variantProperties["État"]) continue

    const hashedVariants = hashTable.addVariant(variants[j]);

    if (!isVariantComplete(hashedVariants, completeState)) continue;

    addReaction(hashedVariants, completeState);
  }
}

function createHashTable() {

  return new class VariantsHashTable extends Map {

    constructor() {

      super();
    }

    addVariant(variant: Variant): HashedVariants {

      const key: Hash = getHashKey(variant.variantProperties);

      if (!this.has(key)) {

        this.set(key, {});
      }

      const variants: HashedVariants = this.get(key);

      variants[variant.variantProperties["État"]] = variant;

      return variants;
    }
  }
}

function getHashKey(variantProperties: VariantProperties): Hash {

  return Object
    .keys(variantProperties)
    .filter(key => key !== "État")
    .sort()
    .map(key => variantProperties[key])
    .join();
}

function isVariantComplete(variants: HashedVariants, completeState: CompleteState): boolean {

  const variantKeys = Object.keys(variants);

  return completeState.properties
    .every(property => variantKeys.includes(property));
}

function addReaction(variants: HashedVariants, completeState: CompleteState): void {
  
  completeState.triggers.forEach(({ type, source, target }) => {
    
    variants[source].reactions = [{
      trigger: <Trigger>{ type },
      action: {
        type: "NODE",
        navigation: "CHANGE_TO",
        destinationId: variants[target].id,
        transition: null,
        preserveScrollPosition: false,
      }
    }
    ]
  });
}