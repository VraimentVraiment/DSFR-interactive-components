export default class VariantsHashTable
    extends Map
    implements VariantsHashTableInterface<Hash, HashedVariants> {


    watchKey: StateKey;


    constructor(watchKey: StateKey) {

        super();

        this.watchKey = watchKey;
    }


    addVariant(variant: Variant): HashedVariants {

        const key: Hash = this.getHashKey(variant);

        if (!this.has(key)) {

            this.set(key, {});
        }

        const variants: HashedVariants = this.get(key);

        variants[variant.variantProperties[this.watchKey]] = variant;

        return variants;
    }


    getHashKey(variant: Variant): Hash {

        return Object
            .keys(variant.variantProperties)
            .filter(key => key !== this.watchKey)
            .sort()
            .map(key => variant.variantProperties[key])
            .join();
    }
}