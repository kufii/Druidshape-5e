import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import ActionButton from 'react-native-action-button';

export default function FloatingActionButton({ hidden, ...props }) {
	return (
		<View style={[styles.container, hidden && styles.hidden]} pointerEvents='box-none'>
			<ActionButton fixNativeFeedbackRadius {...props} />
		</View>
	);
}
FloatingActionButton.propTypes = {
	hidden: PropTypes.bool
};

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	},
	hidden: {
		bottom: -90
	}
});