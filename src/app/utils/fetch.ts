import { HTTP } from 'app/utils/http';
import { hosts } from "app/utils/web.config";

/**
 * 获取首页列表
 */
 export function getArticleList(params={}){
  return new Promise((resolve, reject) => {
    HTTP('post', `${hosts.api}/studentWork/list`, params).then(res => {
      resolve (res);
    },error => {
      console.log("网络异常~",error);
      reject(error)
    })
  })
}
