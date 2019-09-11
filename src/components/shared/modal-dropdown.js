import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ViewPropTypes, Platform, View, Text, FlatList, TouchableOpacity } from 'react-native';
import r from 'rnss';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import { Divider, ListItem } from 'react-native-elements';

import listStyles from '../../styles/list';

import { icon } from '../../api/util';

export default function ModalDropdown({ items, selected, onSelect, style }) {
	const [isVisible, setVisible] = useState(false);

	const getOptionText = key => items.find(i => i.key === key).text;

	const styles = {
		modal: r`margin $modalMargin`,
		container: r`f 1; bc $contentBackgroundColor`,
		dropdown: r`f 1; fd row; ai center`,
		text: r`
			fw bold
			mr 4
			fs ${Platform.OS === 'ios' ? '$fontSizeMedium' : '$fontSizeLarge'}
			color $headerTextColor
		`
	};

	return (
		<>
			<TouchableOpacity onPress={() => setVisible(true)}>
				<View style={[styles.dropdown, style]}>
					<Text style={styles.text}>{getOptionText(selected)}</Text>
					<Icon
						name="ios-arrow-down"
						size={r.vars().fontSizeMedium}
						color={r.vars().headerTextColor}
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
								titleStyle={listStyles().itemText}
								containerStyle={listStyles().item}
								rightIcon={
									<Icon
										size={r.vars().iconSizeLarge}
										color={
											item.key === selected
												? r.vars().formButtonColor
												: r.vars().textColorDisabled
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
						ItemSeparatorComponent={() => <Divider style={listStyles().divider} />}
					/>
				</View>
			</Modal>
		</>
	);
}
ModalDropdown.propTypes = {
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
