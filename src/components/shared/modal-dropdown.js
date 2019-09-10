import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ViewPropTypes, Platform, View, Text, FlatList, TouchableOpacity } from 'react-native';
import r from 'rnss';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import { Divider, ListItem } from 'react-native-elements';

import listStyles from '../../styles/list';

import { icon } from '../../api/util';
import { fontSizeMedium, fontSizeLarge, iconSizeLarge, modalMargin } from '../../api/constants';

export default function ModalDropdown({ actions, items, selected, onSelect, style }) {
	const [isVisible, setVisible] = useState(false);

	const getOptionText = key => items.find(i => i.key === key).text;

	const theme = actions.getCurrentTheme();

	const styles = {
		modal: r`margin ${modalMargin}`,
		container: r`f 1; bc $contentBackgroundColor`,
		dropdown: r`f 1; fd row; ai center`,
		text: r`
			fw bold
			mr 4
			fs ${Platform.OS === 'ios' ? fontSizeMedium : fontSizeLarge}
			color $headerTextColor
		`
	};
	const listTheme = listStyles();

	return (
		<>
			<TouchableOpacity onPress={() => setVisible(true)}>
				<View style={[styles.dropdown, style]}>
					<Text style={styles.text}>{getOptionText(selected)}</Text>
					<Icon
						name="ios-arrow-down"
						size={fontSizeMedium}
						color={theme.headerTextColor}
					/>
				</View>
			</TouchableOpacity>
			<Modal
				isVisible={isVisible}
				style={styles.modal}
				onBackdropPress={() => setVisible(false)}
				onBackButtonPress={() => setVisible(false)}
			>
				<View style={styles.container}>
					<FlatList
						data={items}
						renderItem={({ item }) => (
							<ListItem
								onPress={() => {
									onSelect && onSelect(item.key);
									setVisible(false);
								}}
								title={item.text}
								titleStyle={listTheme.itemText}
								containerStyle={listTheme.item}
								rightIcon={
									<Icon
										size={iconSizeLarge}
										color={
											item.key === selected
												? theme.formButtonColor
												: theme.textColorDisabled
										}
										name={icon(
											item.key === selected
												? 'radio-button-on'
												: 'radio-button-off'
										)}
									/>
								}
							/>
						)}
						ItemSeparatorComponent={() => <Divider style={listTheme.divider} />}
					/>
				</View>
			</Modal>
		</>
	);
}
ModalDropdown.propTypes = {
	actions: PropTypes.object.isRequired,
	items: PropTypes.arrayOf(
		PropTypes.shape({
			key: PropTypes.string.isRequired,
			text: PropTypes.string.isRequired
		})
	).isRequired,
	selected: PropTypes.string,
	onSelect: PropTypes.func,
	style: ViewPropTypes.style
};
