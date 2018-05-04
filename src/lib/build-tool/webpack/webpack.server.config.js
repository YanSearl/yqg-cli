/**
 * @author panezhang
 * @date 2018/5/4-22:12
 * @file webpack.server
 */

import {FRAMEWORK_TYPE} from '../../constant';
import {FRAMEWORK} from '../build-conf';

import server from './webpack.server.base.config';
import vueSSRServer from './vue-ssr/webpack.server.config';

export default FRAMEWORK === FRAMEWORK_TYPE.VUE_SSR ? vueSSRServer : server;
