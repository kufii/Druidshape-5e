import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, FlatList, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Divider } from 'react-native-elements';

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
						<Icon name='ios-arrow-down' size={16} />
					</View>
				</TouchableOpacity>
				<Modal visible={this.state.visible} transparent>
					<TouchableWithoutFeedback onPress={() => this.setState({ visible: false })}>
						<View style={styles.modal}>
							<FlatList
								data={this.props.items.map(i => ({ key: i.value }))}
								renderItem={({ item }) => (
									<TouchableOpacity
										onPress={() => {
											this.props.onSelect && this.props.onSelect(item.key);
											this.setState({ visible: false });
										}}
									>
										<Text style={styles.item}>{this.getOptionText(item.key)}</Text>
									</TouchableOpacity>
								)}
								ItemSeparatorComponent={() => <Divider style={styles.divider} />}
								style={styles.list}
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
		fontSize: 16
	},
	modal: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: 'rgba(52, 52, 52, 0.5)',
		marginTop: 64
	},
	list: {
		flex: 1,
		width: '95%',
		backgroundColor: '#fff',
		marginTop: 20,
		marginBottom: 20,
		borderRadius: 20
	},
	item: {
		padding: 10,
		fontSize: 18,
		height: 44
	},
	divider: {
		marginLeft: 10,
		marginRight: 10
	}
});
