import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, FlatList, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Divider } from 'react-native-elements';

import modalStyles from '../../styles/modal.js';
import listStyles from '../../styles/list.js';

import { fontSizeMedium } from '../../api/constants.js';

export default class ModalDropdown extends React.Component {
	state = { visible: false };

	static propTypes = {
		items: PropTypes.array.isRequired,
		selected: PropTypes.string,
		onSelect: PropTypes.func
	};

	getOptionText(value) {
		return this.props.items.find(i => i.value === value).text;
	}

	render() {
		return (
			<>
				<TouchableOpacity onPress={() => this.setState({ visible: true })}>
					<View style={styles.container}>
						<Text style={styles.text}>{this.getOptionText(this.props.selected)}</Text>
						<Icon name='ios-arrow-down' size={fontSizeMedium} />
					</View>
				</TouchableOpacity>
				<Modal visible={this.state.visible} transparent>
					<TouchableWithoutFeedback onPress={() => this.setState({ visible: false })}>
						<View style={modalStyles.container}>
							<FlatList
								data={this.props.items.map(i => ({ key: i.value }))}
								renderItem={({ item }) => (
									<TouchableOpacity
										onPress={() => {
											this.props.onSelect && this.props.onSelect(item.key);
											this.setState({ visible: false });
										}}
									>
										<View style={listStyles.item}>
											<Text style={listStyles.itemText}>{this.getOptionText(item.key)}</Text>
										</View>
									</TouchableOpacity>
								)}
								ItemSeparatorComponent={() => <Divider style={listStyles.divider} />}
								style={modalStyles.content}
							/>
						</View>
					</TouchableWithoutFeedback>
				</Modal>
			</>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center'
	},
	text: {
		fontWeight: 'bold',
		marginRight: 4,
		fontSize: fontSizeMedium
	}
});
