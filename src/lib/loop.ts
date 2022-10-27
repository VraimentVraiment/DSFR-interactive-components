import { getComponentTriggers, everyTriggerMatch, addReactions } from "./states";

import VariantsHashTable from "./hashtable";

let count = 0;

export default function loopThroughComponents(components: ComponentSetNode[]): void {

	for (let i = 0; i < components.length; i++) {

		const componentStates = components[i]
			.variantGroupProperties["État"]?.values as stateValue[];

		if (!componentStates) continue;

		const variants = components[i]
			.children as Variant[];

		const triggers = getComponentTriggers(componentStates);

		loopThroughVariants(variants, triggers);
	}
}

function loopThroughVariants(variants: Variant[], triggers: stateTrigger[]): void {

	const hashTable = new VariantsHashTable("État");

	count += variants.length;

	for (let j = 0; j < variants.length; j++) {

		if (!variants[j].variantProperties["État"]) continue

		const HashedVariants = hashTable.addVariant(variants[j]);

		const HashedVariantsStates = Object.keys(HashedVariants) as stateValue[];

		if (!everyTriggerMatch(HashedVariantsStates, triggers)) continue;

		addReactions(HashedVariants, triggers);
	}
}