import { getComponentTriggers, everyTriggerMatch, addReactions } from "./states";
import VariantsHashTable from "./hashtable";

let count = 0;


export default function loopThroughComponents(components: ComponentSetNode[]): void {

    for (let i = 0; i < components.length; i++) {

        const componentStates = components[i]
            .variantGroupProperties["État"]
            .values as StateValue[];

        const variants = components[i]
            .children as Variant[];

        const triggers = getComponentTriggers(componentStates);

        loopThroughVariants(variants, triggers);
    }
}


function loopThroughVariants(variants: Variant[], triggers: StateTrigger[]): void {

    const hashTable = new VariantsHashTable("État");

    count += variants.length;

    for (let j = 0; j < variants.length; j++) {

        if (!variants[j].variantProperties["État"]) continue

        const hashedVariants = hashTable.addVariant(variants[j]);

        const hashedVariantsStates = Object.keys(hashedVariants) as StateValue[];

        if (!everyTriggerMatch(hashedVariantsStates, triggers)) continue;

        addReactions(hashedVariants, triggers);
    }
}