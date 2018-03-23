/**
 * @author panezhang
 * @date 23/03/2018-09:57
 * @file util
 */

import prefix from 'global-prefix';

export const NPM_PREFIX = prefix;

export const isGlobalInstall = () => process.argv.some((arg, index) => (
    (!index && arg.startsWith('yqg')) || (arg.startsWith(NPM_PREFIX) && !arg.endsWith('node'))
));

export const IS_GLOBAL_INSTALL = isGlobalInstall();
