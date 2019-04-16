import React from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, View } from 'react-native';
import { SearchBar, CheckBox, Button } from 'react-native-elements';
import Toast from 'react-native-root-toast';
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import ModalDropdown from '../../../shared/modal-dropdown';
import ToggleIconButton from '../../../shared/toggle-icon-button';
import { icon } from '../../../../api/util';
import menuStyles from '../../../../styles/menu';

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
	const menuTheme = menuStyles(theme);

	const search = navigation.getParam('search', '');
	const filters = navigation.getParam('filters', {});
	const isFiltering = navigation.getParam('isFiltering', false);

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			flexDirection: 'row',
			alignItems: 'center',
			paddingRight: 5,
			backgroundColor: theme.headerColor
		},
		checkbox: {
			backgroundColor: theme.backgroundColor,
			borderColor: 'transparent',
			margin: 0,
			padding: 0
		},
		menuItemText: {
			color: theme.textColor
		},
		filterContainer: {
			flex: 1,
			paddingTop: 10,
			paddingBottom: 10,
			paddingLeft: Platform.OS === 'android' ? 10 : 0,
			paddingRight: 0,
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
		<View style={styles.container}>
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
			<Menu
				opened={isFiltering}
				onBackdropPress={() => navigation.setParams({ isFiltering: false })}
			>
				<MenuTrigger>
					<ToggleIconButton
						icon={icon('options')}
						active={Object.values(filters).filter(v => v).length > 0}
						activeColor={theme.headerTextColor}
						inactiveColor={theme.headerColorLight}
						onToggle={() => navigation.setParams({ isFiltering: !isFiltering })}
					/>
				</MenuTrigger>
				<MenuOptions customStyles={menuTheme.menuOptions}>
					<MenuOption>
						<CheckBox
							containerStyle={styles.checkbox}
							textStyle={styles.menuItemText}
							uncheckedColor={theme.textColorDisabled}
							checkedColor={theme.formButtonColor}
							checked={filters && filters.seen}
							onPress={() => {
								filters.seen = !filters.seen;
								navigation.setParams({ filters });
							}}
							title='Seen'
						/>
					</MenuOption>
					<MenuOption>
						<Button
							type='clear'
							titleStyle={styles.menuItemText}
							title='Reset'
							onPress={() => navigation.setParams({ filters: {}, isFiltering: false })}
						/>
					</MenuOption>
				</MenuOptions>
			</Menu>
		</View>
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
