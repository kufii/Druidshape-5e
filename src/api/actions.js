import { Alert } from 'react-native';
import Toast from 'react-native-root-toast';
import t from 'tcomb-validation';
import * as RNIap from 'react-native-iap';
import r from 'rnss';
import { getStruct } from '../components/screens/homebrew/details/form';
import beasts from '../data/beasts.json';
import products from '../data/iap.json';
import { filterBeasts, crToNum } from './beasts';
import { setPref, loadPrefs, initialPrefs } from './user-prefs';
import { toDict, iterate, groupBy, sortBy, desc } from './util';
import { lightTheme, darkTheme } from './constants';

const homebrewStruct = getStruct();

export const initialState = {
	...initialPrefs,
	isLoading: true,
	iaps: [],
	beasts,
	search: ''
};

export const actions = (update, states) => {
	const syncPrefs = () =>
		setPref(
			'prefs',
			Object.keys(initialPrefs).reduce(
				(obj, key) => Object.assign(obj, { [key]: states()[key] }),
				{}
			)
		);

	const privateActions = {
		async iapConnection(cb) {
			try {
				await RNIap.initConnection();
				await Promise.resolve(cb());
			} catch (e) {
				console.log(e);
			} finally {
				try {
					await RNIap.endConnection();
				} catch (e) {
					console.log(e);
				}
			}
		},
		iapTransaction: cb =>
			privateActions.iapConnection(async () => {
				RNIap.clearTransaction();
				await Promise.resolve(cb());
				RNIap.finishTransaction();
			}),
		removeFalse: obj =>
			Object.entries(obj)
				.filter(([_, value]) => value)
				.reduce(toDict(([key]) => key, () => true), {}),
		getHomebrewImportMergeList: beasts =>
			new Promise((resolve, reject) => {
				const toImport = [];
				const iterator = iterate(beasts);

				const next = () => {
					const { value, done } = iterator.next();
					if (done) {
						resolve(toImport);
					} else if (!t.validate(value, homebrewStruct).isValid()) {
						reject(new Error('Invalid Data'));
					} else if (states().beasts.find(b => b.name === value.name)) {
						next();
					} else if (states().homebrew.find(b => b.name === value.name)) {
						Alert.alert(
							`${value.name} Already Exists`,
							`There is already an existing homebrew named ${value.name}.`,
							[
								{
									text: 'Cancel',
									style: 'cancel',
									onPress: () => resolve([])
								},
								{
									text: 'Skip',
									onPress: () => next()
								},
								{
									text: 'Replace',
									onPress: () => {
										toImport.push(value);
										next();
									}
								}
							]
						);
					} else {
						toImport.push(value);
						next();
					}
				};
				next();
			})
	};
	const actions = {
		loadPrefs: async () => {
			const prefs = await loadPrefs();
			r.vars(prefs.darkMode ? darkTheme : lightTheme);
			update({
				...prefs,
				isLoading: false
			});
		},
		loadProducts: () =>
			privateActions.iapConnection(async () => {
				const iaps = await RNIap.getProducts(products);
				await RNIap.consumeAllItems();
				update({ iaps });
			}),
		buyProduct: productId =>
			privateActions.iapTransaction(async () => {
				const { purchaseToken } = await RNIap.buyProduct(productId);
				await RNIap.consumePurchase(purchaseToken);
				Toast.show('Thank you for supporting Druidshape 5e!');
			}),
		setDarkMode: darkMode => {
			update({ darkMode });
			r.vars(darkMode ? darkTheme : lightTheme);
			syncPrefs();
		},
		getCurrentTheme: () => (states().darkMode ? darkTheme : lightTheme),
		getCurrentCharacter: () =>
			states().characters.find(c => c.key === states().selectedCharacter),
		toggleMoon: () => {
			const characters = states().characters;
			const char = characters.find(c => c.key === states().selectedCharacter);
			char.isMoon = !char.isMoon;
			update({ characters });
			syncPrefs();
		},
		setLevel: level => {
			const characters = states().characters;
			const char = characters.find(c => c.key === states().selectedCharacter);
			level = parseInt(level);
			char.level = level;
			update({ characters });
			syncPrefs();
		},
		setFilters: filters => {
			update({ filters });
			syncPrefs();
		},
		setSearch: search => update({ search }),
		toggleFav: name => {
			const characters = states().characters;
			const char = characters.find(c => c.key === states().selectedCharacter);
			const favs = char.favs;
			favs[name] = !favs[name];
			update({ characters });
			syncPrefs();
		},
		toggleSeen: name => {
			const characters = states().characters;
			const char = characters.find(c => c.key === states().selectedCharacter);
			const seen = char.seen;
			seen[name] = !seen[name];
			update({ characters });
			syncPrefs();
		},
		addCharacter: name => {
			const characters = states().characters;
			const key = Math.max(...characters.map(c => c.key)) + 1;
			characters.push({ ...initialPrefs.characters[0], name, key });
			update({ characters });
			syncPrefs();
			return key;
		},
		removeCharacter: key => {
			const characters = states().characters.filter(c => c.key !== key);
			if (characters.length) {
				const selectedCharacter =
					states().selectedCharacter === key
						? characters[0].key
						: states().selectedCharacter;
				update({ characters, selectedCharacter });
				syncPrefs();
			} else {
				Toast.show('You must have at least one character.');
			}
		},
		renameCharacter: (key, name) => {
			const characters = states().characters;
			characters.find(c => c.key === key).name = name;
			update({ characters });
			syncPrefs();
		},
		selectCharacter: key => {
			update({ selectedCharacter: key });
			syncPrefs();
		},
		addHomebrew: beast => {
			const homebrew = [...states().homebrew, beast];
			update({ homebrew });
			syncPrefs();
		},
		editHomebrew: (name, beast) => {
			const homebrew = [...states().homebrew.filter(h => h.name !== name), beast];
			const characters = states().characters;
			if (name !== beast.name) {
				characters.forEach(char => {
					const { favs, seen } = char;

					favs[beast.name] = favs[name];
					favs[name] = false;
					char.favs = privateActions.removeFalse(favs);

					seen[beast.name] = favs[name];
					seen[beast.name] = false;
					char.seen = privateActions.removeFalse(seen);
				});
			}
			update({ homebrew, characters });
			syncPrefs();
		},
		deleteHomebrew: name => {
			const homebrew = states().homebrew.filter(h => h.name !== name);
			const characters = states().characters;
			characters.forEach(char => {
				const { favs, seen } = char;

				favs[name] = false;
				char.favs = privateActions.removeFalse(favs);

				seen[name] = false;
				char.seen = privateActions.removeFalse(seen);
			});
			update({ homebrew, characters });
			syncPrefs();
		},
		importHomebrews: beasts =>
			privateActions.getHomebrewImportMergeList(beasts).then(beasts => {
				if (beasts.length > 0) {
					let homebrew = states().homebrew;
					beasts.forEach(b => {
						homebrew = homebrew.filter(h => h.name !== b.name);
						homebrew.push(b);
					});
					update({ homebrew });
					syncPrefs();
					Toast.show('Import complete.');
				}
			}),
		getAllBeasts: () => [...states().beasts, ...states().homebrew],
		getBeast: name => actions.getAllBeasts().find(b => b.name === name),
		getFavorites: () =>
			Object.entries(actions.getCurrentCharacter().favs)
				.filter(([_, isFav]) => isFav)
				.map(([key]) => actions.getBeast(key))
				.filter(b => b),
		getFilteredBeasts: () =>
			filterBeasts(
				actions.getAllBeasts(),
				actions.getCurrentCharacter(),
				states().search,
				states().filters
			),
		getFilteredFavorites: () =>
			filterBeasts(
				actions.getFavorites(),
				actions.getCurrentCharacter(),
				states().search,
				states().filters
			),
		getBeastList: () => {
			const beasts = actions.getFilteredBeasts();
			const beastsByCr = beasts.reduce(groupBy(b => b.cr.toString().trim()), {});
			const favorites = actions.getFilteredFavorites();

			const getData = (beasts, prefix = 'item') =>
				beasts.map(b => ({ ...b, key: `${prefix}-${b.name}` })).sort(sortBy(b => b.name));

			return states().search
				? [{ data: getData(beasts) }]
				: [
						...(favorites.length
							? [
									{
										key: 'favs',
										title: 'FAVORITES',
										data: getData(favorites, 'fav')
									}
							  ]
							: []),
						...Object.entries(beastsByCr)
							.sort(
								sortBy(
									states().filters.desc
										? desc(([cr]) => crToNum(cr))
										: ([cr]) => crToNum(cr)
								)
							)
							.map(([cr, list]) => ({
								key: cr.toString(),
								title: `CR ${cr}`,
								data: getData(list)
							}))
				  ];
		}
	};
	return actions;
};
