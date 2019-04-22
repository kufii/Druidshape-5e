import React from 'react';
import PropTypes from 'prop-types';
import { Platform, View, ScrollView, Alert, Share, Clipboard } from 'react-native';
import r from 'rnss';
import { ListItem, Divider } from 'react-native-elements';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import Toast from 'react-native-root-toast';
import listStyles from '../../../styles/list';
import { iconSizeLarge } from '../../../api/constants';

export default class SettingsScreen extends React.Component {
	static propTypes = {
		screenProps: PropTypes.shape({
			state: PropTypes.object.isRequired,
			actions: PropTypes.object.isRequired
		}).isRequired,
		navigation: PropTypes.object.isRequired
	};

	static navigationOptions = {
		title: 'Settings'
	};

	scrollToTop() {
		this.list && this.list.scrollTo({ x: 0, y: 0, animated: true });
	}

	componentDidMount() {
		this.props.navigation.setParams({
			scrollToTop: this.scrollToTop.bind(this)
		});
	}

	render() {
		const { screenProps, navigation } = this.props;
		const { state, actions } = screenProps;
		const theme = actions.getCurrentTheme();
		const listTheme = listStyles(theme);

		return (
			<View style={r`f 1; bc ${theme.contentBackgroundColorDark}`}>
				<ScrollView ref={list => this.list = list}>
					<ListItem
						title='Dark Mode'
						containerStyle={listTheme.item}
						titleStyle={listTheme.itemText}
						switch={{
							value: state.darkMode,
							thumbColor: theme.formButtonColor,
							onValueChange: value => actions.setDarkMode(value)
						}}
					/>
					<Divider style={listTheme.divider} />
					<ListItem
						title='Export Homebrew'
						containerStyle={listTheme.item}
						titleStyle={listTheme.itemText}
						onPress={() => Share.share({ message: JSON.stringify(state.homebrew, null, 2) })}
					/>
					<Divider style={listTheme.divider} />
					<ListItem
						title='Import Homebrew'
						containerStyle={listTheme.item}
						titleStyle={listTheme.itemText}
						onPress={({ nativeEvent }) => Alert.alert(
							'Import Homebrew',
							'How would you like to import?',
							[
								{
									text: 'File',
									onPress: () => DocumentPicker.show({
										top: nativeEvent.pageY,
										left: nativeEvent.pageX,
										filetype: [
											Platform.OS === 'android' ? 'application/json' : 'public.json',
											DocumentPickerUtil.plainText()
										]
									}, (err, res) => {
										if (err) return Toast.show('Failed to import homebrew.');
										if (res) {
											RNFS.readFile(res.uri)
												.then(doc => doc && JSON.parse(doc))
												.then(beasts => beasts && actions.importHomebrews(beasts))
												.catch(() => Toast.show('Failed to import homebrew.'));
										}
									})
								},
								{
									text: 'Clipboard',
									onPress: () => Clipboard.getString()
										.then(data => data && JSON.parse(data))
										.then(beasts => beasts && actions.importHomebrews(beasts))
										.catch(() => Toast.show('Failed to import homebrew.'))
								}
							]
						)}
					/>
					<Divider style={listTheme.divider} />
					<ListItem
						title='Tip Jar'
						containerStyle={listTheme.item}
						titleStyle={listTheme.itemText}
						chevron={{ size: iconSizeLarge }}
						onPress={() => navigation.navigate('TipJar')}
					/>
				</ScrollView>
			</View>
		);
	}
}
