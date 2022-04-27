const POSSIBLE_TRIGGERS: StateTrigger[] = [
  { type: "ON_HOVER", source: "Défaut", target: "Survol" },
  { type: "ON_CLICK", source: "Focus", target: "Cliqué" },
  { type: "ON_PRESS", source: "Survol", target: "Focus" },
];


export function getComponentTriggers(stateValues: StateValue[]): StateTrigger[] {

  return POSSIBLE_TRIGGERS.filter(triggersMatch(stateValues));
}


export function triggersMatch(stateValues: StateValue[]): (trigger: StateTrigger) => boolean {

  return ({ source, target }: StateTrigger): boolean => {

    return (
      stateValues.includes(source) &&
      stateValues.includes(target)
    )
  }
}


export function everyTriggerMatch(stateValues: StateValue[], triggers: StateTrigger[]): boolean {

  return triggers
    .every(triggersMatch(stateValues));
}


export function addReactions(variants: HashedVariants, triggers: StateTrigger[]): void {

  for (const { type, source, target } of triggers) {

    addReaction(variants[source], variants[target], { type });
  }
}


function addReaction(sourceVariant: Variant, targetVariant: Variant, trigger: Trigger): void {

  sourceVariant.reactions = [{

    trigger,
    
    action: {
      type: "NODE",
      navigation: "CHANGE_TO",
      destinationId: targetVariant.id,
      transition: null,
      preserveScrollPosition: false,
    }
    
  }];
}