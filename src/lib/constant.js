/**
 * @author panezhang
 * @date 31/01/2018-14:58
 * @file constant
 */

import minimist from 'minimist';

import {version} from '../../package.json';

const argv = minimist(process.argv); // 解析一些通用的参数

export const {
    debug: DEBUG = false,
    stat: STAT = false
} = argv;

export const NODE_ENV = process.env.NODE_ENV;
export const VERSION_CHECK_DISABLE = !!process.env.NODE_ENV;
export const VERSION_CHECK_PERIOD = 86400e3; // 1d
export const VERSION_FILE_PATH = '~/.yqg-cli.log';

export const signature = `yqg-cli@${version}`;

export const FRAMEWORK_TYPE = {
    ANGULAR: 'angular',
    REACT: 'react',
    VUE: 'vue',
    VUE_SSR: 'vue-ssr',
    NONE: 'none' // server only
};
