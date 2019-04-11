import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ViewPropTypes, Platform, StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import { Divider } from 'react-native-elements';

import listStyles from '../../styles/list';

import { fontSizeMedium, fontSizeLarge } from '../../api/constants';

export default function ModalDropdown({ actions, items, selected, onSelect, style }) {
	const [isVisible, setVisible] = useState(false);

	const getOptionText = key => items.find(i => i.key === key).text;

	const theme = actions.getCurrentTheme();

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: theme.contentBackgroundColor
		},
		dropdown: {
			flex: 1,
			flexDirection: 'row',
			alignItems: 'center'
		},
		text: {
			fontWeight: 'bold',
			marginRight: 4,
			fontSize: Platform.OS === 'ios' ? fontSizeMedium : fontSizeLarge,
			color: theme.headerTextColor
		}
	});
	const listTheme = listStyles(theme);

	return (
		<>
			<TouchableOpacity onPress={() => setVisible(true)}>
				<View style={[styles.dropdown, style]}>
					<Text style={styles.text}>{getOptionText(selected)}</Text>
					<Icon name='ios-arrow-down' size={fontSizeMedium} color={theme.headerTextColor} />
				</View>
			</TouchableOpacity>
			<Modal isVisible={isVisible} onBackdropPress={() => setVisible(false)} onBackButtonPress={() => setVisible(false)}>
				<View style={styles.container}>
					<FlatList
						data={items}
						renderItem={({ item }) => (
							<TouchableOpacity
								onPress={() => {
									onSelect && onSelect(item.key);
									setVisible(false);
								}}
							>
								<View style={listTheme.itemCompact}>
									<Text style={listTheme.itemText}>{item.text}</Text>
								</View>
							</TouchableOpacity>
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
	items: PropTypes.arrayOf(PropTypes.shape({
		key: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired
	})).isRequired,
	selected: PropTypes.string,
	onSelect: PropTypes.func,
	style: ViewPropTypes.style
};
