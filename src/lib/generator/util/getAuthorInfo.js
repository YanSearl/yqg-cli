/**
 * @author Kyles Light
 * @date 17/11/06-下午5:57
 * @file getAuthorInfo
 */

import gitUserInfo from 'git-user-info';

export default async function () {
    const {name: username, email} = gitUserInfo();
    return {username, email};
}
