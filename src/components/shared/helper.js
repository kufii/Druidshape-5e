import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import r from 'rnss';

export const B = props => <Text style={[styles.bold, props.style]}>{props.children}</Text>;
export const I = props => <Text style={[styles.italic, props.style]}>{props.children}</Text>;
export const BI = props => (
	<Text style={[styles.bold, styles.italic, props.style]}>{props.children}</Text>
);
B.propTypes = I.propTypes = BI.propTypes = {
	children: PropTypes.node,
	style: Text.propTypes.style
};

const styles = {
	bold: r`fw bold`,
	italic: r`font-style italic`
};
