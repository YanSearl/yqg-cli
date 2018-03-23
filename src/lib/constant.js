/**
 * @author panezhang
 * @date 31/01/2018-14:58
 * @file constant
 */

import {version} from '../../package.json';

export const DEBUG = !!process.env.DEBUG;

export const NODE_ENV = process.env.NODE_ENV;
export const VERSION_CHECK_DISABLE = !!process.env.NODE_ENV;
export const VERSION_CHECK_PERIOD = 86400e3; // 1d
export const VERSION_FILE_PATH = '~/.yqg-cli.log';

export const signature = `yqg-cli@${version}`;
