/**
 * @author panezhang
 * @date 28/12/2017-19:19
 * @file yqg-vue
 */

import '@babel/polyfill';

import '../lib/setup.ts';
import generator from '../lib/generator/index'; // tslint:disable-line

// tslint:disable-next-line
import setup from '../lib/setup.ts';

setup().then(() => generator({framework: 'vue'}));
