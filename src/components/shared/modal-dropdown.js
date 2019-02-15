import React from 'react';
import PropTypes from 'prop-types';
import { ViewPropTypes, Platform, StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import { Divider } from 'react-native-elements';

import listStyles from '../../styles/list';

import { fontSizeMedium, fontSizeLarge } from '../../api/constants';

export default class ModalDropdown extends React.Component {
	state = { visible: false };

	static propTypes = {
		actions: PropTypes.object.isRequired,
		items: PropTypes.arrayOf(PropTypes.shape({
			key: PropTypes.string.isRequired,
			text: PropTypes.string.isRequired
		})).isRequired,
		selected: PropTypes.string,
		onSelect: PropTypes.func,
		style: ViewPropTypes.style
	};

	get styles() {
		const theme = this.props.actions.getCurrentTheme();
		return StyleSheet.create({
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
	}

	closeModal() {
		this.setState({ visible: false });
	}

	getOptionText(key) {
		return this.props.items.find(i => i.key === key).text;
	}

	render() {
		const theme = this.props.actions.getCurrentTheme();
		const styles = this.styles;
		const listTheme = listStyles(theme);
		return (
			<>
				<TouchableOpacity onPress={() => this.setState({ visible: true })}>
					<View style={[styles.dropdown, this.props.style]}>
						<Text style={styles.text}>{this.getOptionText(this.props.selected)}</Text>
						<Icon name='ios-arrow-down' size={fontSizeMedium} color={theme.headerTextColor} />
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
