figma.skipInvisibleInstanceChildren = true;

const componentSets = getComponentsToLink();

const start = Date.now();

linkComponents(componentSets);

const delay = Date.now() - start;

const delayInSeconds = delay / 1000;

console.log(`Linked ${componentSets.length} component sets in ${delayInSeconds} seconds`);

figma.closePlugin();


function getComponentsToLink() {

    let selection = figma.currentPage.selection;

    return selection.length ?

        selection.filter(component => component.type === "COMPONENT_SET") :

        figma.currentPage.findAllWithCriteria({
            types: ['COMPONENT_SET']
        });
}

function linkComponents(componentSets) {

    for (const component of componentSets) {

        const variants = getHoverableVariants(component);

        linkMatchingVariants(variants.default, variants.hover);
    }
}

function getHoverableVariants(component) {

    const variants = {
        default: [],
        hover: []
    };

    for (const variant of component.children) {

        if (
            variant.variantProperties["État"] &&
            !variant.variantProperties["Support"] ||
            variant.variantProperties["Support"] === "Desktop"
        ) {

            if (variant.variantProperties["État"] === "Défaut") {

                variants.default.push(variant);

            } else if (variant.variantProperties["État"] === "Survol") {

                variants.hover.push(variant);
            }
        }
    }

    return variants;
}

function linkMatchingVariants(defaultVariants, hoverVariants) {

    for (const defaultVariant of defaultVariants) {

        const matchingHoverVariant = hoverVariants.find(matchEveryPropExceptHover(defaultVariant));

        if (matchingHoverVariant) {

            setReaction(defaultVariant, matchingHoverVariant);

        } else {

            console.log(`No matching hover variant for ${defaultVariant}`);
        }
    }
}

function setReaction(defaultVariant, hoverVariant) {

    defaultVariant.reactions = [{

        action: {
            type: "NODE",
            navigation: "CHANGE_TO",
            destinationId: hoverVariant.id,
            transition: null,
            preserveScrollPosition: false,
        },

        trigger: {
            type: "ON_HOVER",
        }
    }];
}

function matchEveryPropExceptHover(defaultVariant) {

    return (hoverVariant) => {

        for (const prop in defaultVariant.variantProperties) {

            if (prop !== "État") {

                if (hoverVariant.variantProperties[prop] !== defaultVariant.variantProperties[prop]) {
                    return false;
                }
            }
        }

        return true;
    }
}

