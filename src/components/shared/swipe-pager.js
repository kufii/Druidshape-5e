import React from 'react';
import PropTypes from 'prop-types';
import r from 'rnss';
import {
	Platform,
	ViewPropTypes,
	Dimensions,
	View,
	ScrollView,
	ActivityIndicator
} from 'react-native';
import ViewPagerAndroid from '@react-native-community/viewpager';

export default class SwipePager extends React.Component {
	static propTypes = {
		children: PropTypes.node,
		data: PropTypes.array,
		renderItem: PropTypes.func,
		keyExtractor: PropTypes.func,
		style: ViewPropTypes.style,
		containerStyle: ViewPropTypes.style,
		scrollViewStyle: ViewPropTypes.style,
		horizontal: PropTypes.bool,
		width: PropTypes.number,
		height: PropTypes.number,
		index: PropTypes.number,
		onIndexChanged: PropTypes.func,
		onScrollBeginDrag: PropTypes.func,
		onMomentumScrollEnd: PropTypes.func,
		onTouchEnd: PropTypes.func,
		loadMinimal: PropTypes.bool,
		loadMinimalSize: PropTypes.number,
		loadMinimalLoader: PropTypes.element
	};

	static defaultProps = {
		// Start of ScrollView props
		horizontal: true,
		pagingEnabled: true,
		showsHorizontalScrollIndicator: false,
		showsVerticalScrollIndicator: false,
		bounces: false,
		scrollsToTop: false,
		removeClippedSubviews: true,
		automaticallyAdjustContentInsets: false,
		scrollEnabled: true,
		// End of ScrollView props
		keyExtractor: ({ key }) => key,
		loadMinimal: false,
		loadMinimalSize: 1
	};

	initialRender = true;

	constructor(props) {
		super(props);
		this.state = this.initState(props);
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		this.setState(this.initState(nextProps, this.props.index !== nextProps.index));
	}

	UNSAFE_componentWillUpdate(nextProps, nextState) {
		this.props.onIndexChanged &&
			this.state.index !== nextState.index &&
			this.props.onIndexChanged(nextState.index);
	}

	initState(props, updateIndex = false) {
		const state = this.state || { width: 0, height: 0, offset: { x: 0, y: 0 } };
		const initState = {
			offset: {},
			total: props.data ? props.data.length : props.children ? props.children.length || 1 : 0
		};

		initState.index =
			!updateIndex && state.total === initState.total
				? state.index
				: initState.total > 1
				? Math.min(props.index, initState.total - 1)
				: 0;

		const { width, height } = Dimensions.get('window');

		initState.dir = props.horizontal ? 'x' : 'y';

		if (props.width) {
			initState.width = props.width;
		} else if (this.state?.width) {
			initState.width = this.state.width;
		} else {
			initState.width = width;
		}

		if (props.height) {
			initState.height = props.height;
		} else if (this.state?.height) {
			initState.height = this.state.height;
		} else {
			initState.height = height;
		}

		initState.offset[initState.dir] = (initState.dir === 'y' ? height : width) * props.index;

		this.internals = {
			...this.internals,
			isScrolling: false
		};

		return initState;
	}

	get fullState() {
		return { ...this.state, ...this.internals };
	}

	get scrollViewPropOverrides() {
		const props = this.props;
		const overrides = {};

		for (const prop in props) {
			if (
				typeof props[prop] === 'function' &&
				prop !== 'onMomentumScrollEnd' &&
				prop !== 'renderPagination' &&
				prop !== 'onScrollBeginDrag'
			) {
				const originResponder = props[prop];
				overrides[prop] = e => originResponder(e, this.fullState, this);
			}
		}

		return overrides;
	}

	onLayout(e) {
		const { width, height } = e.nativeEvent.layout;
		const offset = (this.internals.offset = {});
		const state = { width, height };

		if (this.state.total > 1) {
			offset[this.state.dir] = (this.state.dir === 'y' ? height : width) * this.state.index;
		}

		// only update the offset in state if needed, updating offset while swiping causes some bad jumping / stuttering
		if (!this.state.offset || width !== this.state.width || height !== this.state.height) {
			state.offset = offset;
		}

		// contentOffset is not working in react 0.48.x so we need to use scrollTo to emulate offset.
		if (Platform.OS === 'ios' && this.initialRender && this.state.total > 1) {
			this.scrollView.scrollTo({ ...offset, animated: false });
			this.initialRender = false;
		}

		this.setState(state);
	}

	onScrollBegin(e) {
		this.internals.isScrolling = true;
		this.props.onScrollBeginDrag && this.props.onScrollBeginDrag(e, this.fullState, this);
	}

	onScrollEnd(e) {
		// update scroll state
		this.internals.isScrolling = false;

		// making our events coming from android compatible to updateIndex logic
		if (!e.nativeEvent.contentOffset) {
			if (this.state.dir === 'x') {
				e.nativeEvent.contentOffset = { x: e.nativeEvent.position * this.state.width };
			} else {
				e.nativeEvent.contentOffset = { y: e.nativeEvent.position * this.state.height };
			}
		}

		this.updateIndex(e.nativeEvent.contentOffset, this.state.dir, () => {
			this.props.onMomentumScrollEnd &&
				this.props.onMomentumScrollEnd(e, this.fullState(), this);
		});
	}

