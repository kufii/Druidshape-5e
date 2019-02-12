import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, ScrollView, Alert, Share, Clipboard } from 'react-native';
import { ListItem, Divider } from 'react-native-elements';
import { DocumentPicker, FileSystem } from 'expo';
import Toast from 'react-native-root-toast';
import { escapeFileString } from '../../../api/util';
import listStyles from '../../../styles/list';

export default class SettingsScreen extends React.Component {
	static propTypes = {
		screenProps: PropTypes.object,
		navigation: PropTypes.object
	};

	static navigationOptions = {
		title: 'Settings'
	};

	get styles() {
		const { actions } = this.props.screenProps;
		const theme = actions.getCurrentTheme();

		return StyleSheet.create({
			container: {
				flex: 1,
				backgroundColor: theme.contentBackgroundColorDark
			}
		});
	}

	scrollToTop() {
		this.list && this.list.scrollTo({ x: 0, y: 0, animated: true });
	}

	componentDidMount() {
		this.props.navigation.setParams({
			scrollToTop: this.scrollToTop.bind(this)
		});
	}

	render() {
		const { state, actions } = this.props.screenProps;
		const theme = actions.getCurrentTheme();
		const styles = this.styles;
		const listTheme = listStyles(theme);

		return (
			<ScrollView ref={list => this.list = list} contentContainerStyle={styles.container}>
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
					onPress={() => Alert.alert(
						'Export Homebrew',
						'How would you like to export?',
						[
							{
								text: 'File',
								onPress: () => FileSystem.writeAsStringAsync(
									FileSystem.documentDirectory + escapeFileString(`homebrew-${new Date().toLocaleString()}.json`),
									JSON.stringify(state.homebrew, null, 2)
								).then(() => Toast.show('Exported to file.'))
							},
							{
								text: 'Share',
								onPress: () => Share.share({ message: JSON.stringify(state.homebrew, null, 2) })
							}
						]
					)}
				/>
				<Divider style={listTheme.divider} />
				<ListItem
					title='Import Homebrew'
					containerStyle={listTheme.item}
					titleStyle={listTheme.itemText}
					onPress={() => Alert.alert(
						'Import Homebrew',
						'How would you like to import?',
						[
							{
								text: 'File',
								onPress: () => DocumentPicker.getDocumentAsync({ type: 'application/json' })
									.then(({ type, uri }) => type === 'success' && FileSystem.readAsStringAsync(uri))
									.then(doc => doc && JSON.parse(doc))
									.then(beasts => beasts && actions.importHomebrews(beasts))
									.catch(() => Toast.show('Failed to import homebrew.'))
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
			</ScrollView>
		);
	}
}
