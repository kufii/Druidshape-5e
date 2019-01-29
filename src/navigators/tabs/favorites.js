import { createStackNavigator } from 'react-navigation';
import FavoritesScreen from '../../components/screens/favorites';

export default createStackNavigator({
	Favorites: {
		screen: FavoritesScreen
	}
});
