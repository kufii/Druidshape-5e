import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, FlatList } from 'react-native';
import { ListItem, Divider } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import LoadingScreen from '../../shared/loading-screen';
import { getPref } from '../../../api/user-prefs';
import { icon } from '../../../api/util';
import listStyles from '../../../styles/list';
import { iconSizeMedium, iconSizeLarge, textColorHeader, contentBackgroundColorDark, listIconColor } from '../../../api/constants';

export default class HomebrewScreen extends React.Component {
	state = {
		isLoading: true,
		homebrew: []
	};

	static propTypes = {
		navigation: PropTypes.object
	};

	static navigationOptions = {
		title: 'Homebrew'
	};

	componentDidMount() {
		getPref('homebrew', []).then(homebrew => this.setState({ homebrew, isLoading: false }));
	}

	render() {
		return this.state.isLoading ? <LoadingScreen /> : (
			<View style={styles.container}>
				<FlatList
					data={this.state.homebrew.map(({ name }) => name).sort()}
					renderItem={({ item }) => (
						<ListItem
							title={item}
							titleStyle={listStyles.itemText}
							rightIcon={
								<Icon name={icon('arrow-forward')} size={iconSizeLarge} color={listIconColor} />
							}
						/>
					)}
					keyExtractor={(item, index) => index.toString()}
					ItemSeparatorComponent={() => <Divider />}
				/>
				<ActionButton onPress={() => this.props.navigation.navigate('HomebrewAdd')} degrees={0}>
					<Icon name={icon('add')} size={iconSizeMedium} color={textColorHeader} />
				</ActionButton>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: contentBackgroundColorDark
	}
});
