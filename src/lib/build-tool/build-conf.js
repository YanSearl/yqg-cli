/**
 * @author panezhang
 * @date 21/03/2018-15:32
 * @file env
 */

import config from 'config';

import logger from '../logger';

export const STAGE = process.env.NODE_ENV || 'dev';
export const DEV = !(/test|feat|prod/.test(STAGE));

// common config shared between projects
const STAGE_CONF = {
    dev: {
        chidoriApiHost: 'https://chidori-api-test.yangqianguan.com',
        chidoriHost: 'https://chidori-admin-test.yangqianguan.com'
    },

    test: {
        chidoriApiHost: 'https://chidori-api-test.yangqianguan.com',
        chidoriHost: 'https://chidori-admin-test.yangqianguan.com'
    },

    feat: {
        chidoriApiHost: 'https://chidori-api-feat.yangqianguan.com',
        chidoriHost: 'https://chidori-admin-feat.yangqianguan.com'
    },

    prod: {
        chidoriApiHost: 'https://chidori-api-admin.yangqianguan.com',
        chidoriHost: 'https://chidori-admin.yangqianguan.com'
    }
};

Object.assign(STAGE_CONF, {
    'aws-test': STAGE_CONF.test,
    'aws-feat': STAGE_CONF.feat,
    'aws-prod': STAGE_CONF.prod
});

export const {
    chidoriApiHost: CHIDORI_API_HOST,
    chidoriHost: CHIDORI_HOST
} = STAGE_CONF[STAGE] || STAGE_CONF.dev;

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

// TODO use framework conf to fill default value
// customizable config
export const { // default value for buildConf
    debug: DEBUG = DEV,
    vueDebug: VUE_DEBUG = DEV,
    verbose: VERBOSE = DEV,

    mode: MODE = DEV ? 'development' : 'production',
    framework: FRAMEWORK = 'react',

    hash: HASH = DEV ? 'hash' : 'chunkhash',
    cssHash: CSS_HASH = DEV ? 'hash' : 'contenthash',
    srcMap: SRC_MAP = DEV,

    packageJsonPath: PACKAGE_JSON_PATH = 'package.json',
    publicPath: PUBLIC_PATH = '/',
    alias: WEBPACK_ALIAS = {},
    global: WEBPACK_GLOBALS = {},

    // webpack server config
    serverEntry: WEBPACK_SERVER_ENTRY = './server.js',
    ssrServerEntry: WEBPACK_SSR_SERVER_ENTRY = './server.js',
    server: WEBPACK_SERVER_CONF = {},
    ssrServer: WEBPACK_SSR_SERVER_CONF = {},

    // webpack client config
    provide: WEBPACK_PROVIDES = {},
    htmlPlugin: WEBPACK_HTML_PLUGIN_CONF = {},
    cacheGroups: WEBPACK_CACHE_GROUPS = {},
    clientEntry: WEBPACK_CLIENT_ENTRY = './common/app/index.js',
    client: WEBPACK_CLIENT_CONF = {},

    // script clean & copy
    clean: CLEAN_CONF = {},
    copy: COPY_CONF = {},

    // script start
    devProxy: PROXY_URL_LIST = []
} = buildConf;

export const {
    apiHost: API_HOST = '',
    webHost: WEB_HOST = '',
    port: PORT = 8080
} = runConf;

logger.info(`FRAMEWORK=${FRAMEWORK} MODE=${MODE}`);
