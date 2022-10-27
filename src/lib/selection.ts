export default function selectComponents(): ComponentSetNode[] {

	const selection = figma.currentPage.selection;

	if (selection.length) {

		return selection.filter(({ type }) => {

			return type === "COMPONENT_SET";

		}) as ComponentSetNode[];

	} else {

		return figma.currentPage
			.findAllWithCriteria({ types: ['COMPONENT_SET'] });
	}
}