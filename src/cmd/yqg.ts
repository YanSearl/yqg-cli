/**
 * @author panezhang
 * @date 28/12/2017-19:19
 * @file yqg
 */

import '@babel/polyfill';
import commander from 'commander';

import {version} from '../../package.json';

commander
    .version(version)
    .command('angular', 'angular scaffold')
    .command('vue', 'vue scaffold')
    .command('shell', 'run yqg scripts')
    .command('clean', 'clean project bundle files')
    .command('copy', 'copy project static files')
    .command('bundle', 'bundle project')
    .command('build', 'build project (clean, copy & bundle)')
    .command('start', 'start project in development mode')
    .parse(process.argv);
