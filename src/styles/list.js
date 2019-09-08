import r from 'rnss';
import { listItemHeight, fontSizeStandard, fontSizeMedium } from '../api/constants';

export default theme =>
	r({
		sectionHeader: `
		p 2 10
		fs ${fontSizeStandard}
		fw bold
		bc ${theme.contentBackgroundColorDark}
		c ${theme.textColorSecondary}
	`,
		item: `
		pt 0; pb 0
		h ${listItemHeight}
		bc ${theme.contentBackgroundColor}
	`,
		itemText: `fs ${fontSizeMedium}; c ${theme.textColor}`,
		divider: `bc ${theme.dividerColor}`
	});
