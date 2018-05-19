/**
 * @author panezhang
 * @date 2018/5/19-18:02
 * @file templatify
 * 将制定目录下的文件转化为 generator 专用的模板
 */

import {extname, join} from 'path';
import {readdirSync, readFileSync, renameSync, statSync, writeFileSync} from 'fs';

import logger from '../../logger';
import bannerJS from './banner/javascript.txt';

const BANNER_REGEX = /^\s*\/\*[\s\S]*?\*\/\s/g;
const BANNER_MAP = {
    '.js': bannerJS
};

const TEMP_EXT = '.temp';

function handleFile(filePath) {
    const ext = extname(filePath);
    if (ext === TEMP_EXT) {
        logger.info(`${filePath} skipped`);
        return;
    }

    logger.success(`${filePath}`);
    const renamePath = `${filePath}${TEMP_EXT}`;
    renameSync(filePath, renamePath);

    const bannerContent = BANNER_MAP[ext];
    if (bannerContent) {
        const originContent = readFileSync(renamePath).toString('utf-8');
        let finalContent;
        if (BANNER_REGEX.test(originContent)) {
            finalContent = originContent.replace(BANNER_REGEX, bannerContent);
        } else {
            finalContent = `${bannerContent}${originContent}`;
        }

        writeFileSync(renamePath, finalContent);
    }
}

function handleDir(dirPath) {
    const fileNames = readdirSync(dirPath);
    fileNames.forEach((name) => {
        const path = join(dirPath, name);
        if (statSync(path).isDirectory()) {
            handleDir(path);
        } else {
            handleFile(path);
        }
    });
}

export default (rootDirPath = process.cwd()) => handleDir(rootDirPath);
