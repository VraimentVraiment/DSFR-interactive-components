const numberOfRectangles = 5
// const nodes: SceneNode[] = [];
// for (let i = 0; i < numberOfRectangles; i++) {
//   const rect = figma.createRectangle();
//   rect.x = i * 150;
//   rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
//   figma.currentPage.appendChild(rect);
//   nodes.push(rect);
// }
// figma.currentPage.selection = nodes;
// figma.viewport.scrollAndZoomIntoView(nodes);

// for (const node of figma.currentPage.children) {
//   console.log(node);
// }
const components = figma.currentPage.findAllWithCriteria({
  types: ['COMPONENT_SET']
})

for (const component of components) {

  for (const variant of component.children) {

    console.log("children", variant);
  }
}

figma.closePlugin();
