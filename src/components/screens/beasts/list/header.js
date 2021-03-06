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
import { icon, range } from '../../../../api/util';
import menuStyles from '../../../../styles/menu';
import { environments } from '../../../../api/beasts';

const options = [
	{ text: 'All', key: '0' },
	...range(2, 20).map(n => ({ text: `Druid Level ${n}`, key: n.toString() }))
];

export const Header = ({ screenProps }) => {
	const { state, actions } = screenProps;
	const character = actions.getCurrentCharacter();
	return {
		headerTitle: (
			<ModalDropdown
				state={state}
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
					activeColor={r.vars().headerTextColor}
					inactiveColor={r.vars().headerColorLight}
				/>
			</View>
		)
	};
};

export const ExtendedHeader = ({ navigation, screenProps }) => {
	const { state, actions } = screenProps;

	const search = state.search;
	const isFiltering = navigation.getParam('isFiltering', false);

	const { filters } = state;

	const styles = {
		container: r`
			f 1
			fd row
			ai center
			pr 5
			bc $headerColor
		`,
		checkbox: r`
			bc $cardColor
			border-color transparent
			m 0; p 0
		`,
		menuItemText: r`c $textColor; fw bold`,
		extraMargin: r`m 0 11`,
		picker: r`
			c $textColor
			border-color $textColorSecondary
		`,
		pickerLabel: r`pb 0`,
		filterContainer: r`
			f 1
			p 10 0 10 ${Platform.OS === 'android' ? 10 : 0}
			bc $headerColor
		`,
		filter: r`bc $headerColorLight; br 20`,
		filterText: r`c $headerTextColor`
	};

	return (
		<View style={styles.container}>
			<SearchBar
				platform={Platform.OS}
				containerStyle={styles.filterContainer}
				inputContainerStyle={styles.filter}
				placeholderTextColor={r.vars().headerTextColorFaded}
				color={r.vars().headerTextColor}
				clearIcon={styles.filterText}
				searchIcon={styles.filterText}
				cancelIcon={styles.filterText}
				inputStyle={styles.filterText}
				placeholder="Filter Beasts"
				cancelButtonTitle="Cancel"
				cancelButtonProps={{
					buttonStyle: 'clear',
					color: r.vars().headerTextColor
				}}
				onChangeText={search => actions.setSearch(search)}
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
						activeColor={r.vars().headerTextColor}
						inactiveColor={r.vars().headerColorLight}
						onToggle={() => navigation.setParams({ isFiltering: !isFiltering })}
					/>
				</MenuTrigger>
				<MenuOptions customStyles={menuStyles().menuOptions}>
					<MenuOption disabled>
						<CheckBox
							containerStyle={styles.checkbox}
							textStyle={styles.menuItemText}
							uncheckedColor={r.vars().textColorDisabled}
							checkedColor={r.vars().formButtonColor}
							checked={filters.seen}
							onPress={() => {
								filters.seen = !filters.seen;
								actions.setFilters(filters);
							}}
							title="Seen"
						/>
					</MenuOption>
					<MenuOption customStyles={{ optionWrapper: styles.pickerLabel }} disabled>
						<Text style={[styles.menuItemText, styles.extraMargin]}>Movement</Text>
					</MenuOption>
					<MenuOption disabled>
						<Picker
							containerStyle={[styles.picker, styles.extraMargin]}
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
							mode="dropdown"
						/>
					</MenuOption>
					<MenuOption customStyles={{ optionWrapper: styles.pickerLabel }} disabled>
						<Text style={[styles.menuItemText, styles.extraMargin]}>Environment</Text>
					</MenuOption>
					<MenuOption disabled>
						<Picker
							containerStyle={[styles.picker, styles.extraMargin]}
							itemStyle={styles.picker}
							value={filters.environment || ''}
							onChange={value => {
								filters.environment = value;
								actions.setFilters(filters);
							}}
							options={[
								{ text: '-', value: '' },
								...environments.map(str => ({ text: str, value: str }))
							]}
							mode="dropdown"
						/>
					</MenuOption>
					<MenuOption disabled>
						<CheckBox
							containerStyle={styles.checkbox}
							textStyle={styles.menuItemText}
							uncheckedColor={r.vars().textColorDisabled}
							checkedColor={r.vars().formButtonColor}
							checked={filters.desc}
							onPress={() => {
								filters.desc = !filters.desc;
								actions.setFilters(filters);
							}}
							title="Sort Descending"
						/>
					</MenuOption>
					<MenuOption disabled>
						<Button
							type="clear"
							titleStyle={styles.menuItemText}
							title="Reset"
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

const globalStyles = {
	margin: r`m 0 5`,
	marginLarge: r`m 0 20`
};
