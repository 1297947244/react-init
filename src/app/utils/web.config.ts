const devWebHosts = {
  api: 'https://dev-official-website-config.codemao.cn',
}

const testHosts = {
  api: 'https://test-official-website-config.codemao.cn',
}

const preHosts = {
  api: 'https://official-website-config.codemao.cn',
}

const webHosts = {
  api: 'https://official-website-config.codemao.cn',
}

// @ts-ignore
const ENV = NODE_ENV;

let hosts;
if (ENV === 'production') {
  hosts = webHosts;
} else if (ENV === 'pre') {
  hosts = preHosts;
} else if (ENV === 'testing') {
  hosts = testHosts;
} else {
  hosts = devWebHosts;
}
console.log(28, hosts)
export {
  hosts
}