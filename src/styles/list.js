import r from 'rnss';
import { listItemHeight, fontSizeStandard, fontSizeMedium } from '../api/constants';

export default theme => ({
	sectionHeader: r`
		p 2 10
		fs ${fontSizeStandard}
		fw bold
		bc ${theme.contentBackgroundColorDark}
		c ${theme.textColorSecondary}
	`,
	item: r`
		pt 0; pb 0
		h ${listItemHeight}
		bc ${theme.contentBackgroundColor}
	`,
	itemText: r`fs ${fontSizeMedium}; c ${theme.textColor}`,
	divider: r`bc ${theme.dividerColor}`
});
