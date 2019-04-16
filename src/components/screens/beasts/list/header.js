import React from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Toast from 'react-native-root-toast';
import ModalDropdown from '../../../shared/modal-dropdown';
import ToggleIconButton from '../../../shared/toggle-icon-button';
import { icon } from '../../../../api/util';

const options = [
	{ text: 'All', key: '0' },
	...Array.from(new Array(19), (_, i) => ({ text: `Druid Level ${i + 2}`, key: (i + 2).toString() }))
];

export const Header = ({ screenProps }) => {
	const { state, actions } = screenProps;
	const theme = actions.getCurrentTheme();
	const character = actions.getCurrentCharacter();
	return {
		headerTitle: (
			<ModalDropdown
				state={state}
				actions={actions}
				style={globalStyles.marginLarge}
				items={options}
				selected={character.level.toString()}
				onSelect={actions.setLevel}
			/>
		),
		headerRight: (
			<View style={globalStyles.margin}>
				<ToggleIconButton
					icon={icon('moon')}
					active={character.isMoon}
					onToggle={isMoon => {
						actions.toggleMoon();
						Toast.show(`Circle of the Moon ${isMoon ? 'enabled' : 'disabled'}`);
					}}
					activeColor={theme.headerTextColor}
					inactiveColor={theme.headerColorLight}
				/>
			</View>
		)
	};
};

export const ExtendedHeader = ({ navigation, screenProps }) => {
	const { actions } = screenProps;
	const theme = actions.getCurrentTheme();

	const search = navigation.getParam('search', '');
	const filters = navigation.getParam('filters', []);

	const styles = StyleSheet.create({
		filterContainer: {
			paddingTop: 10,
			paddingBottom: 10,
			paddingLeft: Platform.OS === 'android' ? 10 : 0,
			paddingRight: Platform.OS === 'android' ? 10 : 0,
			backgroundColor: theme.headerColor
		},
		filter: {
			backgroundColor: theme.headerColorLight,
			borderRadius: 20
		},
		filterText: {
			color: theme.headerTextColor
		}
	});

	return (
		<>
			<SearchBar
				platform={Platform.OS}
				containerStyle={styles.filterContainer}
				inputContainerStyle={styles.filter}
				placeholderTextColor={theme.headerTextColorFaded}
				color={theme.headerTextColor}
				clearIcon={styles.filterText}
				searchIcon={styles.filterText}
				cancelIcon={styles.filterText}
				inputStyle={styles.filterText}
				placeholder='Filter Beasts'
				cancelButtonTitle='Cancel'
				cancelButtonProps={{
					buttonStyle: 'clear',
					color: theme.headerTextColor
				}}
				onChangeText={search => navigation.setParams({ search })}
				value={search}
			/>
		</>
	);
};
ExtendedHeader.propTypes = {
	navigation: PropTypes.object.isRequired,
	screenProps: PropTypes.shape({
		state: PropTypes.object.isRequired,
		actions: PropTypes.object.isRequired
	}).isRequired
};

const globalStyles = StyleSheet.create({
	margin: {
		marginLeft: 10,
		marginRight: 10
	},
	marginLarge: {
		marginLeft: 20,
		marginRight: 20
	}
});
