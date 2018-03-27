/**
 * @author panezhang
 * @date 15/03/2018-18:44
 * @file copy
 */
/* eslint-disable no-restricted-syntax, no-await-in-loop */

import {copy, existsSync} from 'fs-extra';
import replace from 'replace';

import {PACKAGE_JSON_PATH, COPY_CONF} from '../build-conf';

const DEFAULT_OPTIONS = {
    paths: { // path src => dest as key => value
        config: 'build/config',
        public: 'build/public',
        static: 'build/public/static',
        [PACKAGE_JSON_PATH]: 'build/package.json'
    },

    exclude: null, // TODO add support to exclude files
    replace: true // whether to replace package.json scripts field
};

export default async (opts = {}) => {
    const paths = Object.assign({}, DEFAULT_OPTIONS.paths, COPY_CONF.paths, opts.paths);
    const {replace: replaceScripts} = Object.assign({}, DEFAULT_OPTIONS, COPY_CONF, opts);

    const srcArr = Object.keys(paths);
    for (const src of srcArr) {
        if (existsSync(src)) {
            const dest = paths[src];
            await copy(src, dest);
        }
    }

    if (replaceScripts) {
        replace({
            regex: '"scripts": {(.|\n)*?}',
            replacement: '"scripts": {\n    "start": "node server.js"\n  }',
            paths: [paths[PACKAGE_JSON_PATH]],
            recursive: false,
            silent: false
        });
    }
};
