/**
 * @author panezhang
 * @date 30/01/2018-16:24
 * @file generator
 */

import chalk from 'chalk';

import prompt from '../prompt';
import {FRAMEWORK_TYPE, FRAMEWORK_CONF, ANGULAR_TEMPLATE_TYPE, VUE_TEMPLATE_TYPE} from './constant';

import AngularGenerator from './AngularGenerator';
import AngularComponentGenerator from './AngularComponentGenerator';

import VueGenerator from './VueGenerator';
import VueProjectGenerator from './VueProjectGenerator';
import VueProjectUserGenerator from './VueProjectUserGenerator';

const GENERATOR_CONF = {
    [FRAMEWORK_TYPE.ANGULAR]: {
        [ANGULAR_TEMPLATE_TYPE.COMPONENT]: AngularComponentGenerator,
        default: AngularGenerator
    },

    [FRAMEWORK_TYPE.VUE]: {
        [VUE_TEMPLATE_TYPE.PROJECT]: VueProjectGenerator,
        [VUE_TEMPLATE_TYPE.PROJECT_USER]: VueProjectUserGenerator,
        default: VueGenerator
    }
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
            description: `\n${templateListText}\nSelect a template（Enter a number or name）`,
            default: '1',
            required: true
        }
    });

    const type = TEMPLATE_LIST.includes(typeIndex) ? typeIndex : TEMPLATE_LIST[typeIndex - 1];
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
    const GENERATOR_MAP = GENERATOR_CONF[framework];
    const Generator = GENERATOR_MAP[type] || GENERATOR_MAP.default;
    const generator = new Generator({framework, type, name, dest}); // 将来可以灵活的根据 framework, type 选择不同的子类
    generator.exec();
};
