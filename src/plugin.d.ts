type stateKey = "État";

type stateValue = "Défaut" | "Survol" | "Focus" | "Cliqué" | "Désactivé";

type stateTrigger = {
	type: "ON_HOVER" | "ON_CLICK" | "ON_PRESS",
	source: stateValue,
	target: stateValue
};

type Variant = ComponentNode;

type hash = string;

type HashedVariants = {
	[key in stateValue]: Variant;
};

interface VariantsHashTableInterface<hash, HashedVariants> extends Map<hash, HashedVariants> {

	get(key: hash): HashedVariants | undefined;

	has(key: hash): boolean;

	set(key: hash, value: HashedVariants): this;

	watchKey: stateKey;

	addVariant(variant: Variant): HashedVariants;

	gethashKey(variant: Variant): hash;
}