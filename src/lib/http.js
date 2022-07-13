import axios from 'axios'

axios.interceptors.response.use(res => {
  return res.data;
})

/**
 * 获取模板列表
 * @returns Promise
 */
export async function getRepoList() {
  return axios.get(`https://api.github.com/orgs/frontcli/repos`)
}

/**
 * 获取版本信息
 * @param {string} repo 模板名称
 * @returns Promise
 */
export async function getTagList(repo) {
  return axios.get(`https://api.github.com/repos/frontcli/${repo}/tags`)
}