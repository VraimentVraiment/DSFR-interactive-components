figma.skipInvisibleInstanceChildren = true;
let count = 0;
const components = getComponents();
loopThroughComponents(components);
figma.closePlugin();
function getComponents() {
    let selection = figma.currentPage.selection;
    return selection.length ?
        selection.filter(({ type }) => type === "COMPONENT_SET") :
        figma.currentPage.findAllWithCriteria({ types: ['COMPONENT_SET'] });
}
function loopThroughComponents(components) {
    for (let i = 0; i < components.length; i++) {
        const properties = components[i].variantGroupProperties["État"].values;
        const completeState = getCompleteState(properties);
        const variants = components[i].children;
        loopThroughVariants(variants, completeState);
    }
}
function getCompleteState(properties) {
    const possibleTriggers = [
        { type: "ON_HOVER", source: "Défaut", target: "Survol" },
        { type: "ON_CLICK", source: "Focus", target: "Cliqué" },
        { type: "ON_PRESS", source: "Survol", target: "Focus" },
    ];
    const triggers = possibleTriggers.filter(({ source, target }) => {
        return properties.includes(source) && properties.includes(target);
    });
    return { properties, triggers };
}
function loopThroughVariants(variants, completeState) {
    const hashTable = createHashTable();
    count += variants.length;
    for (let j = 0; j < variants.length; j++) {
        if (!variants[j].variantProperties["État"])
            continue;
        const hashedVariants = hashTable.addVariant(variants[j]);
        if (!isVariantComplete(hashedVariants, completeState))
            continue;
        addReaction(hashedVariants, completeState);
    }
}
function createHashTable() {
    return new class VariantsHashTable extends Map {
        constructor() {
            super();
        }
        addVariant(variant) {
            const key = getHashKey(variant.variantProperties);
            if (!this.has(key)) {
                this.set(key, {});
            }
            const variants = this.get(key);
            variants[variant.variantProperties["État"]] = variant;
            return variants;
        }
    };
}
function getHashKey(variantProperties) {
    return Object
        .keys(variantProperties)
        .filter(key => key !== "État")
        .sort()
        .map(key => variantProperties[key])
        .join();
}
function isVariantComplete(variants, completeState) {
    const variantKeys = Object.keys(variants);
    return completeState.properties
        .every(property => variantKeys.includes(property));
}
function addReaction(variants, completeState) {
    completeState.triggers.forEach(({ type, source, target }) => {
        variants[source].reactions = [{
                trigger: { type },
                action: {
                    type: "NODE",
                    navigation: "CHANGE_TO",
                    destinationId: variants[target].id,
                    transition: null,
                    preserveScrollPosition: false,
                }
            }
        ];
    });
}
