/**
 * @author panezhang
 * @date 30/01/2018-16:24
 * @file generator
 */

import chalk from 'chalk';

import prompt from '../prompt';
import {FRAMEWORK_TYPE, FRAMEWORK_CONF} from './constant';

import AngularGenerator from './AngularGenerator';
import VueGenerator from './VueGenerator';

const GENERATOR_MAP = {
    [FRAMEWORK_TYPE.ANGULAR]: AngularGenerator,
    [FRAMEWORK_TYPE.VUE]: VueGenerator
};

/**
 * @param framework angular | vue
 * @param template component | modal etc.
 * @returns {Promise<void>}
 */
export default async ({framework}) => {
    // check validity of framework
    const CONF = FRAMEWORK_CONF[framework];
    if (!CONF) {
        console.log(chalk.red(`Unknown framework: ${framework}`));
        return;
    }

    // select a template
    const {TEMPLATE_LIST} = CONF;
    const templateListText = TEMPLATE_LIST
        .map((templateName, index) => `${chalk.yellow(index + 1)}. ${chalk.green(templateName)}`)
        .join('\n');

    const {typeIndex} = await prompt({
        typeIndex: {
            description: `\n${templateListText}\nSelect a template（Enter a number）`,
            default: '1',
            pattern: /^\d+$/,
            required: true
        }
    });

    const type = TEMPLATE_LIST[typeIndex - 1];
    if (!type) {
        console.log(chalk.red(`Unknown type: ${type}`));
        return;
    }

    // get name and dest
    const {name, dest} = await prompt({
        name: {
            description: 'Enter target name [such as foo-bar]',
            message: 'Target name should not be empty!',
            type: 'string',
            required: true
        },

        dest: {
            description: 'Enter dest path',
            type: 'string',
            default: process.cwd(),
            required: true
        }
    });

    console.log(chalk.grey(`Will generate ${framework} ${type} ${name} at ${dest}`));
    const Generator = GENERATOR_MAP[framework];
    const generator = new Generator({framework, type, name, dest}); // 将来可以灵活的根据 framework, type 选择不同的子类
    generator.exec();
};
