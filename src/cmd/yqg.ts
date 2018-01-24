/**
 * @author panezhang
 * @date 28/12/2017-19:19
 * @file yqg
 */

import commander from 'commander';
import {version} from '../../package.json';

commander
    .version(version)
    .command('angular', 'angular scaffold')
    .command('vue', 'vue scaffold')
    .command('shell', 'run yqg scripts')
    .parse(process.argv);
