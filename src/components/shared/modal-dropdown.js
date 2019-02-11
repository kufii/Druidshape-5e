import React from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import { Divider } from 'react-native-elements';

import listStyles from '../../styles/list';

import { fontSizeMedium, fontSizeLarge, lightTheme } from '../../api/constants';

export default class ModalDropdown extends React.Component {
	state = { visible: false };

	static propTypes = {
		items: PropTypes.array,
		selected: PropTypes.string,
		onSelect: PropTypes.func,
		style: PropTypes.object
	};

	closeModal() {
		this.setState({ visible: false });
	}

	getOptionText(key) {
		return this.props.items.find(i => i.key === key).text;
	}

	render() {
		const listTheme = listStyles(lightTheme);
		return (
			<>
				<TouchableOpacity onPress={() => this.setState({ visible: true })}>
					<View style={[styles.dropdown, this.props.style]}>
						<Text style={styles.text}>{this.getOptionText(this.props.selected)}</Text>
						<Icon name='ios-arrow-down' size={fontSizeMedium} color={lightTheme.headerTextColor} />
					</View>
				</TouchableOpacity>
				<Modal isVisible={this.state.visible} onBackdropPress={() => this.closeModal()} onBackButtonPress={() => this.closeModal()}>
					<View style={styles.container}>
						<FlatList
							data={this.props.items}
							renderItem={({ item }) => (
								<TouchableOpacity
									onPress={() => {
										this.props.onSelect && this.props.onSelect(item.key);
										this.closeModal();
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
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: lightTheme.contentBackgroundColor
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
		color: lightTheme.headerTextColor
	}
});
