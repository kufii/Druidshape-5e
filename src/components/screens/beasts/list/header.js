import React from 'react';
import PropTypes from 'prop-types';
import { Platform, View, Text } from 'react-native';
import r from 'rnss';
import { SearchBar, CheckBox, Button } from 'react-native-elements';
import Toast from 'react-native-root-toast';
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import ModalDropdown from '../../../shared/modal-dropdown';
import ToggleIconButton from '../../../shared/toggle-icon-button';
import Picker from '../../../shared/picker';
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
	const { state, actions } = screenProps;
	const theme = actions.getCurrentTheme();
	const menuTheme = menuStyles(theme);

	const search = navigation.getParam('search', '');
	const isFiltering = navigation.getParam('isFiltering', false);

	const { filters } = state;

	const styles = r({
		container: `
			f 1
			fd row
			ai center
			pr 5
			bc ${theme.headerColor}
		`,
		checkbox: `
			bc ${theme.cardColor}
			border-color transparent
			m 0; p 0
		`,
		menuItemText: `c ${theme.textColor}; fw bold`,
		textExtraMargin: 'm 0 11',
		pickerExtraMargin: 'm 0 4',
		picker: `c ${theme.textColor}; border-color ${theme.textColorSecondary}`,
		pickerLabel: 'pb 0',
		filterContainer: `
			f 1
			p 10 0 10 ${Platform.OS === 'android' ? 10 : 0}
			bc ${theme.headerColor}
		`,
		filter: `bc ${theme.headerColorLight}; br 20`,
		filterText: `c ${theme.headerTextColor}`
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
					<MenuOption disabled>
						<CheckBox
							containerStyle={styles.checkbox}
							textStyle={styles.menuItemText}
							uncheckedColor={theme.textColorDisabled}
							checkedColor={theme.formButtonColor}
							checked={filters.seen}
							onPress={() => {
								filters.seen = !filters.seen;
								actions.setFilters(filters);
							}}
							title='Seen'
						/>
					</MenuOption>
					<MenuOption customStyles={{ optionWrapper: styles.pickerLabel }} disabled>
						<Text style={[styles.menuItemText, styles.textExtraMargin]}>Movement</Text>
					</MenuOption>
					<MenuOption disabled>
						<Picker
							containerStyle={[styles.picker, Platform.OS === 'ios' ? styles.textExtraMargin : styles.pickerExtraMargin]}
							itemStyle={styles.picker}
							value={filters.movement || ''}
							onChange={value => {
								filters.movement = value;
								actions.setFilters(filters);
							}}
							options={[
								{ text: '-', value: '' },
								{ text: 'Fly', value: 'fly' },
								{ text: 'Swim', value: 'swim' },
								{ text: 'Climb', value: 'climb' },
								{ text: 'Burrow', value: 'burrow' }
							]}
							mode='dropdown'
						/>
					</MenuOption>
					<MenuOption disabled>
						<CheckBox
							containerStyle={styles.checkbox}
							textStyle={styles.menuItemText}
							uncheckedColor={theme.textColorDisabled}
							checkedColor={theme.formButtonColor}
							checked={filters.desc}
							onPress={() => {
								filters.desc = !filters.desc;
								actions.setFilters(filters);
							}}
							title='Sort Descending'
						/>
					</MenuOption>
					<MenuOption disabled>
						<Button
							type='clear'
							titleStyle={styles.menuItemText}
							title='Reset'
							onPress={() => {
								actions.setFilters({});
								navigation.setParams({ isFiltering: false });
							}}
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

const globalStyles = r({
	margin: 'm 0 5',
	marginLarge: 'm 0 20'
});
