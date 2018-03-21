/**
 * @author panezhang
 * @date 21/03/2018-15:32
 * @file env
 */

import config from 'config';

export const STAGE = process.env.NODE_ENV || 'dev';
export const DEV = /test|feat|prod/.test(STAGE);

// common config shared between projects
const STAGE_CONF = {
    dev: {
        chidoriHost: 'https://chidori-admin-test.yangqianguan.com'
    },

    test: {
        chidoriHost: 'https://chidori-admin-test.yangqianguan.com'
    },

    feat: {
        chidoriHost: 'https://chidori-admin-feat.yangqianguan.com'
    },

    prod: {
        chidoriHost: 'https://chidori-admin.yangqianguan.com'
    }
};

export const {chidoriHost: CHIDORI_HOST} = STAGE_CONF[STAGE] || STAGE_CONF.dev;

let buildConf;
let runConf;

try {
    buildConf = config.get('build');
} catch (err) {
    buildConf = {};
}

try {
    runConf = config.get('run');
} catch (err) {
    runConf = {};
}

// customizable config
export const { // default value for buildConf
    debug: DEBUG = DEV,
    verbose: VERBOSE = DEV,

    mode: MODE = DEV ? 'development' : 'production',
    framework: FRAMEWORK = 'react',

    hash: HASH = DEV ? 'hash' : 'chunkhash',
    cssHash: CSS_HASH = DEV ? 'hash' : 'contenthash',
    srcMap: SRC_MAP = DEV,

    packageJsonPath: PACKAGE_JSON_PATH = 'package.json'
} = buildConf;

export const {
    apiHost: API_HOST = '',
    webHost: WEB_HOST = ''
} = runConf;
