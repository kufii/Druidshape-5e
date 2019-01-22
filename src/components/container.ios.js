import React from 'react';
import { TabBarIOS, Text } from 'react-native';
import BeastsList from './beasts-list';

export default class Container extends React.Component {
	state = { tab: 'beasts' };

	render() {
		return (
			<TabBarIOS>
				<TabBarIOS.Item
					title='Beasts'
					selected={this.state.tab === 'beasts'}
					onPress={() => this.setState({ tab: 'beasts' })}
				>
					<BeastsList />
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
