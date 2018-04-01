/**
 * @author panezhang
 * @date 21/03/2018-15:58
 * @file globals
 *
 * default globals
 */

import {STAGE, DEBUG, VUE_DEBUG, API_HOST, WEB_HOST, CHIDORI_API_HOST, CHIDORI_HOST} from '../build-conf';

export default {
    __STAGE__: JSON.stringify(STAGE),
    __DEBUG__: DEBUG,
    __VUE_DEBUG__: VUE_DEBUG,
    __CDN_HOST__: JSON.stringify(''),
    __API_HOST__: JSON.stringify(API_HOST),
    __WEB_HOST__: JSON.stringify(WEB_HOST),
    __CHIDORI_API_HOST__: JSON.stringify(CHIDORI_API_HOST),
    __CHIDORI_HOST__: JSON.stringify(CHIDORI_HOST)
};
