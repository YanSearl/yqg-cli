/**
 * @author Kyles Light
 * @date 17/11/06-下午5:57
 * @file genFiles
 */

// system modules
import {basename, extname, resolve} from 'path';

// node modules
import chalk from 'chalk';
import gulp from 'gulp';
import rename from 'gulp-rename';
import template from 'gulp-template';

export default function ({srcPath, destPath, renderData}) {
    const {capName, camelName, hyphenName} = renderData;
    return new Promise(resolvePromise => gulp.src(srcPath)
        .pipe(template(renderData))
        .pipe(rename((path) => {
            path.extname = extname(path.basename);
            path.basename = basename(path.basename, path.extname)
                .replace('capName', capName)
                .replace('camelName', camelName)
                .replace('hyphenName', hyphenName);
            console.log(`Generating ${resolve(destPath, path.dirname)}/${chalk.green(path.basename + path.extname)}`);
        }))
        .pipe(gulp.dest(destPath))
        .on('end', resolvePromise));
}
