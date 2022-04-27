type StateKey = "État";

type StateValue = "Défaut" | "Survol" | "Focus" | "Cliqué" | "Désactivé";

type StateTrigger = {
    type: "ON_HOVER" | "ON_CLICK" | "ON_PRESS",
    source: StateValue,
    target: StateValue
};

type Variant = ComponentNode;

type Hash = string;

type HashedVariants = {
    [key in StateValue]: Variant;
};

interface VariantsHashTableInterface {

    watchKey: StateKey;

    addVariant(variant: Variant): HashedVariants;

    getHashKey(variant: Variant): Hash;
}