	onScrollEndDrag(e) {
		const { contentOffset } = e.nativeEvent;
		const { horizontal } = this.props;
		const { index, total } = this.state;
		const { offset } = this.internals;
		const previousOffset = horizontal ? offset.x : offset.y;
		const newOffset = horizontal ? contentOffset.x : contentOffset.y;

		if (previousOffset === newOffset && (index === 0 || index === total - 1)) {
			this.internals.isScrolling = false;
		}
	}

	onPageScrollStateChanged(state) {
		if (state === 'dragging') {
			return this.onScrollBegin();
		} else if (['idle', 'settling'].includes(state)) {
			this.props.onTouchEnd && this.props.onTouchEnd();
		}
	}

	updateIndex(offset, dir, cb) {
		if (!this.internals.offset) {
			// Android not setting this onLayout first?
			this.internals.offset = {};
		}
		const state = this.state;
		let index = state.index;
		const diff = offset[dir] - this.internals.offset[dir];
		const step = dir === 'x' ? state.width : state.height;

		// Do nothing if offset no change.
		if (!diff) return;

		index = parseInt(index + Math.round(diff / step));

		const newState = { index };

		this.internals.offset = offset;

		this.setState(newState, cb);
	}

	scrollBy(index, animated = true) {
		if (this.internals.isScrolling || this.state.total <= 1) return;
		const state = this.state;
		const diff = index + this.state.index;
		let x = 0;
		let y = 0;
		if (state.dir === 'x') x = diff * state.width;
		if (state.dir === 'y') y = diff * state.height;

		if (Platform.OS !== 'ios') {
			this.scrollView &&
				this.scrollView[animated ? 'setPage' : 'setPageWithoutAnimation'](diff);
		} else {
			this.scrollView && this.scrollView.scrollTo({ x, y, animated });
		}

		// update scroll state
		this.internals.isScrolling = true;

		// trigger onScrollEnd manually in android
		if (!animated || Platform.OS !== 'ios') {
			setImmediate(() => {
				this.onScrollEnd({
					nativeEvent: {
						position: diff
					}
				});
			});
		}
	}

	renderScrollView() {
		const {
			data,
			children,
			renderItem,
			keyExtractor,
			loadMinimal,
			loadMinimalSize,
			loadMinimalLoader,
			style
		} = this.props;
		const { index, total, width, height } = this.state;

		let pages;
		const pageStyle = [{ width, height }, styles.slide];
		const pageStyleLoading = [{ width, height }, styles.slideLoading];

		if (data) {
			pages = data.map((item, i) =>
				!loadMinimal || Math.abs(i - index) <= loadMinimalSize ? (
					<View style={pageStyle} key={keyExtractor(item)}>
						{renderItem(item)}
					</View>
				) : (
					<View style={pageStyleLoading} key={keyExtractor(item)}>
						{loadMinimalLoader || <ActivityIndicator />}
					</View>
				)
			);
		} else if (total > 1) {
			pages = Object.keys(children).map((page, i) =>
				!loadMinimal || Math.abs(i - index) <= loadMinimalSize ? (
					<View style={pageStyle} key={i}>
						{children[page]}
					</View>
				) : (
					<View style={pageStyleLoading} key={i}>
						{loadMinimalLoader || <ActivityIndicator />}
					</View>
				)
			);
		} else {
			pages = (
				<View style={pageStyle} key={0}>
					{children}
				</View>
			);
		}

		return Platform.OS === 'ios' ? (
			<ScrollView
				ref={view => (this.scrollView = view)}
				{...this.props}
				{...this.scrollViewPropOverrides}
				contentContainerStyle={[styles.wrapperIos, style]}
				onScrollBeginDrag={this.onScrollBegin.bind(this)}
				onMomentumScrollEnd={this.onScrollEnd.bind(this)}
				onScrollEndDrag={this.onScrollEndDrag.bind(this)}
				style={this.props.scrollViewStyle}
			>
				{pages}
			</ScrollView>
		) : (
			<ViewPagerAndroid
				ref={view => (this.scrollView = view)}
				{...this.props}
				initialPage={index}
				onPageScrollStateChanged={this.onPageScrollStateChanged.bind(this)}
				onPageSelected={this.onScrollEnd.bind(this)}
				key={pages.length}
				style={[styles.wrapperAndroid, style]}
			>
				{pages}
			</ViewPagerAndroid>
		);
	}

	render() {
		const { containerStyle } = this.props;

		return (
			<View style={[styles.container, containerStyle]} onLayout={this.onLayout.bind(this)}>
				{this.renderScrollView()}
			</View>
		);
	}
}

const styles = {
	container: r`
		bc transparent
		position relative
		f 1
	`,
	wrapperIos: r`bc transparent`,
	wrapperAndroid: r`bc transparent; f 1`,
	slide: r`bc transparent`,
	slideLoading: r`f 1; jc center; ai center`
};
