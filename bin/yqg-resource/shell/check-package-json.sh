#! /usr/bin/env bash

target_dir=$1
if [ -z ${target_dir} ]; then
    target_dir=$(pwd) # 默认文件夹
fi

if [ ! -d ${target_dir} ]; then
    echo "${target_dir} 不存在或不是文件夹"
    exit
fi

cd ${target_dir} # 进入目标文件夹
if [ ! -r package.json ]; then
    echo "${target_dir} 下未找到 package.json"
    exit
fi

hash_file=node_modules/.hash
cur_hash=$(md5 -q package.json)

if [ ! -r ${hash_file} ]; then
    npm install
elif [ "$(cat ${hash_file})" != "${cur_hash}" ]; then
    echo "package.json has changed, now exec npm install"
    npm install
else
    echo "package.json does not change, skip npm install"
fi

echo ${cur_hash} > ${hash_file}
