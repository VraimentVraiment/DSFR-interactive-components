export default class VariantsHashTable
	extends Map
	implements VariantsHashTableInterface<hash, HashedVariants> {

	watchKey: stateKey;

	constructor(watchKey: stateKey) {

		super();

		this.watchKey = watchKey;
	}

	addVariant(variant: Variant): HashedVariants {

		const key: hash = this.gethashKey(variant);

		if (!this.has(key)) {

			this.set(key, {});
		}

		const variants: HashedVariants = this.get(key);

		variants[variant.variantProperties[this.watchKey]] = variant;

		return variants;
	}

	gethashKey(variant: Variant): hash {

		return Object
			.keys(variant.variantProperties)
			.filter(key => key !== this.watchKey)
			.sort()
			.map(key => variant.variantProperties[key])
			.join();
	}
}