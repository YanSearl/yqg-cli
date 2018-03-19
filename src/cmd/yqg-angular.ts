/**
 * @author panezhang
 * @date 28/12/2017-19:19
 * @file yqg-angular
 */

import '@babel/polyfill';

import generator from '../lib/generator/index'; // tslint:disable-line

// tslint:disable-next-line
import setup from '../lib/setup.ts';

setup().then(() => generator({framework: 'angular'}));
