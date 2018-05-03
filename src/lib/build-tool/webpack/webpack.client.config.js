/**
 * @author panezhang
 * @date 21/03/2018-16:28
 * @file webpack.client.config
 */

import {FRAMEWORK_TYPE} from '../../constant';
import {FRAMEWORK} from '../build-conf';

import angular from './webpack.client.angular.config';
import react from './webpack.client.react.config';
import vue from './webpack.client.vue.config';

const FRAMEWORK_MAP = {
    [FRAMEWORK_TYPE.ANGULAR]: angular,
    [FRAMEWORK_TYPE.REACT]: react,
    [FRAMEWORK_TYPE.VUE]: vue
};

export default FRAMEWORK_MAP[FRAMEWORK];
