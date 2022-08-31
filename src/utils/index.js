const loadScript = ({url,id})=>{
    return new Promise((res, rej)=>{
        const ele = document.createElement('script');
        ele.id = id;
        ele.src = url;
        ele.onload = ()=>{
            res(['ok'])
        }
        ele.onerror = (e)=>{
            rej([null, e])
        }
        ele.timeout = 30000
        document.head.appendChild(ele)
    })
}

const loadStyle = ({url,id})=>{
    return new Promise((res, rej)=>{
        const ele = document.createElement('link');
        ele.id = id;
        ele.href = url;
        ele.rel = 'stylesheet';
        ele.onload = ()=>{
            res(['ok'])
        }
        ele.onerror = (e)=>{
            rej([null, e])
        }
        ele.timeout = 30000
        document.head.appendChild(ele)
    })
}

/** 监听对象属性来源 */

var traceVariable = function(obj, attr){
    let temp = undefined
    Object.defineProperty(obj, attr, {
      get() {
        return temp;
      },
      set(value) {
        console.trace(value)
        temp = value
      },
    });
  }

export {
    loadScript,
    loadStyle
}