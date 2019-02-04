import React from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, View, Text, FlatList, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Divider } from 'react-native-elements';

import modalStyles from '../../styles/modal';
import listStyles from '../../styles/list';

import { fontSizeMedium, fontSizeLarge, headerTextColor } from '../../api/constants';

export default class ModalDropdown extends React.Component {
	state = { visible: false };

	static propTypes = {
		items: PropTypes.array,
		selected: PropTypes.string,
		onSelect: PropTypes.func
	};

	getOptionText(key) {
		return this.props.items.find(i => i.key === key).text;
	}

	render() {
		return (
			<>
				<TouchableOpacity onPress={() => this.setState({ visible: true })}>
					<View style={styles.container}>
						<Text style={styles.text}>{this.getOptionText(this.props.selected)}</Text>
						<Icon name='ios-arrow-down' size={fontSizeMedium} color={headerTextColor} />
					</View>
				</TouchableOpacity>
				<Modal visible={this.state.visible} transparent onRequestClose={() => null}>
					<TouchableWithoutFeedback onPress={() => this.setState({ visible: false })}>
						<View style={modalStyles.container}>
							<FlatList
								data={this.props.items}
								renderItem={({ item }) => (
									<TouchableOpacity
										onPress={() => {
											this.props.onSelect && this.props.onSelect(item.key);
											this.setState({ visible: false });
										}}
									>
										<View style={listStyles.item}>
											<Text style={listStyles.itemText}>{item.text}</Text>
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
		alignItems: 'center',
		marginLeft: 10,
		marginRight: 10
	},
	text: {
		fontWeight: 'bold',
		marginRight: 4,
		fontSize: Platform.OS === 'ios' ? fontSizeMedium : fontSizeLarge,
		color: headerTextColor
	}
});
