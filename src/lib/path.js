/**
 * @author panezhang
 * @date 31/01/2018-13:21
 * @file path
 */

import {resolve} from 'path';

export {resolve};
export const resolveYqgResource = (...args) => resolve(__dirname, './yqg-resource', ...args);
export const resolveGeneratorTemplate = (...args) => resolveYqgResource('./generator/template', ...args);
