export const cookieUtil = {
  // 设置cookie    day为天
  setItem: function(name:string, value:string|boolean, day:number = 0) {
    let exp:Date|string = new Date();
    if (day === 0) {
      exp = '';
    } else if (day === -1 ) {
      exp.setDate(exp.getDate() - 1);
    } else if (day < 1 && day > 0) {
      exp.setTime(exp.getTime() + day * 24 * 60 * 60 * 1000);
    } else {
      exp.setDate(exp.getDate() + day);
    }
    let domain = '.codemao.cn';
    if (process.env.NODE_ENV === 'development') {
      domain = '';
    }
    document.cookie = `${name}=${value};expires=${exp};domain=${domain}`;
  },

  // 获取cookie
  getItem: function(name:string) {
    const arr = document.cookie.replace(/\s/g, '').split(';');
    for(let i = 0;i < arr.length;i++) {
      const tempArr = arr[i].split('=');
      if(tempArr[0] === name) {
        return decodeURIComponent(tempArr[1]);
      }
    }
    return '';
  },

  // 删除cookie
  removeItem: function(name:string) {
    this.setItem(name, '1', -1);
  },

  // 检查是否含有某cookie
  hasItem: function(name:string) {
    return (new RegExp(`(?:^|;\\s*)${ encodeURIComponent(name).replace(/[\-\.\+\*]/g, '\\$&') }\\s*\\=`)).test(document.cookie);
  },

  // 获取全部的cookie列表
  getAllItems: function() {
    const cookieArr = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:\=[^;]*)?;\s*/);
    for (let nIdx = 0; nIdx < cookieArr.length; nIdx++) { cookieArr[nIdx] = decodeURIComponent(cookieArr[nIdx]); }
    return cookieArr;
  },
};
