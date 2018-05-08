/**
 * @author panezhang
 * @date 31/01/2018-13:21
 * @file path
 */

import {resolve} from 'path';

export {resolve};
export const resolveYqgResource = (...args) => resolve(__dirname, './yqg-resource', ...args);
export const resolveYqgScript = (...args) => resolveYqgResource('./script', ...args);
export const resolveYqgShell = (...args) => resolveYqgResource('./shell', ...args);
export const resolveGeneratorTemplate = (...args) => resolveYqgResource('./generator/template', ...args);

const PWD = process.cwd();
export const resolvePwd = (...args) => resolve(PWD, ...args);

/**
 * 计算 obj 的属性值的绝对路径
 * @param obj 要处理的对象
 * @param dir 相对于 dir 计算绝对路径
 * @param properties 要处理的 properties，默认处理所有
 * @param array 是否处理 array 类型的属性
 * @param deep 是否进行递归处理
 */
export const resolvePropertyPath = (obj, {
    dir = PWD,
    properties = Object.keys(obj),
    array = false,
    deep = false
} = {}) => {
    const resultObj = {...obj};
    const resolveAbsPath = (path = '') => {
        if (path.startsWith('./') || path.startsWith('../')) { // consider relative path to pwd
            return resolve(dir, path);
        }

        return path;
    };

    properties.forEach((property) => {
        const propertyValue = obj[property];
        if (typeof propertyValue === 'string') {
            resultObj[property] = resolveAbsPath(propertyValue);
        } else if (array && Array.isArray(propertyValue)) {
            resultObj[property] = propertyValue.map(resolveAbsPath);
        } else if (deep && typeof propertyValue === 'object') {
            resultObj[property] = resolvePropertyPath(propertyValue, {dir, properties, array, deep});
        } else {
            // skip, does not handle
        }
    });

    return resultObj;
};
