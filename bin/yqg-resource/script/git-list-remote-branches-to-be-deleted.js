#!/usr/bin/env node

const MAX_NUM = 12;

const stdin = process.openStdin();
const inputArr = [];

stdin.on('data', chunk => inputArr.push(...chunk.toString().split('\n')));
stdin.on('end', () => filterBranchesToBeDeleted(inputArr));

function filterBranchesToBeDeleted(arr) {
    const businessMap = {};
    arr.forEach((branch) => {
        // delete all none business branches
        let matched = branch.match(/Yqg_[\d]{8}.*/);
        if (matched) {
            console.log(`release/${matched[0]}`);
            return;
        }

        // find and count business branches
        matched = branch.match(/(Yqg_.*)_\d{8}.*/);
        if (!matched) {
            return;
        }

        const [branchName, business] = matched;
        if (!businessMap[business]) {
            businessMap[business] = [];
        }

        businessMap[business].push(branchName);
    });

    Object.keys(businessMap).forEach((business) => {
        const businessBranches = businessMap[business];
        if (businessBranches.length <= MAX_NUM) {
            return;
        }

        businessBranches.slice(0, -MAX_NUM).forEach((branch) => {
            console.log(`release/${branch}`);
        });
    });
}
