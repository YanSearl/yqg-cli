/**
 * @author panezhang
 * @date 20/03/2018-15:03
 * @file yqg-start
 */

// tslint:disable-next-line
import setup from '../lib/setup.ts';
import run from '../lib/build-tool/run';

(async () => {
    await setup();
    await run('start');
})();
