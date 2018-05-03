/**
 * @author panezhang
 * @date 2018/5/4-11:56
 * @file webpack.config
 */

import {FRAMEWORK_TYPE} from '../../constant';
import {FRAMEWORK} from '../build-conf';

// SPA config
import angular from './webpack.client.angular.config';
import react from './webpack.client.react.config';
import vue from './webpack.client.vue.config';
import server from './webpack.server.config';

// SSR config
import vueSSR from './vue-ssr/webpack.config';

const FRAMEWORK_MAP = {
    [FRAMEWORK_TYPE.ANGULAR]: [angular, server],
    [FRAMEWORK_TYPE.REACT]: [react, server],
    [FRAMEWORK_TYPE.VUE]: [vue, server],
    [FRAMEWORK_TYPE.VUE_SSR]: vueSSR,
    [FRAMEWORK_TYPE.NONE]: server
};

export default FRAMEWORK_MAP[FRAMEWORK];

