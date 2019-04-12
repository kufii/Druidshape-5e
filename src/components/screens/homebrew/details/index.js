import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import InputScrollView from 'react-native-input-scroll-view';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import AlertDelete from './alert-delete';
import { icon } from '../../../../api/util';
import { iconSizeLarge, bottomButtonHeight, lightTheme } from '../../../../api/constants';

import { Form, getStruct, getOptions } from './form';

export default class HomebrewDetailsScreen extends React.Component {
	static propTypes = {
		navigation: PropTypes.object.isRequired,
		screenProps: PropTypes.shape({
			state: PropTypes.object.isRequired,
			actions: PropTypes.object.isRequired
		}).isRequired
	};

	static navigationOptions = ({ navigation, screenProps }) => ({
		title: navigation.getParam('edit') ? 'Edit Beast' : 'Add New Beast',
		headerRight: navigation.getParam('edit') ? (
			<Button
				type='clear'
				buttonStyle={globalStyles.deleteButton}
				icon={<Icon name={icon('trash')} color={lightTheme.headerTextColor} size={iconSizeLarge} />}
				onPress={() => AlertDelete(
					navigation.getParam('edit'),
					screenProps.actions,
					() => navigation.dismiss()
				)}
			/>
		) : null,
		headerLeft: null,
		gesturesEnabled: false
	});

	constructor(props) {
		super(props);

		const { state, actions } = props.screenProps;
		const beasts = actions.getAllBeasts().filter(b => b.name !== this.edit);

		const struct = getStruct(beasts);
		const model = (this.edit && state.homebrew.find(h => h.name === this.edit)) || {};

		this.state = { struct, model };
	}

	get edit() {
		return this.props.navigation.getParam('edit');
	}

	get theme() {
		const { actions } = this.props.screenProps;
		return actions.getCurrentTheme();
	}

	get styles() {
		const theme = this.theme;

		return StyleSheet.create({
			container: {
				flex: 1,
				flexDirection: 'column',
				justifyContent: 'center',
				backgroundColor: theme.contentBackgroundColor
			},
			form: {
				flex: 1
			},
			formContent: {
				padding: 10
			},
			buttons: {
				flexDirection: 'row',
				justifyContent: 'space-between',
				borderTopColor: theme.formButtonColor,
				borderTopWidth: StyleSheet.hairlineWidth
			},
			button: {
				width: '50%',
				borderRadius: 0
			},
			btn: {
				height: bottomButtonHeight + getBottomSpace()
			},
			cancelButton: {
				backgroundColor: theme.formButtonColorSecondary
			},
			cancelButtonTitle: {
				color: theme.formButtonColor,
				paddingBottom: getBottomSpace()
			},
			saveButton: {
				backgroundColor: theme.formButtonColor
			},
			saveButtonTitle: {
				color: '#fff',
				paddingBottom: getBottomSpace()
			},
			deleteButton: {
				marginRight: 10,
				borderRadius: 100
			}
		});
	}

	submit() {
		const beast = this.form.getValue();
		if (beast) {
			const { actions } = this.props.screenProps;
			if (this.edit) {
				actions.editHomebrew(this.edit, beast);
			} else {
				actions.addHomebrew(beast);
			}
			this.props.navigation.dismiss();
		}
	}

	validate(key) {
		const component = this.form.getComponent(key);
		if (component) {
			component.validate();
		}
	}

	render() {
		const styles = this.styles;
		return (
			<View style={styles.container}>
				<View style={styles.form}>
					<InputScrollView
						contentContainerStyle={styles.formContent}
						keyboardOffset={40 + bottomButtonHeight}
						behavior='padding'
					>
						<Form
							ref={form => this.form = form}
							type={this.state.struct}
							options={getOptions(this.theme)}
							value={this.state.model}
							onChange={(model, key) => {
								this.validate(key);
								this.setState({ model });
							}}
						/>
					</InputScrollView>
				</View>
				<View style={styles.buttons}>
					<Button
						title='Cancel'
						type='clear'
						containerStyle={[styles.button, styles.cancelButton]}
						buttonStyle={styles.btn}
						titleStyle={styles.cancelButtonTitle}
						onPress={() => this.props.navigation.dismiss()}
					/>
					<Button
						title='Save'
						type='clear'
						containerStyle={[styles.button, styles.saveButton]}
						buttonStyle={styles.btn}
						titleStyle={styles.saveButtonTitle}
						onPress={() => this.submit()}
					/>
				</View>
			</View>
		);
	}
}

const globalStyles = StyleSheet.create({
	deleteButton: {
		marginRight: 10,
		borderRadius: 100
	}
});
