/**
 * @author panezhang
 * @date 21/03/2018-16:28
 * @file webpack.client.config
 */

import {FRAMEWORK} from '../build-conf';
import reactConfig from './webpack.client.react.config';

const FRAMEWORK_MAP = {
    react: reactConfig
};

export default FRAMEWORK_MAP[FRAMEWORK];
