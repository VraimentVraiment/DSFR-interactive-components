export default function selectComponents(): ComponentSetNode[] {

  let selection = figma.currentPage.selection;

  return selection.length ?

    getComponentSets.inSelection(selection) :
    getComponentSets.inPage();
}


const getComponentSets = {

  inSelection(selection: readonly SceneNode[]): ComponentSetNode[] {

    return selection.filter(({ type }) => {

      return type === "COMPONENT_SET";

    }) as ComponentSetNode[];
  },


  inPage(): ComponentSetNode[] {

    return figma.currentPage
      .findAllWithCriteria({ types: ['COMPONENT_SET'] });
  }
  
}