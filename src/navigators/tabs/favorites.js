import { createStackNavigator } from 'react-navigation';
import FavoritesScreen from '../../components/screens/favorites';
import DetailsScreen from '../../components/screens/details';

export default createStackNavigator({
	Favorites: {
		screen: FavoritesScreen
	},
	Details: {
		screen: DetailsScreen
	}
});
