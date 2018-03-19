/**
 * @author panezhang
 * @date 28/12/2017-19:19
 * @file yqg
 */

import '@babel/polyfill';
import commander from 'commander';

import {version} from '../../package.json';

// tslint:disable-next-line
import setup from '../lib/setup.ts';

setup().then(
    () => commander
        .version(version)
        .command('angular', 'angular scaffold')
        .command('vue', 'vue scaffold')
        .command('shell', 'run yqg scripts')
        .parse(process.argv)
);
