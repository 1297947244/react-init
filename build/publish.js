const Client = require('ssh2-sftp-client')
const path = require('path')
const glob = require('glob')
const sftp = new Client()
const localPath = path.join(__dirname, '../dist').replace(/\\/g, '/')
const remotePath = '/html/react'
sftp.connect({
  host: '',
  port: 22,
  username: 'root',
  password: ''
}).then(() => {
  console.log('连接成功')
  return sftp.rmdir(`${remotePath}`, true)
}).then(async () => {
  console.log('创建js,css,img,fonts文件')
  await sftp.mkdir(`${remotePath}`, true)
  await sftp.mkdir(`${remotePath}/css`, true)
  await sftp.mkdir(`${remotePath}/img`, true)
  await sftp.mkdir(`${remotePath}/fonts`, true)
  await sftp.mkdir(`${remotePath}/js`, true)
  await sftp.mkdir(`${remotePath}/public`, true)
}).then(() => {
  console.log('创建js,css,img,fonts文件成功', remotePath)
  const fileLiat = glob.sync(
    `${localPath}/**/*.{js,css,jpg,jpeg,png,eot,woff,ttf,html}`
  )
  return Promise.all(
    fileLiat.map(file => {
      const remoteFile = file.replace(localPath, remotePath)
      return sftp.fastPut(file, remoteFile)
    })
  )
}).then(() => {
  console.log('文件上传成功')
  sftp.end()
}).catch(err => {
  console.log(err.message, 'catch error')
  sftp.end()
})
