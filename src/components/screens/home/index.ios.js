import React from 'react';
import PropTypes from 'prop-types';
import { TabBarIOS, Text } from 'react-native';
import ModalDropdown from '../../shared/modal-dropdown';
import BeastsTab from './beasts-tab';

const options = [
	{ text: 'All', key: '0' },
	...Array.from(new Array(20), (_, i) => ({ text: `Druid Level ${i + 1}`, key: (i + 1).toString() }))
];

export default class HomeScreen extends React.Component {
	state = {
		tab: 'beasts'
	};

	static propTypes = {
		navigation: PropTypes.object
	};

	static navigationOptions = ({ navigation }) => ({
		headerTitle: (
			<ModalDropdown
				items={options}
				selected={navigation.getParam('level', '0')}
				onSelect={level => navigation.setParams({ level })}
			/>
		)
	});

	render() {
		return (
			<TabBarIOS>
				<TabBarIOS.Item
					title='Beasts'
					selected={this.state.tab === 'beasts'}
					onPress={() => this.setState({ tab: 'beasts' })}
				>
					<BeastsTab
						level={parseInt(this.props.navigation.getParam('level', '0'))}
						navigation={this.props.navigation}
					/>
				</TabBarIOS.Item>
				<TabBarIOS.Item
					title='Favorites'
					selected={this.state.tab === 'favs'}
					onPress={() => this.setState({ tab: 'favs' })}
				>
					<Text>Favsrtss</Text>
				</TabBarIOS.Item>
				<TabBarIOS.Item
					title='Search'
					selected={this.state.tab === 'search'}
					onPress={() => this.setState({ tab: 'search' })}
				>
					<Text>Favsrtss</Text>
				</TabBarIOS.Item>
			</TabBarIOS>
		);
	}
}
