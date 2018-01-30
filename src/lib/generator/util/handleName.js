/**
 * @author Kyles Light
 * @date 17/11/06-下午5:57
 * @file handleName
 */

import {toCamelCase, toKebabCase} from 'strman';

export default function (name, dest) {
    if (!name) {
        throw new Error('名称不能为空');
    }

    const hyphenName = toKebabCase(name);
    const camelName = toCamelCase(name);
    const capName = camelName.charAt(0).toUpperCase() + camelName.slice(1);

    let hyphenFullName = hyphenName;
    let camelFullName = camelName;
    let capFullName = capName;

    if (dest) {
        const REG_EXP = /yqd_web_admin\/projects\/(.+)\/src\/fe\/page\/(.+)/;
        const result = REG_EXP.exec(dest);
        if (result) { // 需要处理full name
            const fullNameArr = result[2].split('/');
            fullNameArr.push(hyphenName);
            if (fullNameArr[0].indexOf('yqg') !== 0 && fullNameArr[0].indexOf('hx') !== 0) {
                // 增加默认前缀
                fullNameArr.unshift('yqg');
            }

            hyphenFullName = fullNameArr.join('-');
            camelFullName = toCamelCase(hyphenFullName);
            capFullName = camelFullName.charAt(0).toUpperCase() + camelFullName.slice(1);
        }
    }

    // 连字符命名法去掉 'yqg-' 前缀
    const hyphenShortName = hyphenName.replace(/yqg-/g, '');
    return {capName, camelName, hyphenName, capFullName, camelFullName, hyphenFullName, hyphenShortName};
}
