/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
import reducer from './reducer';
import * as selectors from './selectors';
import * as actions from './actions';
import * as controls from './controls';
import * as resolvers from './resolvers';

const {
	registerStore,
} = wp.data;

registerStore( 'wp-travel-blocks/templates', {
	reducer, selectors, actions, controls, resolvers,
} );
