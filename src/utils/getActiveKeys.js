import canBeZero from './canBeZero.js';

/* --------------------------------------------
 * Get a list of every key we've declared in config
 */
export default function getActiveKeys (config) {
	return ['x', 'y', 'r'].filter(s => {
		return canBeZero(config[s]);
	});
}
