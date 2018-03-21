/**
 * @author panezhang
 * @date 15/03/2018-18:44
 * @file copy
 */
/* eslint-disable no-restricted-syntax, no-await-in-loop */

import {copy} from 'fs-extra';
import replace from 'replace';

import {PACKAGE_JSON_PATH} from '../webpack/build-conf';

const DEFAULT_OPTIONS = {
    paths: { // path src => dest as key => value
        config: 'build/config',
        static: 'build/static',
        [PACKAGE_JSON_PATH]: 'build/package.json'
    },

    exclude: null, // TODO add support to exclude files
    replace: true // whether to replace package.json scripts field
};

export default async (opts = {}) => {
    const paths = Object.assign({}, DEFAULT_OPTIONS.paths, opts.paths);
    const {replace: replaceScripts} = Object.assign({}, DEFAULT_OPTIONS, opts);

    const srcArr = Object.keys(paths);
    for (const src of srcArr) {
        await copy(src, paths[src]);
    }

    if (replaceScripts) {
        replace({
            regex: '"scripts": {(.|\n)*?}',
            replacement: '"scripts": {\n    "start": "node server.js"\n  }',
            paths: [paths['package.json']],
            recursive: false,
            silent: false
        });
    }
};