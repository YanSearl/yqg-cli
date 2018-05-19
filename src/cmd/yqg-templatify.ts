/**
 * @author panezhang
 * @date 2018/5/19-18:24
 * @file yqg-templatify
 */


import '@babel/polyfill';

import '../lib/setup.ts';
import templatify from '../lib/generator/util/templatify'; // tslint:disable-line

// tslint:disable-next-line
import setup from '../lib/setup.ts';

setup().then(() => templatify());
