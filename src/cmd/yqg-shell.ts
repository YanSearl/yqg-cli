/**
 * @author panezhang
 * @date 28/12/2017-19:19
 * @file yqg-angular
 */

import {execFileSync} from 'child_process';
import path from 'path';

execFileSync(path.join(__dirname, './yqg-shell-lib/git-clean-local-branch'), {stdio: 'inherit'});
