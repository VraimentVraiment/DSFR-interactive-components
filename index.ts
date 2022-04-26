type Variant = ComponentNode;

type VariantProperties = { [key: string]: string };

type Hash = string;

type HashedVariants = { [key: Hash]: Variant };



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

    console.log(components[i].variantGroupProperties["État"]); // XX

    loopThroughVariants(<Variant[]>components[i].children);
  }
}

function loopThroughVariants(variants: Variant[]): void {

  const hashTable = createHashTable();

  count += variants.length;

  for (let j = 0; j < variants.length; j++) {

    if (!variants[j].variantProperties["État"]) continue

    const hashedVariants = hashTable.addVariant(variants[j]);

    if (!hashedVariants["Défaut"] || !hashedVariants["Survol"]) continue;

    addReaction(hashedVariants);
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

function addReaction(variants: HashedVariants): void {

  variants["Défaut"].reactions = [{

    trigger: {
      type: "ON_HOVER",
    },

    action: {
      type: "NODE",
      navigation: "CHANGE_TO",
      destinationId: variants["Survol"].id,
      transition: null,
      preserveScrollPosition: false,
    }
  }];
}