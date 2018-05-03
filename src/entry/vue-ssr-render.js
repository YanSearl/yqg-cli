/**
 * @author panezhang
 * @date 2018/5/3-21:06
 * @file vue-ssr-render
 */

import Render from '../lib/build-tool/webpack/vue-ssr/render';
import DevRender from '../lib/build-tool/webpack/vue-ssr/render.dev';

import {DEV} from '../lib/build-tool/build-conf';

export default DEV ? DevRender : Render;
