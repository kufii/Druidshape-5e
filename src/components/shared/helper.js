import React from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, Text, KeyboardAvoidingView, ScrollView, StatusBar } from 'react-native';
import { Header } from 'react-navigation';
import { isIPhoneX } from '../../api/util';

export const B = props => <Text style={[styles.bold, props.style]}>{props.children}</Text>;
export const I = props => <Text style={[styles.italic, props.style]}>{props.children}</Text>;
export const BI = props => <Text style={[styles.bold, styles.italic, props.style]}>{props.children}</Text>;
B.propTypes = I.propTypes = BI.propTypes = {
	children: PropTypes.node,
	style: Text.propTypes.style
};

export const KeyboardAvoidingScrollView = props => {
	const { children, ...other } = props;
	return (
		<KeyboardAvoidingView
			style={styles.avoidKeyboard}
			behavior='padding'
			enabled
			keyboardVerticalOffset={
				Platform.OS === 'android'
					? Header.HEIGHT + StatusBar.currentHeight
					: (isIPhoneX ? 84 : 64)
			}
		>
			<ScrollView {...other}>
				{children}
			</ScrollView>
		</KeyboardAvoidingView>
	);
};
KeyboardAvoidingScrollView.propTypes = {
	children: PropTypes.node
};

const styles = StyleSheet.create({
	bold: { fontWeight: 'bold' },
	italic: { fontStyle: 'italic' },
	avoidKeyboard: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center'
	}
});
