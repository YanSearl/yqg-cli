/**
 * @author panezhang
 * @date 29/12/2017-14:37
 * @file rollup.config
 */

import fs from 'fs';
import path from 'path';

import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import cleanup from 'rollup-plugin-cleanup';

const resolvePath = (...args) => path.resolve(__dirname, ...args);

const CMD_PATH = './src/cmd';
const inputs = fs.readdirSync(resolvePath(CMD_PATH));

export default inputs.map(filename => ({
    input: `${CMD_PATH}/${filename}`,

    output: {
        file: `bin/${path.basename(filename, '.ts')}`,
        format: 'cjs',
        banner: '#!/usr/bin/env node'
    },

    plugins: [
        json(),
        babel(),
        cleanup({comments: 'none'})
    ]
}));
