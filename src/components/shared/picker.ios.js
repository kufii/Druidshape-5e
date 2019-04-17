import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Animated, View, TouchableOpacity, Text, Picker } from 'react-native';

const UIPICKER_HEIGHT = 216;

export default class CollapsiblePickerIOS extends React.Component {
	constructor(props) {
		super(props);
		const isCollapsed
			= typeof props.isCollapsed === typeof true
				? props.isCollapsed
				: true;

		this.state = {
			isCollapsed,
			height: new Animated.Value(isCollapsed ? 0 : UIPICKER_HEIGHT)
		};
		this.animatePicker = this._animatePicker.bind(this);
		this.togglePicker = this._togglePicker.bind(this);
		this.onValueChange = this._onValueChange.bind(this);
	}

	_animatePicker(isCollapsed) {
		const animation = Animated.timing;
		const animationConfig = {
			duration: 200
		};
		animation(
			this.state.height,
			Object.assign(
				{
					toValue: isCollapsed ? 0 : UIPICKER_HEIGHT
				},
				animationConfig
			)
		).start();
	}

	_togglePicker() {
		this.setState(prev => ({ isCollapsed: !prev.isCollapsed }), () => {
			this.animatePicker(this.state.isCollapsed);
			if (typeof this.props.onCollapseChange === 'function') {
				this.props.onCollapseChange(this.state.isCollapsed);
			}
		});
	}

	_onValueChange(val) {
		const { onChange, value } = this.props;
		if (val !== value) {
			this.togglePicker();
			onChange(val);
		}
	}

	render() {
		const options = this.props.options.map(({ value, text }) => (
			<Picker.Item key={value} value={value} label={text} />
		));
		const selectedOption = this.props.options.find(
			option => option.value === this.props.value
		);

		return (
			<View style={[styles.pickerContainer, this.props.containerStyle]}>
				<TouchableOpacity
					disabled={this.props.disabled}
					onPress={this.togglePicker}
				>
					<Text style={[styles.pickerValue, this.props.itemStyle]}>{selectedOption.text}</Text>
				</TouchableOpacity>
				<Animated.View
					style={[styles.animatedView, { height: this.state.height }]}
				>
					<Picker
						selectedValue={this.props.value}
						onValueChange={this.onValueChange}
						enabled={!this.props.disabled}
						mode={this.props.mode}
						prompt={this.props.prompt}
						itemStyle={this.props.itemStyle}
					>
						{options}
					</Picker>
				</Animated.View>
			</View>
		);
	}
}
CollapsiblePickerIOS.propTypes = {
	onCollapseChange: PropTypes.func,
	onChange: PropTypes.func,
	value: PropTypes.string,
	options: PropTypes.arrayOf(PropTypes.shape({
		value: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired
	})).isRequired,
	isCollapsed: PropTypes.bool,
	disabled: PropTypes.bool,
	mode: PropTypes.string,
	prompt: PropTypes.string,
	itemStyle: Text.propTypes.style,
	containerStyle: Text.propTypes.style
};

const styles = StyleSheet.create({
	pickerContainer: {
		marginBottom: 4,
		borderRadius: 4,
		borderWidth: 1,
		padding: 5
	},
	pickerValue: {
		fontSize: 17
	},
	animatedView: {
		overflow: 'hidden'
	}
});