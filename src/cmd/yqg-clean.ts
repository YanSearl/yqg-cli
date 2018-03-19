/**
 * @author panezhang
 * @date 20/03/2018-14:05
 * @file yqg-clean
 */

// tslint:disable-next-line
import setup from '../lib/setup.ts';
import run from '../lib/build-tool/run';

(async () => {
    await setup();
    await run('clean');
})();
