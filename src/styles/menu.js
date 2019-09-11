import r from 'rnss';

let menuStyles;
export const rebuild = () =>
	(menuStyles = {
		menuOptions: {
			optionsWrapper: r`bc $cardColor`,
			optionText: r`c $textColor; m 10`
		},
		rendererProps: {
			anchorStyle: r`bc $cardColor`
		}
	});
export default () => menuStyles;
