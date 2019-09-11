import r from 'rnss';

let listStyles;
export const rebuild = () =>
	(listStyles = {
		sectionHeader: r`
		p 2 10
		fs $fontSizeStandard
		fw bold
		bc $contentBackgroundColorDark
		c $textColorSecondary
	`,
		item: r`
		pt 0; pb 0
		h $listItemHeight
		bc $contentBackgroundColor
	`,
		itemText: r`fs $fontSizeMedium; c $textColor`,
		divider: r`bc $dividerColor`
	});
export default () => listStyles;
