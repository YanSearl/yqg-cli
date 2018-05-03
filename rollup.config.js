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
const ENTRY_PATH = './src/entry';

const commands = fs.readdirSync(resolvePath(CMD_PATH));
const entries = fs.readdirSync(resolvePath(ENTRY_PATH));

const babelOptions = {
    presets: [
        [
            '@babel/preset-env',
            {
                modules: false,
                targets: {
                    browsers: [
                        '> 1%'
                    ],
                    node: '6.9'
                }
            }
        ],
        '@babel/preset-stage-3',
        '@babel/preset-typescript'
    ],

    plugins: [
        [
            '@babel/plugin-transform-runtime',
            {
                helpers: false,
                polyfill: false,
                regenerator: true,
                moduleName: '@babel/runtime'
            }
        ]
    ],

    babelrc: false
};

export default [
    ...commands.map(filename => ({
        input: `${CMD_PATH}/${filename}`,

        output: {
            file: `bin/${path.basename(filename, '.ts')}`,
            format: 'cjs',
            banner: '#!/usr/bin/env node'
        },

        plugins: [
            json(),
            babel(babelOptions),
            cleanup({comments: 'none'})
        ]
    })),

    ...entries.map(filename => ({
        input: `${ENTRY_PATH}/${filename}`,

        output: {
            file: `dist/${filename}`,
            format: 'cjs'
        },

        plugins: [
            json(),
            babel(babelOptions),
            cleanup({comments: 'none'})
        ]
    }))
];
