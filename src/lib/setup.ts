/**
 * @author panezhang
 * @date 08/02/2018-13:24
 * @file setup
 */

import {DEBUG} from './constant';

process.on('uncaughtException', (err) => {
    console.log(); // 换行

    if (DEBUG) {
        console.log('uncaughtException', err);
    } else {
        console.log('异常退出');
    }
});

process.on('unhandledRejection', (err, promise) => {
    console.log(); // 换行

    if (DEBUG) {
        console.log('unhandledRejection', err, promise);
    } else {
        console.log('已退出');
    }
});
