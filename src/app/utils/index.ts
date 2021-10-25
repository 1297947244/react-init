export function omit<T extends object, K extends keyof T>(target: T, ...omitKeys: K[]): Omit<T, K> {
  return (Object.keys(target) as K[]).reduce((res, key) => {
    if (!omitKeys.includes(key)) {
      res[key] = target[key];
    }
    return res;
  }, {} as any);
}

/**
 * 将URL参数转换成对象
 */
 export const parseUrl = (url?:string) => {
  if (typeof url !== 'string') {
    throw new SyntaxError('invalid url');
  }
  const params:any = {};
  url = url || window.location.search;
  const query = url.split('?')[1] || '';
  const paramArr = query.split('&');
  if (paramArr.join('')) {
    paramArr.forEach((item) => {
      const index = item.indexOf('=');
      const name = item.substr(0, index);
      const value = item.substr(index + 1);
      params[name] = value;
    });
  }
  return params;
};

/**
 * 防抖
 * @param func
 * @param delay
 * @returns
 */
export const debounce = (func:Function, delay:number) => {
  let timer:ReturnType<typeof setTimeout>;
  return function(...args:any[]) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      // @ts-ignore
      func.apply(this, args);
      clearTimeout(timer);
    }, delay);
    return timer;
  };
};

/**
 * 节流
 * @param func
 * @param delay
 * @returns
 */
export const throttle = function(func:Function, delay:number) {
  let timer:any;
  // @ts-ignore
  const context = this;
  return function() {
    const args = arguments;
    if (!timer){
      const callNow = !timer;
      timer = setTimeout(() => {
        clearTimeout(timer);
        timer = null;
      }, delay);
      if (callNow){
        func.apply(context, args);
      }
    }
  };
};

/**
 * 判断一个元素是否是另一个元素的子元素
 */
export const isDescendant = (el:Element | null, parentEl:HTMLElement | null) => {
  while (el !== undefined && el != null && el.tagName.toUpperCase() !== 'BODY') {
    if (el === parentEl){
      return true;
    }
    el = el.parentElement;
  }
  return false;
};


/**
 * localStorage 操作
 */

/**
 * 时间格式化
 */

/**
 * 
 */