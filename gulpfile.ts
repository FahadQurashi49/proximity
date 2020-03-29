import { dest, watch, src, parallel } from 'gulp';
import * as ts from 'gulp-typescript';

const JSON_FILES = ['src/*.json', 'src/**/*.json'];

// pull in the project TypeScript config
const tsProject = ts.createProject('tsconfig.json');

function compileTs(cb) {
    const tsResult = tsProject.src()
        .pipe(tsProject());
    tsResult.js.pipe(dest('dist'));
    cb();
}

function watchTs() {
    watch('src/**/*.ts', compileTs);
}

function assests(cb) {
    src(JSON_FILES).pipe(dest('dist'));
    cb();
}

function defaultTask(cb) {
    parallel(watchTs, assests);
    cb();
}

exports.compileTs = compileTs;
exports.default = defaultTask;