/**
 * @author panezhang
 * @date 21/03/2018-16:28
 * @file webpack.client.config
 */

import {FRAMEWORK} from '../build-conf';

import angular from './webpack.client.angular.config';
import react from './webpack.client.react.config';
import vue from './webpack.client.vue.config';

const FRAMEWORK_MAP = {
    angular,
    react,
    vue
};

export default FRAMEWORK_MAP[FRAMEWORK];
