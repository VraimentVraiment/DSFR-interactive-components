figma.skipInvisibleInstanceChildren = true;

let count = 0;

const components = getComponents();

loopThroughComponents(components);

figma.closePlugin();

// figma.showUI(__html__);


function getComponents() {

    let selection = figma.currentPage.selection;

    return selection.length ?

        selection.filter(component => component.type === "COMPONENT_SET") :

        figma.currentPage.findAllWithCriteria({
            types: ['COMPONENT_SET']
        });
}



function loopThroughComponents(components) {

    let i, length = components.length;

    for (i = 0; i < length; i++) {

        loopThroughVariants(components[i].children);
    }
}


function loopThroughVariants(variants) {

    const hashTable = createHashTable();

    let j, length = variants.length;

    count += length;

    for (j = 0; j < length; j++) {

        if (!variants[j].variantProperties["État"]) continue

        const boundVariants = hashTable.addVariant(variants[j]);

        if (!boundVariants["Défaut"] || !boundVariants["Survol"]) continue;

        addReaction(boundVariants);
    }
}



function getKey(variantProperties) {

    return Object
        .keys(variantProperties)
        .filter(key => key !== "État")
        .sort()
        .map(key => variantProperties[key])
        .join("|");
}



function addReaction(variants) {

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



function createHashTable() {

    return new class VariantsHashTable extends Map {

        constructor(iterable) {

            super(iterable);
        }

        addVariant(variant) {

            const key = getKey(variant.variantProperties);

            if (!this.has(key)) {

                this.set(key, {});
            }

            const variants = this.get(key);

            variants[variant.variantProperties["État"]] = variant;

            return variants;
        }
    }
}  
